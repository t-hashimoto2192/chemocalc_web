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

//    /* 薬剤容量リンクのクリックイベント */
//    this.clickRecipeDosageLink = function (data, event) {
//        recipeDosageEditModalShow(event.target);
//    };

    /* ★☆★ 療法別画面 ★☆★ */

    /* FEC */
    self.fec_fu_val = ko.observable('');

    self.fec_cpa_val = ko.observable('');
    self.fec_cpa_ref = ko.observable('');

    /* DOC */
    self.docDosageLnk = ko.observable('');
    self.docDosageLbl = ko.computed(function () {
        // 参考使用量
        return calcDosageVal(self.bsa(), self.docDosageLnk());
    });
    self.docDosageTxt = ko.observable('');
    
    self.docStandardArray = ko.observableArray();
    
    self.docPrice = ko.observable('');
    self.docTotalPrice = ko.observable('');
    self.docTotalPrice30per = ko.observable('');
    self.docTotalPrice20per = ko.observable('');
    self.docTotalPrice10per = ko.observable('');
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
    var ret = bsaVal * dosageVal;
    return ret.toFixed(1); // 小数第一位に丸める
}