/* global LS_KEY_RECIPE_DATA */

/**
 * ローカルストレージの療法別データ初期設定
 * @returns {undefined}
 */
function initializeLsRecipeDataArray() {

    console.log("▼▼▼ function initializeLsRecipeDataArray");

    $.ajax({
        url: 'rest/recipeData/initializeLS.json',
        type: 'GET',
        dataType: "json"
    }).done(function (result) {
        // 取得結果をローカルストレージに設定
        console.log("★ ②localStorageに設定");
        localStorage.setItem(LS_KEY_RECIPE_DATA, JSON.stringify(result));
        // 各画面の初期化
        initializeContentDiv();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $("#XMLHttpRequest").html("XMLHttpRequest : " + jqXHR.status);
        $("#textStatus").html("textStatus : " + textStatus);
        $("#errorThrown").html("errorThrown : " + errorThrown);
    }).always(function () {
    });
    
    console.log("▲▲▲ function initializeLsRecipeDataArray");
}

/**
 * ローカルストレージの療法別データをレシピ単位で更新
 * @param {type} recipeIdVal
 * @param {type} recipeDataVal
 * @returns {undefined}
 */
function updateLsRecipeDataArray(recipeIdVal, recipeDataVal) {

    console.log("▼▼▼ function updateLsRecipeDataArray");
    
    // TODO:使用薬剤変更結果は同一一般名薬剤を使用する別レシピ配下にも適用が必要
    var commonNamePerMedinas = recipeDataVal['commonname_per_recipe']['commonname']['commonname_per_medinas'];

    // ローカルストレージに保存済のレシピ情報配列を取得
    var recipeArray = JSON.parse(localStorage.getItem(LS_KEY_RECIPE_DATA));
    var isUpdate = false;
    jQuery.each(recipeArray, function (index, value) {

        if (value['commonname_per_recipe']['commonname_id'] === recipeDataVal['commonname_per_recipe']['commonname_id']){
            // 処理中のレシピと一般名が同じ薬剤を使用するレシピのcommonname_per_medinasも同時に差し替え
            recipeArray[index]['commonname_per_recipe']['commonname']['commonname_per_medinas'] = commonNamePerMedinas;      
        }

        if (!isUpdate && value['id'] === recipeIdVal) {
            // 処理中のレシピのデータを更新
            recipeArray[index] = recipeDataVal;
            isUpdate = true;
        }
    });

    // json形式でローカルストレージに保存(毎回上書き)
    localStorage.setItem(LS_KEY_RECIPE_DATA, JSON.stringify(recipeArray));
    
    console.log("▲▲▲ function updateLsRecipeDataArray");
}

/**
 * レシピデータ配列からid指定でレシピデータを取得
 * @param {type} arrayVal
 * @param {type} recipeIdVal レシピId
 * @returns {getRecipeDosageArrayById.arrayVal|Boolean} レシピデータ(無ければfalse)
 */
function getRecipeDataFromArrayById(arrayVal, recipeIdVal) {
    var ret;
    if (!arrayVal) {
        return false;
    } else {
        jQuery.each(arrayVal, function (index, value) {
            if (value['id'] === recipeIdVal) {
                ret = arrayVal[index];
                return false;
            }
        });
        return ret;
    }
}

/**
 * 薬剤データ配列からid指定で薬剤データを取得
 * @param {type} arrayVal
 * @param {type} medinaIdVal 薬剤ID
 * @returns {getMedinaDataFromArrayById.arrayVal|Boolean} レシピデータ(無ければfalse)
 */
function getMedinaDataFromArrayById(arrayVal, medinaIdVal) {
    var ret;
    if (!arrayVal) {
        return false;
    } else {
        jQuery.each(arrayVal, function (index, value) {
            if (value['id'] === medinaIdVal) {
                ret = arrayVal[index];
                return false;
            }
        });
        return ret;
    }
}