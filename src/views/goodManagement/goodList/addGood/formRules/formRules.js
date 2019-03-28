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
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error(" "));
  } else {
    callback();
  }
}

const valiSublicenseChannelMsg = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error(" "));
  } else {
    callback();
  }
}

const valiPriceType = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    if (index==2 || index==4 || index==6) {
        return false
    }
    if (!item.currencyId) return true
  });
  if (valiNull) {
    callback(new Error(" "));
  } else {
    callback();
  }
}

const valiPriceArr = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    if (!(item/1>0)) return true
  });
  if (valiNull) {
    callback(new Error(" "));
  } else {
    callback();
  }
}

const valiDiscountArr = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    let valueType = typeof item
    if (valueType == 'string') return true
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
  makeUpOfGoods: [{ required: true, message: "必填", trigger: "blur" }],
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
  sublicenseChannelMsg: [{ required: true, validator: valiSublicenseChannelMsg, trigger: "blur" }],
  availableSalesChannel: [{ required: true, message: "至少选择一项", trigger: "blur" }],
  priceType: [{ required: true, validator: valiPriceType, trigger: "change" }],
  priceArr: [{ required: true, validator: valiPriceArr, trigger: "blur" }],
  discountArr: [{ required: true, validator: valiDiscountArr, trigger: "blur" }],
  minOrderNumDiscountFX1: [{ required: true, type: 'number', message: "请填数字", trigger: "blur" }],
  minOrderNumDiscountFX2: [{ required: true, type: 'number', message: "请填数字", trigger: "blur" }],
  minOrderNumDiscountDL1: [{ required: true, type: 'number', message: "请填数字", trigger: "blur" }],
  minOrderNumDiscountDL2: [{ required: true, type: 'number', message: "请填数字", trigger: "blur" }],
}


export default basicsMsgRules
