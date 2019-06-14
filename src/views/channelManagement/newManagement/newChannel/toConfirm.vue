<template>
  <div>
    <!--基本信息below-->
    <h3 class="form-part-title">基本信息</h3>
    <!--content-->
    <div class="border1">
      <el-row style="border-top:solid 1px #D5D5D5">
        <el-col :span="5">
          <div class="grid-content bg-purple">{{'经营主体'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{ currentRow.businessEntity | businessEntity }}</div>
        </el-col>
      </el-row>


      <el-row v-if="currentRow.businessEntity==1">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'身份证号码'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{ currentRow.identityCardNo || '暂无数据' }}</div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity==1">
        <el-col :span="5" style="min-height: 56px"><span>身份证正面: </span></el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.identityCardFront)"><img :src="currentRow.identityCardFront" alt="身份证正面"
                                                                  height="47px" width="47px"
                                                                  class="link-type form-photo-offset"></span></el-col>
        <el-col :span="5" style="min-height: 56px"><span>身份证反面: </span></el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.identityCardContrary)"><img :src="currentRow.identityCardContrary" alt="身份证反面"
                                                                  height="47px" width="47px"
                                                                  class="link-type form-photo-offset"></span></el-col>
      </el-row>


      <el-row v-if="currentRow.businessEntity==2">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'公司名称'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{ currentRow.companyName || '暂无数据' }}</div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity==2">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'公司简介'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{ currentRow.companyProfile || '暂无数据' }}</div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity==2">
        <el-col :span="5" style="min-height: 56px"><span>营业执照: </span></el-col>
        <el-col :span="19"><span @click="viewImage(currentRow.businessLicense)"><img :src="currentRow.businessLicense" alt="营业执照"
                                                                   height="47px" width="47px"
                                                                   class="link-type form-photo-offset"></span></el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity==2">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'法人'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{ currentRow.legalPerson || '暂无数据' }}</div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity==2">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'公司地址'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{ currentRow.businessAddress || '暂无数据' }}</div>
        </el-col>
      </el-row>

    </div>

    <p style="margin: 1em"></p>
    <div class="border1" style="border-top:solid 2px #D5D5D5">
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'店铺/平台名称'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.channelName}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'PC店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.PCLink  || '暂无数据'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{ '手机店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{ currentRow.appLink  || '暂无数据' }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营范围'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.businessRange || '暂无数据'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营过的类似商品'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.businessGoods || '暂无数据'}}</div>
        </el-col>
      </el-row>
    </div>

    <h3 class="form-part-title">联系方式</h3>
    <el-table
      border
      :data="contactData"
      style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
      class="border-top2 border-left2 border-right2">
      <el-table-column
        prop="dutyNo"
        label="职务"
        align="center"
        min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.dutyNo | job }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
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
    <!--合同签订below，签合同前-->
    <div v-if="currentRow.channelStatus==100">
      <el-row style="margin-top: 1.5em" class="border-top">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="margin: 1em 0">合同签订</div>
        </el-col>
      </el-row>
      <!--content-->
      <el-form ref="form" :inline="true" :model="form" label-width="80px" style="margin-top: 1em;text-align: center" :rules="formRules" class="demo-form-inline">
        <el-form-item label="">
          <!--<el-button type="warning">纸质合同签订完毕<i class="el-icon-success el-icon&#45;&#45;right"></i></el-button>-->
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <!--<el-button type="warning">自动续签<i class="el-icon-success el-icon&#45;&#45;right"></i></el-button>-->
        <div class="dialogBottomButton-wrap">
          <el-button type="primary" @click="onSubmit" :loading="isSubmitting">确认提交</el-button>
        </div>
      </el-form>
    </div>

    <!--技术对接-->
    <div v-if="currentRow.channelStatus==400">
      <!--content-->
      <el-form ref="form" :inline="true" :model="form" label-width="80px" style="margin-top: 1em;text-align: center" :rules="formRules" class="demo-form-inline">
        <!--<el-button type="warning">自动续签<i class="el-icon-success el-icon&#45;&#45;right"></i></el-button>-->
        <div class="dialogBottomButton-wrap">
          <el-button type="primary" @click="completeConnect" :loading="isSubmitting">完成系统对接，确认开通订货功能</el-button>
        </div>
      </el-form>
    </div>

    <!-- viewImage -->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
      <img :src="imageSrc" alt="" width="100%">
    </el-dialog>

  </div>
</template>

<script>
  import request from "@/utils/request";
  import { parseTime } from "@/utils/index.js";

  export default {
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          dateRange: null,
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        imageSrc: '',
        isViewImageShow: false,
        isSubmitting: false,
        formRules: {},
        contactData: []
      }
    },
    methods: {
      viewImage(src) {
        this.imageSrc = src
        this.isViewImageShow = true
      },
      onSubmit() {
        this.isSubmitting = true
        if(!this.form.dateRange) {
          this.$message.error('请填写合同签订时间！');
          this.isSubmitting = false
          return false
        }
        let clientPhone = []
        this.contactData.forEach((e,i,s) => {
          clientPhone.push(e.mobile)
        })
        clientPhone = clientPhone.filter((e,i,s) => {
          return s.indexOf(e) == i
        })
        request({
          url: '/channel/createContract.do',
          method: 'post',
          data: {
            channelNo: this.currentRow.channelNo,
            startTime: this.form.dateRange[0],
            endTime: this.form.dateRange[1],
            phone: clientPhone,
          }
        }).then((res) => {
          if (res.errorCode==0) {
            this.$alert('渠道号已开通，帐号和原始密码已经发送至渠道联系人手机号，请通知渠道依照短信指引激活帐号，交付保证金后开始安排技术对接。', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$emit('submitSuccess')
              }
            });

          }
        } ).catch(() => {
          this.$message.error('操作失败');
          this.isSubmitting = false
        })
      },
      completeConnect() {
        this.isSubmitting = true
        request({
          url: '/channel/completeConnect.do',
          method: 'post',
          data: {
            channelCode: this.currentRow.channelNo
          }
        }).then((res) => {
          if (res.errorCode==0) {
            this.$alert('渠道号已完成对接并开通订货功能。', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$emit('submitSuccess')
              }
            });

          }
        } ).catch(() => {
          this.$message.error('操作失败');
          this.isSubmitting = false
        })
      }
    },
    created() {
      this.contactData = this.currentRow.contactData
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

  .grid-content {
    /*min-height: 36px*/
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
</style>
