<template>
  <div class="merge-order-wrap">
    <h2 :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">{{ mergeTitle }}</h2>
    <!--并单编号那一行-->
    <div class="wrap1" style="border-bottom: 19px solid #D5D5D5">
      <el-table :data="[{}]" border fit highlight-current-row
                style="width: 100%;"
                :show-header="false"
      >
        <el-table-column align="center" label="" width="200" prop="" class-name="fake-table-head">
          <template slot-scope="scope">
            <div v-if="orders.length>1">Merge Payment No.</div>
            <div v-else>Order No.</div>
          </template>
        </el-table-column>
        <el-table-column align="left" label="" prop="">
          <template slot-scope="scope">
            <div v-if="orders.length==1">{{orders[0].orderNo}}</div>
            <div v-else-if="orders.length>1">{{ createNumWithRange(7) }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--银行账号信息-->
    <div class="wrap2">
      <el-table :data="[{},{}]" border fit highlight-current-row
                style="width: 100%;border-bottom: none"
                :show-header="false"
      >
        <el-table-column align="center" label="" width="200" prop="" class-name="fake-table-head">
          <template slot-scope="scope">
            <div v-if="scope.$index==0">Beneficiary Bank SWIFT Code</div>
            <div v-if="scope.$index==1">Remitting Bank SWIFT Code</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" prop="">
          <template slot-scope="scope">
            <div v-if="scope.$index==0">{{ brandBankInfo.swiftCode }}</div>
            <div v-if="scope.$index==1">{{ wormirBankInfo.swiftCodeEn }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="200" prop="" class-name="fake-table-head">
          <template slot-scope="scope">
            <div v-if="scope.$index==0">Beneficiary Bank Name</div>
            <div v-if="scope.$index==1">Remitting Bank Name</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" prop="">
          <template slot-scope="scope">
            <div v-if="scope.$index==0">{{ brandBankInfo.bankName }}</div>
            <div v-if="scope.$index==1">{{ wormirBankInfo.bankNameEn }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="200" prop="" class-name="fake-table-head">
          <template slot-scope="scope">
            <div v-if="scope.$index==0">Beneficiary Bank Address</div>
            <div v-if="scope.$index==1">Remitting Bank Address</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="200" prop="">
          <template slot-scope="scope">
            <div v-if="scope.$index==0">{{ brandBankInfo.bankAddress }}</div>
            <div v-if="scope.$index==1">{{ wormirBankInfo.bankAddressEn }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--总收款数-->
    <div class="wrap3">
      <el-table :data="[{}]" border fit highlight-current-row
                style="width: 100%;border-top: none"
                :show-header="false"
      >
        <el-table-column align="right" label="" prop="">
          <template slot-scope="scope">
            <div class="text-total">Total Unpaid Payment：</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="200" prop="">
          <template slot-scope="scope">
            <div class="text-total">{{ totalPaidPayment }}</div>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!--遍历显示订单-->
    <div v-for="(item,index) in orders">
      <waitPayDeposit :currentRow="item" v-if="item.order_status==30" ref="thirtyTable"
                      :hideTile="true"
                      @payment_amountChange="paymentAmount += $event"
                      @cancel="waitPayDepositVisible = false"
                      style="padding: 0;" class="addGrayBlock"/>
      <waitPayResidual :currentRow="item" v-if="item.order_status==40" ref="seventyTable"
                       :hideTile="true"
                       @payment_amountChange="paymentAmount += $event"
                       @cancel="waitPayResidualVisible = false"
                       style="padding: 0" class="addGrayBlock"/>
    </div>

    <div class="text-center" :style="{paddingBottom: 0, width: rowLength+'px'}">
      <el-button @click="submitMergeOrder" type="primary" style="width: 10em" :loading="listLoading">确认提交</el-button>
      <p class="warn-notice">温馨提醒：货单一经提交不可取消，请谨慎操作。</p>
    </div>

  </div>
</template>

<script>
  import waitPayDeposit from './waitPayDeposit/index.vue'
  import waitPayResidual from './waitPayResidual/index.vue'
  import { createNumWithRange } from '@/utils/index'

  export default {
    components: {
      waitPayDeposit, waitPayResidual
    },
    props: {
      orders: {
        type: Array,
        required: true
      },
      mergeTitle: {
        type: String
      }
    },
    computed: {
      totalPaidPayment() {
        let amount = 0
        this.orders.forEach((e,i,s) => {
          amount += e.waitPayAmount.substring(1)/1
        })
        return  this.orders[0].waitPayAmount.substring(0,1) + amount.toFixed(2)
      }
    },
    data() {
      return {
        currentRow: {},
        waitPayDepositVisible: true,
        waitPayResidualVisible: true,
        rowLength: 0,
        paymentAmount: 0,
        listLoading: false,
        wormirBankInfo: {},
        brandBankInfo: {},
        orderNos: [],
        channelNos: [],
      }
    },
    methods: {
      submitMergeOrder() {
        this.$confirm('货单一经提交不可取消,确定提交吗？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          this.$request({
            url: '/order/submitMergeOrder.do',
            method: 'post',
            data: {
              orderNos: this.orderNos,
              channelNos: this.channelNos,
              brandBankInfo: this.brandBankInfo,
              wormirBankInfo: this.wormirBankInfo,
              totalPaidPayment: this.totalPaidPayment,
              brandNo: this.orders[0].brand_no,
              brandName: this.orders[0].brand_name,
            }
          }).then((res) => {
            if (res.errorCode == 0) {
              this.listLoading = false
              const vm = this
              this.$alert('并单已提交，可到“渠道订货-支付货款”中查看详情，并完成付款。', '', {
                confirmButtonText: this.$t('table.confirm'),
                showClose: false,
                center: true,
                callback() {
                  vm.$emit('cancel')
                }
              })
            } else {
              this.$message.error('数据请求失败');
              this.listLoading = false
            }
          }).catch((err) => {
            this.$message.error('数据请求失败');
            this.listLoading = false
          })
        }).catch(() => {});
      },
      createNumWithRange,
    },
    mounted() {
      this.$nextTick(()=>{
        if (this.$refs['seventyTable']) {
          this.rowLength = this.$refs['seventyTable'][0].$el.offsetWidth
        } else if (this.$refs['thirtyTable']) {
          this.rowLength = this.$refs['thirtyTable'][0].$el.offsetWidth
        }
      })
    },
    created() {
      this.$request({
        url: '/order/mergeOrderBankInfo.do',
        method: 'post',
        data: {
          brandNo: this.orders[0].brand_no
        }
      }).then((res) => {
        if (res.errorCode == 0) {
          this.wormirBankInfo = res.data.wormirBankInfo
          this.brandBankInfo = res.data.brandBankInfo
        } else {
          this.$message.error('数据请求失败');
        }
      }).catch((err) => {
        this.$message.error('数据请求失败');
      })
      this.orders.forEach((e,i,s) => {
        this.orderNos.push(e.orderNo)
        this.channelNos.push(e.channel_no)
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
