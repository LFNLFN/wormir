<template>
  <div>
    <template v-if="currentRow.channelStatus!==1 && currentRow.channelStatus!==3">
      <!--渠道特点-->
      <h3 class="form-part-title">渠道特点</h3>
      <!--content-->
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.FXQDbelongCode }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.FXQDbelongName}}</div>
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
            <div class="grid-content bg-purple-light ">{{'分销子渠道（FXZQD）'}}</div>
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
    </template>
    <!--基本信息below-->
    <h3 class="form-part-title">基本信息</h3>
    <!--content-->
    <div class="border1">
      <el-row class="border-top">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营主体'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">
            <span v-if="currentRow.businessEntity===0">{{'个人'}}</span>
            <span v-if="currentRow.businessEntity===1">{{'企业'}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" style="height: 38px">
          <div class="grid-content bg-purple ">
            <span v-if="currentRow.businessEntity===0">{{'身份证号'}}</span>
            <span v-if="currentRow.businessEntity===1">{{'公司名称(渠道名称)'}}</span>
          </div>
        </el-col>
        <el-col :span="19" style="height: 38px">
          <div class="marginToLeft">
            <span v-if="currentRow.businessEntity===0">
              <el-input style="height: 27px;" v-model="form.personID"
                        placeholder="请输入身份证号码"></el-input>
            </span>
            <span v-if="currentRow.businessEntity===1">
               <el-input style="height: 27px;" v-model="form.companyID"
                         placeholder="请输入公司名称"></el-input>
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity===0">
        <el-col :span="5" style="min-height: 187px">
          <div class="grid-content bg-purple ">{{'身份证正面'}}</div>
        </el-col>
        <el-col :span="7">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleIDfrontSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="IDfrontImageUrl" :src="IDfrontImageUrl" class="avatar">
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleIDbackSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="IDbackImageUrl" :src="IDbackImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span>提示：点击图片即可上传</span>
        </el-col>
      </el-row>

      <el-row v-if="currentRow.businessEntity===1">
        <el-col :span="5" style="height: 49px;">
          <div class="grid-content bg-purple ">
            <span>{{'公司简介'}}</span>
          </div>
        </el-col>
        <el-col :span="19" style="padding-top: 10px">
          <el-input :rows="1" type="textarea" style="width: 95%;height: 38px;" v-model="form.companySummary"
                    placeholder="请输入公司简介"></el-input>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity===1">
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleLicenseSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="licenseImageUrl" :src="licenseImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span>提示：点击图片即可上传</span>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity===1">
        <el-col :span="5" style="height: 38px">
          <div class="grid-content bg-purple ">
            <span>{{'公司地址'}}</span>
          </div>
        </el-col>
        <el-col :span="19" style="height: 38px">
          <div class="marginToLeft">
            <span>
               <el-input style="height: 27px;" v-model="form.companyAddress"
                         placeholder="请输入公司地址"></el-input>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <p style="margin: .5em"></p>
    <div class="border1">
      <el-row class="border-top">
        <el-col :span="5" style="height: 38px">
          <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
        </el-col>
        <el-col :span="19" style="height: 38px">
          <div class="marginToLeft">
            <span>
               <el-input style="height: 27px;" v-model="form.storeName"
                         placeholder="请输入店铺/平台名称"></el-input>
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{'www.baidu.com'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{'123456'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" style="height: 49px;">
          <div class="grid-content bg-purple ">
            <span>{{'经营范围'}}</span>
          </div>
        </el-col>
        <el-col :span="19" style="padding-top: 10px">
          <el-input :rows="1" type="textarea" style="width: 95%;height: 38px;" v-model="form.businessRange"
                    placeholder="请输入经营范围"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" style="height: 49px;">
          <div class="grid-content bg-purple ">
            <span>{{'经营过的类似商品'}}</span>
          </div>
        </el-col>
        <el-col :span="19" style="padding-top: 10px">
          <el-input :rows="1" type="textarea" style="width: 95%;height: 38px;" v-model="form.similarGoods"
                    placeholder="请输入经营过的类似商品"></el-input>
        </el-col>
      </el-row>
    </div>

    <h3 class="form-part-title">联系方式</h3>
    <el-table
      border
      :data="contactData"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="job"
        label="职务"
        width="150">
        <template slot-scope="scope">
          <el-select v-model="forms[scope.$index].job" placeholder="请选择">
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
        width="150">
        <template slot-scope="scope">
          <el-input v-model="forms[scope.$index].personName" placeholder=""></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="mobile"
        label="电话"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="forms[scope.$index].mobile" placeholder=""></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="email"
        label="邮箱"
        width="220">
        <template slot-scope="scope">
          <el-input v-model="forms[scope.$index].email" placeholder=""></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="地址"
        width="250">
        <template slot-scope="scope">
          <el-input v-model="forms[scope.$index].address" placeholder=""></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注"
        width="250">
        <template slot-scope="scope">
          <el-input v-model="forms[scope.$index].remark" placeholder=""></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="操作" width="170"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-plus" @click="addContact()"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteContact(scope.$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <h3 class="form-part-title">开通审核</h3>
    <div class="border1">
      <el-row class="border-top">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'申请时间'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{Mock.Random.now('yyyy-MM-dd HH:mm:ss')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'审核结果'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{'通过申请'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'通过时间'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{Mock.Random.now('yyyy-MM-dd HH:mm:ss')}}</div>
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
        prop="contractID"
        label="合同编号"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="contractProp"
        label="合同属性"
        align="center"
        min-width="90">
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
        prop="channelStatus"
        label="渠道状态"
        align="center"
        min-width="140">
        <template slot-scope="scope">
          <span>{{'正常合作'}}</span>
          <!--<span v-if="currentRow.channelStatus===0">{{'待审核'}}</span>-->
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
          <div class="grid-content bg-purple-light ">￥ {{10000.00}} - 已支付</div>
        </el-col>
      </el-row>
    </div>
    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit">保存修改</el-button>
    </div>
    <el-dialog :visible.sync="rejectRemindVisible" width="30%" append-to-body :show-close="false">
      <p style="text-align: center">开通申请被驳回，该子渠道已进入“驳回申请”状态。</p>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="closeOutDialog">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Mock from 'mockjs'

  export default {
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        Mock,
        jobType: [
          { label: '渠道联系人', value: 1 },
          { label: '技术对接人', value: 2 },
          { label: '采购', value: 3 },
          { label: '收货人', value: 4 },
          { label: '业务', value: 5 },
          { label: '财务', value: 6 },
          { label: '其他', value: 7 }
        ],
        forms: [],
        isSystemConnectComplete: false,
        licenseImageUrl: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
        IDfrontImageUrl: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
        IDbackImageUrl: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
        contactData: [{
          job: '技术对接人',
          name: '王小虎',
          mobile: 15268172199,
          email: '315889743@qq.com',
          address: '上海市普陀区金沙江路 1518 弄',
          remark: '此人非常重要'
        }],
        contractData: [{
          contractID: 201805000002,
          contractProp: '首次签订',
          startTime: '2018-05-26',
          endTime: '2018-05-29',
          channelStatus: '待激活账号'
        }],
        cooperationTypeMap: {
          0: { text: '渠道入驻', value: 0 },
          1: { text: '渠道变更', value: 1 }
        },
        channelTypeMap: {
          0: { text: '淘宝C店', value: 0 },
          1: { text: '淘宝企业店', value: 1 },
          2: { text: '天猫店', value: 2 },
          3: { text: 'B2C平台', value: 3 },
        },
        channelLevelMap: {
          0: { text: 'A级渠道', value: 0 },
          1: { text: 'B级渠道', value: 1 },
          2: { text: 'C级渠道', value: 2 },
          3: { text: 'C级渠道', value: 3 },
          99: { text: '----', value: 99 },
        },
        isViewImageShow: false,
        imageViewed: null,
        form: {
          reviewResult: null,
          channelLevel: null,
          depositValue: null,
          date1: '',
          date2: '',
          delivery: false,
          personID: '44057643356755',
          companyID: 'abc公司',
          storeName: 'asd专卖店',
          PCLink: 'www.baidu.com',
          appLink: '123456',
          similarGoods: '面膜',
          businessRange: '化妆品',
          companySummary: '售卖进口化妆品',
          companyAddress: '广州珠江新城',
          legalPerson: null
        },
        depositOptions: [
          { label: '¥2000', value: 1 },
          { label: '¥4000', value: 2 },
          { label: '¥10000', value: 3 },
          { label: '¥30000', value: 4 },
          { label: '¥50000', value: 5 }
        ],
        rejectRemindVisible: false
      }
    },
    methods: {
      onSubmit() {
        const vm = this
        this.$alert('渠道档案修改成功。', '', {
          confirmButtonText: this.$t('table.confirm'),
          showClose: false,
          center: true,
          callback() {
            vm.$emit('closeDialog')
          }
        })
      },
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },
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
        this.contactData.push({
          job: '技术对接人',
          name: '王小虎',
          mobile: 15268172199,
          email: '315889743@qq.com',
          address: '上海市普陀区金沙江路 1518 弄',
          remark: '此人非常重要'
        })
        this.forms.push({
          job: null,
          personName: null,
          mobile: null,
          email: null,
          address: null,
          remark: null
        })
      },
      deleteContact(index) {
        this.contactData.splice(index, 1)
      }
    },
    mounted() {
      this.forms.push({
        job: 2,
        personName: 'tt',
        mobile: '13456787678',
        email: '123456789@qq.com',
        address: '广州',
        remark: ''
      })
      this.forms[0].channelType = this.currentRow.channelType
      this.forms[0].businessEntity = this.Mock.Random.natural(0, 1)
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
