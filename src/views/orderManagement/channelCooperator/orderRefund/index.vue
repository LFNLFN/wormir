<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 500px;"
        class="filter-item"
        placeholder="并单支付号/货单号/品牌名称"
        v-model="listQuery.searchText"
      ></el-input>
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
      >{{$t('table.search')}}</el-button>
    </div>
    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border=""
      fit
      highlight-current-row
      class="table_border2"
      style="width: 100%;border-right-width: 1px"
    >
      <el-table-column
        align="center"
        label="并单支付号/货单号"
        min-width="120"
        fixed="left"
        prop="mergeOrderNo"
      />
      <el-table-column
        min-width="120px"
        align="center"
        :label="$t('payOrder.brandName')"
        :filters="brandNameFilters"
        :filter-method="filterHandler"
        prop="brandName"
      />
      <el-table-column
        min-width="150px"
        align="center"
        label="汇款 SWIFT Code"
        prop="remittingBankSwifitCode"
      />
      <el-table-column min-width="160px" align="center" label="汇款银行" prop="remittingBankName"/>
      <el-table-column min-width="180px" align="center" label="银行地址" prop="remittingBankAddress"/>
      <el-table-column min-width="100px" align="center" label="退款金额" prop="paymentAmount">
        <template slot-scope="scope">
          <span>{{(scope.row.paymentAmount/1).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="100px"
        align="center"
        label="退款状态"
        prop="refundStatus"
        :filters="refundStatusFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{refundStatusFilter[scope.row.refundStatus]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('payOrder.operation')"
        min-width="120"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <!-- <el-button size="medium" type="primary" @click="viewMergeOrder(scope.row)">查看详情</el-button> -->
          <el-button size="medium" type="primary" @click="viewDetail(scope)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background=""
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="isMergeOrderShow" fullscreen style="padding: 20px">
      <mergeOrderDetail
        v-if="isMergeOrderShow"
        :orders="ordersSelected"
        :mergeOrderNo="currentOrder.mergeOrderNo"
      />
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import { paymentStatusFilters } from "@/tableFilters/index.js";
import waitPayDeposit from "./waitPayDeposit/index.vue";
import waitPayResidual from "./waitPayResidual/index.vue";
import mergeOrderDetail from "./mergeOrderDetail/index.vue";

export default {
  name: "order-refund",
  directives: { waves },
  components: {
    waitPayDeposit,
    waitPayResidual,
    mergeOrderDetail
  },
  data() {
    return {
      ordersSelected: [],
      tableKey: 0,
      mergeOrderDetailVisible: false,
      list: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        searchText: ""
      },
      brandNameFilters: [],
      paymentStatusFilters: paymentStatusFilters,
      refundStatusFilters: [
        { text: "待退款", value: 2 },
        { text: "已退款", value: 3 }
      ],
      refundStatusFilter: {
        2: "待退款",
        3: "已退款"
      },
      orders: null,
      isMergeOrderShow: false
    };
  },
  computed: {
    mergeTitle() {
      let tmp = this.orders.some((e, i, s) => {
        if (i == 0) {
          return false;
        }
        return e.order_status != s[i - 1].order_status;
      });
      if (tmp) {
        if (this.currentOrder.paymentStatus == 1) {
          return "待付并单货款";
        } else if (this.currentOrder.paymentStatus == 2) {
          return "并单货款待确认到账";
        } else if (this.currentOrder.paymentStatus == 3) {
          return "并单货款已确认到账";
        }
      } else {
        if (this.orders[0].order_status == 30) {
          if (this.currentOrder.paymentStatus == 1) {
            return "待付并单订金";
          } else if (this.currentOrder.paymentStatus == 2) {
            return "并单订金待确认到账";
          } else if (this.currentOrder.paymentStatus == 3) {
            return "并单订金已确认到账";
          }
        } else if (this.orders[0].order_status == 40) {
          if (this.currentOrder.paymentStatus == 1) {
            return "待付并单余款";
          } else if (this.currentOrder.paymentStatus == 2) {
            return "并单余款待确认到账";
          } else if (this.currentOrder.paymentStatus == 3) {
            return "并单余款已确认到账";
          }
        }
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$request({
        url: "/order/orderRefundMergeOrderList.do",
        method: "post",
        data: this.listQuery
      })
        .then(res => {
          if (res.errorCode == 0) {
            this.list = res.data.items;
            this.total = res.data.total;
            this.brandNameFilters = res.data.brandNameFilters;
            this.listLoading = false;
          } else {
            this.$message.error("数据请求失败");
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("数据请求失败");
          this.listLoading = false;
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 查看货单
    async viewDetail(scope) {
      this.currentOrder = scope.row;
      this.reviewListLoading = true;
      await this.$request({
        url: "/order/refundMergeOrderStatusDetail.do",
        method: "post",
        data: {
          mergeOrderNo: scope.row.mergeOrderNo,
          orderNos: scope.row.orderNos.split(',')
        }
      }).then(res => {
        if (res.errorCode == 0) {
          this.reviewListLoading = false;
          this.isMergeOrderShow = true;
          this.ordersSelected = res.data;
        } else {
          this.$message.error("Request error");
          this.reviewListLoading = false;
        }
      });
    },
    viewMergeOrder(row) {
      this.listLoading = true;
      this.currentOrder = row;
      this.$request({
        url: "/order/mergeOrderDetail.do",
        method: "post",
        data: { orderNos: row.orderNos }
      })
        .then(res => {
          if (res.errorCode == 0) {
            this.orders = res.data.items;
            this.mergeOrderDetailVisible = true;
            this.listLoading = false;
          } else {
            this.$message.error("数据请求失败");
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("数据请求失败");
          this.listLoading = false;
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
</style>
