<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item" placeholder="货单号/品牌名称/渠道号/渠道名称/商品编号/商品名称" v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table key='0' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
      highlight-current-row size="mini" stripe style="width: 100%">
      <el-table-column align="center" :label="$t('order.orderNo')" prop="orderNo" fixed="left" />
      <el-table-column align="center" label="品牌名称" prop="orderNo" fixed="left" />
      <el-table-column align="center" :label="$t('retailer.retailerCategories')" prop="retailerCategories" />
      <el-table-column align="center" :label="$t('retailer.retailerNo')" prop="retailerNo" />
      <el-table-column align="center" label="渠道名称" prop="boxNo" />
      <el-table-column align="center" label="商品编号" prop="size" />
      <el-table-column align="center" label="商品编码" prop="size" />
      <el-table-column align="center" :label="$t('product.productName')" prop="productName" />
      <el-table-column align="center" label="内地售价" prop="compensation"  />
      <el-table-column align="center" label="补款金额" prop="compensation"  />
      <el-table-column align="center" :label="$t('order.replenishmentStatus')" :filters="statusFilter" :filter-method="statusFilterHandler">
        <template slot-scope="scope">{{replenishmentStatuses[scope.row.replenishmentStatus || 0].status}}</template>
      </el-table-column>
      <el-table-column align="center" :label="$t('order.compensationType')" prop="compensationType" :filters="compensationTypeFilter" :filter-method="compensationTypeFilterHandler"/>
      <el-table-column align="center" :label="$t('order.operation')"  class-name="small-padding" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="reviewDetail(scope.row)" >
            {{replenishmentStatuses[scope.row.replenishmentStatus || 0].operation}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @current-change="changePageList" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--viweDetail-->
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
  </div>
</template>

<script>
import { issueGoods } from '@/api/goods'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'defective-product',
  directives: {
    waves
  },
  data() {
    return {
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
      list: null,
      total: null,
      listLoading: true,
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
    this.getList()
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

    statusFilterHandler(value, row, column) {},
    compensationTypeFilterHandler(value, row, column) {}
  }
}
</script>
<style scoped>
  .text-muted {
    color: #999;
  }
  .el-table .cell {
    word-break: break-word;
  }
</style>
