<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item" placeholder="货单号/品牌名称/渠道号/渠道名称/商品名称/商品编号" v-model="listQuery.searchText">
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
          <span class="link-type" @click="showOrder(scope.row)">{{scope.row.orderNo}}</span>
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

      <el-table-column min-width="120px" align="center" label="退款金额" prop="refundMoney" />

      <el-table-column min-width="120px" align="center" label="退款状态" prop="refundStatus"
                       :filters="refundStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.refundStatus | refundStatusFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="退款类型"
                       prop="refundType"
                       :filters="refundTypeFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.refundType | refundTypeFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('payRefund.operation')" min-width="150"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <!--申请退款 0-1-->
          <el-button type="primary" size="mini" v-if="scope.row.refundStatus==0" @click="viewApplyForReplenishment(scope.row)">
            查看详情
          </el-button>

          <!--待审核 1-1-->
          <el-button type="primary" size="mini" v-if="scope.row.refundStatus==1"
                     @click="viewWaitForApplicationReview(scope.row)">查看详情
          </el-button>

          <!--待退款状态-->
          <el-button type="primary" size="mini" v-if="scope.row.refundStatus==2"
                     @click="viewWaitForReplenishment(scope.row)">
            查看详情
          </el-button>

          <!--已退款状态-->
          <el-button type="primary" size="mini" v-if="scope.row.refundStatus==3"
                     @click="viewAlreadyReplenishment(scope.row)">
            查看详情
          </el-button>

          <!--驳回状态-->
          <el-button type="primary" size="mini"
                     v-if="scope.row.refundStatus==4 || scope.row.refundStatus==7"
                     @click="viewRejection(scope.row)">
            {{ scope.row.refundType==1? '查看驳回' : '查看详情' }}
          </el-button>

          <!--申诉中-->
          <el-button type="primary" size="mini" v-if="scope.row.refundStatus==5"
                     @click="viewAppealing(scope.row)">
            查看详情
          </el-button>

          <!--协商中-->
          <el-button type="primary" size="mini" v-if="scope.row.refundStatus==6"
                     @click="viewNegotiating(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @current-change="changePageList" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <!--查看订单详情-->
    <el-dialog :visible.sync="orderDetailVisible" width="70%">
      <orderDetail v-if="orderDetailVisible"></orderDetail>
    </el-dialog>

    <!--转给品牌-->
    <el-dialog :visible.sync="turnToBrandVisible" width="70%">
      <turnToBrand v-if="turnToBrandVisible" @closeDialog="turnToBrandVisible=false"></turnToBrand>
    </el-dialog>


    <!--申请退款-->
    <el-dialog :visible.sync="isApplyForReplenishmentShow" :width="dialogWidth">
      <applyForReplenishment :currentRow="currentRow" v-if="isApplyForReplenishmentShow"
                             @closeApplicationDialog="isApplyForReplenishmentShow=false; getList()">
      </applyForReplenishment>
    </el-dialog>

    <!--等待审核-->
    <el-dialog :visible.sync="isWaitForApplicationReviewShow" :width="dialogWidth">
      <waitForApplicationReview :currentRow="currentRow" v-if="isWaitForApplicationReviewShow">
      </waitForApplicationReview>
    </el-dialog>

    <!--待补款-->
    <el-dialog :visible.sync="isWaitForReplenishmentShow" :width="dialogWidth">
      <waitForReplenishment :currentRow="currentRow" v-if="isWaitForReplenishmentShow">
      </waitForReplenishment>
    </el-dialog>

    <!--已补款-->
    <el-dialog :visible.sync="isAlreadyReplenishmentShow" :width="dialogWidth">
      <alreadyReplenishment :currentRow="currentRow" v-if="isAlreadyReplenishmentShow">
      </alreadyReplenishment>
    </el-dialog>

    <!--驳回-->
    <el-dialog :visible.sync="isRejectionShow" :width="dialogWidth">
      <rejection :currentRow="currentRow" v-if="isRejectionShow" @closeCheckRejection="isRejectionShow=false; getList()">
      </rejection>
    </el-dialog>

    <!--申诉中-->
    <el-dialog :visible.sync="isAppealingShow" :width="dialogWidth">
      <appealing :currentRow="currentRow" v-if="isAppealingShow">
      </appealing>
    </el-dialog>

    <!--协商中-->
    <el-dialog :visible.sync="isNegotiatingShow" :width="dialogWidth">
      <negotiating :currentRow="currentRow" v-if="isNegotiatingShow">
      </negotiating>
    </el-dialog>

    <!--查看已收货货单-->
    <el-dialog :visible.sync="isOrderShow" fullscreen style="padding: 20px">
      <alreadyReceive :currentRow="currentRow" v-if="isOrderShow"></alreadyReceive>
    </el-dialog>

  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import * as tableFilters from '@/tableFilters/index.js'
