<?php

/* fec.twig */
class __TwigTemplate_2b4d0d7ea282b43301228f42807c32f25af9e29b0d527e8a14c88e556798ddb8 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 2
        $this->parent = $this->loadTemplate("base.twig", "fec.twig", 2);
        $this->blocks = array(
            'regimenName' => array($this, 'block_regimenName'),
            'regimenContent' => array($this, 'block_regimenContent'),
            'regimenMedina' => array($this, 'block_regimenMedina'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "base.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 7
    public function block_regimenName($context, array $blocks = array())
    {
        echo "FEC療法";
    }

    // line 10
    public function block_regimenContent($context, array $blocks = array())
    {
        // line 11
        echo "    <div class=\"row\">
        <div class=\"col-md-12\">
            <table class=\"dosage\">
                <tr>
                    <td class=\"col1\">
                        ";
        // line 16
        if (isset($context["recipe_5fu"])) { $_recipe_5fu_ = $context["recipe_5fu"]; } else { $_recipe_5fu_ = null; }
        echo Html::anchor("JavaScript:void(0);", (("5-FU(" . $this->getAttribute($_recipe_5fu_, "dosage", array())) . "mg/㎡)："), array("class" => "lnkBtn"));
        echo "                    
                    </td>
                    <td class=\"col2\">
                        <span data-bind=\"text: fec_fu_ref\"></span>                   
                    </td>
                    <td class=\"col3\">
                        mg/body                   
                    </td>
                    <td class=\"col4\">
                        <input type=\"text\" class=\"form-control\" size=\"8\"  data-bind=\"value: fec_fu_val\"/>    
                    </td>
                    <td class=\"col5\">
                        mg/body                   
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        ";
        // line 33
        echo Html::anchor("JavaScript:void(0);", "CPA(500mg/㎡)：", array("class" => "lnkBtn"));
        echo "                    
                    </td>
                    <td class=\"col2\">
                        <span>0</span>                    
                    </td>
                    <td class=\"col3\">
                        mg/body                   
                    </td>
                    <td class=\"col4\">
                        <input type=\"text\" class=\"form-control\" size=\"8\"  data-bind=\"value: fec_fu_val\"/>    
                    </td>
                    <td class=\"col5\">
                        mg/body                   
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        ";
        // line 50
        echo Html::anchor("JavaScript:void(0);", "EPI(100mg/㎡)：", array("class" => "lnkBtn"));
        echo "                    
                    </td>
                    <td class=\"col2\">
                        <span>0</span>                    
                    </td>
                    <td class=\"col3\">
                        mg/body                   
                    </td>
                    <td class=\"col4\">
                        <input type=\"text\" class=\"form-control\" size=\"8\"  data-bind=\"value: fec_fu_val\"/>    
                    </td>
                    <td class=\"col5\">
                        mg/body                   
                    </td>
                </tr>
            </table>
        </div>    
    </div> 
    <div class=\"row\">
        <span style=\"font-weight: bold;font-size: large;\">制吐剤</span> 
    </div>
    <div class=\"row\">
        <div class=\"col-md-12\">
            <table class=\"fiveht3\">
                <tr>
                    <td class=\"col1\" style=\"border-bottom: 1px #909090 solid;margin-bottom: 10px;\">
                        ";
        // line 76
        echo Html::anchor("JavaScript:void(0);", "アロキシ制注０．７５mg", array("class" => "lnkBtn"));
        echo "                    
                    </td>
                    <td class=\"col2\">
                        ";
        // line 79
        echo Html::anchor("JavaScript:void(0);", "1[本]", array("class" => "lnkBtn"));
        echo "                    
                    </td>
                </tr>
                ";
        // line 83
        echo "                <tr>
                    <td class=\"col1\">
                        <span>アプレピタント８０ｍｇ</span>                    
                    </td>
                    <td class=\"col2\">
                        ";
        // line 88
        echo Html::anchor("JavaScript:void(0);", "2[カプセル]", array("class" => "lnkBtn"));
        echo "                   
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        <span>アプレピタント１２５ｍｇ</span>       
                    </td>
                    <td class=\"col2\">
                        ";
        // line 96
        echo Html::anchor("JavaScript:void(0);", "2[カプセル]", array("class" => "lnkBtn"));
        echo "                         
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        <span>ホスアプレピタント点滴静注</span>       
                    </td>
                    <td class=\"col2\">
                        ";
        // line 104
        echo Html::anchor("JavaScript:void(0);", "0[本]", array("class" => "lnkBtn"));
        echo "                         
                    </td>
                </tr>
            </table>
        </div> 
    </div>
    <div class=\"row\">
        <div class=\"col-md-12\">
            <table class=\"price\">
                <tr>
                    <td class=\"col1\">
                        5-FU薬価：                    
                    </td>
                    <td class=\"col2\">
                        <span></span>                  
                    </td>
                    <td class=\"col3\">
                        円                   
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        CPA薬価：                    
                    </td>
                    <td class=\"col2\">
                        <span></span>                  
                    </td>
                    <td class=\"col3\">
                        円                   
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        EPI薬価：                    
                    </td>
                    <td class=\"col2\">
                        <span></span>                  
                    </td>
                    <td class=\"col3\">
                        円                   
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        合計薬価：                    
                    </td>
                    <td class=\"col2\">
                        <span></span>                  
                    </td>
                    <td class=\"col3\">
                        円                   
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        3割負担：                    
                    </td>
                    <td class=\"col2\">
                        <span></span>                  
                    </td>
                    <td class=\"col3\">
                        円                   
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        2割負担：                    
                    </td>
                    <td class=\"col2\">
                        <span></span>                  
                    </td>
                    <td class=\"col3\">
                        円                   
                    </td>
                </tr>
                <tr>
                    <td class=\"col1\">
                        1割負担：                    
                    </td>
                    <td class=\"col2\">
                        <span></span>                  
                    </td>
                    <td class=\"col3\">
                        円                   
                    </td>
                </tr>
            </table>
        </div> 
    </div>                       
";
    }

    // line 196
    public function block_regimenMedina($context, array $blocks = array())
    {
        // line 197
        echo "    <div class=\"row\" style=\"padding-bottom: 10px;\">
        <span style=\"font-weight: bold;font-size: medium;\">5-FU：</span>
    </div> 
    <div class=\"row\">
        <table class=\"table table-bordered table-condensed table-hover table-striped tblMedinaList\">
            <tr>
                <td>
                    １，０００ｍｇ１瓶
                </td>
            </tr>
            <tr>
                <td class=\"active\">　</td>
            </tr>
            <tr>
                <td>　</td>
            </tr>
            <tr>
                <td class=\"active\">　</td>
            </tr>
        </table>
    </div> 
    <div class=\"row\" style=\"padding-bottom: 10px;\">
        <span style=\"font-weight: bold;font-size: medium;\">CPA：</span>
    </div>  
    <div class=\"row\">
        <table class=\"table table-bordered table-condensed table-hover table-striped tblMedinaList\">
            <tr>
                <td>
                    １００ｍｇ１瓶
                </td>
            </tr>
            <tr>
                <td class=\"active\">５００ｍｇ１瓶</td>
            </tr>
            <tr>
                <td>　</td>
            </tr>
            <tr>
                <td class=\"active\">　</td>
            </tr>
        </table>
    </div> 
    <div class=\"row\" style=\"padding-bottom: 10px;\">
        <span style=\"font-weight: bold;font-size: medium;\">EPI：</span>
    </div>  
    <div class=\"row\">
        <table class=\"table table-bordered table-condensed table-hover table-striped tblMedinaList\">
            <tr>
                <td>
                    １０ｍｇ５ｍL１瓶
                </td>
            </tr>
            <tr>
                <td class=\"active\">
                    ５０ｍｇ２５ｍL１瓶
                </td>
            </tr>
            <tr>
                <td>　</td>
            </tr>
            <tr>
                <td class=\"active\">　</td>
            </tr>
        </table>
    </div> 
";
    }

    public function getTemplateName()
    {
        return "fec.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  254 => 197,  251 => 196,  157 => 104,  146 => 96,  135 => 88,  128 => 83,  122 => 79,  116 => 76,  87 => 50,  67 => 33,  46 => 16,  39 => 11,  36 => 10,  30 => 7,  11 => 2,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "fec.twig", "D:\\chemocalc_web\\fuel\\app\\views\\regimen\\fec.twig");
    }
}
