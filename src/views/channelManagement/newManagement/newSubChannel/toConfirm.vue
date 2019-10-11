<template>
  <div>
    <!--待审核-->
    <template v-if="currentRow.channelStatus==50">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="">
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
      <div class="">
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
      <div class="">
        <el-row class="border-top">
          <el-col :span="5">
            <div class="grid-content bg-purple">{{'店铺/平台名称(渠道名称)'}}</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple-light">{{currentRow.channelName}}</div>
          </el-col>
          <el-col :span="5" style="display:block;background:none;">
            <div class="grid-content bg-purple-light">{{'渠道名称'}}</div>
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
        style="width: 100%;"
        class="table_border"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="100"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
      <h3 class="form-part-title">开通审核</h3>
      border-bottom-width: 2px
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        class=""
        style="border-bottom:1px solid #d5d5d5"
      >
        <el-form-item label="申请时间" class="form-row">
          <div>{{ $moment(currentRow.createTime).format('YYYY-MM-DD , HH:MM:SS') }}</div>
        </el-form-item>
        <el-form-item label="审核结果" class="form-row">
          <el-radio-group v-model="form.reviewResult">
            <el-radio :label="1">通过申请</el-radio>
            <el-radio :label="2">驳回申请</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="渠道级别" class="form-row" v-if="form.reviewResult==1">
          <el-radio-group v-model="form.channelLevel">
            <el-radio :label="1">A级渠道</el-radio>
            <el-radio :label="2">B级渠道</el-radio>
            <el-radio :label="3">C级渠道</el-radio>
            <el-radio :label="4">D级渠道</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="保证金金额"
          class="form-row"
          style="height: 29px"
          v-if="form.reviewResult==1"
        >
          <el-select class="noBorderInput" v-model="form.securityAmount" placeholder="请选择">
            <el-option
              v-for="item in depositOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="驳回理由"
          class="form-row"
          style="height: 29px"
          v-if="form.reviewResult==2"
        >
          <el-input class="noBorderInput" v-model.trim="form.rejectReason" placeholder="请填写驳回理由"/>
        </el-form-item>
      </el-form>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="onSubmit50" :loading="isSubmitting">审核确认</el-button>
      </div>
    </template>
    <!--待签合同-->
    <template v-if="currentRow.channelStatus==100">
      <h3 class="form-part-title">渠道特点</h3>
      <div class="">
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
      <div class="">
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
      <div class="">
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
        style="width: 100%; "
        class="table_border"
      >
        <el-table-column prop="dutyNo" label="职务" align="center" min-width="90">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.dutyNo | job }}</span> -->
            <span>{{ scope.row.dutyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="80"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center" min-width="90"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" min-width="100"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" min-width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" min-width="100"></el-table-column>
      </el-table>
      <h3 class="form-part-title">开通审核</h3>
      <el-row style="margin-top: 1.5em" class="border-top">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="margin: 1em 0">合同签订</div>
        </el-col>
      </el-row>
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
        style="margin-top: 1em;text-align: center"
        class="demo-form-inline"
      >
        <el-form-item label="">
          <div>
            <el-switch v-model="paperContactSignActive" active-text="纸质合同签订完毕" inactive-text></el-switch>
            <el-switch v-model="autoSignActive" active-text="自动续签" inactive-text></el-switch>
          </div>
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!--<el-button type="warning">自动续签<i class="el-icon-success el-icon&#45;&#45;right"></i></el-button>-->
        <div class="dialogBottomButton-wrap">
          <el-button
            type="primary"
            @click="onSubmit100"
            :loading="isSubmitting"
            :disabled="!autoSignActive || !paperContactSignActive"
          >确认提交</el-button>
        </div>
      </el-form>
    </template>
    <!--待系统对接-->
    <template v-if="currentRow.channelStatus==400">
      <h3 class="form-part-title">基本信息</h3>
      <div class="">
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
      <div class="">
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
      <h3 class="form-part-title">技术对接</h3>
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
        style="margin-top: 1em;text-align: center"
        class="demo-form-inline"
      >
        <div class="dialogBottomButton-wrap">
          <div style="margin: 5px">
            <el-switch v-model="isSystemConnectComplete" active-text="完成系统对接" inactive-text></el-switch>
          </div>
          <el-button type="primary" @click="onSubmit400" :loading="isSubmitting" :disabled="!isSystemConnectComplete">确认完成对接</el-button>
        </div>
      </el-form>
    </template>
    <el-dialog :visible.sync="rejectRemindVisible" width="30%" append-to-body :show-close="false">
      <p style="text-align: center">开通申请被驳回，该子渠道已进入“驳回申请”状态。</p>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="closeOutDialog">知道了</el-button>
      </div>
    </el-dialog>
    <!--viewImage-->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="75%" append-to-body>
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
import {
  channelProp,
  channelType,
  channelLevel,
  cooperationType,
  contractStatus,
  securityAmountStatus,
  job
} from "@/filters/index.js";

export default {
  props: {
    currentRow: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      paperContactSignActive: true,
      autoSignActive: true,
      isSystemConnectComplete: true,
      contactData: [],
      contractData: [
        {
          contractID: 201805000002,
          contractProp: "首次签订",
          startTime: "2018-05-26",
          endTime: "2018-05-29",
          channelStatus: "待激活账号"
        }
      ],
      channelPropFilters: [{ text: "分销子渠道(FXZQD)", value: 4 }],
      channelPropMap: {
        4: { text: "分销子渠道(FXZQD)", value: 4 }
      },
      cooperationTypeFilters: [
        { text: "渠道入驻", value: 1 },
        { text: "渠道变更", value: 2 }
      ],
      cooperationTypeMap: {
        1: { text: "渠道入驻", value: 1 },
        2: { text: "渠道变更", value: 2 }
      },
      channelTypeFilters: [
        { text: "淘宝C店", value: 1 },
        { text: "淘宝企业店", value: 2 },
        { text: "天猫店", value: 3 },
        { text: "B2C平台", value: 4 }
      ],
      channelTypeMap: {
        1: { text: "淘宝C店", value: 1 },
        2: { text: "淘宝企业店", value: 2 },
        3: { text: "天猫店", value: 3 },
        4: { text: "B2C平台", value: 4 }
      },
      channelLevelFilters: [
        { text: "A级渠道", value: 1 },
        { text: "B级渠道", value: 2 },
        { text: "C级渠道", value: 3 },
        { text: "D级渠道", value: 4 },
        { text: "--", value: 0 }
      ],
      channelLevelMap: {
        1: { text: "A级渠道", value: 1 },
        2: { text: "B级渠道", value: 2 },
        3: { text: "C级渠道", value: 3 },
        4: { text: "D级渠道", value: 4 },
        0: { text: "--", value: 0 }
      },
      isViewImageShow: false,
      imageViewed: null,
      form: {
        reviewResult: 1,
        channelLevel: 1,
        securityAmount: 2000,
        date1: "",
        date2: "",
        delivery: false,
        rejectReason: null
      },
      depositOptions: [
        { label: "¥2000.00", value: 2000 },
        { label: "¥4000.00", value: 4000 },
        { label: "¥10000.00", value: 10000 },
        { label: "¥30000.00", value: 30000 },
        { label: "¥50000.00", value: 50000 }
      ],
      rejectRemindVisible: false,
      isSubmitting: false
    };
  },
  methods: {
    viewImage(src) {
      this.imageViewed = src;
      this.isViewImageShow = true;
    },
    onSubmit50() {
      this.isSubmitting = true;
      if (this.form.reviewResult == 2) {
        if (!this.form.rejectReason) {
          this.$alert("请填写驳回理由。", "", {
            confirmButtonText: this.$t("table.confirm"),
            showClose: false,
            center: true,
            callback() {}
          });
          this.isSubmitting = false;
        } else {
          this.$request({
            url: "/channel/changeSubChannelStatus.do",
            method: "post",
            data: {
              channelNo: this.currentRow.channelNo,
              rejectReason: this.form.rejectReason,
              channelStatus: -40
            }
          }).then(res => {
            if (res.errorCode == 0) {
              // 修改渠道为审核不通过状态
              this.rejectRemindVisible = true;
            }
            this.isSubmitting = false;
          });
        }
      } else {
        this.$request({
          url: "/channel/changeSubChannelStatus.do",
          method: "post",
          data: {
            channelNo: this.currentRow.channelNo,
            channelLevel: this.form.channelLevel,
            securityAmount: this.form.securityAmount,
            // channelStatus: 100 // 待签合同
            channelStatus: 200 // 待激活
          }
        }).then(res => {
          if (res.errorCode == 0) {
            const vm = this;
            // this.$alert("子渠道已通过审核，将进入待签合同状态。", "", {
            this.$alert("子渠道已通过审核，将进入待激活状态。", "", {
              confirmButtonText: this.$t("table.confirm"),
              showClose: false,
              center: true,
              callback() {
                vm.$emit("closeDialog");
              }
            });
          }
        });
      }
    },
    onSubmit100() {
      this.isSubmitting = true;
      if (!this.form.dateRange) {
        this.$alert("请填写合同期限。", "", {
          confirmButtonText: this.$t("table.confirm"),
          showClose: false,
          center: true,
          callback() {}
        });
        this.isSubmitting = false;
      } else {
        this.$request({
          url: "/channel/changeSubChannelStatus.do",
          method: "post",
          data: {
            startTime: this.form.dateRange[0],
            endTime: this.form.dateRange[1],
            channelNo: this.currentRow.channelNo,
            channelStatus: 300 // 待付保证金
          }
        }).then(res => {
          if (res.errorCode == 0) {
            const vm = this;
            this.$alert(
              "子渠道已签订合同，系统已发出系统消息和短信通知其所属的分销渠道尽快交付保证金。",
              "",
              {
                confirmButtonText: this.$t("table.confirm"),
                showClose: false,
                center: true,
                callback() {
                  vm.$emit("closeDialog");
                }
              }
            );
            this.isSubmitting = false;
          }
        });
      }
    },
    closeOutDialog() {
      this.$emit("closeDialog");
    },
    onSubmit400() {
      this.isSubmitting = true;
      this.$request({
        url: "/channel/changeSubChannelStatus.do",
        method: "post",
        data: {
          channelNo: this.currentRow.channelNo,
          channelStatus: 1000 // 开通订货功能
        }
      }).then(res => {
        if (res.errorCode == 0) {
          const vm = this;
          this.$alert("已完成系统对接，该渠道订货功能已开通。", "", {
            confirmButtonText: this.$t("table.confirm"),
            showClose: false,
            center: true,
            callback() {
              vm.$emit("closeDialog");
            }
          });
        }
        this.isSubmitting = false;
      });
    }
  },
  created() {
    this.contactData = this.currentRow.contactData;
    this.contractData = this.currentRow.contractData;
  }
};
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
  .form-row {
    margin-bottom: 0;
  }
</style>
