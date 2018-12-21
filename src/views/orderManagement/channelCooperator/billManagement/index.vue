<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="货单号/渠道号/渠道名称/品牌名称/货单状态" v-model.trim="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>
    <el-table
      :key='tableKey' :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit size="mini" highlight-current-row
      class="border2"
      style="width: 100%;border-right-width: 1px">

      <el-table-column align="center" label="货单号" prop="order_no" min-width="120" />

      <!--<el-table-column-->
        <!--min-width="120px" align="center"-->
        <!--label="渠道属性"-->
        <!--:filters="channelPropFilters"-->
        <!--:filter-method="filterHandler"-->
        <!--prop="channelProp">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.channelProp }}</span>-->
          <!--&lt;!&ndash;<span>{{ channelPropMap[scope.row.channelProp].text }}</span>&ndash;&gt;-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column min-width="150px" align="center" label="渠道号" prop="channel_no">
      </el-table-column>

      <el-table-column min-width="120px" label="渠道名称" align="center" prop="channel_name">
      </el-table-column>

      <el-table-column
        min-width="120px" align="center"
        label="品牌名称" prop="brand_name"
        :filters="brandNameFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.brand_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120px" align="center"
        label="订货金额" prop="total_channel_amount">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.total_channel_amount }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="30%订金" prop="total_earnest_amount">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.total_earnest_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120px" align="center" label="70%余款" prop="total_surplus_amount">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.total_surplus_amount }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col" label="货单状态"
        min-width="120"
        prop="order_status"
        :filters="orderStatusFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <!--<span>{{ orderStatusMap[scope.row.orderStatus].text }}</span>-->
          <span>{{ scope.row.order_status | orderStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding" min-width="100" fixed="right">
        <template slot-scope="scope">
          <!--<div class="table-btn-wrap">-->
            <!--<el-button size="mini" type="primary" v-if="scope.row.orderStatus===4"-->
                       <!--@click="viewHandleReceive(scope.row)">-->
              <!--处理收货-->
            <!--</el-button>-->
          <!--</div>-->
          <!--<div class="table-btn-wrap">-->
            <!--<el-button type="primary" size="mini" v-if="scope.row.orderStatus===4"-->
                       <!--@click="viewWaitReceiveOrder(scope.row)">查看货单-->
            <!--</el-button>-->
          <!--</div>-->
          <div class="table-btn-wrap">
            <el-button type="primary" size="mini" v-if="scope.row.order_status==10" @click="viewWaitStock(scope.row)">
              查看货单
            </el-button>
          </div>
          <!--<div class="table-btn-wrap">-->
            <!--<el-button type="primary" size="mini" v-if="scope.row.orderStatus===1"-->
                       <!--@click="viewShortageWaiting(scope.row)">查看货单-->
            <!--</el-button>-->
          <!--</div>-->
          <!--<div class="table-btn-wrap">-->
            <!--<el-button type="primary" size="mini" v-if="scope.row.orderStatus===2"-->
                       <!--@click="viewWaitReceiveResidual(scope.row)">查看货单-->
            <!--</el-button>-->
          <!--</div>-->
          <!--<div class="table-btn-wrap">-->
            <!--<el-button type="primary" size="mini" v-if="scope.row.orderStatus===3" @click="viewWaitShipment(scope.row)">-->
              <!--查看货单-->
            <!--</el-button>-->
          <!--</div>-->
          <!--<div class="table-btn-wrap">-->
            <!--<el-button type="primary" size="mini" v-if="scope.row.orderStatus===5" @click="viewAlreadyReceive(scope.row)">-->
              <!--查看货单-->
            <!--</el-button>-->
          <!--</div>-->
          <!--<div class="table-btn-wrap">-->
            <!--<el-button type="primary" size="mini" v-if="scope.row.orderStatus===6" @click="viewStopOrdering(scope.row)">-->
              <!--查看货单-->
            <!--</el-button>-->
          <!--</div>-->
          <!--<div class="table-btn-wrap">-->
            <!--<el-button type="primary" size="mini" v-if="scope.row.orderStatus===7" @click="viewInterruptOrdering(scope.row)">-->
              <!--查看货单-->
            <!--</el-button>-->
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

    <el-dialog :visible.sync="isHandleReceiveShow" fullscreen style="padding: 20px" title="处理收货">
      <handleReceive v-if="isHandleReceiveShow" :currentRow="currentRow"></handleReceive>
    </el-dialog>

    <el-dialog :visible.sync="isWaitReceiveOrderShow" fullscreen style="padding: 20px" title="待收货信息查看">
      <waitReceive v-if="isWaitReceiveOrderShow" :currentRow="currentRow"></waitReceive>
    </el-dialog>

    <el-dialog :visible.sync="isWaitStockShow" fullscreen style="padding: 20px" title="待备货信息查看">
      <waitStock v-if="isWaitStockShow" :currentRow="currentRow"></waitStock>
    </el-dialog>

    <el-dialog :visible.sync="isShortageWaitingShow" fullscreen style="padding: 20px" title="缺货等待信息查看">
      <shortageWaiting v-if="isShortageWaitingShow" :currentRow="currentRow"
                       @close="isShortageWaitingShow=false"></shortageWaiting>
    </el-dialog>

    <el-dialog :visible.sync="isWaitReceiveResidualShow" fullscreen style="padding: 20px" title="待收余款信息查看">
      <waitReceiveResidual v-if="isWaitReceiveResidualShow" :currentRow="currentRow"></waitReceiveResidual>
    </el-dialog>

    <el-dialog :visible.sync="isWaitShipmentShow" fullscreen style="padding: 20px" title="待发货信息查看">
      <waitShipment v-if="isWaitShipmentShow" :currentRow="currentRow"></waitShipment>
    </el-dialog>

    <el-dialog :visible.sync="isAlreadyReceiveShow" fullscreen style="padding: 20px" title="已收货信息查看">
      <alreadyReceive v-if="isAlreadyReceiveShow" :currentRow="currentRow"></alreadyReceive>
    </el-dialog>

    <el-dialog :visible.sync="isStopOrderingShow" fullscreen style="padding: 20px" title="停止订货信息查看">
      <stopOrdering v-if="isStopOrderingShow" :currentRow="currentRow"></stopOrdering>
    </el-dialog>

    <el-dialog :visible.sync="isInterruptOrderingShow" fullscreen style="padding: 20px" title="中断订货信息查看">
      <interruptOrdering v-if="isInterruptOrderingShow" :currentRow="currentRow"></interruptOrdering>
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
  import Mock from 'mockjs'
  import request from "@/utils/request";
  import { orderStatus } from "@/filters/index.js";

  import handleReceive from './handleReceive/index.vue'
  import waitReceive from './waitReceive/index.vue'
  import waitStock from './waitStock/index.vue'
  import shortageWaiting from './shortageWaiting/index.vue'
  import waitReceiveResidual from './waitReceiveResidual/index.vue'
  import waitShipment from './waitShipment/index.vue'
  import alreadyReceive from './alreadyReceive/index.vue'
  import stopOrdering from './stopOrdering/index.vue'
  import interruptOrdering from './interruptOrdering/index.vue'

  export default {
    name: 'bill-management',
    directives: {
      waves
    },
    components: {
      BillDetail,
      handleReceive,
      waitReceive,
      waitStock,
      shortageWaiting,
      waitReceiveResidual,
      waitShipment,
      alreadyReceive,
      stopOrdering,
      interruptOrdering
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
        list: [],
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          searchText: undefined,
          type: undefined,
          sort: '+id'
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
        brandNameFilters: [
          { text: 'LANCOM', value: 'LANCOM' },
          { text: 'AESOP', value: 'AESOP' }
        ],
        channelPropFilters: [
          { text: 'DLQD', value: 0 },
          { text: 'FXQD', value: 1 },
          { text: 'DFQD', value: 2 }
        ],
        channelPropMap: {
          0: { text: 'DLQD', value: 0 },
          1: { text: 'FXQD', value: 1 },
          2: { text: 'DFQD', value: 2 },
        },
        orderStatusFilters: [
          { text: '待备货', value: 0 },
          { text: '缺货等待', value: 1 },
          { text: '待收余款', value: 2 },
          { text: '待发货', value: 3 },
          { text: '待收货', value: 4 },
          { text: '已收货', value: 5 },
          { text: '停止订货', value: 6 },
          { text: '中断订货', value: 7 },
        ],
        orderStatusMap: {
          0: { text: '待备货', value: 0 },
          1: { text: '缺货等待', value: 1 },
          2: { text: '待收余款', value: 2 },
          3: { text: '待发货', value: 3 },
          4: { text: '待收货', value: 4 },
          5: { text: '已收货', value: 5 },
          6: { text: '停止订货', value: 6 },
          7: { text: '中断订货', value: 7 },
        },
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
        request({
          url: '/order/managerOrderList.do',
          method: 'post',
          data: {
            page: 1,
            limit: 10,
            searchText: this.listQuery.searchText
          }
        }).then((res) => {
          if (res.errorCode == 0) {
            this.list = res.data.items
            this.total = res.data.total
          } else {
            this.$message.error('数据请求失败');
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error('数据请求失败');
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
//      handleModifyStatus(row, status) {
//        this.$message({
//          message: '操作成功',
//          type: 'success'
//        })
//        row.status = status
//      },
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
