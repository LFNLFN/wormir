<template>
  <div style="width: 50%;margin: 20px">
    <div>账户余额: ￥{{ accountResidual.toFixed(2) }}</div>
    <div>需支付保证金: ￥{{ depositAmount.toFixed(2) }}</div>
    <div class="warn-notice" v-if="accountResidual < depositAmount">
      <div>
        {{ `温馨提醒：账户余额不足 ，未能支付该笔款项。
        请使用您绑定的${ruleForm.bankName}银行账号${ruleForm.bankCardNo}
        自行向吾蜜公司在农商行开通的总金户账户汇入足额金额。` }}
      </div>
      <div>账户户名：珠海市吾蜜电子商务有限责任公司</div>
      <div>银行账号：{{wormirBankAccount}}</div>
      <div>银行名称：广州农商银行</div>
      <div>转账后，请约15分钟后查询您账户余额的变化情况，足够余额扣款时可再次支付该笔款项。</div>
    </div>
    <div v-if="accountResidual >= depositAmount">
      <el-button type="primary" @click="handlePaymentConfirm()">确认支付</el-button>
      <!-- <el-button type="primary" v-else @click="goRecharge()">去充值</el-button> -->
    </div>
    <!-- <div slot="footer" class="dialog-footer" style="text-align: center" v-else>
      <el-button type="primary" @click="payWindowVisible=false;$emit('close')">知道了</el-button>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      channelAccout: JSON.parse(window.localStorage.userData).account,
      depositAmount: 1000,
      accountResidual: 100,
      wormirBankAccount: null,
      ruleForm: {},
    };
  },
  methods: {
    handlePaymentConfirm() {
      this.$confirm(
        "已完成支付，当前帐户余额¥ XXXXXX。“帐户管理-帐户信息-订货功能”已进入“待开通”状态，待完成系统对接开通订货功能后，将以系统消息和短信告知。",
        "",
        {
          confirmButtonText: "去看看",
          cancelButtonText: "知道了",
          showClose: false,
          type: "success"
        }
      )
        .then(() => {
          this.$router.push(`/accountManagement/accountMsg`);
        })
        .catch(() => {
          this.payWindowVisible = false;
        });
    },
  },
  created() {
    // 获取吾蜜银行信息
    this.$request({
      url: "/user/getWormirBankInfo.do",
      method: "post",
      data: {}
    }).then(res => {
      if (res.errorCode == 0) {
        this.wormirBankAccount = res.data.swiftCodeZh;
      }
    });
    // 获取已绑定的银行账户信息
    this.$request({
      url: "/user/getChannelBindingBankInfo.do",
      method: "post",
      data: {
        account: JSON.parse(window.localStorage.userData).account
      }
    }).then(res => {
      if (res.errorCode == 0) {
        this.ruleForm = res.data;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  width: 50%;
  margin: 20px;
}
</style>
