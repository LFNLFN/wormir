<template>
    <div style="padding:1em;">
        <div class="box_one" v-show="showbox">
            <el-form label-width="100px" status-icon class="demo-ruleForm">
                <el-form-item label="选择子账户：" prop>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        key="1"
                        label="吾密"
                        value="1">
                        </el-option>
                        <el-option
                        key="2"
                        label="微米"
                        value="2">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="帐户余额：" prop>
                    <div class="balance_txt">0.00</div>
                </el-form-item>
            </el-form>
            <div class="">
                <el-button class="" type="primary" @click="toWithdraw">提现</el-button>
                <el-button class="" type="primary" @click="toRecharge">充值</el-button>
            </div>
        </div>
        <div class="box_two" v-show="withdraw_box">
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
        <el-dialog :visible.sync="payWindowVisible" width="30%">
            <div style="text-align: center;">吾蜜子账户：</div>
            <div style="text-align: center;">账户余额: ￥{{ Number(ruleForm.accountBalance).toFixed(2) }}</div>
            <div class="warn-notice">
                <div>{{`温馨提醒：请使用您绑定的${ruleForm.bankName}银行账号${ruleForm.bankCardNo}
                自行向吾蜜公司在农商行开通的总金户账户汇入足额金额。`}}</div>
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
    data(){
        return{
            channelAccout: JSON.parse(window.localStorage.userData).account,
            wormirBankAccount: null,
            ruleForm: {},
            payWindowVisible: false,
            withdraw_box:false,
            showbox:true
        }
    },
    methods:{
        toRecharge() {
            this.payWindowVisible = true
        },
        toWithdraw(){
            this.withdraw_box=true;
            this.showbox=false;
        },
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
                        // this.$router.push(
                        //   `/accountManagement/accountActivation`
                        // );
                      }
                    }
                  );
                }
              }
            );
        }
    },
    created(){
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
            console.log(this.ruleForm)
        }
        });
    }
}
</script>

<style lang="scss" scoped>
    .demo-ruleForm{
        width: 40%;
    }
    // .demo-ruleForm .el-select, .demo-ruleForm .el-date-editor.el-input{
    //     width:100%;
    // }
    .balance_txt{
        font-size: 14px;
    }
</style>