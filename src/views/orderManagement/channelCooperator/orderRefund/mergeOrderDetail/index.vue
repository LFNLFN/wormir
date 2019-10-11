<template>
  <div class="merge-order-wrap">
    <!--<h2 :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">{{ mergeTitle }}</h2>-->
    <!-- border-left2 border-top2 border-right border-bottom -->
    <div class="table_border">
      <!--并单编号那一行-->
      <div class="wrap1" style="border-bottom: 19px solid #D5D5D5">
        <el-table
          :data="[{}]"
          border=""
          fit
          highlight-current-row
          style="width: 100%;"
          :show-header="false"
        >
          <el-table-column align="center" label="" width="200" prop class-name="fake-table-head">
            <template slot-scope="scope">
              <div v-if="orders.length>1">Merge Payment No.</div>
              <div v-else>Order No.</div>
            </template>
          </el-table-column>
          <el-table-column align="left" label="" prop>
            <template slot-scope="scope">
              <div>{{mergeOrderNo || 'Automatic generated'}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--银行账号信息-->
      <div class="wrap2">
        <el-table
          :data="[{},{}]"
          border=""
          fit
          highlight-current-row
          style="width: 100%;border-bottom: none"
          :show-header="false"
        >
          <el-table-column align="center" label="" width="200" prop class-name="fake-table-head">
            <template slot-scope="scope">
              <div v-if="scope.$index==0">Beneficiary Bank SWIFT Code</div>
              <div v-if="scope.$index==1">Remitting Bank SWIFT Code</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="" prop>
            <template slot-scope="scope">
              <div v-if="scope.$index==0">{{ brandBankInfo.swiftCode }}</div>
              <div v-if="scope.$index==1">{{ wormirBankInfo.swiftCodeEn }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="" width="200" prop class-name="fake-table-head">
            <template slot-scope="scope">
              <div v-if="scope.$index==0">Beneficiary Bank Name</div>
              <div v-if="scope.$index==1">Remitting Bank Name</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="" prop>
            <template slot-scope="scope">
              <div v-if="scope.$index==0">{{ brandBankInfo.bankName }}</div>
              <div v-if="scope.$index==1">{{ wormirBankInfo.bankNameEn }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="" width="200" prop class-name="fake-table-head">
            <template slot-scope="scope">
              <div v-if="scope.$index==0">Beneficiary Bank Address</div>
              <div v-if="scope.$index==1">Remitting Bank Address</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="" width="200" prop>
            <template slot-scope="scope">
              <div v-if="scope.$index==0">{{ brandBankInfo.bankAddress }}</div>
              <div v-if="scope.$index==1">{{ wormirBankInfo.bankAddressEn }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--总收款数-->
      <!-- <div class="wrap3">
        <el-table
          :data="[{}]"
          border=""
          fit
          highlight-current-row
          style="width: 100%;border-top: none"
          :show-header="false"
        >
          <el-table-column align="right" label="" prop>
            <template slot-scope="scope">
              <div class="text-total">Total Unpaid Payment：</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="" width="200" prop>
            <template slot-scope="scope">
              <div class="text-total">{{ totalPaidPayment }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div> -->
      <!--总接收款数-->
      <!-- <div class="wrap4" v-if="currentMergeOrder.paymentStatus==3"> -->
      <div class="wrap4">
        <el-table
          :data="[{}]"
          border=""
          fit
          highlight-current-row
          style="width: 100%;border-top: none"
          :show-header="false"
        >
          <el-table-column align="right" label="" prop>
            <template slot-scope="scope">
              <div class="text-total">Total Pending Refund：</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="" width="200" prop>
            <template slot-scope="scope">
              <div class="text-total">{{ totalPaidPayment }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--时间记录-->
      <div class="wrap5">
        <el-table
          :data="[{}]"
          border=""
          fit
          highlight-current-row
          style="width: 100%;border-top: none"
          :show-header="false"
        >
          <el-table-column align="left" label="" prop>
            <template slot-scope="scope">
              <!-- <div :style="{paddingBottom: 0, }" class="text-muted">
                <span
                  v-if="currentMergeOrder.paymentStatus==1"
                >提交并单时间（Wormir）：{{ currentMergeOrder.createTime }}</span>
                <span
                  v-else-if="currentMergeOrder.paymentStatus==2"
                >支付时间（Worrmir）：{{ currentMergeOrder.payTime }}</span>
                <span
                  v-else-if="currentMergeOrder.paymentStatus==3"
                >提交并单时间（Wormir）：{{ currentMergeOrder.createTime }}； 支付时间（Worrmir）：{{ currentMergeOrder.payTime }}； 确认到账时间（Brand）：{{ currentMergeOrder.receivePaymentTime }}</span>
              </div>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--遍历显示订单-->
    <div v-for="(item,index) in orders" :key="index">
      <!-- <waitPayDeposit :currentRow="item" v-if="item.orderStatusFront!=3" ref="thirtyTable"
                      :currentMergeOrder="currentMergeOrder"
                      :hideTile="true"
                      @payment_amountChange="paymentAmount += $event"
                      @cancel="waitPayDepositVisible = false"
      style="padding: 0;" class="addGrayBlock"/>-->

      <waitPayDeposit
        :currentRow="item"
        v-if="item.orderStatusFront!=3"
        ref="thirtyTable"
        style="padding: 0;"
        class="addGrayBlock"
      />
      <waitPayResidual
        :currentRow="item"
        v-else
        ref="seventyTable"
        :currentMergeOrder="currentMergeOrder"
        :hideTile="true"
        @payment_amountChange="paymentAmount += $event"
        @cancel="waitPayResidualVisible = false"
        style="padding: 0"
        class="addGrayBlock"
      />
    </div>
     <p v-if="!mergeOrderNo" class="warn-notice text-center">Warm Notice: Merge payment is an unalterable operation, please be careful to the operation.</p>
    <!-- <div class="text-center" :style="{paddingBottom: 0, width: rowLength+'px'}"> -->
    <div class="text-center" v-if="!mergeOrderNo">
      <el-button
        @click="submitMergeOrder"
        type="primary"
        style="width: 10em"
        :loading="listLoading"
      >Submit</el-button>
    </div>
  </div>
</template>

<script>
import waitPayDeposit from "../waitPayDeposit/index.vue";
import waitPayResidual from "../waitPayResidual/index.vue";

export default {
  components: {
    waitPayDeposit,
    waitPayResidual
  },
  props: {
    orders: {
      type: Array,
      required: true
    },
    mergeTitle: {
      type: String
    },
    currentMergeOrder: {
      type: Object
    },
    mergeOrderNo: [String, Number]
  },
  computed: {
    totalPaidPayment() {
      let amount = 0;
      this.orders.forEach((e, i, s) => {
        if (e.orderStatusFront!=3) {
          amount += e.total_earnest_amount/1
        } else {
          amount += e.total_channel_amount/1
        }
      });
      return amount.toFixed(2);
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
      orderNos: []
    };
  },
  methods: {
    submitMergeOrder() {
      // console.log(this.brandBankInfo);
      // console.log(this.wormirBankInfo);
      // return false
      this.listLoading = true;
          this.$request({
            url: "/order/submitRefundMergeOrder.do",
            method: "post",
            data: {
              orderNos: this.orderNos,
              brandBankInfo: this.brandBankInfo,
              wormirBankInfo: this.wormirBankInfo,
              totalPaidPayment: this.totalPaidPayment/1,
            }
          })
            .then(res => {
              if (res.errorCode == 0) {
                this.listLoading = false;
                const vm = this;
                this.$alert(
                  "Refund payment have been merged, please check “Order Refund – Pay Refund” and complete the payment",
                  "",
                  {
                    confirmButtonText: this.$t("table.confirm"),
                    showClose: false,
                    type: "success",
                    callback() {
                      vm.$emit("submitSuccess");
                    }
                  }
                );
              } else {
                this.$message.error("Request Error");
                this.listLoading = false;
              }
            })
            .catch(err => {
              this.$message.error("Request Error");
              this.listLoading = false;
            });
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["seventyTable"]) {
        this.rowLength = this.$refs["seventyTable"][0].$el.offsetWidth;
      } else if (this.$refs["thirtyTable"]) {
        this.rowLength = this.$refs["thirtyTable"][0].$el.offsetWidth;
      }
    });
  },
  created() {
    this.$request({
      url: "/order/mergeOrderBankInfo.do",
      method: "post",
      data: {
        brandNo: this.orders[0].brand_no
      }
    })
      .then(res => {
        if (res.errorCode == 0) {
          this.wormirBankInfo = res.data.wormirBankInfo;
          this.brandBankInfo = res.data.brandBankInfo;
        } else {
          this.$message.error("数据请求失败");
        }
      })
      .catch(err => {
        this.$message.error("数据请求失败");
      });
    this.orders.forEach((e, i, s) => {
      this.orderNos.push(e.orderNo);
    });
  }
};
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
