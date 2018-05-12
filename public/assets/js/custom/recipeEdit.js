/* global viewModel, LS_KEY_RECIPE_DATA, rows_selected */

/*
 * 使用薬剤選択テーブルの全選択/全解除
 * @param {type} table
 * @returns {undefined}
 */
function updateDataTableSelectAllCtrl(table) {
    var $table = table.table().node();
    var $chkbox_all = $('tbody input[type="checkbox"]', $table);
    var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
    var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

    // If none of the checkboxes are checked
    if ($chkbox_checked.length === 0) {
        chkbox_select_all.checked = false;
        if ('indeterminate' in chkbox_select_all) {
            chkbox_select_all.indeterminate = false;
        }

        // If all of the checkboxes are checked
    } else if ($chkbox_checked.length === $chkbox_all.length) {
        chkbox_select_all.checked = true;
        if ('indeterminate' in chkbox_select_all) {
            chkbox_select_all.indeterminate = false;
        }

        // If some of the checkboxes are checked
    } else {
        chkbox_select_all.checked = true;
        if ('indeterminate' in chkbox_select_all) {
            chkbox_select_all.indeterminate = true;
        }
    }
}



/**
 * レシピ変更ボタンクリックイベント
 */
$(document).on('click', '#btnRecipeChange', function () {
    // レシピ変更処理
    execRecipeChange();
    return false;
});

/**
 * DatTables適用テーブルの列幅再調整をモーダル表示イベントで実施
 */
$(document).on('shown.bs.modal', '#recipeEdit-modal', function () {
    var table = $('#recipeEdit-modal').find("#recipeEditTable").DataTable();
    table.columns.adjust().draw();
})
$(document).on('hidden.bs.modal', '#recipeEdit-modal', function () {
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

    // テーブルのチェック行からcommonname_per_medinasのデータを再作成する
    var dt = $('#recipeEditTable').DataTable();
    dt.rows().every(function () {
        var d = this.data();

        // 使用薬剤テーブルのチェック状態を取得
        $.each(rows_selected, function (index, medinaId) {
            if (d[0] == medinaId){
                // 選択行
                console.log('選択薬剤：' + d);
                // TODO:commonname_per_medinaを再現するにはIdも必要なので隠し列に持たせる？
            }
        });
    });
    
    
    

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

///**
// * 容量をローカルストレージに保存
// * @returns {undefined}
// */
//function updateRecipeDosageForLocalStorage(recipeIdVal, inputDosageVal) {
//
//    console.log("▼▼▼ function updateRecipeDosageForLocalStorage");
//
//    var datalist = {
//        id: recipeIdVal,
//        dosage_str: inputDosageVal
//    };
//
//    // ローカルストレージに保存済のレシピ容量配列を取得
//    var recipeDosageArray = JSON.parse(localStorage.getItem(LS_KEY_RECIPE_DATA));
//    if (!recipeDosageArray) {
//        // レシピ容量配列が存在しないので新規作成して追加
//        recipeDosageArray = new Array();
//        recipeDosageArray.push(datalist);
//    } else {
//        isUpdate = false; // 同一Idレシピの登録があるか？
//        jQuery.each(recipeDosageArray, function (index, value) {
//            if (value['recipeId'] === recipeIdVal) {
//                // 同一Idレシピの容量を更新
//                recipeDosageArray[index] = datalist;
//                isUpdate = true;
//                return false
//            }
//        });
//
//        if (!isUpdate) {
//            // 同一Idレシピの登録が無かったため追加
//            recipeDosageArray.push(datalist);
//        }
//    }
//
//    // json形式でローカルストレージに保存(毎回上書き)
//    localStorage.setItem(LS_KEY_RECIPE_DATA, JSON.stringify(recipeDosageArray));
//
//    console.log("▲▲▲ function updateRecipeDosageForLocalStorage");
//}

