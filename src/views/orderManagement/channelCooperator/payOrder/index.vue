<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="并单支付号/货单号/品牌名称" v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table
      :key='tableKey' :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      class="border2"
      style="width: 100%;border-right-width: 1px">

      <el-table-column align="center" label="并单支付号/货单号" min-width="120" fixed="left" prop="mergeOrderNo"/>

      <el-table-column
        min-width="120px" align="center"
        :label="$t('payOrder.brandName')"
        :filters="brandNameFilters"
        :filter-method="filterHandler"
        prop="brandName" />

      <el-table-column min-width="150px" align="center" label="收款SWIFIT Code" prop="swifitCode" />

      <el-table-column min-width="160px" align="center" label="收款银行" prop="bankName" />

      <el-table-column min-width="180px" align="center" label="银行地址" prop="bankAddress" />

      <el-table-column min-width="100px" align="center" label="货款金额" prop="paymentAmount"/>

      <el-table-column min-width="100px" align="center" label="付款状态" prop="paymentStatus"
                       :filters="paymentStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.paymentStatus | paymentStatusFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('payOrder.operation')" min-width="120"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.paymentStatus==1" size="medium" type="primary" @click="viewMergeOrder(scope.row)">
            去付货款
          </el-button>
          <el-button v-else size="medium" type="primary" @click="viewMergeOrder(scope.row)">
            查看并单
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--取消并单-->
    <el-dialog :visible.sync="isDialogDetailShow">
      <bill-detail-merge-orders v-if="isDialogDetailShow"></bill-detail-merge-orders>
      <div class="text-center dialog-footer">
        <el-button type="primary" @click="cancelOrder">{{$t('payOrder.cancelMergeOrder')}}</el-button>
      </div>
    </el-dialog>

    <!-- 提交并单详情 -->
    <el-dialog :visible.sync="mergeOrderDetailVisible" fullscreen style="padding: 20px">
      <mergeOrderDetail v-if="mergeOrderDetailVisible" @cancel="mergeOrderDetailVisible = false"
                        :orders="orders"
                        :currentMergeOrder="currentOrder"
                        :mergeTitle="mergeTitle" />
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
  import BillDetailMergeOrders from '../../BillDetailMergeOrders'
  import { cancelMergeOrder } from '../../../../api/bill'
  import Mock from 'mockjs'
  import mergeOrderDetail from './mergeOrderDetail/index.vue'
  import { paymentStatusFilters } from '@/tableFilters/index.js'

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
    components: { BillDetailMergeOrders, mergeOrderDetail },
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        mergeOrderDetailVisible: false,
        list: [],
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          searchText: '',
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
        currentOrder: {},
        brandNameFilters: [],
        paymentStatusFilters: paymentStatusFilters,
        orders: null,
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
    },
    created() {
      this.getList()
    },
    methods: {
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      // 查看并单
      viewDetail(row) {
        this.currentOrder = row
        this.isDialogDetailShow = true
      },

      // 取消并单
      async cancelOrder() {
        console.log('cancel order')
        await cancelMergeOrder(this.currentOrder)
        this.$message({
          message: this.$t('payOrder.hadCancelMergeOrderTips'),
          type: 'success'
        })
      },

      getList() {
        this.listLoading = true
        this.$request({
          url: '/order/paymentOrderList.do',
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
      },
      viewMergeOrder(row) {
        this.listLoading = true
        this.currentOrder = row
        this.$request({
          url: '/order/mergeOrderDetail.do',
          method: 'post',
          data: { orderNos: row.orderNos }
        }).then((res) => {
          if (res.errorCode == 0) {
            this.orders = res.data.items
            this.mergeOrderDetailVisible = true
            this.listLoading = false
          } else {
            this.$message.error('数据请求失败');
            this.listLoading = false
          }
        }).catch((err) => {
          this.$message.error('数据请求失败');
          this.listLoading = false
        })
      }
    },
    computed: {
      mergeTitle() {
        let tmp = this.orders.some((e,i,s) => {
          if (i==0) { return false }
          return e.order_status != s[i-1].order_status
        })
        if (tmp) {
          if (this.currentOrder.paymentStatus==1) { return '待付并单货款' }
          else if (this.currentOrder.paymentStatus==2) { return '并单货款待确认到账' }
          else if (this.currentOrder.paymentStatus==3) { return '并单货款已确认到账' }
        }
        else {
          if (this.orders[0].order_status==30) {
            if (this.currentOrder.paymentStatus==1) { return '待付并单订金' }
            else if (this.currentOrder.paymentStatus==2) { return '并单订金待确认到账' }
            else if (this.currentOrder.paymentStatus==3) { return '并单订金已确认到账' }
          }
          else if (this.orders[0].order_status==40) {
            if (this.currentOrder.paymentStatus==1) { return '待付并单余款' }
            else if (this.currentOrder.paymentStatus==2) { return '并单余款待确认到账' }
            else if (this.currentOrder.paymentStatus==3) { return '并单余款已确认到账' }
          }
        }
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
