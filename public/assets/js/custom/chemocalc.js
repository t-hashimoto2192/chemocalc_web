// 定数

/**
 * レシピデータのローカルストレージ保存キー
 * ※バージョンアップ時の対応
 * ・1.この値を用いたローカルストレージデータ削除処理を追記する
 * ・2.値を変更する
 * @type String
 */
const LS_KEY_RECIPE_DATA = 'recipe_data_array_2018';

/**
 * 薬剤編集モーダル表示時に使用する薬剤データのセッションストレージ保存キー
 * @type String
 */
const SS_KEY_MEDINAS_DATA = 'medinas_data_array';

// グローバル変数

// knockout.jsのViewModel
var viewModel = new settingViewModel();

// 薬剤編集モーダルの選択状態管理
var rows_selected = [];

/**
 * onload処理
 * @returns {undefined}
 */
window.onload = function () {

    console.log("▼▼▼ function window.onload");

    // ローカルストレージに保存済のレシピ情報配列の有無を確認
    if (!localStorage.getItem(LS_KEY_RECIPE_DATA)) {
        console.log("★ ①localStorageにデータ無し");
        // 無ければDBのデータで初期設定
        // ※ローカルストレージにデータ保存後の各画面の初期化はコールバック内で実行
        initializeLsRecipeDataArray();
    } else {
        console.log("★ localStorageに既存データあり");
        // 各画面の初期化
        initializeContentDiv();
    }
    
        // 薬剤の規格テーブルにDataTables適用
        $('.tblStandardList').DataTable({
            // 件数切替機能 無効
            lengthChange: false,
            // 検索機能 無効
            searching: false,
            // ソート機能 無効
            ordering: false,
            // 情報表示 無効
            info: false,
            // ページング機能 無効
            paging: false,
            // 初期表示時には並び替えをしない
            order: [],
            // スクロール設定
            scrollY: "100px",
            scrollCollapse: true,
        }).columns.adjust().draw();

    // knockout.js ViewModelバインド
    ko.applyBindings(viewModel);

    console.log("▲▲▲ function window.onload");
};

/**
 * 各治療費計算シート領域の初期化
 * @returns {undefined}
 */
function initializeContentDiv() {
    // ローカルストレージに保存済のレシピ情報配列を取得
    var recipeArray = JSON.parse(localStorage.getItem(LS_KEY_RECIPE_DATA));
    console.log("★ ③localStorageより取得");

    // 各治療費計算シート画面のデータ参照個所を設定

    // -- DOC療法
    reloadDoc(getRecipeDataFromArrayById(recipeArray, '25'));
}

/**
 * DOC療法画面の初期化
 * @param {type} docRecipe DOC用ドセタキセルのレシピ
 * @returns {undefined}
 */
function reloadDoc(docRecipe) {
    console.log("▼▼▼ function reloadDoc");
    // 容量
    viewModel.docDosageLnk(docRecipe['dosage_str']);
    // 薬剤の規格
    viewModel.docStandardArray.removeAll();
    var medinas = docRecipe.commonname_per_recipe.commonname.commonname_per_medinas;
    var addLength = 4 - Object.keys(medinas).length; // 薬剤数が表示最低行数以下の場合に空行を追加する件数
    Object.keys(medinas).forEach(function (key) {
        viewModel.docStandardArray.push(medinas[key].medina);
    });

    if (addLength > 0) {
        for (var i = 0; i < addLength; i++) {
            // 空行を追加
            viewModel.docStandardArray.push({quantity_text: "　", id: "0", name: "ダミー"});
        }
    }
    console.log("▲▲▲ function reloadDoc");
}

/**
 * 体表面積を計算
 * @param {type} sVal
 * @param {type} wVal
 * @returns {Number|String}
 */
function calcBsa(sVal, wVal) {
    if (!sVal || isNaN(sVal) || !wVal || isNaN(wVal)) {
        // 空白か数値以外の場合はbsaをクリア
        return "";
    }

    var calcVal = Math.pow(wVal, 0.425) *
            Math.pow(sVal, 0.725) *
            0.007184;

    return calcVal.toFixed(3); // 小数第三位で切り捨て
}

/**
 * 療法切替
 * @param {type} linkObj リンクボタン
 * @returns {undefined}
 */
