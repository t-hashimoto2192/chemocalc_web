<?php

/**
 * 比較画面モーダル表示Restコントローラ
 *
 */
class Controller_Rest_Diff extends Controller_Rest
{

    public function post_list()
    {
        // 自己負担割合(X割)
        $discount_per = Input::post('discount_per');
        // knockoutバインドデータ(療法別自己負担額取得用)
        $ko_json_data = Input::post('ko_json_data');
        // 連想配列に変換
        $ko_array_data = json_decode($ko_json_data, true);


        $priceDataArray = array();


        // 各療法画面で薬価計算終了済みの療法の薬価情報を設定
        if ($ko_array_data['docTotalPrice'])
        {
            // DOC療法の薬価算出済
            // 自己負担額計算済みの値(カンマ区切りを取得)
            $pKey = sprintf('%sTotalPrice%s0per', 'doc', $discount_per);
            $formatedPrice = $ko_array_data[$pKey];
            $unformatedPrice = str_replace(',', '', $formatedPrice);
            $priceData = array(
                'regimenName' => 'DOC',
                'oncePrice' => number_format($unformatedPrice) . ' 円/回',
                'oneCoursePrice' => '⇒　　' . number_format($unformatedPrice) . ' 円/3週'
            );
            array_push($priceDataArray, $priceData);
        }

        // 最低行数まで埋める
        $listAddSize = 15 - count($priceDataArray);
        if ($listAddSize > 0)
        {
            for ($index = 0; $index < $listAddSize; $index++)
            {
                $priceData = array(
                    'regimenName' => ' ',
                    'oncePrice' => '',
                    'oneCoursePrice' => ''
                );
                array_push($priceDataArray, $priceData);
            }
        }

        // テーブル表示用データ
        $data['priceDataArray'] = $priceDataArray;

        // 自己負担割合別スタイル
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
