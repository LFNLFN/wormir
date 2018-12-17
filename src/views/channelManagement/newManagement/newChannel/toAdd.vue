<template>
  <div class="addChannelDialog">
    <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
      <dl>
        <dt><h3 class="form-part-title">渠道特点</h3></dt>
        <dd class="border1">
          <el-form-item label="合作类型" prop="cooperativeType">
            <el-radio-group v-model="form.cooperativeType">
              <el-radio label="1">渠道入驻</el-radio>
              <el-radio label="2">渠道变更</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="渠道属性" prop="channelProp">
            <el-radio-group v-model="form.channelProp">
              <el-radio label="1">DLQD</el-radio>
              <el-radio label="2">DFQD</el-radio>
              <el-radio label="3">FXQD</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="渠道类别" prop="channelType">
            <el-radio-group v-model="form.channelType">
              <el-radio label="1">淘宝C店</el-radio>
              <el-radio label="2">淘宝企业店</el-radio>
              <el-radio label="3">天猫店</el-radio>
              <el-radio label="4">B2C平台</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="渠道级别" prop="channelLevel" class="last-form-row">
            <el-radio-group v-model="form.channelLevel">
              <el-radio label="1">A级渠道</el-radio>
              <el-radio label="2">B级渠道</el-radio>
              <el-radio label="3">C级渠道</el-radio>
              <el-radio label="4">D级渠道</el-radio>
            </el-radio-group>
          </el-form-item>
        </dd>
      </dl>

      <dl>
        <dt><h3 class="form-part-title">基本信息</h3></dt>
        <dd class="border1">
          <el-form-item label="经营主体" label-width="130px" prop="businessEntity">
            <el-radio-group v-model="form.businessEntity">
              <el-radio :label="1">个人</el-radio>
              <el-radio :label="2">企业</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="form.businessEntity==1" label="身份证号码" label-width="100px" prop="personID"
                        class="form-row idCardCode last-form-row">
            <el-input style="margin-left: -1em;height: 27px;" class="noBorderInput" v-model="form.personID"
                      placeholder="请输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==2" label="公司名称" label-width="100px" class="form-row idCardCode"
                        prop="companyName">
            <el-input style="margin-left: -1em;height: 27px;" class="noBorderInput" v-model="form.companyName"
                      placeholder="请输入公司名称"></el-input>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==2" label="公司简介" label-width="100px"
                        class="form-row idCardCode last-form-row" prop="companySummary">
            <el-input class="noBorderTextarea marginToLeft" :rows="1" type="textarea" v-model="form.companySummary"
                      placeholder="请输入公司简介"></el-input>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==1" label="" style="padding: 10px 0;" class="idCardUpload">
            <el-col :span="0"></el-col>
            <el-col :span="11" class="no-border-right">
              <el-form-item prop="idcardFront" label="身份证正面" label-width="100px" class="form-row idCardLabel"
                            style="border: none">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :http-request="uploadfrontAction"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.idcardFront" :src="form.idcardFront" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="0"></el-col>
            <el-col :span="11">
              <el-form-item prop="idcardBack" label="身份证反面" label-width="100px" class="form-row idCardLabel "
                            style="border: none">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :http-request="uploadBackAction"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.idcardBack" :src="form.idcardBack" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==2" label="" style="padding: 10px 0;" class="idCardUpload">
            <el-col :span="0"></el-col>
            <el-col :span="11" class="no-border-right">
              <el-form-item prop="businessLicense" label="营业执照" label-width="100px" class="form-row idCardLabel"
                            style="border: none">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :http-request="uploadBusinessLicenseAction"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.businessLicense" :src="form.businessLicense" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==2" label="法人" label-width="130px" class="form-row idCardCode"
                        prop="legalPerson">
            <el-input style="margin-left: -1em;height: 27px;" class="noBorderInput" v-model="form.legalPerson"
                      placeholder="请输入法人"></el-input>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==2" label="公司地址" label-width="130px" class="form-row idCardCode"
                        prop="companyAddress">
            <el-input style="margin-left: -1em;height: 27px;" class="noBorderInput" v-model="form.companyAddress"
                      placeholder="请输入公司地址"></el-input>
          </el-form-item>


          <el-form-item label="店铺/平台名称" label-width="130px" class="form-row" prop="storeName">
            <el-col :span="11" class="marginToLeft">
              <el-form-item label="" prop="storeName">
                <el-input v-model="form.storeName" class="noBorderInput" style="margin-left: -1em"
                          placeholder="请输入店铺/平台名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2"><span>渠道名称</span></el-col>
          </el-form-item>
          <el-form-item label="PC店铺/平台链接" label-width="130px" class="form-row last-form-row" prop="PCLink">
            <el-col :span="11" class="marginToLeft">
              <el-form-item label="" prop="PCLink">
                <el-input v-model="form.PCLink" class="noBorderInput marginToLeft"
                          placeholder="请输入PC店铺/平台链接"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机店铺/平台链接" label-width="130px" prop="appLink">
                <el-input v-model="form.appLink" class="noBorderInput marginToLeft"
                          placeholder="请输入手机店铺/平台链接"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <p style="color: red;margin: 0;padding: 10px 0" class="border-left border-right">
            *由于涉及后期的技术对接，以上两项请输入正确的链接。若实在没有PC或手机店铺/平台，请输入“123456”</p>
          <el-form-item label="经营范围" label-width="130px" prop="businessRange">
            <el-input class="noBorderTextarea marginToLeft" :rows="1" type="textarea" v-model="form.businessRange"
                      placeholder="请输入经营内容（200字以内）"></el-input>
          </el-form-item>
          <el-form-item label="经营过的类似商品" label-width="130px" prop="similarGoods" class="last-form-row">
            <el-input class="noBorderTextarea marginToLeft" :rows="1" type="textarea" v-model="form.similarGoods"
                      placeholder="请提供商品名称和销量（200字以内）"></el-input>
          </el-form-item>
        </dd>
        <dt><h3 class="form-part-title">联系方式</h3></dt>
        <dd>
        <dt>联系方式 <span style="color: red">(温馨提示：渠道联系人及技术对接人必填哦！)</span></dt>
        <dd class="border1 no-border-bottom">
          <el-table
            border
            :data="form.contactData"
            class="vali-table"
            :cell-style="{height: '100px'}"
            style="width: 100%;border-right-width: 0">
            <el-table-column
              align="center"
              prop="job"
              label="职务"
              width="150">
              <template slot-scope="scope">
                <el-select v-model="form.contactData[scope.$index].job" placeholder="请选择">
                  <el-option
                    v-for="item in jobType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="姓名"
              width="120px"
            >
              <template slot-scope="scope">
                <el-input v-model="form.contactData[scope.$index].name" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="150px"
              prop="mobile"
              label="电话">
              <template slot-scope="scope">
                <el-input v-model="form.contactData[scope.$index].mobile" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="email"
              width="250px"
              label="邮箱">
              <template slot-scope="scope">
                <el-input v-model="form.contactData[scope.$index].email" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              width="300px"
              label="地址">
              <template slot-scope="scope">
                <el-input type="textarea" :rows="1" v-model="form.contactData[scope.$index].address"
                          placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="remark"
              width="300px"
              label="备注">
              <template slot-scope="scope">
                <el-input type="textarea" :rows="1" v-model="form.contactData[scope.$index].remark"
                          placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              fixed="right"
              prop=""
              label="操作" width="170">
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-plus" @click="addContact()"></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteContact(scope.$index)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </dd>
        </dd>
        <dt><h3 class="form-part-title">保证金</h3></dt>
        <dd class="border1">
          <el-form-item label="保证金金额" label-width="100px" class="form-row last-form-row" prop="depositValue">
            <el-select class="noBorderInput marginToLeft" v-model="form.depositValue" placeholder="请选择">
              <el-option
                v-for="item in depositOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        <dd>
          <div class="dialogBottomButton-wrap">
            <el-button type="primary" @click="submitAction" :loading="isSubmitting">立即提交</el-button>
          </div>
        </dd>
        </dd>
      </dl>
    </el-form>
  </div>
