<template>
  <div>
    <h3 style="text-align: center" v-if="currentRow.refundStatus==2&&currentRow.refundType==3">申请后待退款</h3>
    <h3 style="text-align: center" v-else-if="currentRow.refundStatus==2&&currentRow.refundType==4&&currentRow.appealReason!=4">申诉后待退款</h3>
    <h3 style="text-align: center" v-else-if="currentRow.refundStatus==2&&currentRow.refundType==4&&currentRow.appealReason==4">协商后待退款</h3>
    <h3 style="text-align: center" v-else>破损转退款</h3>
    <div class="theBorder">
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
        <el-col :span="14">
          <span>{{ '商品破损严重，不能销售给顾客。' }}</span>
        </el-col>
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
          <el-col :span="4"><span>退款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.refundMoney }}</span></el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>同意申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ currentRow.applicationReviewTime }}
          </span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>待退款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="12">
          <span class="text-muted">{{'退款将退回到您的帐户余额，完成退款后可查看您账户余额的变化情况。' }}</span>
          </el-col>
        </el-row>
        <el-row class="no-border-bottom">
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>申请后退款</span></el-col>
        </el-row>
      </template>
      <!--协商后/申诉后退款-->
      <template v-if="currentRow.refundType==4">
        <el-row>
          <el-col :span="4"><span>退款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.refundMoney }}</span></el-col>
        </el-row>

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
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="12">
            <div class="text-muted">{{
              '退款将退回到您的帐户，可在完成退款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>待退款</span></el-col>
        </el-row>
        <el-row class="no-border-bottom">
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>申诉后退款</span></el-col>
        </el-row>
      </template>

      <!--商品破损-申请后退款-->
      <template v-if="currentRow.refundType===20">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转退款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6" style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              $t('order.applicationTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>退款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.refundMoney }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '退款将退回到您的帐户，可在完成退款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>待退款</span></el-col>
        </el-row>
        <el-row class="no-border-bottom">
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>破损转退款</span></el-col>
        </el-row>
      </template>
      <!--商品破损-申请补货被驳回后再申诉补货，结果是转为退款-->
      <template v-if="currentRow.refundType===21">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受补货</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转退款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>退款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.refundMoney }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '退款将退回到您的帐户，可在完成退款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>待退款</span></el-col>
        </el-row>
        <el-row class="no-border-bottom">
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>破损转退款</span></el-col>
        </el-row>
      </template>
      <!--商品破损-我申请补货，被驳回，然后我上诉要退款，结果是转为退款-->
      <template v-if="currentRow.refundType===22">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{ $t('order.reviewTime') }}: {{ currentRow.appealReviewTime
              }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受补货</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转退款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{ $t('order.reviewTime') }}: {{ currentRow.appealReviewTime
              }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>退款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.refundMoney }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '退款将退回到您的帐户，可在完成退款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>待退款</span></el-col>
        </el-row>
        <el-row class="no-border-bottom">
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>破损转退款</span></el-col>
        </el-row>
      </template>
      <!--商品破损-我申请补货，审核结果为破损转退款，但我上诉要补货，被驳回，结果是转为退款-->
      <template v-if="currentRow.refundType===23">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{ $t('order.reviewTime') }}: {{ currentRow.appealReviewTime
              }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受补货</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转退款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{ $t('order.reviewTime') }}: {{ currentRow.appealReviewTime
              }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>退款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.refundMoney }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '退款将退回到您的帐户，可在完成退款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>待退款</span></el-col>
        </el-row>
        <el-row class="no-border-bottom">
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>破损转退款</span></el-col>
        </el-row>
      </template>
      <!--商品破损-我提出申请补货，被驳回，我叫吾蜜帮忙协商，结果是转为退款-->
      <template v-if="currentRow.refundType===24">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}
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
          <el-col :span="14"><span>破损转退款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>退款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.refundMoney }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '退款将退回到您的帐户，可在完成退款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>待退款</span></el-col>
        </el-row>
        <el-row class="no-border-bottom">
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>破损转退款</span></el-col>
        </el-row>
      </template>
      <!--商品破损-我提出申请补货，审核结果是退款，我叫吾蜜帮忙协商，结果还是转为退款-->
      <template v-if="currentRow.refundType===25">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转退款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6"><div class="text-muted">{{ $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}</div></el-col>
        </el-row>

        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>退款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.refundMoney }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12" style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start"><div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{ '退款将退回到您的帐户，可在完成退款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}</div></el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>请求吾蜜公司介入协商</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6"><div class="text-muted">{{ $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div></el-col>
        </el-row>
        </el-row>

        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转退款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6"><div class="text-muted">{{ $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}</div></el-col>
        </el-row>

        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>退款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.refundMoney }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="12" style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start"><div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{ '退款将退回到您的帐户，可在完成退款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}</div></el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>退款状态: </span></el-col>
          <el-col :span="4"><span>待退款</span></el-col>
        </el-row>
        <el-row class="no-border-bottom">
          <el-col :span="4"><span>退款类型: </span></el-col>
          <el-col :span="4"><span>破损转退款</span></el-col>
        </el-row>
      </template>



      <!-- viewImage -->
      <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
        <img :src="imageViewed" alt="" width="100%">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
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
