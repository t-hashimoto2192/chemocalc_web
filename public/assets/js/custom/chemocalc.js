/* knockout.js ViewModel定義 */

// 体表面積計算用ViewModel TODO:全体でひとつにするかも
var bsaViewModel = function () {

    /* 体表面積計算フォーム */
    // 身長
    this.stature = ko.observable('');
    // 体重
    this.weight = ko.observable('');
    // 体表面積
    this.bsa = ko.computed(function () {
        var sVal = this.stature();
        var wVal = this.weight();
        var bsaVal = calcBsa(sVal, wVal);  
        return bsaVal;
    }, this);

    /* サイドメニューのクリックイベント */
    this.clickMenu = function(data, event) {
        changeRegimen(event.target);
    };
    
    /* 薬剤容量リンクのクリックイベント */
    this.clickRecipeDosageLink = function(data, event) {
        recipeDosageEditModalShow(event.target);
    };
    
    /* ★☆★ 療法別画面 ★☆★ */
    
    /* FEC */
    this.fec_fu_ref = ko.observable('0');
    this.fec_fu_val = ko.observable('');
};

/**
 * onload処理
 * @returns {undefined}
 */
window.onload = function () {

    // 体表面積計算用ViewModel
    ko.applyBindings(new bsaViewModel());//, $("#bsaCalcForm")[0]);//複数の場合はバインド先要素を指定
};

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
            
    // hiddenに格納
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
    
    // リンクのid(lnk_XXX)を取得
    var lnkId = $(linkObj).attr("id");
    
    // モーダル表示時は3割負担固定
    var param = {lnk_id: lnkId};
    
    $.ajax({type: 'GET',
        url: 'rest/recipeDosageEdit/init.json',
        data: param,
        success: function (result) {
            $('#recipeDosageEdit-modal').find('#modal-label').html(result['title']);
            $('#recipeDosageEdit-modal').find('#modal-body').html(result['content']);
            $('#recipeDosageEdit-modal').modal('show');
            // テーブル行のスタイル設定
//            $('#recipeDosageEdit-modal').find('#diffTable').find("tbody > tr:even").addClass("info");
        },
        error: function (result) {
            alert('error:' + result.status + '(' + result.statusText + ')');
        }});
}




