<?php

/* main.twig */
class __TwigTemplate_f26301a7505c3082cb451b52d12ece9593f706845d30ea286ac835b74946763f extends Twig_Template
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
        // line 6
        echo "<!DOCTYPE html>
<head>
    <meta charset=\"utf-8\">
    <title>";
        // line 9
        if (isset($context["title"])) { $_title_ = $context["title"]; } else { $_title_ = null; }
        echo $_title_;
        echo "</title>
    ";
        // line 10
        echo Asset::css("bootstrap.css");
        echo "
    ";
        // line 11
        echo Asset::css("custom/custom_navbar.css");
        echo "
    ";
        // line 12
        echo Asset::css("custom/bootstrap-print.css");
        echo "
    ";
        // line 13
        echo Asset::css("custom/chemocalc.css");
        echo "
    ";
        // line 14
        echo Asset::css("custom/regimen.css");
        echo "
    ";
        // line 15
        echo Asset::js("https://code.jquery.com/jquery-3.0.0.min.js");
        echo "
    ";
        // line 16
        echo Asset::js("https://cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min.js");
        echo "    
    ";
        // line 17
        echo Asset::js("bootstrap.js");
        echo "
    ";
        // line 18
        echo Asset::js("custom/chemocalc.js");
        echo "    
    <link rel=\"shortcut icon\" href=\"";
        // line 19
        echo Uri::base(false);
        echo "/assets/img/favicon.ico\" type=\"image/x-icon\">
    <link rel=\"icon\" href=\"";
        // line 20
        echo Uri::base(false);
        echo "/assets/img/favicon.ico\" type=\"image/x-icon\">
