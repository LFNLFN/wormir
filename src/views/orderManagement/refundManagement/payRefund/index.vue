<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="货单号/品牌名称/渠道号/渠道名称" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>
    <!-- border-left2 border-top2 border-bottom2 -->
    <el-table
      :key='tableKey' :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      class="table_border2"
      style="width: 100%">

      <el-table-column align="center" :label="$t('payRefund.orderNo')" min-width="120" prop="orderNo" fixed="left"/>

      <el-table-column min-width="120px" align="center" :label="$t('payRefund.businessType')"
                       :filters="dealWayFilters"
                       :filter-method="filterHandler"
                       prop="dealWay">
        <template slot-scope="scope">
          <span>{{scope.row.dealWay | dealWayFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120px" align="center"
        :label="$t('payRefund.brandName')"
        :filters="brandNameFilters"
        :filter-method="filterHandler"
        prop="brandName">
        <template slot-scope="scope">
          <span>{{scope.row.brandName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120px"
        :label="$t('payRefund.retailerCategories')"
        align="center"
        prop="retailerCategories"
        :filters="retailerCategoriesFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.retailerCategories | retailerCategoriesFilters}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" :label="$t('payRefund.retailerNo')">
        <template slot-scope="scope">
          <span>{{scope.row.retailerNo}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" :label="$t('payRefund.retailerName')" prop="retailerName">
        <template slot-scope="scope">
          <span>{{scope.row.retailerName}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" :label="$t('payRefund.orderStatus')" min-width="120" prop="orderStatus"
                       :filters="orderStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.orderStatus | orderStatusFilters}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" :label="$t('payRefund.refundType')"
                       prop="orderStatus"
                       :filters="refundTypeFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.orderStatus | refundTypeFilters}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" :label="$t('payRefund.refundMoney')" prop="refundMoney">
        <template slot-scope="scope">
          <span>￥ {{scope.row.refundMoney.toFixed(2)}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('payRefund.operation')" min-width="150"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <div class="table-btn-wrap">
            <el-button size="medium" type="primary" @click="viewOrderDetail(scope.row)">
              {{$t('payRefund.viewBill')}}
            </el-button>
          </div>
          <div class="table-btn-wrap">
            <el-button v-if="'未退款'" size="medium" type="warning" @click="viewGoPayRefund(scope.row)">
              {{$t('payRefund.toRefund')}}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <!--点击去付退款-->
    <el-dialog :visible.sync="payWindowVisible" width="30%" :show-close="false">
      <div style="text-align: center">货单号: <span>{{'100001'}}</span></div>
      <div style="text-align: center;">账户余额: ￥{{accountResidual.toFixed(2)}}</div>
      <div style="text-align: center;">缺货退订金: ￥{{refundDeposit.toFixed(2)}}</div>
      <div style="text-align: center" class="text-muted" v-if="accountResidual<refundDeposit">提醒：帐户余额不足扣减 ，请先充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="payWindowVisible=false">暂不</el-button>
        <el-button type="primary" v-if="accountResidual>=refundDeposit" @click="handlePaymentConfirm()">确认支付</el-button>
        <el-button type="primary" v-else @click="goRecharge()">去充值</el-button>
      </div>
    </el-dialog>
    <!--支付成功提示-->
    <el-dialog :visible.sync="completePaymentVisible" width="36%" :show-close="false">
      <div style="text-align: center">货单号 <span>{{'1000001'}}</span> 已支付退款。<br>当前帐户余额 ￥ <span>{{(accountResidual-refundDeposit).toFixed(2)}}</span><br>可在“支付退款”页面『查看货单』。
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="completePaymentVisible=false">知道了</el-button>
      </div>
    </el-dialog>
    <!--充值界面-->
    <el-dialog :visible.sync="rechargeWindowVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center;">账户余额: ￥ {{accountResidual.toFixed(2)}}</div>
      <div style="text-align: center;">充值金额:<span
        style="color: red">请充入不少于 ￥ {{(refundDeposit-accountResidual).toFixed(2)}}</span>
        <el-input v-model.number.lazy="rechargeAmount"></el-input>
      </div>
      <div style="text-align: center" class="text-danger">温馨提示：充值前请确保已绑定的银行卡有足够金额进行充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeWindowVisible=false">暂不</el-button>
        <el-button type="primary" @click="handleRechargeConfirm()">确认充值</el-button>
        <el-button type="primary" @click="handleRechargeFailConfirm()">确认充值(失败)</el-button>
      </div>
    </el-dialog>
    <!--充值成功-->
    <el-dialog :visible.sync="rechargeSuccessVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">已完成充值，当前帐户余额：¥ <span>{{(accountResidual+this.rechargeAmount).toFixed(2)}}</span>，是否继续完成之前的订金支付？</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeSuccessVisible=false;payWindowVisible=false">否</el-button>
        <el-button type="primary" @click="stayInGoPayDeposit()">是</el-button>
      </div>
    </el-dialog>
    <!--充值失败-->
    <el-dialog :visible.sync="rechargeFailVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">充值金额: ￥ <span>{{Number(rechargeAmount).toFixed(2)}}</span><span
        style="color: red">未完成充值！</span></div>
      <div style="text-align: center" class="text-muted">说明：由于帐户绑定的银行卡余额不足，无法完成此次充值。请先确认银行卡金额充足再充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeFailVisible=false;payWindowVisible=false">暂不</el-button>
        <el-button type="primary" @click="rechargeAgain()">再去充值</el-button>
      </div>
    </el-dialog>




    <!--查看货单详情 --退订金-->
    <el-dialog :visible.sync="orderDetailVisible" fullscreen style="padding: 20px">
      <depositRefund v-if="orderDetailVisible"></depositRefund>
    </el-dialog>

    <!--查看货单详情 --退全款-->
    <!--<el-dialog :visible.sync="orderDetailVisible" fullscreen style="padding: 20px">-->
      <!--<residualRefund v-if="orderDetailVisible"></residualRefund>-->
    <!--</el-dialog>-->





    <el-dialog :visible.sync="isDialogDetailShow">
      <bill-detail :bill="currentOrder"></bill-detail>
    </el-dialog>

    <!--退款，支付后修改支付状态-->
    <refund-compensation ref="payment" :order="currentOrder" @pay="currentOrder.hasPaid = true"></refund-compensation>

    <el-dialog :visible.sync="dialogTransportChangeVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"></el-table-column>
        <el-table-column prop="pv" label="Pv"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTransportChangeVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    fetchList,
    fetchPv,
    createArticle,
    updateArticle
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import BillDetail from '../../BillDetail'
  import RefundCompensation from '../../RefundCompensation'
  import Mock from 'mockjs'
  import depositRefund from './depositRefund/index.vue'
  import residualRefund from './residualRefund/index.vue'

  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]

  // arr to obj ,such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'pay-order',
    components: { BillDetail, RefundCompensation, depositRefund, residualRefund },
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,

        // 去退款流程^
        payWindowVisible: false,
        accountResidual: 100,
        refundDeposit: 1000,
        completePaymentVisible: false,
        rechargeWindowVisible: false,
        rechargeAmount: 0,
        rechargeSuccessVisible: false,
        rechargeFailVisible: false,
        // 去退款流程$

        // 查看货单详情^
        orderDetailVisible: false,
        // 查看货单详情$

        list: [
          {
            orderNo: Mock.Random.natural(20180522001, 20180522100),
            dealWay: Mock.Random.natural(0, 1),
            brandName: Mock.Random.pick(['LANCOM', 'AESOP']),
            retailerCategories: Mock.Random.natural(0, 2),
            retailerNo: Mock.Random.natural(2018001, 2018100),
            retailerName: 'QWE总店',
            orderStatus: Mock.Random.natural(0, 3),
            refundMoney: Mock.Random.natural(1000, 2000),
          }
        ],
        dealWayFilters: [
          { text: '国内交易', value: 0 },
          { text: '香港交易', value: 1 }
        ],
        brandNameFilters: [
          { text: 'LANCOM', value: 'LANCOM' },
          { text: 'AESOP', value: 'AESOP' }
        ],
        retailerCategoriesFilters: [
          { text: 'DLQD', value: 0 },
          { text: 'FXQD', value: 1 },
          { text: 'DFQD', value: 2 }
        ],
        orderStatusFilters: [
          { text: '缺货退订金', value: 0 },
          { text: '取消退订金', value: 1 },
          { text: '取消退全款', value: 2 },
          { text: '中断订货', value: 3 },
        ],
        refundTypeFilters: [
          { text: '订金', value: 0 },
          { text: '订金', value: 1 },
          { text: '全款', value: 2 },
          { text: '退还80%订金', value: 3 },
        ],
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [
          { label: 'ID Ascending', key: '+id' },
          { label: 'ID Descending', key: '-id' }
        ],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        isDialogDetailShow: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogTransportChangeVisible: false,
        pvData: [],
        rules: {
          type: [
            { required: true, message: 'type is required', trigger: 'change' }
          ],
          timestamp: [
            {
              type: 'date',
              required: true,
              message: 'timestamp is required',
              trigger: 'change'
            }
          ],
          title: [
            { required: true, message: 'title is required', trigger: 'blur' }
          ]
        },
        downloadLoading: false,
        currentOrder: {}
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      },
      dealWayFilter(status) {
        const statusMap = {
          0: '国内交易',
          1: '香港交易',
        }
        return statusMap[status]
      },
      retailerCategoriesFilters(status) {
        const statusMap = {
          0: 'DLQD',
          1: 'FXQD',
          2: 'DFQD',
        }
        return statusMap[status]
      },
      orderStatusFilters(status) {
        const statusMap = {
          0: '缺货退订金',
          1: '取消退订金',
          2: '取消退全款',
          3: '中断订货',
        }
        return statusMap[status]
      },
      refundTypeFilters(status) {
        const statusMap = {
          0: '订金',
          1: '订金',
          2: '全款',
          3: '退还80%订金',
        }
        return statusMap[status]
      },
    },
    created() {
//    this.getList()
    },
    methods: {
      // 查看货单
      viewDetail(row) {
        this.currentOrder = row
        this.isDialogDetailShow = true
      },

      toPayRefund(row) {
        this.currentOrder = row
        this.$refs.payment.open()
      },


      // 点击退款流程^
      viewGoPayRefund(row) {
        this.payWindowVisible = true
      },
      handlePaymentConfirm() {
        this.completePaymentVisible = true
        this.payWindowVisible = false
      },
      goRecharge() {
        this.rechargeAmount = 0
        this.rechargeWindowVisible = true
      },
      handleRechargeConfirm() {
        this.rechargeSuccessVisible = true
        this.rechargeWindowVisible = false
      },
      handleRechargeFailConfirm() {
        this.accountResidual += this.rechargeAmount
        this.rechargeFailVisible = true
        this.rechargeWindowVisible = false
      },
      stayInGoPayDeposit() {
        this.rechargeSuccessVisible = false
        this.payWindowVisible = true
      },
      rechargeAgain() {
        this.rechargeAmount = 0
        this.refundAmount = 1000
        this.accountResidual = 100
        this.rechargeFailVisible = true
        this.rechargeWindowVisible = true
      },
      // 点击退款流程$

      // 查看货单详情^
      viewOrderDetail(row) {
        this.orderDetailVisible = true
      },
      // 查看货单详情$

      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.items
          this.total = response.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.isDialogDetailShow = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      createData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.isDialogDetailShow = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.isDialogDetailShow = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.isDialogDetailShow = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogTransportChangeVisible = true
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = [
            'timestamp',
            'title',
            'type',
            'importance',
            'status'
          ]
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j === 'timestamp') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          })
        )
      }
    }
  }
</script>
<style scoped>
  .el-dialog {
    width: 90%;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    padding-top: 6px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
