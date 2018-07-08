<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.orderNo')}}</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.retailerNo')}}</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.retailerName')}}</div></el-col>
      <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.address')}}</div></el-col>
      <el-col :span="13"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.city')}}</div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.consignee')}}</div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.contact')}}</div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.tel')}}</div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <!--待收货-处理收货（DFQD）无银行-->
    <template v-if="!(bill.type === 4 && bill.retailerCategories === 'DFQD')">
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.receivables')}} SWFIT Code</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.receivables')}}{{$t('bill.bank')}}</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.bank')}}{{$t('bill.address')}}</div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.remittance')}}SWFIT Code</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.remittance')}}{{$t('bill.bank')}}</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3" align="center"><div class="grid-content bg-purple">{{$t('bill.bank')}}{{$t('bill.address')}}</div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    </template>

    <!--订货-->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
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
      <el-table-column width="80" align="center" :label="$t('product.originalDiscount')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" :label="$t('product.orderDiscount')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" :label="$t('product.orderUnitPrice')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" :label="$t('bill.orderAmount')">
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
      <el-table-column width="100" :label="$t('bill.crossBorderTax')" v-if="bill.status === 2 && bill.retailerCategories === 'DFQD'">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--补货-->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
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
      <el-table-column width="80" align="center" :label="$t('product.originalDiscount')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" :label="$t('product.orderDiscount')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" :label="$t('product.orderUnitPrice')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" :label="$t('bill.orderAmount')">
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
      <el-table-column width="100" :label="$t('bill.crossBorderTax')" v-if="bill.status === 2 && bill.retailerCategories === 'DFQD'">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--货单管理-->
    <template v-if="table === 'billManagement'">
      <el-row v-if="bill.status === 0 || bill.status === 1">
        <el-col :span="10" align="left"><div class="grid-content">{{$t('bill.paythirtyPercentDeposittime')}}2018-4-18 16:22:56</div></el-col>
        <el-col :span="10" align="right"><div class="grid-content">{{$t('bill.thirtyPercentDepositAmountPaid')}}</div></el-col>
        <el-col :span="4" align="center"><div class="grid-content"></div></el-col>
      </el-row>

      <!--待收余款-查看货单（以DFQD为例，DLQD/FXQD没有跨境税金项）-->
      <template v-if="bill.status === 2 && bill.retailerCategories === 'DFQD'">
        <el-row>
          <el-col :span="20" align="right"><div class="grid-content text-danger">{{$t('bill.unpaidResidualPaymentTips')}}</div></el-col>
          <el-col :span="2" align="right"><div class="grid-content">{{$t('bill.sum')}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row v-if="bill.status === 0 || bill.status === 1">
          <el-col :span="10" align="left"><div class="grid-content">{{$t('bill.stockUpTime')}}2018-4-18 16:22:56</div></el-col>
          <el-col :span="10" align="right"><div class="grid-content">{{$t('bill.residualPaymentAndTaxAmount')}}</div></el-col>
          <el-col :span="4" align="center"><div class="grid-content"></div></el-col>
        </el-row>
      </template>

      <!--待发货-查看货单（以DFQD例，DLQD/FXQD没有跨境税金项）-->
      <template v-if="bill.status === 3 && bill.retailerCategories === 'DFQD'">
        <el-row>
          <el-col :span="20" align="right"><div class="grid-content">{{$t('bill.sum')}}</div></el-col>
          <el-col :span="4" align="center"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row v-if="bill.status === 0 || bill.status === 1">
          <el-col :span="10" align="left"><div class="grid-content">{{$t('bill.residualPaymentAndTaxPayTime')}}2018-4-18 16:22:56</div></el-col>
          <el-col :span="10" align="right"><div class="grid-content">{{$t('bill.paymentAndTaxPaid')}}</div></el-col>
          <el-col :span="4" align="center"><div class="grid-content"></div></el-col>
        </el-row>
      </template>

      <!--待收货-查看货单（DLQD/FXQD）-->
      <template v-if="bill.status === 4 && bill.retailerCategories !== 'DFQD'">
        <el-row>
          <el-col :span="10" align="left">
            <div class="grid-content">
              {{$t('bill.shipmentConfirmTime')}}2018-4-18 16:22:56
              {{$t('bill.transportTicketUploadTime')}}2018-4-18 16:22:56
            </div>
          </el-col>
          <el-col :span="2" align="right"><div class="grid-content">{{$t('bill.sum')}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
          <el-col :span="4" align="right"><div class="grid-content">{{$t('bill.paymentPaid')}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button>{{$t('bill.dispatched')}}</el-button>

            <!--待收货-处理收货（DFQD）-->
            <el-button v-if="bill.type === 4 && bill.retailerCategories === 'DFQD'">{{$t('bill.mailBill')}}</el-button>
          </el-col>
        </el-row>
      </template>

      <!--已收货-查看货单（DLQD/FXQD没有跨境税金项）-->
      <template v-if="bill.status === 5">
        <el-row>
          <el-col :span="10" align="left">
            <div class="grid-content">
              {{$t('bill.receiveConfirmTime')}}2018-4-18 16:22:56
              {{$t('bill.consignee')}}12345678912
            </div>
          </el-col>
          <el-col :span="2" align="right"><div class="grid-content">{{$t('bill.sum')}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
          <el-col :span="4" align="right"><div class="grid-content">{{$t('bill.paymentAndTaxPaid')}}</div></el-col>
          <el-col :span="6" align="center"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button>{{$t('bill.dispatched')}}</el-button>

            <!--待收货-处理收货（DFQD）-->
            <el-button v-if="bill.type === 4 && bill.retailerCategories === 'DFQD'">{{$t('bill.mailBill')}}</el-button>
          </el-col>
        </el-row>
      </template>

      <!--停止订货-查看货单-->
      <template v-if="bill.status === 6">
        <el-row v-if="'当是香港交易时，需有此提示'">
          <el-col :span="20" align="right"><div class="grid-content text-danger">{{$t('bill.cancelOrderTips')}}</div></el-col>
          <el-col :span="2" align="right"><div class="grid-content">{{$t('bill.thirtyPercentDepositAmount')}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="20" align="left"><div class="grid-content">{{$t('bill.cancelOrderTime')}}2018-4-18 16:22:56</div></el-col>
          <el-col :span="4" align="center"><div class="grid-content">{{$t('bill.hadCancelOrder')}}</div></el-col>
        </el-row>
      </template>

      <!--中断订货-查看货单（DLQD/FXQD没有跨境税金项）-->
      <template v-if="bill.status === 7">
        <el-row>
          <el-col :span="20" align="right"><div class="grid-content text-danger">{{$t('bill.payRemainMoneyTips')}}</div></el-col>
          <el-col :span="2" align="right"><div class="grid-content">{{$t('bill.sum')}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="20" align="left"><div class="grid-content">{{$t('bill.paythirtyPercentDeposittime')}}2018-4-18 16:22:56</div></el-col>
          <el-col :span="2" align="right"><div class="grid-content">{{$t('bill.residualPaymentAndTaxAmount')}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="20" align="left"><div class="grid-content">{{$t('bill.cancelStockUpTime')}}2018-4-18 16:22:56</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content">{{$t('bill.hadCancelStockUp')}}</div></el-col>
        </el-row>
      </template>

      <!--问题商品-->
      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column width="80" align="center" :label="$t('product.problematicProduct')">
        <template slot-scope="scope">
          {{ $t('product.problematicProduct') }}
        </template>
      </el-table-column>
      <el-table-column width="320" align="center" :label="$t('product.defectiveProduct')">
        <el-table-column width="160" :label="$t('product.productNo')"></el-table-column>
        <el-table-column width="160" :label="$t('product.productName')"></el-table-column>
      </el-table-column>
      <el-table-column width="80" align="center" :label="$t('product.readSystem')">
        <el-table-column width="80" :label="$t('product.quantity')">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="320" align="center" :label="$t('product.damagedProduct')">
        <el-table-column width="160" :label="$t('product.productNo')"></el-table-column>
        <el-table-column width="160" :label="$t('product.productName')"></el-table-column>
      </el-table-column>
      <el-table-column width="80" align="center" :label="$t('product.readSystem')">
        <el-table-column width="80" :label="$t('product.quantity')">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column width="320" align="center" :label="$t('product.lessCargoProduct')">
        <el-table-column width="160" :label="$t('product.productNo')"></el-table-column>
        <el-table-column width="160" :label="$t('product.productName')"></el-table-column>
      </el-table-column>
      <el-table-column width="80" align="center" :label="$t('product.readSystem')">
        <el-table-column width="80" :label="$t('product.quantity')">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    </template>

    <!--支付退款-->
    <template v-if="table === 'payRefund'">

      <template v-if="bill.status !== '中断订货'">
        <el-row :gutter="5">
          <el-col :span="16" align="left"><div class="grid-content">{{refundTime}}</div></el-col>
          <el-col :span="6" align="right"><div class="grid-content">{{refundAmountLabel}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content"></div></el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="2" align="center"><div class="grid-content text-danger">{{$t('payRefund.reason')}}</div></el-col>
          <el-col :span="8" align="left"><div class="grid-content">{{refundReason}}</div></el-col>
          <el-col :span="2" align="right"><div class="grid-content">{{$t('payRefund.refundDescription')}}</div></el-col>
          <el-col :span="12" align="center"><div class="grid-content">{{refundDescription}}</div></el-col>
        </el-row>
      </template>

      <template v-else>
        <el-row :gutter="5">
          <el-col :span="22" align="right"><div class="grid-content text-danger">{{refundAmountLabel}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content text-danger"></div></el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="2" align="center"><div class="grid-content text-danger">{{$t('payRefund.reason')}}</div></el-col>
          <el-col :span="14" align="left"><div class="grid-content">{{$t('receivedRefund.reasonLackGoods')}}</div></el-col>
          <el-col :span="6" align="right"><div class="grid-content text-danger">{{$t('payRefund.refundedDeposit80Total')}}</div></el-col>
          <el-col :span="2" align="center"><div class="grid-content text-danger"></div></el-col>
        </el-row>
      </template>

    </template>
  </div>
</template>

<script>
  export default {
    name: 'bill-detail',
    props: {
      bill: Object,
      table: String,
      status: String,
    },
    data() {
      return {
        refundTime: '',
        refundReason: '',
        refundDescription: '',
        refundAmountLabel: ''
      }
    },
    computed: {
      // 有70%订金列
      hasDeposit70() {

      },
      // 有税金列
      hasCrossBorderTax() {

      },
      // 有问题商品表格
      hasProblematicProduct() {

      },
    },
    methods: {
      updateRefundInfo() {
        if(this.table !== 'payRefund') return

        let timeDeposit30 = this.$t('bill.paythirtyPercentDeposittime') + this.bill.paythirtyPercentDeposittime

        if(this.status === '缺货退订金-未去退款') {
          let timeOrderCancel = this.$t('payRefund.timeOrderCancel') + this.bill.timeOrderCancel
          this.refundTime = timeDeposit30 + '; ' + timeOrderCancel
          this.refundReason = this.$t('receivedRefund.reasonLackGoods')
          this.refundDescription = this.$t('payRefund.description1')
          this.refundAmountLabel = this.$t('receivedRefund.pendingRefundDeposit30')
          return
        }

        if(this.status === '缺货退订金-已去退款') {
          let timeRefundDeposit30 = this.$t('payRefund.timeRefundDeposit30') + this.bill.timeRefundDeposit30
          this.refundTime = timeDeposit30 + '; ' + timeRefundDeposit30
          this.refundReason = this.$t('receivedRefund.reasonLackGoods')
          this.refundDescription = this.$t('payRefund.description2')
          this.refundAmountLabel = this.$t('receivedRefund.refundedDeposit30')
          return
        }

        if(this.status === '取消退订金-未去退款') {
          let timeOrderGoodsCancel = this.$t('payRefund.timeOrderGoodsCancel') + this.bill.timeOrderGoodsCancel
          this.refundTime = timeDeposit30 + '; ' + timeOrderGoodsCancel
          this.refundReason = this.$t('receivedRefund.reasonCancelRefundDeposit')
          this.refundDescription = this.$t('payRefund.description1')
          this.refundAmountLabel = this.$t('receivedRefund.pendingRefundDeposit30')
          return
        }

        if(this.status === '取消退订金-已去退款') {
          let timeRefundDeposit30 = this.$t('payRefund.timeRefundDeposit30') + this.bill.timeRefundDeposit30
          this.refundTime = timeDeposit30 + '; ' + timeRefundDeposit30
          this.refundReason = this.$t('receivedRefund.reasonCancelRefundDeposit')
          this.refundDescription = this.$t('payRefund.description2')
          this.refundAmountLabel = this.$t('receivedRefund.refundedDeposit30')
          return
        }

        let timePayDeposit70AndTax = this.$t('payRefund.timePayDeposit70AndTax')

        if(this.status === '取消退全款-未去退款，DLQD/FXQD没有跨境税金') {
          let timeOrderGoodsCancel = this.$t('payRefund.timeOrderGoodsCancel') + this.bill.timeOrderGoodsCancel
          this.refundTime = timePayDeposit70AndTax + '; ' + timeOrderGoodsCancel
          this.refundReason = this.$t('receivedRefund.reasonCancelRefundDeposit')
          this.refundDescription = this.$t('payRefund.description1')
          this.refundAmountLabel = this.$t('receivedRefund.pendingRefundAllAndTax')
          return
        }

        if(this.status === '取消退全款-已去退款，DLQD/FXQD没有跨境税金') {
          let timeRefundAll = this.$t('payRefund.timeRefundAll') + this.bill.timeRefundAll
          this.refundTime = timePayDeposit70AndTax + '; ' + timeRefundAll
          this.refundReason = this.$t('receivedRefund.reasonCancelRefundDeposit')
          this.refundDescription = this.$t('payRefund.description2')
          this.refundAmountLabel = this.$t('receivedRefund.refundedAllAndTax')
          return
        }

        if(this.status === '中断订货') {
          this.refundReason = this.$t('receivedRefund.reasonCancelRefundDeposit')
          this.refundAmountLabel = this.$t('receivedRefund.receivedDeposit30')
          return
        }
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
