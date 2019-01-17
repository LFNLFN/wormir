<template>
  <div class="merge-order-wrap">

    <div class="filter-container theTopMsgBorder" :style="{width: '1417px', padding: 0}">
      <el-row class="no-border-bottom">
        <el-col :span="3">
          <div class="grid-content bg-purple">Merge Payment NO. :</div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple">{{ 15633474655 }}</div>
        </el-col>
      </el-row>
    </div>

    <waitPayDeposit :currentRow="currentRow" v-if="waitPayDepositVisible"
                    @payment_amountChange="paymentAmount += $event"
                    @cancel="waitPayDepositVisible = false"
                    style="padding: 0;" class="addGrayBlock"/>
    <waitPayResidual :currentRow="currentRow" v-if="waitPayResidualVisible" ref="longerTable"
                     @payment_amountChange="paymentAmount += $event"
                     @cancel="waitPayResidualVisible = false"
                     style="padding: 0" class="addGrayBlock"/>

    <div class="filter-container theTopMsgBorder border-bottom2" :style="{width: '1417px', padding: 0}">
      <el-table key='mergeTotal' :data="mergeTotalList"
                border fit size="mini"
                style="width: 100%;border: none"
                class="orderTable" ref="mergeTotalTable"
                :span-method="arraySpanMethod_merge"
                :show-header="false"
                :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">

        <el-table-column align="center" width="85" label="Code" prop="goodsNo"/>
        <el-table-column align="center" width="130" label="Description" prop="goodsChineseName" show-overflow-tooltip/>
        <el-table-column align="center" width="190" label="Size" prop="specificationChinese" show-overflow-tooltip/>
        <el-table-column align="center" label="Replenishment Package">
          <el-table-column align="center" width="120" class-name="units-wrap" label="Replenishment Quantity"></el-table-column>
          <el-table-column align="center" width="100" label="Packing Unit"></el-table-column>
        </el-table-column>
        <el-table-column align="center" width="90" label="Retail Price"/>
        <el-table-column align="center" width="120" class-name="units-wrap" label="Replenishment Quantity"/>
        <el-table-column width="140" align="center" label="Unit Purchase Price"/>
        <el-table-column width="140" align="center" label="Total Purchase Price"/>

        <el-table-column align="right" width="128" label="30% Deposit">
          <template slot-scope="scope">
            <span class="text-total">{{ 'Unpaid Payment:' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="170px" label="70% Residual Payment" class-name="last-col-td0">
          <template slot-scope="scope">
            <span v-if="scope.$index===mergeTotalList.length-1" class="text-total">￥ {{ paymentAmount.toFixed(2) }}</span>
            <span v-else>￥ {{0}}</span>
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
      <div class="text-danger" style="margin-top: 20px">温馨提醒：并单一经提交不可更改，但可做取消并单操作。</div>
    </div>

    <!--<div class="filter-container" :style="{width: '1247px', padding: 0}">-->
      <!--<div class="dialogBottomButton-wrap">-->
        <!--<el-button @click="submitMergeOrder" type="primary" style="width: 10em">确认</el-button>-->
      <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>
  import waitPayDeposit from '../waitPayDeposit/index.vue'
  import waitPayResidual from '../waitPayResidual/index.vue'

  export default {
    components: {
      waitPayDeposit, waitPayResidual
    },
    data() {
      return {
        currentRow: {},
        waitPayDepositVisible: true,
        waitPayResidualVisible: true,
        rowLength: 0,
        mergeTotalList: [
          {
            goodsNo: 123456
          }
        ],
        paymentAmount: 0,
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
      },
      arraySpanMethod_merge({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.mergeTotalList.length - 1) {
         if (columnIndex === 9) {
            return {
              rowspan: 1,
              colspan: 10
            }
          } else if (columnIndex === 10) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
    },
    mounted() {
      this.$nextTick(()=>{
        this.rowLength = this.$refs['longerTable'].$el.offsetWidth
      })
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

  .addGrayBlock {
    margin: 20px 0;
  }
</style>
