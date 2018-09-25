<template>
  <div>
    <!--基本信息below-->
    <h4 style="border-bottom: 2px solid #424242;color: #424242">基本信息</h4>
    <!--content-->
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'经营主体'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'企业'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'公司名称'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'XX公司'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'营业执照'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <p style="margin: 3em"></p>
    <el-row style="border-top: #d5d5d5 solid 1px">
      <el-col :span="5"><div class="grid-content bg-purple ">{{'公司地址'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'店铺/平台名称(渠道名称)'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="3"><div class="grid-content bg-purple ">{{'PC店铺/平台链接'}}</div></el-col>
      <el-col :span="9"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple ">{{'手机店铺/平台链接'}}</div></el-col>
      <el-col :span="9"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'经营范围'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'经营过的类似商品'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <el-row style="margin-top: 1em;">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="技术对接">
            <el-select v-model="op_val" placeholder="请选择">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">提交</el-button>
          </el-form-item>
        </el-form>
    </el-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          options: [{
            value: '1',
            label: '停止对接'
          }, {
            value: '2',
            label: '重新对接'
          }],
          op_val: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px
     &:last-child {
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
    border-left:solid 1px #D5D5D5;
  }
  h4 + .el-row {
    border-top: #d5d5d5 solid 1px;
  }
</style>
