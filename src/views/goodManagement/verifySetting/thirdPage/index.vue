<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div style="display: flex;justify-content: flex-start">
        <div class="flex-item" style=";width: 50%">
          <div style="display: flex;flex-flow: column;justify-content: center;align-items: center">
            <h3>恭喜您获得30会员积分！</h3>
            <ol class="memberOl">
              <li>生日可获购买AESOP产品优惠券；</li>
              <li>累积积分换领AESOP、BONPOINT等品牌商品；</li>
              <li>还有机会参与会员活动享受多种福利；</li>
            </ol>
            <el-button style="width: 10em" type="primary" @click="toOfficialMemberWebsite('www.baidu.com')">进入会员官网
            </el-button>
          </div>
          <h3 style="text-align: center">广告位</h3>
          <div class="advertisementArea"></div>
        </div>
        <!--右边灵活组合选项-->
        <div class="flex-item" style="width: 50%">

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
                :on-preview="handleBottomPagePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleChange">
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUploadBottomPage">
                  上传到服务器
                </el-button>
              </p>
              <el-dialog :visible.sync="bottomPagePreviewVisible" append-to-body>
                <img width="100%" :src="bottomPagePreviewUrl" alt="">
              </el-dialog>
            </div>
          </el-form-item>

          <el-form-item label="">
            <el-checkbox v-model="isAddTopAd">增加顶部广告</el-checkbox>
            <div v-if="isAddTopAd">
              <el-form-item label="跳转链接" class="form-row add-brand-row last-form-row">
                <el-input v-model.lazy="form.topAdJumpLink" placeholder="请输入 "></el-input>
              </el-form-item>
              <div class="el-upload__tip">提示：只能上传jpg/png文件，且不超过2MB</div>
              <el-upload
                ref="uploadTopAd"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :file-list="topAdFileList"
                :auto-upload="false"
                :before-upload="beforeTopAdUpload"
                :on-preview="handleTopAdPictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleChange">
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUploadTopAd">上传到服务器
                </el-button>
              </p>
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
                :before-upload="beforeBottomAdUpload"
                :on-preview="handleBottomAdPictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleChange">
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUploadBottomAd">上传到服务器
                </el-button>
              </p>
              <el-dialog :visible.sync="bottomAdPreviewVisible" append-to-body>
                <img width="100%" :src="bottomAdPreviewUrl" alt="">
              </el-dialog>
            </div>
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
        isChangeBottomPage: false,
        isAddTopAd: false,
        isAddBottomAd: false,
        bottomPagePreviewUrl: '',
        bottomPagePreviewVisible: false,
        bottomPageFileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        topAdPreviewUrl: '',
        topAdPreviewVisible: false,
        topAdFileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        bottomAdPreviewUrl: '',
        bottomAdPreviewVisible: false,
        bottomAdFileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        form: {
          topAdJumpLink: null,
          bottomAdJumpLink: null
        },
        rules: {
          phoneNum: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度应为11个字符', trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      toOfficialMemberWebsite(url) {
        window.location.href = url
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
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
      handleChange(file, fileList) {
        // 对上传文件列表的控制
        this.fileList3 = fileList.slice(-3)
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
    }
  }
</script>

<style lang="scss" scoped>
  .memberOl:before {
    content: '成为会员：';
    margin-left: -1em;
  }
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
</style>
