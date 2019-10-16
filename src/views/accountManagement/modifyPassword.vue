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
            <el-form-item label="原密码" prop="oldPassword">
                <el-input
                    type="password"
                    v-model="modifyPWD_ruleForm.oldPassword"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input
                    type="password"
                    v-model="modifyPWD_ruleForm.newPassword"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="affirmPassword">
                <el-input
                    type="password"
                    v-model="modifyPWD_ruleForm.affirmPassword"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <!-- <el-form-item label="" prop>
                <p class="text-muted">温馨提示：请设置6位数字的密码。</p>
            </el-form-item> -->
            <div class="dialogBottomButton-wrap">
                <el-button type="primary" @click="submitModPasswordForm('modifyPWD_ruleForm')">确认提交</el-button>
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
        account: null,
        oldPassword: null,
        newPassword: null,
        affirmPassword: null
      },
      pwd_rules: {
        account: null,
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
      if(this.modifyPWD_ruleForm.oldPassword=='' || this.modifyPWD_ruleForm.oldPassword==null){
        this.$message.error('原密码不能为空！')
        return false;
      }
      if(this.modifyPWD_ruleForm.newPassword=='' || this.modifyPWD_ruleForm.newPassword==null){
        this.$message.error('新密码不能为空！')
        return false;
      }
      if(this.modifyPWD_ruleForm.newPassword!==this.modifyPWD_ruleForm.affirmPassword){
        this.$message.error('两次输入密码不一致!')
        return false;
      }
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
</style>
