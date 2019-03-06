const validateCategotiesSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
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

const goodsMsgRules = {
  categotiesSetting: [{ required: true, validator: validateCategotiesSetting, trigger: "blur" }],
  specificationSetting: [{ required: true, validator: validateSpecificationSetting, trigger: "blur" }],
}


export default goodsMsgRules
