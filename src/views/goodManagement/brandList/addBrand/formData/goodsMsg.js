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

export function deleteCategotiesSetting(index) {
  // if (index==0) return false
  this.form.categotiesSetting.splice(index,1)
  this.categotiesSetting.splice(index,1)
}

export function addCategotiesSetting(index) {
  var obj1={
    seriesName: null,
    mainCategoties: null,
    subCategoties: null
  }
  var obj2={
    seriesName: null,
    mainCategoties: null,
    subCategoties: null,
    subCategoryOptions:[]
  }
  this.form.categotiesSetting.push(obj1)
  this.categotiesSetting.push(obj2)
  // this.form.categotiesSetting.splice(index,0,{
  //   seriesName: null,
  //   mainCategoties: null,
  //   subCategoties: null
  // })
  // this.categotiesSetting.splice(index,0,{
  //   seriesName: null,
  //   mainCategoties: null,
  //   subCategoties: null,
  //   subCategoryOptions:[]
  // })
}

export function deleteSublicense(index) {
  if (index==0) return false
  this.form.sublicenseStyleTable.splice(index, 1)
}

export function requestSubCategories(val) {
  console.log(val)
  this.$request({
    url: '/brand/getGoodSubCategoty.do',
    method: "post",
    data: { mainIndex: val }
  })
    .then( res => {
      if (res.errorCode==0) {
        this.subCategoryOptions = res.data.items
        let _this=this;
        var obj = this.mainCategoryOptions.find(item =>{
            return item.mainIndex === val 
        });
        console.log('suoyou',this.mainCategoryOptions)

        this.categotiesSetting.map(function(e){
          if(e.mainCategoties==val){
            e.subCategoryOptions=res.data.items;
            e.subCategoties='';
          }
        })
        
        this.categotiesSetting.forEach((item, index, arr) => {
          item.subCategoryOptions=res.data.items;
          this.form.categotiesSetting[index].mainCategoties = item.mainCategoties
          this.form.categotiesSetting[index].mainName=obj.mainName;
          console.log('当前行',this.form.categotiesSetting)
        })
        console.log('gaibain',this.categotiesSetting)
        
      }
    })
}
export function getCateMain(index){
        
  this.form.categotiesSetting[index].subCategoties = this.categotiesSetting[index].subCategoties;
  
  var _this=this;
  this.subCategoryOptions.find(item=>{
    if(item.subIndex==_this.form.categotiesSetting[index].subCategoties){
      _this.form.categotiesSetting[index].subName=item.subName;
    }
  })
  console.log(this.categotiesSetting[index].subCategoryOptions)
}
export function getGoodsMsg() {
  this.form.sublicense = this.sublicense
}

export default goodsMsg
