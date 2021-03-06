<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="并单支付号/货单号/品牌名称" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table
      :key='tableKey' :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      class="table_border2"
      style="width: 100%">

      <el-table-column align="center" :label="$t('receivedRefund.mergePayNo')" min-width="100" prop="mergePayNo"/>

      <el-table-column
        min-width="120px" align="center"
        :label="$t('payOrder.brandName')"
        :filters="brandNameFilters"
        :filter-method="filterHandler"
        prop="brandName"/>

      <el-table-column min-width="120px" align="center" label="汇款 SWIFT Code" prop="remittanceSwifitCode"/>

      <el-table-column min-width="120px" align="center" label="汇款银行" prop="remittanceBankName"/>

      <el-table-column min-width="120px" align="center" label="汇款银行地址" prop="remittanceBankAddress"/>

      <el-table-column min-width="100px" align="center" :label="$t('receivedRefund.money')" prop="refundAmount">
        <template slot-scope="scope">
          <span>€ {{scope.row.refundAmount.toFixed(2)}}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col" align="center" :label="$t('receivedRefund.status')" min-width="120" prop="refundStatus"
        :filters="refundStatusFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.refundStatus | refundStatusFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('receivedRefund.operation')" min-width="120px"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <div class="table-btn-wrap">
            <el-button size="medium" type="primary" @click="viewDetail(scope.row)">
              {{$t('receivedRefund.viewDetail')}}
            </el-button>
          </div>
          <div class="table-btn-wrap">
            <el-button v-if="scope.row.refundStatus===1" size="medium" type="warning" @click="splitOrder(scope.row)">
              {{$t('receivedRefund.confirmOrderSplit')}}
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

    <el-dialog :visible.sync="isDialogDetailShow">
      <bill-detail-merge-orders :bill="currentOrder" v-if="isDialogDetailShow"></bill-detail-merge-orders>
    </el-dialog>

    <!-- 全款退款 -->
    <el-dialog :visible.sync="mergeOrderRefundVisible" title="货单详情" fullscreen style="padding: 20px">
      <mergeOrderDetail v-if="mergeOrderRefundVisible"></mergeOrderDetail>
    </el-dialog>
  </div>
</template>

<script>
  import {
    fetchList,
    createArticle,
    updateArticle
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import BillDetailMergeOrders from '../../BillDetailMergeOrders'
  import { splitOrderMerged } from '../../../../api/bill'
  import Mock from 'mockjs'
  import depositRefund from './depositRefund/index.vue'
  import residualRefund from './residualRefund/index.vue'
  import mergeOrderDetail from './mergeOrderDetail/index.vue'

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
    components: { BillDetailMergeOrders, depositRefund, residualRefund, mergeOrderDetail },
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        depositRefundVisible: false,
        residualRefundVisible: false,
        mergeOrderRefundVisible: false,
        list: [
          {
            mergePayNo: Mock.Random.natural(1234567, 9999999),
            brandName: Mock.Random.pick(['LANCOM', 'AESOP']),
            remittanceSwifitCode: Mock.Random.natural(1234567, 9999999),
            remittanceBankName: Mock.Random.pick(['中国农业银行', '中国工商银行']),
            remittanceBankAddress: Mock.Random.pick(['广州市天河区', '上海市浦东区']),
            refundAmount: Mock.Random.natural(1000, 2000),
            refundStatus: Mock.Random.natural(0, 1),
          }
        ],
        brandNameFilters: [
          { text: 'LANCOM', value: 'LANCOM' },
          { text: 'AESOP', value: 'AESOP' }
        ],
        refundStatusFilters: [
          { text: '待收退款', value: 0 },
          { text: '已收退款', value: 1 },
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
      refundStatusFilter(status) {
        const statusMap = {
          0: '待收退款',
          1: '已收退款',
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
        // this.depositRefundVisible = true
        // this.residualRefundVisible = true
        this.mergeOrderRefundVisible = true
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      // 拆单
      splitOrder(row) {
        this.$confirm('是否确定拆单?', '提示', {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: this.$t('table.cancel'),
          type: 'warning'
        }).then(async () => {
          await splitOrderMerged(row)
          this.$message({
            type: 'success',
            message: '拆单成功'
          })
        })
      },

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
