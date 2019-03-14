import request from "@/utils/request"

let goodsMsg = {
  categotiesSetting: [
    {
      seriesName: null,
      mainCategoties: null,
      subCategoties: null
    }
  ],
  specificationSetting: [
    {
      goodSpecificationChinese: null,
      goodSpecificationEnglish: null,
      capacityChinese: null,
      capacityEnglish: null,
      packingUnitChinese: null,
      packingUnitEnglish: null
    }
  ],
  mainCategotiesArr: [
    {
      label: '主品类一',
      value: 1
    }
  ],
  subCategotiesArr: [
    {
      label: '子品类一',
      value: 1
    }
  ],
  sublicense: 1,
  sublicenseChannelNo: [],
  sublicenseStyleTable: [{}]
}

export function sublicenseChannelNoChange(val) {
  request({
    url: '/brand/getChannelName.do',
    method: 'post',
    data: { channelNo: val }
  })
    .then((res) => {
      if (res.errorCode==0) {
        this.$set(this.sublicenseChannelName,val,res.data.channelName)
      } else { this.$confirm('数据请求出错，请重试。', { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }) }

    })
    .catch((err) => {
      this.$confirm('此渠道不存在。', { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
      this.$set(this.sublicenseChannelName, val, null)
    })
}

export function addSublicense(index) {
  this.form.sublicenseStyleTable.push({})
}

export function deleteSublicense(index) {
  if (index==0) return false
  this.form.sublicenseStyleTable.splice(index, 1)
}

export function getGoodsMsg() {
  this.form.sublicense = this.sublicense
}

export default goodsMsg
