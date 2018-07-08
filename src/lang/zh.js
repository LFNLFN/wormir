export default {
  route: {
    dashboard: '首页',
    channelManagement: '渠道管理',
    newManagement: '新增管理',
    newChannel: '新增渠道',
    newSubChannel: '新增子渠道',
    cooperationManagement: '合作管理',
    cooperationChannel: '合作渠道',
    inStopProcess: '终止处理中',
    stopChannel: '终止渠道',
    contact: '通信录',
    levelChange: '级别变化',
    goodManagement: '商品管理',
    brandList: '品牌列表',
    goodList: '商品列表',
    sourceGeneration: '溯源生成',
    sourceCodeManagement: '溯源码管理',
    boxCodeManagement: '箱码管理',
    sourceTracking: '溯源追踪',
    inventoryTracking: '进销存追踪',
    orderManagement: '订货管理',
    allOrders: '全部订单',
    billManagement: '货单管理',
    mergeRefundOrders: '提交并单',
    payOrder: '支付货款',
    payRefund: '支付退款',
    compensationManagement: '补款管理',
    receivedCompensation: '收到补款',
    payCompensation: '支付补款',
    receivableManagement: '收款管理',
    channelCooperator: '渠道订货',
    brandCooperator: '品牌商',
    earnestMoney: '已收定金',
    restMoney: '待收余款',
    collectedMoney: '已收余款',
    preExtraMoney: '待收补款',
    blemishExtraMoney: '瑕疵补款',
    defectiveProduct: '瑕疵商品',
    damagedProduct: '破损商品',
    lessCargoProduct: '少货商品',
    brokenExtraMoney: '破损转补款',
    extraMoney: '补款管理',
    preRefundment: '待收退款',
    receivedRefund: '收到退款',
    refundManagement: '退款管理',
    stockingStatus: '备货状态',
    preStocking: '待备货',
    inStocking: '进入备货',
    shortStocking: '缺货等待',
    receivingStatus: '收货状态',
    deliveredGood: '已经发货',
    receiving: '收货',
    preReceiving: '待收货',
    Received: '已收货',
    problematicProductManagement: '问题商品管理',
    extraMoneyOrder: '补款订单',
    replenishmentOrder: '补货订单',
    inCollectingMoney: '等待确认收款',
    inRemittance: '等待汇款',
    finishExtraMoney: '已补款',
    notAllowExtraMoney: '不同意补款',
    complain: '申诉中',
    rejectComplain: '驳回申诉',
    brokenReplenishment: '破损补货',
    lackReplenishment: '少货补货',
    pendingApprovalReplenishmentBronken: '补货待审核（破损）',
    pendingReplenishmentBronken: '等待补货（破损）',
    finishReplenishmentBronken: '已补货（破损）',
    transferReplenishmentBronken: '转补款（破损）',
    notAllowReplenishment: '不同意补货',
    brokenReplenishmentBroken: '破损补货（破损）',
    complainSuccessBroken: '申诉成功（破损）',
    introduction: '简述',
    documentation: '文档',
    guide: '引导页',
    permission: '权限测试页',
    pagePermission: '页面权限',
    directivePermission: '指令权限',
    icons: '图标',
    components: '组件',
    componentIndex: '介绍',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    dragDialog: '拖拽 Dialog',
    dragKanban: '可拖拽看板',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    Table: 'Table',
    dynamicTable: '动态Table',
    dragTable: '拖拽Table',
    inlineEditTable: 'Table内编辑',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createArticle: '创建文章',
    editArticle: '编辑文章',
    articleList: '文章列表',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  bill: {
    orderNo: '货单号',
    retailerCategories: '渠道属性',
    retailerNo: '渠道号',
    retailerName: '渠道名称',
    brandName: '品牌名称',
    orderAmount: '订货金额',
    thirtyPercentDeposit: '30%订金',
    residualPayment: '70%余款',
    crossBorderTax: '跨境税金（国内零售价*11.9%）',
    orderStatus: '货单状态',
    checkStock: '待备货',
    waitingForStock: '缺货等待',
    unpaidResidualPayment: '待收余款',
    pendingShipping: '待发货',
    dispatched: '待收货',
    receivedPackage: '已收货',
    stopedOrder: '停止订货',
    suspendOrder: '中断订货',
    operation: '操作',
    reviewOrder: '查看货单',
    processPackage: '处理收货',
    address: '地址',
    city: '城市',
    consignee: '收货人',
    contact: '联系方式',
    tel: '电话',
    receivables: '收款',
    remittance: '汇款',
    bank: '银行',
    bankAddress: '银行地址',
    sum: '合计：',
    paythirtyPercentDeposittime: '支付30%订金时间: ',
    stockUpTime: '完成备货时间：',
    thirtyPercentDepositAmountPaid: '已付30%订金: ',
    thirtyPercentDepositAmount: '30%订金合计: ',
    residualPaymentAmount: '70%余款合计：',
    residualPaymentAndTaxAmount: '70%余款+跨境税金合计：',
    paymentAndTaxPaid: '已付货款+跨境税金：',
    residualPaymentAndTaxPayTime: '支付70%余款+跨境税金时间：',
    unpaidResidualPaymentTips: '温馨提醒：请于XXXX年XX月XX日24点前完成余款支付，否则取消备货，订金不予退回。',
    cancelOrderTips: '温馨提醒：由于收到订金后才备货，所以请及时自行转帐，并核准以上帐号信息以人民币种转帐，因个人错误转帐造成的损失自行承担。',
    payRemainMoneyTips: '温馨提醒：请于####24点前完成余款支付，否则取消备货，订金不予退回。',
    shipmentConfirmTime: '确认出库时间：',
    transportTicketUploadTime: '上传运单时间：',
    receiveConfirmTime: '确认收货时间：',
    cancelOrderTime: '取消订货时间：',
    cancelStockUpTime: '取消订货时间：',
    receiverTel: '收货人电话：',
    paymentPaid: '已付货款：',
    mailBill: '发送货单',
    emailContact: '邮箱通讯录',
    emailTitle: '邮箱命名',
    documentPackage: '文件包',
    document: '文档',
    mergeOrderNo: '并货单号',
    mailBillSuccess: '文件已发送至您所选的邮箱。',
    hadCancelOrder: '已取消订货',
    hadCancelStockUp: '已取消备货',

  },
  product: {
    brandName: '商品品牌',
    productNo: '商品编号',
    productName: '商品名称',
    productSpecification: '商品规格',
    packageSpecification: '装箱规格',
    replenishmentSpecification: '补货规格',
    domesticRetailPrice: '国内零售价',
    orderQuantity: '订货数量',
    originalDiscount: '起始折扣',
    orderDiscount: '订货折扣',
    orderUnitPrice: '订货单价',
    replenishmentQuantity: '补货数量',
    quantity: '数量',
    problematicProduct: '问题商品',
    defectiveProduct: '瑕疵商品',
    damagedProduct: '破损商品',
    lessCargoProduct: '少货商品',
    readSystem: '读取系统',
  },

  problematicProduct: {

  },

  // 提交并单
  mergeRefundOrders: {
    orderNo: '货单号',
    retailerCategories: '渠道属性',
    retailerNo: '渠道号',
    retailerName: '渠道名称',
    brandName: '品牌名称',
    transportation: '运输方式',
    paymentReceive: '已收货款',
    purchasePrice: '采购价',
    paymentToPay: '待付货款',
    operation: '操作',
    byAir: '空运',
    bySea: '海运',
    transportChange: '调整运输',
    submitMergeOrder: '提交并单',
    transportQuantity: '运输货量',
    currentTransportation: '目前运输方式',
    quantityAtLeaseForTransportation: '货柜起运货量',
    whetherToChange: '是否调整运输',
    yse: '是否调整运输',
    confirmChange: '确认调整',
    tipsMultiBrands: '对相同品牌订货的货单才可进行并单，请核实调整选择项。',
    getIt: '知道了',
    mergeConfirmTips: '温馨提醒：并单一经提交不可更改，但可做取消并单操作。',
    mergeSuccessTips: '并单已提交，可到“渠道订货-支付货款”中查看详情，并完成付款。',
    changeTransportationSuccessTips: '货单号：#orderNo#的运输方式已调整为#transportation#，采购金额已作相应变化，请知悉。',
    submitTime: '提交并单时间：',
    payTime: '支付货款时间（Wormir）：',
    confirmTime: '确认货款到帐时间（Brand）',
  },

  // 支付货款
  payOrder: {
    mergePayNo: '并单支付号',
    brandName: '品牌名称',
    paymentSwifitCode: '收款SWIFIT Code',
    bank: '收款银行',
    bankAddress: '银行地址',
    paymentReceive: '已收货款',
    paymentPay: '支付货款',
    status: '付款状态',
    operation: '操作',
    statusToPay: '待付货款',
    statusToConfirm: '待确认到账',
    statusPaid: '货款已到账',
    viewMergeOrder: '查看并单',
    paidPayment: '已支付货款',
    receivedPayment: '已收到货款',
    cancelMergeOrder: '取消并单',
    hadCancelMergeOrderTips: '已经取消并单',
  },

  // 收到退款
  receivedRefund: {
    mergePayNo: '并单支付号',
    brandName: '品牌名称',
    paymentSwifitCode: '收款SWIFIT Code',
    bank: '收款银行',
    bankAddress: '银行地址',
    money: '退款金额',
    status: '退款状态',
    operation: '操作',
    statusToReceive: '待收退款',
    statusReceived: '已收退款',
    viewDetail: '查看详情',
    confirmOrderSplit: '确认拆单',
    receivedDeposit30: '收到30%订金',
    receivedResidual70: '收到70%余款',
    pendingRefundDeposit30: '待退30%订金',
    pendingRefundDeposit80: '待退订金的80%合计',
    pendingRefundAll: '待退全款',
    pendingRefundTotal: '待退总计',
    refundedDeposit30: '已退30%订金',
    refundedDeposit80: '已退80%订金',
    refundedAll: '已退全款',
    refundedTotal: '已退总计',
    refundReason: '退款理由',
    reasonLackGoods: '不再备货，品牌商取消订单',
    reasonCancelRefundDeposit: '等待备货时间过长，渠道商取消订货',
    reasonTerminate: '渠道商超过期限未付余款，订货终止。（退还80%订金）',
    reasonCancelRefundAll: '等待发货时间过长，渠道商取消订货（取消退全款）',
    mergeRefundOrderTime: '并单时间：',
    refundPaymentTime: '退款时间：'
  },

  // 支付退款
  payRefund: {
    orderNo: '货单号',
    businessType: '交易方式',
    brandName: '品牌名称',
    retailerCategories: '渠道属性',
    retailerNo: '渠道号',
    retailerName: '渠道名称',
    orderStatus: '货单状态',
    refundType: '退款类型',
    refundMoney: '退款金额',
    operation: '操作',
    statusNoGoodsRefundDeposit: '缺货退订金',
    statusCancelRefundDeposit: '取消退订金',
    statusRefundAll: '取消退全款',
    statusOrderTermination: '取消订货',
    typeDeposit: '订金',
    typeAll: '全款',
    typeDeposit80: '退还80%订金',
    viewBill: '查看货单',
    toRefund: '去退款',
    reason: '原因',
    refundDescription: '退款描述',
    timeOrderCancel: '订单取消时间：',
    timeRefundDeposit30: '退回30%订金时间',
    timeOrderGoodsCancel: '取消订货时间',
    timePayDeposit70AndTax: '支付70%余款+跨境税金时间',
    timeRefundAll: '退回全款时间',
    description1: '退款将退回到您的帐户，可在完成退款后前往“我的帐户-钱包管理-交易记录”里查看明细。',
    description2: '退款已退回到您的帐户，可前往“我的帐户-钱包管理-交易记录”里查看明细。',
    pendingRefundAllAndTax: '待退货款+跨境税金',
    refundedAllAndTax: '已退货款+跨境税金',
    refundedDeposit80Total: '已退订金80%合计'
  },

  // 收到补款
  receivedCompensation: {
    mergePayNo: '并单支付号',
    brandName: '品牌名称',
    paymentSwifitCode: '收款SWIFIT Code',
    bank: '收款银行',
    bankAddress: '银行地址',
    money: '补款金额',
    status: '补款状态',
    operation: '操作',
    statusToReceive: '待收补款',
    statusReceived: '已收补款',
    viewDetail: '查看详情',
    confirmOrderSplit: '确认拆单'
  },

  // 支付补款
  payCompensation: {
    orderNo: '货单号',
    businessType: '交易方式',
    brandName: '品牌名称',
    retailerCategories: '渠道属性',
    retailerNo: '渠道号',
    retailerName: '渠道名称',
    productNo: '商品编号',
    productName: '商品名称',
    localPrice: '国内售价',
    money: '补款金额',
    status: '补款状态',
    type: '补款类型',
    operation: '操作',
    statustoCompensate: '待补款',
    statusCompensated: '已补款',
    statusRefundAll: '取消退全款',
    statusOrderTermination: '取消订货',
    typeApply: '申请后补款',
    typeArgue: '申诉后补款',
    typeBroken: '破损转补款',
    viewDetail: '查看详情',
    toCompensate: '去补款'
  },

  // 支付退补款
  payment: {
    orderNo: '货单号',
    balance: '账户余额',
    balance: '账户余额',
    confirmPay: '确认支付',
    cancel: '暂不',
    tipBalanceNotEnough: '提醒：帐户余额不足扣减 ，请先充值。',
    toRecharge: '去充值',
    retryRecharge: '再去充值',
    rechargeMoney: '充值金额',
    confirmRecharge: '确认充值',
    rechargeSuccess: '已完成充值，当前帐户余额：¥ #balance#，是否继续完成之前的退款支付？',
    rechargeError: '充值金额：#rechargeMoney#，<span class="text-danger">未完成充值！</span>',
    rechargeErrorTips: '说明：由于帐户绑定的银行卡余额不足，无法完成此次充值。请先确认银行卡金额充足再充值。',
    failRecharge: '未完成充值',
    rechargeAtLease: '灰字显示：请充入不少于 ¥ #rechargeMoney#',
    paySuccess: '货单号#orderNo#已支付退款，当前帐户余额¥ #balance#。可在“支付退款”页面『查看货单』。',
    getIt: '知道了',
  },

  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    yes: '是',
    no: '否'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
