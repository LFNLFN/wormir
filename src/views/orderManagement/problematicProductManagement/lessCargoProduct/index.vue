<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="货单号/品牌名称/渠道号/渠道名称/商品编号/商品名称" v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
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

      <el-table-column min-width="120px" align="center" label="退款金额" prop="lessCargoRefundMoney" />

      <el-table-column min-width="120px" align="center" label="退款状态" prop="lessCargoRefundStatus"
                       :filters="lessCargoRefundStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.lessCargoRefundStatus | lessCargoRefundStatusFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" align="center" label="退款类型"
                       prop="lessCargoRefundType"
                       :filters="lessCargoRefundTypeFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.lessCargoRefundType | lessCargoRefundTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('payRefund.operation')" min-width="150"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <!--申请退款-->
          <el-button type="primary" size="mini"
                     v-if="scope.row.lessCargoRefundStatus==0&&scope.row.lessCargoRefundType==1"
                     @click="viewApplication(scope.row)">
            申请退款
          </el-button>
          <!--待审核状态-->
          <el-button type="primary" size="mini"
                     v-if="scope.row.lessCargoRefundStatus==1&&scope.row.lessCargoRefundType==2"
                     @click="viewWaitReview(scope.row)">
            查看详情
          </el-button>

          <!--待退款-->
          <el-button type="primary" size="mini"
                     v-if="scope.row.lessCargoRefundStatus==2"
                     @click="viewWaitForRefund(scope.row)">
            查看详情
          </el-button>

          <!--已退款-->
          <el-button type="primary" size="mini"
                     v-if="scope.row.lessCargoRefundStatus==3"
                     @click="viewAlreadyRefund(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @current-change="changePageList" :current-page="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--货单号详情-->
    <el-dialog :visible.sync="orderNoDetailVisible" fullscreen style="padding: 20px">
      <alreadyReceive v-if="orderNoDetailVisible"></alreadyReceive>
    </el-dialog>

    <!--申请退款状态-->
    <el-dialog :visible.sync="isApplicationShow" :width="dialogWidth">
      <applyForRefund :currentRow="currentRow" v-if="isApplicationShow"
                      @closeApplicationDialog="isApplicationShow=false; getList()"></applyForRefund>
    </el-dialog>


    <!--待审核状态-->
    <el-dialog :visible.sync="isWaitReviewShow" :width="dialogWidth">
      <waitReview :currentRow="currentRow"
                  v-if="isWaitReviewShow"
      ></waitReview>
    </el-dialog>

    <!--待退款状态-->
    <el-dialog :visible.sync="isWaitForRefundShow" :width="dialogWidth">
      <waitForRefund :currentRow="currentRow"
                     v-if="isWaitForRefundShow"
      ></waitForRefund>
    </el-dialog>

    <!--已退款状态-->
    <el-dialog :visible.sync="isAlreadyRefundShow" :width="dialogWidth">
      <alreadyRefund :currentRow="currentRow"
                     v-if="isAlreadyRefundShow"
      ></alreadyRefund>
    </el-dialog>

  </div>
</template>

<script>
  import { issueGoods } from '@/api/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import alreadyReceive from './alreadyReceive/index.vue'
  import orderStatus from './orderStatus/index.vue'
  import * as tableFilters from '@/tableFilters/index.js'

  import waitReview from './waitReview/index.vue'
  import applyForRefund from './applyForRefund/index.vue'
  import waitForRefund from './waitForRefund/index.vue'
  import alreadyRefund from './alreadyRefund/index.vue'

  export default {
    name: 'defective-product',
    components: {
      alreadyReceive,
      orderStatus,
      waitReview,
      applyForRefund,
      waitForRefund,
      alreadyRefund,
    },
    directives: {
      waves
    },
    data() {
      return {
        // 按钮弹层
        orderNoDetailVisible: false,
        isApplicationShow: false,
        isWaitReviewShow: false,
        isWaitForRefundShow: false,
        isAlreadyRefundShow: false,

        list: [],
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          searchText: undefined,
          limit: 20,
          issueType: 30,
          propertyOfSale: 1,
        },
        lessCargoRefundStatusFilters: tableFilters.lessCargoRefundStatusFilters,
        lessCargoRefundTypeFilters: tableFilters.lessCargoRefundTypeFilters,
        channelPropFilters: tableFilters.channelPropFilters,
        downloadLoading: false,

        isDetailShow: false,
        detail: {},
        reviewResult: undefined,
        imageViewed: '',
        isViewImageShow: false,
        dialogWidth: '70%',
        brandNameFilters: [],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.$request({
          url: '/issue/lessCargoProductListManager.do',
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

      // 操作详情
      async reviewDetail(row) {
        this.isDetailShow = true
      },

      async submitApplicationReview() {
        this.$message('提交审核结果')
        this.isDetailShow = false
      },


      // 操作详情
      async viewApplication(row) {
        this.isApplicationShow = true
        this.currentRow = row
      },
      // 待审核状态
      async viewWaitReview(row) {
        this.isWaitReviewShow = true
        this.currentRow = row
      },
      // 待退款状态
      async viewWaitForRefund(row) {
        this.isWaitForRefundShow = true
        this.currentRow = row
      },
      // 已退款状态
      async viewAlreadyRefund(row) {
        this.isAlreadyRefundShow = true
        this.currentRow = row
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

      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

      // 按钮弹层
      viewOrderNoDetail(row) {
        this.orderNoDetailVisible = true
      },
    }
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
