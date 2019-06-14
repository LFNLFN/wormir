const validateCategotiesSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key] && item[key]!=0) {
        return true
      }
    }
  });
  if (valiNull) {
    callback(new Error("品牌商品分类设置表格必须全部填写！"));
  } else {
    callback();
  }
}

const validateSpecificationSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("品牌商品规格设置表格必须全部填写！"));
  } else {
    callback();
  }
}

const validateSublicenseChannelNo = (rule, value, callback) => {
  if (value.length==0) { callback(new Error("必填")) }
  let valiNull = value.some((item, index, arr) => {
    if (!item) return true
  })
  if (valiNull) {
    callback(new Error("必填"));
  } else {
    callback();
  }
}

const goodsMsgRules = {
  categotiesSetting: [{ required: true, validator: validateCategotiesSetting, trigger: "change" }],
  specificationSetting: [{ required: true, validator: validateSpecificationSetting, trigger: "blur" }],
  sublicenseChannelNo: [{ required: true, validator: validateSublicenseChannelNo, trigger: "blur" }],
}


export default goodsMsgRules
