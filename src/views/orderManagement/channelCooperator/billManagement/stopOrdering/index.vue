<template>
  <div class="app-container">
    <h2 :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">停止订货</h2>
    <div class="mainContent">
      <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">货单号:</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ orderDetail.orderNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">渠道号:</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ orderDetail.channelNo }}</div>
          </el-col>
        </el-row>

        <div v-if="orderDetail.propertyOfSale==1">
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">收货地址:</div>
            </el-col>
            <el-col :span="19">
              <div class="grid-content bg-purple">{{ orderDetail.address }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">收货方:</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">{{orderDetail.name}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">联系人:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.contact}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">联系电话:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.tel}}</div>
            </el-col>
          </el-row>
        </div>
        <div v-if="orderDetail.propertyOfSale==2">
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">Address:</div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple">{{ orderDetail.address}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">City:</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">{{orderDetail.city}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">Consignee's Name:</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">{{orderDetail.name}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">Contact:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.contact}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">Tel:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.tel}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="grid-content bg-purple">收款SWFIT Code</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{ orderDetail.wormirSwiftCode }}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">收款银行</div>
            </el-col>
            <el-col :span="4">
             <div class="grid-content bg-purple">{{ orderDetail.wormirBankName }}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">银行地址</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">{{ orderDetail.wormirBankAddress }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">汇款SWFIT Code</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{orderDetail.channelSwiftCode}}</div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">汇款银行</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.channelBankName}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">银行地址</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">{{orderDetail.channelBankAddress}}</div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div style="display: flex">
        <div class="twoTable-wrap" style="padding-right: 20px">
          <!--订货表格-->
          <div class="filter-container" style="padding-bottom: 0">
            <el-table
              key="productList"
              :data="orderDetail.goodList || []"
              border
              fit
              size="mini"
              style="width: 100%;border:none;border-left: 2px solid #d5d5d5;border-right: 1px solid #d5d5d5"
              class="orderTable"
              ref="orderTable"
              :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',height: '36px'}"
            >
              <el-table-column
                align="center"
                width="85"
                label="商品品牌"
                prop="brandName"
              />
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
                prop="goodsName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="center"
                width="90"
                :label="$t('product.productSpecification')"
                prop="specificationChinese"
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
                      <span>{{scope.row.packingSpecification.replace(/\d+/g, '')}}</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
                <template slot-scope="scope">
                  <span>￥{{scope.row.unitPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="120"
                class-name="units-wrap"
                :label="$t('order.orderQuantity')"
              >
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <!-- <el-input v-model="orderQuantityInput[scope.$index]" placeholder="0"></el-input> -->
                      <span>{{scope.row.orderBoxNum}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>箱</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>

              <el-table-column align="center" width="140" :label="$t('price.startDiscount')">
                <template slot-scope="scope">
                  <span>{{scope.row.initialDiscount}}%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" :label="$t('price.orderDiscount')">
                <template slot-scope="scope">
                  <span>{{scope.row.finalDiscount}}%</span>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                width="140"
                :label="$t('price.orderUnitPrice')"
              >
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.unitPrice * scope.row.finalDiscount/100).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="140"
                :label="$t('order.orderAmount')"
              >
                <template slot-scope="scope">
                  <span>￥ {{scope.row.orderPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :label="$t('order.thirtyPercentDeposit')"
                width="130"
              >
                <template slot-scope="scope">
                  <span>￥ {{scope.row.earnestAmount}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--补货表格-->
          <div class="filter-container">
            <el-table key='replenishment' :data="order.replenishmentList" border fit
                      size="mini"
                      style="width: 100%;border: 1px solid #d5d5d5;border-top:none;border-left-width: 2px;"
                      class="orderTable" ref="replenishmentTable"
                      :show-header="haveReplenishment"
                      :span-method="arraySpanMethod_replenishment"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
              <el-table-column
                align="center"
                width="85"
                label="商品品牌"
                prop="brandName"
              />
              <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
                <template slot-scope="scope">
                  <!--<span v-if="scope.$index==order.replenishmentList.length-1" class="text-muted"> 取消订货时间: {{ this.orderDetail.cancelOrderTime }}</span>-->
                  <el-popover
                    v-if="scope.$index==order.replenishmentList.length-1"
                    placement="right" title="" width="280" trigger="click"
                  >
                    <div>
                      <p>{{'提交订单时间：' + orderDetail.orderCreateTime}}</p>
                      <p>{{'取消订货时间：' + orderDetail.cancelOrderTime}}</p>
                    </div>
                    <el-button slot="reference" type="primary">操作时间记录</el-button>
                  </el-popover>

                  <span v-else-if="scope.$index===order.replenishmentList.length-2"></span>
                  <span v-else>{{ scope.row.goodsNo }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName"
                               show-overflow-tooltip/>
              <el-table-column align="center" width="90" :label="$t('product.productSpecification')"
                               prop="specificationChinese" show-overflow-tooltip/>
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
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">{{'30%订金合计：'}}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.packingUnit).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-1" class="text-danger">{{'已取消订货'}}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                <template slot-scope="scope">
                  <!--<span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">￥ {{ deposit30Amount.toFixed(2) }}</span>-->
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">￥ {{ currentRow.total_earnest_amount }}</span>
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

  </div>
</template>

<script>
  /* eslint-disable */

  import { requestShopCart, cartRemove, createOrder } from "@/api/goods";
  import request from "@/utils/request";

  export default {
    components: {},
    props: {
      currentRow: {
        type: Object,
        required: true
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
          if (index === arr.length-1) return false
          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.3
        })
        const deposit30_amount = itemOrder_amount + itemReplenish_amount
        return deposit30_amount
      },
    },
    data() {
      return {
        orderDetail: {}, // 存放订货表格数据
        list: [],
        replenishmentList: [],
        orderDetail: {}, // 存放订货表格数据
        haveReplenishment: false,
        listLoading: false,
        cartListSelect: [],
        replenishmentListSelect: [],
        addAddressShow: false,
        addTransferAccountShow: false,
        payWay: '1',
        orderQuantityInput: [],
        channelClassifyMap: {
          1: '独立渠道',
          3: '分销渠道',
          4: '分销子渠道'
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
        accountResidual: 100,
        deposit30: 2232,
        completePaymentVisible: false,
        rechargeWindowVisible: false,
        rechargeAmount: 0,
        rechargeSuccessVisible: false,
        rechargeFailVisible: false,
        tableHeight: 0,
        rowLength: 0,
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
        this.listLoading = true
        request({
          url: "/order/orderDetail.do",
          method: "post",
          data: { orderNo: this.currentRow.order_no }
        }).then(res => {
          if (res.errorCode == 0) {
            this.orderDetail = res.data;
            this.listLoading = false
          }
        })
      },
      removeAction(cartId, index) {
        cartRemove(cartId).then(res => {
          if (res.errorCode == 0) {
            this.list.splice(index, 1)
          }
        })
      },
      arraySpanMethod_replenishment({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.order.replenishmentList.length - 2) {
          if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 10
            }
          } else if (columnIndex === 10) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else if (columnIndex === 12) {
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
          if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 11
            }
          } else if (columnIndex === 11) {
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
      },
      cancelOrderProcess() {
        this.cancelOrderVisible = true
      },
      handleConfirm() {
        this.isCancelOrder = true
        this.cancelOrderVisible = false
        this.cancelOrderSubmitVisible = true
      },
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

      window.setTimeout(() => {
//        this.$refs['sumTable'].$el.children[3].children['0'].children[1].children['0'].cells[3].children['0'].innerHTML = `<div style="display: flex;justify-content: flex-end"><span>合计:</span></div>`

        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'].$el.offsetHeight

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth

        this.$refs['replenishmentTable'].$el.children[1].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[0].style.textAlign = 'left'
//        console.log(this.$refs['replenishmentTable'])
//        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 2].cells[1].style.textAlign = 'right'

      }, 100)
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

</style>
