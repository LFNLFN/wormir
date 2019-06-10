<template>
  <div>
    <h3 style="text-align: center" v-if="currentRow.compensationStatus==7">驳回申诉</h3>
    <h3 style="text-align: center" v-if="currentRow.compensationStatus==4">驳回申请</h3>
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
        <el-col :span="14"><span>{{ '商品外观有瑕疵，申请补款补偿顾客。' }}</span></el-col>
        <el-col :span="0"></el-col>
        <el-col :span="6">
          <div class="text-muted">{{
            $t('order.applicationTime') }}: {{ currentRow.applicationTime }}
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" style="min-height: 56px"><span>现场照片: </span></el-col>
        <el-col :span="20"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                                height="48px" width="48px"
                                                                                class="link-type"></span></el-col>
      </el-row>


      <!--驳回申请-查看详情-->
      <template v-if="currentRow.compensationStatus==4&&currentRow.compensationType==2">
        <el-row>
          <el-col :span="4"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.compensationMoney }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>不支持补款</span></el-col>
        </el-row>
      </template>

      <!--驳回申请-查看驳回-->
      <template v-if="currentRow.compensationStatus==4&&currentRow.compensationType==1">
        <el-row>
          <el-col :span="4"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.compensationMoney }}</span></el-col>
        </el-row>
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

      </template>

      <!--驳回申诉-驳回申请不支持补款-->
      <template v-if="currentRow.compensationStatus==7&&currentRow.compensationType==2&&currentRow.appealReason!=4">
        <el-row>
          <el-col :span="4"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.compensationMoney }}</span></el-col>
        </el-row>
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
          <el-col :span="6"><span>{{ currentRow.appealReason | appealReasonFilter }}</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              $t('order.appealTime') }}: {{ currentRow.appealTime }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>不支持补款</span></el-col>
        </el-row>
      </template>

      <!--驳回申诉-查看详情（协商后不支持补款）-->
      <template v-if="currentRow.compensationStatus==7&&currentRow.compensationType==2&&currentRow.appealReason==4">
        <el-row>
          <el-col :span="4"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>{{ currentRow.compensationMoney }}</span></el-col>
        </el-row>
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
          <el-col :span="14"><span>驳回申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ currentRow.appealReviewTime }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>不支持补款</span></el-col>
        </el-row>
      </template>

      <!-- viewImage -->
      <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
        <img :src="imageViewed" alt="" width="100%">
      </el-dialog>

      <!--申诉弹层-->
      <el-dialog :visible.sync="isAppealProcessingShow" append-to-body>
        <div>
          <p>申诉理由: </p>
          <div>
            <el-radio v-model="appealReason" :label="1">给予顾客补款，顾客体验相对好</el-radio>
          </div>
          <div>
            <el-radio v-model="appealReason" :label="2">给予顾客补款，尽力避免退货</el-radio>
          </div>
          <div>
            <el-radio v-model="appealReason" :label="3">给予顾客补款，减少带来投诉</el-radio>
          </div>
          <div>
            <el-radio v-model="appealReason" :label="4">请求吾蜜公司介入协商</el-radio>
          </div>
          <div style="text-align: center">
            <el-button type="primary" @click="submitAppealReason">确认申诉</el-button>
          </div>
        </div>
      </el-dialog>


      <el-dialog :visible.sync="failDialogVisible" width="30%" append-to-body :show-close="false">
        <span>请选择申诉理由</span>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="failDialogVisible = false">知道了</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="successDialogVisible" width="30%" append-to-body :show-close="false">
        <span v-if="appealReason!=4">申诉已提交，可在“申诉中”状态查看详情。</span>
        <span v-else>申诉已提交，可在“协商中”状态查看详情。</span>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="handleConfirm()">知道了</el-button>
        </div>
      </el-dialog>
    </div>
    <!--查看驳回状态-->
    <div v-if="currentRow.compensationStatus==4 && currentRow.compensationType==1">
      <div class="dialogBottomButton-wrap">
        <!--<el-button type="primary" @click="viewAppealProcessing" :loading="submitLoading">我要申诉</el-button>-->
        <p>温馨提醒：收到审核结果后7日内不提出申诉，表示您接受“驳回申请”。</p>
      </div>
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
        appealReason: null,
        isAppealProcessingShow: false,
        successDialogVisible: false,
        failDialogVisible: false
      }
    },
    methods: {
      handleConfirm() {
        this.$emit('closeCheckRejection')
      },
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },
      viewAppealProcessing() {
        this.isAppealProcessingShow = true
      },
      submitAppealReason() {
        this.submitLoading = true
        if (!this.appealReason) {
          this.failDialogVisible = true
          this.submitLoading = false
        } else {
          this.$request({
            url: '/issue/submitCompensationApplicationAndAppeal.do',
            method: 'post',
            data: {
              orderNo: this.currentRow.orderNo,
              compensationStatus: this.currentRow.compensationStatus,
              compensationType: this.currentRow.compensationType,
              appealReason: this.appealReason,
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
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .el-col:nth-of-type(even) {
    padding-left: 1em;
  }
</style>