</template>

<script>

  const qiniu = require('qiniu-js')
  import request from "@/utils/request";

  export default {
    data() {
      var validateName = (rule, value, callback) => {
        console.log(value)
        if (!value) {
          callback(new Error('请输入正确名字'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        const reg = /^\@/
        if (!reg.test(value)) {
          callback(new Error('请输入正确邮箱'));
        } else {
          callback();
        }
      };
      var validateMobile = (rule, value, callback) => {
        const reg = /^1[3|4|5|8]\d{9}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确电话'));
        } else {
          callback();
        }
      };
      return {
        form: {
          cooperativeType: '',
          channelProp: '',
          channelType: '',
          channelLevel: '',
          idcardFront: '',
          idcardBack: '',
          businessLicense: '',
          businessEntity: '',
          personID: '',
          storeName: '',
          PCLink: '',
          appLink: '',
          similarGoods: '',
          companyName: '',
          companySummary: '',
          legalPerson: '',
          companyAddress: '',

          contactData: [{
            job: '',
            name: '',
            mobile: '',
            email: '',
            address: '',
            remark: ''
          }]
        },
        isSubmitting: false,
        contactData: [{
          job: '技术对接人',
          name: '王小虎',
          mobile: 15268172199,
          email: '315889743@qq.com',
          address: '上海市普陀区金沙江路 1518 弄',
          remark: '此人非常重要'
        }],
        jobType: [
          { label: '渠道联系人', value: 1 },
          { label: '技术对接人', value: 2 },
          { label: '采购', value: 3 },
          { label: '收货人', value: 4 },
          { label: '业务', value: 5 },
          { label: '财务', value: 6 },
          { label: '其他', value: 7 }
        ],
        depositOptions: [
          { label: '¥2000', value: 2000 },
          { label: '¥4000', value: 4000 },
          { label: '¥10000', value: 10000 },
          { label: '¥30000', value: 30000 },
          { label: '¥50000', value: 50000 }
        ],


        formRules: {
          cooperativeType: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          channelProp: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          channelType: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          channelLevel: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          businessEntity: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          personID: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          companyName: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          companySummary: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          idcardFront: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          idcardBack: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          businessLicense: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          legalPerson: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          companyAddress: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          storeName: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          PCLink: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          appLink: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          businessRange: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          similarGoods: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          depositValue: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          job: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
          name: [
            { validator: validateName, trigger: 'change' },
          ],
          mobile: [
            { validator: validateMobile, trigger: 'blur' },
          ],
          email: [
            { validator: validateEmail, trigger: 'blur' },
          ],
          address: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          remark: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
        },


        isSubmit: false
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.form.idcardBack = URL.createObjectURL(file.raw)
      },
      uploadfrontAction(options) {
        this.uploadAction(options.file, key => {
          this.form.idcardFront = `http://asset.wormir.com/${key}`
        })
      },
      uploadBackAction(options) {
        this.uploadAction(options.file, key => {
          this.form.idcardBack = `http://asset.wormir.com/${key}`
        })
      },
      uploadBusinessLicenseAction(options) {
        this.uploadAction(options.file, key => {
          this.form.businessLicense = `http://asset.wormir.com/${key}`
        })
      },
      uploadAction(file, callback) {
        request({
          url: '/getToken',
          method: 'get'
        }).then(res => {
          let observable = qiniu.upload(file, null, res.data, null, null)
          observable.subscribe({
            next(res) {
              // console.log(res);
            },
            error(err) {
              console.log(err)
            },
            complete(res) {
              // console.log(res);
              callback(res.key)
            }
          })
        })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 10

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!')
        }
        return isJPG && isLt2M
      },

      submitAction() {
        this.isSubmitting = true

        // 验证渠道联系人和技术对接人
        let channelContactPerson = this.form.contactData.some((item, index, arr) => {
          return item.job == 1
        })
        let technologyConnectPerson = this.form.contactData.some((item, index, arr) => {
          return item.job == 2
        })
        if (!(channelContactPerson && technologyConnectPerson)) {
          this.$message.error('渠道联系人及技术对接人必填!');
          this.isSubmitting = false
          return false
        }

        // 验证联系表格是否为空
        let contactTableValidate = this.form.contactData.some((item, index, arr) => {
          let wrongValue = false
          for (var a in item) {
            if(!item[a]) {
              wrongValue = true
              break
            }
          }
          return wrongValue
        })
        if (contactTableValidate) {
          this.$message.error('请完整填写联系人表格内容!');
          this.isSubmitting = false
          return false
        }

        // 验证联系表格邮箱和电话
        let contactEmail = this.form.contactData.some((item, index, arr) => {
          const regEmail = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
          return !regEmail.test(item.email)
        })
        // 验证联系表格邮箱和电话
        let contactMobile = this.form.contactData.some((item, index, arr) => {
          const regMobile = /^1[3|4|5|8]\d{9}$/
          return !regMobile.test(item.mobile)
        })
        if (contactMobile) {
          this.$message.error('请正确填写联系人表格电话!');
          this.isSubmitting = false
          return false
        }
        if (contactEmail) {
          this.$message.error('请正确填写联系人表格邮箱!');
          this.isSubmitting = false
          return false
        }

        this.$refs['form'].validate((valid) => {
          if (valid) {
            request({
              url: '/channel/createChannel.do',
              method: 'post',
              data: this.form
            }).then(() => {
              this.$emit('submitSuccess')
            }).catch(() => {
              this.$message.error('新增失败');
              this.isSubmitting = false
            })
          } else {
            this.isSubmitting = false
            this.$message.error('请填写全部信息')
            return false
          }
        })
      },


      addContact() {
        this.form.contactData.push({
          job: '',
          name: '',
          mobile: '',
          email: '',
          address: '',
          remark: ''
        })
      },
      deleteContact(index) {
        this.form.contactData.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-uploader .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .avatar-uploader-icon:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-form-item {
    margin-bottom: 0;
  }


</style>
