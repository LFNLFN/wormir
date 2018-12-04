<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div style="display: flex;justify-content: flex-start">
        <div class="flex-item" style=";width: 50%">
          <div>
            <span style="font-size: 12px">商品码：123456；&nbsp;&nbsp;&nbsp;销售时间：2018/12/27/22:30:49</span>
            <el-button style="margin-left: 10px;" size="small" type="primary"
                       @click="toOfficialWebsite('www.baidu.com')">进入官网
            </el-button>
          </div>
          <p>
            亲爱的顾客，凡在中国销售的XX品牌商品仅有一次销售时间，此商品销售时间显示在上方。若有疑问请进入会员官网『我』-『反馈和帮助』留言，我司将尽快与您联系。
          </p>
          <el-form-item label="职业" class="form-row add-brand-row">
            <el-input v-model.lazy="form.job" placeholder="请输入 "></el-input>
          </el-form-item>
          <el-form-item label="收入" class="form-row add-brand-row">
            <el-input v-model.lazy="form.income" placeholder="请输入 "></el-input>
          </el-form-item>
          <el-form-item label="消费" class="form-row add-brand-row">
            <el-input v-model.lazy="form.topAdJumpLink" placeholder="请输入 "></el-input>
          </el-form-item>
          <el-form-item label="肤质" class="form-row add-brand-row last-form-row">
            <el-input v-model.lazy="form.topAdJumpLink" placeholder="请输入 "></el-input>
          </el-form-item>
          <div style="text-align: center;margin-top: 10px">
            <el-button style="width: 8em;" size="small" type="primary" @click="submitCudtomerMsg">提交
            </el-button>
            <p>
              提交获30积分，可抵扣消费。
            </p>
            <h2>广告位</h2>
            <div class="advertisementArea"></div>
          </div>
        </div>
        <div class="flex-item" style=";width: 50%">

          <el-form-item label="">
            <el-checkbox v-model="settingTextVisible">
              文案设置<span v-if="settingTextVisible" class="textSettingLimit">（100字以内）</span>
            </el-checkbox>
            <div v-if="settingTextVisible">
              <el-form-item label="">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入100字以内的内容"
                  v-model="form.textSetting">
                </el-input>
              </el-form-item>
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

          <el-form-item label="">
            <el-checkbox v-model="isAddQuestionnaire">增加调查问卷</el-checkbox>
            <div v-if="isAddQuestionnaire">
              <p>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="addNewQuesType">新增调查项目
                </el-button>
              </p>
              <div class="border2" style="padding: 5px">
                <div v-for="(item,index) in form.questionnaireList" :key="index" class="border1" style="padding: 5px;margin: 10px">
                  <el-form-item label="调查项目" >
                    <el-input v-model.lazy="form.questionnaireList[index].type" placeholder="请输入 ">
                      <el-button slot="append" icon="el-icon-delete" @click="deleteQuesType(index)">删除</el-button>
                    </el-input>
                  </el-form-item>
                  <p>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="addNewQuesSubType(index)">
                      新增下拉选择
                    </el-button>
                  </p>
                  <el-form-item label="下拉选择">
                    <el-input v-for="(subItem,subIndex) in form.questionnaireList[index].subType"
                              v-model.lazy="form.questionnaireList[index].subType[subIndex]" :key="subIndex"
                              placeholder="请输入 ">
                      <el-button slot="append" icon="el-icon-delete" @click="deleteQuesSubType(index, subIndex)">删除
                      </el-button>
                    </el-input>
                  </el-form-item>
                </div>
              </div>
              <h3>调查问卷框</h3>
              <div class="el-upload__tip">提示：只能上传jpg/png文件，且不超过2MB</div>
              <el-upload
                ref="uploadQuestionnaire"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :file-list="questionnaireFileList"
                :auto-upload="false"
                :before-upload="beforeQuestionnaireUpload"
                :on-preview="handleQuestionnairePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleChange">
                <i class="el-icon-plus"></i>
              </el-upload>
              <p>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUploadQuestionnaire">
                  上传到服务器
                </el-button>
              </p>

              <h3 class="belowBtnTextLimit">提交按钮下方文案设置</h3>
              <el-form-item label="">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入20字以内的内容"
                  v-model="form.belowBtnText">
                </el-input>
              </el-form-item>
              <el-dialog :visible.sync="questionnairePreviewVisible" append-to-body>
                <img width="100%" :src="questionnairePreviewUrl" alt="">
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
        settingTextVisible: false,
        isChangeBottomPage: false,
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
        questionnaireFileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        isAddQuestionnaire: false,
        questionnairePreviewVisible: false,
        questionnairePreviewUrl: '',
        form: {
          textSetting: '亲爱的顾客，凡在中国销售的XX品牌商品仅有一次销售时间，此商品销售时间显示在上方。若有疑问请进入会员官网『我』-『反馈和帮助』留言，我司将尽快与您联系。',
          bottomAdJumpLink: null,
          questionnaireList: [{ type: null, subType: [null] }],
          belowBtnText: '提交获30积分，可抵扣消费。'
        },
        rules: {
          phoneNum: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度应为11个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      addNewQuesType() {
        if (this.form.questionnaireList.length >= 4) {
          const vm = this
          this.$alert('新增调查项目不能超过4个', '', {
            confirmButtonText: this.$t('table.confirm'),
            showClose: false,
            center: true,
            callback() {
              vm.$emit('close')
            }
          })
        }
        else {
          this.form.questionnaireList.push({ type: null, subType: [null] })
        }
      },
      deleteQuesType(index) {
        if (this.form.questionnaireList.length === 1) return false
        this.form.questionnaireList.splice(index, 1)
      },
      addNewQuesSubType(index) {
        this.form.questionnaireList[index].subType.push(null)
      },
      deleteQuesSubType(index, subIndex) {
        if (this.form.questionnaireList[index].subType.length === 1) return false
        this.form.questionnaireList[index].subType.splice(subIndex, 1)
      },
      handleChange(file, fileList) {
        // 对上传文件列表的控制
        this.fileList3 = fileList.slice(-3)
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
      beforeQuestionnaireUpload(file) {
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
      handleQuestionnairePictureCardPreview(file) {
        this.questionnairePreviewUrl = file.url
        this.questionnairePreviewVisible = true
      },
      toOfficialWebsite(url) {
        window.location.href = url
      },
      submitCudtomerMsg() {
        this.$emit('toThirdLevelPage')
      },
      submitUploadBottomPage() {
        this.$refs.uploadBottomPage.submit()
      },
      submitUploadBottomAd() {
        this.$refs.uploadBottomAd.submit()
      },
      submitUploadQuestionnaire() {
        this.$refs.uploadQuestionnaire.submit()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .belowBtnTextLimit:after {
    content: '（20字以内）';
    font-size: 12px;
    color: darkgray;
  }

  .textSettingLimit {
    font-size: 12px;
    color: darkgray;
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
