//□□Java→javaScriptでコンバート挑戦中！！
// /controller/regimen/MedinaSelector.java

class MedinaSelector {

    constructor(maxDosage) {

        /**
         * 投与量の最大値
         */
        this.maxDosage = maxDosage;

        /**
         * 選択した薬剤の合計価格
         */
        this.totalPrice = 0;

        /**
         * 選択した薬剤のリスト。値は薬剤数量
         */
        this.choicedMedina = new Array();

        /**
         * 選択した薬剤のリストにおける最大薬剤数量
         */
        this.maxNumMedina = new Array();
    }

    /**
     * このクラスに設定された投与量の最大値を薬剤の使用限度とした上で
     * 利用薬剤のリストから最安値となる薬剤と薬剤数量のリストを取得します。
     * @param medinas 利用薬剤のリスト
     * @return 最安値の薬剤リスト。値は薬剤数量
     */
    Choice(medinas) {
            var m = new Array();
            jQuery.each(medinas, function (index, value) {
                    m.push(new Array(index, 0));
            });

            // 容量の小さい薬剤に対する過度の再帰処理ガード。
            // 自分より大きな容量の薬剤を大きく超えた容量を
            // 自分で賄うことは無いとする。
            // 例えば20mg，50mgの薬剤があった場合、20mgの
            // 使用は50mg/20mgの端数を切り上げた3個の2倍までとする。
            var ml = new Array();
            jQuery.each(medinas, function (index, value) {
                    ml.push(value['medina']);
            });

            ml.sort(this.compareByQuantity);

        for (var i = 0; i < ml.length -1; i++) {
            
            var a = ml[i + 1]['quantity_str'];
            var b = Math.round(a / ml[i]['quantity_str']);
            
            var max = b * 2;
            this.maxNumMedina.push(ml[i], max);
        }
        
        this.maxNumMedina.push(ml[ml.length - 1], 999999999);
        // TODO:↑↑↑↑　★ここまではjavaからjavascript置き換えできているっぽい★


//            // 処方量が大きい場合に対する過度の再帰処理ガード
//            // 非常に大きな処方量を指定された場合は、組み合わせの再帰
//            // 検索をする前に容量の一番大きな薬剤で利用数を埋めてしまう。
//            // 例えば999mgの処方量に対して最大容量50mgを持つ薬剤が
//            // 存在した場合は、999mg - 50mg * 3 = 849mgのうち
//            // 800mgを50mgの薬剤16個で埋める。
//            Medina mm = ml.get(ml.size() - 1);
//            BigDecimal r = mm.calculateQuantityToBigDecimal()
//                            .multiply(BigDecimal.valueOf(3));
//            BigDecimal d = BigDecimal.ZERO;
//            BigDecimal p = BigDecimal.ZERO;
//            if (r.compareTo(maxDosage) < 0) {
//                    m.put(mm, maxDosage.subtract(r)
//                                    .divide(mm.calculateQuantityToBigDecimal(), BigDecimal.ROUND_DOWN)
//                                    .setScale(0, BigDecimal.ROUND_DOWN)
//                                    .intValue());
//                    d = BigDecimal.valueOf(m.get(mm)).multiply(mm.calculateQuantityToBigDecimal());
//                    p = mm.calculatePriceToBigDecimal()
//                                    .multiply(BigDecimal.valueOf(m.get(mm)));
//            }
//
//            Choice(m, d, p);
//            return choicedMedina;
    }
    
    
    compareByQuantity(a, b) {

        const quantity_strA = a['quantity_str'];
        const quantity_strB = b['quantity_str'];

        let comparison = 0;
        if (quantity_strA > quantity_strB) {
            comparison = 1;
        } else if (quantity_strA < quantity_strB) {
            comparison = -1;
        }
        return comparison;
    }

    /**
     * 薬剤選択のメインロジック。再帰呼び出しによりリストに存在する薬剤と薬剤数量の
     * パターンを総当りし、最安値となる組み合わせを検索する。
     * 再帰なので参照用途でしか用いない項目以外はすべて値渡しであるべきことに注意。
     * @param choicingMedinas 選択中の薬剤のリスト
     * @param nowDosage 現在の投与量
     * @param nowPrice 現在の価格
     */
//    Choice(choicingMedinas, nowDosage, nowPrice) {
//            // スコープ内で独立したインスタンスであるべき項目をすべて短い名前にしている。
//            // 再帰なので、いつもの参照渡しは値を変化させないものしか使えない。
//            jQuery.each(choicingMedinas, function (index, value) {
//                    var ms = new Array();
//                    ms.push(choicingMedinas);
//                    ms.push(value);
//                    ms.put(choicingMedina, Integer.valueOf(ms.get(choicingMedina) + 1));
//            });
//            
//            for (Medina choicingMedina : choicingMedinas.keySet()) {
//                    HashMap<Medina, Integer> ms = new HashMap<Medina, Integer>();
//                    ms.putAll(choicingMedinas);
//                    ms.put(choicingMedina, Integer.valueOf(ms.get(choicingMedina) + 1));
//                    if (ms.get(choicingMedina) > maxNumMedina.get(choicingMedina))
//                            continue;
//
//                    BigDecimal d = nowDosage.add(choicingMedina.calculateQuantityToBigDecimal());
//                    BigDecimal p = nowPrice.add(choicingMedina.calculatePriceToBigDecimal());
//                    if (d.compareTo(maxDosage) < 0) {
//                            Choice(ms, d, p);
//                    } else {
//                            if (p.compareTo(totalPrice) < 0) {
//                                    totalPrice = p;
//                                    choicedMedina.putAll(ms);
//                            }
//                    }
//            }
//    }

}