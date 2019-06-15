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
  // 非空验证
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  // 两位小数验证
  let valiDecimals = value.some((item, index, arr) => {
    for (var key in item) {
      if (key == 'boxNo') continue
      if (!(item[key]/1 > 0)) return true // 如果不是数字，报错
      // 如果有小数点
      if (item[key].indexOf('.') > -1) {
        if (item[key].indexOf('.') == 0) { item[key] = '0'+item[key] } //小数点之前没有数字
        item[key] = item[key].substring(0, item[key].indexOf('.')+3)
        if (item[key].length == item[key].indexOf('.')+1) { item[key] += '00' }
        else if (item[key].length == item[key].indexOf('.')+1+1) { item[key] += '0' }// 判断此时小数点后是否够两位小数
        else {}
        if (key == 'weight') return false
      }
      // 如果没有小数点
      else {
        // 去除字符串开头多余的0
        let targetIndex = -1
        for (let ii=0; ii<item[key].length; ii++) {
          if (item[key][ii] != 0) { targetIndex=ii; break }
          else {}
        }
        if (targetIndex>=1) { item[key] = item[key].substring(targetIndex) }
        item[key] += '.00'
      }
    }
  });
  if (valiNull || valiDecimals) {
    callback(new Error("请正确填写品牌箱型设置表格！"));
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
  minMergeShipmentOrderNum: [
    { required: true, message: "必填", min: 0, trigger: "blur" },
    { min: 0, max: 999999999, message: '请填入正确数字', trigger: 'blur' }
  ],
  minBySea: [{ required: true, validator: validateMinBySea, trigger: "blur" }],
  transportation: [{ required: true, validator: validateTransportation, trigger: "blur" }],
  packingSetting: [{ required: true, validator: validatePackingSetting, trigger: "blur" }],
  paymentSetting: [{ required: true, validator: validatePaymentSetting, trigger: "blur" }],
  brandBoxSetting: [{ required: true, validator: validateBrandBoxSetting, trigger: "blur" }],
  discountTargetObj: [{ required: true, validator: validateDiscountTargetObj, trigger: "blur" }],
  discountRange1: [{ required: true, validator: validateDiscountRange1, trigger: "blur" }],
}


export default deliverMsgRules
