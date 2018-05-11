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
        var ret = (docVal * 1.25).toFixed(0);
        return ret > 0 ? ret : '';
    }, this);

    self.docTotalPrice = ko.computed(function () {
        return this.docPrice();
    }, this);

    self.docTotalPrice30per = ko.computed(function () {
        return CalcBurdenPrice(this.docTotalPrice(), 0.3);
    }, this);
    self.docTotalPrice20per = ko.computed(function () {
        return CalcBurdenPrice(this.docTotalPrice(), 0.2);
    }, this);
    self.docTotalPrice10per = ko.computed(function () {
        return CalcBurdenPrice(this.docTotalPrice(), 0.1);
    }, this);
}
;

/**
 * 参考使用量産出
 * @param {type} bsaVal 体表面積
 * @param {type} dosageVal 投薬量
 * @returns {Number|String} 参考使用量(引数が不正な場合は空白を返す。計算結果は小数第一位に丸める)
 */
function calcDosageVal(bsaVal, dosageVal) {
    console.log("◆function calcDosageVal◆");
    // 参考使用量
    if (!bsaVal || isNaN(bsaVal) || !dosageVal || isNaN(dosageVal)) {
        // 空白か数値以外の場合はクリア
        return "";
    }
    var ret = bsaVal * dosageVal;
    return ret.toFixed(1); // 小数第一位に丸める
}

/**
 * 薬価自己負担額計算
 * @param {type} totalPriceVal 合計薬価
 * @param {type} burdenPerVal 負担割合(0.X)
 * @returns {Number|String} 負担割合に応じた負担額　
 */
function CalcBurdenPrice(totalPriceVal, burdenPerVal) {
    var ret = '';
    if (totalPriceVal) {
        ret = (totalPriceVal * burdenPerVal).toFixed(0);
    }
    return ret;
}