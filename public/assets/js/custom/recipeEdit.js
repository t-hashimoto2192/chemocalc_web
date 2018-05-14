/* global viewModel, LS_KEY_RECIPE_DATA, rows_selected, SS_KEY_MEDINAS_DATA */

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

    // -- 薬剤容量の変更の反映 --

    // レシピIdに一致するレシピ情報をローカルストレージから取得
    var recipeData = getRecipeDataFromLsById(recipeIdVal);

    // レシピ情報の容量の値を更新
    recipeData['dosage_str'] = inputDosageVal;
    
     // -- 使用薬剤の変更の反映 --
     
     // セッションストレージに保存済のレシピ情報配列を取得
    var medinasArray = JSON.parse(sessionStorage.getItem(SS_KEY_MEDINAS_DATA));
    
    // テーブルのチェック行からcommonname_per_medinasのデータを再作成する
    $newCommonNamePerMedinas = new Array();
    $.each(rows_selected, function (index, medinaId) {
        // 薬剤Idに一致する薬剤情報を取得
        var medinaData = getMedinaDataFromArrayById(medinasArray, medinaId);
        // commonname_per_medinaを復元(Idは単なるPKで不使用なので特に再設定しない)
        var $newCommonNamePerMedina = {
            id: '', 
            medina_id: medinaData['id'], 
            commonname_id: medinaData['commonname_id'],
            medina: medinaData
        };
        $newCommonNamePerMedinas.push($newCommonNamePerMedina);
    });
    
    // commonname_per_medinasのデータを再設定する
    recipeData['commonname_per_recipe']['commonname']['commonname_per_medinas'] = $newCommonNamePerMedinas;

    // レシピ情報の変更をローカルストレージに反映
    updateLsRecipeDataArray(recipeIdVal, recipeData);

    // 各画面の初期化
    initializeContentDiv();

    // ダイアログ閉じる
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#recipeEdit-modal').modal('hide');
    console.log("▲▲▲ function execRecipeChange");
}