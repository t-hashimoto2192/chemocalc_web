/* global viewModel, LS_KEY_RECIPE_DATA */

/**
 * レシピ変更ボタンクリックイベント
 */
$(document).on('click', '#btnRecipeChange', function () {
    // レシピ変更処理
    execRecipeChange();
    return false;
});

$(document).on('shown.bs.modal', '#recipeEdit-moda', function () {
})
$(document).on('hidden.bs.modal', '#recipeEdit-moda', function () {
});

/**
 * レシピ変更
 * @returns {undefined}
 */
function execRecipeChange() {
    console.log("▼▼▼ function execRecipeChange");
    // レシピID
    var recipeIdVal = $('#hdnRecipeId').val();

    // 設定後の容量
    var inputDosageVal = $('#txtInputDosage').val();

    // ローカルストレージに保存済のレシピ情報配列を取得
    var recipeArray = JSON.parse(localStorage.getItem(LS_KEY_RECIPE_DATA));
    // レシピIdに一致するレシピ情報を取得
    var recipeData = getRecipeDataFromArrayById(recipeArray, recipeIdVal);

    // レシピ情報の容量の値を更新
    recipeData['dosage_str'] = inputDosageVal;

    // レシピ情報の変更をローカルストレージに反映
    updateLsRecipeDataArray(recipeIdVal, recipeData);

    // TODO:再計算(容量だけなら参考使用量のみ、薬剤変更実装後は全部)
    switch (recipeIdVal) {
        case "25":
            reloadDoc(recipeData);
            break;

        default:

            break;
    }

    // ダイアログ閉じる
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#recipeEdit-modal').modal('hide');
    console.log("▲▲▲ function execRecipeChange");
}

/**
 * 容量をローカルストレージに保存
 * @returns {undefined}
 */
function updateRecipeDosageForLocalStorage(recipeIdVal, inputDosageVal) {

    console.log("▼▼▼ function updateRecipeDosageForLocalStorage");

    var datalist = {
        id: recipeIdVal,
        dosage_str: inputDosageVal
    };

    // ローカルストレージに保存済のレシピ容量配列を取得
    var recipeDosageArray = JSON.parse(localStorage.getItem(LS_KEY_RECIPE_DATA));
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
    localStorage.setItem(LS_KEY_RECIPE_DATA, JSON.stringify(recipeDosageArray));

    console.log("▲▲▲ function updateRecipeDosageForLocalStorage");
}