function changeRegimen(linkObj) {

    // 最終クリック個所に色を残す
    $(".navbar-side-menu li a").removeClass("now");
    $(linkObj).addClass("now");

    // ボタンのid(btn_Menu_XXX)を取得
    var btnId = $(linkObj).attr("id");

    // ボタンのidの最後の"_"以降から対象画面の療法Id(XXX)を取得
    var regimenId =
            btnId ?
            btnId.substring(btnId.lastIndexOf('_') + 1, btnId.length)
            : "other"; // idはbtn_XXXの形式に統一するが一応

    // hiddenに格納　// TODO:今のところつかってない
    $('#nowRegimen').val(regimenId);

    // 対象画面のdiv(regimen_XXX_content_div)に表示を切り替える    
    $('div[id$="_content_div"]').hide(); // idの後方一致ですべて非表示にする

    if ($('#regimen_' + regimenId + '_content_div').length) {
        $('#regimen_' + regimenId + '_content_div').show(); // 指定idのdivのみ表示
    } else {
        // 要素が無い場合はデフォルト表示(モック時のみ)
        $('#default_content_div').show();
    }
}

/**
 * 比較ボタンクリックイベント
 */
$(document).on('click', '#btnDiff', function () {

    var koJsonData = ko.toJSON(viewModel);
    var param = {
        discount_per: 3, // モーダル表示時は3割負担固定
        ko_json_data: koJsonData
    };

    $.ajax({type: 'POST',
        url: 'rest/diff/list.json',
        data: param,
        success: function (result) {
            $('#diff-modal').find('#modal-label').html(result['title']);
            $('#diff-modal').find('#modal-body').html(result['content']);
            $('#diff-modal').modal('show');
            
            // DataTable適用
            settingDataTableForDiff("burden30Per");
        },
        error: function (result) {
            alert('error:' + result.status + '(' + result.statusText + ')');
        }});
});

/**
 * ベース画面印刷ボタンクリックイベント
 */
$(document).on('click', '#btnPrintBase', function () {
    window.print();
    return false;
});

/**
 * レシピ編集モーダル表示
 * @param {type} lnkId リンクボタンId
 * @param {type} unitVal 薬剤の単位文字列 
 * @returns {undefined}
 */
