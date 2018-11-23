<template>
  <div>
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
    </div>

    <!--基本信息below-->
    <h3 class="form-part-title">基本信息</h3>
    <!--content-->
    <div class="border1">
      <el-row class="border-top">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营主体'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{'个人'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'身份证号'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{440682199406776021}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" style="min-height: 57px">
          <div class="grid-content bg-purple ">{{'身份证正面'}}</div>
        </el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt="" height="48px" width="48px" class="link-type"></span></el-col>
        <el-col :span="5" style="min-height: 57px">
          <div class="grid-content bg-purple ">{{'身份证背面'}}</div>
        </el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt="" height="48px" width="48px" class="link-type"></span></el-col>
      </el-row>
    </div>
    <p style="margin: .5em"></p>
    <div class="border1">
      <el-row class="border-top">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'店铺/平台名称(渠道名称)'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{'asd专卖店'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'PC店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{'www.baidu.com'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'手机店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " >{{'123456'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营范围'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " >{{'化妆品'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营过的类似商品'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'面膜'}}</div>
        </el-col>
      </el-row>
    </div>
    <!--合同签订below-->
    <h3 class="form-part-title">联系方式</h3>
    <el-table
      border
      :data="contactData"
      style="width: 100%"
      class="border-top2 border-left2 border-right2">
      <el-table-column
        prop="job"
        label="职务"
        align="center"
        min-width="90">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        min-width="80">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        align="center"
        min-width="90">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        min-width="110">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
        min-width="100">
      </el-table-column>
    </el-table>

    <h3 class="form-part-title">开通审核</h3>
    <el-form ref="form" :model="form" label-width="120px" class="border1" style="border-bottom-width: 2px">
      <el-form-item label="申请时间" class="form-row">
        <div>{{ Mock.Random.now('yyyy-MM-dd HH:mm:ss'), }}</div>
      </el-form-item>
      <el-form-item label="审核结果" class="form-row">
        <el-radio-group v-model="form.reviewResult">
          <el-radio label="1">通过申请</el-radio>
          <el-radio label="0">驳回申请</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="渠道级别" class="form-row">
        <el-radio-group v-model="form.channelLevel">
          <el-radio label="0">A级渠道</el-radio>
          <el-radio label="1">B级渠道</el-radio>
          <el-radio label="2">C级渠道</el-radio>
          <el-radio label="3">D级渠道</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="保证金金额" class="form-row">
        <el-select class="noBorderInput" v-model="form.depositValue" placeholder="请选择">
          <el-option
            v-for="item in depositOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit">审核确认</el-button>
    </div>
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
          depositValue: null
        },
        depositOptions: [
          { label: '¥2000', value: 1 },
          { label: '¥4000', value: 2 },
          { label: '¥10000', value: 3 },
          { label: '¥30000', value: 4 },
          { label: '¥50000', value: 5 }
        ],
      }
    },
    methods: {
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },
      onSubmit() {
        this.$message('submit!')
      }
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
</style>
