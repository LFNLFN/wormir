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
          <div class="grid-content bg-purple-light ">{{ currentRow.companyName || '暂无数据' }}</div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity==1">
        <el-col :span="5" style="min-height: 56px"><span>身份证正面: </span></el-col>
        <el-col :span="7"><span @click="viewImage(imageSrc)"><img :src="imageSrc" alt="身份证正面"
                                                                  height="47px" width="47px"
                                                                  class="link-type form-photo-offset"></span></el-col>
        <el-col :span="5" style="min-height: 56px"><span>身份证反面: </span></el-col>
        <el-col :span="7"><span @click="viewImage(imageSrc)"><img :src="imageSrc" alt="身份证反面"
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
          <div class="grid-content bg-purple-light ">{{ currentRow.companySummary || '暂无数据' }}</div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity==2">
        <el-col :span="5" style="min-height: 56px"><span>营业执照: </span></el-col>
        <el-col :span="19"><span @click="viewImage(imageSrc)"><img :src="imageSrc" alt="营业执照"
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
          <div class="grid-content bg-purple-light ">{{ currentRow.companyAddress || '暂无数据' }}</div>
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
          <div class="grid-content bg-purple-light ">{{currentRow.PCLink}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'PC店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.PCLink}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'手机店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.appLink}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营范围'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.businessRange}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营过的类似商品'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.businessGoods}}</div>
        </el-col>
      </el-row>
    </div>
    <!--合同签订below-->
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
        imageSrc: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
        isViewImageShow: false,
        isSubmitting: false,
        formRules: {}
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
        request({
          url: '/channel/createContract.do',
          method: 'post',
          data: {
            channelNo: this.currentRow.channelNo,
            startTime: this.form.dateRange[0],
            endTime: this.form.dateRange[1]
          }
        }).then(() => {
          this.$emit('submitSuccess')
        }).catch(() => {
          this.$message.error('操作失败');
          this.isSubmitting = false
        })
      }
    },
    filters: {
      businessEntity: function(value) {
        const statusMap = {
          1: '个人',
          2: '企业',
        }
        return statusMap[value]
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
