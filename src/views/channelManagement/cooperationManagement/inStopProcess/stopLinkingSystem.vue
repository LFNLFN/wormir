<template>
  <div>
    <h3 class="form-part-title">基本信息</h3>
    <!--content-->
    <div class="border1" style="border-top-width: 2px">
      <!--<el-row>-->
      <!--<el-col :span="5">-->
      <!--<div class="grid-content bg-purple ">{{'渠道号'}}</div>-->
      <!--</el-col>-->
      <!--<el-col :span="19">-->
      <!--<div class="grid-content bg-purple-light ">{{currentRow.channelNum}}</div>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <el-row>
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
        <el-col :span="5">
          <div class="grid-content bg-purple ">
            <span v-if="currentRow.businessEntity===0">{{'身份证号'}}</span>
            <span v-if="currentRow.businessEntity===1">{{'公司名称'}}</span>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">
            <span v-if="currentRow.businessEntity===0">{{440682199406776021}}</span>
            <span v-if="currentRow.businessEntity===1">{{'jkl公司'}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity===0">
        <el-col :span="5" style="min-height: 57px">
          <div class="grid-content bg-purple ">{{'身份证正面'}}</div>
        </el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                               height="48px" width="48px"
                                                                               class="link-type"></span></el-col>
        <el-col :span="5" style="min-height: 57px">
          <div class="grid-content bg-purple ">{{'身份证背面'}}</div>
        </el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                               height="48px" width="48px"
                                                                               class="link-type"></span></el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity===1">
        <el-col :span="5" style="min-height: 57px">
          <div class="grid-content bg-purple ">{{'营业执照'}}</div>
        </el-col>
        <el-col :span="19"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                                height="48px" width="48px"
                                                                                class="link-type"></span></el-col>
      </el-row>
    </div>
    <p style="margin: .5em"></p>
    <div class="border1" style="border-top-width: 2px">
      <el-row v-if="currentRow.businessEntity===1">
        <el-col :span="5">
          <div class="grid-content bg-purple">{{'公司地址'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{'广州海珠区'}}</div>
        </el-col>
      </el-row>
      <el-row>
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
          <div class="grid-content bg-purple-light ">{{'123456'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营范围'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{'化妆品'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营过的类似商品'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{'面膜'}}</div>
        </el-col>
      </el-row>
    </div>
    <p style="margin: .5em"></p>
    <div class="border1" style="border-top-width: 2px">
      <el-row>
        <el-col :span="5" style="height: 29px">
          <div class="grid-content bg-purple ">{{'技术对接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">
            <el-select class="noBorderInput marginToLeft" v-model="op_val" placeholder="请选择">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
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
          options: [{
            value: 0,
            label: '停止对接'
          }, {
            value: 1,
            label: '重新对接'
          }],
          op_val: ''
        }
      }
    },
    methods: {
      onSubmit() {
        const vm = this
        this.$alert('已经成功的停止了技术对接！', '', {
          confirmButtonText: this.$t('table.confirm'),
          showClose: false,
          center: true,
          callback() {
            vm.$emit('closeDialog')
          }
        })
      },
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
