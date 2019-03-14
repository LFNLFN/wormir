let brandBasicsMsg = {
  brandNo: null,
  englishName: null,
  chineseName: null,
  brandCompanyName: null,
  brandCompanyPhone: null,
  brandCompanyAddress: null,
  producerName: null,
  producerPhoto: null,
  producerAddress: null,
  origin: [{
    productionPlaceChinese: null,
    productionPlaceEnglish: null
  }]
}

export function getBrandBasicsMsgData() {
  this.form.productionPlaceChinese = this.form.origin[0].productionPlaceChinese
  this.form.productionPlaceEnglish = this.form.origin[0].productionPlaceEnglish
}

export default brandBasicsMsg
