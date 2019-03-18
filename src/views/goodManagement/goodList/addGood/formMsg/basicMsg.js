let basicsMsg = {
  brandOfGoods: [{
    brandEnglishNameOfGoods: null
  }]
}

export function getBrandNo() {
  this.form.brandNoLoading = true
  this.$request({
    url: '/brand/getMaxBrandNo.do',
    method: "post",
  })
    .then(res => {
      if (res.errorCode==0) {
        this.$set(this.form, 'brandNo', res.data.item + 1)
        this.form.brandNoLoading = false
      }
    })
}

export function getBrandBasicsMsgData() {
  this.form.productionPlaceChinese = this.form.origin[0].productionPlaceChinese
  this.form.productionPlaceEnglish = this.form.origin[0].productionPlaceEnglish
}

export default basicsMsg
