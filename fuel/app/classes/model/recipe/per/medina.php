<?php

class Model_Recipe_Per_Medina extends \Orm\Model
{

    protected static $_table_name = 'recipe_per_medina';
    protected static $_properties = array(
        'id',
        'commonname_id',
        'recipe_id',
        'medina_id',
    );

    /**
     * リレーション定義(一対一)
     * @var type
     */
    protected static $_has_one = array(
        'medina' => array(
            'model_to' => 'Model_Medina',
            'key_from' => 'medina_id',
            'key_to' => 'id',
        ),
    );

}
