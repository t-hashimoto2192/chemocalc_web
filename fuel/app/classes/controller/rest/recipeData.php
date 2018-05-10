<?php

/**
 * レシピ取得Restコントローラ
 *
 */
class Controller_Rest_RecipeData extends Controller_Rest
{

    /**
     * ローカルストレージ保存用のレシピ情報を取得
     * @return type
     */
    public function get_initializeLS()
    {

        // レシピを中心に関連情報をDBから取得
        $all_recipe_data = Model_Recipe::find('all', array(
                    'related' => array(
                        'commonname_per_recipe' => array('related' => array('commonname' => array('related' => array('commonname_per_medinas' => array('related' => array('medina')))))),
                        'recipe_per_medina' => array('related' => array('medina'))
                    )
                        )
        );

        foreach ($all_recipe_data as $key => $value)
        {
            // レシピModelの補助カラムを含めた形で再設定
            $all_recipe_data[$key] = $value->to_array();
        }

        return $this->response($all_recipe_data);
    }

}
