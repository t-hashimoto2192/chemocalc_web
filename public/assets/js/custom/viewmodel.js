/* knockout.js ViewModel定義 */
function settingViewModel() {

    /* 体表面積計算フォーム */
    // 身長
    this.stature = ko.observable('');
    // 体重
    this.weight = ko.observable('');
    // 体表面積
    this.bsa = ko.computed(function () {
        var sVal = this.stature();
        var wVal = this.weight();
        var bsaVal = calcBsa(sVal, wVal);
        return bsaVal;
    }, this);

    /* サイドメニューのクリックイベント */
    this.clickMenu = function (data, event) {
        changeRegimen(event.target);
    };

    /* 薬剤容量リンクのクリックイベント */
    this.clickRecipeDosageLink = function (data, event) {
        recipeDosageEditModalShow(event.target);
    };

    /* ★☆★ 療法別画面 ★☆★ */

    /* FEC */
    this.fec_fu_val = ko.observable('');

    this.fec_cpa_val = ko.observable('');
    this.fec_cpa_ref = ko.observable('');

    /* DOC */
    this.docDosageLnk = ko.observable('');
    this.docDosageLbl = ko.computed(function () {
        // 参考使用量
        return calcDosageVal(this.bsa(), this.docDosageLnk());
    }, this);
    this.docDosageTxt = ko.observable('');
    this.docPrice = ko.observable('');
    this.docTotalPrice = ko.observable('');
    this.docTotalPrice30per = ko.observable('');
    this.docTotalPrice20per = ko.observable('');
    this.docTotalPrice10per = ko.observable('');
}
;

/**
 * 参考使用量産出
 * @param {type} bsaVal 体表面積
 * @param {type} dosageVal 投薬量
 * @returns {Number|String}
 */
function calcDosageVal(bsaVal, dosageVal) {
    console.log("◆function calcDosageVal◆");
    // 参考使用量
    if (!bsaVal || isNaN(bsaVal) || !dosageVal || isNaN(dosageVal)) {
        // 空白か数値以外の場合はクリア
        return "";
    }
    var ret = bsaVal * dosageVal; //TODO:丸め
    return ret;
}