<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="pwd_rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="帐户余额" prop="accountBalance">
        <span>{{ ruleForm.accountBalanceSymbol }}{{ (ruleForm.accountBalance/1).toFixed(2) }}</span>
      </el-form-item>
      <el-form-item label="提现金额" prop="withDrawAmount">
        <el-input v-model.number.lazy="ruleForm.withDrawAmount">
          <template slot="prepend">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item label="提现手续费">
        <span>￥{{ handlingFee.toFixed(2) }}</span>
      </el-form-item>
      <div class="tips warn-notice" style="margin: 20px">
        <div>手续费说明</div>
        <div>1、提现至广州农商银行账户，0元/笔；</div>
        <div>2、跨行提现至其他银行账户，费用如下：</div>
        <div>（1）提现1万元以下（含1万元），5元/笔；</div>
        <div>（2）提现1万-10万元（含10万元），10元/笔；</div>
        <div>（3）提现10万-50万元（含50万元），15元/笔；</div>
        <div>（4）提现50万-100万元（含100万元），20元/笔</div>
        <div>（5）提现100万元以上，汇划金额的0.02‰</div>
        <div>（6）提现1000万元以上（含1000万），200元/笔，封顶</div>
      </div>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="submitWithdrawForm()">确认提现</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      channelAccount: JSON.parse(window.localStorage.userData).account,
      ruleForm: {
        accountBalance: 0,
        accountBalanceSymbol: "￥",
        withDrawAmount: 0,
        handlingFee: 0,
        bankCardNo: "",
        bankName: ""
      },
      pwd_rules: {
        withDrawAmount: [
          {
            validator: this.validateWithdrawInput,
            required: true,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    handlingFee() {
      let fee = 0;
      if (this.ruleForm.bankName.search("广州农商") != -1) {
        return fee;
      }
      let value = this.ruleForm.withDrawAmount;
      if (value <= 10000) {
        fee = 5;
      } else if (value <= 100000 && value > 10000) {
        fee = 10;
      } else if (value <= 500000 && value > 100000) {
        fee = 15;
      } else if (value <= 1000000 && value > 500000) {
        fee = 20;
      } else if (value > 1000000 && value <= 10000000) {
        fee = (value / 100000) * 2;
      } else if (value > 10000000) {
        fee = 200;
      }
      this.ruleForm.handlingFee = fee;
      return fee;
    }
  },
  methods: {
    validateWithdrawInput(rule, value, callback) {
      if (
        value / 1 >
        this.ruleForm.accountBalance / 1 - this.ruleForm.handlingFee / 1
      ) {
        callback(new Error("输入提现金额已超出账户余额"));
      } else if (!(value / 1 >= 0) || !value) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    },
    // 确认提现
    submitWithdrawForm() {
      (this.ruleForm.account = JSON.parse(
        window.localStorage.userData
      ).account),
        this.$request({
          url: "/channel/withdrawMoney.do",
          method: "post",
          data: this.ruleForm
        }).then(res => {
          if (res.errorCode == 0) {
            this.$alert(
              `提现金额¥${this.ruleForm.withDrawAmount.toFixed(2)}
          已转帐至你绑定的${this.ruleForm.bankName}银行
          帐号${this.ruleForm.bankCardNo}，请查收。`,
              "",
              {
                confirmButtonText: "知道了",
                showClose: false,
                type: "success",
                callback: action => {
                  this.$alert(
                    `此次提现已支付手续费¥${this.ruleForm.handlingFee.toFixed(
                      2
                    )}，请知悉。`,
                    "",
                    {
                      confirmButtonText: "知道了",
                      showClose: false,
                      type: "success",
                      callback: action => {
                        this.$router.push(
                          `/accountManagement/accountActivation`
                        );
                      }
                    }
                  );
                }
              }
            );
          } else if (res.errorCode == -1) {
            // this.$message.error(res.errorMessage);
          }
        });
    }
  },
  created() {
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
