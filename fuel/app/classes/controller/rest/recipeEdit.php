<?php

use Chemocalc\Constant as Constants;

/**
 * レシピ編集画面モーダル表示Restコントローラ
 *
 */
class Controller_Rest_RecipeEdit extends Controller_Rest
{

    public function post_init()
    {
        // レシピ編集画面引数
        $data = array();

        // ローカルストレージに格納していたレシピ情報配列
        $ls_recipe_data = Input::post('recipe_data');
        // 療法別画面から受け取った薬剤の単位(mg/㎡, [カプセル], [本]など)
        $unit_val = Input::post('unit_val');

        // タイトル
        $recipe_title = $ls_recipe_data['name'] . '編集';

        $data['data_recipe'] = $ls_recipe_data;

        // 現在の容量
        $data['base_dosage_label'] = $ls_recipe_data['dosage_str'] . $unit_val;
        // 初期値
        $data['default_dosage_label'] = $ls_recipe_data['default_dosage_str'] . $unit_val;

        // 使用薬剤一般名のId
        $commonname_id = $ls_recipe_data['commonname_per_recipe']['commonname_id'];
        // 使用薬剤リストをDBから取得
        $medina_data = Model_Commonname::find($commonname_id, array('related' => array('medinas')));
        $data['medinas'] = $medina_data['medinas'];

        // 使用中の薬剤Id配列
        // これを利用して薬剤一覧にチェックを入れる
        $use_medina_data_array = array();

        $cpms = $ls_recipe_data['commonname_per_recipe']['commonname']['commonname_per_medinas'];
        foreach ($cpms as $value)
        {
            array_push($use_medina_data_array, $value['medina_id']);
        }

        return $this->response(array(
                    'title' => $recipe_title,
                    'useMedinaIdarray' => $use_medina_data_array,
					'medinasArray' => $medina_data['medinas'], // 使用薬剤変更用にセッションストレージに格納する
                    'content' => View_Twig::forge('modal/recipeEdit', $data)->render()
        ));
    }

}
