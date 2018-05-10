<?php

class Model_Commonname_Per_Recipe extends \Orm\Model
{

    protected static $_table_name = 'commonname_per_recipe';
    protected static $_properties = array(
        'id',
        'commonname_id',
        'recipe_id',
    );

    /**
     * リレーション定義(多対一)
     * @var type
     */
    protected static $_has_many = array(
        'recipe' => array(
            'model_to' => 'Model_Recipe',
            'key_from' => 'recipe_id',
            'key_to' => 'id',
        ),
    );

    /**
     * リレーション定義(一対一)
     * @var type
     */
    protected static $_has_one = array(
        'commonname' => array(
            'model_to' => 'Model_Commonname',
            'key_from' => 'commonname_id',
            'key_to' => 'id',
        ),
    );

}
