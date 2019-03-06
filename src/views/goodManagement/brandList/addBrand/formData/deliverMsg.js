let deliverMsg = {
  airDeliverDays: null,
  seaDeliverDays: null,
  compensationRate: null,
  minMergeCounts: null,
  minBySea: [
    {
      oneChannelminBySea1: null,
      oneChannelminBySea2: null,
    }
  ],
  transportation: [],
  packingSetting: [
    {
      packing1: null,
      packing2: null,
    }
  ],
  paymentSetting: [
    {
      payment1: null,
      payment2: null,
    }
  ],
  brandBoxSetting: [
    {
      boxNo: null,
      length: null,
      width: null,
      height: null,
      weight: null,
    }
  ],
  discountTargetObj: [],
  discountRange1ForDL: [{ min: 0, max: 0, decreasing: 0, disabled: true }],
  discountRange1ForFX: [{ min: 0, max: 0, decreasing: 0, disabled: true }],
  discountRange2ForDL: [{ min: 0, max: 0, decreasing: 0, disabled: true }],
  discountRange2ForFX: [{ min: 0, max: 0, decreasing: 0, disabled: true }],
}

export function transportationChange() {
  this.form.transportation = this.transportation
}

export function discountTargetObjChange(val) {
  this.form.discountTargetObj = this.discountTargetObj
  let total = 0
  val.forEach(item => {
    total += item
  })
  switch(total) {
    case 0:
      this.discountRange1Visible = false
      this.discountRange2Visible = false
      break;
    case 1:
      this.discountRange1Visible = true
      this.discountRange2Visible = false
      break;
    case 2:
      this.discountRange1Visible = false
      this.discountRange2Visible = true
      break;
    case 3:
      this.discountRange1Visible = true
      this.discountRange2Visible = true
      break;
  }
}

export function addBrandBox(arr) {
  arr.push({
    boxNo: null,
    length: null,
    width: null,
    height: null,
    weight: null,
  })
}

export function deleteBrandBox(arr, index) {
  if (arr.length == 1) {
    arr.forEach(item => {
      for (let key in item) {
        item[key] = null
      }
    })
  } else {
    arr.splice(index, 1)
  }
}

export function discountHeaderClass1({row, column, rowIndex, columnIndex}) {
  if (column.property == 'inputHeader' && rowIndex == 1) {
    return 'inputHeaderClass'
  }
}

export function discountHeaderStyle1({ row, column, rowIndex, columnIndex }) {
  if (rowIndex == 3) {
    return { display: 'none' }
  }
}

export function addDiscountRange(arr) {
  // 增加前验证之前的输入
  // 前方所有输入框disabled
  arr.forEach(item => {
    item.disabled = true
  })
  arr.push({ min: 0, max: 0, decreasing: 0, disabled: false })
  arr[arr.length-1].min = arr[arr.length-2].max + 1
  arr[arr.length-1].max = arr[arr.length-1].min + 1
  arr[arr.length-1].decreasing = arr[arr.length-2].decreasing + 1
}

export function deleteDiscountRange(arr, index) {
  if (arr.length == 1) {
    arr[0].min = 0
    arr[0].max = 0
    arr[0].disabled = true
  } else {
    arr.splice(index, 1)
    // 前方所有输入框disabled
    arr[arr.length-1].disabled = false
  }
}

export function discountHeaderStyle2({ row, column, rowIndex, columnIndex }) {
  if (rowIndex == 2) {
    return { display: 'none' }
  }
}

