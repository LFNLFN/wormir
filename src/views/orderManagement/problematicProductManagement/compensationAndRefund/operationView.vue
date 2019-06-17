<template>
  <div>
    <div style="overflow: hidden;width: 100%;border-right: 1px solid #d5d5d5;" class="dialog-wrap">
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple uiUpdate update-hori-middle">Order No.</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{ "'detail.orderNo'" }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple uiUpdate update-hori-middle">retailerNo</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" style="border-bottom: none"><div class="grid-content bg-purple ">Code</div></el-col>
        <el-col :span="5" style="border-bottom: none"><div class="grid-content bg-purple-light ">{{ "'detail.code'" }}</div></el-col>
        <el-col :span="4" style="border-bottom: none"><div class="grid-content bg-purple ">Description</div></el-col>
        <el-col :span="10" style="border-bottom: none"><div class="grid-content bg-purple-light ">{{ "'detail.goodNameEn'" }}</div></el-col>
      </el-row>
      <el-row style="border-top: 1px #d5d5d5 solid">
        <el-col :span="5">
          <div class="grid-content bg-purple uiUpdate update-hori-middle">Application Reasons</div>
        </el-col>
        <el-col :span="13">
          <div class="grid-content bg-purple-light ">Apply offset compensation for customer on the account of defective appearance.
          </div>
        </el-col>
        <el-col :span="6"
                style="background: #fff;font-weight: normal;border: none;border-right: 1px #d5d5d5 solid;border-bottom: 1px #d5d5d5 solid;justify-content: flex-start">
          <div class="text-muted grid-content bg-purple-light ">{{ $t('order.applicationTime') }}: {{ "'detail.applicationTime'" }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple uiUpdate update-hori-middle" style="border-bottom: none!important;line-height: 48px">
            Photo Evidences
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light " @click="">
            <img src="http://baidu.com" alt="" height="48px" width="48px" class="link-type">
            <span class="link-type">Click to enlarge</span>
          </div>
        </el-col>
      </el-row>

      <!--申请后待补款 申请后已补款 -->
      <template v-if="detail.compensationStatus == 1">
        <el-row>
            <el-col :span="5">
            <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation</div>
            </el-col>
            <el-col :span="19">
            <div class="grid-content bg-purple uiUpdate">{{ "'detail.compensationMoney'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Application Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Status</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Type</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
      </template>

      <!--申诉后待补款 申诉后已补款 协商后待补款 协商后已补款 -->
      <template v-if="detail.compensationStatus == 2">
        <el-row>
            <el-col :span="5">
            <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation</div>
            </el-col>
            <el-col :span="19">
            <div class="grid-content bg-purple uiUpdate">{{ "'detail.compensationMoney'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Application Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Appeal Request</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Final Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Status</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Type</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
      </template>

      <!--破损待转补款，申请退款后转补款  破损已转补款，申请退款后转补款 -->
      <template v-if="detail.compensationStatus == 3">
        <el-row>
            <el-col :span="5">
            <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund</div>
            </el-col>
            <el-col :span="19">
            <div class="grid-content bg-purple uiUpdate">{{ "'detail.compensationMoney'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Application Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Status</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Type</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
      </template>

      <!--破损待转补款，申诉要补款转补款  破损已转补款，申诉要补款转补款 -->
      <!--破损待转补款，申诉要退款却转补款  破损已转补款，申诉要退款却转补款 -->
      <!--破损待转补款，协商驳回后转补款  破损已转补款，协商驳回后转补款 -->
      <template v-if="detail.compensationStatus == 4">
        <el-row>
            <el-col :span="5">
            <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund</div>
            </el-col>
            <el-col :span="19">
            <div class="grid-content bg-purple uiUpdate">{{ "'detail.compensationMoney'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Application Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Appeal Request</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Final Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Status</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Type</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
      </template>

      <!--破损待转补款，转补款后申诉要退款继续转补款  破损已转补款，转补款后申诉要退款继续转补款 -->
      <!--破损待转补款，协商驳回后继续转补款  破损已转补款，协商驳回后继续转补款 -->
      <template v-if="detail.compensationStatus == 5">
        <el-row>
            <el-col :span="5">
            <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund</div>
            </el-col>
            <el-col :span="19">
            <div class="grid-content bg-purple uiUpdate">{{ "'detail.compensationMoney'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Application Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Appeal Request</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Final Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Status</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation Type</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
      </template>

      <!--申请后待退款  申请后已退款  少货待退款  少货已退款-->
      <template v-if="detail.compensationStatus == 6">
        <el-row>
            <el-col :span="5">
            <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund</div>
            </el-col>
            <el-col :span="19">
            <div class="grid-content bg-purple uiUpdate">{{ "'detail.compensationMoney'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Application Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund Status</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund Type</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
      </template>

      <!--申诉后待退款，申诉要退款同意退款  申诉后已退款，申诉要退款同意退款 -->
      <!-- 申诉后待退款，协商后同意退款  申诉后已退款，协商后同意退款 -->
      <template v-if="detail.compensationStatus == 7">
        <el-row>
            <el-col :span="5">
            <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund</div>
            </el-col>
            <el-col :span="19">
            <div class="grid-content bg-purple uiUpdate">{{ "'detail.compensationMoney'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Application Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Appeal Request</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Final Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund Status</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund Type</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
      </template>

      <!--申诉后待退款，转补款后申诉要退款同意退款  申诉后已退款，转补款后申诉要退款同意退款 -->
      <!--申诉后待退款，转补款后协商同意退款  申诉后已退款，转补款后协商同意退款-->
      <template v-if="detail.compensationStatus == 8">
        <el-row>
            <el-col :span="5">
            <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund</div>
            </el-col>
            <el-col :span="19">
            <div class="grid-content bg-purple uiUpdate">{{ "'detail.compensationMoney'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Application Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Compensation</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Appeal Request</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Final Result</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund Status</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple uiUpdate update-hori-middle">Refund Type</div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light ">{{ "'detail.channelNo'" }}</div>
            </el-col>
        </el-row>
      </template>
    </div>
    <!-- viewImage -->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>


  </div>
</template>

<script>
  /* eslint-disable */

  import { auditAppeal } from '@/api/goods'
  import { parseTime } from '@/utils'

  export default {
    props: {
      detail: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isViewImageShow: false,
        imageViewed: '',
        reviewResult: undefined,
      }
    },
    methods: {
      parseTime,
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },
      submitReviewResult() {
        this.$request({
          url: '/issue/submitRefundReviewResult.do',
          method: 'post',
          data: {
            orderNo: this.detail.orderNo,
            goodsNoForBrand: this.detail.code,
            reviewResult: this.reviewResult,
            refundStatus: this.detail.refundStatus,
          }
        }).then(res => {
        //   if (res.errorCode == 0) {
        //     const vm = this
        //     this.$alert('Submit success', '', {
        //       confirmButtonText: 'Confirm',
        //       type: 'success',
        //       callback: action => {
        //         vm.$emit('after-submit')
        //       }
        //     });
        //   } else {
        //     this.$message.error(res.errorMessage)
        //   }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .text-muted {
    color: #999;
  }

  .el-row {
    margin: 0;
  }

  .uiUpdate {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .update-hori-middle {
    justify-content: center
  }

  .grid-content.uiUpdate:not(.update-hori-middle) {
    background-color: transparent;
    font-weight: normal;
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
    border-right: 1px #d5d5d5 solid;
    border-bottom: 1px #d5d5d5 solid;
  }

  .el-col:nth-child(even) div {
    padding-left: 1em;
  }

  .text-muted {
    padding-left: 1em;
  }
</style>
