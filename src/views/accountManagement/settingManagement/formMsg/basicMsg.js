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
  this.domesticAuthorityCompanyMsg.splice(index, 1)
  this.form.domesticAuthorityCompanyMsg.splice(index, 1)
}

export function addDomesticAuthorityCompany() {
  this.domesticAuthorityCompanyMsg.push({ address: null, city: null, englishName: null, contact: null, tel: null })
  this.form.domesticAuthorityCompanyMsg.push({ address: null, city: null, englishName: null, contact: null, tel: null })
}

export function deleteExternalAuthorityCompany(index) {
  this.externalAuthorityCompanyMsg.splice(index, 1)
  this.form.externalAuthorityCompanyMsg.splice(index, 1)
}

export function addExternalAuthorityCompany() {
  this.externalAuthorityCompanyMsg.push({ name: null, address: null, tel: null })
  this.form.externalAuthorityCompanyMsg.push({ name: null, address: null, tel: null })
}

export function getBasicMsgData() {
  // this.form.domesticAuthorityCompanyMsg = this.domesticAuthorityCompanyMsg
}

