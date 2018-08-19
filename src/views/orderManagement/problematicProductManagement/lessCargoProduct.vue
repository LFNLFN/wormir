<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="Order No./Retailer No./Code/Description" v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table key='0' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
      highlight-current-row size="mini" stripe style="width: 100%">
      <el-table-column align="center" :label="$t('order.orderNo')" prop="orderNo" fixed="left" />
      <el-table-column align="center" label="交易方式" prop="orderNo" fixed="left" />
      <el-table-column align="center" label="品牌名称" prop="orderNo" fixed="left" />
      <el-table-column align="center" :label="$t('retailer.retailerCategories')" prop="retailerCategories" />
      <el-table-column align="center" :label="$t('retailer.retailerNo')" prop="retailerNo" />
      <el-table-column align="center" label="渠道名称" prop="retailerNo" />
      <el-table-column align="center" label="少货商品明细" prop="boxNo" >
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="viewCargoShortageDetails(scope.row)" class="click-link">{{$t('order.clickToView')}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="补货状态" >
        <template slot-scope="scope">{{replenishmentStatuses[scope.row.replenishmentStatus || 0].status}}</template>
      </el-table-column>
      <el-table-column align="center" label="补货类型" prop="cargoShortageType" :filters="typeFilter"/>
      <el-table-column align="center" :label="$t('order.operation')" class-name="small-padding" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="reviewDetail(scope.row)" >
            {{$t('order.reviewApplication')}}
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
          <el-col :span="4">{{$t('order.cargoShortageDetails')}}</el-col>
          <el-col :span="20">
            <el-table key='2' :data="cargoShortageDetailsList" border fit highlight-current-row size="mini" stripe show-summary style="width: 100%">
              <el-table-column align="center" :label="$t('inventory.boxNo')" prop="boxNo" />
              <el-table-column align="center" :label="$t('product.productName')" prop="productName"  />
              <el-table-column align="center" :label="$t('product.size')" prop="size" />
              <el-table-column align="center" :label="$t('quantity.quantity')" prop="quantity" />
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">{{$t('order.photoEvidence')}}</div></el-col>
          <el-col :span="20"><div class="grid-content bg-purple-light" @click="viewImage(detail.img)">{{$t('order.clickToLarge')}}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.reviewResult')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">
            <el-radio v-model="reviewResult" :label="0">{{$t('order.replenishmentApproval')}}</el-radio>
          </div></el-col>
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
      <el-table key='1' :data="cargoShortageDetailsList" v-loading="cargoShortageDetailsListLoading" element-loading-text="给我一点时间"
                border fit highlight-current-row size="mini" stripe style="width: 100%">
        <el-table-column align="center" :label="$t('inventory.boxNo')" prop="boxNo" />
        <el-table-column align="center" :label="$t('product.productName')" prop="productName" />
        <el-table-column align="center" :label="$t('product.size')" prop="size" />
        <el-table-column align="center" :label="$t('quantity.quantity')" prop="quantity" />
      </el-table>
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
      typeFilter: [
        { text: 'Cargo Shortage From Order', value: '0' },
        { text: 'Mending Replenishment', value: '1' }
      ],
      list: null,
      total: null,
      listLoading: true,
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
      cargoShortageDetailsList: [],
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
    }
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

  .el-table .cell {
    word-break: break-word;
  }
</style>
