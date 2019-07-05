<template>
  <div style="width: 50%;margin: 20px">
    <div>账户余额: ￥{{ Number(ruleForm.accountBalance).toFixed(2) }}</div>
    <div style="margin: 20px">
      <el-button type="primary" @click="toWithdraw()">提现</el-button>
      <el-button type="primary" @click="toRecharge()">充值</el-button>
    </div>
    <el-dialog :visible.sync="payWindowVisible" width="30%">
      <div style="text-align: center;">账户余额: ￥{{ Number(ruleForm.accountBalance).toFixed(2) }}</div>
      <div class="warn-notice">
        <div>
          {{`请使用您绑定的${ruleForm.bankName}银行账号${ruleForm.bankCardNo}
          自行向吾蜜公司在农商行开通的总金户账户汇入足额金额。`}}
        </div>
        <div>账户户名：珠海市吾蜜电子商务有限责任公司</div>
        <div>银行账号：{{wormirBankAccount}}</div>
        <div>银行名称：广州农商银行</div>
        <div>转账后，请约15分钟后查询您账户余额的变化情况，足够余额扣款时可再次支付该笔款项。</div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="payWindowVisible=false">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      channelAccout: JSON.parse(window.localStorage.userData).account,
      wormirBankAccount: null,
      ruleForm: {},
      payWindowVisible: false,
    };
  },
  methods: {
    toWithdraw() {
      this.$router.push('/accountManagement/withdrawMoney')
    },
    toRecharge() {
      this.payWindowVisible = true
    }
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
