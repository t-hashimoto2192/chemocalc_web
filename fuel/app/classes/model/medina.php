<?php

class Model_Medina extends \Orm\Model
{

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
    protected static $_table_name = 'medina';

    // TODO：容量と価格の指数計算結果を持つ補助カラムをセットするto_arrayオーバーライド
}
