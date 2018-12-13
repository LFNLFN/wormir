<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="货单号/品牌名称/渠道号/渠道名称/商品编号/商品名称" v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table key='0' :data="list"
              v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row size="mini"
              class="border2"
              style="width: 100%;border-right-width: 1px">

      <el-table-column align="center" :label="$t('payRefund.orderNo')" min-width="120" prop="orderNo" fixed="left">
        <template slot-scope="scope">
          <span class="link-type" @click="viewOrderNoDetail(scope.row)">{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100" align="center" label="交易方式" prop="tradeWay"
                       :filters="tradeWayFilter"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ tradeWayMap[scope.row.tradeWay].status }}</span>
        </template>
      </el-table-column>


      <el-table-column min-width="100" align="center" label="品牌名称" prop="brandName"
                       :filters="[{text: 'LANCOME', value: 'LANCOME'}]"
                       :filter-method="filterHandler"/>


      <el-table-column
        min-width="120px"
        label="渠道属性"
        align="center"
        prop="retailerCategories"
        :filters="retailerCategoriesFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.retailerCategories | retailerCategoriesFilters}}</span>
        </template>
      </el-table-column>


      <el-table-column min-width="100" align="center" label="渠道号" prop="channelNo"/>

      <el-table-column min-width="100" align="center" label="渠道名称" prop="channelName"/>


      <el-table-column min-width="150" align="center" label="少货商品明细" prop="orderNo">
        <template slot-scope="scope">
            <span class="link-type"
                  @click="isCargoShortageDetailsShow=true">点击查看</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="补货类型" min-width="100"
                       :filters="lessCargoTypeFilter"
                       :filter-method="filterHandler">
        <template slot-scope="scope">{{ lessCargoTypeMap[scope.row.lessCargoType].status }}</template>
      </el-table-column>

      <el-table-column min-width="100" align="center" label="补货状态" prop="lessReplenishmentStatus"
                       :filters="lessCargoStatusFilter"
                       :filter-method="filterHandler">
        <template slot-scope="scope">{{ lessCargoStatusMap[scope.row.lessCargoStatus].status }}</template>
      </el-table-column>

      <el-table-column min-width="100" align="center" :label="$t('order.operation')" class-name="small-padding"
                       fixed="right">
        <template slot-scope="scope">
          <!---->
          <el-button type="primary" size="mini"
                     @click="viewOrderStatus(scope.row)">
            查看详情
          </el-button>
          <!--<el-button type="primary" size="mini"-->
                     <!--v-if="scope.row.lessCargoStatus<2&&scope.row.lessCargoType===1"-->
                     <!--@click="viewApplicationAndWaitReview1(scope.row)">-->
            <!--{{ lessCargoStatusMap[scope.row.lessCargoStatus].operation }}-->
          <!--</el-button>-->

          <!--&lt;!&ndash;同意申请&ndash;&gt;-->
          <!--<el-button type="primary" size="mini"-->
                     <!--v-if="scope.row.lessCargoStatus===2"-->
                     <!--@click="viewAgreeApplication(scope.row)">-->
            <!--{{ lessCargoStatusMap[scope.row.lessCargoStatus].operation }}-->
          <!--</el-button>-->

          <!--&lt;!&ndash;待补货&ndash;&gt;-->
          <!--<el-button type="primary" size="mini"-->
                     <!--v-if="scope.row.lessCargoStatus===3"-->
                     <!--@click="viewWaitReplenishment(scope.row)">-->
            <!--{{ lessCargoStatusMap[scope.row.lessCargoStatus].operation }}-->
          <!--</el-button>-->

          <!--&lt;!&ndash;待收货&ndash;&gt;-->
          <!--<el-button type="primary" size="mini"-->
                     <!--v-if="scope.row.lessCargoStatus===4"-->
                     <!--@click="viewWaitReceive(scope.row)">-->
            <!--{{ lessCargoStatusMap[scope.row.lessCargoStatus].operation }}-->
          <!--</el-button>-->

          <!--&lt;!&ndash;已收货&ndash;&gt;-->
          <!--<el-button type="primary" size="mini"-->
                     <!--v-if="scope.row.lessCargoStatus===5"-->
                     <!--@click="viewAlreadyReceive(scope.row)">-->
            <!--{{ lessCargoStatusMap[scope.row.lessCargoStatus].operation }}-->
          <!--</el-button>-->
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination background @current-change="changePageList" :current-page="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--viweDetail-->
    <el-dialog :visible.sync="isDetailShow" class="image-view" width="50%">
      <div v-if="isDetailShow">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{$t('order.orderNo')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{detail.orderNo}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{$t('retailer.retailerNo')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{detail.retailerNo}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">{{$t('order.cargoShortageDetails')}}</el-col>
          <el-col :span="20">
            <el-table key='2' :data="cargoShortageDetailsList" border fit highlight-current-row size="mini" stripe
                      show-summary style="width: 100%">
              <el-table-column align="center" :label="$t('inventory.boxNo')" prop="boxNo"/>
              <el-table-column align="center" :label="$t('product.productName')" prop="productName"/>
              <el-table-column align="center" :label="$t('product.size')" prop="size"/>
              <el-table-column align="center" :label="$t('quantity.quantity')" prop="quantity"/>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{$t('order.photoEvidence')}}</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light" @click="viewImage(detail.img)">{{$t('order.clickToLarge')}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{$t('order.reviewResult')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">
              <el-radio v-model="reviewResult" :label="0">{{$t('order.replenishmentApproval')}}</el-radio>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="text-center">
            <el-button type="primary" @click="submitApplicationReview">{{$t('table.submit')}}</el-button>
          </el-col>
        </el-row>
      </div>

      <!--viewImage-->
      <el-dialog :visible.sync="isViewImageShow" class="image-view" width="75%" append-to-body>
        <img :src="imageViewed" alt="" width="100%">
      </el-dialog>
    </el-dialog>

    <!--少货明细-->
    <el-dialog :visible.sync="isCargoShortageDetailsShow" :title="$t('order.cargoShortageDetails')"
               class="image-view" width="75%">
      <el-table key='1' :data="cargoShortageDetailsList"
                v-loading="cargoShortageDetailsListLoading"
                element-loading-text="给我一点时间"
                border fit highlight-current-row size="mini"
                class="border2"
                style="width: 100%;border-bottom-width: 1px">
        <el-table-column align="center" :label="$t('inventory.boxNo')" prop="boxNo"/>
        <el-table-column align="center" :label="$t('product.productName')" prop="brandEnglishName"/>
        <el-table-column align="center" :label="$t('product.size')" prop="goodsSpecification"/>
        <el-table-column align="center" label="数量" prop="cargoShortageQuantity"/>
      </el-table>
    </el-dialog>

    <!--货单号详情-->
    <el-dialog :visible.sync="orderNoDetailVisible" fullscreen style="padding: 20px">
      <alreadyReceive v-if="orderNoDetailVisible"></alreadyReceive>
    </el-dialog>

    <!--待审核详情/一个种类-->
    <el-dialog :visible.sync="oneTypeDetailVisible" fullscreen style="padding: 20px">
      <oneTypeDetail v-if="oneTypeDetailVisible"></oneTypeDetail>
    </el-dialog>
    <!--待审核详情/两个种类-->
    <el-dialog :visible.sync="twoTypesDetailVisible" fullscreen style="padding: 20px">
      <twoTypesDetail v-if="twoTypesDetailVisible"></twoTypesDetail>
    </el-dialog>

    <!--生成的补货单详情-->
    <el-dialog :visible.sync="orderStatusVisible" fullscreen style="padding: 20px" title="">
      <orderStatus v-if="orderStatusVisible"></orderStatus>
    </el-dialog>

  </div>
</template>

<script>
  import { issueGoods } from '@/api/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import Mock from 'mockjs'
  import alreadyReceive from './alreadyReceive/index.vue'
  import oneTypeDetail from './waitReview/oneTypeDetail.vue'
  import twoTypesDetail from './waitReview/twoTypesDetail.vue'
  import orderStatus from './orderStatus/index.vue'

  export default {
    name: 'defective-product',
    components: { alreadyReceive, oneTypeDetail, twoTypesDetail, orderStatus },
    directives: {
      waves
    },
    data() {
      return {
        // 按钮弹层
        orderNoDetailVisible: false,
        oneTypeDetailVisible: false,
        twoTypesDetailVisible: false,
        orderStatusVisible: false,

        replenishmentStatuses: {
          0: { status: this.$t('order.pendingApproval'), operation: this.$t('order.reviewDetail') },
          1: { status: this.$t('order.requestRejected'), operation: this.$t('order.reviewDetail') },
          2: { status: this.$t('order.pending'), operation: this.$t('order.processRequest') },
          3: { status: this.$t('order.applicationDismissed'), operation: this.$t('order.reviewDetail') },
          4: { status: this.$t('order.negotiating'), operation: this.$t('order.reviewDetail') }
        },
        typeFilter: [
          { text: 'Cargo Shortage From Order', value: '0' },
          { text: 'Mending Replenishment', value: '1' }
        ],
        list: [
          {
            orderNo: 123456,
            brandName: 'LANCOM',
            tradeWay: 0,
            lessCargoType: 1,
            lessReplenishmentStatus: 0,
            lessCargoStatus: 0,
            retailerCategories: 0,
            channelNo: 123123,
            channelName: 'QWE总店'
          }
        ],
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          keyword: undefined,
          orderNo: undefined,
          sqlColumn: undefined,
          rows: 20,
          issueType: 30
        },
        statusOptions: ['published', 'draft', 'deleted'],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        downloadLoading: false,

        isDetailShow: false,
        isCargoShortageDetailsShow: false,
        cargoShortageDetailsListLoading: false,
        cargoShortageDetailsList: [
          {
            brandEnglishName: 'LANCOM',
            boxNo: '1001',
            goodsChineseName: '兰蔻',
            goodsSpecification: '30毫升/支',
            cargoShortageQuantity: 2
          },
          {
            brandEnglishName: 'LANCOM',
            boxNo: '1001',
            goodsChineseName: '兰蔻',
            goodsSpecification: '30毫升/支',
            cargoShortageQuantity: 2
          },
        ],
        detail:
          {}
        ,
        reviewResult: undefined,
        imageViewed:
          '',
        isViewImageShow:
          false,
        tradeWayFilter:
          [
            { text: '非交易', value: 0 },
            { text: '国内交易', value: 1 },
            { text: '香港交易', value: 2 }
          ],

        tradeWayMap:
          {
            0:
              {
                status: '非交易'
              }
            ,
            1:
              {
                status: '国内交易'
              }
            ,
            2:
              {
                status: '香港交易'
              }
          }
        ,
        retailerCategoriesFilters: [
          { text: 'DLQD', value: 0 },
          { text: 'FXQD', value: 1 },
          { text: 'DFQD', value: 2 }
        ],
        lessCargoTypeFilter:
          [
            { text: '订货少货', value: 0 },
            { text: '补寄破损/少货', value: 1 }
          ],
        lessCargoTypeMap:
          {
            0:
              {
                status: '订货少货'
              }
            ,
            1:
              {
                status: '补寄破损/少货'
              }
          }
        ,

        lessCargoStatusFilter: [
          { text: '待审核', value: 0 },
          { text: '待补货', value: 1 },
          { text: '待收货', value: 2 },
          { text: '已补货', value: 3 }
        ],
        lessCargoStatusMap:
          {
            0:
              {
                status: '待审核', operation:
                '申请补货'
              }
            ,
            1:
              {
                status: '待补货', operation:
                '查看详情'
              }
            ,
            2:
              {
                status: '待收货', operation:
                '去补货'
              }
            ,
            3:
              {
                status: '已补货', operation:
                '查看详情'
              }
            ,
          }
        ,
      }
    },
    filters: {
      retailerCategoriesFilters(status) {
        const statusMap = {
          0: 'DLQD',
          1: 'FXQD',
          2: 'DFQD',
        }
        return statusMap[status]
      },
    },
    created() {
//    this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
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

      viewCargoShortageDetails(row) {
        this.isCargoShortageDetailsShow = true
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
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

      // 按钮弹层
      viewOrderNoDetail(row) {
        this.orderNoDetailVisible = true
      },
      viewOneTypeDetail(row) {
        this.oneTypeDetailVisible = true
      },
      viewTwoTypesDetail(row) {
        this.twoTypesDetailVisible = true
      },
      viewOrderStatus(row) {
        this.orderStatusVisible = true
      },
    }
  }
</script>
<style scoped>
  .text-muted {
    color: #999;
  }

  .click-link {
    color: #1e6abc;
    text-decoration: underline;
  }
</style>
