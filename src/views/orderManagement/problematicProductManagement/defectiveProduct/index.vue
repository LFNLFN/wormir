<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item" placeholder="货单号/品牌名称/渠道号/渠道名称/商品编号/商品名称" v-model="listQuery.searchText">
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
          <span class="link-type" @click="viewOrderNoDetail(scope.row)">{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>


      <el-table-column
        min-width="120px" align="center"
        :label="$t('payRefund.brandName')"
        :filters="brandNameFilters"
        :filter-method="filterHandler"
        prop="brandNameZh">
        <template slot-scope="scope">
          <span>{{scope.row.brandNameZh}}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120px"
        :label="$t('payRefund.retailerCategories')"
        align="center"
        :filters="channelPropFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.channelProp | channelPropFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" :label="$t('payRefund.retailerNo')" prop="channelNo" />

      <el-table-column min-width="120px" align="center" :label="$t('payRefund.retailerName')" prop="channelName"/>

      <el-table-column min-width="120px" align="center" label="商品编号" prop="code" />

      <el-table-column min-width="120px" align="center" label="商品名称" prop="goodName" />
      <el-table-column min-width="120px" align="center" label="商品规格" prop="sizeZh" />
      <el-table-column min-width="130px" align="center" label="商品码" prop="goodNo" />

      <el-table-column min-width="120px" align="center" label="补款金额" prop="compensationMoney" />

      <el-table-column min-width="120px" align="center" label="补款状态"
                       prop="compensationStatus"
                       :filters="compensationStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.compensationStatus | compensationStatusFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="补款类型"
                       prop="compensationType"
                       :filters="compensationTypeFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.compensationType | compensationTypeFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('payRefund.operation')" min-width="150"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <!--申请补款 0-1-->
          <el-button type="primary" size="mini" v-if="scope.row.compensationStatus==0 && scope.row.compensationType==1"
                     @click="viewApplyForCompensation(scope.row)">
            查看详情
          </el-button>

          <!--待审核 1-1-->
          <el-button type="primary" size="mini" v-if="scope.row.compensationStatus==1 && scope.row.compensationType==1"
                     @click="viewWaitForReview(scope.row)">
            查看详情
          </el-button>


          <!-- compensationStatus===2 待补款 -->
          <el-button type="primary" size="mini"
                     v-if="scope.row.compensationStatus==2"
                     @click="viewWaitForCompensation(scope.row)">
            查看详情
          </el-button>



          <!-- compensationStatus===3 已补款状态 -->
          <el-button type="primary" size="mini" v-if="scope.row.compensationStatus==3"
                     @click="viewAlreadyCompensation(scope.row)">
            查看详情
          </el-button>

          <!--驳回状态-->
          <el-button type="primary" size="mini"
                     v-if="scope.row.compensationStatus==4 || scope.row.compensationStatus==7"
                     @click="viewRejectApplication(scope.row)">{{ scope.row.compensationType==1? '查看驳回' : '查看详情' }}
          </el-button>

          <!--申诉中-->
          <el-button type="primary" size="mini" v-if="scope.row.compensationStatus==5 && scope.row.compensationType==1"
                     @click="viewAppealProcessing(scope.row)">查看详情
          </el-button>

          <!--协商中-->
          <el-button type="primary" size="mini" v-if="scope.row.compensationStatus==6"
                     @click="viewNegotiateProcessing(scope.row)">查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @current-change="changePageList" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--申请补款-->
    <el-dialog :visible.sync="isApplyForCompensationShow" :width="dialogWidth">
      <applyForCompensation :currentRow="currentRow" v-if="isApplyForCompensationShow"
                            @closeApplicationDialog="isApplyForCompensationShow=false; getList()">
      </applyForCompensation>
    </el-dialog>

    <!--等待审核-->
    <el-dialog :visible.sync="isWaitForReviewShow" :width="dialogWidth">
      <waitForReview :currentRow="currentRow" v-if="isWaitForReviewShow">
      </waitForReview>
    </el-dialog>

    <!--待补款状态-->
    <el-dialog :visible.sync="isWaitForCompensationShow" :width="dialogWidth">
      <waitForCompensation :currentRow="currentRow" v-if="isWaitForCompensationShow">
      </waitForCompensation>
    </el-dialog>




    <!--已补款-->
    <el-dialog :visible.sync="isAlreadyCompensationShow" :width="dialogWidth">
      <alreadyCompensation :currentRow="currentRow" v-if="isAlreadyCompensationShow">
      </alreadyCompensation>
    </el-dialog>

    <!--驳回-->
    <el-dialog :visible.sync="isRejectApplicationShow" :width="dialogWidth">
      <rejectApplication :currentRow="currentRow" v-if="isRejectApplicationShow" @closeCheckRejection="isRejectApplicationShow=false; getList()">
      </rejectApplication>
    </el-dialog>

    <!--申诉中-->
    <el-dialog :visible.sync="isAppealProcessingShow" :width="dialogWidth">
      <appealProcessing :currentRow="currentRow" v-if="isAppealProcessingShow">
      </appealProcessing>
    </el-dialog>

    <!--协商中-->
    <el-dialog :visible.sync="isNegotiateProcessingShow" :width="dialogWidth">
      <negotiateProcessing :currentRow="currentRow" v-if="isNegotiateProcessingShow">
      </negotiateProcessing>
    </el-dialog>

    <!--货单号详情-->
    <!--<el-dialog :visible.sync="orderNoDetailVisible" fullscreen style="padding: 20px">-->
      <!--<alreadyReceive v-if="orderNoDetailVisible"></alreadyReceive>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import alreadyReceive from './alreadyReceive/index.vue'
import * as tableFilters from '@/tableFilters/index.js'

import applyForCompensation from './applyForCompensation/index.vue'
import waitForReview from './waitForReview/index.vue'

// 待补款
import waitForCompensation from './waitForCompensation/index.vue'
// 已补款
import alreadyCompensation from './alreadyCompensation/index.vue'
// 驳回
import rejectApplication from './rejectApplication/index.vue'
// 申诉中
import appealProcessing from './appealProcessing.vue'
// 协商中
import negotiateProcessing from './negotiateProcessing.vue'

export default {
  name: 'defective-product',
  components: {
    applyForCompensation,
    waitForReview,
    waitForCompensation,

    alreadyCompensation,
    rejectApplication,
    appealProcessing,
    negotiateProcessing,
    alreadyReceive,
  },
  directives: {
    waves
  },
  data() {
    return {
      isApplyForCompensationShow: false,
      isWaitForReviewShow: false,
      isWaitForCompensationShow: false,

      isAlreadyCompensationShow: false,
      isRejectApplicationShow: false,
      isAppealProcessingShow: false,
      isNegotiateProcessingShow: false,

      orderDetailVisible: false,

      list: [],
      brandNameFilters: [],
      channelPropFilters: tableFilters.channelPropFilters,
      compensationStatusFilters: tableFilters.compensationStatusFilters,
      compensationTypeFilters: tableFilters.compensationTypeFilters,
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        searchText: undefined,
        limit: 20,
        issueType: 10,
        propertyOfSale: 1,
      },
      downloadLoading: false,
      isDetailShow: false,
      detail: {},
      reviewResult: undefined,
      imageViewed: '',
      isViewImageShow: false,
      currentRow: {},
      dialogWidth: '70%'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.$request({
        url: '/issue/defectiveProductListManager.do',
        method: 'post',
        data: this.listQuery
      }).then((res) => {
        if (res.errorCode == 0) {
          this.list = res.data.items
          this.total = res.data.total
          this.brandNameFilters = res.data.brandNameFilters
          this.listLoading = false
        } else {
          this.$message.error('Request failed');
          this.listLoading = false
        }
      }).catch((err) => {
        this.$message.error('Request failed');
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

    // 按钮弹层
    viewDetail(row) {
      this.orderDetailVisible = true
    },

    viewApplyForCompensation(row) {
      this.isApplyForCompensationShow = true
      this.currentRow = row
    },

    viewWaitForReview(row) {
      this.isWaitForReviewShow = true
      this.currentRow = row
    },
    viewWaitForCompensation(row) {
      this.isWaitForCompensationShow = true
      this.currentRow = row
    },

    // 已补款阶段
    viewAlreadyCompensation(row) {
      this.isAlreadyCompensationShow = true
      this.currentRow = row
    },

    // 驳回阶段
    viewRejectApplication(row) {
      this.isRejectApplicationShow = true
      this.currentRow = row
    },
    // 申诉中
    viewAppealProcessing(row) {
      this.isAppealProcessingShow = true
      this.currentRow = row
    },
    // 协商中
    viewNegotiateProcessing(row) {
      this.isNegotiateProcessingShow = true
      this.currentRow = row
    },
  },
}
</script>

<style scoped>
  .text-muted {
    color: #999;
  }
  .el-table .el-button {
    min-width: 6em;
  }
</style>
