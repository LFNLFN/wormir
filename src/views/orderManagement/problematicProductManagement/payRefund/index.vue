<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 400px;"
        class="filter-item"
        placeholder="并单支付号/品牌名称/渠道号/渠道名称"
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
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border=""
      fit
      size="mini"
      style="width: 100%;"
      class="main-table border1"
    >
      <el-table-column
        align="center"
        min-width="160"
        :label="$t('order.mergePaymentNo')"
        prop="mergeOrderNo"
        fixed="left"
      />
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
      <el-table-column
        align="center"
        min-width="230"
        :label="$t('order.beneficiaryBankSWIFITCode')"
        prop="swifitCode"
      />
      <el-table-column
        align="center"
        min-width="180"
        :label="$t('order.beneficiaryBankName')"
        prop="bankName"
      />
      <el-table-column
        align="center"
        min-width="190"
        :label="$t('order.beneficiaryBankAddress')"
        prop="bankAddress"
      />
      <el-table-column align="center" min-width="170" label="退款金额">
        <template slot-scope="scope">
          <span>{{ scope.row.managerPaymentAmountSymbol }} {{ Number(scope.row.managerPaymentAmount).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="160"
        class-name="status-col"
        label="退款状态"
        :filters="[{text: '待退款', value: 1}, {text: '已退款', value: 2}]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">{{ refundStatusFrontMap[scope.row.refundStatusFront] }}</template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('order.operation')"
        class-name="small-padding"
        width="130"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.refundStatusFront==1"
            size="mini"
            type="primary"
            @click="viewDetail(scope.row)"
          >去支付</el-button>
          <el-button
            v-if="scope.row.refundStatusFront==2"
            size="mini"
            type="primary"
            @click="viewDetail(scope.row)"
          >查看详情</el-button>
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
    <el-dialog :visible.sync="isDialogDetailShow" fullscreen style="padding: 20px">
      <div
        v-if="isDialogDetailShow"
        class="dialog-wrap"
        style="width:753px;border-bottom-width: 1px"
      >
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{$t('order.mergePaymentNo')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{currentOrder.mergeOrderNo}}</div>
          </el-col>
        </el-row>
        <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.beneficiaryBankSWIFITCode')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light"></div>
            {{ currentOrder.swifitCode }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.beneficiaryBankName')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ currentOrder.bankName }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.beneficiaryBankAddress')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ currentOrder.bankAddress }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.remittingBankSWIFITCode')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ currentOrder.remittingSwifitCode }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.remittingBankName')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ currentOrder.remittingBankName }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div class="grid-content bg-purple">{{$t('order.remittingBankAddress')}}</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light">{{ currentOrder.remittingBankAddress }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right">
            <div v-if="currentOrder.refundStatusFront==1" class="grid-content bg-purple">待退款合计：</div>
            <div v-if="currentOrder.refundStatusFront==2" class="grid-content bg-purple">已退款合计：</div>
          </el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.managerPaymentAmountSymbol }} {{ Number(currentOrder.managerPaymentAmount).toFixed(2) }}</div></el-col>
        </el-row>
        <compensation-order-detail v-for="(order,index) in orders" :detail="order"
        :key="index" @image-view="viewImage" />
      </div>
      <div
        style="text-align: center;margin-top: 20px"
        v-if="currentOrder.refundStatusFront==1"
      >
        <!-- <el-button type="primary" @click="confirmAction(currentOrder)">待付退款</el-button> -->
        <el-button type="primary" plain>待付退款</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isViewImageShow" width="75%">
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime, filterHandler } from "@/utils";
import CompensationOrderDetail from "./compensationOrderDetail";
// import { getInventoryReservationList } from '../../../api/order'

export default {
  name: "pay-compensation",
  components: { CompensationOrderDetail },
  directives: {
    waves
  },
  data() {
    return {
      channelBankMsg: {},
      paymentAmount: "",
      wormirBankMsg: {},
      channelTypeMap: {
        1: "DLQD",
        2: "DFQD",
        3: "FXQD"
      },
      refundStatusFrontMap: {
        1: '待退款',
        2: '已退款',
      },
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        searchText: undefined,
      },
      isDialogDetailShow: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogTransportChangeVisible: false,
      pvData: [],
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
      orders: [{}],
      isViewImageShow: false,
      imageViewed: "",
      brandNameFilters: []
    };
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
  methods: {
    filterHandler,
    // 查看货单
    viewDetail(row) {
      this.currentOrder = row;
      this.isDialogDetailShow = true;
      this.$request({
        url: "/issue/managerRefundMergeOrderDetail.do",
        method: "post",
        data: {
          mergeOrderNo: this.currentOrder.mergeOrderNo
        }
      }).then(res => {
        if (res.errorCode == 0) {
          this.orders = res.data.items;
        }
      });
    },

    toPayRefund(row) {
      this.currentOrder = row;
      this.$refs.payment.open();
    },

    confirmAction(row) {
      this.list.forEach((item2, index2) => {
        if (item2 === row) {
          this.list.splice(index2, 1);
        }
      });
      const vm = this;
      this.$confirm(
        'Please check that the refund corresponding to the merge order number has been transferred and then click "Confirm Transfer" button',
        "",
        {
          confirmButtonText: this.$t("table.confirm"),
          cancelButtonText: "Cancel",
          showClose: true
        }
      )
        .then(() => {
          vm.isDialogDetailShow = false;
        })
        .catch(() => {});
    },

    viewImage(src) {
      this.imageViewed = src;
      this.isViewImageShow = true;
    },

    getList() {
      this.listLoading = true;
      this.$request({
        url: "/issue/managerPayRefundMergeOrderCrossBoard.do",
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

    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
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
