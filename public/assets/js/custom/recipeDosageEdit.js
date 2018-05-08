///**
// * 比較画面X割負担ボタンクリックイベント
// * 割引率を変更して再計算後body部のみ書き換える
// */
//$(document).on('click', 'button[id^="btnDiscont_"]', function () {
//
//    // ボタンのid(btnDiscont_XXX)を取得
//    var btnId = $(this).attr("id");
//
//    // ボタンのidの最後の"_"以降から負担割合(XXX)を取得
//    var discount_per = btnId.substring(btnId.lastIndexOf('_') + 1, btnId.length);
//    // テーブル行のスタイル
//    var rowClass = 'info';
//    if (discount_per == 2) {
//        rowClass = 'warning';
//    } else if (discount_per == 1) {
//        rowClass = 'danger';
//    }
//
//    var param = {discount_per: discount_per};
//    $.ajax({type: 'GET',
//        url: 'rest/diff/list.json',
//        data: param,
//        success: function (result) {
//            // 既に開いているbody部のみ書き換え
//            $('#diff-modal').find('#modal-body').html(result['content']);
//            // テーブル行のスタイル設定
//            $('#diff-modal').find('#diffTable').find("tbody > tr:even").addClass(rowClass);
//        },
//        error: function (result) {
//            alert('error:' + result.status + '(' + result.statusText + ')');
//        }});
//});

/**
 * 比較画面モーダル印刷ボタンクリックイベント
 */
$(document).on('click', '#btnrecipeDosageChange', function () {

    // 容量をローカルストレージに保存
    updateRecipeDosageForLocalStorage();

    // TODO:ダイアログ閉じる & 再計算(容量だけなら参考使用量のみ、薬剤変更実装後は全部)
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#recipeDosageEdit-modal').modal('hide');

    return false;
});

$(document).on('shown.bs.modal', '#recipeDosageEdit-moda', function () {
})
$(document).on('hidden.bs.modal', '#recipeDosageEdit-moda', function () {
})

/**
 * 容量をローカルストレージに保存
 * @returns {undefined}
 */
function updateRecipeDosageForLocalStorage() {
    
    // レシピID
    var recipeIdVal = $('#hdnRecipeId').val();

    // 設定後の容量
    var inputDosageVal = $('#txtInputDosage').val();

    var datalist = {
        recipeId: recipeIdVal,
        inputDosage: inputDosageVal
    };

    // ローカルストレージに保存済のレシピ容量配列を取得
    var recipeDosageArray = JSON.parse(localStorage.getItem("recipe_dosage_array"));
    if (!recipeDosageArray) {
        // レシピ容量配列が存在しないので新規作成して追加
        recipeDosageArray = new Array();
        recipeDosageArray.push(datalist);
    } else {
        isUpdate = false; // 同一Idレシピの登録があるか？
        jQuery.each(recipeDosageArray, function (index, value) {
            if (value['recipeId'] === recipeIdVal) {
                // 同一Idレシピの容量を更新
                recipeDosageArray[index] = datalist;
                isUpdate = true;
                return false
            }
        });

        if (!isUpdate) {
            // 同一Idレシピの登録が無かったため追加
            recipeDosageArray.push(datalist);
        }
    }

    // json形式でローカルストレージに保存(毎回上書き)
    localStorage.setItem("recipe_dosage_array", JSON.stringify(recipeDosageArray));
}