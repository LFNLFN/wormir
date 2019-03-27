const validateTradeAccountSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("香港吾蜜交易账号设置必须全部填写！"));
  } else {
    callback();
  }
}

const validateEQuickSetting = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("e商快线总金户设置必须全部填写！"));
  } else {
    callback();
  }
}

const validateCompensationBeneficiary = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("赔保设置的收款方信息必须全部填写！"));
  } else {
    callback();
  }
}

const validateCompensationRemitter = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("赔保设置的汇款方信息必须全部填写！"));
  } else {
    callback();
  }
}

const validateDomesticAuthorityCompanyMsg = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  })
  if (valiNull) {
    callback(new Error("国内货权公司信息须全部填写！"))
  } else {
    callback()
  }
}

const validateExternalAuthorityCompanyMsg = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  })
  if (valiNull) {
    callback(new Error("国外货权公司设置信息必须全部填写！"))
  } else {
    callback()
  }
}

let basicMsgRules = {
  tradeAccountSetting: [{ required: true, validator: validateTradeAccountSetting, trigger: "blur" }],
  eQuickSetting: [{ required: true, validator: validateEQuickSetting, trigger: "blur" }],
  compensationBeneficiary: [{ required: true, validator: validateCompensationBeneficiary, trigger: "blur" }],
  compensationRemitter: [{ required: true, validator: validateCompensationRemitter, trigger: "blur" }],
  domesticAuthorityCompanyMsg: [{ required: true, validator: validateDomesticAuthorityCompanyMsg, trigger: "blur" }],
  externalAuthorityCompanyMsg: [{ required: true, validator: validateExternalAuthorityCompanyMsg, trigger: "blur" }],
}

export default basicMsgRules
