const validateCategorySetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    console.log('查看',item)
    for (var key in item) {
      if (!item[key] && item[key]!=0) {
        return true
      }
    }
  });
  if (valiNull) {
    callback(new Error("商品分类设置信息必须全部填写！"));
  } else {
    callback();
  }
}

const validateOccSpecialSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key] && item[key]!=0) return true
    }
  });
  if (valiNull) {
    callback(new Error("OCC特殊流程设置信息必须全部填写！"));
  } else {
    callback();
  }
}

let settingMsgRules = {
  categorySetting: [{ required: true, validator: validateCategorySetting, trigger: "blur" }],
  occSpecialSetting: [{ required: true, validator: validateOccSpecialSetting, trigger: "blur" }],
}

export default settingMsgRules
