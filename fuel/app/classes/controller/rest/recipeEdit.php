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

        // タイトル
        $recipe_title = $ls_recipe_data['name'] . '編集';

        $data['data_recipe'] = $ls_recipe_data;

        // 現在の容量
        $data['base_dosage_label'] = $ls_recipe_data['dosage_str'] . 'mg/㎡';

        // 初期値
        $data['default_dosage_label'] = $ls_recipe_data['default_dosage_str'] . 'mg/㎡';

        // 使用薬剤一般名のId
        $commonname_id = $ls_recipe_data['commonname_per_recipe']['commonname_id'];
        // 使用薬剤リストをDBから取得
        $medina_data = Model_Commonname::find($commonname_id, array(
                    'related' => array('medinas')
                        )
        );

        $data['medinas'] = $medina_data['medinas'];

        // 使用中の薬剤
        // TODO：これを利用して薬剤一覧にチェックを入れる
        $use_medina_data = $ls_recipe_data['commonname_per_recipe']['commonname']['commonname_per_medinas'];

        $data['use_medina_data'] = $use_medina_data;

        return $this->response(array(
                    'title' => $recipe_title,
                    'content' => View_Twig::forge('modal/recipeEdit', $data)->render()
        ));
    }

//    public function get_init()
//    {
//        // 薬剤容量編集画面引数
//        $data = array();
//
//        // リンクのidを取得
//        $lnk_id = Input::get('lnk_id');
//
//        // レシピを取得
//        $recipe_id = -1;
//        switch ($lnk_id):
//            case 'lnk_Fec5fu':
//                $recipe_id = Constants\RecipeDataID::FIVEFU;
//                break;
//            case 'lnk_FecCpa':
//                $recipe_id = Constants\RecipeDataID::FEC_CPA;
//                break;
//            case 'lnk_DocDoc':
//                $recipe_id = Constants\RecipeDataID::DOC_DOC;
//                break;
//        endswitch;
//
//        $recipe = Model_Recipe::find($recipe_id);
//
//        $data['data_recipe'] = $recipe->to_array();
//
//        // $data['data_recipe_json'] = Format::forge($recipe)->to_json(); //jsonで格納するサンプル
//        // TODO:localStorageに値があればそちらを優先したい
//        // タイトル
//        $recipe_title = $data['data_recipe']['name'] . '編集';
//
//        // 現在の容量
//        $data['base_dosage_label'] = $data['data_recipe']['dosage_str'] . 'mg/㎡';
//
//        // 設定後の容量
//        $data['input_dosage'] = $data['data_recipe']['dosage_str'];
//
//        // 初期値
//        $data['default_dosage_label'] = $data['data_recipe']['default_dosage_str'] . 'mg/㎡';
//
//        return $this->response(array(
//                    'title' => $recipe_title,
//                    'content' => View_Twig::forge('modal/recipeDosageEdit', $data)->render() //仮
//        ));
//    }
}
