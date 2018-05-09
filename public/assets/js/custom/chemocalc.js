// グローバル変数として定義
var viewModel = new settingViewModel();

/**
 * onload処理
 * @returns {undefined}
 */
window.onload = function () {

    // ローカルストレージに保存済のレシピ容量配列を取得
    var recipeDosageArray = JSON.parse(localStorage.getItem("recipe_dosage_array"));

    // DOC療法
    reloadDoc(recipeDosageArray);

    // knockout.js ViewModelバインド
    ko.applyBindings(viewModel);
};

function reloadDoc(arrayVal) {
    console.log("◆function reloadDoc◆");
    // DOC用ドセタキセルのレシピ
    var docRecipe = getRecipeDosageArrayById(arrayVal, '25');
    if (docRecipe) {
        console.log("★BEFORE★viewModel.docDosageLnk：" + viewModel.docDosageLnk);
//        viewModel.docDosageLnk = docRecipe['inputDosage'];
viewModel.docDosageLnk(docRecipe['inputDosage']);
        console.log("★AFTER★viewModel.docDosageLnk：" + viewModel.docDosageLnk);
    } else {
        // DBから取得
    }
}

function getRecipeDosageArrayById(arrayVal, recipeIdVal) {
    var ret;
    if (!arrayVal) {
        return false;
    } else {
        jQuery.each(arrayVal, function (index, value) {
            if (value['recipeId'] === recipeIdVal) {
                ret = arrayVal[index];
                return false;
            }
        });
        return ret;
    }
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
    return ret = Math.ceil(calcVal * 1000) / 1000; // 小数第三位で切り捨て
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

    // ボタンのid(btn_XXX)を取得
    var btnId = $(linkObj).attr("id");

    // ボタンのidの最後の"_"以降から対象画面名(XXX)を取得
    var targetName =
            btnId ?
            btnId.substring(btnId.lastIndexOf('_') + 1, btnId.length)
            : "other"; // idはbtn_XXXの形式に統一するが一応

    // hiddenに格納　// TODO:つかってない
    $('#nowRegimen').val(targetName);

    // 対象画面のdiv(XXX_content_div)に表示を切り替える    
    $('div[id$="_content_div"]').hide(); // idの後方一致ですべて非表示にする
    $('#' + targetName + '_content_div').show(); // 指定idのdivのみ表示

    // モック時のみ
    if (targetName + '_content_div' === 'other_content_div') {
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
 * 薬剤容量編集モーダル表示
 * @param {type} linkObj リンクボタン
 * @returns {undefined}
 */
function recipeDosageEditModalShow(linkObj) {

console.log("◆function recipeDosageEditModalShow◆");

    // リンクのid(lnk_XXX)を取得
    var lnkId = $(linkObj).attr("id");
    var param = {lnk_id: lnkId};
    
    console.log("★lnkId：" + lnkId);

    $.ajax({
        url: 'rest/recipeDosageEdit/init.json',
        type: 'GET',
        data: param
    }).done(function (result) {
        $('#recipeDosageEdit-modal').find('#modal-label').html(result['title']);
        $('#recipeDosageEdit-modal').find('#modal-body').html(result['content']);
        $('#recipeDosageEdit-modal').modal('show');
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $("#XMLHttpRequest").html("XMLHttpRequest : " + jqXHR.status);
        $("#textStatus").html("textStatus : " + textStatus);
        $("#errorThrown").html("errorThrown : " + errorThrown);
    }).always(function () {
    });
}




