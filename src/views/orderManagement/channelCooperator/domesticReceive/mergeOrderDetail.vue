<template>
  <div>
    <!--地址栏-->
    <div style="border: solid 1px #D5D5D5;border-width: 2px 1px 1px 2px;">
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">
            <span>并货单号</span>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple">
            <span>{{ mergeOrderNo }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">Address:</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">{{ domesticAuthorityCompanyMsg.address }}</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple">City:</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{ domesticAuthorityCompanyMsg.city }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">Consignee's Name:</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">{{domesticAuthorityCompanyMsg.english_name}}</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple">Contact:</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{domesticAuthorityCompanyMsg.contact}}</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple">Tel:</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{domesticAuthorityCompanyMsg.tel}}</div>
        </el-col>
      </el-row>
    </div>
    <!--遍历显示订单-->
    <div v-for="(item,index) in orders" style="margin-top: -2px">
      <reviewOrderList :currentRow="item" :ref="orderItem + item" style="padding: 0;"/>
      <div
        v-if="currentOrder.shipmentStatusDetail==1"
        class="text-muted border2 no-border-top"
      >支付余款时间：{{ item.paySurplusTime }}</div>
      <div
        v-if="currentOrder.shipmentStatusDetail>1"
        class="text-muted border2 no-border-top"
      >国外出库时间：{{ item.externalOutboundTime }}</div>
    </div>
    <div class="text-center" style="margin: 1em" v-if="currentOrder.shipmentStatusDetail>3">
      <el-button type="primary" @click="submitShipment(1)" :loading="submitLoading">发送报关报检文件</el-button>
      <el-button type="primary" @click="submitShipment(2)" :loading="submitLoading">发送收发货文件</el-button>
    </div>
    <div v-if="currentOrder.shipmentStatusDetail>3">
      <div class="invoice-chooseing-wrap">
        <h3>报关报检文件</h3>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox
            v-for="city in cities"
            :label="city.value"
            :key="city.value"
            style="display:block"
          >
            {{city.text}}
            <el-button
              v-if="city.value==1"
              type="primary"
              size="mini"
              @click="previewInvoice(city)"
              style="margin-left: 5px;width: 3em;padding: 0"
            >{{ '下载' }}</el-button>
            <el-button
              v-if="city.value==1"
              type="primary"
              size="mini"
              @click="previewInvoice(city)"
              style="margin-left: 5px;width: 3em;padding: 0"
            >{{ '上传' }}</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="previewInvoice(city)"
              style="margin-left: 5px;width: 3em;padding: 0"
            >{{ '查看' }}</el-button>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="invoice-chooseing-wrap">
        <h3>收发货文件</h3>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities1" @change="_handleCheckedCitiesChange">
          <el-checkbox :label="1" style="display:block">并货单号+并货单
            <el-button
              type="primary"
              size="mini"
              @click="previewInvoice(city)"
              style="margin-left: 5px;width: 3em;padding: 0"
            >{{ '查看' }}</el-button>
          </el-checkbox>
          <el-checkbox :label="2" style="display:block">货单号+发货单
            <el-button
              type="primary"
              size="mini"
              @click="previewInvoice(city)"
              style="margin-left: 5px;width: 3em;padding: 0"
            >{{ '查看' }}</el-button>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <el-dialog :visible.sync="isSendBoxShow" append-to-body fullscreen style="padding: 20px">
      <sendEmail v-if="isSendBoxShow" :currentRow="currentOrder" 
      @cancelSending="isSendBoxShow = false" :parentPage="docType" :orders="orders"></sendEmail>
    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable */

import request from "@/utils/request";
import { createNumWithRange } from "@/utils/index";
import reviewOrderList from "./reviewOrderList.vue";
import sendEmail from "./sendEmail.vue";
const cityOptions = [
  { text: "并货单号+购货合同", value: 1 },
  { text: "并货单号+商业发票", value: 2 },
  { text: "并货单号+生产日期证明", value: 3 },
  { text: "并货单号+装箱单", value: 4 },
  { text: "并货单号+申报要素表", value: 5 },
  { text: "并货单号+提单-电放单", value: 6 },
  { text: "并货单号+原产地证", value: 7 },
  { text: "进口化妆品安全性承诺书", value: 8 },
  { text: "品名+原标签", value: 9 },
  { text: "品名+成分配比表", value: 10 },
  { text: "品名+危害识别表", value: 11 },
  { text: "品名+MSDS", value: 12 },
  { text: "品名+化妆品备案批文", value: 13 }
  // { text: "并货单号+并货单", value: 14 },
  // { text: "货单号+发货单", value: 15 },
];
const _cityOptions = [
  1,2,3,4,5,6,7,8,9,10,11,12,13
]
export default {
  components: { reviewOrderList, sendEmail },
  name: "merge-order-detail",
  props: {
    orders: Array,
    mergeOrderNo: [String, Number],
    mergeProductTotal: {
      type: Number
    },
    currentOrder: Object
  },
  data() {
    return {
      replenishmentList: [],
      listLoading: false,
      totalMergeQuantity_arr: [],
      domesticAuthorityCompanyMsg: {},
      orderItem: "orderItem",
      submitLoading: false,
      docType: 1,
      // 发送货单多选框
      checkAll: false,
      checkedCities: [],
      checkedCities1: [],
      cities: cityOptions,
      isIndeterminate: true,
      isSendBoxShow: false
    };
  },
  computed: {
    mergeOrder_total() {
      this.totalMergeQuantity_arr = [];
      this.orders.forEach((order, index) => {
        let itemOrderQuantity = 0;
        order.orderSubs.forEach((subsItem, index) => {
          itemOrderQuantity +=
            subsItem.packingSpecification * subsItem.orderQuantity;
        });
        let itemReplenishQuantity = 0;
        //        order.replenishmentList.forEach((replenishItem, index) => {
        //          let replenishItem_total = replenishItem.packingUnit ? replenishItem.packingUnit * replenishItem.replenishmentQuantity : replenishItem.replenishmentQuantity
        //          itemReplenishQuantity += replenishItem_total
        //        })
        this.totalMergeQuantity_arr[index] =
          itemOrderQuantity + itemReplenishQuantity;
      });
      let totalMergeQuantity = 0;
      this.totalMergeQuantity_arr.forEach(quantityItem => {
        totalMergeQuantity += quantityItem;
      });
      return totalMergeQuantity;
    },
    totalProductQuantity() {
      return "???";
    }
  },
  methods: {
    // 发送货单多选框
    handleCheckAllChange(val) {
      this.checkedCities = val ? _cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    _handleCheckedCitiesChange(value) {
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.cities.length;
    },
    viewEmailChoosing() {
      this.isSendBoxShow = true;
      if (
        window.localStorage.getItem("isPrintReload") &&
        Number(window.localStorage.getItem("printingIndex")) >= 0
      ) {
        this.checkedEmails = window.localStorage.getItem(
          "alreadyCheckedEmails"
        );
      }
    },
    submitShipment(docType) {
      this.docType = docType
      // this.submitLoading = true;
      this.isSendBoxShow = true
      
    },
    getWormirCompanyMsg() {
      this.$request({
        url: "/user/getWormirCompanyMsg.do",
        method: "post",
        data: {}
      })
        .then(res => {
          if (res.errorCode == 0) {
            this.domesticAuthorityCompanyMsg =
              res.data.domesticAuthorityCompanyMsg;
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
    createNumWithRange
  },
  created() {
    this.getWormirCompanyMsg();
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.el-checkbox + .el-checkbox {
  margin-left: 0;
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
  border-right: 1px #d5d5d5 solid;
  border-bottom: 1px #d5d5d5 solid;
}
.el-col:nth-child(even):not(.two-table) div {
  padding-left: 1em;
}
.el-table::before {
  height: 0;
}
.selfAddTotal-col,
.td-col-split {
  position: relative;

  &:after {
    margin-left: 0;
  }
}
.el-table--border::after,
.el-table--group::after {
  width: 0;
}
.el-table::before {
  width: 0;
}
</style>
