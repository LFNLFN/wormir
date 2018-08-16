<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.orderNo')}}</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.retailerNo')}}</div></el-col>
      <el-col :span="15"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('mergeRefundOrders.transportation')}}</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.address')}}</div></el-col>
      <el-col :span="15"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2" align="center"><div class="grid-content bg-purple">{{$t('bill.city')}}</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.consignee')}}</div></el-col>
      <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2" align="center"><div class="grid-content bg-purple">{{$t('bill.contact')}}</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2" align="center"><div class="grid-content bg-purple">{{$t('bill.tel')}}</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <!--清单-->
    <el-table key='productList' :data="productList" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" :label="$t('product.brandName')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" :label="$t('product.productNo')">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" :label="$t('product.productName')">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80" :label="$t('product.productSpecification')">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" :label="$t('product.packageSpecification')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="$t('product.domesticRetailPrice')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" :label="$t('product.orderQuantity')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" :label="$t('product.orderUnitPrice')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" :label="$t('bill.orderAmount')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" :label="$t('bill.thirtyPercentDeposit')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" :label="$t('bill.residualPayment')" v-if="bill.status === 2">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--补货-->
    <el-table key='replenishment' :data="replenishmentList" border fit highlight-current-row
              style="width: 100%">
      <el-table-column width="80" align="center" :label="$t('product.brandName')">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" :label="$t('product.productNo')">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" :label="$t('product.productName')">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80" :label="$t('product.productSpecification')">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('product.replenishmentSpecification')">
        <el-table-column width="100" align="center" :label="$t('product.replenishmentQuantity')">
          <template slot-scope="scope">
            <span>{{scope.row.author}}</span>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" :label="$t('product.packageSpecification')">
          <template slot-scope="scope">
            <span>{{scope.row.author}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="100" align="center" :label="$t('product.domesticRetailPrice')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" :label="$t('product.orderQuantity')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" :label="$t('product.orderUnitPrice')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" :label="$t('bill.orderAmount')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" :label="$t('bill.thirtyPercentDeposit')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" :label="$t('bill.residualPayment')" v-if="bill.status === 2">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--点击货单号查看详情（待付30%订金）-->
    <el-row v-if="bill.status === 0">
      <el-col :span="10" align="left"><div class="grid-content">{{$t('bill.paythirtyPercentDeposittime')}}2018-4-18 16:22:56</div></el-col>
      <el-col :span="10" align="right"><div class="grid-content text-danger">{{$t('bill.thirtyPercentDepositAmountPaid')}}</div></el-col>
      <el-col :span="4" align="center"><div class="grid-content"></div></el-col>
    </el-row>

    <!--点击货单号查看详情（待付70%余款）-->
    <el-row v-if="bill.status === 1">
      <el-col :span="10" align="left"><div class="grid-content">{{$t('bill.residualPaymentAndTaxPayTime')}}2018-4-18 16:22:56</div></el-col>
      <el-col :span="10" align="right"><div class="grid-content text-danger">{{$t('bill.residualPaymentAmount')}}</div></el-col>
      <el-col :span="4" align="center"><div class="grid-content"></div></el-col>
    </el-row>

    <!--待收退款-查看详情-->
    <template v-if="bill.status === '待收退款'">
      <el-row>
        <el-col :span="22" align="right"><div class="grid-content text-danger">{{receivedPaymentLabel}}</div></el-col>
        <el-col :span="2" align="center"><div class="grid-content text-danger"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4" align="center"><div class="grid-content">{{$t('receivedRefund.refundReason')}}2018-4-18 16:22:56</div></el-col>
        <el-col :span="12" align="center"><div class="grid-content"></div></el-col>
        <el-col :span="6" align="right"><div class="grid-content text-danger">{{refundAmountLabel}}</div></el-col>
        <el-col :span="2" align="center"><div class="grid-content text-danger"></div></el-col>
      </el-row>
    </template>


  </div>
</template>

<script>
  export default {
    name: 'bill-detail-merge-order',
    props: {
      bill: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        productList: [],
        replenishmentList: []
      }
    },
    computed: {
      // 有70%订金列
      hasDeposit70() {

      },

      // 退款类型
      refundAmountLabel() {
        switch (this.bill.type) {
          case '待收退款-缺货退订金':
          case '待收退款-取消退订金':
            return this.$t('receivedRefund.pendingRefundDeposit30')
          case '待收退款-中断订货退80%订金':
            return this.$t('receivedRefund.pendingRefundDeposit80')
          case '待收退款-取消退全款':
            return this.$t('receivedRefund.pendingRefundAll')
          case '已收退款-缺货退订金':
          case '已收退款-取消退订金':
            return this.$t('receivedRefund.refundedDeposit30')
          case '已收退款-中断订货退80%订金':
            return this.$t('receivedRefund.refundedDeposit80')
          case '已收退款-取消退全款':
            return this.$t('receivedRefund.refundedAll')
        }
      },

      // 收到货款类型
      receivedPaymentLabel() {
        if (this.bill.type === '收到30%订金') return this.$t('receivedRefund.receivedDeposit30')
        if (this.bill.type === '收到70%余款') return this.$t('receivedRefund.receivedResidual70')

        return this.$t('receivedRefund.receivedDeposit30')
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "src/styles/variables.scss";
.text-danger {
  color: $red;
}
</style>