</head>
<body>
    <input type=\"hidden\" id='nowRegimen' />
    <div class=\"wrapper\">
        <div class=\"header\">
            <!-- 固定ヘッダー -->
            <nav class=\"navbar navbar-inverse navbar-default navbar-fixed-top\">
                <div class=\"container-fluid\">
                    <div class=\"navbar-header\">
                        <a class=\"navbar-brand\" rel=\"home\" href=\"#\" title=\"Chemocalc Web\">
                            ";
        // line 31
        echo Asset::img("ChemoCalcTitle.png", array("style" => "max-width:150px; margin-top: -7px;"));
        echo "
                        </a>
                    </div> 
                    <form class=\"navbar-form navbar-left\" id=\"bsaCalcForm\">
                        <div class=\"form-group\">
                            <div class=\"input-group\">
                                <span class=\"input-group-addon\">身長</span>
                                <input type=\"text\" class=\"form-control\" size=\"3\"  data-bind='value: stature, valueUpdate: \"afterkeydown\"'/>
                                <span class=\"input-group-addon\">cm</span>
                            </div>
                            <div class=\"input-group\">
                                <span class=\"input-group-addon\">体重</span>
                                <input type=\"text\" class=\"form-control\" size=\"3\"  data-bind='value: weight, valueUpdate: \"afterkeydown\"'/>
                                <span class=\"input-group-addon\">kg</span>
                            </div>
                            <div class=\"input-group\">
                                <span class=\"input-group-addon\">体表面積</span>
                                <input type=\"text\" id=\"txtBsa\" class=\"form-control\" size=\"5\" disabled=\"true\" data-bind=\"value: bsa\">
                                <span class=\"input-group-addon\">㎡ (DuBois式)</span>
                            </div>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
        <div class=\"content\">
            <div style=\"height:1000px;\">
                <!-- 固定サイドメニュー -->
                <nav class=\"navbar-side\">
                    <ul class=\"navbar-side-menu\">
                        <li>
                            ";
        // line 62
        echo Html::anchor("JavaScript:void(0);", "FEC", array("id" => "btn_fec", "class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 63
        echo Html::anchor("JavaScript:void(0);", "EC", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 64
        echo Html::anchor("JavaScript:void(0);", "AC", array("class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 65
        echo Html::anchor("JavaScript:void(0);", "DOC", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 66
        echo Html::anchor("JavaScript:void(0);", "Her+DOC", array("class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 67
        echo Html::anchor("JavaScript:void(0);", "TC", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 68
        echo Html::anchor("JavaScript:void(0);", "PTX", array("class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 69
        echo Html::anchor("JavaScript:void(0);", "PTX+BV", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 70
        echo Html::anchor("JavaScript:void(0);", "w Her+PTX", array("class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 71
        echo Html::anchor("JavaScript:void(0);", "HAL", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 72
        echo Html::anchor("JavaScript:void(0);", "Per+Her+DOC", array("class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 73
        echo Html::anchor("JavaScript:void(0);", "Per+Her+HAL", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 74
        echo Html::anchor("JavaScript:void(0);", "nabPTX", array("class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 75
        echo Html::anchor("JavaScript:void(0);", "VNR", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 76
        echo Html::anchor("JavaScript:void(0);", "T-DM1", array("class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 77
        echo Html::anchor("JavaScript:void(0);", "Her+VNR", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 78
        echo Html::anchor("JavaScript:void(0);", "GEM", array("class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 79
        echo Html::anchor("JavaScript:void(0);", "Her+TC", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 80
        echo Html::anchor("JavaScript:void(0);", "Lapa+Cape", array("class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 81
        echo Html::anchor("JavaScript:void(0);", "経口5FU", array("class" => "nav-label odd", "data-bind" => "click: clickMenu"));
        echo "
                            ";
        // line 82
        echo Html::anchor("JavaScript:void(0);", "ホルモン療法", array("id" => "btn_holmon", "class" => "nav-label eve", "data-bind" => "click: clickMenu"));
        echo "
                        </li>
                        <li>
                            <h4>
                                <span class=\"label label-info center-block\">
                                    <span class=\"glyphicon glyphicon-star\">
                                    </span> オプション
                                </span>
                            </h4>
                        </li>
                        <li>
                            ";
        // line 93
        echo Html::anchor("JavaScript:void(0);", "G-CSF", array("class" => "nav-label option-regimen", "style" => "border-top:solid 1px #9A9B9E;"));
        echo "
                            ";
        // line 94
        echo Html::anchor("JavaScript:void(0);", "骨吸収抑制剤", array("class" => "nav-label option-regimen"));
        echo "
                        </li>
                    </ul>
                </nav>
                <!-- コンテンツ -->        
                <div class=\"main-content\">
                    <div id=\"default_content_div\">
                        ";
        // line 101
        if (isset($context["default_content"])) { $_default_content_ = $context["default_content"]; } else { $_default_content_ = null; }
        echo $_default_content_;
        echo "
                    </div>
                    <div id=\"fec_content_div\" style=\"display: none\">
                        ";
        // line 104
        if (isset($context["fec_content"])) { $_fec_content_ = $context["fec_content"]; } else { $_fec_content_ = null; }
        echo $_fec_content_;
        echo "
                    </div>
                    <div id=\"holmon_content_div\" style=\"display: none\">
                        <h3>ホルモン療法</h3>
                        ";
        // line 108
        if (isset($context["holmon_content"])) { $_holmon_content_ = $context["holmon_content"]; } else { $_holmon_content_ = null; }
        echo $_holmon_content_;
        echo "
                    </div>
                </div>
            </div>
        </div>
        <!-- 固定フッター --> 
        <footer class=\"footer\">
            <div class=\"footerImg\">
                <div class=\"footer_button\">
                    <button id=\"btnDiff\" type=\"button\" class=\"btn btn-chemocalc navbar-btn\">比較</button>
                    <button id=\"btnPrintBase\" type=\"button\" class=\"btn btn-chemocalc navbar-btn\">印刷</button>
                </div>
            </div>
        </footer>
    </div>
    <!-- 比較画面Modal -->
    <div class=\"modal fade\" id=\"diff-modal\" data-backdrop=\"static\">
        <div class=\"modal-dialog modal-lg\" >
            <div class=\"modal-content\">
                <div class=\"modal-header\">
                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                        <span aria-hidden=\"true\">&times;</span>
                    </button>
                    <h4 class=\"modal-title\" id=\"modal-label\"><!-- タイトルはajaxでセット --></h4>
                </div>
                <div class=\"modal-body\" id=\"modal-body\">
                    <!-- 表示内容はajaxでセット -->
                </div>
                <div class=\"modal-footer\">
                    <div class=\"footerImg\">
                        <div class=\"footer_button\">
                            <button type=\"button\" class=\"btn btn-chemocalc\" data-dismiss=\"modal\">閉じる</button>
                            <button id=\"btnPrintDiff\" type=\"button\" class=\"btn btn-chemocalc\">印刷</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>






";
    }

    public function getTemplateName()
    {
        return "main.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  240 => 108,  232 => 104,  225 => 101,  215 => 94,  211 => 93,  197 => 82,  193 => 81,  189 => 80,  185 => 79,  181 => 78,  177 => 77,  173 => 76,  169 => 75,  165 => 74,  161 => 73,  157 => 72,  153 => 71,  149 => 70,  145 => 69,  141 => 68,  137 => 67,  133 => 66,  129 => 65,  125 => 64,  121 => 63,  117 => 62,  83 => 31,  69 => 20,  65 => 19,  61 => 18,  57 => 17,  53 => 16,  49 => 15,  45 => 14,  41 => 13,  37 => 12,  33 => 11,  29 => 10,  24 => 9,  19 => 6,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "main.twig", "D:\\chemocalc_web\\fuel\\app\\views\\main.twig");
    }
}
