<?php

class Controller_Main extends Controller
{

    public function action_index()
    {
        // viewファイルの指定(views/XXXX.twig)
        // プレゼンターの指定でもある(presenter/XXXX.php)
        // 上記はセットで必要
        $view = 'main';

        // TwigのViewを生成
        $twig = \View_Twig::forge($view);

        // Presenterの第4引数にTwigのViewを渡す
        $presenter = \Presenter::Forge($view, 'view', null, $twig);

        return \Response::forge($presenter);
    }

}
