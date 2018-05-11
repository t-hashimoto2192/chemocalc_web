/* knockout.js ViewModel定義 */
function settingViewModel() {

    var self = this;

    /* 体表面積計算フォーム */
    // 身長
    self.stature = ko.observable('');
    // 体重
    self.weight = ko.observable('');
    // 体表面積
    self.bsa = ko.computed(function () {
        var sVal = this.stature();
        var wVal = this.weight();
        var bsaVal = calcBsa(sVal, wVal);
        return bsaVal;
    }, this);

    /* サイドメニューのクリックイベント */
    self.clickMenu = function (data, event) {
        changeRegimen(event.target);
    };

    /* ★☆★ 療法別画面 ★☆★ */

    /* -- FEC -- */
    self.fec_fu_val = ko.observable('');

    self.fec_cpa_val = ko.observable('');
    self.fec_cpa_ref = ko.observable('');

    /* -- DOC -- */
    self.docDosageLnk = ko.observable('');
    self.docDosageLbl = ko.computed(function () {
        // 参考使用量
        return calcDosageVal(self.bsa(), self.docDosageLnk());
    });
    self.docValueTxt = ko.observable('');

    self.docStandardArray = ko.observableArray(); //TODO:docValueTxtの変更時にcomputedする？

    self.docPrice = ko.computed(function () {
        var docVal = this.docValueTxt();
        // TODO:仮に使用量を適当にいじって返す
        if (!docVal || isNaN(docVal)) {
            return '';
        }
        var ret = (docVal * 1.25).toFixed(0);
        return ret > 0 ? formatPriceValue(ret) : '';
    }, this);

    self.docTotalPrice = ko.computed(function () {        
        return this.docPrice();
    }, this);

    self.docTotalPrice30per = ko.computed(function () {
        var unformatedVal = unformatPriceValue(this.docTotalPrice());
        var ret = CalcBurdenPrice(unformatedVal, 0.3);
        return ret > 0 ? formatPriceValue(ret) : '';
    }, this);
    self.docTotalPrice20per = ko.computed(function () {
        var unformatedVal = unformatPriceValue(this.docTotalPrice());
        var ret = CalcBurdenPrice(unformatedVal, 0.2);
        return ret > 0 ? formatPriceValue(ret) : '';
    }, this);
    self.docTotalPrice10per = ko.computed(function () {
        var unformatedVal = unformatPriceValue(this.docTotalPrice());
        var ret = CalcBurdenPrice(unformatedVal, 0.1);
        return ret > 0 ? formatPriceValue(ret) : '';
    }, this);
}
;



