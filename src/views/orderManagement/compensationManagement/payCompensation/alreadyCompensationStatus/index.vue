<template>
  <div>
    <div class="theBorder" style="border-bottom-width: 1px">
      <el-row>
        <el-col :span="4"><span>货单号: </span></el-col>
        <el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="4"><span>商品编号: </span></el-col>
        <el-col :span="8"><span>{{ currentRow.goodsNo }}</span></el-col>
        <el-col :span="4"><span>商品名称</span></el-col>
        <el-col :span="8"><span>{{ currentRow.goodsName }}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="4"><span>申请理由: </span></el-col>
        <el-col :span="14"><span>{{ '商品外观有瑕疵，申请补款补偿顾客。' }}</span></el-col>
        <el-col :span="0"></el-col>
        <el-col :span="6">
          <div class="text-muted">{{
            $t('order.applicationTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" style="min-height: 56px"><span>现场照片: </span></el-col>
        <el-col :span="20"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                                height="48px" width="48px"
                                                                                class="link-type"></span></el-col>
      </el-row>


      <!--申请后补款-->
      <template v-if="currentRow.compensationType===0">
        <el-row>
          <el-col :span="4"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>同意申请</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="16"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款状态: </span></el-col>
          <el-col :span="4"><span>已补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>申请后补款</span></el-col>
        </el-row>
      </template>

      <!--申诉后补款-驳回申请后补款-->
      <template v-if="currentRow.compensationType===10">
        <el-row>
          <el-col :span="4"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>驳回申请</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="6"><span>给予顾客补款，减少带来投诉</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>同意申诉</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="16">
            <div class="text-muted">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款状态: </span></el-col>
          <el-col :span="4"><span>已补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>申诉后补款</span></el-col>
        </el-row>
      </template>

      <!--申诉后补款-协商后补款-->
      <template v-if="currentRow.compensationType===11">
        <el-row>
          <el-col :span="4"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>驳回申请</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="6"><span>请求吾蜜公司界入协商</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>同意申诉</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="16">
            <div class="text-muted">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款状态: </span></el-col>
          <el-col :span="4"><span>已补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补款类型: </span></el-col>
          <el-col :span="4"><span>申诉后补款</span></el-col>
        </el-row>
      </template>

      <!--破损转补款-申请后要补款-->
      <template v-if="currentRow.compensationType===20">
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
          <el-col :offset="4" :span="16">
            <div class="text-muted">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
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

      <!--破损转补款-驳回申请要补货-->
      <template v-if="currentRow.compensationType===21">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>驳回申请</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="6"><span>商品破损严重，只能接受补货</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="16">
            <div class="text-muted">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
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

      <!--破损转补款-申诉（驳回申请）要补款-->
      <template v-if="currentRow.compensationType===22">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>驳回申请</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="6"><span>商品有瑕疵，申请转补款后继续销售</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="16">
            <div class="text-muted">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
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


      <!--破损转补款-申诉（审核结果还是为补款）-->
      <template v-if="currentRow.compensationType===23">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="16"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="6"><span>商品破损严重，只能接受补货</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="16"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
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
      <template v-if="currentRow.compensationType===24">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="16"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="6"><span>请求吾蜜公司介入协商</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="16"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
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
      <template v-if="currentRow.compensationType===25">
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="16"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="6"><span>请求吾蜜公司介入协商</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>破损转补款</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="16"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
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
        default: function() {
          return {
            boxCode: 1111,
            compensationAmount: 1765,
            goodsNo: 123123,
            goodsName: '唇膏',
            brandEnglishName: 'LANCOM',
            channelClassify: 1,
            channelNo: 20001,
            compensation: 170,
            compensationStatus: 20,
            compensationType: 11,
            description: "Lancome (LANCOME) air cushion lip oil",
            mergePaymentNo: 857938502482,
            orderMethod: 20,
            orderNo: 10001,
            orderStatus: 10,
            proofImage:
              "http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg",
          }
        }
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
  .theBorder {
    border: solid #d5d5d5 2px;
  & .el-row {
      border-bottom: solid #d5d5d5 1px;
      margin-bottom: 0;
    }
  }
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
  }

  .el-col:nth-child(even) {
    color: #424242;
    display: flex;
    align-items: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
  }

  .el-col:last-of-type {
    border-right: none;
  }

  .el-col:only-of-type {
    border-right: none;
  }
</style>
