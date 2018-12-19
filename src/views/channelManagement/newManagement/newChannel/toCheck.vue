<template>
  <div>
    <!--渠道特点-->
    <h3 class="form-part-title">渠道特点</h3>
    <!--content-->
    <div class="border1">
      <el-row class="border-top">
        <el-col :span="5">
          <div class="grid-content bg-purple">{{'渠道属性'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{ currentRow.channelProp | channelProp }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'合作类型'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{ currentRow.cooperationType | cooperationType }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">{{'渠道类别'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">{{ currentRow.channelType | channelType }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">{{'渠道级别'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light" v-if="currentRow.channelLevel">{{ currentRow.channelLevel | channelLevel }}</div>
          <div class="grid-content bg-purple-light" v-else>{{ '暂无数据' }}</div>
        </el-col>
      </el-row>
    </div>

    <!--基本信息below-->
    <h3 class="form-part-title">基本信息</h3>
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
          <div class="grid-content bg-purple-light ">{{ currentRow.idcardNo || '暂无数据' }}</div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.businessEntity==1">
        <el-col :span="5" style="min-height: 56px"><span>身份证正面: </span></el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.idcardFront)"><img :src="currentRow.idcardFront" alt="身份证正面"
                                                                  height="47px" width="47px"
                                                                  class="link-type"></span></el-col>
        <el-col :span="5" style="min-height: 56px"><span>身份证反面: </span></el-col>
        <el-col :span="7"><span @click="viewImage(currentRow.idcardBack)"><img :src="currentRow.idcardBack" alt="身份证反面"
                                                                  height="47px" width="47px"
                                                                  class="link-type"></span></el-col>
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
        <el-col :span="19" style="min-height: 56px"><span @click="viewImage(currentRow.businessLicense)"><img :src="currentRow.businessLicense" alt="营业执照"
                                                                   height="47px" width="47px"
                                                                   class="link-type"></span></el-col>
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
          <div class="grid-content bg-purple ">{{'手机店铺/平台链接'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.appLink  || '暂无数据'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营范围'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.businessRange  || '暂无数据'}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple ">{{'经营过的类似商品'}}</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{currentRow.businessGoods  || '暂无数据'}}</div>
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
        prop="position"
        label="职务"
        align="center"
        min-width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.position">{{ scope.row.position | job  }}</span>
          <span v-else>{{ '暂无数据' }}</span>
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
        <template slot-scope="scope">
          <span v-if="scope.row.address">{{ scope.row.address }}</span>
          <span v-else>{{ '暂无数据' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.remark">{{ scope.row.remark }}</span>
          <span v-else>{{ '暂无数据' }}</span>
        </template>
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
        prop="contractNo"
        label="合同编号"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="contractProp"
        label="合同属性"
        align="center"
        min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.contractProp | contractProp }}</span>
        </template>
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
        prop="status"
        label="合同状态"
        align="center"
        min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.status | contractStatus }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--保证金below-->
    <h3 class="form-part-title">保证金</h3>
    <el-row class="border-top2 border-left border-right border-bottom">
      <el-col :span="5">
        <div class="grid-content bg-purple">{{'保证金金额'}}</div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple-light">￥ {{ currentRow.securityAmount }}-{{ currentRow.securityAmountStatus | securityAmountStatus }}</div>
      </el-col>
    </el-row>

    <!-- viewImage -->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
      <img :src="imageSrc" alt="" width="100%">
    </el-dialog>

  </div>
</template>

<script>
  import request from "@/utils/request";
  import { channelProp, channelType, channelLevel, cooperationType, contractStatus, securityAmountStatus, job } from "@/filters/index.js";

  export default {
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isViewImageShow: false,
        imageSrc: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
        contactData: [],
        contractData: []
      }
    },
    methods: {
      viewImage(src) {
        this.imageSrc = src
        this.isViewImageShow = true
      },
    },
    created() {
      request({
        url: '/channel/channelDetail.do',
        method: 'post',
        data: {
          channelNo: this.currentRow.channelNo,
        }
      }).then((res) => {
        this.contactData = res.data.contactData
        this.contractData = res.data.contract
        console.log(this.contractData)
      }).catch(() => {
        this.$message.error('渠道详情请求失败');
      })
    },
    mounted() {
//      console.log(this.currentRow)
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
