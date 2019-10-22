<template>
    <div style="padding:1em;">
        <div class="pay_tit">设置支付密码</div>
        <div class="pay_box1" v-show="showCode">
            <el-input placeholder="输入验证码" v-model="input5" class="input-with-select">
                <el-button slot="append" type="primary":disabled="disabled" @click="getCode">{{CodeText}}</el-button>
            </el-input>
            <el-button class="submit_btn1" @click="submit1" type="primary">确认</el-button>
        </div>
        <div class="pay_box2" v-show="showPass">
            <el-form 
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                >
                <el-form-item label="输入密码 " prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码 " prop="surepassword">
                    <el-input v-model="ruleForm.surepassword" type="password"></el-input>
                </el-form-item>
            </el-form>
            <el-button class="submit_btn1" type="primary" @click="submit2">确认</el-button>
        </div>
    </div>
</template>

<script>
const TIME_COUNT = 60;
export default {
    data(){
        return{
            disabled:false,
            CodeText:'获取验证码',
            showCode:true,
            showPass:false,
            ruleForm:{
                password:'',
                surepassword:''
            },
            input5:'',
            rules: {
                password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
                surepassword: [{ required: true, message: "与密码不一致", trigger: "blur" }]
            },
            timer_v: null,
        }
    },
    methods:{
        submit1(){
            this.showCode=false;
            this.showPass=true;
        },
        submit2(){
            this.$alert('支付密码已设置完毕，泄露密码会影响资金安全，请妥善保管支付密码。', '', {
            confirmButtonText: '确定',
            showClose: false,
            center: true,
            type: "success",
            callback: action => {
            }
            });
        },
        getCode(){
            let _this=this;
            if (!_this.timer_v) {
                _this.CodeText = TIME_COUNT;
                _this.disabled = true;
                _this.timer_v = setInterval(() => {
                    if (_this.CodeText > 0 && _this.CodeText <= TIME_COUNT) {
                        _this.CodeText--+'s';
                    } else {
                        _this.disabled = false;
                        clearInterval(_this.timer_v);
                        _this.timer_v = null;
                        _this.CodeText="获取验证码"
                    }
                }, 1000)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .pay_tit{
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }
    .pay_box1, .pay_box2{
        max-width: 600px;
        margin:20px auto;
        text-align: center;
    }
    .submit_btn1{
        margin-top: 20px;
    }
</style>