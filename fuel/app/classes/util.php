<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Chemocalc\Util;

/**
 * Description of util
 *
 * @author t-has
 */

namespace Chemocalc\Util;

class ChemocalcUtil
{

    /**
     * 整数値と整数値の指数を計算して固定小数値にします。
     * @param value 元になる値
     * @param value_exp 指数の値
     * @return 計算結果
     */
    public static function expCalculate($value, $value_exp)
    {
        $scale = bcmul('-1', $value_exp);
        return bcdiv($value, bcpow('10', $scale), $scale);
    }

}
