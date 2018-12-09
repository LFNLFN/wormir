<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item" placeholder="货单号/品牌名称/渠道号/渠道名称/商品编号/商品名称" v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      class="border-left2 border-top2 border-bottom2"
      style="width: 100%">

      <el-table-column align="center" :label="$t('payRefund.orderNo')" min-width="120" prop="orderNo" fixed="left">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.orderNo }}</span>
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

      <el-table-column min-width="120px" align="center" label="商品编号" prop="goodsNo" />

      <el-table-column min-width="120px" align="center" label="商品名称" prop="goodsName" />

      <el-table-column min-width="120px" align="center" label="国内售价" prop="inlandPrice">
        <template slot-scope="scope">
          <span>￥ {{scope.row.inlandPrice.toFixed(2)}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="补款金额" prop="compensationMoney">
        <template slot-scope="scope">
          <span>￥ {{scope.row.compensationMoney.toFixed(2)}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="补款状态"
                       prop="compensationStatus"
                       :filters="compensationStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.compensationStatus | compensationStatusFilters}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="补款类型"
                       prop="compensationStatus">
        <template slot-scope="scope">
          <span>{{scope.row.compensationStatus | compensationTypeFilters}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('payRefund.operation')" min-width="150"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <div class="table-btn-wrap">
            <el-button size="medium" type="primary" @click="viewDetail(scope.row)">
              查看详情
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @current-change="changePageList" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--viweDetail 作废-->
    <el-dialog :visible.sync="isDetailShow" class="image-view" width="50%">
      <div v-if="isDetailShow">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.orderNo')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{detail.orderNo}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">{{$t('retailer.retailerNo')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{detail.retailerNo}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">{{$t('inventory.boxNo')}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">{{detail.boxCode || ' '}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">{{$t('order.description')}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">{{detail.description || ' '}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.applicationReason')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{$t('order.applicationReasonContent')}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="8"><div class="text-muted">{{$t('order.applicationTime') + '  ' + new Date()}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">{{$t('order.photoEvidence')}}</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light" @click="viewImage(detail.img)">{{$t('order.clickToLarge')}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.compensation')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">$1243</div></el-col>
        </el-row>

        <!--等待审核-->
        <template v-if="detail.replenishmentStatus === 0">
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.reviewResult')}}</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">
              <el-radio v-model="reviewResult" :label="0">{{$t('order.compensationApproval')}}</el-radio>
              <el-radio v-model="reviewResult" :label="1">{{$t('order.applicationRejection')}}</el-radio>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="text-center">
              <el-button type="primary" @click="submitApplicationReview">{{$t('table.submit')}}</el-button>
            </el-col>
          </el-row>
        </template>

        <template v-else>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{$t('order.applicationDismissed')}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="16" :offset="8"><div class="text-muted">{{$t('order.reviewTime') + '  ' + new Date()}}</div></el-col>
          </el-row>
        </template>

        <!--驳回申诉-->
        <el-row v-if="detail.replenishmentStatus === 1">
          <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.compensationType')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{$t('order.noCompensation')}}</div></el-col>
        </el-row>

        <!--处理申诉-->
        <template v-if="detail.replenishmentStatus === 2">
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.appealReason')}}</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{detail.appealReason}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="16" :offset="8"><div class="text-muted">{{$t('order.appealTime') + new Date()}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.reviewResult')}}</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">
              <el-radio v-model="reviewResult" :label="0">{{$t('order.compensationApproval')}}</el-radio>
              <el-radio v-model="reviewResult" :label="1">{{$t('order.requestRejection')}}</el-radio>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="text-center">
              <el-button type="primary" @click="submitApplicationReview">{{$t('table.submit')}}</el-button>
            </el-col>
          </el-row>
        </template>

        <!--驳回申请-->
        <template v-if="detail.replenishmentStatus === 3">
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.appealReason')}}</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{detail.appealReason}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="16" :offset="8"><div class="text-muted">{{$t('order.appealTime') + new Date()}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.finalResult')}}</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple">{{$t('order.requestRejected')}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="16" :offset="8"><div class="text-muted">{{$t('order.reviewTime') + new Date()}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.compensationType')}}</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple">{{$t('order.noCompensation')}}</div></el-col>
          </el-row>
        </template>

        <!--协商中-->
        <template v-if="detail.replenishmentStatus === 4">
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.appealReason')}}</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{detail.appealReason}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="16" :offset="8"><div class="text-muted">{{$t('order.appealTime') + new Date()}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="text-center">
              <el-button disabled>{{$t('order.inNegotiation')}}</el-button>
            </el-col>
          </el-row>
        </template>
      </div>

      <!--viewImage-->
      <el-dialog :visible.sync="isViewImageShow" class="image-view" width="75%" append-to-body>
        <img :src="imageViewed" alt="" width="100%">
      </el-dialog>
    </el-dialog>

    <!--查看订单详情-->
    <el-dialog :visible.sync="orderDetailVisible" width="70%">
      <orderDetail v-if="orderDetailVisible"></orderDetail>
    </el-dialog>

  </div>
