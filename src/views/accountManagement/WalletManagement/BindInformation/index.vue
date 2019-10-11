<template>
    <div  style="padding:1em;">
        <div class="bind_box">
            <h3 class="form-part-title">子账户绑定信息</h3>
            <el-form class="pad_box" v-for="(i,index) in accountList" >
                <el-form-item label="吾蜜子账户" label-width="130px" prop="identityCardNo" class="form-row idCardCode last-form-row">
                    <span>{{i.sub_account}}</span>
                </el-form-item>
                <el-form-item label="帐户类型" label-width="130px" class="form-row" prop="businessEntity">
                    <span>{{i.account_type}}</span>
                </el-form-item>
                <el-form-item label="开户银行" label-width="130px" class="form-row idCardCode" prop="companyName">
                    <span>{{i.bank}}</span>
                </el-form-item>
                <el-form-item label="开户名称" label-width="130px" class="form-row idCardCode last-form-row" prop="companyProfile">
                    <span>{{i.account_name}}</span>
                </el-form-item>
                <el-form-item label="银行帐号" label-width="130px" class="form-row idCardCode last-form-row" prop="companyProfile">
                    <span>{{i.bank_account}}</span>
                </el-form-item>
                <el-form-item label="银行预留手机号" label-width="130px" class="form-row idCardCode last-form-row" prop="companyProfile">
                    <span>{{i.bank_mobile}}</span>
                </el-form-item>
            </el-form>
            <!-- <el-form class="pad_box">
                <el-form-item label="吾蜜子账户" label-width="130px" prop="identityCardNo" class="form-row idCardCode last-form-row">
                    <span>wormir000102</span>
                </el-form-item>
                <el-form-item label="帐户类型" label-width="130px" class="form-row" prop="businessEntity">
                    <span>扣费帐户</span>
                </el-form-item>
                <el-form-item label="开户银行" label-width="130px" class="form-row idCardCode" prop="companyName">
                    <span>中国银行</span>
                </el-form-item>
                <el-form-item label="开户名称" label-width="130px" class="form-row idCardCode last-form-row" prop="companyProfile">
                    <span>xxxxx</span>
                </el-form-item>
                <el-form-item label="银行帐号" label-width="130px" class="form-row idCardCode last-form-row" prop="companyProfile">
                    <span>xxxxx</span>
                </el-form-item>
                <el-form-item label="银行预留手机号" label-width="130px" class="form-row idCardCode last-form-row" prop="companyProfile">
                    <span>1360****5678</span>
                </el-form-item>
            </el-form> -->
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            radio:1,
            accountList:[]
        }
    },
    methods:{
        getData(){
            var self = this;  
            var qs = require('qs');  
            self.$http.post('/subAccount/subAccount', qs.stringify({}))  //这里的/user/login即在mock.js中自定义的url
                .then(function (res) {
                    console.log(res)
                    self.accountList=res.data.accountList;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
    },
    created() {
        this.getData();
    },
}
</script>
<style lang="scss" scoped>
    .bind_tit{
        font-size: 18px;
        font-weight:bold;
        margin-bottom:20px;
    }
    .bind_txt{
        font-size: 14px;
    }
    .bind_box .el-form-item--mini.el-form-item{
        margin:0;
    }
    .pad_box{
        margin-bottom:2em;
        width:50%;
    }
</style>