<template>
  <div class="addChannelDialog to-add-channel-vue">
    <!-- <h2 class="text-center">新增渠道</h2> -->
    <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
      <dl>
        <dt><h3 class="form-part-title">渠道特点</h3></dt>
        <!-- border1 -->
        <dd class="" style="border-bottom:1px solid #d5d5d5; margin:0;">
          <el-form-item label="合作类型" prop="">
            <!-- cooperativeType -->
            <el-radio-group v-model="form.cooperativeType" disabled>
              <el-radio :label="1">渠道入驻</el-radio>
              <el-radio :label="3">渠道重驻</el-radio>
              <el-radio :label="2">渠道变更</el-radio>
              <el-radio :label="4">渠道并存</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.cooperativeType==2" label="原渠道号"
                        prop="channelNo">
            <div style=""><el-input style="margin-left: -1em;" class="noBorderInput" v-model="form.channelNo"
                      placeholder="请输入原渠道号" @change="channelChange"></el-input></div>
          </el-form-item>
          <el-form-item label="渠道属性" prop="channelProp">
            <el-radio-group v-model="form.channelProp" @change="channelPropChange">
              <el-radio :label="1">独立渠道（DLQD）</el-radio>
              <!--<el-radio label="2">DFQD</el-radio>-->
              <el-radio :label="3">分销渠道（FXQD）</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="渠道类别" prop="channelType" v-if="form.channelProp!=3">
            <el-radio-group v-model="form.channelType">
              <el-radio :label="1">淘宝C店</el-radio>
              <el-radio :label="2">淘宝企业店</el-radio>
              <el-radio :label="3">天猫店</el-radio>
              <el-radio :label="4">B2C平台</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="渠道级别" prop="channelLevel" v-if="form.channelProp!=3">
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
        <dd class="">
          <el-form-item label="经营主体" label-width="170px" prop="businessEntity">
            <el-radio-group v-model="form.businessEntity">
              <el-radio :label="1" v-show="form.channelProp!=3">个人</el-radio>
              <el-radio :label="2">企业</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="form.businessEntity==1" label="身份证号码" label-width="170px" prop="identityCardNo"
                        class="form-row idCardCode last-form-row">
            <div style=""><el-input style="margin-left: -1em;" class="noBorderInput" v-model="form.identityCardNo"
                      placeholder="请输入身份证号码"></el-input></div>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==2" label="公司名称" label-width="170px" class="form-row idCardCode"
                        prop="channelName">
                        <el-col :span="20" class="">
            <div style=""><el-input style="margin-left: -1em;" class="noBorderInput" v-model="form.channelName"
                      placeholder="请输入公司名称" v-if="form.channelProp==1"></el-input>
                      <el-input style="margin-left: -1em;" class="noBorderInput" v-model="form.channelName"
                      placeholder="请输入公司名称" v-if="form.channelProp==3">
                      </el-input></div>
                        </el-col>
                      <el-col class="line" :span="4"><span>渠道名称</span></el-col>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==2" label="公司简介" label-width="170px"
                        class="form-row idCardCode last-form-row" prop="companySummary">
            <el-input class="noBorderTextarea marginToLeft" :rows="1" type="textarea" v-model="form.companySummary"
                      placeholder="请重点介绍公司拥有的销售渠道情况和数量"></el-input>
          </el-form-item>


          <el-form-item v-if="form.businessEntity==1 && form.channelProp==1" prop="identityCardFront" label="身份证正面" label-width="169px" class="form-row idCardLabel"
                        style="border-top: none;border-bottom: solid #D5D5D5 1px;border-left: solid #D5D5D5 1px">
            <el-upload
              style="padding: 10px 0"
              class="avatar-uploader"
              action=""
              :limit="1"
              :show-file-list="false"
              :http-request="uploadfrontAction"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.identityCardFront" :src="form.identityCardFront" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==1 && form.channelProp==1" prop="identityCardContrary" label="身份证反面" label-width="169px" class="form-row idCardLabel "
                        style="border-top: none;border-left: solid #D5D5D5 1px">
            <el-upload
              style="padding: 10px 0"
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadBackAction"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.identityCardContrary" :src="form.identityCardContrary" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item v-if="form.businessEntity==2" prop="businessLicense" label="营业执照" label-width="170px" class="form-row idCardLabel"
                        style="border-top: none;border-left: solid #D5D5D5 1px">
            <el-upload
              style="padding: 10px 0"
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadBusinessLicenseAction"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.businessLicense" :src="form.businessLicense" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="form.businessEntity==2" label="公司地址" label-width="170px" class="form-row idCardCode" 
                        prop="companyAddress">
            <div style=""><el-input style="margin-left: -1em;" class="noBorderInput" v-model="form.companyAddress"
                      placeholder="请输入公司地址"></el-input></div>
          </el-form-item>


          <el-form-item label="店铺/平台名称" label-width="170px" class="form-row" prop="channelName" v-if="form.channelProp==1">
            <el-col :span="20" class="marginToLeft">
              <el-form-item label="" prop="channelName">
                <div style=""><el-input v-model="form.channelName" class="noBorderInput" style="margin-left: -1em"
                          placeholder="请输入店铺/平台名称"></el-input></div>
              </el-form-item>
            </el-col>
            <el-col class="line" style="align: right" :span="4"><span style="font-size:12px;font-style:italic;">（渠道名称）</span></el-col>
          </el-form-item>
          <el-form-item label="PC店铺/平台链接" label-width="170px" class="form-row last-form-row" prop="PCLink" v-if="form.channelProp==1">
            <el-col :span="8" class="marginToLeft">
              <el-form-item label="" prop="PCLink">
                <div style=""><el-input v-model="form.PCLink" class="noBorderInput marginToLeft"
                          placeholder="请粘贴PC店铺/平台链接"></el-input></div>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="手机店铺/平台链接" label-width="170px" prop="appLink">
                <div style=""><el-input v-model="form.appLink" class="noBorderInput marginToLeft"
                          placeholder="请粘贴手机店铺/平台链接"></el-input></div>
              </el-form-item>
            </el-col>
          </el-form-item>
        </dd>
        <p style="margin: 0;padding: 0;text-indent: 2em" class="warn-notice" v-if="form.channelProp==1">
            *由于涉及顾客有效验证商品的技术对接，请务必录入正确的店铺/平台链接信息；若不是两项链接皆有，可只填写其中一项。</p>
        <dd class="">
          <el-form-item label="经营范围" label-width="170px" prop="businessRange">
            <el-input class="noBorderTextarea marginToLeft" :rows="1" type="textarea" v-model="form.businessRange"
                      placeholder="请输入经营内容（200字以内）"></el-input>
          </el-form-item>
          <el-form-item label="经营过的类似商品" label-width="170px" class="last-form-row">
            <el-input class="noBorderTextarea marginToLeft" :rows="1" type="textarea" v-model="form.businessGoods"
                      placeholder="请提供商品名称和销量（200字以内）"></el-input>
          </el-form-item>
        </dd>
        <dt><h3 class="form-part-title">联系方式</h3></dt>
        <dd>
        <dd class=" no-border-bottom">
          <el-table
            border
            :data="form.contactData"
            class="vali-table"
            :cell-style="{height: '100px'}"
            style="width: 100%;border-top: 1px solid #D5D5D5;border-left: 1px solid #D5D5D5">
            <el-table-column
              align="center"
              prop="dutyNo"
              label="职务"
              label-class-name="mask"
              width="150">
              <template slot-scope="scope">
                <span v-if="scope.$index==0">渠道联系人</span>
                <span v-else-if="scope.$index==1">技术对接人</span>
                 <el-input v-else v-model="form.contactData[scope.$index].dutyName" placeholder=""></el-input>
                <!-- <el-select v-model="form.contactData[scope.$index].dutyNo" placeholder="请选择">
                  <el-option
                    v-for="item in jobType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="userName"
              label="姓名"
              width="120px"
              label-class-name="mask"
            >
              <template slot-scope="scope">
                <el-input v-model="form.contactData[scope.$index].userName" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="150px"
              prop="mobile"
              label-class-name="mask"
              label="电话">
              <template slot-scope="scope">
                <el-input v-model="form.contactData[scope.$index].mobile" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="email"
              width="250px"
              label-class-name="mask"
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
                <el-button v-if="scope.$index>1" type="danger" icon="el-icon-delete" @click="deleteContact(scope.$index)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </dd>
        </dd>
        <dt><h3 class="form-part-title">保证金</h3></dt>
        <dd class="">
          <el-form-item label="保证金金额" label-width="100px" class="form-row last-form-row" prop="securityAmount">
            <el-select class="noBorderInput marginToLeft" v-model="form.securityAmount" placeholder="请选择">
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
  import request from "@/utils/request"
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
        const reg = /^1[3|4|5|6|7|8]\d{9}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确电话'));
        } else {
          callback();
        }
      };

      var validateChannelNo = (rule, value, callback) => {
        request({
          url: '/channel/changeCooperativeType.do',
          method: 'post',
          data: { channelNo: value }
        }).then(res => {
          if (res.data.channelNo) {
            callback()
          } else { callback(new Error('此渠道号不存在')) }
        })
      }

  export default {
    data() {

      return {
        form: {
          cooperativeType: '',
          channelProp: '',
          channelType: '',
          channelLevel: '',
          identityCardFront: '',
          identityCardContrary: '',
          businessLicense: '',
          businessEntity: '',
          identityCardNo: '',
          channelName: '',
          PCLink: '',
          appLink: '',
          businessGoods: '',
          companyName: '',
          companySummary: '',
          companyAddress: '',
          contactData: [{
            // dutyNo: '',
            dutyName: '渠道联系人',
            userName: '',
            mobile: '',
            email: '',
            address: '',
            remark: ''
          },{
            // dutyNo: '',
            dutyName: '技术对接人',
            userName: '',
            mobile: '',
            email: '',
            address: '',
            remark: ''
          }]
        },
        isSubmitting: false,
        contactData: [],
        jobType: [
          { label: '渠道联系人', value: 1 },
          { label: '技术对接人', value: 2 },
          { label: '采购', value: 3 },
          { label: '收货人', value: 4 },
          { label: '业务', value: 5 },
          { label: '财务', value: 6 },
          { label: '其他', value: 7 }
        ],
        jobTypeMap: {
          1: '渠道联系人',
          2: '技术对接人',
        },
        depositOptions: [
          // { label: '¥2000', value: 2000 },
          // { label: '¥4000', value: 4000 },
          // { label: '¥10000', value: 10000 },
          // { label: '¥30000', value: 30000 },
          // { label: '¥50000', value: 50000 }
        ],


        formRules: {
          cooperativeType: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          channelNo: [
            { validator: validateChannelNo, trigger: 'blur' },
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
          identityCardNo: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          companyName: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          companySummary: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          identityCardFront: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          identityCardContrary: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          businessLicense: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          companyAddress: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          channelName: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          PCLink: [
            { required: false, message: ' ', trigger: 'blur' },
          ],
          appLink: [
            { required: false, message: ' ', trigger: 'blur' },
          ],
          businessRange: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          businessGoods: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          securityAmount: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          dutyNo: [
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
    created(){
      this.getBond();
    },
    methods: {
      // 获取保证金
      getBond(){
        let _this=this;
        var account=JSON.parse(window.localStorage.userData).account;
        console.log(account)
        request({
          url:'/channel/getAccountSecurityAmount.do',
          method:'post',
          data:{account:account},
        }).then(res=>{
          console.log(res)
          if(res.errorCode==0){
            res.data.map(function(e){
              var obj={label:'',value:''}
              obj.label=e.securityAamount;
              obj.value=e.itemIndex;
              _this.depositOptions.push(obj)
            })
          }else{
            this.depositOptions=[];
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      handleAvatarSuccess(res, file) {
        this.form.identityCardContrary = URL.createObjectURL(file.raw)
      },
      uploadfrontAction(options) {
        this.uploadAction(options.file, key => {
          this.form.identityCardFront = `http://asset.wormir.com/${key}`
        })
      },
      uploadBackAction(options) {
        this.uploadAction(options.file, key => {
          this.form.identityCardContrary = `http://asset.wormir.com/${key}`
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
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 10

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!')
        }
        return isJPG && isLt2M
      },

      submitAction() {
        // 验证pc链接和app链接
        // if ((!this.form.PCLink) && (!this.form.appLink)) {
        //   this.$message.error('请填写PC或手机店铺/平台的其中一项!');
        //   this.isSubmitting = false
        //   return false
        // }
        // 验证渠道联系人和技术对接人
        // let channelContactPerson = this.form.contactData.some((item, index, arr) => {
        //   return item.dutyNo == 1
        // })
        // let technologyConnectPerson = this.form.contactData.some((item, index, arr) => {
        //   return item.dutyNo == 2
        // })
        // if (!(channelContactPerson && technologyConnectPerson)) {
        //   this.$message.error('渠道联系人及技术对接人必填!');
        //   this.isSubmitting = false
        //   return false
        // }

        // 验证联系表格是否为空
        let contactTableValidate = this.form.contactData.some((item, index, arr) => {
          let wrongValue = false
          for (var a in item) {
            if( (!item[a]) && a!= 'remark' && a!='dutyNo' && a!='address' ) {
              console.log(a)
              console.log(item[a])
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
          const regMobile = /^1[3|4|5|6|7|8]\d{9}$/
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
            this.isSubmitting = true
            if (this.form.cooperativeType==2) {
              request({
                url: '/channel/makeChannelChange.do',
                method: 'post',
                data: this.form
              }).then(() => {
                this.$alert('渠道资料完成提交，已进入“待签合同”流程，可在『新增渠道』列表页搜索查看。', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$emit('submitSuccess')
                  }
                });
              }).catch(() => {
//              this.$message.error('新增失败');
                this.isSubmitting = false
              })
            } else {
              request({
                url: '/channel/createChannel.do',
                method: 'post',
                data: this.form
              }).then(() => {
                this.$alert('渠道资料完成提交，已进入“待签合同”流程，可在『新增渠道』列表页搜索查看。', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$emit('submitSuccess')
                  }
                });
              }).catch(() => {
                this.$message.error('新增失败');
                this.isSubmitting = false
              })
            }
          } else {
            this.isSubmitting = false
            this.$message.error('请填写全部信息')
            return false
          }
        })
      },

      channelPropChange(val) {
        if(val == 3) {
          this.form.businessEntity = 2
        }
      },
      addContact() {
        this.form.contactData.push({
          dutyNo: '',
          dutyName: '',
          userName: '',
          mobile: '',
          email: '',
          address: '',
          remark: ''
        })
      },
      deleteContact(index) {
        if (this.form.contactData.length > 1) {
          this.form.contactData.splice(index, 1)
        }
      },
      // 渠道变更
      channelChange(value) {
        request({
          url: '/channel/changeCooperativeType.do',
          method: 'post',
          data: { channelNo: value }
        }).then(res => {
          if (res.data.channelNo) {
            if (res.data.formData) {
              let keyArr = Object.keys(res.data.formData)
              keyArr.forEach((e,i,s) => {
                this.$set(this.form,e,res.data.formData[e])
              })
              this.$set(this.form, 'cooperativeType', 2)
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" >
  .mask{
    position: relative;
  }
  .mask:after{
    content: "*";
    position: absolute; 
    color: red;
    font-size:12px;
    z-index: 99;
  }
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

  .form-part-title dd {
    -webkit-margin-start: 0!important
  }
  .addChannelDialog .el-form-item--mini.el-form-item, .addChannelDialog .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
</style>
