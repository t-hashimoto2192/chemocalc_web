<?php

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

}
