<template>
  <div>
    <template>
      <h3 class="form-part-title">渠道特点</h3>
      <!-- border1 -->
      <div class="">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '渠道号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.channelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <!--<el-row>-->
        <!--<el-col :span="5">-->
        <!--<div class="grid-content bg-purple ">{{'合作类型'}}</div>-->
        <!--</el-col>-->
        <!--<el-col :span="19">-->
        <!--<div class="grid-content bg-purple-light ">{{cooperationTypeMap[currentRow.cooperationType].text}}</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{currentRow.channelProp | channelPropFilter}}</div>
          </el-col>
        </el-row>
        <!--<el-row>-->
        <!--<el-col :span="5">-->
        <!--<div class="grid-content bg-purple ">{{'渠道类别'}}</div>-->
        <!--</el-col>-->
        <!--<el-col :span="19">-->
        <!--<div class="grid-content bg-purple-light ">{{channelTypeMap[currentRow.channelType].text}}</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
      </div>
      <h3 class="form-part-title">基本信息</h3>
      <!-- border1 -->
      <div class="">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple ">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7"><span @click="viewImage(currentRow.identityCardFront)"><img :src="currentRow.identityCardFront" alt=""
                                                                                        height="48px" width="48px"
                                                                                        class="link-type form-photo-offset"></span></el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple ">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7"><span @click="viewImage(currentRow.identityCardContrary)"><img :src="currentRow.identityCardContrary" alt=""
                                                                                           height="48px" width="48px"
                                                                                           class="link-type form-photo-offset"></span></el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple ">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19"><span @click="viewImage(currentRow.businessLicense)">
          <img :src="currentRow.businessLicense" alt=""
               height="48px" width="48px"
               class="link-type form-photo-offset">
        </span></el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <!-- border1 -->
      <div v-if="currentRow.businessEntity==1" class="">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'店铺/平台名称(渠道名称)'}}</div>
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
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <!-- border1 -->
      <div v-if="currentRow.businessEntity==2" class="">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'公司地址'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{currentRow.businessAddress}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'现有子渠道'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{0}}</div>
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
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">联系方式</h3>
      <!-- border-width: 2px;border-bottom-width: 1px; border-top2 border-left2 border-right2-->

      <el-table
        border
        :data="contactData"
        style="width: 100%;"
        class="table_border">
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
      <h3 class="form-part-title">开通审核</h3>
      <!-- border1 -->
      <div class="">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'申请时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light ">{{ $moment(currentRow.createTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
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
            <div class="grid-content bg-purple-light ">{{ $moment(currentRow.checkPassTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">保证金</h3>
      <!-- border1 -->
      <div class="">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple ">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">￥ {{currentRow.securityAmount}} - {{
              currentRow.securityAmountStatus==1? '已支付' : '未支付' }}
            </div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">合同信息</h3>
      <!-- border-width: 2px;border-bottom-width: 1px border-top2 border-left2 border-right2-->
      <el-table
        border
        :data="contractData"
        style="width: 100%;"
        class="table_border">
        <el-table-column
          prop="contractNo"
          label="合同编号"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="contractSigningType"
          label="合同属性"
          align="center"
          min-width="90">
          <template slot-scope="scope">
            {{ scope.row.contractSigningType==1? '首次签订' : '再次签订' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          align="center"
          min-width="110">
          <template slot-scope="scope">
            {{ $moment(scope.row.startTime).format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          align="center"
          min-width="110">
          <template slot-scope="scope">
            {{ $moment(scope.row.endTime).format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="渠道状态"
          align="center"
          min-width="140">
          <template slot-scope="scope">
            <span>{{ currentRow.channelStatus | channelStatusFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
        contactData: [],
        contractData: [],
        terminationData: [],
      }
    },
    created() {

      this.contactData = this.currentRow.contactData
      this.contractData = this.currentRow.contractData
      this.terminationData = this.currentRow.terminationData
    },
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
