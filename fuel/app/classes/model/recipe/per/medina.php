<?php

class Model_Recipe_Per_Medina extends \Orm\Model
{
	protected static $_properties = array(
		'id',
		'commonname_id',
		'recipe_id',
		'medina_id',
	);


	protected static $_table_name = 'recipe_per_medina';

}
