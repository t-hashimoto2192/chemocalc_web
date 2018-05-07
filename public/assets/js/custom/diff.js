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
            $('#diff-modal').find('#modal-body').html(result['content']);
            // テーブル行のスタイル設定
            $('#diff-modal').find('#diffTable').find("tbody > tr:even").addClass(rowClass);
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