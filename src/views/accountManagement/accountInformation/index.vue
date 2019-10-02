<template>
    <div>
        <!--修改密码弹层-->
        <el-form
            :model="modifyPWD_ruleForm"
            status-icon
            :rules="pwd_rules"
            ref="modifyPWD_ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="吾蜜账户" prop="account">
                <el-input
                    type="text"
                    v-model="modifyPWD_ruleForm.account"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="账户姓名" prop="name">
                <el-input
                    type="text"
                    v-model="modifyPWD_ruleForm.name"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
                <el-input
                    type="text"
                    v-model="modifyPWD_ruleForm.mobile"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <!-- <el-input
                    type="text"
                    v-model="modifyPWD_ruleForm.sex"
                    autocomplete="off"
                ></el-input> -->
                <el-select v-model="modifyPWD_ruleForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <!-- <el-input
                    type="text"
                    v-model="modifyPWD_ruleForm.birthday"
                    autocomplete="off"
                ></el-input> -->
                <el-date-picker
                    v-model="modifyPWD_ruleForm.birthday"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="工作部门" prop="department">
                <el-input
                    type="text"
                    v-model="modifyPWD_ruleForm.department"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="工作职位" prop="job">
                <el-input
                    type="text"
                    v-model="modifyPWD_ruleForm.job"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="email">
                <el-input
                    type="text"
                    v-model="modifyPWD_ruleForm.email"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
                <el-input
                    type="text"
                    v-model="modifyPWD_ruleForm.address"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <!-- <el-form-item label="" prop>
                <p class="text-muted">温馨提示：请设置6位数字的密码。</p>
            </el-form-item> -->
            <div class="dialogBottomButton-wrap">
                <el-button type="primary" >确认保存</el-button>
                <!-- @click="submitModPasswordForm('modifyPWD_ruleForm')" -->
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请输入密码"));
      } else if (!(value / 1 + 1 > 0) || value.length != 7) {
        callback(new Error("请输入7位数字密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请输入密码"));
      } else if (value !== this.modifyPWD_ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      account: JSON.parse(window.localStorage.userData).account,
      modifyPWD_ruleForm: {
        account: '',
        name:'',
        mobile:'',
        sex:'',
        birthday:'',
        department:'',
        job:'',
        email:'',
        address:''
      },
      pwd_rules: {
        account:  [
          { message: '请输入账号', required: true, trigger: "blur" }
        ],
        name:[
            { message: '请输入账户姓名', required: true, trigger: "blur" }
        ],
        mobile:[
            { message: '请输入手机号码', required: true, trigger: "blur" }
        ],
        mobile:[
            { message: '请输入手机号码', required: true, trigger: "blur" }
        ],
        sex:[
            { message: '请选择性别', required: true, trigger: "change" }
        ],
        birthday:[
            { message: '请选择生日', required: true, trigger: "change" }
        ],
        department:[
            { message: '请输入工作部门', required: true, trigger: "blur" }
        ],
        job:[
            { message: '请输入工作职位', required: true, trigger: "blur" }
        ],
        email:[
            { message: '请输入联系邮箱', required: true, trigger: "blur" }
        ],
        oldPassword: [
          { validator: validatePass, required: true, trigger: "blur" }
        ],
        newPassword: [
          { validator: validatePass, required: true, trigger: "blur" }
        ],
        affirmPassword: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交修改的重置密码
    submitModPasswordForm() {
      this.$request({
        url: "/brand/modifyAccountPassword.do",
        method: "post",
        data: {
          account: this.account,
          password: this.modifyPWD_ruleForm.affirmPassword,
          oldPassword: this.modifyPWD_ruleForm.oldPassword
        }
      }).then(res => {
        if (res.errorCode == 0) {
          this.$alert("密码已修改成功，请使用新密码重新登录。", "", {
            confirmButtonText: "重新登录",
            showClose: false,
            center: true,
            type: "success",
            callback: action => {
              this.logout();
            }
          });
        } else if (res.errorCode == -1) {
            this.$message.error(res.errorMessage)
        }
      });
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  width: 40%;
  margin: 20px;
}
.demo-ruleForm .el-select, .demo-ruleForm .el-date-editor.el-input{
    width:100%;
}

</style>
