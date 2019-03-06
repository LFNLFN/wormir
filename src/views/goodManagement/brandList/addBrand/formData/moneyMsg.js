let moneyMsg = {
  bankInfo: [
    {
      swiftCode: null,
      bankName: null,
      bankAddress: null
    }
  ],
  procurementCurrency: 6,
  supplyCurrency: 6,
  currencyCategories: [
    {
      name: '港币',
      currencyId: 1,
      symbol: '$',
      unit: '港元'
    },
    {
      name: '人民币',
      currencyId: 2,
      symbol: '￥',
      unit: '元'
    },
    {
      name: '澳元',
      currencyId: 3,
      symbol: 'A$',
      unit: '澳元'
    },
    {
      name: '英镑',
      currencyId: 4,
      symbol: '£',
      unit: '英镑'
    },
    {
      name: '欧元',
      currencyId: 5,
      symbol: '€',
      unit: '欧元'
    },
    {
      name: '美元',
      currencyId: 6,
      symbol: '$',
      unit: '美元'
    },
  ],
}

export function getCurrencyInfo() {
  this.form.procurementCurrency = this.procurementCurrency
  this.form.supplyCurrency = this.supplyCurrency
}

export default moneyMsg
