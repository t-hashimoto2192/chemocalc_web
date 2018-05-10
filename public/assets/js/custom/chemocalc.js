// 定数

/**
 * レシピデータのローカルストレージ保存キー
 * ※バージョンアップ時の対応
 * ・1.この値を用いたローカルストレージデータ削除処理を追記する
 * ・2.値を変更する
 * @type String
 */
const LS_KEY_RECIPE_DATA = 'recipe_data_array_2018';

// グローバル変数

// knockout.jsのViewModel
var viewModel = new settingViewModel();

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

    // knockout.js ViewModelバインド
    ko.applyBindings(viewModel);

    console.log("▲▲▲ function window.onload");
};

/**
 * 各治療費計算シート領域の初期化
 * @returns {undefined}
 */
function initializeContentDiv(){
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
    viewModel.docDosageLnk(docRecipe['dosage_str']);
}

function updateLsRecipeData(lsRecipeDataVal, recipeIdVal) {

    console.log("◆function getRecipeData◆");

    var param = {recipe_id: recipeIdVal, recipe_data: JSON.stringify(lsRecipeDataVal)};

    console.log("★recipe_id：" + recipeIdVal);

    $.ajax({
        url: 'rest/recipeData/select.json',
        type: 'POST',
        data: param,
        dataType: "json"
    }).done(function (result) {
        console.log("★result：" + result);
        // TODO:ここで再設定？
        updateRecipeForLocalStorage(recipeIdVal, result);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $("#XMLHttpRequest").html("XMLHttpRequest : " + jqXHR.status);
        $("#textStatus").html("textStatus : " + textStatus);
        $("#errorThrown").html("errorThrown : " + errorThrown);
    }).always(function () {
    });
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
    // モーダル表示時は3割負担固定
    var param = {discount_per: 3};
    $.ajax({type: 'GET',
        url: 'rest/diff/list.json',
        data: param,
        success: function (result) {
            $('#diff-modal').find('#modal-label').html(result['title']);
            $('#diff-modal').find('#modal-body').html(result['content']);
            $('#diff-modal').modal('show');
            // テーブル行のスタイル設定
            $('#diff-modal').find('#diffTable').find("tbody > tr:even").addClass("info");
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
 * @param {type} linkObj リンクボタン
 * @returns {undefined}
 */
function recipeEditModalShow(linkObj) {

    console.log("▼▼▼ function recipeEditModalShow");

    // リンクのid(lnk_Recipe_XX)を取得
    var lnkId = linkObj.id;

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
    var param = {recipe_data: recipeData};

    $.ajax({
        url: 'rest/recipeEdit/init.json',
        type: 'POST',
        data: param
    }).done(function (result) {
        $('#recipeEdit-modal').find('#modal-label').html(result['title']);
        $('#recipeEdit-modal').find('#modal-body').html(result['content']);
        $('#recipeEdit-modal').modal('show');
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("×fail(status)：" + textStatus);
        $("#XMLHttpRequest").html("XMLHttpRequest : " + jqXHR.status);
        $("#textStatus").html("textStatus : " + textStatus);
        $("#errorThrown").html("errorThrown : " + errorThrown);
    }).always(function () {
    });

    console.log("▲▲▲  function recipeEditModalShow");
}