function recipeEditModalShow(lnkId, unitVal) {

    console.log("▼▼▼ function recipeEditModalShow");

//    // リンクのid(lnk_Recipe_XX)を取得
//    var lnkId = linkObj.id;

    // リンクのidの最後の"_"以降から対象レシピId(XX)を取得
    var recipeId =
            lnkId ?
            lnkId.substring(lnkId.lastIndexOf('_') + 1, lnkId.length)
            : "0"; // idはlnk_Recipe_XXの形式に統一するが一応

    console.log("★recipeId：" + recipeId);

    // ローカルストレージに保存済のレシピ情報配列を取得
    var recipeArray = JSON.parse(localStorage.getItem(LS_KEY_RECIPE_DATA));
    // レシピIdに一致するレシピ情報を取得
    var recipeData = getRecipeDataFromArrayById(recipeArray, recipeId);

    // レシピ編集モーダルの表示引数に設定
    var param = {recipe_data: recipeData, unit_val: unitVal};

    $.ajax({
        url: 'rest/recipeEdit/init.json',
        type: 'POST',
        data: param
    }).done(function (result) {
        $('#recipeEdit-modal').find('#modal-label').html(result['title']);
        $('#recipeEdit-modal').find('#modal-body').html(result['content']);
        $('#recipeEdit-modal').modal('show');

        // commonname_per_medinaのIdを選択状態に反映
        rows_selected = result['useMedinaIdarray'];

        // commonname_per_medinaの再作成に使用のためセッションストレージにmednasを格納
        sessionStorage.removeItem(SS_KEY_MEDINAS_DATA);
        sessionStorage.setItem(SS_KEY_MEDINAS_DATA, JSON.stringify(result['medinasArray']));

        // DataTables適用
        var table = $('#recipeEdit-modal').find("#recipeEditTable").DataTable({
            'columnDefs': [
                {
                    'targets': 0,
                    'searchable': false,
                    'orderable': false,
                    'width': '1%',
                    'className': 'dt-body-center',
                    'render': function (data, type, full, meta) {
                        return '<input type="checkbox">';
                    },
                },
                {type: 'currency', 'targets': 3}
            ],
            'rowCallback': function (row, data, dataIndex) {
                // Get row ID
                var rowId = data[0];

                // If row ID is in the list of selected row IDs
                if ($.inArray(rowId, rows_selected) !== -1) {
                    $(row).find('input[type="checkbox"]').prop('checked', true);
                    $(row).addClass('selected');
                }
            },
            // 件数切替機能 無効
            lengthChange: false,
            // 検索機能 無効
            searching: false,
            // ソート機能 有効
            ordering: true,
            // 情報表示 無効
            info: false,
            // ページング機能 無効
            paging: false,
            // 初期表示時には並び替えをしない
            order: [],
            // スクロール設定
            scrollY: "300px",
            scrollCollapse: true,
        }).columns.adjust().draw();

        // Handle click on checkbox
        $('#recipeEditTable tbody').on('click', 'input[type="checkbox"]', function (e) {
            var $row = $(this).closest('tr');

            // Get row data
            var data = table.row($row).data();

            // Get row ID
            var rowId = data[0];

            // Determine whether row ID is in the list of selected row IDs 
            var index = $.inArray(rowId, rows_selected);

            // If checkbox is checked and row ID is not in list of selected row IDs
            if (this.checked && index === -1) {
                rows_selected.push(rowId);

                // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
            } else if (!this.checked && index !== -1) {
                rows_selected.splice(index, 1);
            }

            if (this.checked) {
                $row.addClass('selected');
            } else {
                $row.removeClass('selected');
            }

            // Update state of "Select all" control
            updateDataTableSelectAllCtrl(table);

            // Prevent click event from propagating to parent
            e.stopPropagation();
        });

        // Handle click on "Select all" control
        $('thead input[name="select_all"]', table.table().container()).on('click', function (e) {
            if (this.checked) {
                $('#recipeEditTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            } else {
                $('#recipeEditTable tbody input[type="checkbox"]:checked').trigger('click');
            }

            // Prevent click event from propagating to parent
            e.stopPropagation();
        });

        // Handle table draw event
        table.on('draw', function () {
            // Update state of "Select all" control
            updateDataTableSelectAllCtrl(table);
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("×fail(status)：" + textStatus);
        $("#XMLHttpRequest").html("XMLHttpRequest : " + jqXHR.status);
        $("#textStatus").html("textStatus : " + textStatus);
        $("#errorThrown").html("errorThrown : " + errorThrown);
    }).always(function () {
    });

    console.log("▲▲▲  function recipeEditModalShow");
}

/**
 * 数値を金額表記フォーマットに変換
 * @param {type} baseValue 元の値
 * @returns {String} カンマ区切りの値
 */
function formatPriceValue(baseValue) {
    var ret = "";
    if (!baseValue || isNaN(baseValue)) {
        return "";
    }
    ret = String(baseValue).replace(/([0-9]{1,3})(?=(?:[0-9]{3})+$)/g, '$1,');
    return ret;
}

/**
 * 金額表記フォーマットを数値に戻す
 * @param {type} formatedValue 元の値
 * @returns {String} カンマ区切りの値
 */
function unformatPriceValue(formatedValue) {
    var ret = "";
    if (formatedValue) {
        ret = formatedValue.replace(/,/g, '');
    }
    return ret;
}

/**
 * 参考使用量産出
 * @param {type} bsaVal 体表面積
 * @param {type} dosageVal 投薬量
 * @returns {Number|String} 参考使用量(引数が不正な場合は空白を返す。計算結果は小数第一位に丸める)
 */
function calcDosageVal(bsaVal, dosageVal) {
    // 参考使用量
    if (!bsaVal || isNaN(bsaVal) || !dosageVal || isNaN(dosageVal)) {
        // 空白か数値以外の場合はクリア
        return "";
    }
    var ret = bsaVal * dosageVal;
    return ret.toFixed(1); // 小数第一位に丸める
}

/**
 * 薬価自己負担額計算
 * @param {type} formatedTotalPriceVal 合計薬価(カンマ区切り)
 * @param {type} burdenPerVal 負担割合(0.X)
 * @returns {String|Number} 負担割合に応じた負担額(カンマ区切り)
 */
function CalcBurdenPrice(formatedTotalPriceVal, burdenPerVal) {
    var ret = '';
    var unformatedVal = unformatPriceValue(formatedTotalPriceVal);
    if (!unformatedVal || isNaN(unformatedVal)) {
        return ret;
    }
    ret = Math.round(unformatedVal * burdenPerVal);
    return ret > 0 ? formatPriceValue(ret) : '';
}

/**
 * DataTablesのカンマ区切り列ソート対応プラグイン
 * https://cdn.datatables.net/plug-ins/1.10.16/sorting/currency.js
 * @type type
 */
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function (a) {
        a = (a === "-") ? 0 : a.replace(/[^\d\-\.]/g, "");
        return parseFloat(a);
    },

    "currency-asc": function (a, b) {
        return a - b;
    },

    "currency-desc": function (a, b) {
        return b - a;
    }
});

/**
 * Debug用ローカルストレージ初期化＆再リロードボタンクリックイベント
 */
$(document).on('click', '#btnDebugReload', function () {
    localStorage.clear();
    sessionStorage.clear();
    location.reload(true);
    return false;
});