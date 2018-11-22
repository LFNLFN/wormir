<template>
  <div>
    <!--渠道特点-->
    <h3 class="form-part-title">渠道特点</h3>
    <!--content-->
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'渠道属性'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'独立渠道(DLQD)'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'合作类型'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'渠道入驻'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'渠道类别'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'淘宝企业店'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'渠道级别'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'B级渠道'}}</div></el-col>
    </el-row>
    <!--基本信息below-->
    <h3 class="form-part-title">基本信息</h3>
    <!--content-->
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'渠道号'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'DLQD20180522001'}}</div></el-col>
    </el-row>
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
      <el-col :span="5"><div class="grid-content bg-purple ">{{'PC店铺/平台链接'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'手机店铺/平台链接'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'经营范围'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'经营过的类似商品'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'aaaa'}}</div></el-col>
    </el-row>
    <!--合同签订below-->
    <h3 class="form-part-title">联系方式</h3>
    <el-table
      border
      :data="contactData"
      style="width: 100%">
      <el-table-column
        prop="job"
        label="职务"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
    </el-table>
    <!--合同信息below-->
    <h3 class="form-part-title">合同信息</h3>
    <el-table
      border
      :data="contractData"
      style="width: 100%">
      <el-table-column
        prop="contractID"
        label="合同编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="contractProp"
        label="合同属性"
        width="180">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="channelStatus"
        label="渠道状态">
      </el-table-column>
    </el-table>
    <!--保证金below-->
    <h3 class="form-part-title">保证金</h3>
    <el-row>
      <el-col :span="5"><div class="grid-content bg-purple ">{{'保证金金额'}}</div></el-col>
      <el-col :span="19"><div class="grid-content bg-purple-light " @click="">{{'¥ 10000 - 未支付'}}</div></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        contactData: [{
          job: '技术对接人',
          name: '王小虎',
          mobile: 15268172199,
          email: '315889743@qq.com',
          address: '上海市普陀区金沙江路 1518 弄',
          remark: '此人非常重要'
        }, {
          job: '技术对接人',
          name: '王小虎',
          mobile: 15268172199,
          email: '315889743@qq.com',
          address: '上海市普陀区金沙江路 1518 弄',
          remark: '此人非常重要'
        }, {
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
        }]
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
