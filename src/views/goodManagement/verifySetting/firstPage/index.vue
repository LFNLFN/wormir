<template>
  <div >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div style="display: flex;justify-content: flex-start">
        <div class="flex-item" style="width: 50%">
          <div class="h5_box" :style="{backgroundImage: 'url(' + form.bg + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center',backgroundSize:'100% 100%'}">
            <div class="top_ad_box" v-show="form.topAdList.length>0">
              <a :href="form.topAdJumpLink" class="img_box" v-for="(i,index) in form.topAdList" :key="index">
                <img :src="i.url" alt="">
              </a>
            </div>
            <div style="padding:1em;">
              <el-form-item label="" label-width="0" style="margin-bottom: 0">
              <div>提示：订购者或申请人手机号只作为激活验证功能，手持商品的非订购者或申请人的手机号皆可进行验证。</div>
              </el-form-item>
              <!-- class="form-row add-brand-row" -->
              <el-form-item label="手机号" >
                <el-input v-model.number.lazy="form.phoneNum" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <!-- form-row add-brand-row last-form-row -->
              <el-form-item label="验证码" class="">
                <el-input v-model="form.verifyCode" placeholder="请输入验证码">
                  <el-button slot="append" v-if="isFirstTimeReceiveSuccess" type="primary" @click="receiveVerifyCode()">获取</el-button>
                  <el-button slot="append" v-else type="primary" @click="receiveVerifyCode()">重发</el-button>
                </el-input>
              </el-form-item>
              <div v-if="isReceivingVerifyCode">
                剩余 {{ countTime }}S 发送至您手机
              </div>
              <div v-if="isTimeout">
                请求验证码超时，请重新获取验证码。
              </div>
              <el-form-item label-width="0">
                <div style="text-align: center">
                  <!-- @click="onSubmit" -->
                  <el-button type="primary"  style="width: 8em;margin-top: 10px">验证</el-button>
                </div>
              </el-form-item>
            </div>
            <div class="bottom_ad_box" v-show="form.bottomAdList.length>0">
              <a :href="form.bottomAdJumpLink" class="img_box" v-for="(i,index) in form.bottomAdList" :key="index">
                <img :src="i.url" alt="">
              </a>
            </div>
          </div>
        </div>

        <!--右边灵活组合选项-->
        <div class="flex-item" style="width: 50%">

          <el-form-item label="">
            <el-checkbox v-model="isChangeBottomPage">更换底页</el-checkbox>
            <div v-if="isChangeBottomPage">
              <!--  :limit="1" list-type="picture-card"-->
              <div class="el-upload__tip">提示：只能上传jpg/png文件，且不超过2MB</div>
              <el-upload
                class="avatar-uploader"
                ref="uploadBottomPage"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                :limit="1"
                :file-list="bottomPageFileList"
                list-type="picture-card"
                :before-upload="beforeBottomPageUpload"
                :on-preview="handleBottomPagePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleChange">
                <i class="el-icon-plus"></i>
              </el-upload>
              <!-- <p>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUploadBottomPage">
                  上传到服务器
                </el-button>
              </p> -->
              <el-dialog :visible.sync="bottomPagePreviewVisible" append-to-body>
                <img width="100%" :src="bottomPagePreviewUrl" alt="">
              </el-dialog>
            </div>
          </el-form-item>

          <el-form-item label="">
            <el-checkbox v-model="isAddTopAd">增加顶部广告</el-checkbox>
            <div v-if="isAddTopAd">
              <el-form-item label="跳转链接" class="form-row add-brand-row last-form-row">
                <el-input v-model.lazy="form.topAdJumpLink" placeholder="请输入"></el-input>
              </el-form-item>
              <div class="el-upload__tip">提示：只能上传jpg/png文件，且不超过2MB</div>
              <el-upload
                ref="uploadTopAd"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :file-list="topAdFileList"
                :auto-upload="false"
                :limit="1"
                :before-upload="beforeTopAdUpload"
                :on-preview="handleTopAdPictureCardPreview"
                :on-remove="handleRemoveTop"
                :on-change="handleChangeTop">
                <i class="el-icon-plus"></i>
              </el-upload>
              <!-- <p>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUploadTopAd">上传到服务器
                </el-button>
              </p> -->
              <el-dialog :visible.sync="topAdPreviewVisible" append-to-body>
                <img width="100%" :src="topAdPreviewUrl" alt="">
              </el-dialog>
            </div>
          </el-form-item>

          <el-form-item label="">
            <el-checkbox v-model="isAddBottomAd">增加底部广告</el-checkbox>
            <div v-if="isAddBottomAd">
              <el-form-item label="跳转链接" class="form-row add-brand-row last-form-row">
                <el-input v-model.lazy="form.bottomAdJumpLink" placeholder="请输入 "></el-input>
              </el-form-item>
              <div class="el-upload__tip">提示：只能上传jpg/png文件，且不超过2MB</div>
              <el-upload
                ref="uploadBottomAd"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :file-list="bottomAdFileList"
                :auto-upload="false"
                :limit="1"
                :before-upload="beforeBottomAdUpload"
                :on-preview="handleBottomAdPictureCardPreview"
                :on-remove="handleRemoveBottom"
                :on-change="handleChangeBottom">
                <i class="el-icon-plus"></i>
              </el-upload>
              <!-- <p>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUploadBottomAd">上传到服务器
                </el-button>
              </p> -->
              <el-dialog :visible.sync="bottomAdPreviewVisible" append-to-body>
                <img width="100%" :src="bottomAdPreviewUrl" alt="">
              </el-dialog>
            </div>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary" @click="preview">预览</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>


        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        coustyle:{background:''},
        isFirstTimeReceiveSuccess: true,
        isReceivingVerifyCode: false,
        isChangeBottomPage: false,
        isTimeout: false,
        countTime: 1,
        isAddTopAd: false,
        isAddBottomAd: false,
        form: {
          phoneNum: '',
          VerifyCode: '',
          topAdJumpLink: '',
          bottomAdJumpLink: '',
          topAdList:[],
          bottomAdList:[],
          bg:''
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
        bottomPagePreviewUrl: '',
        bottomPagePreviewVisible: false,
        bottomPageFileList: [
          // {
          //   name: 'food.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
          // {
          //   name: 'food2.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }
        ],
        topAdPreviewUrl: '',
        topAdPreviewVisible: false,
        topAdFileList: [
          // {
          //   name: 'food.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
          // {
          //   name: 'food2.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }
        ],
        bottomAdPreviewUrl: '',
        bottomAdPreviewVisible: false,
        bottomAdFileList: [
          // {
          //   name: 'food.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
          // {
          //   name: 'food2.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }
        ]
      }
    },
    methods: {
      getData(){
        let _this=this;
        var qs = require('qs');  
        _this.$http.post('/firstPage/firstPage', qs.stringify({}))
        .then(function(res){
          console.log(res)
          _this.form.topAdJumpLink=res.data.data.topAdJumpLink;
          _this.form.bottomAdJumpLink=res.data.data.bottomAdJumpLink;
          _this.form.topAdList=res.data.data.topAdList;
          _this.form.bottomAdList=res.data.data.bottomAdList;
          _this.form.bg=res.data.data.bg;
          console.log(_this.form)
        }).catch(function(error){
          console.log(error)
        })
      },
      onSubmit() {
        this.$emit('toSecondLevelPage')
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
      
      handleBottomPagePictureCardPreview(file) {
        this.bottomPagePreviewUrl = file.url
        this.bottomPagePreviewVisible = true
      },
      handleTopAdPictureCardPreview(file) {
        this.topAdPreviewUrl = file.url
        this.topAdPreviewVisible = true
      },
      handleBottomAdPictureCardPreview(file) {
        this.bottomAdPreviewUrl = file.url
        this.bottomAdPreviewVisible = true
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
      beforeTopAdUpload(file) {
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
      beforeBottomAdUpload(file) {
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
      handleChange(file,fileList) {
        // 对上传文件列表的控制
        // this.topAdFileList=fileList;
        console.log(fileList,file)
        this.bottomPageFileList=fileList;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
        this.bottomPageFileList=fileList;
      },
      // 底部广告
      handleChangeBottom(file, fileList) {
        // 对上传文件列表的控制
        this.bottomAdFileList=fileList;
      },
      // 去除底部广告
      handleRemoveBottom(file, fileList) {
        console.log(file, fileList)
        this.bottomAdFileList=fileList;
      },
      // 顶部广告
      handleChangeTop(file, fileList) {
        // 对上传文件列表的控制
        this.topAdFileList=fileList;
        console.log(this.topAdFileList)
      },
      // 顶部广告去除
      handleRemoveTop(file,fileList){
        console.log(file,fileList)
        this.topAdFileList=fileList;
      },
      submitUploadBottomPage() {
        this.$refs.uploadBottomPage.submit()
      },
      submitUploadTopAd() {
        this.$refs.uploadTopAd.submit()
      },
      submitUploadBottomAd() {
        this.$refs.uploadBottomAd.submit()
      },

      // 预览
      preview(){
        if(this.topAdFileList.length>0){
          this.form.topAdList=this.topAdFileList;
        }
        if(this.bottomAdFileList.length>0){
          this.form.bottomAdList=this.bottomAdFileList;
        }
        if(this.bottomPageFileList.length>0){
          this.form.bg=this.bottomPageFileList[0].url;
        }
      }
    },
    created() {
      this.getData();
    },
  }
</script>

<style lang="scss" scoped>
  .form-row {
    margin: 0;
  }

  .form-row .el-input {
    margin: 3px;
    width: 98%;
  }

  .form-row .el-form-item__label {
    height: 35px;
  }
  .h5_box{
    width:375px;
    margin:0 auto;
    position: relative;
    height:667px;
  }
  .top_ad_box, .bottom_ad_box{
    height:100px;
    width:100%;
  }
  .img_box img{
    width:100%;
    height:100%;
    display: block;
  
  }
  .bottom_ad_box{
    position: absolute;
    width:100%;
    height:100px;
    bottom:0px;
    left:0px;
  }
</style>
