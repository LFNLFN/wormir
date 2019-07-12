<template>
  <div>
    <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">Order No.</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">{{ detail.orderNo }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">Retailer No.</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">{{ detail.channelNo }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">Code</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">{{detail.code || ' '}}</div>
      </el-col>
      <el-col :span="4" style="border-left: 1px solid #d5d5d5">
        <div class="grid-content bg-purple">Description</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">{{detail.brandNameEn || ' '}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">Application Reasons</div>
      </el-col>
      <el-col :span="16">
        <div
          class="grid-content bg-purple-light"
        >
          <span v-if="detail.issueType==10">Apply offset compensation for customer on the account of defective appearance.</span>
          <span v-if="detail.issueType==20">Too damaged to be sold to customers.</span>
          <span v-if="detail.issueType==30">Products lost in transit , need refund.</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="16"
        :offset="8"
        style="border-bottom: none;background-color: transparent!important;justify-content: flex-start"
      >
        <div
          class="text-muted"
          style="background: #fff;font-weight: normal;color: rgb(153, 153, 153)"
        >{{ $t('order.applicationTime') }}: {{ detail.applicationTime }}</div>
      </el-col>
    </el-row>
    <el-row style="border-top:1px solid #d5d5d5">
      <el-col :span="8">
        <div class="grid-content bg-purple" style="line-height: 48px">Photo Evidences</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light" @click="viewImage(detail.proofImage)">
          <img :src="detail.proofImage" alt="" height="48px" width="48px" class="link-type">
          <span class="link-type">Click to enlarge</span>
        </div>
      </el-col>
    </el-row>
    <!--待补款状态（申请后补款）-->
    <template v-if="detail.compensationType === 10">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.replenishmentStatus')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.pendingCompensation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensationType')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationAfterApplication')}}</div>
        </el-col>
      </el-row>
    </template>
    <!--待补款状态（协商后补款）-->
    <template v-if="detail.compensationType === 20">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.applicationDismissed')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.appealRequest')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.involveNegotiation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >{{ $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.finalResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.replenishmentStatus')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.pendingCompensation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensationType')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationAfterAppeal')}}</div>
        </el-col>
      </el-row>
    </template>
    <!--待补款状态-申诉后补款-->
    <template v-if="detail.compensationType === 20">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.applicationDismissed')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.appealRequest')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.appealRequestReason1')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >{{ $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.finalResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.replenishmentStatus')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.pendingCompensation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensationType')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationAfterAppeal')}}</div>
        </el-col>
      </el-row>
    </template>
    <!--待补款状态-申请补货后转补款-->
    <template v-if="detail.compensationType === 30">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8" :offset="8" style="border-left: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="border-top: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.replenishmentStatus')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.pendingCompensation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensationType')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationForDamageApproval')}}</div>
        </el-col>
      </el-row>
    </template>
    <!--待补款状态-驳回申请后要补货转补款-->
    <template v-if="detail.compensationType === 30">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.applicationDismissed')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.appealRequest')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.appealRequestReason2')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.finalResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8" :offset="8" style="border-left: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation.toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="border-top: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.replenishmentStatus')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.pendingCompensation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensationType')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationForDamageApproval')}}</div>
        </el-col>
      </el-row>
    </template>
    <!--待补款状态-驳回申请后要补款转补款-->
    <template v-if="detail.compensationType === 3">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.applicationDismissed')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.appealRequest')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.appealRequestReason3')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.finalResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8" :offset="8" style="border-left: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="border-top: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.replenishmentStatus')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.pendingCompensation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensationType')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationForDamageApproval')}}</div>
        </el-col>
      </el-row>
    </template>
    <!--待补款状态-驳回破损转补款后要补货转补款-->
    <template v-if="detail.compensationType === 3">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8" :offset="8" style="border-left: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.appealRequest')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.appealRequestReason2')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.finalResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8" :offset="8" style="border-left: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="border-top: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.replenishmentStatus')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.pendingCompensation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensationType')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationForDamageApproval')}}</div>
        </el-col>
      </el-row>
    </template>
    <!--待补款状态-协商驳回申请后转补款-->
    <template v-if="detail.compensationType === 3">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.applicationDismissed')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.appealRequest')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.involveNegotiation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.finalResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8" :offset="8" style="border-left: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="border-top: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.replenishmentStatus')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.pendingCompensation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensationType')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationForDamageApproval')}}</div>
        </el-col>
      </el-row>
    </template>
    <!--待补款状态-协商破损转补款后转补款-->
    <template v-if="detail.compensationType === 3">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.applicationResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8" :offset="8" style="border-left: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation.toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.appealRequest')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.involveNegotiation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.finalResult')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationApproval')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="16"
          :offset="8"
          style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start"
        >
          <div
            class="text-muted"
            style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153)"
          >{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8" :offset="8" style="border-left: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.compensation')}}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="border-top: 1px solid #d5d5d5">
          <div class="grid-content bg-purple">{{$t('order.replenishmentStatus')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.pendingCompensation')}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('order.compensationType')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{$t('order.compensationForDamageApproval')}}</div>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
export default {
  name: "compensation-order-detail",
  props: {
    detail: Object
  },
  methods: {
    viewImage(src) {
      this.$emit("image-view", src);
    }
  }
};
</script>
<style scoped>
.el-row {
  margin: 0;
}
.el-col:nth-of-type(odd):not(.text-muted) div {
  background: #dff2fc;
  color: #424242;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.el-col:nth-of-type(even) div {
  background: #dff2fc;
  color: #424242;
  font-weight: 700;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-weight: normal;
}
.el-col:nth-child(odd) {
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
.el-col:nth-child(even) {
  color: #424242;
  display: flex;
  align-items: center;
  font-size: 12px;
  border-right: none;
  border-bottom: 1px #d5d5d5 solid;
}
.el-col:only-of-type {
  border-right: none;
}
.el-col:nth-child(even) div {
  padding-left: 1em;
}
.el-col.el-col-16.el-col-offset-8 {
  padding-left: 1em;
}
</style>
