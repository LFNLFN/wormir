<template>
  <div>
    <h3 style="text-align: center">协商中</h3>
    <div class="theBorder">
      <el-row>
        <el-col :span="4"><span>货单号: </span></el-col>
        <el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="4"><span>商品编号: </span></el-col>
        <el-col :span="8"><span>{{ currentRow.code }}</span></el-col>
        <el-col :span="4"><span>商品名称</span></el-col>
        <el-col :span="8"><span>{{ currentRow.goodName }}</span></el-col>
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
            $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}
          </div>
        </el-col>
      </el-row>
      <el-row v-if="currentRow.applicationReviewResult==3">
        <el-col :span="0"></el-col>
        <el-col :span="4"><div style="color:white">1</div></el-col>
        <el-col :span="4"><span>补款金额: </span></el-col>
        <el-col :span="4"><span>{{ currentRow.compensationMoney }}</span></el-col>
      </el-row>

      <el-row class="no-border-bottom">
        <el-col :span="4"><span>申诉理由: </span></el-col>
        <el-col :span="14"><span>请求吾蜜公司界入协商</span></el-col>
        <el-col :span="0"></el-col>
        <el-col :span="6">
          <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
            $t('order.appealTime') }}: {{ currentRow.appealTime }}
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dialogBottomButton-wrap">
      <el-button type="primary" disabled>协商中</el-button>
    </div>

    <!-- viewImage -->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
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
