<template>
  <div>
    <h3 style="text-align: center" v-if="currentRow.refundType==3">申请后已退款</h3>
    <h3 style="text-align: center" v-else-if="currentRow.refundType==4&&currentRow.appealReason!=4">申诉后已退款</h3>
    <h3 style="text-align: center" v-else-if="currentRow.refundType==4&&currentRow.appealReason==4">协商后已退款</h3>
    <h3 style="text-align: center" v-else>破损转补款</h3>
    <div class="theBorder" style="border-bottom-width: 1px">
      <el-row>
        <el-col :span="4"><span>货单号: </span></el-col>
        <el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="4"><span>渠道号: </span></el-col>
        <el-col :span="8"><span>{{ currentRow.channelNo }}</span></el-col>
        <el-col :span="4"><span>渠道名称: </span></el-col>
        <el-col :span="8"><span>{{ currentRow.channelName }}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><span>商品编号: </span></el-col>
        <el-col :span="8"><span>{{ currentRow.code }}</span></el-col>
        <el-col :span="4"><span>商品名称: </span></el-col>
        <el-col :span="8"><span>{{ currentRow.goodName }}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="4"><span>商品码: </span></el-col>
        <el-col :span="20"><span>{{ currentRow.goodNo }}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="4"><span>申请理由: </span></el-col>
        <el-col :span="14"><span>{{ '商品破损严重，不能销售给顾客。' }}</span></el-col>
        <el-col :span="0"></el-col>
        <el-col :span="6">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ currentRow.applicationTime }}
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" style="min-height: 56px"><span>现场照片: </span></el-col>
        <el-col :span="20"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                                height="48px" width="48px"
                                                                                class="link-type"></span></el-col>
      </el-row>


      <!--申请后退款-->
      <template v-if="currentRow.refundType==3">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>同意申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.applicationReviewTime }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>已退款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'退款已退回到您的帐户余额，可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'退款已原路退回，可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>申请后退款</span></el-col>
        </el-row>
      </template>

      <!--申诉后退款-->
      <template v-if="currentRow.refundType==4">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>{{ currentRow.applicationReviewResult | applicationReviewResultFilter }}</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.applicationReviewTime }}
            </div>
          </el-col>
        </el-row>
        <el-row v-if="currentRow.applicationReviewResult==3">
          <el-col :span="0"></el-col>
          <el-col :span="4">
            <div style="color:white">1</div>
          </el-col>
          <el-col :span="4"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.compensationMoney }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="6"><span>{{ currentRow.appealReason | appealReasonFilter }}</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ currentRow.appealTime }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.appealReviewResult | appealReviewResultFilter }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'退款已退回到您的帐户余额，可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'退款已原路退回，可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>已退款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>申诉后退款</span></el-col>
        </el-row>
      </template>

      <!--破损转补款-申诉后要退款-->
      <template v-if="currentRow.compensation_type===20">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.applicationReviewTime }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'补款将退回到您的帐户余额，完成补款后可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'补款将原路退回，完成补款后可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受退款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.appealReviewResult | appealReviewResultFilter }}</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.applicationReviewTime }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'退款已退回到您的帐户余额，可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'退款已原路退回，可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>已退款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>申诉后退款</span></el-col>
        </el-row>
      </template>

      <!--破损转补款-驳回申请后吾蜜协商同意退款-->
      <template v-if="currentRow.compensation_type===21">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="12" style="padding-left: 0">
            <div class="text-muted">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'补款将退回到您的帐户余额，完成补款后可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'补款将原路退回，完成补款后可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>请求吾蜜公司介入协商</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.appealReviewResult | appealReviewResultFilter }}</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20" style="padding-left: 0">
            <div class="text-muted">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'退款已退回到您的帐户余额，可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'退款已原路退回，可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>已退款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>申诉后退款</span></el-col>
        </el-row>
      </template>


      <!--也许可以删除-->
      <!--破损转补款-申诉（驳回申请）要补款-->
      <template v-if="currentRow.compensation_type===22">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.applicationReviewTime }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品有瑕疵，申请转补款后继续销售</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'补款将退回到您的帐户余额，完成补款后可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'补款将原路退回，完成补款后可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款状态: </span></el-col>
          <el-col :span="4"><span>已补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
      </template>


      <!--破损转补款-申诉-->
      <template v-if="currentRow.compensation_type===23">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'补款将退回到您的帐户余额，完成补款后可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'补款将原路退回，完成补款后可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受退款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <!--<el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>-->
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'补款将退回到您的帐户余额，完成补款后可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'补款将原路退回，完成补款后可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>补款状态: </span></el-col>
          <el-col :span="4"><span>已补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
      </template>


      <!--破损转补款-协商（吾蜜公司介入）后驳回申请-->
      <template v-if="currentRow.compensation_type===24">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <!--<el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>-->
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'补款将退回到您的帐户余额，完成补款后可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'补款将原路退回，完成补款后可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>请求吾蜜公司介入协商</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <!--<el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>-->
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'补款将退回到您的帐户余额，完成补款后可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'补款将原路退回，完成补款后可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>补款状态: </span></el-col>
          <el-col :span="4"><span>已补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
      </template>

      <!--破损转补款-协商（吾蜜公司介入）后破损转补款-->
      <template v-if="currentRow.compensation_type===25">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'补款将退回到您的帐户余额，完成补款后可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'补款将原路退回，完成补款后可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>请求吾蜜公司介入协商</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">
              <span class="text-muted" v-if="currentRow.propertyOfSale==1">{{'补款将退回到您的帐户余额，完成补款后可查看您账户余额的变化情况。' }}</span>
          <span class="text-muted" v-if="currentRow.propertyOfSale==2">{{'补款将原路退回，完成补款后可查看您支付货款账户的金额变化情况。' }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>补款状态: </span></el-col>
          <el-col :span="4"><span>已补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
      </template>
      <!--也许可以删除-->

      <!-- viewImage -->
      <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
        <img :src="imageViewed" alt="" width="100%">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: { ElRow },
    props: {
      currentRow: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        isViewImageShow: false,
        imageViewed: false,
        submitLoading: false,
        successDialogVisible: false
      }
    },
    methods: {
      submitApplication() {
        this.submitLoading = true
        this.successDialogVisible = true
        this.$emit('submit-first-application')
      },
      handleConfirm() {
        this.$emit('closeApplicationDialog')
        this.submitLoading = false
      },
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .el-col:nth-of-type(even) {
    padding-left: 1em;
  }
</style>
