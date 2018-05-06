<?php

/* default.twig */
class __TwigTemplate_8572fec471cb286fa8149fb25924df420c0479a09ff6bd1d14144442d1bf1736 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "デフォルト
";
    }

    public function getTemplateName()
    {
        return "default.twig";
    }

    public function getDebugInfo()
    {
        return array (  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "default.twig", "D:\\chemocalc_web\\fuel\\app\\views\\regimen\\default.twig");
    }
}
