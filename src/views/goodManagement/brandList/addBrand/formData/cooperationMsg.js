let cooperationMsg = {
  flow: 1,
  specialProject: [],
  cooperationManagementData: [
    {
      contractNo: null,
      startTime: null,
      endTime: null,
      contractStatus: null,
      brandStatus: null,
    }
  ],

  terminationReason: null
}

export function getCooperationData() {
  this.form.flow = this.flow
  this.form.specialProject = this.specialProject
  this.form.cooperationManagementData[0].contractStatus = this.contractStatus
  this.form.cooperationManagementData[0].brandStatus = this.brandStatus
  this.form.terminationReason = this.terminationReason
}

export function flowChange(val) {
  if (this.flow == 1) {
    this.useSpecialFlow = false
  }
  if (this.flow == 2) {
    this.useSpecialFlow = true
  }
}

export function contractStatusChange(val) {
  this.form.cooperationManagementData[0].contractStatus = val
  let valiBrandStatus = this.form.cooperationManagementData.some(item => {
    for (let key in item) {
      if (!item[key]) { return true }
      else { return false }
    }
  })
  if (!valiBrandStatus) { this.form.cooperationManagementData[0].brandStatus = this.brandStatus = 1 }
  else { this.form.cooperationManagementData[0].brandStatus = this.brandStatus = 3 }
}

export function timeChange(val) {
  let valiBrandStatus = this.form.cooperationManagementData.some(item => {
    for (let key in item) {
      if (!item[key]) { return true }
      else { return false }
    }
  })
  if (!valiBrandStatus) { this.form.cooperationManagementData[0].brandStatus = this.brandStatus = 1 }
  else { this.form.cooperationManagementData[0].brandStatus = this.brandStatus = 3 }
}

export function makeFakeTableHeadClass({row, column, rowIndex, columnIndex}) {
  if (columnIndex == 0) return 'fake-table-head'
}

export function terminationReasonSpanMethod({row, column, rowIndex, columnIndex}) {
  if (columnIndex > 1) {
    return [0, 0]
  } else if (columnIndex == 1) {
    return [1, 5]
  } else if (columnIndex == 0) {
    return [1, 1]
  }
}

export default cooperationMsg
