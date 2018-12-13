<template>
  <div class="app-container">
    <div class="mainContent">
      <div class="filter-container theTopMsgBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">Order No. :</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple"><span class="link-type" @click="viewWaitStock(currentRow)">{{ currentRow.orderNo }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">retailer No. :</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ 5684635 }}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">Transportation:</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">By Sea</div>
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

      </div>

      <div style="display: flex">
        <div class="brand-col">
          <div class="col-head border-bottom" style="border-left: 2px solid #d5d5d5">Brand</div>
          <div class="col-content"
               :style="{height: tableHeight-37+'px', borderLeft: '2px solid #d5d5d5', borderBottom: '2px solid #d5d5d5'}">
            <span>AESOP</span></div>
        </div>
        <div class="twoTable-wrap" style="padding-right: 20px">
          <!--订货表格-->
          <div class="filter-container" style="padding-bottom: 0">
            <el-table key='productList' :data="order.orderSubs || []"
                      border fit size="mini"
                      style="width: 100%;border:none;border-left: 1px solid #d5d5d5;border-right: 1px solid #d5d5d5"
                      class="orderTable" ref="orderTable"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',height: '36px'}">
              <el-table-column align="center" width="85" label="Code" prop="goodsNo">
                <template slot-scope="scope">
                  <span>{{scope.row.goodsNo}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" label="Description" prop="goodsChineseName"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.goodsChineseName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="90" label="Size"
                               prop="specificationChinese" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.specificationChinese}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="220" class-name="units-wrap"
                               label="Selling Unit" prop="packingSpecification"
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
              <el-table-column align="center" width="90" label="Retail Price">
                <template slot-scope="scope">
                  <span>{{scope.row.supplyCurrencySymbol}}{{scope.row.supplyPrice.toFixed(2)}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" width="120" class-name="units-wrap" label="Order  Quantity">
                <template slot-scope="scope">
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

              <el-table-column align="center" width="140" label="Unit Purchase price">
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification).toFixed(2)}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" width="140" label="Total Purchase Price">
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification * scope.row.orderQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="30% Deposit" width="130">
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification * scope.row.orderQuantity * 0.3).toFixed(2)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--补货表格-->
          <div class="filter-container">
            <el-table key='replenishment' :data="order.replenishmentList" border fit
                      size="mini"
                      style="width: 100%;border: 1px solid #d5d5d5;border-top:none;"
                      class="orderTable" ref="replenishmentTable"
                      :span-method="arraySpanMethod_replenishment"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
              <el-table-column align="center" width="85" label="Code" prop="goodsNo">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-1"
                        style="color: rgb(66, 66, 66);font-weight: 700;">{{ 'Refund Reason' }}</span>
                  <span v-else>{{ scope.row.goodsNo }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" width="130" label="Description" prop="goodsChineseName">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-1">{{ currentRow.refundSituation[currentRow.isAlreadyRefund][currentRow.refundReason].refundReasonText }}</span>
                  <span v-else>{{ scope.row.goodsChineseName }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" width="90" label="Size"
                               prop="specificationChinese" show-overflow-tooltip/>

              <el-table-column align="center" label="Replenishment Package">
                <el-table-column align="center" width="120" class-name="units-wrap"
                                 label="Replenishment Quantity">
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
                <el-table-column align="center" width="100" label="Packing Unit">
                  <template slot-scope="scope">
                    <span>{{scope.row.packingUnit}} 瓶/箱</span>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column align="center" width="90" label="Retail Price">
                <template slot-scope="scope">
                  <span>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" width="120" class-name="units-wrap"
                               label="Replenishment Quantity">
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

              <el-table-column width="140" align="center" label="Unit Purchase Price">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">{{ 'Received 30% Deposit：' }}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1" class="text-total">{{ currentRow.refundSituation[currentRow.isAlreadyRefund][currentRow.refundReason].refundAmountTitle }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.packingUnit).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column width="140" align="center" label="Total Purchase Price">
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" label="30% Deposit">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">￥ {{ deposit30Amount.toFixed(2) }}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1" class="text-total">￥ {{ deposit30Amount.toFixed(2) }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.3).toFixed(2)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>

      </div>

    </div>

    <el-dialog :visible.sync="cancelOrderVisible" width="30%" append-to-body :show-close="false">
      <p style="text-align: center">确认取消订货？</p>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="cancelOrderVisible=false">暂不</el-button>
        <el-button type="primary" @click="handleConfirm()">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="cancelOrderSubmitVisible" width="30%" append-to-body :show-close="false">
      <p style="text-align: center">该次订货已被取消，可在“停止订货”状态中查看详情。</p>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="cancelOrderSubmitVisible=false">知道了</el-button>
      </div>
    </el-dialog>
    <!--点击去付订金-->
    <el-dialog :visible.sync="payWindowVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">货单号: <span>{{currentRow.orderNo}}</span></div>
      <div style="text-align: center;">账户余额: ￥{{accountResidual.toFixed(2)}}</div>
      <div style="text-align: center;">支付30%订金: ￥{{deposit30.toFixed(2)}}</div>
      <!--<div style="text-align: center" class="text-muted" v-if="accountResidual<deposit30">提醒：帐户余额不足扣减 ，请先充值。</div>-->
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="payWindowVisible=false">暂不</el-button>
        <el-button type="primary" @click="handlePaymentConfirm()">确认支付</el-button>
        <!--<el-button type="primary" v-if="accountResidual>=deposit30" @click="handlePaymentConfirm()">确认支付</el-button>-->
        <!--<el-button type="primary" v-else @click="goRecharge()">去充值</el-button>-->
      </div>
    </el-dialog>
    <el-dialog :visible.sync="completePaymentVisible" width="36%" append-to-body :show-close="false">
      <div style="text-align: center">货单号 <span>{{currentRow.orderNo}}</span> 已完成订金支付。<br>当前帐户余额 ￥ <span>{{(accountResidual-deposit30).toFixed(2)}}</span><br>可在待备货状态项下『查看货单』。
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="completePaymentVisible=false">知道了</el-button>
      </div>
    </el-dialog>


    <!--充值环节-->
    <el-dialog :visible.sync="rechargeWindowVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center;">账户余额: ￥ {{accountResidual.toFixed(2)}}</div>
      <div style="text-align: center;">充值金额:<span
        style="color: red">请充入不少于 ￥ {{(deposit30-accountResidual).toFixed(2)}}</span>
        <el-input v-model.number.lazy="rechargeAmount"></el-input>
      </div>
      <div style="text-align: center" class="text-danger">温馨提示：充值前请确保已绑定的银行卡有足够金额进行充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeWindowVisible=false">暂不</el-button>
        <el-button type="primary" @click="handleRechargeConfirm()">确认充值</el-button>
        <el-button type="primary" @click="handleRechargeFailConfirm()">确认充值(失败)</el-button>
      </div>
    </el-dialog>
    <!--充值成功-->
    <el-dialog :visible.sync="rechargeSuccessVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">已完成充值，当前帐户余额：¥ <span>{{accountResidual.toFixed(2)}}</span>，是否继续完成之前的订金支付？</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeSuccessVisible=false;payWindowVisible=false">否</el-button>
        <el-button type="primary" @click="stayInGoPayDeposit()">是</el-button>
      </div>
    </el-dialog>
    <!--充值失败-->
    <el-dialog :visible.sync="rechargeFailVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">充值金额: ￥ <span>{{Number(rechargeAmount).toFixed(2)}}</span><span
        style="color: red">未完成充值！</span></div>
      <div style="text-align: center" class="text-muted">说明：由于帐户绑定的银行卡余额不足，无法完成此次充值。请先确认银行卡金额充足再充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeFailVisible=false;payWindowVisible=false">暂不</el-button>
        <el-button type="primary" @click="rechargeAgain()">再去充值</el-button>
      </div>
    </el-dialog>
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
            isAlreadyRefund: 0, //待退款 或 已退款
            refundReason: 0, // 退款产生的三种原因之一
            refundSituation: {
              // 待退款
              0:{
                // 品牌商由于缺货而取消订单
                0: {
                  refundReasonText: 'No longer produce，brand owner cancel the reservation.',
                  refundAmountTitle: 'Pending Refund of 30% Deposit：'
                },
                // 渠道商认为待备货时间太长所以取消订货
                1: {
                  refundReasonText: 'Retailer has waited too long for stock and cancelled the order.',
                  refundAmountTitle: 'Pending Refund of 30% Deposit：'
                },
                // 渠道商超过期限未付余款,订单被强制取消,只退还80%订金
                2: {
                  refundReasonText: 'Retailer failed to pay residual payment, the order is terminated.',
                  refundAmountTitle: 'Total Pending Refund of 80% of the Deposit：'
                },
              },

              // 已退款
              1:{
                // 品牌商由于缺货而取消订单
                0: {
                  refundReasonText: 'No longer produce，brand owner cancel the reservation.',
                  refundAmountTitle: 'Refunded 30% Deposit：'
                },
                // 渠道商认为待备货时间太长所以取消订货
                1: {
                  refundReasonText: 'Retailer has waited too long for stock and cancelled the order.',
                  refundAmountTitle: 'Refunded 30% Deposit：'
                },
                // 渠道商超过期限未付余款,订单被强制取消,只退还80%订金
                2: {
                  refundReasonText: 'Retailer failed to pay residual payment, the order is terminated.',
                  refundAmountTitle: 'Total Refunded 80% of the Deposit：'
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
        this.order.replenishmentList.forEach((replenishItem, index, arr) => {
          if (arr.length - 1 === index) return false
          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.3
        })
        const deposit30_amount = itemOrder_amount + itemReplenish_amount
        return deposit30_amount
      },
    },
    data() {
      return {
        list: [],
        replenishmentList: [],
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
        accountResidual: 10000,
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
      arraySpanMethod_replenishment({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.order.replenishmentList.length - 2) {
          if (columnIndex === 7) {
            return {
              rowspan: 1,
              colspan: 9
            }
          } else if (columnIndex === 9) {
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
        if (rowIndex === this.order.replenishmentList.length - 1) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 5
            }
          } else if (columnIndex === 7) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else if (columnIndex === 9) {
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
      },
      viewWaitStock(row) {
//        this.currentRow = row
//        this.waitStockVisible = true
      }
    },
    created() {
      this.getList()
    },
    mounted() {

      this.order.replenishmentList.push({
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
      })
      this.order.replenishmentList.push({
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
      })

      window.setTimeout(() => {
//        this.$refs['sumTable'].$el.children[3].children['0'].children[1].children['0'].cells[3].children['0'].innerHTML = `<div style="display: flex;justify-content: flex-end"><span>合计:</span></div>`

        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'].$el.offsetHeight

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth + window.document.getElementsByClassName('brand-col')[0].offsetWidth

        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 2].cells[0].style.textAlign = 'right'

        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[2].style.textAlign = 'right'

        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[0].style.backgroundColor = 'rgb(223, 242, 252)'

        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[1].style.textAlign = 'left'

      }, 100)

      // 把总计值传递出去给并单界面使用
      this.$emit('itsTotalRefund', this.deposit30Amount)

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
