const validateOriginInput = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  if (valiNull) {
    callback(new Error("原产国/产地表格必须全部填写！"));
  } else {
    callback();
  }
}

const brandBasicsMsgRules = {
  brandNo: [{ required: true, message: "必填", trigger: "blur" }],
  chineseName: [{ required: true, message: "必填", trigger: "blur" }],
  englishName: [{ required: true, message: "必填", trigger: "blur" }],
  brandCompanyName: [{ required: true, message: "必填", trigger: "blur" }],
  brandCompanyPhone: [{ required: true, message: "必填", trigger: "blur" }],
  brandCompanyAddress: [{ required: true, message: "必填", trigger: "blur" }],
  producerName: [{ required: true, message: "必填", trigger: "blur" }],
  producerPhone: [{ required: true, message: "必填", trigger: "blur" }],
  producerAddress: [{ required: true, message: "必填", trigger: "blur" }],
  origin: [{ required: true, validator: validateOriginInput, trigger: "blur" }],
}


export default brandBasicsMsgRules
