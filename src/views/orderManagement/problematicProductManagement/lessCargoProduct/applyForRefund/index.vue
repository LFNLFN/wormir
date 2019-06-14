<template>
  <div>
    <h3 style="text-align: center">申请退款</h3>
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
        <el-col :span="14"><span>运输中丢失商品，需要退款。</span></el-col>
        <el-col :span="0"></el-col>
        <el-col :span="6">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ currentRow.applicationTime }}
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" style="min-height: 56px"><span>现场照片: </span></el-col>
        <el-col :span="20"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt="图片链接失效"
                                                                                height="48px" width="48px"
                                                                                style="margin-bottom: -36px"
                                                                                class="link-type"></span></el-col>
      </el-row>

      <el-row class="no-border-bottom">
        <el-col :span="4"><span>退款金额: </span></el-col>
        <el-col :span="4"><span>{{ currentRow.lessCargoRefundMoney }}</span></el-col>
      </el-row>
    </div>

    <div class="dialogBottomButton-wrap">
      <!--<el-button type="primary" @click="submitApplication" :loading="submitLoading">提交申请</el-button>-->
    </div>

    <el-dialog :visible.sync="successDialogVisible" width="30%" append-to-body :show-close="false">
      <span>退款申请已提交，可在“待审核”状态中查看详情。</span>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="handleConfirm()">知道了</el-button>
      </div>
    </el-dialog>

    <!-- viewImage -->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>

  </div>
</template>

<script>
  import problem_style from '@/styles/problem-col.scss'
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
        this.$request({
          url: '/issue/submitLessCargoApplication.do',
          method: 'post',
          data: {
            orderNo: this.currentRow.orderNo,
            lessCargoRefundStatus: this.currentRow.lessCargoRefundStatus,
          }
        }).then((res) => {
          if (res.errorCode == 0) {
            this.submitLoading = false
            this.successDialogVisible = true
          } else {
            this.$message.error('数据请求失败');
            this.submitLoading = false
          }
        }).catch((err) => {
          this.$message.error('数据请求失败');
          this.submitLoading = false
        })
      },
      handleConfirm() {
        this.successDialogVisible = false
        this.submitLoading = false
        this.$emit('closeApplicationDialog')
      },
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },
    },
  }
</script>

<style lang="scss" scoped>
  .el-col:nth-of-type(even) {
    padding-left: 1em;
  }
</style>
