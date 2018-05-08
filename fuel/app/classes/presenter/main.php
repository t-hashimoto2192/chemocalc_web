<?php

use Chemocalc\Constant as Constants;

class Presenter_Main extends Presenter
{

    public function view()
    {
        $this->title = 'Chemocalc_WEB';

        // 初期ページ
        $this->default_content = View_Twig::forge('regimen/default');

        // ◆◆◆ FEC療法ページ ◆◆◆
        $data_fec = array();
        // 5-FU
        $recipe_5fu = Model_Recipe::find(Constants\RecipeDataID::FIVEFU);
        $data_fec['recipe_5fu'] = $recipe_5fu->to_array();
        // CPA
        $data_fec['recipe_cpa'] = Model_Recipe::find(Constants\RecipeDataID::FEC_CPA)->to_array();

        $this->fec_content = View_Twig::forge('regimen/fec', $data_fec);

        // ◆◆◆ DOC療法ページ ◆◆◆
        $this->doc_content = View_Twig::forge('regimen/doc');
    }

}
