<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 500px;"
        class="filter-item"
        placeholder="并单支付号/品牌名称"
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
      class="border1"
      style="width: 100%;border-right-width: 1px"
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
      <el-table-column min-width="100px" align="center" label="退款金额" prop>
        <template slot-scope="scope">
          <span>{{ scope.row.brandPaymentAmountSymbol }} {{ Number(scope.row.brandPaymentAmount).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="100px"
        align="center"
        label="退款状态"
        prop="refundStatusFront"
        :filters="[{text: '待退款', value:1}, {text: '已退款', value:2}]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">{{ refundStatusFrontMap[scope.row.refundStatusFront] }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('payOrder.operation')"
        min-width="120"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="viewDetail(scope.row)">查看详情</el-button>
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
    <!--操作弹层-->
    <el-dialog :visible.sync="mergeOrderDetailVisible" class="image-view" width="90%">
      <operationView :detail="detail"></operationView>
    </el-dialog>
    <el-dialog :visible.sync="isDialogDetailShow" fullscreen style="padding: 20px">
      <div
        v-if="isDialogDetailShow"
        class="dialog-wrap"
        style="width:753px;border-width: 1px"
      >
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">Merge Payment No.</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ currentOrder.mergeOrderNo }}</div>
          </el-col>
        </el-row>
        <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">Beneficiary Bank SWIFT Code</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ wormirBankMsg.swiftCodeEn }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">Beneficiary Bank Name</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ wormirBankMsg.bankNameEn }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">Beneficiary Bank Address</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ wormirBankMsg.bankAddressEn }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">Remitting Bank SWIFT Code</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ brandBankMsg.bankCardNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">Remitting Bank Name</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ brandBankMsg.bankName }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">Remitting Bank Address</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ brandBankMsg.bankAddress }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div
              v-if="currentOrder.refundStatusFront==1"
              class="grid-content bg-purple"
            >Total Pending Refund：</div>
            <div
              v-if="currentOrder.refundStatusFront==2"
              class="grid-content bg-purple"
            >Total Refunded Payment：</div>
          </el-col>
          <el-col :span="16">
            <div
              class="grid-content bg-purple-light"
            >{{ currentOrder.brandPaymentAmountSymbol }} {{ Number(currentOrder.brandPaymentAmount).toFixed(2) }}</div>
          </el-col>
        </el-row>
        <!--<compensation-order-detail v-for="order in orders" :detail="order"-->
        <!--:key="order.orderNo" @image-view="viewImage" />-->
        <compensation-order-detail
          v-for="(order, index) in this.orders"
          :detail="order"
          :key="index"
          @image-view="viewImage"
        />
      </div>
      <div
        style="text-align: center;margin-top: 20px"
        v-if="currentOrder.compensationStatus==10 && !currentOrder.confirmCompensationPayment"
      >
        <el-button type="primary" @click="confirmAction(currentOrder)">Confirm Transfer</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isViewImageShow" width="75%">
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import { paymentStatusFilters } from "@/tableFilters/index.js";
import operationView from "./operationView";
import CompensationOrderDetail from "./compensationOrderDetail";

export default {
  name: "order-refund",
  directives: { waves },
  components: {
    operationView,
    CompensationOrderDetail
  },
  data() {
    return {
      detail: { compensationStatus: 8 },
      tableKey: 0,
      mergeOrderDetailVisible: false,
      isDialogDetailShow: false,
      list: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        searchText: ""
      },
      brandNameFilters: [],
      currentOrder: {},
      orders: null,
      refundStatusFrontMap: {
        1: "待退款",
        2: "已退款"
      },
      imageViewed: null,
      isViewImageShow: false,
      wormirBankMsg: {},
      brandBankMsg: {},
      orders: []
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
    viewImage(src) {
      this.imageViewed = src;
      this.isViewImageShow = true;
    },
    getList() {
      this.listLoading = true;
      this.$request({
        url: "/issue/managerPayRefundMergeOrder.do",
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
    viewDetail(row) {
      this.currentOrder = row;
      this.isDialogDetailShow = true;
      this.$request({
        url: "/issue/brandRefundMergeOrderDetail.do",
        method: "post",
        data: {
          mergeOrderNo: this.currentOrder.mergeOrderNo
        }
      }).then(res => {
        if (res.errorCode == 0) {
          this.orders = res.data.items;
        }
      });
    }
  },
  created() {
    this.getList();
    // 获取已绑定的银行账户信息
    this.$request({
      url: "/user/getBrandBindingBankInfo.do",
      method: "post",
      data: {
        relevanceNo: window.localStorage.relevanceNo
      }
    }).then(res => {
      if (res.errorCode == 0) {
        this.brandBankMsg = res.data;
      }
    });
    // 获取已绑定的银行账户信息
    this.$request({
      url: "/user/getWormirBankInfo.do",
      method: "post",
      data: {}
    }).then(res => {
      if (res.errorCode == 0) {
        this.wormirBankMsg = res.data;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 0;
}
.el-col:nth-of-type(odd):not(.text-muted) div {
  background: #dff2fc;
  color: #424242;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.el-col:nth-of-type(even) div {
  background: #dff2fc;
  color: #424242;
  font-weight: 700;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-weight: normal;
}
.el-col:nth-child(odd) {
  background: #dff2fc;
  color: #424242;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-right: 1px #d5d5d5 solid;
  border-bottom: 1px #d5d5d5 solid;
}
.el-col:nth-child(even) {
  color: #424242;
  display: flex;
  align-items: center;
  font-size: 12px;
  border-right: none;
  border-bottom: 1px #d5d5d5 solid;
}
.el-col:only-of-type {
  border-right: none;
}
.el-col:nth-child(even) div {
  padding-left: 1em;
}
.el-col.el-col-16.el-col-offset-8 {
  padding-left: 1em;
}
.dialog-wrap {
  border:solid 2px #D5D5D5;
  overflow: hidden;
  width: 1152px;
  margin: 0 auto;
}
</style>
