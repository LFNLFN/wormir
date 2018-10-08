import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'post', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 品牌列表相关
Mock.mock(/\/brand\/list.do/, 'post', {
  'data': {
    items: [{
      brandNo: 10001,
      chineseName: '兰蔻',
      englishName: 'LANCOME',
      brandStatus: '正常供货',
      brandOrigin: '法国',
      checkInTime: '2018-03-20 09:44',
      // 以上是主表格
      brandCompany: 'Armand Petitjean',
      brandCompanyAddress: '法国巴黎',
      brandIntroduction: '兰蔻1935年诞生于法国，是由Armand Petitjean（阿曼达·珀蒂让）创办的品牌。作为全球知名的高端化妆品品牌，兰蔻涉足护肤、彩妆、香水等多个产品领域，主要面向教育程度、收入水平较高，年龄在25～40岁的成熟女性[1]  。\n' +
      '凭借着对香水的天才敏感嗅觉、执着不懈的冒险精神，以及他立志让法国品牌在当时已被美国品牌垄断的全球化妆品市场占有一席之地的抱负，兰蔻为世界化妆品历史写下美的一页。一支来自法国古堡的玫瑰，凭借着气质，在变幻莫测的女性心理间，在捉摸不定的时尚法则中，足足绽放了六十年。',
      producer: 'Armand Petitjean',
      producerAddress: '法国巴黎',
      orderBySea: 500,
      forexTime: 24,
      transactionCurrencyInland: 'RMB',
      transactionCurrencyOutland: 'USD',
      qualityName: '特等品',
      packingWay: 'carton',
      brandSeries_msg: {
        hasBrandSeries: true,
        inputSeries: ['薰衣草'],
        mainCategoriesArr: [
          {
            value: '面部',
            subCategoriesArr: ['保湿']
          }
        ],
        brandSeriesArr: [
          { seriesName: ' ' }
        ],
        mainCategoriesItem_width: 750
      },
      brandType_msg: {
        brandTypeArr: [
          { typeName: ' ' }
        ],
        mainCategoriesArr: [
          {
            value: '面部',
            subCategoriesArr: ['保湿', '防晒']
          },
          {
            value: '唇部',
            subCategoriesArr: ['润唇', '滋润']
          }
        ],
        mainCategoriesItem_width: 600
      },
      brandSpecification_msg: {
        SpecificationArr: [
          { specificationName: ' ' }
        ],
        specificationInput: [
          {
            goodSpecification: {
              chinese: '102毫升/支',
              english: '102ml/pc'
            },
            capacity: {
              chinese: '102毫升',
              english: '102ml'
            },
            packingUnit: {
              chinese: '支',
              english: 'pc'
            }
          }
        ]
      },
      brandBox_msg: {
        boxArr: [
          { boxName: ' ' }
        ],
        boxInput: [
          {
            boxNo: '01',
            boxLength: 50.0,
            boxWidth: 50.0,
            boxHeight: 50.0,
            boxWeight: 0.5
          },
          {
            boxNo: '02',
            boxLength: 100.0,
            boxWidth: 100.0,
            boxHeight: 100.0,
            boxWeight: 1
          }
        ]
      },
      brandDiscount_msg: {
        discountArr: [
          { discountName: ' ' }
        ],
        discountInput: [
          {
            orderMin: 300.0,
            orderMax: 500.0,
            decreasingDiscount: 0.0
          },
          {
            orderMin: 501.0,
            orderMax: 1000.0,
            decreasingDiscount: 1.0
          }
        ]
      },
      cooperationManagement_Arr: [{
        contractNo: 20180320094446700,
        contractProp: '首次签订',
        beginTime: '2018-03-20',
        endTime: '2019-03-20',
        brandStatus: '正常供货',
        endDate: '\ ',
        endType: '\ ',
        endReason: '无'
      }]
    }]
  }
})

export default Mock
