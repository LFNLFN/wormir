<template>
    <div style="padding:1em;">
        <div class="box_one" v-show="showone">
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
                    <el-button type="primary">确认解除</el-button>
                </div>
            </el-form>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            showone:true,
            showtwo:false
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