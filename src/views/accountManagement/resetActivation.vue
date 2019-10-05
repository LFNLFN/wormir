<template>
    <div style="padding:1em;">
        <div class="box_one" v-show="showone">
            <h3>提现界面</h3>
            <el-form
                :model="ruleForm"
                status-icon
                :rules="pwd_rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="选择子账户：" prop="account">
                    <span></span>
                </el-form-item>
                <el-form-item label="帐户余额：" prop="accountBalance">
                    <span></span>
                </el-form-item>
                <el-form-item label="提现金额：" prop="withDrawAmount">
                    <el-input>
                    <template slot="prepend">￥</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="提现手续费：">
                    <span>￥</span>
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
                    <el-button type="primary" >暂不</el-button>
                    <el-button type="primary" @click="submitWithdrawForm()">确认提现</el-button>
                </div>
            </el-form>
        </div>
        <div class="box_two" v-show="showtwo">
            <h3>解除绑定</h3>
            <el-form
                :model="ruleForm"
                status-icon
                :rules="pwd_rules"
                ref="ruleForm"
                label-width="110px"
                class="demo-ruleForm"
            >
                <el-form-item label="吾蜜子帐户：" prop="account">
                    <span></span>
                </el-form-item>
                <el-form-item label="帐户类型：" prop="accountBalance">
                    <span></span>
                </el-form-item>
                <el-form-item label="开户银行：" prop="withDrawAmount">
                    <span></span>
                </el-form-item>
                <el-form-item label="开户名称：">
                    <span></span>
                </el-form-item>
                <el-form-item label="银行帐号：">
                    <span></span>
                </el-form-item>
                <el-form-item label="银行预留手机号：">
                    <span></span>
                </el-form-item>
                <div class="dialogBottomButton-wrap">
                    <el-button type="primary" @click="cancelBind">确认解除</el-button>
                </div>
            </el-form>
        </div>
        <div class="box_three"  v-show="showthree">
            <h3>重新绑定银行帐号</h3>
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
                <el-form-item label="渠道帐户" prop>
                
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
                    <el-button type="primary" @click="submitForm()">确认绑定</el-button>
                    <!-- <el-button type="danger" @click="releaseBinding()">解除绑定</el-button> -->
                </el-form-item>
            </el-form>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            showone:true,
            showtwo:false,
            showthree:false,
            ruleForm:{}
        }
    },
    methods:{
        submitWithdrawForm(){
            this.$alert(
              `提现金额¥
            已转帐至你绑定的银行
            帐号，请查收。`,
                "",
              {
                confirmButtonText: "知道了",
                showClose: false,
                type: "success",
                callback: action => {
                  this.$alert(
                    `此次提现已支付手续费¥，请知悉。`,
                    "",
                    {
                      confirmButtonText: "知道了",
                      showClose: false,
                      type: "success",
                      callback: action => {
                          this.showone=false;
                          this.showtwo=true;
                        // this.$router.push(
                        //   `/accountManagement/accountActivation`
                        // );
                      }
                    }
                  );
                }
              }
            );
        },
        cancelBind(){
            this.$alert(
                    `吾蜜子帐户wormir000101已与银行帐号XXXXXXXXXXXXX解除绑定，请重新绑定银行帐号才能正常交易。`,
                    "",
                    {
                      confirmButtonText: "知道了",
                      showClose: false,
                      type: "success",
                      callback: action => {
                          this.showone=false;
                          this.showtwo=false;
                          this.showthree=true;
                        // this.$router.push(
                        //   `/accountManagement/accountActivation`
                        // );
                      }
                    }
                  );
        },
        submitForm(formName) {
            // this.$refs[formName].validate(valid => {
                // if (valid) {
                //     this.$request({
                //         url: "/channel/bindBankAccount.do",
                //         method: "post",
                //         data: this.ruleForm
                //     }).then(res => {
                //         if (res.errorCode == 0) {
                            this.wormirBankAccount = this.ruleForm.bankCardNo;
                            const str = `为重置激活账户，请使用开户银行：${
                            this.ruleForm.bankName
                            }，账号：${
                            this.ruleForm.bankCardNo
                            }自行向吾蜜公司在农商行开通的总金户账户准确汇入随机金额${Math.random().toFixed(
                            2
                            )}元：<br/>开户名称：广州吾蜜贸易有限责任公司;<br/>开户银行：广州农村商业银行股行有限公司华夏支行（CNAPS号：314581001006）<br/>银行账号：${
                            this.wormirBankAccount
                            }<p class="warn-notice">温馨提示：成功激活账户后，系统会有消息通知。</p>`;
                            this.$alert(str, "", {
                            confirmButtonText: "知道了",
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                            type: "success",
                            callback: action => {}
                            });
                //         }
                //     }).catch(err => {});
                // } else {
                //     return false;
                // }
            // });
        },
    }
}
</script>
<style lang="scss" scoped>
    .demo-ruleForm{
        width: 40%;
    }
    .demo-ruleForm .el-select, .demo-ruleForm .el-date-editor.el-input{
        width:100%;
    }
    .balance_txt{
        font-size: 14px;
    }
</style>