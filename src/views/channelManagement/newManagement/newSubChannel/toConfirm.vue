<template>
  <div>
    <!--基本信息below-->
    <h3 class="form-part-title">基本信息</h3>
    <!--content-->
    <div class="border1">
      <el-row style="border-top:solid 1px #D5D5D5">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营主体'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'企业'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'公司名称'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'QWERTY公司'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'营业执照'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'12345678'}}</div>
        </el-col>
      </el-row>
    </div>
    <p style="margin: 1em"></p>
    <div class="border1">
      <el-row style="border-top:solid 1px #D5D5D5">
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'公司地址'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'广州市天河区石牌桥'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'店铺/平台名称'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'QWERTY'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'PC店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'www.qwerty.com'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'手机店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'m.qwerty.com'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营范围'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'化妆品'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营过的类似商品'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'LANCOM 保湿水润面膜'}}</div>
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
    <el-form ref="form" :model="form" label-width="80px" style="margin-top: 1em">
      <el-form-item label="">
        <el-col :span="5">
          <el-button type="warning">纸质合同签订完毕<i class="el-icon-success el-icon--right"></i></el-button>
        </el-col>
        <el-col :span="6" style="margin-right: 1em">
          <el-date-picker type="date" placeholder="开始时间(修改时间)" v-model="form.date1"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1"></el-col>
        <el-col :span="6" style="margin-right: 1em">
          <el-time-picker type="date" placeholder="结束时间(修改时间)" v-model="form.date2"
                          style="width: 100%;"></el-time-picker>
        </el-col>
        <el-col :span="5">
          <el-button type="warning">自动续签<i class="el-icon-success el-icon--right"></i></el-button>
        </el-col>
      </el-form-item>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="onSubmit">确认提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
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
