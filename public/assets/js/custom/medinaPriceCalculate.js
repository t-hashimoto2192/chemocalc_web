//□□Java→javaScriptでコンバート挑戦中！！

/**
 * レシピから使用薬剤を検索し、指定された用量に最適な薬剤を用いた価格を取得します。
 *
 * @param recipe
 *            レシピデータ
 * @param dosage
 *            指定する用量
 * @return 使用薬剤の合計価格
 */
function sumMedinaPriceBy(recipe, dosage) {
    var price = 0;
    var medinas = medinaChoiceBy(recipe, dosage);
   
//    for (Medina medina : medinas.keySet())
//            price = price.add(new BigDecimal(medinas.get(medina)).multiply(medina.calculatePriceToBigDecimal()));

//    jQuery.each(medinas, function (index, value) {
//        price += medinas[index]['price'] * value;
//    });
    
    return price;
}

/**
 * レシピから使用薬剤を検索し、指定された用量に最適な薬剤をMapに設定します。
 *
 * @param recipe
 *            レシピデータ
 * @param dosage
 *            指定する用量
 * @return 使用薬剤のMap。Keyに薬剤データ，Valに数量が設定されます。
 */
function medinaChoiceBy(recipe, dosage) {
    if (dosage === null) {
        return new Array();
    }

    var medinas = recipe.commonname_per_recipe.commonname.commonname_per_medinas;

    var selector = new MedinaSelector(dosage);
    return selector.Choice(medinas);
}