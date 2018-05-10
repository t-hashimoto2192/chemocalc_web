<?php

use Chemocalc\Util as Util;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of recipe
 *
 * @author t-has
 */
class Model_Recipe extends Orm\Model
{

    protected static $_table_name = 'recipe';
    protected static $_properties = array(
        'id',
        'name',
        'dosage',
        'dosage_exp',
        'default_dosage',
        'default_dosage_exp',
        'regimen_id');

    //recipe→ commonname_per_recipe → commonname → commonname_per_medina→medina

    /**
     * リレーション定義(一対一)
     * @var type
     */
    protected static $_has_one = array(
        'commonname_per_recipe' => array(
            'model_to' => 'Model_Commonname_Per_Recipe',
            'key_from' => 'id',
            'key_to' => 'recipe_id',
        ),
        'recipe_per_medina' => array(
            'model_to' => 'Model_Recipe_Per_Medina',
            'key_from' => 'id',
            'key_to' => 'recipe_id',
        ),
    );

    /**
     * to_arrayのオーバーライド
     * 演算項目を追加で設定する
     * dosage_str：指数調整した容量文字列
     * default_dosage_str：指数調整した初期容量文字列
     */
    public function to_array($custom = false, $recurse = false, $eav = false)
    {
        $ret = parent::to_array();
        $ret = array_merge($ret, array('dosage_str' => Util\ChemocalcUtil::expCalculate($this->dosage, $this->dosage_exp)));
        $ret = array_merge($ret, array('default_dosage_str' => Util\ChemocalcUtil::expCalculate($this->default_dosage, $this->default_dosage_exp)));
        return $ret;
    }

    /**
     * レシピマスタの用量を文字列で取得します。
     * @return 用量
     */
    public function calculateDosageToString($dosage, $dosage_exp)
    {
        return strval($this->expCalculate($dosage, $dosage_exp));
    }

    /**
     * 整数値と整数値の指数を計算して固定小数値にします。
     * @param value 元になる値
     * @param value_exp 指数の値
     * @return 計算結果
     */
    private function expCalculate($value, $value_exp)
    {
        $scale = bcmul('-1', $value_exp);
        return bcdiv($value, bcpow('10', $scale), $scale);
    }

}
