<?php

/* base.twig */
class __TwigTemplate_1103ed5008d1764453d03f078ba342339afc92c2efecd8ee40219d7d59efd80e extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'regimenName' => array($this, 'block_regimenName'),
            'regimenContent' => array($this, 'block_regimenContent'),
            'regimenMedina' => array($this, 'block_regimenMedina'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 5
        echo "<div class=\"row\">
    <div class=\"col-md-12\">
        <div id=\"noBsaAlert\" class=\"alert alert-danger\" role=\"alert\" data-bind=\"visible: !bsa()\">
            <span class=\"glyphicon glyphicon-exclamation-sign\" aria-hidden=\"true\"></span>
            参考投与量を計算するため、身長と体重を入力してください。
        </div>
    </div>
</div>
<div class=\"row\">
    <div class=\"col-md-12\">
        <div class=\"row\">

            <div style=\"text-align: center;font-weight: bold;\">
                <span style=\"font-size: large\">治療費計算シート </span>
                <span style=\"font-size: xx-large\"> - ";
        // line 19
        $this->displayBlock('regimenName', $context, $blocks);
        echo " -</span> 
            </div>
        </div>
        <div class=\"row\">
            <div style=\"text-align: center;font-weight: bold;\">
                <span style=\"font-size: medium\">※この価格は概算です。</span>
            </div>
        </div>
    </div>  
</div>
<div class=\"row\">
    <div class=\"col-md-12\">
        <div class=\"col-md-8\">
            <div class=\"row\">
                <div style=\"font-weight: bold;\">
                    <span style=\"font-size: large\">抗がん剤(Full Dose;DuBois式)</span>
                </div>
            </div>
        ";
        // line 37
        $this->displayBlock('regimenContent', $context, $blocks);
        // line 38
        echo "    </div>
    <div class=\"col-md-4\">
        <div class=\"row\" style=\"padding-bottom: 20px;\">
            <span style=\"font-weight: bold;font-size: large\">薬剤の規格</span>
        </div>   
    ";
        // line 43
        $this->displayBlock('regimenMedina', $context, $blocks);
        // line 44
        echo "</div>
</div>
</div>
<div class=\"row\">
    <div class=\"col-md-12\">
        <div style=\"text-align: center;font-weight: bold;\">
            <span>(投与日毎の価格を表示しております。1コースの価格は比較を参照してください。)</span>
        </div>
    </div>
</div>   








";
    }

    // line 19
    public function block_regimenName($context, array $blocks = array())
    {
    }

    // line 37
    public function block_regimenContent($context, array $blocks = array())
    {
    }

    // line 43
    public function block_regimenMedina($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "base.twig";
    }

    public function getDebugInfo()
    {
        return array (  102 => 43,  97 => 37,  92 => 19,  70 => 44,  68 => 43,  61 => 38,  59 => 37,  38 => 19,  22 => 5,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "base.twig", "D:\\chemocalc_web\\fuel\\app\\views\\regimen\\base.twig");
    }
}
