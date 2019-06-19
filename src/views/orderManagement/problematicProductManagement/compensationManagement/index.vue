<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item"
                placeholder="货单号/品牌名称/商品名称/商品编号" v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <div class="time-filter-wrap" style="margin-bottom: 20px">
      <el-date-picker
        v-model="yearValue"
        type="year"
        placeholder="选择年">
      </el-date-picker>
      <el-date-picker
        v-model="monthValue"
        type="month"
        placeholder="选择月">
      </el-date-picker>
    </div>

    <div class="table-wrap" style="border: 1px solid #d5d5d5;border-right-width: 0">
      <el-table key='1' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                highlight-current-row size="mini" style="width: 100%">

        <el-table-column width="130" align="center" label="货单号" prop="orderNo" fixed="left">
          <template slot-scope="scope">
            <span class="link-type" @click="viewReceive(scope.row)">{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100" align="center" label="品牌名称" prop="brandNameZh"
                         :filters="brandNameFilters"
                         :filter-method="filterHandler"/>

        <el-table-column min-width="100" align="center" label="商品编号" prop="code"/>
        <el-table-column min-width="100" align="center" label="渠道属性" prop="code"/>
        <el-table-column min-width="100" align="center" label="渠道名称" prop="code"/>
        <el-table-column min-width="100" align="center" label="商品编号" prop="code"/>
        <el-table-column min-width="200" align="center" label="商品名称" prop="goodName"/>
        <el-table-column min-width="100" align="center" label="商品规格" prop="sizeZh"/>
        <el-table-column min-width="200" align="center" label="物流公司" prop="goodName"/>
        <el-table-column min-width="200" align="center" label="物流单号" prop="goodName"/>
        <el-table-column align="center" label="取证图片" :min-width="150">
          <template slot-scope="scope">
            <img :src="scope.row.proofImage" style="width:80px;height:80px;" class="link-type"
                 @click="isViewImageShow=true; imageViewed=scope.row.proofImage"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货电话" :min-width="150" prop="receivePhone"/>
        <el-table-column align="center" label="送货人" :min-width="150" prop="receivePhone"/>
        <el-table-column align="center" label="送货电话" :min-width="150" prop="receivePhone"/>
        <el-table-column align="center" label="确认收货时间" :min-width="150" prop="receivePhone"/>
        <el-table-column align="center" label="渠道收货时间" :min-width="150" prop="channelReceiveTime"/>
        <el-table-column align="center" label="商品码" :min-width="150" prop="channelReceiveTime"/>
        <el-table-column min-width="100" align="center" label="订货金额" prop="orderAmount"/>

        <el-table-column min-width="100" align="center" label="赔保类型" prop="logisticCompensationType" fixed="right"
                         :filters="logisticCompensationTypeFilters"
                         :filter-method="filterHandler">
          <template slot-scope="scope">
            {{ scope.row.logisticCompensationType | logisticCompensationTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column min-width="100" align="center" label="赔保状态" prop="logisticCompensationStatus" fixed="right"
                         :filters="logisticCompensationStatusFilters"
                         :filter-method="filterHandler">
          <template slot-scope="scope">
            {{ scope.row.logisticCompensationStatus | logisticCompensationStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="赔保金额" prop="logisticCompensationAmount" fixed="right"/>
        <el-table-column type="selection" align="center" width="100" fixed="right"></el-table-column>

      </el-table>
      <el-table key='0' :data="[{}]" border fit :show-header="false"
                highlight-current-row size="mini" style="width: 100%">

        <el-table-column min-width="90" align="right" label="_">
          <template slot-scope="scope">
            <span class="text-total">合计：</span>
          </template>
        </el-table-column>

        <el-table-column width="120" align="center" label="_">
          <template slot-scope="scope">
            <span class="text-total">{{ totalAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('mergeRefundOrders.operation')" width="100"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary"
                     @click="">
            去支付
          </el-button>
        </template>
      </el-table-column>
    </el-table>

      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination background @current-change="changePageList" :current-page="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--viewImage-->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="75%">
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>

    <!--查看已收货货单-->
    <el-dialog :visible.sync="isOrderShow" fullscreen style="padding: 20px">
      <alreadyReceive :currentRow="currentRow" v-if="isOrderShow"></alreadyReceive>
    </el-dialog>

    <!--查看已收货货单-->
    <el-dialog :visible.sync="isOrderShow" fullscreen style="padding: 20px">
      <alreadyReceive :currentRow="currentRow" v-if="isOrderShow"></alreadyReceive>
    </el-dialog>

  </div>
</template>

<script>
  import { issueGoods } from '@/api/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import alreadyReceive from '../alreadyReceive/index.vue'

  export default {
    name: 'compensation-page',
    directives: {
      waves
    },
    components: {
      alreadyReceive
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          searchText: undefined,
          orderNo: undefined,
          limit: 20,
        },
        isViewImageShow: false,
        imageViewed: '',
        brandNameFilters: [],
        logisticCompensationTypeFilters: [
          {text: '少货赔保', value: '1'},
          {text: '破损赔保', value: '2'},
        ],
        logisticCompensationStatusFilters: [
          {text: '待赔保', value: '1'},
          {text: '已赔保', value: '2'},
        ],
        yearValue: null,
        monthValue: null,
        totalAmount: 0,
        isOrderShow: false,
        currentRow: {},
      }
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      changePageList(val) {
        this.listQuery.page = val
        this.getList()
      },
      getList() {
        this.listLoading = true
        this.$request({
          url: '/issue/logisticCompensationListChannel.do',
          method: 'post',
          data: this.listQuery
        }).then((res) => {
          if (res.errorCode == 0) {
            this.list = res.data.items
            this.totalAmount = 0
            this.list.forEach((e,i,s) => {
              this.totalAmount += e.logisticCompensationAmount.substring(1)/1
            })
            this.totalAmount = this.list[0].logisticCompensationAmount.substring(0,1) + ' ' + this.totalAmount.toFixed(2)
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
        const property = column['property'];
        return row[property] === value;
      },
      viewReceive(row) {
        this.currentRow = row
        this.isOrderShow = true
      }
    },
    created() {
      this.getList()
    },
  }
</script>

<style lang="scss" scoped>

</style>
