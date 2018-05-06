<?php

class Presenter_Main extends Presenter
{

    public function view()
    {
        $this->title = 'Chemocalc_WEB';

        // 初期ページ
        $this->default_content = View_Twig::forge('regimen/default');

        // FEC療法ページ
		$fec_data = array();
		$fec_data['recipe_5fu'] = Model_Recipe::find(17)->to_array();
        $this->fec_content = View_Twig::forge('regimen/fec', $fec_data);
    }

}
