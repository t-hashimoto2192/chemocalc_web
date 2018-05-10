<?php

use Chemocalc\Constant as Constants;

class Controller_Main extends Controller
{

    public function action_index()
    {

        $data = array();

        // view参照用にレシピId定義クラスをjsonに変換して渡す
        // TODO:レシピIDじゃなくてレジメンIdwo渡す
        $data['recipe_id_json'] = json_encode(new Constants\RecipeDataID());

        // viewファイルの指定(views/XXXX.twig)
        // プレゼンターの指定でもある(presenter/XXXX.php)
        // 上記はセットで必要
        $view = 'main';

        // TwigのViewを生成
        $twig = \View_Twig::forge($view, $data);

        // Presenterの第4引数にTwigのViewを渡す
        $presenter = \Presenter::Forge($view, 'view', null, $twig);

        return \Response::forge($presenter);
    }

}