export function discount1FXLabel(h, { column, $index }) {
  if (column.property == 'inputHeader') {
    let self = this
    return h('el-input', {
      attrs: {
        value: self.form.discountRange1ForFX[0].min,
        placeholder: '请输入整数',
      },
      props: {
        disabled: false
      },
      style: {
        padding: '0 120px'
      },
      nativeOn: {
        change: function (event) {
          if (self.form.discountRange1ForFX.length > 1) {
            event.target.value = self.form.discountRange1ForFX[0].min
            self.$confirm('只能在设置起始折扣区间时修改起订量', { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
            return false
          }
          if (event.target.value/1 > 0) {
            self.form.discountRange1ForFX[0].disabled = false
            self.form.discountRange1ForFX[0].min = event.target.value/1
            self.discountItemMaxChange(self.form.discountRange1ForFX)
          }
          else { event.target.value = self.form.discountRange1ForFX[0].min }
        }
      }
    })
  }
}

export function discount1DLLabel(h, { column, $index }) {
  if (column.property == 'inputHeader') {
    let self = this
    return h('el-input', {
      attrs: {
        value: self.form.discountRange1ForDL[0].min,
        placeholder: '请输入整数',
      },
      props: {
        disabled: false
      },
      style: {
        padding: '0 120px'
      },
      nativeOn: {
        change: function (event) {
          if (self.form.discountRange1ForDL.length > 1) {
            event.target.value = self.form.discountRange1ForDL[0].min
            self.$confirm('只能在设置起始折扣区间时修改起订量', { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
            return false
          }
          if (event.target.value/1 > 0) {
            self.form.discountRange1ForDL[0].disabled = false
            self.form.discountRange1ForDL[0].min = event.target.value/1
            self.discountItemMaxChange(self.form.discountRange1ForDL)
          }
          else { event.target.value = self.form.discountRange1ForDL[0].min }
        }
      }
    })
  }
}

export function discount2FXLabel(h, { column, $index }) {
  if (column.property == 'inputHeader') {
    let self = this
    return h('el-input', {
      attrs: {
        value: self.form.discountRange2ForFX[0].min,
        placeholder: '请输入整数',
      },
      props: {
        disabled: false
      },
      style: {
        padding: '0 120px'
      },
      nativeOn: {
        change: function (event) {
          if (self.form.discountRange2ForFX.length > 1) {
            event.target.value = self.form.discountRange2ForFX[0].min
            self.$confirm('只能在设置起始折扣区间时修改起订量', { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
            return false
          }
          if (event.target.value/1 > 0) {
            self.form.discountRange2ForFX[0].disabled = false
            self.form.discountRange2ForFX[0].min = event.target.value/1
            self.discountItemMaxChange(self.form.discountRange2ForFX)
          }
          else { event.target.value = self.form.discountRange2ForFX[0].min }
        }
      }
    })
  }
}

export function discount2DLLabel(h, { column, $index }) {
  if (column.property == 'inputHeader') {
    let self = this
    return h('el-input', {
      attrs: {
        value: self.form.discountRange2ForDL[0].min,
        placeholder: '请输入整数',
      },
      props: {
        disabled: false
      },
      style: {
        padding: '0 120px'
      },
      nativeOn: {
        change: function (event) {
          if (self.form.discountRange2ForDL.length > 1) {
            event.target.value = self.form.discountRange2ForDL[0].min
            self.$confirm('只能在设置起始折扣区间时修改起订量', { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
            return false
          }
          if (event.target.value/1 > 0) {
            self.form.discountRange2ForDL[0].disabled = false
            self.form.discountRange2ForDL[0].min = event.target.value/1
            self.discountItemMaxChange(self.form.discountRange2ForDL)
          }
          else { event.target.value = self.form.discountRange2ForDL[0].min }
        }
      }
    })
  }
}

export function discountItemMaxChange(arr) {
  // 通过验证后修改数组内容
  arr.forEach((item, index, arr) => {
    if (item.min/1 >= item.max/1) { item.max = item.min/1 + 1 }
    if (index < arr.length - 1) { arr[arr.length-1].min = item.max/1 + 1 }
    if (index>0 && arr[index].decreasing/1 <= arr[index-1].decreasing/1) {
      arr[index].decreasing = arr[index-1].decreasing/1 + 1
    }
    // 应对输入值不是数字的情况
    if (!(item.min/1)) { item.min = 0; item.max = 0 }
    if (!(item.max/1)) { item.max = item.min/1 + 1 }
  })
}

export default deliverMsg
