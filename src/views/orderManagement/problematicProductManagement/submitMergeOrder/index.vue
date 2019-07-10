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
          <span class="link-type" @click="viewDetail(scope.row)">{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="170"
        :label="$t('retailer.retailerCategories')"
        prop="channelProp"
        :filters="[{text: 'DLQD', value: 1}, {text: 'FXQD', value: 3}, {text: 'DFQD', value: 2}]"
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
      <el-table-column align="center" width="120" label="Code" prop="code"/>
      <el-table-column
        align="center"
        width="150"
        :label="$t('order.description')"
        prop="goodNameEn"
      />
      <el-table-column
        align="center"
        width="170"
        label="Refund Status"
        prop="refundStatusFront"
        :filters="[{text: 'Pending Compensation', value: 1}, {text: 'Pending Refund', value: 2}]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ refundStatusFrontMap[scope.row.refundStatusFront] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="170"
        label="Refund Type"
        prop="refundTypeFront"
        :filters="refundTypeFrontFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ refundTypeFrontMap[scope.row.refundTypeFront] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="Refund">
        <template slot-scope="scope">
          <span
            v-if="scope.row.refundStatusFront==1"
          >{{ scope.row.brandCompensationAmountSymbol }} {{ scope.row.brandCompensationAmount }}</span>
          <span
            v-if="scope.row.refundStatusFront==2"
          >{{ scope.row.brandRefundAmountSymbol }} {{ scope.row.brandRefundAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" type="selection" fixed="right"/>
    </el-table>
    <p
      class="warn-notice"
      style="text-align: right"
    >Warm Notice：Single refund or compensation cannot be merged，please be careful.</p>
    <div class="pagination-container" style="margin-top: 10px">
      <el-button
        type="primary"
        style="float: right;"
        @click="mergeCompensationOrders"
        :disabled="ordersSelected.length === 0"
      >{{$t('order.mergeCompensationOrders')}}</el-button>
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
        style="border-width: 2px 1px 1px 2px;width: 747px"
      >
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{$t('order.mergePaymentNo')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">Automatic generated</div>
          </el-col>
        </el-row>
        <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.beneficiaryBankSWIFITCode')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ wormirBankMsg.swiftCodeEn }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.beneficiaryBankName')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ wormirBankMsg.bankNameEn }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.beneficiaryBankAddress')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ wormirBankMsg.bankAddressEn }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.remittingBankSWIFITCode')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ brandBankMsg.bankCardNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.remittingBankName')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ brandBankMsg.bankName }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.remittingBankAddress')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ brandBankMsg.bankAddress }}</div>
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
        <el-row style="border-right: 1px #d5d5d5 solid;">
          <compensation-order-detail
            v-for="order in ordersSelected"
            :detail="order"
            :key="order.orderNo"
            @image-view="viewImage($event)"
          />
        </el-row>
        <div
          style="font-size: 12px;border: 1px solid #d5d5d5;border-left:none;"
          class="warn-notice"
        >
          <div>Warm Notice: Merge payment is an unalterable operation, please be careful to the operation.</div>
        </div>
      </div>
      <div style="text-align: center;margin-top: 20px">
        <el-button
          type="primary"
          @click="submitMergeOrder"
          :loading="submitLoading"
        >{{$t('table.submit')}}</el-button>
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
    CompensationOrderDetail,
    // receivedPackageDetail
  },
  data() {
    return {
      compensationTypesMap: {
        10: this.$t("order.compensationAfterApplication"),
        20: this.$t("order.compensationAfterAppeal"),
        30: this.$t("order.compensationForDamageApproval")
      },
      refundStatusFrontMap: {
        1: "Pending Compensation",
        2: "Pending Refund"
      },
      refundTypeFrontMap: {
        1: "Compensation After Application",
        2: "Compensation After Appeal",
        3: "Change to Compensation",
        4: "Refund After Application",
        5: "Refund After Appeal",
        6: "Shortage Refund"
      },
      refundTypeFrontFilters: [
        { text: "Compensation After Application", value: 1 },
        { text: "Compensation After Appeal", value: 2 },
        { text: "Change to Compensation", value: 3 },
        { text: "Refund After Application", value: 4 },
        { text: "Refund After Appeal", value: 5 },
        { text: "Shortage Refund", value: 6 }
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
      mergePaymentNo: "9567755433",
      isViewImageShow: false,
      imageViewed: "",
      channelTypeMap: {
        1: "DLQD",
        2: "DFQD",
        3: "FXQD"
      },
      brandBankMsg: {},
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
    },

    submitMergeOrder() {
      let orderNos = []
      let codes = []
      this.submitLoading = true;
      this.ordersSelected.forEach((e,i,s) => {
        orderNos.push(e.orderNo)
        codes.push(e.code)
      })
      this.$request({
        url: "/issue/submitBrandRefundMergeOrder.do",
        method: "post",
        data: {
          orderNos: orderNos,
          codes: codes,
        }
      }).then(res => {
        if (res.errorCode == 0) {
          const vm = this;
          this.$alert(
            "Refund payment have been merged, please check “Compensation Refund – Pay Refund” and complete the payment.",
            "",
            {
              confirmButtonText: this.$t("table.confirm"),
              callback() {
                vm.isMergeOrderShow = false;
                vm.getList()
              },
              showClose: false,
              type: "success"
            }
          );
        } else {
          this.$message.error("Request error");
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
        url: "/issue/brandSubmitRefundMergeOrder.do",
        method: "post",
        data: this.listQuery
      }).then(res => {
        if (res.errorCode == 0) {
          this.list = res.data.items;
          this.total = res.data.total;
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
      sums[6] = "Total:";
      sums[7] = 0;
      if (this.ordersSelected.length > 0) {
        this.ordersSelected.forEach((e, i, s) => {
          if (e.refundStatusFront == 1) {
            sums[7] += Number(e.brandCompensationAmount);
          } else if (e.refundStatusFront == 2) {
            sums[7] += Number(e.brandRefundAmount);
          }
          let symbol =
            e.brandRefundAmountSymbol || e.brandCompensationAmountSymbol;
          if (i == s.length - 1) {
            sums[7] = symbol + " " + sums[7].toFixed(2);
          }
        });
      } else {
        sums[7] = "--";
      }
      this.paymentAmount = sums[7];
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
</style>
