<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 500px;"
        class="filter-item"
        placeholder="并货单号/品牌名称"
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
      style="width: 100%;border-right-width: 1px;border-top-width: 2px;border-left-width: 2px"
    >
      <el-table-column
        align="center"
        label="并单支付号"
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
        prop="brandChineseName"
      />
      <el-table-column
        min-width="100px"
        align="center"
        label="货单状态"
        prop="orderStatus"
        :filters="orderStatusFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">{{ scope.row.orderStatus }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('payOrder.operation')"
        min-width="120"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="viewMergeOrder(scope.row)"
          >{{scope.row.shipmentStatusDetail<4 ? '查看货单' : '发送货单'}}</el-button>
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
    <el-dialog :visible.sync="mergeOrderDetailVisible" fullscreen style="padding: 20px">
      <merge-order-detail
        :mergeOrderNo="mergeOrderNo"
        :orders="orders"
        :currentOrder="currentOrder"
      />
      <!--<element-form />-->
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import mergeOrderDetail from "./mergeOrderDetail";
import elementForm from "./elementForm";
import { paymentStatusFilters } from "@/tableFilters/index.js";

export default {
  name: "order-refund",
  directives: { waves },
  components: { mergeOrderDetail, elementForm },
  data() {
    return {
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
      orderStatusFilters: [
        { value: "待发货", text: "待发货" },
        { value: "待收货", text: "待收货" }
      ],
      orders: null,
      mergeOrderNo: null,
      currentOrder: {},
      
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
        url: "/order/domesticReceiveList.do",
        method: "post",
        data: this.listQuery
      })
        .then(res => {
          if (res.errorCode == 0) {
            this.list = res.data.items;
            this.total = res.data.total;
            this.brandNameFilters = res.data.brandNameFilters;
            // 处理货单状态显示
            this.list.forEach((e, i, s) => {
              if (e.shipmentStatusDetail == 1) {
                s[i].orderStatus = "待发货";
              } else if (e.shipmentStatusDetail > 1) {
                s[i].orderStatus = "待收货";
              }
            });
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
    viewMergeOrder(row) {
      this.listLoading = true;
      this.currentOrder = row;
      this.mergeOrderNo = row.mergeOrderNo;
      this.$request({
        url: "/order/mergeShipmentOrderDetail.do",
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
  },
  filters: {
    receiveStatusFilter(value) {
      const statusMap = {
        0: "待发货",
        1: "待收货"
      };
      return statusMap[value];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
