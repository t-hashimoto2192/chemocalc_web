/* global viewModel */

/**
 * 比較画面モーダル印刷ボタンクリックイベント
 */
$(document).on('click', '#btnrecipeDosageChange', function () {

    // レシピID
    var recipeIdVal = $('#hdnRecipeId').val();

    // 設定後の容量
    var inputDosageVal = $('#txtInputDosage').val();

    // 容量をローカルストレージに保存
    updateRecipeDosageForLocalStorage(recipeIdVal, inputDosageVal);

    // TODO:再計算(容量だけなら参考使用量のみ、薬剤変更実装後は全部)
    switch (recipeIdVal) {
        case "25":
            viewModel.docDosageLnk(inputDosageVal); 
            break;

        default:

            break;
    }

    // ダイアログ閉じる
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
function updateRecipeDosageForLocalStorage(recipeIdVal, inputDosageVal) {

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