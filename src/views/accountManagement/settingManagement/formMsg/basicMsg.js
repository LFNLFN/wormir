let basicMsg = {
  tradeAccountSetting: [
    { swiftCodeZh: null, bankNameZh: null, bankAddressZh: null },
    { swiftCodeEn: null, bankNameEn: null, bankAddressEn: null }
  ],
  eQuickSetting: [
    { eQuickName: null, eQuickBankAccount: null, eQuickBankName: null }
  ],
  compensationBeneficiary: [
    { compensationBeneficiaryName: null, compensationBeneficiaryAccount: null, compensationBeneficiaryBankName: null }
  ],
  compensationRemitter: [
    { compensationRemitterName: null, compensationRemitterAccount: null, compensationRemitterBankName: null }
  ],
  domesticAuthorityCompanyMsg: [
    { address: null, city: null, englishName: null, contact: null, tel: null }
  ],
  externalAuthorityCompanyMsg: [
    { name: null, address: null, tel: null }
  ],
}

export default basicMsg

export function domesticAuthorityCompanyMsgSpanMethod({ row, column, rowIndex, columnIndex }) {
  if (rowIndex==0) {
    if (columnIndex==0) { return [1,1] } else if (columnIndex==1) { return [1,4] } else if(columnIndex>=5 && columnIndex<7) { return [1,1] } else if (columnIndex==7) { return [2,1] } else { return [0,0] }
      }
  else if (rowIndex==1) {
    if (columnIndex==1) { return [1,2] } else if (columnIndex==2) { return [0,0] } else if (columnIndex==7) { return [0,0] }
  }
}

export function domesticAuthorityCompanyMsgCellClassName({row, column, rowIndex, columnIndex}) {
  if (columnIndex==0 || columnIndex==5) { return 'fake-table-head' }
  if (rowIndex==1 && columnIndex==3) { return 'fake-table-head' }
}

export function deleteDomesticAuthorityCompany(index) {
  this.$confirm('确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$request({
      url: '/user/deleteDomesticAuthorityCompanyMsg.do',
      method: "post",
      data: { account: this.form.account, itemIndex: index }
    }).then(res => {
      if (res.errorCode == 0) {
        this.domesticAuthorityCompanyMsg.splice(index, 1)
        this.form.domesticAuthorityCompanyMsg.splice(index, 1)
        this.$message({ type: 'success', message: '删除成功!' });
      } else {
        this.$message({ type: 'error', message: '删除失败!请重试。' });
      }
    })
  })
}

export function addDomesticAuthorityCompany(index) {
  this.$confirm('确认增加?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$request({
      url: '/user/addDomesticAuthorityCompanyMsg.do',
      method: "post",
      data: {
        account: this.form.account,
        address: null,
        englishName: null,
        contact: null,
        tel: null,
        itemIndex: index+1
      }
    }).then(res => {
      if (res.errorCode == 0) {
        this.domesticAuthorityCompanyMsg.splice(index+1, 0, { address: null, city: null, englishName: null, contact: null, tel: null })
        this.form.domesticAuthorityCompanyMsg.splice(index+1, 0, { address: null, city: null, englishName: null, contact: null, tel: null })
        this.$message({ type: 'success', message: '新增成功!' });
      } else {
        this.$message({ type: 'error', message: '新增失败!请重试。' });
      }
    })
  })
}

export function deleteExternalAuthorityCompany(index) {
  this.$confirm('确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$request({
      url: '/user/deleteExternalAuthorityCompanyMsg.do',
      method: "post",
      data: { account: this.form.account, itemIndex: index }
    }).then(res => {
      if (res.errorCode == 0) {
        this.externalAuthorityCompanyMsg.splice(index, 1)
        this.form.externalAuthorityCompanyMsg.splice(index, 1)
        this.$message({ type: 'success', message: '删除成功!' });
      } else {
        this.$message({ type: 'error', message: '删除失败!请重试。' });
      }
    })
  })
}

export function addExternalAuthorityCompany(index) {
  this.$confirm('确认增加?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$request({
      url: '/user/addExternalAuthorityCompanyMsg.do',
      method: "post",
      data: {
        account: this.form.account,
        address: null,
        name: null,
        tel: null,
        itemIndex: index+1
      }
    }).then(res => {
      if (res.errorCode == 0) {
        this.externalAuthorityCompanyMsg.splice(index+1, 0, { name: null, address: null, tel: null })
        this.form.externalAuthorityCompanyMsg.splice(index+1, 0, { name: null, address: null, tel: null })
        this.$message({ type: 'success', message: '新增成功!' });
      } else {
        this.$message({ type: 'error', message: '新增失败!请重试。' });
      }
    })
  })
}


