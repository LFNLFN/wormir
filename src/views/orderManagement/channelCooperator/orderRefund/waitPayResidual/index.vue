<template>
  <div class="app-container">
    <div class="mainContent">
      <!--并单编号那一行-->
      <div class="wrap1" style="border-bottom: 1px solid #D5D5D5">
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
              <div>Order No.</div>
            </template>
          </el-table-column>
          <el-table-column align="left" label="" prop>
            <template slot-scope="scope">
              <div>{{currentRow.orderNo}}</div>
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
      <div class="wrap3">
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
              <div class="text-total">{{ currentRow.refundFront }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">Order No.:</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ orderDetail.orderNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">Retailer No.</div>
          </el-col>
          <el-col :span="15">
            <div class="grid-content bg-purple">{{ orderDetail.channelNo }}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">Transportation</div>
          </el-col>
          <el-col :span="3">
            <div
              class="grid-content bg-purple"
            >{{ orderDetail.transportation | transportationFilter }}</div>
          </el-col>
        </el-row>
      </div>
      <div :style="{paddingBottom: 0, marginTop: '-2px'}" class="twoTable-wrap">
        <!--订货表格-->
        <div class="filter-container" style="padding-bottom: 0">
          <el-table
            key="productList"
            :data="orderDetail.goodList || []"
            border=""
            fit
            size="mini"
            style="width: 100%;border:none;border-left: 1px solid #d5d5d5;border-right: 1px solid #d5d5d5;border-bottom: 1px solid #d5d5d5"
            class="orderTable"
            ref="orderTable"
            :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',height: '36px'}"
          >
            <el-table-column align="center" width="85" label="Brand" prop="brandEnglishName"/>
            <el-table-column
              align="center"
              width="85"
              :label="$t('product.productNo')"
              prop="goodsNo"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.goodsNoForBrand }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="130"
              :label="$t('product.productName')"
              prop="goodsEnglishName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              width="90"
              :label="$t('product.productSpecification')"
              prop="specificationEnglish"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              width="220"
              class-name="units-wrap"
              :label="$t('order.packageSpecification')"
              prop="packingSpecification"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>{{scope.row.packingSpecification.replace(/[^0-9]/ig,"")}}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>pcs</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" width="90" label="Retail Price">
              <template slot-scope="scope">
                <span>{{ scope.row.symbol }} {{ scope.row.unitPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              class-name="units-wrap"
              :label="$t('order.orderQuantity')"
            >
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>{{scope.row.orderBoxNum}}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>units</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Unit Purchase price">
              <template slot-scope="scope">
                <span>{{ scope.row.symbol }} {{(scope.row.unitPrice * scope.row.finalDiscount/100).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Total Purchase Price">
              <template slot-scope="scope">
                <span>{{ scope.row.symbol }} {{scope.row.orderPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="200" label="30% Deposit" fixed="right">
              <template slot-scope="scope">
                <span>{{ scope.row.symbol }} {{scope.row.earnestAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="200" label="70% Residual Payment" fixed="right">
              <template slot-scope="scope">
                <span>{{ scope.row.symbol }} {{scope.row.earnestAmount}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            v-if="currentRow.refundTypeFront==2"
            key="productList1"
            :data="[{},{}]"
            border=""
            fit
            size="mini"
            :span-method="arraySpanMethod"
            style="width: 100%;border:none;border-left: 1px solid #d5d5d5;border-right: 1px solid #d5d5d5;border-bottom: 1px solid #d5d5d5"
            :show-header="false"
          >
            <el-table-column align="center" label="" width="120">
              <template slot-scope="scope">
                <span v-if="scope.$index==1">Refund Reason</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="">
              <template slot-scope="scope">
                <div v-if="scope.$index==1">
                  <span
                    v-if="currentRow.orderStatusFront==3"
                  >Retailer has waited too long for shipment and cancelled the order.</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="right" label="" width="250">
              <template slot-scope="scope">
                <div v-if="scope.$index==0"></div>
                <div v-if="scope.$index==1">
                  <span>Pending Refund of Full Payment：</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="right" width="200" label="">
              <template slot-scope="scope">
                <div v-if="scope.$index==0">Received 70％ Residual Payment：</div>
                <span v-if="scope.$index==1"></span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="200" label="">
              <template slot-scope="scope">
                <span v-if="scope.$index==0">{{ currentRow.total_surplus_amount }}</span>
                <span v-if="scope.$index==1">{{ currentRow.total_channel_amount }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { requestShopCart, cartRemove, createOrder } from "@/api/goods";
import request from "@/utils/request";
import "@/styles/address-table.scss";

export default {
  components: {},
  props: {
    currentRow: {
      type: Object
    }
  },
  data() {
    return {
      list: [],
      orderDetail: {}, // 存放订货表格数据
      haveReplenishment: false,
      replenishmentList: [
        {
          startDiscount: 70,
          orderDiscount: 68,
          goodsNo: 7534645,
          goodsChineseName: "美白保湿",
          specificationChinese: "200 ml",
          packingUnit: 12,
          supplyCurrencySymbol: "￥ ",
          supplyPrice: 40,
          unitsReplenishment: 10,
          individualReplenishment: 0,
          iProdQuantity_inventory: 15,
          // unitsQuantities: [24, 28, 36, 40, 48],
          unitsQuantities: [
            [
              // 一个数组为一行，一行最多放三个数据
              { unit: 24, inventory: 200 },
              { unit: 28, inventory: 210 },
              { unit: 36, inventory: 220 }
            ],
            [
              // 一个数组为一行，一行最多放三个数据
              { unit: 40, inventory: 230 },
              { unit: 48, inventory: 240 }
            ]
          ],
          isAddedRow: false,
          replenishmentQuantity: 36,
          replenishmentQuantity_input: 0,
          shipmentQuantity: 1,
          cartonNo: "043524",
          packingSpecification: 24
        }
      ],
      listLoading: false,
      payWay: "1",
      order: {
        replenishmentList: [
          {
            startDiscount: 70,
            orderDiscount: 68,
            goodsNo: 7534645,
            goodsChineseName: "美白保湿",
            specificationChinese: "200 ml",
            packingUnit: 12,
            supplyCurrencySymbol: "￥ ",
            supplyPrice: 40,
            unitsReplenishment: 10,
            individualReplenishment: 0,
            iProdQuantity_inventory: 15,
            // unitsQuantities: [24, 28, 36, 40, 48],
            unitsQuantities: [
              [
                // 一个数组为一行，一行最多放三个数据
                { unit: 24, inventory: 200 },
                { unit: 28, inventory: 210 },
                { unit: 36, inventory: 220 }
              ],
              [
                // 一个数组为一行，一行最多放三个数据
                { unit: 40, inventory: 230 },
                { unit: 48, inventory: 240 }
              ]
            ],
            isAddedRow: false,
            replenishmentQuantity: 36,
            replenishmentQuantity_input: 0,
            shipmentQuantity: 1,
            cartonNo: "043524",
            packingSpecification: 24
          }
        ]
      },
      symbol: null,
      wormirBankInfo: {},
      brandBankInfo: {}
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if (columnIndex == 3) {
          return {
            rowspan: 1,
            colspan: 4
          };
        } else if (columnIndex == 4) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (rowIndex == 1) {
        if (columnIndex < 3) {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
        if (columnIndex == 4) {
          return {
            rowspan: 1,
            colspan: 2,
          };
        }
        if (columnIndex == 3) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    getList() {
      request({
        url: "/order/orderDetail.do",
        method: "post",
        data: { orderNo: this.currentRow.orderNo }
      }).then(res => {
        if (res.errorCode == 0) {
          this.orderDetail = res.data;
          this.symbol = this.currentRow.symbol;
          this.orderDetail.goodList.forEach((e, i) => {
            e.unitPrice = e.priceArr[0];
          });
        }
      });
    },
    arraySpanMethod_replenishment({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == this.replenishmentList.length - 1) {
        if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 8
          };
        } else if (columnIndex == 8) {
          return {
            rowspan: 1,
            colspan: 4
          };
        } else if (columnIndex == 12) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    arraySpanMethod_replenishment1({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == this.replenishmentList.length - 1) {
        if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 7
          };
        } else if (columnIndex == 7) {
          return {
            rowspan: 1,
            colspan: 2
          };
        } else if (columnIndex == 9) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    cancelOrderProcess() {
      this.cancelOrderVisible = true;
    }
  },
  created() {
    this.getList();
    this.$request({
      url: "/order/mergeOrderBankInfo.do",
      method: "post",
      data: {
        brandNo: window.localStorage.relevanceNo
      }
    })
      .then(res => {
        if (res.errorCode == 0) {
          this.wormirBankInfo = res.data.wormirBankInfo;
          this.brandBankInfo = res.data.brandBankInfo;
        } else {
          this.$message.error("Request error");
        }
      })
      .catch(err => {
        this.$message.error("Request error");
      });
  }
};
</script>

<style scoped lang="scss">
.orderTable .el-col {
  border-right: none;
}
</style>
