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
    
    /* ★☆★ 療法別画面 ★☆★ */
    
    /* FEC */
    this.fec_fu_ref = ko.observable('0');
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
 * サイドメニューのボタンクリックイベント
 */
//$(document).on('click', '.navbar-side-menu li a', function () {
//    
//    changeRegimen(this);
//
//});

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
            $('#modal-label').html(result['title']);
            $('#modal-body').html(result['content']);
            $('#diff-modal').modal('show');
            // テーブル行のスタイル設定
            $("#diffTable").find("tbody > tr:even").addClass("info");
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
 * 比較画面X割負担ボタンクリックイベント
 * 割引率を変更して再計算後body部のみ書き換える
 */
$(document).on('click', 'button[id^="btnDiscont_"]', function () {

    // ボタンのid(btnDiscont_XXX)を取得
    var btnId = $(this).attr("id");

    // ボタンのidの最後の"_"以降から負担割合(XXX)を取得
    var discount_per = btnId.substring(btnId.lastIndexOf('_') + 1, btnId.length);
    // テーブル行のスタイル
    var rowClass = 'info';
    if (discount_per == 2) {
        rowClass = 'warning';
    } else if (discount_per == 1) {
        rowClass = 'danger';
    }

    var param = {discount_per: discount_per};
    $.ajax({type: 'GET',
        url: 'rest/diff/list.json',
        data: param,
        success: function (result) {
            // 既に開いているbody部のみ書き換え
            $('#modal-body').html(result['content']);
            // テーブル行のスタイル設定
            $("#diffTable").find("tbody > tr:even").addClass(rowClass);
        },
        error: function (result) {
            alert('error:' + result.status + '(' + result.statusText + ')');
        }});
});

/**
 * 比較画面モーダル印刷ボタンクリックイベント
 */
$(document).on('click', '#btnPrintDiff', function () {
    window.print();
    return false;
});

$(document).on('shown.bs.modal', '#diff-modal', function () {
})
$(document).on('hidden.bs.modal', '#diff-modal', function () {
})


