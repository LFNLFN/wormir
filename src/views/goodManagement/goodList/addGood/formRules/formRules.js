const validateBrandMsg = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("请选择品牌英文名字！"));
  } else {
    callback();
  }
}

const valiDeclarationSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      console.log(item[key])
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error(" "));
  } else {
    callback();
  }
}

const valiPackageSpecificationData = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      console.log(item[key])
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error(" "));
  } else {
    callback();
  }
}

const basicsMsgRules = {
  brandMsg: [{ required: true, validator: validateBrandMsg, trigger: "blur" }],
  goodsNoForBrand: [{ required: true, message: "必填", trigger: "blur" }],
  goodName_EN: [{ required: true, message: "必填", trigger: "blur" }],
  goodName_ZH: [{ required: true, message: "必填", trigger: "blur" }],
  giftEnglishName: [{ required: true, message: "必填", trigger: "blur" }],
  giftChineseName: [{ required: true, message: "必填", trigger: "blur" }],
  barcode: [{ required: true, message: "必填", trigger: "blur" }],
  propertyOfSale: [{ required: true, message: "必填", trigger: "blur" }],
  seriesName: [{ required: true, message: "必填", trigger: "blur" }],
  mainCategoryName: [{ required: true, message: "必填", trigger: "blur" }],
  subCategoryName: [{ required: true, message: "必填", trigger: "blur" }],
  specificationId: [{ required: true, message: " ", trigger: "blur" }],
  netWeight: [{ required: true, message: " ", trigger: "blur" }],
  grossWeight: [{ required: true, message: " ", trigger: "blur" }],
  declarationSetting: [{ required: true, validator: valiDeclarationSetting, trigger: "blur" }],
  cartonNo: [{ required: true, message: " ", trigger: "blur" }],
  packageSpecificationData: [{ required: true, validator: valiPackageSpecificationData, trigger: "blur" }],
}


export default basicsMsgRules
