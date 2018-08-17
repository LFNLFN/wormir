<template>
  <div>
    <el-row :gutter="5" class="mb20">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">支付合并单号</div></el-col>
      <el-col :span="21" align="left"><div class="grid-content bg-purple">{{order.channelNo}}</div></el-col>
    </el-row>

    <bill-detail-merge-order v-for="item in order.orders" :bill="item" :key="item.orderNo" class="mb20"></bill-detail-merge-order>

    <el-row :gutter="5">
      <el-col :span="18" align="left" v-if="type !== 0"><div class="grid-content bg-purple text-danger">{{billTime}}</div></el-col>
      <el-col :span="4" align="right"><div class="grid-content bg-purple text-danger">{{payment}}</div></el-col>
      <el-col :span="2" align="center"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="5" align="center"><div class="grid-content bg-purple">{{$t('order.beneficiaryBankSWIFITCode')}}</div></el-col>
      <el-col :span="7" align="right"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('order.beneficiaryBankName')}}</div></el-col>
      <el-col :span="3" align="right"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('order.beneficiaryBankAddress')}}</div></el-col>
      <el-col :span="3" align="right"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="5" align="center"><div class="grid-content bg-purple">{{$t('order.remittingBankSWIFITCode')}}</div></el-col>
      <el-col :span="7" align="right"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('order.remittingBankName')}}</div></el-col>
      <el-col :span="3" align="right"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('order.remittingBankAddress')}}</div></el-col>
      <el-col :span="3" align="right"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <!--确认并单-->
    <p class="text-danger" v-if="type === 0">{{$t('mergeRefundOrders.mergeConfirmTips')}}</p>


  </div>
</template>

<script>
  import BillDetailMergeOrder from './BillDetailMergeOrder'

  export default {
    name: 'BillDetailMergeOrders',
    components: { BillDetailMergeOrder },
    props: {
      order: {
        type: Object,
        default: () => {
          return { orders: [{}, {}] }
        }
      }
    },
    data() {
      return {
        type: ''
      }
    },
    computed: {
      billTime() {
        if (this.order.type === '并单确认') return ''

        if (this.order.type === '支付货款') {
          const submitTime = this.$t('mergeRefundOrders.submitTime') + this.order.submitTime

          if (this.order.state === '待付款并单') return submitTime

          const payTime = this.$t('mergeRefundOrders.payTime') + this.order.payTime

          if (this.order.state === '待确认到账并单') return submitTime + '; ' + payTime

          const confirmTime = this.$t('mergeRefundOrders.confirmTime') + this.order.confirmTime

          if (this.order.state === '货款到账并单') return `${submitTime}; ${payTime}; ${confirmTime}`
        }

        if (this.order.type === '收到退款') {
          const mergeTime = this.$t('receivedRefund.mergeRefundOrderTime') + this.order.mergeRefundOrderTime

          if (this.order.state === '待付款') return mergeTime

          const refundTime = this.$t('mergeRefundOrders.refundPaymentTime') + this.order.refundTime

          if (this.order.state === '已付款') return mergeTime + '; ' + refundTime
        }

        if (this.order.type === '查收货款') {
          if (this.order.state === '确认到帐前') return this.$t('order.paymentPaid')
          if (this.order.state === '确认到帐后') return this.$t('order.receivedPayment')
        }
      },

      payment() {
        if (this.order.type === '待确认到账') return this.$t('payOrder.paidPayment')
        if (this.order.type === '货款到账并单') return this.$t('payOrder.receivedPayment')

        return this.$t('order.unpaidResidualPayment')
      }
    }
  }
</script>

<style scoped>
.el-table .cell {
  word-break: break-word;
}
</style>
