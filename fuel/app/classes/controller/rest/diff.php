<?php

/**
 * 比較画面モーダル表示Restコントローラ
 *
 */
class Controller_Rest_Diff extends Controller_Rest
{

    public function get_list()
    {
        $data['users'] = array(
            array('id' => 123, 'name' => 'Yamada', 'tel' => '03-1234-xxxx'),
            array('id' => 456, 'name' => 'Tanaka', 'tel' => '03-1234-yyyy')
        );

        $discount_per = Input::get('discount_per');
        $discount_class = 'info';
        if ($discount_per == 2)
        {
            $discount_class = 'warning';
        } elseif ($discount_per == 1)
        {
            $discount_class = 'danger';
        }

        $data['discount_per'] = $discount_per;
        $data['discount_class'] = $discount_class;

        return $this->response(array(
                    'title' => '各治療費の比較',
                    'content' => View_Twig::forge('modal/diff', $data)->render() //仮
        ));
    }

}
