<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="并单支付号/品牌名称" v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table
      :key='tableKey' :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      class="border2"
      style="width: 100%;border-right-width: 1px">

      <el-table-column align="center" label="并单支付号/货单号" min-width="120" fixed="left" prop="mergeOrderNo"/>

      <el-table-column
        min-width="120px" align="center"
        :label="$t('payOrder.brandName')"
        :filters="brandNameFilters"
        :filter-method="filterHandler"
        prop="brandName" />

      <el-table-column min-width="150px" align="center" label="汇款 SWIFT Code" prop="swifitCode" />

      <el-table-column min-width="160px" align="center" label="汇款银行" prop="bankName" />

      <el-table-column min-width="180px" align="center" label="银行地址" prop="bankAddress" />

      <el-table-column min-width="100px" align="center" label="退款金额" prop="paymentAmount"/>

      <el-table-column min-width="100px" align="center" label="退款状态" prop="paymentStatus"
                       :filters="paymentStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{scope.row.paymentStatus | paymentStatusFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('payOrder.operation')" min-width="120"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="viewMergeOrder(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--操作弹层-->
    <el-dialog :visible.sync="mergeOrderDetailVisible" class="image-view" width="90%">
      <operationView :detail="detail">
      </operationView>
    </el-dialog>

    <el-dialog :visible.sync="isDialogDetailShow" fullscreen style="padding: 20px">
      <div v-if="isDialogDetailShow" class="dialog-wrap" style="width:753px;border-bottom-width: 1px">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.mergePaymentNo')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{currentOrder.mergePaymentNo}}</div></el-col>
        </el-row>
        <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.beneficiaryBankSWIFITCode')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">
          </div>{{ currentOrder.r_bankAccount }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.beneficiaryBankName')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.r_bankName }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.beneficiaryBankAddress')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.r_bankAddress }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.remittingBankSWIFITCode')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.b_bankAccount }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.remittingBankName')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.r_bankName }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.remittingBankAddress')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.r_bankAddress }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.totalPendingCompensation')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">€ {{ currentOrder.compensation.toFixed(2) }}</div></el-col>
        </el-row>
        <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>
        <!--<compensation-order-detail v-for="order in orders" :detail="order"-->
                                   <!--:key="order.orderNo" @image-view="viewImage" />-->
        <compensation-order-detail :detail="currentOrder"
                                   :key="currentOrder.orderNo" @image-view="viewImage" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import { paymentStatusFilters } from '@/tableFilters/index.js'
  import operationView from './operationView'

  export default {
    name: 'order-refund',
    directives: { waves },
    components: {
      operationView
    },
    data() {
      return {
        detail: {compensationStatus: 8},
        tableKey: 0,
        mergeOrderDetailVisible: false,
        isDialogDetailShow: false,
        list: [],
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          searchText: '',
        },
        brandNameFilters: [],
        paymentStatusFilters: paymentStatusFilters,
        orders: null,
      }
    },
    computed: {
      mergeTitle() {
        let tmp = this.orders.some((e,i,s) => {
          if (i==0) { return false }
          return e.order_status != s[i-1].order_status
        })
        if (tmp) {
          if (this.currentOrder.paymentStatus==1) { return '待付并单货款' }
          else if (this.currentOrder.paymentStatus==2) { return '并单货款待确认到账' }
          else if (this.currentOrder.paymentStatus==3) { return '并单货款已确认到账' }
        }
        else {
          if (this.orders[0].order_status==30) {
            if (this.currentOrder.paymentStatus==1) { return '待付并单订金' }
            else if (this.currentOrder.paymentStatus==2) { return '并单订金待确认到账' }
            else if (this.currentOrder.paymentStatus==3) { return '并单订金已确认到账' }
          }
          else if (this.orders[0].order_status==40) {
            if (this.currentOrder.paymentStatus==1) { return '待付并单余款' }
            else if (this.currentOrder.paymentStatus==2) { return '并单余款待确认到账' }
            else if (this.currentOrder.paymentStatus==3) { return '并单余款已确认到账' }
          }
        }
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        this.$request({
          url: '/order/paymentOrderList.do',
          method: 'post',
          data: this.listQuery
        }).then((res) => {
          if (res.errorCode == 0) {
            this.list = res.data.items
            this.total = res.data.total
            this.brandNameFilters = res.data.brandNameFilters
            this.listLoading = false
          } else {
            this.$message.error('数据请求失败');
            this.listLoading = false
          }
        }).catch((err) => {
          this.$message.error('数据请求失败');
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
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      viewMergeOrder(row) {
        this.listLoading = true
        this.currentOrder = row
        this.$request({
          url: '/order/mergeOrderDetail.do',
          method: 'post',
          data: { orderNos: row.orderNos }
        }).then((res) => {
          if (res.errorCode == 0) {
            this.orders = res.data.items
            this.mergeOrderDetailVisible = true
            // this.isDialogDetailShow = true
            this.listLoading = false
          } else {
            this.$message.error('数据请求失败');
            this.listLoading = false
          }
        }).catch((err) => {
          this.$message.error('数据请求失败');
          this.listLoading = false
        })
      }
    },
    created() {
      this.getList()
    },
  }
</script>

<style lang="scss" scoped>

</style>
