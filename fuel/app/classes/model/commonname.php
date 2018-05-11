<?php

class Model_Commonname extends \Orm\Model
{

    protected static $_table_name = 'commonname';
    protected static $_properties = array(
        'id',
        'name',
        'flag',
    );

    /**
     * リレーション定義(一対多)
     * @var type
     */
    protected static $_has_many = array(
        'commonname_per_medinas' => array(
            'model_to' => 'Model_Commonname_Per_Medina',
            'key_from' => 'id',
            'key_to' => 'commonname_id',
        ),
        'medinas' => array(
            'model_to' => 'Model_Medina',
            'key_from' => 'id',
            'key_to' => 'commonname_id',
        ),
    );

}
