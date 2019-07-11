<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 400px;"
        class="filter-item"
        placeholder="货单号/品牌名称/渠道号/渠道名称/商品名称/商品编号"
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
      :key="0"
      :data="list"
      ref="mainSumTable"
      style="width: 100%;border-right-width: 1px"
      class="main-table fixed-total-table"
      border=""
      fit
      size="mini"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      @selection-change="handleSelectionChange"
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column
        align="center"
        width="140"
        :label="$t('order.orderNo')"
        prop="orderNo"
        fixed="left"
      >
        <template slot-scope="scope">
          <!-- <span class="link-type" @click="viewDetail(scope.row)">{{scope.row.orderNo}}</span> -->
          <span>{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="120px"
        align="center"
        :label="$t('payRefund.brandName')"
        :filters="brandNameFilters"
        :filter-method="filterHandler"
        prop="brandNameZh"
      >
        <template slot-scope="scope">
          <span>{{scope.row.brandNameZh}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="170"
        :label="$t('retailer.retailerCategories')"
        prop="channelProp"
        :filters="[{text: 'DLQD', value: 1}, {text: 'FXQD', value: 3}]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ channelTypeMap[scope.row.channelProp] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        :label="$t('retailer.retailerNo')"
        prop="channelNo"
      />
      <el-table-column align="center" width="170" label="渠道名称" prop="channelName">
        <template slot-scope="scope">
          <span>{{ scope.row.channelName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" label="商品编号" prop="code"/>
      <el-table-column align="center" width="150" label="商品名称" prop="goodName"/>
      <el-table-column align="center" label="商品规格" prop="sizeZh"/>
      <el-table-column align="center" label="商品码" width="160" prop="goodNo"/>
      <el-table-column
        align="center"
        width="170"
        label="补/退款状态"
        prop="refundStatusFront"
        :filters="[{text: '待补款', value: 1}, {text: '待退款', value: 2}]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ refundStatusFrontMap[scope.row.refundStatusFront] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="170"
        label="补/退款类型"
        prop="refundTypeFront"
        :filters="refundTypeFrontFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ refundTypeFrontMap[scope.row.refundTypeFront] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="补/退款金额">
        <template slot-scope="scope">
          <span
            v-if="scope.row.refundStatusFront==1"
          >{{ scope.row.managerCompensationAmountSymbol }} {{ scope.row.managerCompensationAmount }}</span>
          <span
            v-if="scope.row.refundStatusFront==2"
          >{{ scope.row.managerRefundAmountSymbol }} {{ scope.row.managerRefundAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" type="selection"/>
    </el-table>
    <div class="pagination-container" style="margin-top: 10px">
      <el-button
        type="primary"
        style="float: right;"
        @click="mergeCompensationOrders"
        :disabled="ordersSelected.length < 2"
      >提交并单</el-button>
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
      <div
        v-if="isMergeOrderShow"
        class="dialog-wrap"
        style="border-width: 2px 2px 1px 2px;width: 747px"
      >
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{$t('order.mergePaymentNo')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">自动生成</div>
          </el-col>
        </el-row>
        <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.beneficiaryBankSWIFITCode')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ channelBankMsg.bankCardNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.beneficiaryBankName')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ channelBankMsg.bankName }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.beneficiaryBankAddress')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ channelBankMsg.bankAddress }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.remittingBankSWIFITCode')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ wormirBankMsg.swiftCodeZh }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.remittingBankName')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ wormirBankMsg.bankNameZh }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.remittingBankAddress')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ wormirBankMsg.bankAddressZh }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.totalPendingCompensation')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ paymentAmount }}</div>
          </el-col>
        </el-row>
        <el-row style="border-right: 0px #d5d5d5 solid;">
          <compensation-order-detail
            v-for="(order,index) in ordersSelected"
            :detail="order"
            :key="index"
            @image-view="viewImage($event)"
          />
        </el-row>
        <div
          style="font-size: 12px;border: 1px solid #d5d5d5;border-left:none;border-right:none;"
          class="warn-notice"
        >
          <div>温馨提醒：货单一经提交不可取消，请谨慎操作。</div>
        </div>
      </div>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="submitMergeOrder" :loading="submitLoading">确认提交</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog :visible.sync="isDetailShow" fullscreen style="padding: 20px"> -->
    <!--<div style="border: 2px solid #d5d5d5;border-bottom-width: 1px;width:750px;margin: 0 auto">-->
    <!--<compensation-order-detail :detail="currentOrder" v-if="isDetailShow"-->

    <!--@image-view="viewImage($event)"></compensation-order-detail>-->
    <!--</div>-->
    <!-- <receivedPackageDetail v-if="isDetailShow"></receivedPackageDetail> -->

    <!-- </el-dialog> -->
    <el-dialog :visible.sync="isViewImageShow" width="75%">
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces,indent */

import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
// import { getInventoryReservationList } from "../../../api/order";
import CompensationOrderDetail from "./compensationOrderDetail";
// import receivedPackageDetail from "./receivedPackageDetail";
// import alreadyReceive from "./alreadyReceive/index.vue";

export default {
  name: "merge-compensation-order",
  directives: {
    waves
  },
  components: {
    // alreadyReceive,
    CompensationOrderDetail
    // receivedPackageDetail
  },
  data() {
    return {
      brandNameFilters: [],
      compensationTypesMap: {
        10: this.$t("order.compensationAfterApplication"),
        20: this.$t("order.compensationAfterAppeal"),
        30: this.$t("order.compensationForDamageApproval")
      },
      refundStatusFrontMap: {
        1: "待补款",
        2: "待退款"
      },
      refundTypeFrontMap: {
        1: "申请后补款",
        2: "申诉后补款",
        3: "破损转补款",
        4: "申请后退款",
        5: "申诉后退款",
        6: "少货退款"
      },
      refundTypeFrontFilters: [
        { text: "申请后补款", value: 1 },
        { text: "申诉后补款", value: 2 },
        { text: "破损转补款", value: 3 },
        { text: "申请后退款", value: 4 },
        { text: "申诉后退款", value: 5 },
        { text: "少货退款", value: 6 }
      ],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        searchText: undefined,
        orderNo: undefined
      },
      isMergeOrderShow: false,
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      downloadLoading: false,
      currentOrder: {},
      ordersSelected: [],
      isDetailShow: false,
      mergePaymentNo: "0",
      isViewImageShow: false,
      imageViewed: "",
      channelTypeMap: {
        1: "DLQD",
        2: "DFQD",
        3: "FXQD"
      },
      channelBankMsg: {},
      paymentAmount: "",
      wormirBankMsg: {},
      submitLoading: false
    };
  },
  computed: {
    compensationAmount() {
      let amount = 0;
      this.ordersSelected.forEach(items => {
        amount += items.compensation;
      });
      return amount;
    }
  },
  methods: {
    viewDetail(row) {
      this.currentOrder = row;
      this.isDetailShow = true;
    },

    mergeCompensationOrders() {
      this.isMergeOrderShow = true;
      // 获取已绑定的银行账户信息
      this.$request({
        url: "/user/getChannelBindingBankInfo.do",
        method: "post",
        data: {
          channelNo: this.ordersSelected[0].channelNo
        }
      }).then(res => {
        if (res.errorCode == 0) {
          this.channelBankMsg = res.data;
        }
      });
    },

    submitMergeOrder() {
      let orderNos = [];
      let codes = [];
      this.submitLoading = true;
      this.ordersSelected.forEach((e, i, s) => {
        orderNos.push(e.orderNo);
        codes.push(e.code);
      });
      let channelMsg = {
        channelNo: this.ordersSelected[0].channelNo,
        channelName: this.ordersSelected[0].channelName,
        channelProp: this.ordersSelected[0].channelProp,
      }
      this.$request({
        url: "/issue/submitManagerRefundMergeOrder.do",
        method: "post",
        data: {
          orderNos: orderNos,
          codes: codes,
          symbol: '￥',
          paymentAmount: this.paymentAmount,
          channelBankMsg: this.channelBankMsg,
          wormirBankMsg: this.wormirBankMsg,
          channelMsg
        }
      }).then(res => {
        if (res.errorCode == 0) {
          const vm = this;
          this.$alert(
            "支付并单已提交，可到#问题商品管理-支付退款#中查看详情，并完成付款。",
            "",
            {
              confirmButtonText: "知道了",
              callback() {
                vm.isMergeOrderShow = false;
                vm.getList();
              },
              showClose: false,
              type: "success"
            }
          );
        } else {
          this.$message.error("请求出错");
          this.submitLoading = false;
        }
      });
    },

    viewImage(src) {
      this.imageViewed = src;
      this.isViewImageShow = true;
    },

    getList() {
      this.listLoading = true;
      this.$request({
        url: "/issue/managerSubmitRefundMergeOrder.do",
        method: "post",
        data: this.listQuery
      }).then(res => {
        if (res.errorCode == 0) {
          this.list = res.data.items;
          this.total = res.data.total;
          this.brandNameFilters = res.data.brandNameFilters;
          this.listLoading = false;
        } else {
          this.$message.error("Request error");
          this.listLoading = false;
        }
      });
    },

    handleSelectionChange(val) {
      this.ordersSelected = val;
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
    // 计算表格合计项
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      sums[10] = "合计:";
      let totalTb = 0;
      if (this.ordersSelected.length > 0) {
        this.ordersSelected.forEach((e, i, s) => {
          if (e.refundStatusFront == 1) {
            totalTb += Number(e.managerCompensationAmount);
          } else if (e.refundStatusFront == 2) {
            totalTb += Number(e.managerRefundAmount);
          }
          let symbol =
            e.managerRefundAmountSymbol || e.managerCompensationAmountSymbol;
          if (i == s.length - 1) {
            this.paymentAmount = totalTb;
            totalTb = symbol + " " + totalTb.toFixed(2);
          }
        });
      } else {
        totalTb = "--";
      }
      sums[11] = totalTb;
      return sums;
    },

    // 导出
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status"
        ];
        const tHeader = [
          "mergePaymentNo",
          "remittingBankSWIFITCode",
          "remittingBankName",
          "remittingBankAddress",
          "paymentReceive"
        ].map(item => this.$t("order." + item));
        const data = this.formatJson(filterVal, this.ordersSelected);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.$t("route.checkPayment")
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  created() {
    this.getList();
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
  },
  mounted() {
    // window.setTimeout(() => {
    //   this.$refs["mainSumTable"].$el.children[3].children[
    //     "0"
    //   ].children[1].children["0"].cells[5].children[
    //     "0"
    //   ].innerHTML = `<div style="display: flex;justify-content: flex-end"><span>Total:</span></div>`;
    // }, 0);
  }
};
</script>
<style scoped>
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
  border-right: 1px #d5d5d5 solid;
  border-bottom: 1px #d5d5d5 solid;
}

.el-col:nth-child(even) div {
  padding-left: 1em;
}

/*  */
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
  border: solid 2px #d5d5d5;
  overflow: hidden;
  width: 1152px;
  margin: 0 auto;
}
</style>
