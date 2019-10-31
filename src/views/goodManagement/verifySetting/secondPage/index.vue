<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div style="display: flex;justify-content: flex-start">
        <div class="flex-item" style=";width: 50%" >
          <div class="h5_box second_page" :style="{backgroundImage: 'url(' + form.bg + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center',backgroundSize:'100% 100%'}">
            <div style="padding:1em;">
              <div>
                <span style="font-size: 12px">商品码：123456；&nbsp;&nbsp;&nbsp;销售时间：2018/12/27/22:30:49</span>
                <a class="webGo" :href="form.webSetting">进入官网</a>
              </div>
              <p>{{form.textSetting}}</p>
              <el-form-item v-if="form.questionnaireList.length>0" v-for="(i,index) in form.questionnaireList" :key="index" :label="i.type" class="">
                <el-select v-model="i.value" placeholder="请选择">
                  <el-option v-for="c in i.subType"
                    :key="c"
                    :label="c"
                    :value="c">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="收入" class="">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    key="1"
                    label="xxxx"
                    value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="消费" class="">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    key="1"
                    label="xxxx"
                    value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="肤质" class="">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    key="1"
                    label="xxxx"
                    value="1">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <div style="text-align: center;margin-top: 10px">
                <el-button style="width: 8em;" size="small" type="primary" @click="submitCudtomerMsg">提交</el-button>
                <p>{{form.belowBtnText}}</p>
              </div>
            </div>
            <div class="bottom_ad_box" v-show="form.bottomAdList.length>0">
              <a :href="form.bottomAdJumpLink" class="img_box" v-for="(i,index) in form.bottomAdList" :key="index">
                <img :src="i.url" alt="">
              </a>
            </div>
          </div>
        </div>
        <div class="flex-item" style=";width: 50%">

          <el-form-item label="">
            <el-checkbox v-model="settingWebVisible">
              官网地址
            </el-checkbox>
            <div v-if="settingWebVisible">
              <el-form-item label="官网链接" class="form-row add-brand-row last-form-row">
                <el-input v-model.lazy="webSettingText" placeholder="请输入 "></el-input>
              </el-form-item>
            </div>
          </el-form-item>

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
                  v-model="textSetting">
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
                :limit="1"
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
            <el-checkbox v-model="isAddQuestionnaire">增加调查问卷</el-checkbox>
            <div v-if="isAddQuestionnaire">
              <p>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="addNewQuesType">新增调查项目
                </el-button>
              </p>
              <div class="border2" style="padding: 5px">
                <div v-for="(item,index) in questionList" :key="index" class="border1" style="padding: 5px;margin: 10px">
                  <el-form-item label="调查项目" >
                    <el-input v-model.lazy="questionList[index].type" placeholder="请输入 ">
                      <el-button slot="append" icon="el-icon-delete" @click="deleteQuesType(index)">删除</el-button>
                    </el-input>
                  </el-form-item>
                  <p>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="addNewQuesSubType(index)">
                      新增下拉选择
                    </el-button>
                  </p>
                  <el-form-item label="下拉选择">
                    <el-input v-for="(subItem,subIndex) in questionList[index].subType"
                              v-model.lazy="questionList[index].subType[subIndex]" :key="subIndex"
                              placeholder="请输入 ">
                      <el-button slot="append" icon="el-icon-delete" @click="deleteQuesSubType(index, subIndex)">删除
                      </el-button>
                    </el-input>
                  </el-form-item>
                </div>
              </div>
              <!-- <h3>调查问卷框</h3>
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
              </el-upload> -->
              <!-- <p>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUploadQuestionnaire">
                  上传到服务器
                </el-button>
              </p> -->

              <h3 class="belowBtnTextLimit">提交按钮下方文案设置</h3>
              <el-form-item label="">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入20字以内的内容"
                  v-model="belowBtnText">
                </el-input>
              </el-form-item>
              <el-dialog :visible.sync="questionnairePreviewVisible" append-to-body>
                <img width="100%" :src="questionnairePreviewUrl" alt="">
              </el-dialog>
            </div>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary" @click="priview">预览</el-button>
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
        settingWebVisible:false,
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
        textSetting:'',
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
        ],
        questionnaireFileList: [
          // {
          //   name: 'food.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
          // {
          //   name: 'food2.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }
        ],
        isAddQuestionnaire: false,
        questionnairePreviewVisible: false,
        questionnairePreviewUrl: '',
        questionList:[{ type: '', subType: [null],value:'' }],
        webSettingText:'',
        belowBtnText:'',
        form: {
          textSetting: '亲爱的顾客，凡在中国销售的XX品牌商品仅有一次销售时间，此商品销售时间显示在上方。若有疑问请进入会员官网『我』-『反馈和帮助』留言，我司将尽快与您联系。',
          bottomAdJumpLink: '',
          questionnaireList: [],
          belowBtnText: '提交获30积分，可抵扣消费。',
          webSetting:'',
          bottomAdList:[],
          bg:''
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
        // this.form.questionnaireList
        if (this.questionList.length >= 4) {
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
          // this.form.questionnaireList
          this.questionList.push({ type: null, subType: [null],value:'' })
        }
      },
      deleteQuesType(index) {
        // this.form.questionnaireList
        if (this.questionList.length === 1) return false
        this.questionList.splice(index, 1)
      },
      addNewQuesSubType(index) {
        this.form.questionnaireList
        this.questionList[index].subType.push(null)
      },
      deleteQuesSubType(index, subIndex) {
        // this.form.questionnaireList
        if (this.questionList[index].subType.length === 1) return false
        this.questionList[index].subType.splice(subIndex, 1)
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
      // 预览
      priview(){
        this.form.textSetting=this.textSetting;
        for(var i=0; i<this.questionList.length;i++){
          if(this.questionList[i].type!='' && this.questionList[i].type!=null){
            this.form.questionnaireList=this.questionList;
          }
        }
        // this.form.questionnaireList=this.questionList;
        this.form.belowBtnText=this.belowBtnText;
        this.form.webSetting=this.webSettingText;
        this.form.bottomAdList=this.bottomAdFileList;
        this.form.bg=this.bottomPageFileList[0].url;
        console.log(this.form)
      },
      getData(){
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .belowBtnTextLimit:after {
    content: '（20字以内）';
    font-size: 12px;
    color: darkgray;
  }
  .h5_box{
    width:375px;
    margin:0 auto;
    position: relative;
    height:667px;
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
  #app .second_page .el-button--mini{
    padding:7px 5px;
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
  .webGo{
    display: inline-block;
    background: #66b1ff;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    padding:7px 5px;
    color:#ffffff;
    line-height: 12px;
  }
</style>
