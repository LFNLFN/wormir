<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <div class="title">吾蜜OCC供应管理系统</div>
        <!--<lang-select class="set-language"></lang-select>-->
      </div>
      <div class="login-input-wrap">
        <el-form-item prop="username">
        <span class="svg-container svg-container_login username-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input name="username" type="text" v-model.trim="loginForm.username" autoComplete="on" placeholder="账号" />
        </el-form-item>

        <el-form-item prop="password">
        <span class="svg-container password-container">
          <svg-icon icon-class="password" />
        </span>
          <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model.trim="loginForm.password" autoComplete="on" placeholder="密码" />
          <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
        </el-form-item>

        <el-button type="primary" style="width:100%;margin:20px 0;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      </div>

    </el-form>
    <div class="copyright-wrap">
      <div class="logo-wrap">
        <img src="./login-page-logo.png" alt="" style="width: 230px;height: 230px">
      </div>
      <div style="height: 50px;border-left: 1px solid #fff;"></div>
      <div>
        <span>Copyright &#169; 2017-2019 Wormir. All Rights Reserved.</span><br/>
        <span>公司地址：中国广州市越秀区东风东路761号丽丰中心3402</span><br/>
        <span>备案号：粤ICP备18003953-1号</span><br/>
      </div>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'

export default {
  components: { LangSelect, SocialSign },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位数'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ required: true, trigger: 'change', validator: validateUsername }],
        password: [{ required: true, trigger: 'change', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #283443 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 80px auto 120px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container.username-container {
    padding-left: 7px;
  }
.svg-container.password-container {
  padding-left: 10px;
}
  .svg-container {
    /*padding: 6px 5px 6px 15px;*/
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 29px;
      font-weight: normal;
      color: $light_gray;
      margin: 20px auto 20px auto;
      text-align: center;
      letter-spacing: 3px;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 8px;
    top: 11px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}

.login-input-wrap {
  /*box-sizing: border-box;*/
  border: #5C6676 solid 2px;
  border-radius: 5px;
  padding: 20px 30px 0;
}

.login-input-wrap .login-container .el-input{
  background-color: rgba(0, 0, 0, 0.1)
}

  .copyright-wrap {
    width: 60%;
    margin: 650px auto 0;
    color: #ffffff;
    font-size: 12px;
    line-height: 1.5em;
    padding-top: 10px;
    display: flex;
    justify-content: space-around;
  }
  .logo-wrap {
    height: 80px;
    overflow: hidden;
  }
.logo-wrap img {
  margin-top: -86px;
}
</style>
