<template>
  <div class="app-container">
    <div class="trade-category-wrap" style="margin-bottom: 10px">
      <el-radio v-model="listQuery.propertyOfSale" :label="1" @change="propertyOfSaleChange">一般贸易商品</el-radio>
      <el-radio v-model="listQuery.propertyOfSale" :label="2" @change="propertyOfSaleChange">跨境贸易商品</el-radio>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="货单号/渠道号/渠道名称/品牌名称" v-model.trim="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%;border-width: 2px;border-right-width: 1px;border-bottom-width: 1px;">
      <el-table-column align="center" label="货单号" min-width="135" prop="order_no"/>
      <el-table-column align="center" label="品牌名称" prop="brand_name"
                       min-width="100"
                       :filters="brandNameFilters"
                       :filter-method="filterHandler"/>
      <el-table-column align="center" label="渠道属性" prop="channel_prop"
                       min-width="100"
                       :filters="channelPropFilter"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.channel_prop | channelPropFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="渠道号" min-width="105" prop="channel_no"/>
      <el-table-column align="center" label="渠道名称" min-width="85" prop="channel_name"/>

      <el-table-column align="center" label="订货金额" min-width="95" prop="total_channel_amount">

      </el-table-column>

      <el-table-column align="center" label="30%订金" min-width="95" prop="total_earnest_amount">

      </el-table-column>

      <el-table-column align="center" label="70%余款" min-width="95" prop="total_surplus_amount">

      </el-table-column>

      <!--<el-table-column align="center" label="跨境税金" min-width="85">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.channelClassify===3 ? '￥'+(scope.row.orderAmount*0.05).toFixed(2) : '无' }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="货单状态" min-width="105"
                       prop="order_status"
                       :filters="orderStatusFilter"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span v-if="scope.row.order_status==10">待付订金</span>
          <span v-else-if="scope.row.order_status==-100">停止订货</span>
          <span v-else-if="scope.row.order_status==30">待备货</span>
          <span v-else-if="scope.row.order_status==40">待收余款</span>
          <span v-else-if="scope.row.order_status==35">缺货等待</span>

          <span v-else-if="scope.row.order_status==60">待发货</span>
          <span v-else-if="scope.row.order_status==70">待收货</span>
          <span v-else-if="scope.row.order_status==200">已收货</span>
          <span v-else-if="scope.row.order_status==210">国内收货</span>
          <span v-else-if="scope.row.order_status==220">国内发货</span>
          <span v-else-if="scope.row.order_status==-50">中断订货</span>
          <span v-else-if="scope.row.order_status==-110">取消待退订金</span>
          <span v-else-if="scope.row.order_status==-120">取消已退订金</span>
          <span v-else-if="scope.row.order_status==-130">取消待退全款</span>
          <span v-else-if="scope.row.order_status==-140">取消已退全款</span>
          <span v-else-if="scope.row.order_status==-150">缺货待退订金</span>
          <span v-else-if="scope.row.order_status==-160">缺货已退订金</span>
          <!--<span v-if="scope.row.order_status!=10&&scope.row.order_status!=40">{{ orderStatusMap[scope.row.order_status]}}</span>-->
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="180" fixed="right">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="mini" v-if="scope.row.order_status==10" @click="viewGoPayDeposit(scope.row)">去付订金</el-button>
            <!--<el-button type="primary" size="mini" v-if="scope.row.order_status==-110" @click="viewGoPayDeposit(scope.row)">查看货单</el-button>-->

            <el-badge value="即将取消" class="item" style="margin: 1em 0;"
                      v-if="scope.row.nearCancel && (scope.row.order_status==40)">
              <el-button type="primary" size="mini" v-if="scope.row.order_status==40"
                         @click="viewWaitReceiveResidual(scope.row)">待收余款
              </el-button>
            </el-badge>

            <el-button type="primary" size="mini"
                       v-if="!scope.row.nearCancel && (scope.row.order_status==40)"
                       @click="viewWaitReceiveResidual(scope.row)">待收余款
            </el-button>

            <el-button type="primary" size="mini" v-if="scope.row.order_status==70"
                       @click="viewHandleReceive(scope.row)" ref="handleReceiveBtn">查看货单
            </el-button>

            <el-button type="primary" size="mini" v-if="scope.row.order_status==30" @click="viewWaitStock(scope.row)">
              查看货单
            </el-button>
            <el-button type="primary" size="mini" v-if="scope.row.order_status==35"
                       @click="viewShortageWaiting(scope.row)">查看货单
            </el-button>
            <el-button type="primary" size="mini" v-if="scope.row.order_status==60"
                       @click="viewWaitShipment(scope.row)">查看货单
            </el-button>
            <el-button type="primary" size="mini" v-if="scope.row.order_status==200 || scope.row.order_status==210 || scope.row.order_status==220"
                       @click="viewAlreadyReceive(scope.row)">查看货单
            </el-button>
            <el-button type="primary" size="mini" v-if="scope.row.order_status==-100"
                       @click="viewStopOrdering(scope.row)">查看货单
            </el-button>
            <el-button type="primary" size="mini" v-if="scope.row.order_status==-50"
                       @click="viewInterruptOrdering(scope.row)">查看货单
            </el-button>
            <el-button type="primary" size="mini" v-if="scope.row.order_status==-110 || scope.row.order_status==-120 || scope.row.order_status==-150 || scope.row.order_status==-160"
                       @click="viewDepositRefund(scope.row)">查看货单
            </el-button>
            <el-button type="primary" size="mini" v-if="scope.row.order_status==-130 || scope.row.order_status==-140"
                       @click="viewRefundFullPayment(scope.row)">查看货单
            </el-button>
          </div>
          <!--<div style="display: flex;justify-content: space-around;flex-flow: wrap">-->
          <!--<el-button type="primary" size="mini" style="margin-left: 10px">待付订金</el-button>-->
          <!--<el-button type="primary" size="mini">去付订金</el-button>-->
          <!--<el-button type="primary" size="mini">待付余款</el-button>-->
          <!--</div>-->
          <!--<div style="margin: 10px"></div>-->
          <!--<div style="display: flex;justify-content: space-around;flex-flow: wrap">-->
          <!--<el-button type="primary" size="mini" style="margin-left: 10px">去付余款</el-button>-->
          <!--<el-button type="primary" size="mini">处理收货</el-button>-->
          <!--<el-button type="primary" size="mini">查看货单</el-button>-->
          <!--</div>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isDialogBillDetailShow">
      <bill-detail :bill="currentOrder"></bill-detail>
    </el-dialog>

    <el-dialog :visible.sync="isHandleReceiveShow" fullscreen style="padding: 20px">
      <handleReceive v-if="isHandleReceiveShow" :currentRow="currentRow"></handleReceive>
    </el-dialog>

    <el-dialog :visible.sync="isWaitReceiveOrderShow" fullscreen style="padding: 20px" title="待收货信息查看">
      <waitReceive v-if="isWaitReceiveOrderShow" :currentRow="currentRow"></waitReceive>
    </el-dialog>

    <el-dialog :visible.sync="isWaitStockShow" fullscreen style="padding: 20px">
      <waitStock v-if="isWaitStockShow" :currentRow="currentRow"></waitStock>
    </el-dialog>

    <el-dialog :visible.sync="isShortageWaitingShow" fullscreen style="padding: 20px">
      <shortageWaiting v-if="isShortageWaitingShow" :currentRow="currentRow"
                       @close="isShortageWaitingShow=false"></shortageWaiting>
    </el-dialog>

    <el-dialog :visible.sync="isWaitReceiveResidualShow" fullscreen style="padding: 20px">
      <waitReceiveResidual v-if="isWaitReceiveResidualShow" :currentRow="currentRow"></waitReceiveResidual>
    </el-dialog>

    <el-dialog :visible.sync="isWaitShipmentShow" fullscreen style="padding: 20px">
      <waitShipment v-if="isWaitShipmentShow" :currentRow="currentRow"></waitShipment>
    </el-dialog>

    <el-dialog :visible.sync="isAlreadyReceiveShow" fullscreen style="padding: 20px">
      <alreadyReceive v-if="isAlreadyReceiveShow" :currentRow="currentRow"></alreadyReceive>
    </el-dialog>

    <el-dialog :visible.sync="isStopOrderingShow" fullscreen style="padding: 20px">
      <stopOrdering v-if="isStopOrderingShow" :currentRow="currentRow"></stopOrdering>
    </el-dialog>

    <el-dialog :visible.sync="isInterruptOrderingShow" fullscreen style="padding: 20px">
      <interruptOrdering v-if="isInterruptOrderingShow" :currentRow="currentRow"></interruptOrdering>
    </el-dialog>

    <el-dialog :visible.sync="isDepositRefundShow" fullscreen style="padding: 20px">
      <depositRefund v-if="isDepositRefundShow" :currentRow="currentRow" @orderStatusChange="orderStatusChange($event)"></depositRefund>
    </el-dialog>

    <el-dialog :visible.sync="isRefundFullPaymentShow" fullscreen style="padding: 20px">
      <refundFullPayment v-if="isRefundFullPaymentShow" :currentRow="currentRow" @orderStatusChange="orderStatusChange($event)"></refundFullPayment>
    </el-dialog>

    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"></el-table-column>
        <el-table-column prop="pv" label="Pv"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    fetchList,
    fetchPv,
    updateArticle
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import BillDetail from '../../BillDetail'
  import request from "@/utils/request"

  import handleReceive from './handleReceive/index.vue'
  import waitReceive from './waitReceive/index.vue'
  import waitStock from './waitStock/index.vue'
  import shortageWaiting from './shortageWaiting/index.vue'
  import waitReceiveResidual from './waitReceiveResidual/index.vue'
  import waitShipment from './waitShipment/index.vue'
  import alreadyReceive from './alreadyReceive/index.vue'
  import stopOrdering from './stopOrdering/index.vue'
  import interruptOrdering from './interruptOrdering/index.vue'
  import depositRefund from './depositRefund/index.vue'
  import refundFullPayment from './refundFullPayment/index.vue'

  export default {
    name: 'bill-management',
    directives: {
      waves
    },
    components: {
      BillDetail, handleReceive, waitReceive, waitStock, shortageWaiting,
      waitReceiveResidual, waitShipment, alreadyReceive, stopOrdering, interruptOrdering,
      depositRefund, refundFullPayment
    },
    data() {
      return {
        tableKey: 0,
        currentRow: null,
        isHandleReceiveShow: false,
        isWaitReceiveOrderShow: false,
        isWaitStockShow: false,
        isShortageWaitingShow: false,
        isWaitReceiveResidualShow: false,
        isWaitShipmentShow: false,
        isAlreadyReceiveShow: false,
        isStopOrderingShow: false,
        isInterruptOrderingShow: false,
        isDepositRefundShow: false,
        isRefundFullPaymentShow: false,
        list: [],
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          searchText: undefined,
          type: undefined,
          sort: "+id",
          propertyOfSale: 1
        },
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        isDialogBillDetailShow: false,
        dialogStatus: '',
        dialogPvVisible: false,
        pvData: [],
        downloadLoading: false,
        currentOrder: {},
        brandNameFilters: [],
        channelPropFilter: [
          { text: 'DLQD', value: 1 },
          { text: 'DFQD', value: 2 },
          { text: 'FXQD', value: 3 },
          { text: 'FXZQD', value: 4 },
          { text: 'WORMIR', value: 5 },
        ],
        orderStatusFilter: [
          { text: '待付订金', value: 10 },
          // { text: '去付订金', value: 1 },
          { text: '待备货', value: 30 },

          { text: '缺货等待', value: 35 },
          { text: '待付余款', value: 40 },
          // { text: '去付余款', value: 5 },

          { text: '待发货', value: 60 },
          { text: '待收货', value: 70 },
          // { text: '已收货', value: 8 },

          { text: '停止订货', value: -100 },
          // { text: '中断订货', value: 10 },

          // { text: '缺货待退订金', value: 11 },
          // { text: '缺货已退订金', value: 12 },
          { text: '取消待退订金', value: -110 },
          { text: '取消已退订金', value: -120 },
          { text: '取消待退全款', value: -130 },
          { text: '取消已退全款', value: -140 },
          { text: '国内收货', value: 210 },
          { text: '国内发货', value: 220 },
        ],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 查看货单
      viewDetail(row) {
        this.currentOrder = row
        this.isDialogBillDetailShow = true
      },

      getList() {
        this.listLoading = true
        this.$request({
          url: '/order/managerOrderList.do',
          method: 'post',
          data: this.listQuery
        }).then((res) => {
          if (res.errorCode == 0) {
            this.list = res.data.items
            this.total = res.data.total
            this.brandNameFilters = res.data.brandNameFilters
            this.listLoading = false
          } else {
            this.$message.error('数据请求失败');
            this.listLoading = false
          }
        }).catch((err) => {
          this.$message.error('数据请求失败');
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

      orderStatusChange(status) {
        if (status == -120 || status == -160) { this.isDepositRefundShow = false }
        else if (status == -140) { this.isRefundFullPaymentShow = false }
        this.getList()
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
        this.isDialogBillDetailShow = true
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
              this.isDialogBillDetailShow = false
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
          this.dialogPvVisible = true
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
      },

      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },

      propertyOfSaleChange(val) {
        this.getList()
      },

      viewHandleReceive(row) {
        this.currentRow = row
        this.isHandleReceiveShow = true
      },
      viewWaitReceiveOrder(row) {
        this.currentRow = row
        this.isWaitReceiveOrderShow = true
      },
      viewWaitStock(row) {
        this.currentRow = row
        this.isWaitStockShow = true
      },
      viewShortageWaiting(row) {
        this.currentRow = row
        this.isShortageWaitingShow = true
      },
      viewWaitReceiveResidual(row) {
        this.currentRow = row
        this.isWaitReceiveResidualShow = true
      },
      viewWaitShipment(row) {
        this.currentRow = row
        this.isWaitShipmentShow = true
      },
      viewAlreadyReceive(row) {
        this.currentRow = row
        this.isAlreadyReceiveShow = true
      },
      viewStopOrdering(row) {
        this.currentRow = row
        this.isStopOrderingShow = true
      },
      viewInterruptOrdering(row) {
        this.currentRow = row
        this.isInterruptOrderingShow = true
      },
      viewDepositRefund(row) {
        this.currentRow = row
        this.isDepositRefundShow = true
      },
      viewRefundFullPayment(row) {
        this.currentRow = row
        this.isRefundFullPaymentShow = true
      },
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

  .table-btn-wrap {
    margin: 3px;
  }
</style>
