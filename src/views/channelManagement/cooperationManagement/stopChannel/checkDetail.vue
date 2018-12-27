<template>
  <div>
    <!--渠道特点-->
    <h3 class="form-part-title">渠道特点</h3>
    <!--content-->
    <div class="border1" style="border-top-width: 2px">
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">渠道属性</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{channelPropMap[currentRow.channelProp].text}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">合作类型</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{cooperationTypeMap[currentRow.cooperationType].text}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">渠道类别</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{channelTypeMap[currentRow.channelType].text}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">渠道级别</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{ channelLevelMap[currentRow.channelLevel].text }}</div>
        </el-col>
      </el-row>
    </div>
    <!--基本信息below-->
    <h3 class="form-part-title">基本信息</h3>
    <!--content-->
    <div class="border1">
      <el-row class="border-top">
        <el-col :span="5">
          <div class="grid-content bg-purple ">渠道号}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.channelNum}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">经营主体</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">
            <span v-if="currentRow.businessEntity===1">个人</span>
            <span v-if="currentRow.businessEntity===2">企业</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">
            <span v-if="currentRow.businessEntity===1">身份证号</span>
            <span v-if="currentRow.businessEntity===2">公司名称</span>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">
            <span v-if="currentRow.businessEntity===1">440682199406776021</span>
            <span v-if="currentRow.businessEntity===2">{{'jkl公司'}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity===1">
        <el-col :span="5" style="min-height: 57px">
          <div class="grid-content bg-purple ">身份证正面</div>
        </el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                               height="48px" width="48px"
                                                                               class="link-type"></span></el-col>
        <el-col :span="5" style="min-height: 57px">
          <div class="grid-content bg-purple ">身份证背面</div>
        </el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                               height="48px" width="48px"
                                                                               class="link-type"></span></el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity===2">
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
    <!--合同信息below-->
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
          <span v-if="">{{'停止合作'}}</span>
          <!--<span v-if="currentRow.channelStatus===0">{{'待审核'}}</span>-->
        </template>
      </el-table-column>
      <el-table-column
        prop="orderStockStatus"
        label="订货状态"
        align="center"
        min-width="120">
        <template slot-scope="scope">
          <span v-if="">{{'关闭订货'}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--终止情况below-->
    <h3 class="form-part-title">终止情况</h3>
    <el-table
      border
      :data="contractData"
      style="width: 100%;border-bottom-width: 1px"
      class="border2">
      <el-table-column
        prop=""
        label="终止操作"
        align="center"
        min-width="150">
        <template slot-scope="scope">
          <span>注销渠道</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="终止类型"
        align="center"
        min-width="150">
        <template slot-scope="scope">
          <span>提前终止</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        align="center"
        min-width="140"
        label="终止日期">
        <template slot-scope="scope">
          <span>2018-04-11</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        align="center"
        min-width="140"
        label="技术对接">
        <template slot-scope="scope">
          <span>完成对接系统</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        min-width="160"
        align="center"
        label="终止原因">
        <template slot-scope="scope">
          <span>渠道异常</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        min-width="160"
        align="center"
        label="注销时间">
        <template slot-scope="scope">
          <span>2018-04-11 21:39:44</span>
        </template>
      </el-table-column>
    </el-table>
    <!--保证金below-->
    <h3 class="form-part-title">保证金</h3>
    <div class="border1" style="border-top-width: 2px">
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'保证金金额'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">{{'¥ 10000 - 已支付'}}</div>
        </el-col>
      </el-row>
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
          channelStatus: '待激活账号',
          orderStockStatus: null
        }],
        channelCodeMap: {
          0: { text: 'DLQD', value: 0 },
          1: { text: 'DFQD', value: 1 },
          2: { text: 'FXQD', value: 2 }
        },
        channelStatusMap: {
          0: { text: '待签合同', value: 0 },
          1: { text: '待激活账号', value: 1 },
          2: { text: '待付保证金', value: 2 },
          3: { text: '待接系统', value: 3 },
          4: { text: '停止签合同', value: 4 },
          5: { text: '停止激活账户', value: 5 },
          6: { text: '停止付保证金', value: 6 }
        },
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
        channelPropMap: {
          0: { text: '独立渠道(DLQD)', value: 0 },
          1: { text: '代发渠道(DFQD)', value: 1 },
          2: { text: '分销渠道(FXQD)', value: 2 },
        },
        channelLevelMap: {
          0: { text: 'A级渠道', value: 0 },
          1: { text: 'B级渠道', value: 1 },
          2: { text: 'C级渠道', value: 2 },
          3: { text: 'C级渠道', value: 3 },
        }
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
