const validateSpecialProject = (rule, value, callback) => {
  if (value.length<1) {
    callback(new Error("特殊流程项目必须选择！"));
  } else {
    callback();
  }
}

const validateCooperationManagementData = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key] && key == 'contractNo') return true
    }
  });
  if (valiNull) {
    callback(new Error("合同编号必须填写！"));
  } else {
    callback();
  }
}

const goodsMsgRules = {
  specialProject: [{ required: true, validator: validateSpecialProject, trigger: "blur" }],
  cooperationManagementData: [{ required: true, validator: validateCooperationManagementData, trigger: "blur" }],
}


export default goodsMsgRules
