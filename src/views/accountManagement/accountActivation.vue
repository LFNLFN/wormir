<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm"
    >
      <!-- <el-form-item label="渠道帐户" prop>
        <span>{{ accout }}</span>
      </el-form-item> -->
      <el-form-item label="吾蜜子账户" prop>
      
      </el-form-item>
      <el-form-item label="账户类型" prop>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            label="吾蜜"
            value="1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户银行 " prop="bankName">
        <el-input v-model="ruleForm.bankName"></el-input>
      </el-form-item>
      <el-form-item label="开户名称" prop="bankAccountOwner">
        <el-input v-model="ruleForm.bankAccountOwner"></el-input>
      </el-form-item>
      <el-form-item label="银行账号" prop="bankCardNo">
        <el-input v-model="ruleForm.bankCardNo"></el-input>
      </el-form-item>
      <el-form-item label="银行预留手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <p class="warn-notice">提醒：1、开户银行请务必输入详细名称，不然无法实现转账绑定；<br/>2、一经绑定，一般贸易订货皆使用此账号交易，请慎填。</p>
        <el-button type="primary" @click="submitForm('ruleForm')">确认绑定</el-button>
        <!-- <el-button type="danger" @click="releaseBinding()">解除绑定</el-button> -->
      </el-form-item>
    </el-form>
    <!-- 缴纳保证金 -->
    <!-- <div style="margin: 20px">
      <el-button @click="payDeposit">缴纳保证金</el-button>
    </div> -->
    <!-- 激活金额到账时 -->
    <!-- <div style="margin: 20px">
      <el-button @click="activationMoneyReceive">激活金额到账</el-button>
    </div> -->
    <!--点击去付订金-->
    <el-dialog :visible.sync="payWindowVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center;">账户余额: ￥{{ accountResidual.toFixed(2) }}</div>
      <div style="text-align: center;">需支付保证金: ￥{{ depositAmount.toFixed(2) }}</div>
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
      <div
        slot="footer"
        class="dialog-footer"
        style="text-align: center"
        v-if="accountResidual >= depositAmount"
      >
        <el-button type="primary" @click="payWindowVisible=false">暂不</el-button>
        <el-button type="primary" @click="handlePaymentConfirm()">确认支付</el-button>
        <!-- <el-button type="primary" v-else @click="goRecharge()">去充值</el-button> -->
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center" v-else>
        <el-button type="primary" @click="payWindowVisible=false;$emit('close')">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accout: JSON.parse(window.localStorage.userData).account,
      depositAmount: 1000,
      accountResidual: 10000,
      payWindowVisible: false,
      wormirBankAccount: null,
      ruleForm: {
        account: JSON.parse(window.localStorage.userData).account,
        bankName: "",
        bankAddress: "",
        bankAccountOwner: "",
        bankCardNo: "",
        phone: ""
      },
      rules: {
        bankName: [{ required: true, message: "不能为空", trigger: "blur" }],
        bankAddress: [{ required: true, message: "不能为空", trigger: "blur" }],
        bankAccountOwner: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        bankCardNo: [{ required: true, message: "不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    activationMoneyReceive() {
      if (JSON.parse(window.localStorage.userData).accountSign == "dlqd") {
        const str = `合作伙伴，您的账户已激活，请尽快交纳保证金后开始对接开通订货功能。『吾蜜公司』<br/><span class="text-muted">2019-06-28 19：53：49</span>`;
        this.$alert(str, "", {
          confirmButtonText: "知道了",
          showClose: false,
          dangerouslyUseHTMLString: true,
          type: "success",
          callback: action => {
            this.logout();
          }
        });
      } else if (
        JSON.parse(window.localStorage.userData).accountSign == "fxqd"
      ) {
        const str = `合作伙伴，您的账户已激活，请尽快开通首个子渠道后开始对接开通订货功能。『吾蜜公司』<br/><span class="text-muted">2019-06-28 19：53：49</span>`;
        this.$alert(str, "", {
          confirmButtonText: "知道了",
          showClose: false,
          dangerouslyUseHTMLString: true,
          type: "success",
          callback: action => {
            this.logout();
          }
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$request({
            url: "/channel/bindBankAccount.do",
            method: "post",
            data: this.ruleForm
          })
            .then(res => {
              if (res.errorCode == 0) {
                this.wormirBankAccount = this.ruleForm.bankCardNo;
                const str = `为激活您的账户，请使用已绑定的${
                  this.ruleForm.bankName
                }银行账号${
                  this.ruleForm.bankCardNo
                }自行向吾蜜公司在农商行开通的总金户账户准确汇入随机金额${Math.random().toFixed(
                  2
                )}元：<br/>账户户名：广州吾蜜贸易有限责任公司;<br/>银行账号：${
                  this.wormirBankAccount
                }<p class="warn-notice">温馨提示：成功激活账户后，系统会有消息通知。</p>`;
                this.$alert(str, "", {
                  confirmButtonText: "知道了",
                  dangerouslyUseHTMLString: true,
                  showClose: false,
                  type: "success",
                  callback: action => {}
                });
              }
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    releaseBinding() {
      // 解除绑定，理解为清除绑定银行数据
      this.$confirm("确定解除绑定该银行账户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$request({
            url: "/user/deleteChannelBindingBankInfo.do",
            method: "post",
            data: {
              account: JSON.parse(window.localStorage.userData).account
            }
          }).then(res => {
            if (res.errorCode == 0) {
              this.$alert(
                `渠道账户${this.accout}已与${
                  this.ruleForm.bankName
                }银行账号${
                  this.ruleForm.bankCardNo
                }解除绑定，请重新绑定银行帐号才能正常订货。`,
                "",
                {
                  confirmButtonText: "知道了",
                  showClose: false,
                  type: "success",
                  callback: action => {
                    this.ruleForm = {
                      account: JSON.parse(window.localStorage.userData).account,
                      bankName: "",
                      bankAddress: "",
                      bankAccountOwner: "",
                      bankCardNo: "",
                      phone: ""
                    };
                  }
                }
              );
            }
          });
        })
        .catch(() => {});
    },
    payDeposit() {
      this.payWindowVisible = true;
    },
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
.demo-ruleForm .el-select, .demo-ruleForm .el-date-editor.el-input{
    width:100%;
}
</style>
