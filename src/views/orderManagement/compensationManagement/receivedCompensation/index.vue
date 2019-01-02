<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item" placeholder="并单支付号/货单号/品牌名称" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table
      :key='tableKey' :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      class="border-left2 border-top2"
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

      <el-table-column min-width="100px" align="center" label="补款金额" prop="compensationAmount">
        <template slot-scope="scope">
          <span>€ {{scope.row.compensationAmountAmount.toFixed(2)}}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col" align="center" label="补款状态" min-width="120" prop="compensationStatus"
        :filters="compensationStatusFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.compensationStatus | compensationStatusFilter }}</span>
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

    <!--放大看图片-->
    <el-dialog :visible.sync="isViewImageShow" width="75%">
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>

    <el-dialog :visible.sync="isDialogDetailShow" width="70%">
      <div v-if="isDialogDetailShow" class="dialog-wrap border-top2 border-left2 border-bottom border-right" style="">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">Merge Payment No.</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{123456343}}</div>
          </el-col>
        </el-row>

        <el-row style="border-right: 1px #d5d5d5 solid;">
          <orderItemDetail @image-view="viewImage($event)"/>
        </el-row>

        <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>

        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('Total Pending Compensation：')}}</div>
            <!--<div class="grid-content bg-purple">{{$t('Total Paid Compensation：')}}</div>-->
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">€ {{ '1754.00' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="8" class="border-right"
                  style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start">
            {{ $t('The Time of Merge Compensation Orders') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-col>
        </el-row>
        <!--<el-row>-->
          <!--<el-col :span="16" :offset="8"-->
                  <!--style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start">-->
            <!--{{ $t('The Time of Compensation Payment') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}-->
          <!--</el-col>-->
        <!--</el-row>-->
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('Beneficiary Bank SWIFT Code')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ 44573345645 }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('Beneficiary Bank Name')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ 'Bank Of China' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('Beneficiary Bank Address')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ 'Guangzhou Haizhu' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('Remitting Bank SWIFT Code')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ 4477865767 }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('Remitting Bank Name')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ 'Bank Of China' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('Remitting Bank Address')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ 'Guangzhou Panyu' }}</div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>


    <el-dialog :visible.sync="dialogTransportChangeVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
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
import compensationForm from '../compensationForm.vue'
import { splitOrderMerged } from '@/api/bill'
import Mock from 'mockjs'
import orderItemDetail from './orderItemDetail.vue'

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
  components: { compensationForm, orderItemDetail },
  directives: {
    waves
  },
  data() {
    return {
      isMergeOrderShow: false,
      tableKey: 0,
      list: [
//        {
//          mergePayNo: Mock.Random.natural(1234567, 9999999),
//          brandName: Mock.Random.pick(['LANCOM', 'AESOP']),
//          remittanceSwifitCode: Mock.Random.natural(1234567, 9999999),
//          remittanceBankName: Mock.Random.pick(['中国农业银行', '中国工商银行']),
//          remittanceBankAddress: Mock.Random.pick(['广州市天河区', '上海市浦东区']),
//          compensationAmountAmount: Mock.Random.natural(1000, 2000),
//          compensationStatus: Mock.Random.natural(0, 1),
//        }
      ],
      brandNameFilters: [
        { text: 'LANCOM', value: 'LANCOM' },
        { text: 'AESOP', value: 'AESOP' }
      ],
      compensationStatusFilters: [
        { text: '待收补款', value: 0 },
        { text: '已收补款', value: 1 },
      ],
      isViewImageShow: false,
      imageViewed: null,
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
    compensationStatusFilter(status) {
      const statusMap = {
        0: '待收补款',
        1: '已收补款',
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
      }).then(async() => {
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
    viewImage(src) {
      this.imageViewed = src
      this.isViewImageShow = true
    },
  }
}
</script>
<style scoped>

  .col-head {
    background: rgb(223, 242, 252);
    color: rgb(66, 66, 66);
    font-weight: 700;
    font-size: 12px;
    line-height: 36px;
    text-align: center;
    width: 100px;
  }

  .col-content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: rgb(66, 66, 66);
    width: 100px;
  }

  .orderTable .el-col {
    border-right: none;
  }

  .el-row {
    border-bottom: 1px solid #D5D5D5;
  }

  .el-col {
    border-radius: 0;
  }

  .el-col:nth-child(odd) {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-col:nth-child(odd):not(:last-of-type) {
    border-right: 1px solid #d5d5d5;
  }

  .el-col:nth-child(even) {
    color: #424242;
    font-size: 12px;
    display: flex;
    align-items: center;
  }

  .el-col:nth-child(even) {
    border-right: 1px solid #d5d5d5;
  }

  .grid-content {
    border: none;
  }
  .el-col:nth-child(even) div {
    padding-left: 1em;
  }
</style>
