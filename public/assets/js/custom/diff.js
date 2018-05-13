/* global viewModel */

var rowClass = '';

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
    rowClass = 'burden30Per';
    if (discount_per === "2") {
        rowClass = 'burden20Per';
    } else if (discount_per === "1") {
        rowClass = 'burden10Per';
    }

    var koJsonData = ko.toJSON(viewModel);
    var param = {
        discount_per: discount_per, 
        ko_json_data: koJsonData
    };

    $.ajax({type: 'POST',
        url: 'rest/diff/list.json',
        data: param,
        success: function (result) {
            // 既に開いているbody部のみ書き換え
            $('#diff-modal').find('#modal-body').html(result['content']);
            // DataTables適用
            $('#diff-modal').find("#diffTable").DataTable({
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
                scrollY: "330px",
                scrollCollapse: true,
            }).columns.adjust().draw();
            // テーブル行のスタイル設定
            $('#diff-modal').find('#diffTable_wrapper').addClass(rowClass);
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
    $('#diff-modal').find("#diffTable").DataTable().columns.adjust().draw();
})
$(document).on('hidden.bs.modal', '#diff-modal', function () {
})