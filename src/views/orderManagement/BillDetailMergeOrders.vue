<template>
  <div>
    <el-row :gutter="5" class="mb20">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.retailerNo')}}</div></el-col>
      <el-col :span="21" align="left"><div class="grid-content bg-purple">xxxxxxx</div></el-col>
    </el-row>

    <bill-detail-merge-order v-for="item in bill.orders" :bill="item" :key="item.orderNo" class="mb20"></bill-detail-merge-order>

    <el-row :gutter="5">
      <el-col :span="18" align="left" v-if="type !== 0"><div class="grid-content bg-purple text-danger">{{billTime}}</div></el-col>
      <el-col :span="4" align="right"><div class="grid-content bg-purple text-danger">{{payment}}</div></el-col>
      <el-col :span="2" align="center"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="5" align="center"><div class="grid-content bg-purple">{{$t('bill.receivables')}}</div></el-col>
      <el-col :span="7" align="right"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.bank')}}</div></el-col>
      <el-col :span="3" align="right"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.bankAddress')}}</div></el-col>
      <el-col :span="3" align="right"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="5" align="center"><div class="grid-content bg-purple">{{$t('bill.remittance')}}</div></el-col>
      <el-col :span="7" align="right"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.bank')}}</div></el-col>
      <el-col :span="3" align="right"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.bankAddress')}}</div></el-col>
      <el-col :span="3" align="right"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <!--确认并单-->
    <p class="text-danger" v-if="type === 0">{{$t('mergeRefundOrders.mergeConfirmTips')}}</p>


  </div>
</template>

<script>
  import BillDetailMergeOrder from './BillDetailMergeOrder'

  export default {
    name: "BillDetailMergeOrders",
    components: { BillDetailMergeOrder },
    props: {
      bill: {
        type: Object,
        default: () => {
          return {orders: [{},{}]}
        }
      },
    },
    data() {
      return {
        type: ""
      }
    },
    computed: {
      billTime() {
        if(this.bill.type === '并单确认') return ''

        if(this.bill.type === '支付货款') {
          let submitTime = this.$t('mergeRefundOrders.submitTime') + this.order.submitTime

          if(this.bill.state === '待付款并单') return submitTime

          let payTime = this.$t('mergeRefundOrders.payTime') + this.order.payTime

          if(this.bill.state === '待确认到账并单') return submitTime + '; ' + payTime

          let confirmTime = this.$t('mergeRefundOrders.confirmTime') + this.order.confirmTime

          if(this.bill.state === '货款到账并单') return `${submitTime}; ${payTime}; ${confirmTime}`
        }

        if(this.bill.type === '收到退款') {
          let mergeTime = this.$t('receivedRefund.mergeRefundOrderTime') + this.order.mergeRefundOrderTime

          if(this.bill.state === '待付款') return mergeTime

          let refundTime = this.$t('mergeRefundOrders.refundPaymentTime') + this.order.refundTime

          if(this.bill.state === '已付款') return mergeTime + '; ' + refundTime
        }

      },

      payment() {
        if(this.bill.type === '待确认到账') return this.$t('payOrder.paidPayment')
        if(this.bill.type === '货款到账并单') return this.$t('payOrder.receivedPayment')

        return this.$t('bill.unpaidResidualPayment')
      }
    }
  }
</script>

<style scoped>

</style>
