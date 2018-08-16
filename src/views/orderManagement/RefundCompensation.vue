<template>
  <div>
    <el-dialog :visible.sync="isDialogPayShow" width="450px">
      <el-form label-width="80px">
        <el-form-item :label="$t('payment.orderNo')">
          {{ 'xxxxxxx' }}
        </el-form-item>
        <el-form-item :label="$t('payment.balance')">
          {{balance || 0}}
        </el-form-item>
        <el-form-item :label="type">
          <el-input v-model="payMoney" required></el-input>
        </el-form-item>
        <el-form-item v-if="!isBalanceEnough">
          <p class="text-muted">{{$t('payment.tipBalanceNotEnough')}}</p>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelPay">{{$t('payment.cancel')}}</el-button>
          <el-button type="primary" @click="pay" v-if="isBalanceEnough">{{$t('payment.confirmPay')}}</el-button>
          <el-button type="primary" @click="toRecharge" v-else>{{$t('payment.toRecharge')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="isDialogRechargeShow" width="450px">
      <el-form label-width="80px">
        <el-form-item :label="$t('payment.balance')">
          {{balance}}
        </el-form-item>
        <el-form-item :label="$t('payment.rechargeMoney')">
          <el-input v-model="rechargeMoney" required
                    :placehoder="$t('payment.rechargeAtLease').replace('#rechargeMoney#', rechargeMoneyAtLease)"></el-input>
        </el-form-item>
        <el-form-item v-if="!isBalanceEnough">
          <p class="text-muted">{{$t('payment.tipBalanceNotEnough')}}</p>
        </el-form-item>
        <el-form-item>
          <el-button @click="quickPay">{{$t('payment.cancel')}}</el-button>
          <el-button type="primary" @click="recharge">{{$t('payment.confirmRecharge')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--充值失败-->
    <el-dialog :visible.sync="isDialogRechargeErrorShow" width="450px">
      <el-form label-width="80px">
        <el-form-item :label="$t('payment.rechargeMoney')">
          <el-input v-model="rechargeMoney"></el-input> <span class="text-danger">{{$t('payment.failRecharge')}}</span>
        </el-form-item>
        <el-form-item>
          <p class="text-muted">{{$t('payment.rechargeErrorTips')}}</p>
        </el-form-item>
        <el-form-item>
          <el-button>{{$t('payment.cancel')}}</el-button>
          <el-button type="primary" @click="retryRecharge">{{$t('payment.retryRecharge')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { pay, recharge } from '../../api/payment'

  export default {
    name: 'RefundCompensation',
    props: {
      order: Object
    },
    data() {
      return {
        balance: '',
        payMoney: '',
        rechargeMoney: '',
        isDialogPayShow: false,
        isBalanceEnough: true,
        isDialogRechargeShow: false,
        isDialogRechargeErrorShow: false
      }
    },
    computed: {
      rechargeMoneyAtLease() {
        return this.order.shouldPaid - this.balance
      },
      type() {
        return '退补款'
      }
    },
    methods: {
      open() {
        this.isDialogPayShow = true
      },
      async pay() {
        pay(this.payMoney).then(() => {
          this.$alert(this.$t('payment.paySuccess').replace('#balance#', this.balance)
            .replace('#orderNo#', this.order.orderNo), {
            confirmButtonText: this.$t('payment.getIt'),
            callback: action => {
              this.$emit('pay')
            }
          })
        })
      },

      cancelPay() {
        this.payMoney = ''
        this.isDialogPayShow = false
      },

      quickPay() {
        this.payMoney = ''
        this.rechargeMoney = ''
        this.isDialogPayShow = false
        this.isDialogRechargeShow = false
        this.$emit('close')
      },

      toRecharge() {
        this.isDialogPayShow = false
        this.isDialogRechargeShow = true
      },

      retryRecharge() {
        this.isDialogRechargeErrorShow = false
        this.isDialogRechargeShow = true
      },

      async recharge() {
        const { state, balance } = await recharge(this.rechargeMoney)

        if (state === 'success') {
          this.$confirm(this.$t('payment.rechargeSuccess').replace('#balance#', balance), {
            confirmButtonText: this.$t('table.yes'),
            cancelButtonText: this.$t('table.no'),
            type: 'success'
          }).then(() => {
            this.isDialogPayShow = true
          }).catch(() => {
            this.$emit('close')
          })
        } else {
          // 显示出错弹框
          this.isDialogRechargeErrorShow = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
