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
          <div class="grid-content bg-purple">{{ domesticAuthorityCompanyMsg.address}}</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple">City:</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{domesticAuthorityCompanyMsg.city}}</div>
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
      <reviewOrderList :currentRow="item" :ref="orderItem + item"
                       style="padding: 0;"/>
    </div>
    <div class="text-center" v-if="currentOrder.shipmentStatusDetail>3">
      <el-button type="primary" @click="submitShipment" :loading="submitLoading">发送货单</el-button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */

import request from '@/utils/request'
import { createNumWithRange } from '@/utils/index'
import reviewOrderList from './reviewOrderList.vue'

export default {
  components: { reviewOrderList },
  name: 'merge-order-detail',
  props: {
    orders: Array,
    mergeOrderNo: [String, Number],
    mergeProductTotal: {
      type: Number
    },
    currentOrder: Object,
  },
  data() {
    return {
      replenishmentList: [],
      listLoading: false,
      totalMergeQuantity_arr: [],
      domesticAuthorityCompanyMsg: {},
      orderItem: 'orderItem',
      submitLoading: false,
    }
  },
  computed: {
    mergeOrder_total() {
      this.totalMergeQuantity_arr = []
      this.orders.forEach((order, index) => {
        let itemOrderQuantity = 0
        order.orderSubs.forEach((subsItem, index) => {
          itemOrderQuantity += subsItem.packingSpecification * subsItem.orderQuantity
        })
        let itemReplenishQuantity = 0
//        order.replenishmentList.forEach((replenishItem, index) => {
//          let replenishItem_total = replenishItem.packingUnit ? replenishItem.packingUnit * replenishItem.replenishmentQuantity : replenishItem.replenishmentQuantity
//          itemReplenishQuantity += replenishItem_total
//        })
        this.totalMergeQuantity_arr[index] = itemOrderQuantity + itemReplenishQuantity
      })
      let totalMergeQuantity = 0
      this.totalMergeQuantity_arr.forEach((quantityItem) => {
        totalMergeQuantity += quantityItem
      })
      return totalMergeQuantity
    },
    totalProductQuantity() {
      return '???'
    }
  },
  methods: {
    submitShipment() {
      this.submitLoading = true
      this.$confirm('Confirm to submit?', '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        var orderNos = []
        this.orders.forEach(element => {
          orderNos.push(element.orderNo)
        })
        request({
          url: '/order/submitShipmentMergeOrder.do',
          method: 'post',
          data: {
            orderNos: orderNos,
            companyMsg: this.domesticAuthorityCompanyMsg,
          }
        }).then(res => {
          this.submitLoading = false
          if (res.errorCode === 0) {
            this.$alert('Merge orders has entered the shipment management page, “Arrange Outbound" is available now.', '', {
              type: 'success',
              callback: action => {
                this.$emit('success')
              }
            })
          } else {
            this.$message(res.errorMessage)
          }
        }).catch(err => {this.submitLoading = false})
      })
    },
    getWormirCompanyMsg() {
      this.$request({
        url: '/user/getWormirCompanyMsg.do',
        method: 'post',
        data: {}
      }).then((res) => {
        if (res.errorCode == 0) {
          this.domesticAuthorityCompanyMsg = res.data.domesticAuthorityCompanyMsg
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
    createNumWithRange,
  },
  created() {
    this.getWormirCompanyMsg()
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
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
  .selfAddTotal-col, .td-col-split {
    position: relative;

  &:after {
    margin-left: 0;
  }

  }
  .el-table--border::after, .el-table--group::after {
    width: 0;
  }
  .el-table::before{
    width: 0;
  }
</style>