</template>

<script>
import { issueGoods } from '@/api/goods'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import Mock from 'mockjs'
import orderDetail from './orderDetail/index.vue'

export default {
  name: 'defective-product',
  components: { orderDetail },
  directives: {
    waves
  },
  data() {
    return {
      orderDetailVisible: false,
      replenishmentStatuses: {
        0: { status: this.$t('order.pendingApproval'), operation: this.$t('order.reviewDetail') },
        1: { status: this.$t('order.requestRejected'), operation: this.$t('order.reviewDetail') },
        2: { status: this.$t('order.pending'), operation: this.$t('order.processRequest') },
        3: { status: this.$t('order.applicationDismissed'), operation: this.$t('order.reviewDetail') },
        4: { status: this.$t('order.negotiating'), operation: this.$t('order.reviewDetail') }
      },
      statusFilter: [
        { text: this.$t('order.pendingApproval'), value: '0' },
        { text: this.$t('order.requestRejected'), value: '1' },
        { text: this.$t('order.pending'), value: '2' },
        { text: this.$t('order.applicationDismissed'), value: '3' },
        { text: this.$t('order.negotiating'), value: '4' }
      ],
      compensationTypeFilter: [{ text: '--', value: '0' }, { text: 'No Compensation', value: '1' }],
      list: [
        {
          orderNo: Mock.Random.natural(20180522001, 20180522100),
          dealWay: Mock.Random.natural(0, 1),
          brandName: Mock.Random.pick(['LANCOM', 'AESOP']),
          retailerCategories: Mock.Random.natural(0, 2),
          retailerNo: Mock.Random.natural(2018001, 2018100),
          retailerName: 'QWE总店',
          compensationType: Mock.Random.natural(0, 3),
          compensationStatus: Mock.Random.natural(0, 4),
          compensationMoney: Mock.Random.natural(10, 40),
          goodsNo: Mock.Random.natural(10000, 30000),
          goodsName: '补水面膜',
          inlandPrice: Mock.Random.natural(100, 200),
        }
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
      compensationStatusFilters: [
        { text: '待协商', value: 0 },
        { text: '待审核', value: 1 },
        { text: '驳回申请', value: 2 },
        { text: '申诉中', value: 3 },
        { text: '驳回申诉', value: 4 },
      ],
      compensationTypeFilters: [
        { text: '申请后补款', value: 0 },
        { text: '申诉后补款', value: 1 },
        { text: '破损转补款', value: 2 },
        { text: '--', value: 3 },
      ],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        keyword: undefined,
        orderNo: undefined,
        rows: 20,
        issueType: 10
      },
      statusOptions: ['published', 'draft', 'deleted'],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      isDetailShow: false,
      detail: {},
      reviewResult: undefined,
      imageViewed: '',
      isViewImageShow: false
    }
  },
  created() {
//    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
      issueGoods(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.totalRecords
        this.listLoading = false
      })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 操作详情
    async reviewDetail(row) {
      this.isDetailShow = true
    },

    async submitApplicationReview() {
      this.$message('提交审核结果')
      this.isDetailShow = false
    },

    viewImage(src) {
      this.imageViewed = src
      this.isViewImageShow = true
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    changePageList(val) {
      this.listQuery.page = val
      this.getList()
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
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
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },

    viewDetail(row) {
      this.orderDetailVisible = true
    },

    statusFilterHandler(value, row, column) {},
    compensationTypeFilterHandler(value, row, column) {}
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
    compensationStatusFilters(status) {
      const statusMap = {
        0: '待协商',
        1: '待审核',
        2: '驳回申请',
        3: '申诉中',
        4: '驳回申诉',
      }
      return statusMap[status]
    },
    compensationTypeFilters(status) {
      const statusMap = {
        0: '--',
        1: '--',
        2: '不支持补款',
        3: '--',
        4: '不支持补款',
      }
      return statusMap[status]
    },
  },
}
</script>

<style scoped>
  .text-muted {
    color: #999;
  }
</style>
