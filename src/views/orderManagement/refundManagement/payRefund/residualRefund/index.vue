<template>
  <div class="app-container">
    <div class="mainContent">
      <div class="filter-container theTopMsgBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">货单号:</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ 10000001 }}</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">渠道号:</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ 198796 }}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">渠道名称</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ 'ASD总店' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">Address:</div>
          </el-col>
          <el-col :span="15">
            <div class="grid-content bg-purple">Guangzhou Panyu</div>
          </el-col>
          <el-col :span="2" align="center">
            <div class="grid-content bg-purple">City:</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">广州</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">Consignee's Name:</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">Tony Ma</div>
          </el-col>
          <el-col :span="2" align="center">
            <div class="grid-content bg-purple">Contact:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">0757-34345424</div>
          </el-col>
          <el-col :span="2" align="center">
            <div class="grid-content bg-purple">Tel:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">13734234234</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">收款SWFIT Code</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">453566787469</div>
          </el-col>
          <el-col :span="2" align="center">
            <div class="grid-content bg-purple">收款银行:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">中国农业银行</div>
          </el-col>
          <el-col :span="2" align="center">
            <div class="grid-content bg-purple">银行地址</div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">广州市天河区石牌桥</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">汇款SWFIT Code</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">413266787469</div>
          </el-col>
          <el-col :span="2" align="center">
            <div class="grid-content bg-purple">汇款银行:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">中国工商银行</div>
          </el-col>
          <el-col :span="2" align="center">
            <div class="grid-content bg-purple">银行地址</div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">广州市番禺区市桥</div>
          </el-col>
        </el-row>
      </div>

      <div style="display: flex">
        <div class="brand-col">
          <div class="col-head border-bottom" style="border-left: 2px solid #d5d5d5">商品品牌</div>
          <div class="col-content"
               :style="{height: tableHeight-37+'px', borderLeft: '2px solid #d5d5d5', borderBottom: '2px solid #d5d5d5'}">
            <span>AESOP</span></div>
        </div>
        <div class="twoTable-wrap" style="padding-right: 20px">
          <!--订货表格-->
          <el-table key='productList' :data="order.orderSubs || []"
                    border fit size="mini"
                    style="width: 100%;border:none;border-left: 1px solid #d5d5d5;border-right: 1px solid #d5d5d5"
                    class="orderTable" ref="orderTable"
                    :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',height: '36px'}">
            <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
              <template slot-scope="scope">
                <span>{{scope.row.goodsNo}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.goodsChineseName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="90" :label="$t('product.productSpecification')"
                             prop="specificationChinese" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.specificationChinese}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="220" class-name="units-wrap"
                             :label="$t('order.packageSpecification')" prop="packingSpecification"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>{{scope.row.packingSpecification || 0}}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>支/箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
              <template slot-scope="scope">
                <span>{{scope.row.supplyCurrencySymbol}}{{scope.row.supplyPrice.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" class-name="units-wrap" :label="$t('order.orderQuantity')">
              <template slot-scope="scope">
                <span></span>
                <el-row>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>{{scope.row.orderQuantity}}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>

            <el-table-column align="center" width="140" :label="$t('price.startDiscount')">
              <template slot-scope="scope">
                <span></span>
                <span>{{scope.row.startDiscount}}%</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="140" :label="$t('price.orderDiscount')">
              <template slot-scope="scope">
                <span>{{scope.row.orderDiscount}}%</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="140" :label="$t('price.orderUnitPrice')">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="140" :label="$t('order.orderAmount')">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification * scope.row.orderQuantity).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('order.thirtyPercentDeposit')" width="130">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification * scope.row.orderQuantity * 0.3).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.residualPayment')" align="center"
                             width="170">
              <template slot-scope="scope">
                <span>￥ {{ (scope.row.supplyPrice * scope.row.packingSpecification * scope.row.orderQuantity * 0.7).toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="跨境税金" align="center" width="170" v-if="currentRow.channelClassify===2">
              <template slot-scope="scope">
                <span>￥ {{ (scope.row.supplyPrice * 0.119).toFixed(2) }}</span>
              </template>
            </el-table-column>
          </el-table>
          </el-table>
          <!--补货表格-->
          <el-table v-if="hasReplenishment" key='replenishment' :data="order.replenishmentList" border fit
                    size="mini"
                    style="width: 100%;border: 1px solid #d5d5d5;border-top:none;"
                    class="orderTable" ref="replenishmentTable"
                    :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
            <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
              <template slot-scope="scope">
                <span>{{scope.row.goodsNo}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName">
              <template slot-scope="scope">
                <span>{{ scope.row.goodsChineseName }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="90" :label="$t('product.productSpecification')"
                             prop="specificationChinese">
              <template slot-scope="scope">
                <span>{{ scope.row.specificationChinese }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" :label="$t('order.replenishmentSpecification')">
              <el-table-column align="center" width="120" class-name="units-wrap"
                               :label="$t('order.replenishmentQuantity')">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.replenishmentQuantity}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>瓶</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" width="100" label="装箱规格">
                <template slot-scope="scope">
                  <span>{{scope.row.packingUnit}} 瓶/箱</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
              <template slot-scope="scope">
                <span>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" class-name="units-wrap"
                             :label="$t('order.replenishmentQuantity')">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span style="color:gray">{{scope.row.replenishmentQuantity}}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" width="140" :label="$t('price.startDiscount')">
              <template slot-scope="scope">
                <span>{{scope.row.startDiscount}}%</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="140" :label="$t('price.orderDiscount')">
              <template slot-scope="scope">
                <span>{{scope.row.orderDiscount}}%</span>
              </template>
            </el-table-column>
            <el-table-column width="140" align="center" :label="$t('price.orderUnitPrice')">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.packingUnit).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.3).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
              <template slot-scope="scope">
                <span>￥ {{ (scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.7).toFixed(2) }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table :key=2 :data="totalTableData" border fit
                    size="mini"
                    style="width: 100%;border: 1px solid #d5d5d5;border-top:none;"
                    :span-method="arraySpanMethod"
                    class="orderTable" ref="totalTable"
                    :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0, display: 'none'}">
            <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
              <template slot-scope="scope">
                  <span v-if="scope.$index==totalTableData.length-3"
                        class="text-total">{{ '合计：' }}</span>
                <span v-else-if="scope.$index==totalTableData.length-2" class="text-muted">{{ currentRow.refundSituation[currentRow.isAlreadyRefund][currentRow.refundReason].refundTimes }}</span>
                <span v-else-if="scope.$index==totalTableData.length-1"
                      style="color: rgb(66, 66, 66);font-weight: 700;">{{ '原因：' }}</span>
                <span v-else>{{scope.row.goodsNo}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName">
              <template slot-scope="scope">
                  <span v-if="scope.$index==totalTableData.length-3"
                        class="text-total">￥ {{ (deposit70Amount+deposit30Amount).toFixed(2) }}</span>
                <span v-else-if="scope.$index==totalTableData.length-2" class="text-total">{{ currentRow.refundSituation[currentRow.isAlreadyRefund][currentRow.refundReason].refundAmountTitle }}</span>
                <span v-else-if="scope.$index==totalTableData.length-1">{{ currentRow.refundSituation[currentRow.isAlreadyRefund][currentRow.refundReason].refundReasonText }}</span>
                <span v-else>{{ scope.row.goodsChineseName }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="90" :label="$t('product.productSpecification')"
                             prop="specificationChinese">
              <template slot-scope="scope">
                <span v-if="scope.$index==totalTableData.length-1"
                      style="color: rgb(66, 66, 66);font-weight: 700;">退款说明：</span>
                <span v-else>{{ scope.row.specificationChinese }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" :label="$t('order.replenishmentSpecification')">
              <el-table-column align="center" width="120" class-name="units-wrap"
                               :label="$t('order.replenishmentQuantity')">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.replenishmentQuantity}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>瓶</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" width="100" label="装箱规格">
                <template slot-scope="scope">
                  <span>{{scope.row.packingUnit}} 瓶/箱</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
              <template slot-scope="scope">
                <span>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" class-name="units-wrap"
                             :label="$t('order.replenishmentQuantity')">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span style="color:gray">{{scope.row.replenishmentQuantity}}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" width="140" :label="$t('price.startDiscount')">
              <template slot-scope="scope">
                <span>{{scope.row.startDiscount}}%</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="140" :label="$t('price.orderDiscount')">
              <template slot-scope="scope">
                <span>{{scope.row.orderDiscount}}%</span>
              </template>
            </el-table-column>
            <el-table-column width="140" align="center" :label="$t('price.orderUnitPrice')">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.packingUnit).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.3).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
              <template slot-scope="scope">
                  <span v-if="scope.$index==totalTableData.length-2"
                        class="text-total">￥ {{ (deposit70Amount+deposit30Amount).toFixed(2) }}</span>
                <span v-else-if="scope.$index==totalTableData.length-1">{{ currentRow.refundSituation[currentRow.isAlreadyRefund][currentRow.refundReason].refundExplain }}</span>
                <span v-else>￥ {{ (scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.7).toFixed(2) }}</span>
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

  // import { requestShopCart, cartRemove, createOrder } from "@/api/goods";

  export default {
    components: {},
    props: {
      currentRow: {
        type: Object,
        default: function() {
          return {
            isAlreadyRefund: 0, //待退款0 或 已退款1
            refundReason: 0, // 退全款只有一个原因：渠道商认为待备货时间太长所以取消订货
            refundSituation: {
              // 待退款
              0: {
                // 渠道商认为待备货时间太长所以取消订货
                0: {
                  refundTimes: '支付70%余款时间：2018-4-18 16：22：56；取消订货时间：2018-4-18 16：22：57',
                  refundAmountTitle: '待退货款：',
                  refundReasonText: '等待发货时间过长，渠道商取消订货。',
                  refundExplain: '退款将退回到您的帐户，可在完成退款后前往“我的帐户-钱包管理-交易记录”里查看明细。',
                },
              },

              // 已退款
              1: {
                // 渠道商认为待备货时间太长所以取消订货
                0: {
                  refundTimes: '支付70%余款：2018-4-18 16：22：56；退回全款时间：2018-4-18 16：22：57',
                  refundAmountTitle: '已退货款：',
                  refundReasonText: '等待发货时间过长，渠道商取消订货。',
                  refundExplain: '退款已退回到您的帐户，可前往“我的帐户-钱包管理-交易记录”里查看明细。',
                },
              }
            }
          }
        }
      }
    },
    computed: {
      deposit30Amount() {
        let itemOrder_amount = 0
        this.order.orderSubs.forEach((subsItem, index) => {
          itemOrder_amount += subsItem.orderQuantity * subsItem.packingSpecification * subsItem.supplyPrice * 0.3
        })
        let itemReplenish_amount = 0
//        this.order.replenishmentList.forEach((replenishItem, index, arr) => {
//          if (index >= arr.length - 3) return false
//          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.3
//        })
        return itemOrder_amount + itemReplenish_amount
      },
      deposit70Amount() {
        let itemOrder_amount = 0
        this.order.orderSubs.forEach((subsItem, index, arr) => {
          itemOrder_amount += subsItem.orderQuantity * subsItem.packingSpecification * subsItem.supplyPrice * 0.7
        })
        let itemReplenish_amount = 0
//        this.order.replenishmentList.forEach((replenishItem, index, arr) => {
//          if (index >= arr.length - 3) return false
//          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.7
//        })
        return itemOrder_amount + itemReplenish_amount
      },
      crossCountryAmount() {
        let itemOrder_amount = 0
        this.order.orderSubs.forEach((subsItem, index) => {
          itemOrder_amount += subsItem.supplyPrice * 0.119
        })
        let itemReplenish_amount = 0
//        this.order.replenishmentList.forEach((replenishItem, index) => {
//          itemReplenish_amount += replenishItem.supplyPrice * 0.119
//        })
        return itemOrder_amount + itemReplenish_amount
      },
      orderAmountSoFar() {
        let itemOrder_amount = 0
        this.orderQuantityInput.forEach((subsItem, index) => {
          if (!subsItem) return false
          itemOrder_amount += Number(subsItem)
        })
        return itemOrder_amount
      }
    },
    data() {
      return {
        list: [],
        hasReplenishment: false,
        replenishmentList: [],
        totalTableData: [
          {
            startDiscount: 70,
            orderDiscount: 68,
            goodsNo: 7534645,
            goodsChineseName: '美白保湿',
            specificationChinese: '200 ml',
            packingUnit: 12,
            supplyCurrencySymbol: '￥ ',
            supplyPrice: 40,
            unitsReplenishment: 10,
            individualReplenishment: 0,
            iProdQuantity_inventory: 15,
            // unitsQuantities: [24, 28, 36, 40, 48],
            unitsQuantities: [
              [ // 一个数组为一行，一行最多放三个数据
                { unit: 24, inventory: 200 },
                { unit: 28, inventory: 210 },
                { unit: 36, inventory: 220 }
              ],
              [ // 一个数组为一行，一行最多放三个数据
                { unit: 40, inventory: 230 },
                { unit: 48, inventory: 240 }
              ]
            ],
            isAddedRow: false,
            replenishmentQuantity: 36,
            replenishmentQuantity_input: 0,
            shipmentQuantity: 1,
            cartonNo: '043524',
            packingSpecification: 24
          },
          {
            startDiscount: 70,
            orderDiscount: 68,
            goodsNo: 7534645,
            goodsChineseName: '美白保湿',
            specificationChinese: '200 ml',
            packingUnit: 12,
            supplyCurrencySymbol: '￥ ',
            supplyPrice: 40,
            unitsReplenishment: 10,
            individualReplenishment: 0,
            iProdQuantity_inventory: 15,
            // unitsQuantities: [24, 28, 36, 40, 48],
            unitsQuantities: [
              [ // 一个数组为一行，一行最多放三个数据
                { unit: 24, inventory: 200 },
                { unit: 28, inventory: 210 },
                { unit: 36, inventory: 220 }
              ],
              [ // 一个数组为一行，一行最多放三个数据
                { unit: 40, inventory: 230 },
                { unit: 48, inventory: 240 }
              ]
            ],
            isAddedRow: false,
            replenishmentQuantity: 36,
            replenishmentQuantity_input: 0,
            shipmentQuantity: 1,
            cartonNo: '043524',
            packingSpecification: 24
          },
          {
            startDiscount: 70,
            orderDiscount: 68,
            goodsNo: 7534645,
            goodsChineseName: '美白保湿',
            specificationChinese: '200 ml',
            packingUnit: 12,
            supplyCurrencySymbol: '￥ ',
            supplyPrice: 40,
            unitsReplenishment: 10,
            individualReplenishment: 0,
            iProdQuantity_inventory: 15,
            // unitsQuantities: [24, 28, 36, 40, 48],
            unitsQuantities: [
              [ // 一个数组为一行，一行最多放三个数据
                { unit: 24, inventory: 200 },
                { unit: 28, inventory: 210 },
                { unit: 36, inventory: 220 }
              ],
              [ // 一个数组为一行，一行最多放三个数据
                { unit: 40, inventory: 230 },
                { unit: 48, inventory: 240 }
              ]
            ],
            isAddedRow: false,
            replenishmentQuantity: 36,
            replenishmentQuantity_input: 0,
            shipmentQuantity: 1,
            cartonNo: '043524',
            packingSpecification: 24
          }
        ],
        listLoading: false,
        cartListSelect: [],
        replenishmentListSelect: [],
        addAddressShow: false,
        addTransferAccountShow: false,
        payWay: '1',
        orderQuantityInput: [],
        channelClassifyMap: {
          1: '独立渠道',
//        1: 'DLQD',
          2: '代发渠道',
//        2: 'DFQD',
          3: '分销渠道',
//        3: 'FXQD',
          4: '分销子渠道'
//        4: 'FXZQD'
        },
        completeStockTime: '2018-11-11 14:22:56',
        order: {
          orderNo: 10005,
          refundOrderStatus: 40,
          r_bankAccount: 3674506939865543,
          r_bankName: 'Bank of China',
          r_bankAddress: 'Guangzhou Panyu District',
          paymentAmount: '￥ 3,763.70',
          b_bankAccount: 1456884739665543,
          b_bankName: 'China Construction Bank',
          b_bankAddress: 'Guangzhou Panyu District',
          createTime: new Date(),
          boxCode: 5555,
          paymentStatus: 10,
          description: 'Lancome (LANCOME) air cushion lip oil',
          channelClassify: 1, // retailer categories
          channelNo: 20005, // retailer no
          orderStatus: 50,
          orderMethod: 20,
          consigneeAddress: '23 Jianguomen Avenue, Chaoyang District',
          city: 'Beijing',
          consigneeName: 'Paul Lee',
          consigneeMobile: 13456789454,
          tel: 95338,
          brandEnglishName: 'LANCOM',
          proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg', // 补款并单表格
          orderSubs: [
            {
              startDiscount: 70,
              orderDiscount: 68,
              goodsNo: 2564645,
              goodsChineseName: '精华保湿',
              specificationChinese: '100 ml',
              packingSpecification: 15,
              orderQuantity: 5,
              orderQuantity_input: 0,
              inventoryQuantity: 200,
              waitingForStock: 0,
              outOfStock: 0,
              supplyCurrencySymbol: '￥ ',
              supplyPrice: 20,
              orderGoodsNum: 10,
              unitPrice: '',
              totalChannelAmount: '',
              shipmentQuantity: 4,
              cartonNo: '046524'
            },
            {
              startDiscount: 70,
              orderDiscount: 68,
              goodsNo: 8964645,
              goodsChineseName: '保湿润肤',
              specificationChinese: '100 ml',
              packingSpecification: 10,
              orderQuantity: 5,
              orderQuantity_input: 0,
              inventoryQuantity: 10,
              waitingForStock: 0,
              outOfStock: 0,
              supplyCurrencySymbol: '￥ ',
              supplyPrice: 30,
              orderGoodsNum: 20,
              unitPrice: '',
              totalChannelAmount: '',
              shipmentQuantity: 4,
              cartonNo: '048922'
            },
            {
              startDiscount: 70,
              orderDiscount: 68,
              goodsNo: 8964645,
              goodsChineseName: '美白眼霜',
              specificationChinese: '100 ml',
              packingSpecification: 10,
              orderQuantity: 5,
              orderQuantity_input: 0,
              inventoryQuantity: 10,
              waitingForStock: 0,
              outOfStock: 0,
              supplyCurrencySymbol: '￥ ',
              supplyPrice: 30,
              orderGoodsNum: 20,
              unitPrice: '',
              totalChannelAmount: '',
              shipmentQuantity: 4,
              cartonNo: '048922'
            }
          ],
          replenishmentList: [
            {
              startDiscount: 70,
              orderDiscount: 68,
              goodsNo: 7534645,
              goodsChineseName: '美白保湿',
              specificationChinese: '200 ml',
              packingUnit: 12,
              supplyCurrencySymbol: '￥ ',
              supplyPrice: 40,
              unitsReplenishment: 10,
              individualReplenishment: 0,
              iProdQuantity_inventory: 15,
              // unitsQuantities: [24, 28, 36, 40, 48],
              unitsQuantities: [
                [ // 一个数组为一行，一行最多放三个数据
                  { unit: 24, inventory: 200 },
                  { unit: 28, inventory: 210 },
                  { unit: 36, inventory: 220 }
                ],
                [ // 一个数组为一行，一行最多放三个数据
                  { unit: 40, inventory: 230 },
                  { unit: 48, inventory: 240 }
                ]
              ],
              isAddedRow: false,
              replenishmentQuantity: 36,
              replenishmentQuantity_input: 0,
              shipmentQuantity: 1,
              cartonNo: '043524',
              packingSpecification: 24
            }
          ],
          shipmentStatus: 50,
          refundType: 100,
          refundAmount: 274,
          compensationType: 10,
          compensation: 240,
          compensationStatus: 10,
          mergePaymentNo: 857938502482
        },
        isCancelOrder: false,
        cancelOrderVisible: false,
        cancelOrderSubmitVisible: false,
        payWindowVisible: false,
        accountResidual: 100,
        deposit30: 2232,
        completePaymentVisible: false,
        rechargeWindowVisible: false,
        rechargeAmount: 0,
        rechargeSuccessVisible: false,
        rechargeFailVisible: false,
        tableHeight: 0,
        rowLength: 0
      }
    },
    methods: {
      handleCartListSelect(val) {
        this.cartListSelect = val
      },
      handleReplenishmentListSelect(val) {

      },
      addAddress() {
        this.addAddressShow = true;
      },

      handleSubmit() {
        let param = {}
      },
      getList() {
        // requestShopCart().then(res => {
        //   this.list = res.data
        // })
      },
      removeAction(cartId, index) {
        // cartRemove(cartId).then(res => {
        //   if (res.errorCode == 0) {
        //     this.list.splice(index, 1)
        //   }
        // })
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.totalTableData.length - 3) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 11
            }
          } else if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
        if (rowIndex === this.totalTableData.length - 2) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 7
            }
          } else if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 4
            }
          } else if (columnIndex === 12) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
        if (rowIndex === this.totalTableData.length - 1) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 3
            }
          } else if (columnIndex === 2) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else if (columnIndex === 12) {
            return {
              rowspan: 1,
              colspan: 8
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      cancelOrderProcess() {
        this.cancelOrderVisible = true
      },
      handleConfirm() {
        this.isCancelOrder = true
        this.cancelOrderVisible = false
        this.cancelOrderSubmitVisible = true
      },
      handlePaymentConfirm() {
        this.completePaymentVisible = true
        this.payWindowVisible = false
      },
      goRecharge() {
        this.rechargeWindowVisible = true
      },
      handleRechargeConfirm() {
        this.accountResidual += this.rechargeAmount
        this.rechargeSuccessVisible = true
        this.rechargeWindowVisible = false
      },
      handleRechargeFailConfirm() {
        this.accountResidual += this.rechargeAmount
        this.rechargeFailVisible = true
        this.rechargeWindowVisible = false
      },
      stayInGoPayDeposit() {
        this.rechargeSuccessVisible = false
        this.payWindowVisible = true
      },
      rechargeAgain() {
        this.rechargeAmount = 0
        this.deposit30 = 2232
        this.accountResidual = 100
        this.rechargeFailVisible = true
        this.rechargeWindowVisible = true
      },
      goPayDeposit() {
        this.payWindowVisible = true
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      this.$nextTick(() => {

        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'] && this.$refs['replenishmentTable'].$el.offsetHeight || 0
        this.tableHeight += this.$refs['totalTable'].$el.offsetHeight

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth + window.document.getElementsByClassName('brand-col')[0].offsetWidth

        this.$refs['totalTable'].$el.children[2].children[0].children[1].children[this.totalTableData.length - 3].cells[0].style.textAlign = 'right'
        this.$refs['totalTable'].$el.children[2].children[0].children[1].children[this.totalTableData.length - 2].cells[0].style.textAlign = 'left'
        this.$refs['totalTable'].$el.children[2].children[0].children[1].children[this.totalTableData.length - 2].cells[1].style.textAlign = 'right'
        this.$refs['totalTable'].$el.children[2].children[0].children[1].children[this.totalTableData.length - 1].cells[1].style.textAlign = 'left'
        this.$refs['totalTable'].$el.children[2].children[0].children[1].children[this.totalTableData.length - 1].cells[3].style.textAlign = 'left'

        this.$refs['totalTable'].$el.children[2].children[0].children[1].children[this.totalTableData.length - 1].cells[0].style.backgroundColor = 'rgb(223, 242, 252)'
        this.$refs['totalTable'].$el.children[2].children[0].children[1].children[this.totalTableData.length - 1].cells[2].style.backgroundColor = 'rgb(223, 242, 252)'
      })
    }
  }
</script>

<style scoped>

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

  .theTopMsgBorder {
    border: solid #d5d5d5 2px;

  &
  .el-row {
    border-bottom: solid #d5d5d5 1px;
    margin-bottom: 0;

  &
  .el-col:nth-child(even) {
    padding-left: 1em;
  }

  }
  }
  .units-wrap .el-col {
    border: none !important;
    background-color: transparent;
    font-weight: normal;
  }

  .units-wrap .el-input--medium .el-input__inner {
    height: 24px;
    line-height: 24px;
    max-width: 40px;
  }
</style>
