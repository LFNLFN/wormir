<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="" style="margin-bottom: 0">
        <div>提示：订购者或申请人手机号只作为激活验证功能，手持商品的非订购者或申请人的手机号皆可进行验证。</div>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model.number.lazy="form.phoneNum"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="verifyCode">
        <el-input v-model="form.verifyCode">
          <el-button slot="append" v-if="isFirstTimeReceiveSuccess" type="primary" @click="receiveVerifyCode()">获取
          </el-button>
          <el-button slot="append" v-else type="primary" @click="receiveVerifyCode()">重发</el-button>
        </el-input>
        <div v-if="isReceivingVerifyCode">
          剩余 {{ countTime }}S 发送至您手机
        </div>
        <div v-if="isTimeout">
          请求验证码超时，请重新获取验证码。
        </div>
      </el-form-item>

      <el-form-item label="">
        <el-checkbox v-model="isChangeBottomPage">更换底页</el-checkbox>
        <div v-if="isChangeBottomPage">
          <div class="el-upload__tip">提示：只能上传jpg/png文件，且不超过2MB</div>
          <el-upload
            ref="uploadBottomPage"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :file-list="bottomPageFileList"
            :auto-upload="false"
            :before-upload="beforeBottomPageUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange">
            <i class="el-icon-plus"></i>
          </el-upload>
          <p>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </p>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isFirstTimeReceiveSuccess: true,
        isReceivingVerifyCode: false,
        isChangeBottomPage: false,
        isTimeout: false,
        countTime: 1,
        form: {
          phoneNum: null,
          VerifyCode: null,
        },
        rules: {
          phoneNum: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度应为11个字符', trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
//            { min: 11, max: 11, message: '长度应为11个字符', trigger: 'blur' }
          ],
        },
        dialogImageUrl: '',
        dialogVisible: false,
        bottomPageFileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      receiveVerifyCode() {
        this.isReceivingVerifyCode = true
        this.isTimeout = false
        const countingClock = window.setInterval(() => {
          if (this.countTime > 0) {
            this.countTime -= 1
          } else {
            window.clearInterval(countingClock)
            if (this.countTime < 1) {
              this.isTimeout = true
              this.isReceivingVerifyCode = false
              this.isFirstTimeReceiveSuccess = false
            }
            else {
              this.isReceivingVerifyCode = false
            }
            this.countTime = 1
          }
        }, 1000)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      beforeBottomPageUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleChange(file, fileList) {
        // 对上传文件列表的控制
        this.fileList3 = fileList.slice(-3);
      },
      submitUpload() {
        this.$refs.uploadBottomPage.submit()
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
