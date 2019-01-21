<template>
  <div class="merge-order-wrap">
    <div class="big-wrap border-right2 border-top2">
      <div class="filter-container theTopMsgBorder border-bottom2 mg-top-2" :style="{width: '1247px', padding: 0}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">Merge Payment NO. :</div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple">{{ 15633474655 }}</div>
          </el-col>
        </el-row>
      </div>

      <div class="mg-top-2">
        <depositRefund  v-if="depositRefundVisible" @itsTotalRefund="theirTotalRefund+=$event"
                        @cancel="depositRefundVisible = false" style="padding: 0;"/>
        <residualRefund v-if="residualRefundVisible" @itsTotalRefund="theirTotalRefund+=$event"
                        @cancel="residualRefundVisible = false" style="padding: 0"/>
      </div>

      <div class="filter-container theTopMsgBorder border-bottom2 no-border-right" :style="{width: '1416px', padding: 0}">
        <el-table
          :data="[{something:0}]" border
          :show-header="false"
          class="no-border-right"
          style="width: 100%">
          <el-table-column
            prop="something"
            label=""
            width="833px"
            >
            <template slot-scope="scope">
              <span class="text-muted">{{'The Time of Merge Refund Orders：2018-4-18 16：22：56；The Time of Refund Payment：2018-4-18 16：22：56'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label=""
            align="right"
            width="411px"
            >
            <template slot-scope="scope">
              <span class="text-total">{{'Total Refunded Payment：'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label=""
            align="center"
          >
            <template slot-scope="scope">
              <span class="text-total">￥ {{theirTotalRefund.toFixed(2)}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="4" align="center">
            <div class="grid-content bg-purple">Beneficiary Bank SWIFT Code:</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">453566787469</div>
          </el-col>
          <el-col :span="4" align="center">
            <div class="grid-content bg-purple"> Beneficiary Bank Name:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">中国农业银行</div>
          </el-col>
          <el-col :span="4" align="center">
            <div class="grid-content bg-purple">Beneficiary Bank Address:</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">广州市天河区石牌桥</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" align="center">
            <div class="grid-content bg-purple">Remitting Bank SWIFT Code:</div>
          </el-col>
          <el-col :span="3" v-if="currentRow.payWay!==1">
            <div class="grid-content bg-purple">413266787469</div>
          </el-col>
          <el-col :span="4" align="center">
            <div class="grid-content bg-purple">Remitting Bank Name:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">中国工商银行</div>
          </el-col>
          <el-col :span="4" align="center">
            <div class="grid-content bg-purple">Remitting Bank Address:</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">广州市番禺区市桥</div>
          </el-col>
        </el-row>
        <span style="color: red">温馨提醒：并单一经提交不可更改，但可做取消并单操作。</span>
      </div>

    </div>

  </div>
</template>

<script>
  import depositRefund from '../depositRefund/index.vue'
  import residualRefund from '../residualRefund/index.vue'

  export default {
    components: {
      depositRefund, residualRefund
    },
    data() {
      return {
        currentRow: {},
        depositRefundVisible: true,
        residualRefundVisible: true,
        rowLength: 0,
        theirTotalRefund: 0
      }
    },
    methods: {
      submitMergeOrder() {
        const vm = this
        this.$alert('并单已提交，可到“渠道订货-支付货款”中查看详情，并完成付款。', '', {
          confirmButtonText: this.$t('table.confirm'),
          showClose: false,
          center: true,
          callback() {
            vm.$emit('cancel')
          }
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .col-head {
    background: rgb(223, 242, 252);
    color: rgb(66, 66, 66);
    font-weight: 700;
    font-size: 12px;
    line-height: 36px;
    text-align: center;
    width: 100px;
  }

  .col-content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: rgb(66, 66, 66);
    width: 100px;
  }

  .orderTable .el-col {
    border-right: none;
  }

  .el-col {
    border-radius: 0;
  }

  .el-col:nth-child(odd) {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-col:nth-child(odd):not(:last-of-type) {
    border-right: 1px solid #d5d5d5;
  }

  .el-col:nth-child(even) {
    color: #424242;
    font-size: 12px;
    display: flex;
    align-items: center;
  }

  .el-col:nth-child(even):not(:last-of-type) {
    border-right: 1px solid #d5d5d5;
  }

  .grid-content {
    border: none;
  }

  .big-wrap{
    width: 1416px;
    overflow: hidden;
  }

  .merge-order-wrap:after {
    content: '';
    display: block;
    width: 1450px;
    height: 1px;
  }
</style>
