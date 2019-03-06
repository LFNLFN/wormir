const validateMinBySea = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("转海运起订标准表格必须全部填写！"));
  } else {
    callback();
  }
}

const validateTransportation = (rule, value, callback) => {
  if (value.length == 0) {
    callback(new Error("品牌运输方式必须填写！"));
  } else {
    callback();
  }
}

const validatePackingSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("品牌包装设置表格必须全部填写！"));
  } else {
    callback();
  }
}

const validatePaymentSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("品牌包装设置表格必须全部填写！"));
  } else {
    callback();
  }
}

const validateBrandBoxSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("品牌箱型设置表格必须全部填写！"));
  } else {
    callback();
  }
}

const validateDiscountTargetObj = (rule, value, callback) => {
  if (value.length == 0) {
    callback(new Error("品牌起订/降幅设置必须填写！"));
  } else {
    callback();
  }
}

const validateDiscountRange1 = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("品牌起订/降幅设置表格必须全部填写数字！"));
  } else {
    callback();
  }
}

const deliverMsgRules = {
  airDeliverDays: [{ required: true, message: "必填", trigger: "blur" }],
  seaDeliverDays: [{ required: true, message: "必填", trigger: "blur" }],
  compensationRate: [{ required: true, message: "必填", trigger: "blur" }],
  minMergeCounts: [{ required: true, message: "必填", trigger: "blur" }],
  minBySea: [{ required: true, validator: validateMinBySea, trigger: "blur" }],
  transportation: [{ required: true, validator: validateTransportation, trigger: "blur" }],
  packingSetting: [{ required: true, validator: validatePackingSetting, trigger: "blur" }],
  paymentSetting: [{ required: true, validator: validatePaymentSetting, trigger: "blur" }],
  brandBoxSetting: [{ required: true, validator: validateBrandBoxSetting, trigger: "blur" }],
  discountTargetObj: [{ required: true, validator: validateDiscountTargetObj, trigger: "blur" }],
  discountRange1: [{ required: true, validator: validateDiscountRange1, trigger: "blur" }],
}


export default deliverMsgRules
