<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="货单号/品牌名称/渠道号/渠道名称" v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table :key='tableKey' :data="list" ref="sumTable"
              v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row
              @selection-change="handleSelectionChange"
              :span-method="arraySpanMethod"
              class="table_border2"
              style="width: 100%;border-right-width: 1px;">
      <el-table-column type="selection" align="center" width="100"></el-table-column>

      <el-table-column align="center" :label="$t('mergeRefundOrders.orderNo')" min-width="130" prop="orderNo"
                       fixed="left">
        <template slot-scope="scope">
          <span class="link-type" @click="viewOrderDetail(scope.row)">{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120px" align="center"
        label="品牌名称" prop="brandName"
        :filters="brandNameFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.brand_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120px" align="center"
        label="渠道属性"
        :filters="channelPropFilters"
        :filter-method="filterHandler"
        prop="channelProp">
        <template slot-scope="scope">
          <span>{{ scope.row.channel_prop | channelPropFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" align="center" label="渠道号" prop="channel_no"/>

      <el-table-column min-width="120px" label="渠道名称" align="center" prop="channel_name"/>

      <el-table-column
        min-width="100px" align="center"
        :label="$t('mergeRefundOrders.transportation')"
        :filters="transportationFilters"
        :filter-method="filterHandler" prop="transportation">
        <template slot-scope="scope">
          <span>{{ scope.row.transportation | transportationFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100" label="采购单价" align="center" prop="">
        <template slot-scope="scope">待完成功能</template>
      </el-table-column>

      <el-table-column
        min-width="100px" align="center"
        label="货款类型"
        :filters="paymentTypeFilters"
        :filter-method="filterHandler" prop="order_status">
        <template slot-scope="scope">
          <span>{{ scope.row.order_status | paymentTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="已收货款"
                       prop="receivedPayAmount" fixed="right">
        <template slot-scope="scope">
          <span v-if="scope.$index===list.length-1">{{'合计：'}}</span>
          <span v-else>{{ scope.row.receivedPayAmount }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" :label="$t('mergeRefundOrders.paymentToPay')" min-width="100"
                       prop="paymentToPay" fixed="right">
        <template slot-scope="scope">
          <span v-if="scope.$index===list.length-1">{{ selectedOrderAmount }}</span>
          <span v-else>{{ scope.row.waitPayAmount }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('mergeRefundOrders.operation')" min-width="120"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <div v-if="scope.$index===list.length-1">
            <el-button type="primary" @click="submitMergeOrder" size="medium" :disabled="ordersSelected.length<1">
              {{$t('mergeRefundOrders.submitMergeOrder')}}
            </el-button>
          </div>
          <el-button v-else="'待付订金状态时'" size="medium" type="primary"
                     @click="changeTransportation(scope.row,'published')">
            {{$t('mergeRefundOrders.transportChange')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <p class="warn-notice" style="text-align: right">
      温馨提醒：可勾选单张或多张相同品牌订货的货单进行并单支付。
    </p>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

    </div>

    <!--货单详情-->
    <el-dialog :visible.sync="dialogFormVisible">
      <bill-detail :bill="currentOrder"></bill-detail>
    </el-dialog>

    <!--并单确认-->
    <el-dialog :visible.sync="isDialogMergeOrderConfirmShow">
      <bill-detail-merge-orders :bill="mergeOrderBill" v-if="isDialogMergeOrderConfirmShow"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDialogMergeOrderConfirmShow = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="confirmMerge">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <!-- 调整运输 -->
    <el-dialog :visible.sync="isDialogTransportationChangeShow" title="调整运输" width="70%">
      <transportation-change :order="currentOrder" v-if="isDialogTransportationChangeShow"
                             @cancel="isDialogTransportationChangeShow = false"
                             @change="handleChangeTransportationSuccess"/>
    </el-dialog>

    <!-- 待付30%订金详情 -->
    <el-dialog :visible.sync="waitPayDepositVisible" fullscreen style="padding: 20px">
      <waitPayDeposit :currentRow="currentRow" v-if="waitPayDepositVisible"
                      @cancel="waitPayDepositVisible = false"/>
    </el-dialog>

    <!-- 待付70%详情 -->
    <el-dialog :visible.sync="waitPayResidualVisible" fullscreen style="padding: 20px">
      <waitPayResidual :currentRow="currentRow" v-if="waitPayResidualVisible"
                       @cancel="waitPayResidualVisible = false"/>
    </el-dialog>

    <!-- 提交并单详情 -->
    <el-dialog :visible.sync="mergeOrderDetailVisible" fullscreen style="padding: 20px">
      <mergeOrderDetail v-if="mergeOrderDetailVisible"  :orders="ordersSelected" :mergeTitle="mergeTitle"
                        @cancel="mergeOrderDetailVisible = false;getList()"/>
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
  import * as tableFilters from '@/tableFilters'
  import { parseTime } from '@/utils'
  import BillDetail from '../../BillDetail'
  import TransportationChange from '../../TransportationChange'
  import BillDetailMergeOrders from '../../BillDetailMergeOrders'
  import { mergeOrder } from '../../../../api/bill'
  import Mock from 'mockjs'
  import waitPayDeposit from './waitPayDeposit/index.vue'
  import waitPayResidual from './waitPayResidual/index.vue'
  import mergeOrderDetail from './mergeOrderDetail/index.vue'

  export default {
    name: 'merge-refund-orders',
    components: {
      BillDetail, TransportationChange, BillDetailMergeOrders,
      waitPayDeposit, waitPayResidual, mergeOrderDetail
    },
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: [],
        total: null,
        waitPayDepositVisible: false,
        waitPayResidualVisible: false,
        mergeOrderDetailVisible: false,
        currentRow: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          searchText: undefined,
          importance: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
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
        dialogFormVisible: false,
        dialogStatus: '',
        isDialogTransportationChangeShow: false,
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

        ordersSelected: [], // 选中的货单
        isDialogMergeOrderConfirmShow: false, // 并单确认框控制
        currentOrder: {},
        mergeOrderBill: {}, // 并单
        brandNameFilters: [],
        channelPropFilters: tableFilters.channelPropFilters,
        transportationFilters: tableFilters.transportationFilters,
        paymentTypeFilters: tableFilters.paymentTypeFilters
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.$request({
          url: '/order/waitMergeOrderList.do',
          method: 'post',
          data: this.listQuery
        }).then((res) => {
          if (res.errorCode == 0) {
            this.list = res.data.items
            this.total = res.data.total
            this.brandNameFilters = res.data.brandNameFilters
            this.list.push(
              {
                orderNo: Mock.Random.natural(123456, 999999),
                channelProp: Mock.Random.natural(0, 2),
                channelNo: Mock.Random.natural(20180522001, 20180522100),
                channelName: 'ASD总店',
                brandName: 'LANCOM',
                transportation: Mock.Random.natural(0, 1),
                paymentReceive: Mock.Random.natural(1000, 2000),
                purchasePrice: Mock.Random.natural(23, 99),
                paymentToPay: Mock.Random.natural(500, 999),
              },
            )
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
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
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
      createData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
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
        // this.temp = Object.assign({}, row) // copy obj
        // this.temp.timestamp = new Date(this.temp.timestamp)
        this.currentOrder = row
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
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
              this.dialogFormVisible = false
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
          this.isDialogTransportationChangeShow = true
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

      // 选择处理
      handleSelectionChange(value) {
        this.ordersSelected = value
      },

      // 检查并单是否有多品牌
      checkMergeOrder() {
        if (this.ordersSelected.length == 0) return false

        const firstBrandName = this.ordersSelected[0].brandName

        return this.ordersSelected.some(({ brandName }, index, arr) => {
          if (index == arr.length-1) { return false }
          return brandName != firstBrandName
        })
      },

      // 提交并单
      submitMergeOrder() {
        // 检查并单是否有多个品牌
        if (this.checkMergeOrder()) {
          const vm = this
          this.$alert('对相同品牌订货的货单才可进行并单，请核实调整选择项。', '', {
            confirmButtonText: '确定',
            showClose: false,
            center: true,
            callback() {
              vm.$emit('close')
            }
          })
          return
        }

        // 打开并单确认框
        this.mergeOrderDetailVisible = true
      },
      // 确认并单
      async confirmMerge() {
        await mergeOrder(this.ordersSelected)
        this.$message({
          message: this.$t('mergeRefundOrders.mergeSuccessTips'),
          type: 'success'
        })
      },

      // 调整运输
      changeTransportation(row) {
        this.currentOrder = row
        this.isDialogTransportationChangeShow = true
      },

      handleChangeTransportationSuccess() {
        this.isDialogTransportationChangeShow = false
        this.getList()
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.list.length - 1) {
          if (columnIndex === 8) {
            return {
              rowspan: 1,
              colspan: 9
            }
          }
          else if (columnIndex <= 7) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
      },

      viewOrderDetail(row) {
        this.currentRow = row
        if (row.order_status == 30) {
          this.waitPayDepositVisible = true
        }
        if (row.order_status == 40) {
          this.waitPayResidualVisible = true
        }
      },
    },
    computed: {
      selectedOrderAmount() {
        if (this.ordersSelected.length < 1) { return '--' }
        let symbol = this.ordersSelected[0].waitPayAmount.substring(0,1)
        let selectedOrderAmount = 0
        this.ordersSelected.forEach((item, index, arr) => {
          selectedOrderAmount += item.waitPayAmount.substring(1)/1
        })
        return symbol + selectedOrderAmount.toFixed(2)
      },
      mergeTitle() {
        let tmp = this.ordersSelected.some((e,i,s) => {
          if (i==0) { return false }
          return e.order_status != s[i-1].order_status
        })
        if (tmp) { return '提交并单支付货款' }
        else {
          if (this.ordersSelected[0].order_status==30) { return '提交并单支付订金' }
          else if (this.ordersSelected[0].order_status==40) { return '提交并单支付余款' }
        }
      }
    },
  }
</script>
<style scoped>
  .el-dialog {
    width: 90%;
  }
</style>