import orderDetail from './orderDetail/index.vue'
import turnToBrand from './turnToBrand/index.vue'
import alreadyReceive from '../alreadyReceive/index.vue'

import applyForReplenishment from './applyForReplenishment/index.vue'
import waitForApplicationReview from './waitForApplicationReview/index.vue'
import waitForReplenishment from './waitForReplenishment/index.vue'
import alreadyReplenishment from './alreadyReplenishment/index.vue'
import rejection from './rejection/index.vue'
import appealing from './appealing/index.vue'
import negotiating from './negotiating/index.vue'

export default {
  name: 'damage-product',
  components: {
    orderDetail,
    turnToBrand,
    alreadyReceive,
    applyForReplenishment,
    waitForApplicationReview,
    waitForReplenishment,
    alreadyReplenishment,
    rejection,
    appealing,
    negotiating,
  },
  directives: {
    waves
  },
  data() {
    return {
      // 按钮弹层
      orderDetailVisible: false,
      turnToBrandVisible: false,
      orderNoDetailVisible: false,

      refundTypeFilters: tableFilters.refundTypeFilters,
      refundStatusFilters: tableFilters.refundStatusFilters,
      channelPropFilters: tableFilters.channelPropFilters,


      isApplyForReplenishmentShow: false,
      isWaitForReplenishmentShow: false,
      isWaitForApplicationReviewShow: false,
      isAlreadyReplenishmentShow: false,
      isRejectionShow: false,
      isAppealingShow: false,
      isNegotiatingShow: false,


      list: [],
      brandNameFilters: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        searchText: undefined,
        limit: 10,
        issueType: 20,
        propertyOfSale: 1,
      },
      downloadLoading: false,

      isDetailShow: false,
      detail: {},
      reviewResult: undefined,
      imageViewed: '',
      isViewImageShow: false,
      dialogWidth: '70%',
      isOrderShow: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.$request({
        url: '/issue/damageProductListManager.do',
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
    viewTurnToBrand(row) {
      this.turnToBrandVisible = true
    },
    viewOrderNoDetail(row) {
      this.orderNoDetailVisible = true
    },




    viewApplyForReplenishment(row) {
      this.isApplyForReplenishmentShow = true
      this.currentRow = row
    },

    viewWaitForApplicationReview(row) {
      this.isWaitForApplicationReviewShow = true
      this.currentRow = row
    },

    viewWaitForReplenishment(row) {
      this.isWaitForReplenishmentShow = true
      this.currentRow = row
    },

    viewAlreadyReplenishment(row) {
      this.isAlreadyReplenishmentShow = true
      this.currentRow = row
    },

    viewRejection(row) {
      this.isRejectionShow = true
      this.currentRow = row
    },

    viewAppealing(row) {
      this.isAppealingShow = true
      this.currentRow = row
    },

    viewNegotiating(row) {
      this.isNegotiatingShow = true
      this.currentRow = row
    },
    showOrder(row) {
      this.currentRow = row
      this.isOrderShow = true
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
