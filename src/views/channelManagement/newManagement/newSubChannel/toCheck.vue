<template>
  <div>
    <!--待审核-->
    <template v-if="currentRow.channelStatus==50">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.parentChannelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.parentChannelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'合作类型'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">渠道入驻</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'分销子渠道（FXZQD）'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">基本信息</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardFront)">
              <img
                :src="currentRow.identityCardFront"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardContrary)">
              <img
                :src="currentRow.identityCardContrary"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <span @click="viewImage(currentRow.businessLicense)">
              <img
                :src="currentRow.businessLicense"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.PCLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.appLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营范围'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessRange}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营过的类似商品'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">联系方式</h3>
      <el-table
        border=""
        :data="contactData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="110"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
    </template>
    <!--停止审核-->
    <template v-if="currentRow.channelStatus==-50">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.parentChannelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.parentChannelName}}</div>
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
            <div class="grid-content bg-purple">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'分销子渠道（FXZQD）'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">基本信息</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardFront)">
              <img
                :src="currentRow.identityCardFront"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardContrary)">
              <img
                :src="currentRow.identityCardContrary"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <span @click="viewImage(currentRow.businessLicense)">
              <img
                :src="currentRow.businessLicense"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.PCLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.appLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营范围'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessRange}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营过的类似商品'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">联系方式</h3>
      <el-table
        border=""
        :data="contactData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="110"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
      <h3 class="form-part-title">终止情况</h3>
      <el-table
        border=""
        :data="terminationData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="terminationType" label="终止类型" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.terminationType | channelTerminationTypeFilter }}</span> -->
            <span>强制终止</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="terminationTime"-->
        <!--label="终止时间"-->
        <!--align="center"-->
        <!--min-width="80">-->
        <!--</el-table-column>-->
        <el-table-column prop="technologyTransferStatus" label="技术对接" align="center" min-width="90">
          <template
            slot-scope="scope"
          >{{ scope.row.technologyTransferStatus | technologyTransferStatusFilter }}</template>
        </el-table-column>
        <el-table-column prop="terminationReason" label="终止原因" align="center" min-width="110"></el-table-column>
        <el-table-column prop="terminationTime" label="注销时间" align="center" min-width="140"></el-table-column>
      </el-table>
      <h3 class="form-part-title">保证金</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              ￥ 0.00 - {{
              currentRow.securityAmountStatus==1? '已支付' : '未支付' }}
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <!--审核不通过-->
    <template v-if="currentRow.channelStatus==-40">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.parentChannelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.parentChannelName}}</div>
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
            <div class="grid-content bg-purple">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'分销子渠道（FXZQD）'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">基本信息</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardFront)">
              <img
                :src="currentRow.identityCardFront"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardContrary)">
              <img
                :src="currentRow.identityCardContrary"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <span @click="viewImage(currentRow.businessLicense)">
              <img
                :src="currentRow.businessLicense"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.PCLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.appLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营范围'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessRange}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营过的类似商品'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">联系方式</h3>
      <el-table
        border=""
        :data="contactData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="110"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
      <h3 class="form-part-title">开通审核</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'申请时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.createTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'审核结果'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'驳回申请'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'驳回理由'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.checkRejectReason }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'驳回时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.checkRejectTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">保证金</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >￥ 0.00 - {{ currentRow.securityAmountStatus==1? '已支付' : '未支付' }}</div>
          </el-col>
        </el-row>
      </div>
    </template>
    <!--待签合同-->
    <template v-if="currentRow.channelStatus==100 || currentRow.channelStatus == 200">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.parentChannelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.parentChannelName}}</div>
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
            <div class="grid-content bg-purple">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'分销子渠道（FXZQD）'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">基本信息</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardFront)">
              <img
                :src="currentRow.identityCardFront"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardContrary)">
              <img
                :src="currentRow.identityCardContrary"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <span @click="viewImage(currentRow.businessLicense)">
              <img
                :src="currentRow.businessLicense"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.PCLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.appLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营范围'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessRange}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营过的类似商品'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">联系方式</h3>
      <el-table
        border=""
        :data="contactData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="110"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
      <h3 class="form-part-title">开通审核</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'申请时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.createTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'审核结果'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'通过申请'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'通过时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.checkPassTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">保证金</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              ￥ {{currentRow.securityAmount}} - {{
              currentRow.securityAmountStatus==1? '已支付' : '未支付' }}
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <!--停止签合同-->
    <template v-if="currentRow.channelStatus==-100">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.parentChannelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.parentChannelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'合作类型'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">渠道入驻</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'分销子渠道（FXZQD）'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">基本信息</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardFront)">
              <img
                :src="currentRow.identityCardFront"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardContrary)">
              <img
                :src="currentRow.identityCardContrary"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <span @click="viewImage(currentRow.businessLicense)">
              <img
                :src="currentRow.businessLicense"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.PCLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.appLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营范围'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessRange}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营过的类似商品'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">联系方式</h3>
      <el-table
        border=""
        :data="contactData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="110"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
      <h3 class="form-part-title">开通审核</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'申请时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.createTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'审核结果'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'通过申请'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'通过时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.checkPassTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">终止情况</h3>
      <el-table
        border=""
        :data="terminationData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="terminationType" label="终止类型" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.terminationType | channelTerminationTypeFilter }}</span> -->
            <span>强制终止</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="terminationTime"-->
        <!--label="终止时间"-->
        <!--align="center"-->
        <!--min-width="80">-->
        <!--</el-table-column>-->
        <el-table-column prop="technologyTransferStatus" label="技术对接" align="center" min-width="90">
          <template
            slot-scope="scope"
          >{{ scope.row.technologyTransferStatus | technologyTransferStatusFilter }}</template>
        </el-table-column>
        <el-table-column prop="terminationReason" label="终止原因" align="center" min-width="110"></el-table-column>
        <el-table-column prop="terminationTime" label="注销时间" align="center" min-width="140"></el-table-column>
      </el-table>
      <h3 class="form-part-title">保证金</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              ￥ {{currentRow.securityAmount}} - {{
              currentRow.securityAmountStatus==1? '已支付' : '未支付' }}
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <!--待付保证金-->
    <template v-if="currentRow.channelStatus==300">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.parentChannelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.parentChannelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'合作类型'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">渠道入驻</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'分销子渠道（FXZQD）'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道级别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelLevelMap[currentRow.channelLevel].text}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">基本信息</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardFront)">
              <img
                :src="currentRow.identityCardFront"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardContrary)">
              <img
                :src="currentRow.identityCardContrary"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <span @click="viewImage(currentRow.businessLicense)">
              <img
                :src="currentRow.businessLicense"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.PCLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.appLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营范围'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessRange}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营过的类似商品'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">联系方式</h3>
      <el-table
        border=""
        :data="contactData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="110"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
      <h3 class="form-part-title">开通审核</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'申请时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.createTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'审核结果'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'通过申请'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'通过时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.checkPassTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">合同信息</h3>
      <el-table
        border=""
        :data="contractData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="contractNo" label="合同编号" align="center" min-width="100"></el-table-column>
        <el-table-column prop="contractSigningType" label="合同属性" align="center" min-width="90">
          <template slot-scope="scope">{{ scope.row.contractSigningType==1? '首次签订' : '再次签订' }}</template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center" min-width="110">
          <template slot-scope="scope">{{ $moment(scope.row.startTime).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center" min-width="110">
          <template slot-scope="scope">{{ $moment(scope.row.endTime).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column prop="contractStatus" label="渠道状态" align="center" min-width="140">
          <template slot-scope="scope">
            <span>待付保证金</span>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="form-part-title">保证金</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              ￥ {{currentRow.securityAmount}} - {{
              currentRow.securityAmountStatus==1? '已支付' : '未支付' }}
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <!--停止付保证金-->
    <template v-if="currentRow.channelStatus==-300">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.parentChannelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.parentChannelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'合作类型'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">渠道入驻</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'分销子渠道（FXZQD）'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道级别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelLevelMap[currentRow.channelLevel].text}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">基本信息</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardFront)">
              <img
                :src="currentRow.identityCardFront"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardContrary)">
              <img
                :src="currentRow.identityCardContrary"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <span @click="viewImage(currentRow.businessLicense)">
              <img
                :src="currentRow.businessLicense"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.PCLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.appLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营范围'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessRange}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营过的类似商品'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">联系方式</h3>
      <el-table
        border=""
        :data="contactData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="110"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
      <h3 class="form-part-title">开通审核</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'申请时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.createTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'审核结果'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'通过申请'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'通过时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.checkPassTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">合同信息</h3>
      <el-table
        border=""
        :data="contractData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="contractNo" label="合同编号" align="center" min-width="100"></el-table-column>
        <el-table-column prop="contractSigningType" label="合同属性" align="center" min-width="90">
          <template slot-scope="scope">{{ scope.row.contractSigningType==1? '首次签订' : '再次签订' }}</template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center" min-width="110">
          <template slot-scope="scope">{{ $moment(scope.row.startTime).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center" min-width="110">
          <template slot-scope="scope">{{ $moment(scope.row.endTime).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column prop="contractStatus" label="合同状态" align="center" min-width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.contractStatus==100">{{'生效中'}}</span>
            <!--<span v-if="currentRow.channelStatus===3">{{'待接系统'}}</span>-->
          </template>
        </el-table-column>
      </el-table>
      <h3 class="form-part-title">终止情况</h3>
      <el-table
        border=""
        :data="terminationData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="terminationType" label="终止类型" align="center" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.terminationType | channelTerminationTypeFilter }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="terminationTime"-->
        <!--label="终止时间"-->
        <!--align="center"-->
        <!--min-width="80">-->
        <!--</el-table-column>-->
        <el-table-column prop="technologyTransferStatus" label="技术对接" align="center" min-width="90">
          <template
            slot-scope="scope"
          >{{ scope.row.technologyTransferStatus | technologyTransferStatusFilter }}</template>
        </el-table-column>
        <el-table-column prop="terminationReason" label="终止原因" align="center" min-width="110"></el-table-column>
        <el-table-column prop="terminationTime" label="终止时间" align="center" min-width="140"></el-table-column>
      </el-table>
      <h3 class="form-part-title">保证金</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              ￥ {{currentRow.securityAmount}} - {{
              currentRow.securityAmountStatus==1? '已支付' : '未支付' }}
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <!--待对接系统 400-->
    <template v-if="currentRow.channelStatus==400">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.parentChannelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.parentChannelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'合作类型'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">渠道入驻</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'分销子渠道（FXZQD）'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道级别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelLevelMap[currentRow.channelLevel].text}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">基本信息</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardFront)">
              <img
                :src="currentRow.identityCardFront"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardContrary)">
              <img
                :src="currentRow.identityCardContrary"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <span @click="viewImage(currentRow.businessLicense)">
              <img
                :src="currentRow.businessLicense"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.PCLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.appLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营范围'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessRange}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营过的类似商品'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">联系方式</h3>
      <el-table
        border=""
        :data="contactData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="110"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
      <h3 class="form-part-title">开通审核</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'申请时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.createTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'审核结果'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'通过申请'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'通过时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.checkPassTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">合同信息</h3>
      <el-table
        border=""
        :data="contractData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="contractNo" label="合同编号" align="center" min-width="100"></el-table-column>
        <el-table-column prop="contractSigningType" label="合同属性" align="center" min-width="90">
          <template slot-scope="scope">{{ scope.row.contractSigningType==1? '首次签订' : '再次签订' }}</template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center" min-width="110">
          <template slot-scope="scope">{{ $moment(scope.row.startTime).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center" min-width="110">
          <template slot-scope="scope">{{ $moment(scope.row.endTime).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column prop="contractStatus" label="渠道状态" align="center" min-width="140">
          <template slot-scope="scope">
            <!-- <span v-if="scope.row.contractStatus==100">{{'生效中'}}</span> -->

            <span>{{'待接系统'}}</span>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="form-part-title">保证金</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              ￥ {{currentRow.securityAmount}} - {{
              currentRow.securityAmountStatus==1? '已支付' : '未支付' }}
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
    <!--停止对接系统-->
    <template v-if="currentRow.channelStatus==-400">
      <!-- <h3 class="form-part-title">渠道特点</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{ '所属FXQD号' }}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{ currentRow.parentChannelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'所属FXQD名称'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.parentChannelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'合作类型'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >渠道入驻</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道属性'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'分销子渠道（FXZQD）'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道类别'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{channelTypeMap[currentRow.channelType].text}}</div>
          </el-col>
        </el-row>
      </div> -->
      <!-- <h3 class="form-part-title">基本信息</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'渠道号'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelNum}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营主体'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{'个人'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'企业'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span v-if="currentRow.businessEntity==1">{{'身份证号'}}</span>
              <span v-if="currentRow.businessEntity==2">{{'公司名称'}}</span>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              <span v-if="currentRow.businessEntity==1">{{currentRow.identityCardNo}}</span>
              <span v-if="currentRow.businessEntity==2">{{currentRow.companyName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==1">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证正面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardFront)">
              <img
                :src="currentRow.identityCardFront"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'身份证背面'}}</div>
          </el-col>
          <el-col :span="7">
            <span @click="viewImage(currentRow.identityCardContrary)">
              <img
                :src="currentRow.identityCardContrary"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.businessEntity==2">
          <el-col :span="5" style="min-height: 57px">
            <div class="grid-content bg-purple">{{'营业执照'}}</div>
          </el-col>
          <el-col :span="19">
            <span @click="viewImage(currentRow.businessLicense)">
              <img
                :src="currentRow.businessLicense"
                alt=""
                height="48px"
                width="48px"
                class="link-type form-photo-offset"
              >
            </span>
          </el-col>
        </el-row>
      </div>
      <p style="margin: .5em"></p>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'PC店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.PCLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'手机店铺/平台链接'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.appLink}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营范围'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessRange}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'经营过的类似商品'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{currentRow.businessGoods}}</div>
          </el-col>
        </el-row>
      </div> -->
      <!-- <h3 class="form-part-title">联系方式</h3>
      <el-table
        border=""
        :data="contactData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="110"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table> -->
      <h3 class="form-part-title">开通审核</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'申请时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.createTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'审核结果'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">{{'通过申请'}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'通过时间'}}</div>
          </el-col>
          <el-col :span="19">
            <div
              class="grid-content bg-purple-light"
            >{{ $moment(currentRow.checkPassTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">合同信息</h3>
      <el-table
        border=""
        :data="contractData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="contractNo" label="合同编号" align="center" min-width="100"></el-table-column>
        <el-table-column prop="contractSigningType" label="合同属性" align="center" min-width="90">
          <template slot-scope="scope">{{ scope.row.contractSigningType==1? '首次签订' : '再次签订' }}</template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center" min-width="110">
          <template slot-scope="scope">{{ $moment(scope.row.startTime).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center" min-width="110">
          <template slot-scope="scope">{{ $moment(scope.row.endTime).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column prop="contractStatus" label="渠道状态" align="center" min-width="140">
          <template slot-scope="scope">
            <!-- <span v-if="scope.row.contractStatus==100">{{'生效中'}}</span> -->
            <span>{{'停止接系统'}}</span>
          </template>
        </el-table-column>
      </el-table>
      <h3 class="form-part-title">保证金</h3>
      <div class="border1">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'保证金金额'}}</div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple-light">
              ￥ {{currentRow.securityAmount}} - {{
              currentRow.securityAmountStatus==1? '已支付' : '未支付' }}
            </div>
          </el-col>
        </el-row>
      </div>
      <h3 class="form-part-title">终止情况</h3>
      <el-table
        border=""
        :data="terminationData"
        style="width: 100%;border-width: 2px;border-bottom-width: 1px;"
        class="border-top2 border-left2 border-right2"
      >
        <el-table-column prop="terminationType" label="终止类型" align="center" min-width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.terminationType | channelTerminationTypeFilter }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="terminationTime"-->
        <!--label="终止时间"-->
        <!--align="center"-->
        <!--min-width="80">-->
        <!--</el-table-column>-->
        <el-table-column prop="technologyTransferStatus" label="技术对接" align="center" min-width="90">
          <template
            slot-scope="scope"
          >{{ scope.row.technologyTransferStatus | technologyTransferStatusFilter }}</template>
        </el-table-column>
        <el-table-column prop="terminationReason" label="终止原因" align="center" min-width="110"></el-table-column>
        <el-table-column prop="terminationTime" label="终止时间" align="center" min-width="140"></el-table-column>
      </el-table>
    </template>
    <!--viewImage-->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="75%" append-to-body>
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>
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
      cooperationTypeMap: {
        1: { text: "渠道入驻", value: 1 },
        2: { text: "渠道变更", value: 2 }
      },
      channelTypeMap: {
        1: { text: "淘宝C店", value: 1 },
        2: { text: "淘宝企业店", value: 2 },
        3: { text: "天猫店", value: 3 },
        4: { text: "B2C平台", value: 4 }
      },
      channelLevelMap: {
        1: { text: "A级渠道", value: 1 },
        2: { text: "B级渠道", value: 2 },
        3: { text: "C级渠道", value: 3 },
        4: { text: "D级渠道", value: 4 },
        99: { text: "----", value: 99 }
      },
      terminationData: [],
      isViewImageShow: false,
      imageViewed: null
    };
  },
  methods: {
    viewImage(src) {
      this.imageViewed = src;
      this.isViewImageShow = true;
    }
  },
  created() {
    this.contactData = this.currentRow.contactData;
    this.contractData = this.currentRow.contractData;
    this.terminationData = this.currentRow.terminationData;
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-row {
    margin-bottom: 20px
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
