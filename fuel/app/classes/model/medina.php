<?php

use Chemocalc\Util as Util;

class Model_Medina extends \Orm\Model
{
	protected static $_table_name = 'medina';

    protected static $_properties = array(
        'id',
        'name',
        'quantity_text',
        'quantity_value',
        'quantity_value_exp',
        'quantity_unit',
        'company',
        'price',
        'price_exp',
        'commonname_id',
    );

	/**
     * to_arrayのオーバーライド
     * 演算項目を追加で設定する
     * price_str：指数調整した価格文字列
	 * price_formated_str：カンマ区切りの価格文字列
     * quantity_str：指数調整した容量文字列
     */
    public function to_array($custom = false, $recurse = false, $eav = false)
    {
        $ret = parent::to_array();
		$price_str_var = Util\ChemocalcUtil::expCalculate($this->price, $this->price_exp);
        $ret = array_merge($ret, array('price_str' => $price_str_var));
		$ret = array_merge($ret, array('price_formated_str' => number_format((int)$price_str_var)));
        $ret = array_merge($ret, array('quantity_str' => Util\ChemocalcUtil::expCalculate($this->quantity_value, $this->quantity_value_exp)));
        return $ret;
    }
}
