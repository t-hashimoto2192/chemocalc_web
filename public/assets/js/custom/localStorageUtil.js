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
        
        hoge();
        
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

    // ローカルストレージに保存済のレシピ情報配列を取得
    var recipeArray = JSON.parse(localStorage.getItem(LS_KEY_RECIPE_DATA));
    if (!recipeArray) {
        // レシピ容量配列が存在しないので新規作成して追加
        recipeArray = new Array();
        recipeArray.push(recipeDataVal);
    } else {
        isUpdate = false; // 同一Idレシピの登録があるか？
        jQuery.each(recipeArray, function (index, value) {
            if (value['id'] === recipeIdVal) {
                // 同一Idレシピのデータを更新
                recipeArray[index] = recipeDataVal;
                isUpdate = true;
                return false;
            }
        });

        if (!isUpdate) {
            // 同一Idレシピの登録が無い場合追加
            recipeArray.push(recipeDataVal);
        }
    }

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