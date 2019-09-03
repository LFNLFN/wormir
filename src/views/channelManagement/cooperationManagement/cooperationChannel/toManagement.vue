<template>
  <div>
    <el-form ref="form" :model="form" :rules="formRules">
      <!--渠道特点-->
      <h3 class="form-part-title">渠道特点</h3>
      <!--content-->
      <div class="border1" style="border-top-width: 2px">
        <el-row v-if="false">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ '未开发功能' }}</div>
          </el-col>
        </el-row>
        <el-row v-if="false">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ '未开发功能' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '渠道号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.channelNum }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '渠道名称' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.channelName }}</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'合作类型'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{cooperationTypeMap[currentRow.cooperationType].text}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{ currentRow.channelProp | channelPropFilter }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'渠道级别'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{channelLevelMap[currentRow.channelLevel].text}}</div>
          </el-col>
        </el-row>
      </div>
      <!--基本信息below-->
      <h3 class="form-part-title">基本信息</h3>
      <!--content-->
      <div class="border1 form-error-beyond">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" style="height: 38px">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称(渠道名称)'}}</span>
            </div>
          </el-col>
          <el-col :span="19" style="height: 38px">
            <div class="marginToLeft">
            <span v-if="currentRow.businessEntity==1">
              <el-form-item label="" prop="idcardNo">
              <el-input style="height: 27px;width: 250px" v-model.lazy="form.idcardNo"
                        placeholder="请输入身份证号码"></el-input>
              </el-form-item>
            </span>
              <span v-if="currentRow.businessEntity===2">
               <el-input style="height: 27px;" v-model="form.channelName"
                         placeholder="请输入公司名称"></el-input>
            </span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 187px">
            <div class="grid-content bg-purple ">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadfrontAction"
              :before-upload="beforeAvatarUpload">
              <img v-if="this.form.idcardFront" :src="this.form.idcardFront" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>提示：点击图片即可上传</span>
          </el-col>
          <el-col :span="5" style="min-height: 187px">
            <div class="grid-content bg-purple ">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadBackAction"
              :before-upload="beforeAvatarUpload">
              <img v-if="this.form.idcardBack" :src="this.form.idcardBack" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>提示：点击图片即可上传</span>
          </el-col>
        </el-row>

        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="height: 49px;">
            <div class="grid-content bg-purple ">
              <span>{{'公司简介'}}</span>
            </div>
          </el-col>
          <el-col :span="19" style="padding-top: 10px">
            <el-input :rows="1" type="textarea" style="width: 95%;height: 38px;" v-model="form.companyProfile"
                      placeholder="请输入公司简介"></el-input>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 187px">
            <div class="grid-content bg-purple ">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <!--<span @click="viewImage(currentRow.proofImage)">-->
            <!--<img :src="currentRow.proofImage" alt=""-->
            <!--height="48px" width="48px"-->
            <!--class="link-type">-->
            <!--</span>-->
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="uploadBusinessLicenseAction"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.businessLicense" :src="form.businessLicense" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>提示：点击图片即可上传</span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="height: 38px">
            <div class="grid-content bg-purple ">
              <span>{{'公司地址'}}</span>
            </div>
          </el-col>
          <el-col :span="19" style="height: 38px">
            <div class="marginToLeft">
            <span>
               <el-input style="height: 27px;" v-model="form.businessAddress"
                         placeholder="请输入公司地址"></el-input>
            </span>
            </div>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1 form-error-beyond">
        <el-row class="border-top">
          <el-col :span="5" style="height: 38px">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19" style="height: 38px">
            <div class="marginToLeft">
            <span>
               <el-form-item label="" prop="channelName">
               <el-input style="height: 27px;width: 250px" v-model.lazy="form.channelName"
                         placeholder="请输入店铺/平台名称"></el-input>
               </el-form-item>
            </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.PCLink }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.appLink }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" style="height: 49px;">
            <div class="grid-content bg-purple ">
              <span>{{'经营范围'}}</span>
            </div>
          </el-col>
          <el-col :span="19" style="padding-top: 10px">
            <el-form-item label="" prop="businessRange">
              <el-input :rows="1" type="textarea" style="width: 550px;height: 38px;" v-model="form.businessRange"
                        placeholder="请输入经营范围"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" style="height: 49px;">
            <div class="grid-content bg-purple ">
              <span>{{'经营过的类似商品'}}</span>
            </div>
          </el-col>
          <el-col :span="19" style="padding-top: 10px">
            <el-form-item label="" prop="businessGoods">
              <el-input :rows="1" type="textarea" style="width: 550px;height: 38px;" v-model="form.businessGoods"
                        placeholder="请输入经营过的类似商品"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <h3 class="form-part-title" v-if="form.contactData">联系方式</h3>
      <el-form-item prop="contactData" v-if="form.contactData">
        <el-table
          border
          :data="form.contactData"
          class="border2"
          style="width: 100%">
          <el-table-column
            align="center"
            prop="position"
            label="职务"
            width="150">
            <template slot-scope="scope">
              <el-select v-model="form.contactData[scope.$index].position" placeholder="请选择">
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
            prop="userName"
            label="姓名"
            width="150">
            <template slot-scope="scope">
              <el-input v-model="form.contactData[scope.$index].userName" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="mobile"
            label="电话"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="form.contactData[scope.$index].mobile" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="email"
            label="邮箱"
            width="220">
            <template slot-scope="scope">
              <el-input v-model="form.contactData[scope.$index].email" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="地址"
            width="250">
            <template slot-scope="scope">
              <el-input v-model="form.contactData[scope.$index].address" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="remark"
            label="备注"
            width="250">
            <template slot-scope="scope">
              <el-input v-model="form.contactData[scope.$index].remark" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop=""
            class-name="last-col-td0"
            label="操作" width="170"
            fixed="right">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-plus" @click="addContact()"></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="deleteContact(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <h3 class="form-part-title">开通审核</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'申请时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{ currentRow.openedDate }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'审核结果'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{ '已通过' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'通过时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{ currentRow.openedDate }}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">合同信息</h3>
      <el-table
        border
        :data="contractData"
        style="width: 100%"
        class="border-top2 border-left2 border-right2">
        <el-table-column
          prop="contractNo"
          label="合同编号"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="contractProp"
          label="合同属性"
          align="center"
          min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.contractProp | contractProp }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          align="center"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="status"
          label="合同状态"
          align="center"
          min-width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.status | contractStatus }}</span>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="form-part-title">保证金</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">￥ {{ currentRow.securityAmount }} - {{
              currentRow.securityAmountStatus==1? '已缴纳' : '未缴纳' }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="onSubmit" :loading="isSubmitting">保存修改</el-button>
      </div>
      <el-dialog :visible.sync="rejectRemindVisible" width="30%" append-to-body :show-close="false">
        <p style="text-align: center">开通申请被驳回，该子渠道已进入“驳回申请”状态。</p>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="closeOutDialog">知道了</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import { channelProp, channelStatus, contractStatus, contractProp, job } from '@/filters/index.js'
  import request from "@/utils/request"

  const qiniu = require('qiniu-js')

  export default {
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    data() {

      var validateContact = (rule, value, callback) => {
        if (!value) {
          callback(new Error('联系人表格不能留空。'))
        }
        let vali = false;
        let valiNull = value.some((item, index, arr) => {
          for (var key in item) {
            if ((!item[key])&&(key!=='remark')) {
              vali = true;
              break;
            }
          }
          return vali
        });
        // 渠道联系人
        let valiRequired1 = value.some((item, index, arr) => {
          return item.position == 1;
        });
        // 技术对接人
        let valiRequired2 = value.some((item, index, arr) => {
          return item.position == 2;
        });
        if (valiNull) {
          callback(new Error("联系方式表格除“备注”外不能留空！"));
        }
        else if (!(valiRequired1 && valiRequired2)) {
          callback(new Error("渠道联系人和技术对接人必须填写！"));
        } else {
          callback();
        }
      }

      return {
        Mock,
        isSubmitting: false,
        jobType: [
          { label: '渠道联系人', value: 1 },
          { label: '技术对接人', value: 2 },
          { label: '采购', value: 3 },
          { label: '收货人', value: 4 },
          { label: '业务', value: 5 },
          { label: '财务', value: 6 },
          { label: '其他', value: 7 }
        ],
        isSystemConnectComplete: false,
        licenseImageUrl: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
        IDfrontImageUrl: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
        IDbackImageUrl: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',

        cooperationTypeMap: {
          1: { text: '渠道入驻', value: 1 },
          2: { text: '渠道变更', value: 2 }
        },
        channelTypeMap: {
          0: { text: '----', value: 0 },
          1: { text: '淘宝C店', value: 1 },
          2: { text: '淘宝企业店', value: 2 },
          3: { text: '天猫店', value: 3 },
          4: { text: 'B2C平台', value: 4 },
        },
        channelLevelMap: {
          0: { text: '----', value: 0 },
          1: { text: 'A级渠道', value: 1 },
          2: { text: 'B级渠道', value: 2 },
          3: { text: 'C级渠道', value: 3 },
          4: { text: 'C级渠道', value: 4 },
          99: { text: '----', value: 99 },
        },
        isViewImageShow: false,
        imageViewed: null,
        form: {
          idcardNo: '449926837749882793（缺少数据）',
          idcardFront: '',
          idcardBack: '',

          businessLicense: '',
          companyName: '',
          channelName: '',
          PCLink: '',
          appLink: '',
          businessGoods: '',
          businessRange: '',
          companySummary: '',
          businessAddress: '',

          contactData: [],

        },

        contractData: [],

        depositOptions: [
          { label: '¥2000', value: 1 },
          { label: '¥4000', value: 2 },
          { label: '¥10000', value: 3 },
          { label: '¥30000', value: 4 },
          { label: '¥50000', value: 5 }
        ],
        rejectRemindVisible: false,
        channelStatusMap: {
          '-1000': { text: '停止合作', value: -1000 },
          '-100': { text: '停止签合同', value: -100 },
          '-200': { text: '停止激活账号', value: -200 },
          '-300': { text: '停止付保证金', value: -300 },
          '-350': { text: '不返还保证金', value: -350 },
          '-400': { text: '停止技术对接', value: -400 },
          '-50': { text: '停止审核', value: -50 },
          '-40': { text: '审核不通过', value: -40 },
          '-950': { text: '待返还保证金', value: -950 },
          '-900': { text: '已返还保证金', value: -900 },
          '40': { text: '待提交审核', value: 40 },
          '50': { text: '待审核', value: 50 },
          100: { text: '待签合同', value: 100 },
          200: { text: '待激活账号', value: 200 },
          300: { text: '待付保证金', value: 300 },
          400: { text: '待接系统', value: 400 },
          1000: { text: '已开通', value: 1000 },
        },

        formRules: {
          idcardNo: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
          channelName: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
          businessRange: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
          businessGoods: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
          contactData: [
            { validator: validateContact, required: true, trigger: "change" }
          ],
        }

      }
    },
    methods: {
      onSubmit() {
        this.isSubmitting = true
         console.log(this.form)
//        return false
        this.$refs['form'].validate((valid) => {
          if (valid) {
            request({
              url: "/channel/updateChannel.do",
              method: "post",
              data: this.form
            })
              .then((res) => {
                if (res.errorCode == 0) {
                  this.$emit("submitSuccess")
                } else {
                  this.$message.error("操作失败")
                  this.isSubmitting = false
                }
              })
              .catch(() => {
                this.$message.error("操作失败")
                this.isSubmitting = false
              })
          } else {
            this.isSubmitting = false
            this.$message.error("请填写全部信息")
            return false
          }
        })
      },
      // 图片相关^
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
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
      // 图片相关$
      closeOutDialog() {
        this.$emit('closeDialog')
      },
      connectComplete() {
        const vm = this
        this.$alert('已完成对接系统，该渠道订货功能已开通。', '', {
          confirmButtonText: this.$t('table.confirm'),
          showClose: false,
          center: true,
          callback() {
            vm.$emit('closeDialog')
          }
        })
      },
      handleLicenseSuccess(res, file) {
        this.licenseImageUrl = URL.createObjectURL(file.raw);
      },
      handleIDfrontSuccess(res, file) {
        this.IDfrontImageUrl = URL.createObjectURL(file.raw);
      },
      handleIDbackSuccess(res, file) {
        this.IDbackImageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

//        if (!isJPG) {
//          this.$message.error('上传头像图片只能是 JPG 格式!');
//        }
//        if (!isLt2M) {
//          this.$message.error('上传头像图片大小不能超过 2MB!');
//        }
        return isJPG && isLt2M
      },
      addContact() {
        this.form.contactData.push({
          position: '',
          name: '',
          mobile: '',
          email: '',
          address: '',
          remark: ''
        })
      },
      deleteContact(index) {
        if (this.form.contactData.length<=1) {
          this.$message.error('不能清空联系方式');
          return false
        }
        this.form.contactData.splice(index, 1)
      }
    },
    mounted() {
      this.form.channelNo = this.currentRow.channelNo
      request({
        url: '/channel/channelDetail.do',
        method: 'post',
        data: {
          channelNo: this.currentRow.channelNo,
        }
      }).then((res) => {
        this.form.contactData = res.data.contactData
        this.contractData = res.data.contract
      }).catch(() => {
        this.$message.error('渠道详情请求失败');
      })
      this.form = this.currentRow

    }
  }
</script>

<style lang="scss" scoped>
  .el-row {

  margin-bottom:

  20
  px
  & :last-child {
    margin-bottom: 0
  }

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc
  }

  .el-row .el-col:nth-child(odd) {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
    border-bottom: 1px #d5d5d5 solid;
  }

  .el-row .el-col:nth-child(even) {
    color: #424242;
    display: flex;
    align-items: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
    border-bottom: 1px #d5d5d5 solid;
  }

  .el-row .el-col:nth-child(even) div {
    padding-left: 1em;
  }

  .el-row .el-col:first-of-type {
    border-left: solid 1px #D5D5D5;
  }

  h4 + .el-row {
    border-top: #d5d5d5 solid 1px;
  }

  .form-row {
    margin-bottom: 0;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
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
</style>
