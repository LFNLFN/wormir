<template>
  <div class="app-container">
    <div class="mainContent">
      <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">货单号:</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ currentRow.orderNo }}</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">渠道号:</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ currentRow.channelClassify }}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">渠道名称</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ channelClassifyMap[currentRow.channelClassify] }}</div>
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
        <div class="twoTable-wrap" style="padding-right: 20px">
          <!--订货表格-->
          <div class="filter-container" style="padding-bottom: 0">
            <el-table
              key="productList"
              :data="orderDetail.goodList || []"
              border
              fit
              size="mini"
              style="width: 100%;border:none;border-left: 1px solid #d5d5d5;border-right: 1px solid #d5d5d5"
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
                  <span>{{scope.row.goodsNo}}</span>
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
                prop="capacity"
                show-overflow-tooltip
              >
                <!-- <template slot-scope="scope">
                  <span>{{scope.row.specificationChinese}}</span>
                </template> -->
              </el-table-column>
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
                      <span>{{scope.row.packingGoodsCount || 0}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.packingGoodsUnit}}/箱</span>
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
                  <span>￥ {{scope.row.unitPrice * scope.row.finalDiscount}}</span>
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
              <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                <template slot-scope="scope">
                  <span>￥ {{ scope.row.surplusAmount }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--补货表格-->
          <div class="filter-container" style="padding-bottom: 0">
            <el-table key='replenishment' :data="order.replenishmentList" border fit
                      size="mini"
                      style="width: 100%;border: 1px solid #d5d5d5;border-top:none;"
                      :span-method="arraySpanMethod"
                      :show-header="haveReplenishment"
                      class="orderTable" ref="replenishmentTable"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
              <el-table-column
                align="center"
                width="85"
                label="商品品牌"
                prop="brandName"
              />
              <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
                <template slot-scope="scope">
                  <div class="text-muted" v-if="scope.$index===order.replenishmentList.length-1">支付70%余款时间: {{ new
                    Date(completeStockTime) | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
                  </div>
                  <span v-else>{{scope.row.goodsNo}}</span>
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
                  <div v-if="scope.$index===order.replenishmentList.length-1" class="text-total">{{
                    '已付货款:' }} :
                  </div>
                  <span v-else>{{scope.row.startDiscount}}%</span>
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
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">{{ '合计 : ' }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">￥ {{ deposit30Amount.toFixed(2)}}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1" class="text-total">￥ {{ (deposit30Amount+deposit70Amount).toFixed(2) }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.3).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">￥ {{ deposit70Amount.toFixed(2)}}</span>
                  <div v-else-if="scope.$index===order.replenishmentList.length-1" class="text-total">￥ {{
                    deposit70Amount.toFixed(2) }}
                  </div>

                  <span v-else>￥ {{ (scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.7).toFixed(2) }}</span>
                </template>
              </el-table-column>
              <!--<el-table-column label="跨境税金" align="center" width="170" v-if="currentRow.channelClassify!==2">-->
                <!--<template slot-scope="scope">-->
                  <!--<span-->
                    <!--v-if="scope.$index===order.replenishmentList.length-2" class="text-total">￥ {{ crossCountryAmount.toFixed(2)}}</span>-->
                  <!--<span v-else>￥ {{ (scope.row.supplyPrice * 0.119).toFixed(2) }}</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
          </div>

          <div style="display: flex;justify-content: flex-end;margin-top: 10px">
            <el-button v-if="urgeBtnVisible" class="filter-item" type="primary" @click="urgeVisible=true">催促发货
            </el-button>
            <el-button v-if="cancelOrderBtnVisible" class="filter-item" type="primary" @click="cancelOrderProcess">取消订货
            </el-button>
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
      <p style="text-align: center">该次订货已被取消，可在“取消待退全款”状态中查看详情。</p>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <!--<el-button type="primary" @click="cancelOrderSubmitVisible=false">知道了</el-button>-->
        <el-button type="primary" @click="$emit('closeDialog')">知道了</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="urgeVisible" width="30%" append-to-body :show-close="false">
      <p style="text-align: center">已向品牌商发送催促通知，当出现『取消订货』按钮时，您可选择取消订货，系统将向您退款。</p>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <!--<el-button type="primary" @click="cancelOrderSubmitVisible=false">知道了</el-button>-->
        <el-button type="primary" @click="$emit('closeDialog')">知道了</el-button>
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
        defalut: () => {
          return  {
            "brandNo": 10001,
            "goodsNo": 1000110001,
            orderNo: 10001,
            channelNo: 101,
            channelClassify: 1,
            channelLevel: 1,
            orderAmount: 100,
            orderStatus: 0,
            FXMSG: [
              {
                channelNo: 1234,
                channelClassify: 1,
                channelLevel: 1,
                applicationResult: 1,
                firstApplicationResult: 1,
                secondApplication: false,
                firstReject: false,
                secondApplicationResult: 1
              },
              {
                channelNo: 2234,
                channelClassify: 2,
                channelLevel: 2,
                applicationResult: 2,
                firstApplicationResult: 2,
                secondApplication: true,
                firstReject: false,
                secondApplicationResult: 2
              },
              {
                channelNo: 3234,
                channelClassify: 3,
                channelLevel: 3,
                applicationResult: 3,
                firstApplicationResult: 3,
                secondApplication: true,
                firstReject: true,
                secondApplicationResult: 3
              }
            ],
            "goodsImg": "http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg",
            "goodsChineseName": "兰蔻（LANCOME）空气轻垫唇油 口红唇釉唇彩 空气轻垫唇油166 6ML",
            "goodsCategory": 10,
            "series": "薰衣草",
            "merchandiseMainVariety": 0,
            "merchandiseChildVariety": 1,
            "goodsSpecification": "102毫升/支",
            "cartonSpecification": "10支/箱",
            "unitPrice": "240.00",
            "brandEnglishName": "LANCOME"
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
          if (index >= arr.length-2) return false
          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.3
        })
        const deposit30_amount = itemOrder_amount + itemReplenish_amount
        return deposit30_amount
      },
      deposit70Amount() {
        let itemOrder_amount = 0
        this.order.orderSubs.forEach((subsItem, index) => {
          itemOrder_amount += subsItem.orderQuantity * subsItem.packingSpecification * subsItem.supplyPrice * 0.7
        })
        let itemReplenish_amount = 0
        this.order.replenishmentList.forEach((replenishItem, index, arr) => {
          if (index >= arr.length-2) return false
          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.7
        })
        const deposit70_amount = itemOrder_amount + itemReplenish_amount
        return deposit70_amount
      },
      crossCountryAmount() {
        let itemOrder_amount = 0
        this.order.orderSubs.forEach((subsItem, index) => {
          itemOrder_amount += subsItem.supplyPrice * 0.119
        })
        let itemReplenish_amount = 0
        this.order.replenishmentList.forEach((replenishItem, index, arr) => {
          if (index >= arr.length-2) return false
          itemReplenish_amount += replenishItem.supplyPrice * 0.119
        })
        const crossCountryAmount = itemOrder_amount + itemReplenish_amount
        return crossCountryAmount
      },
    },
    data() {
      return {
        enterStatusTime: new Date('2018-11-11'),
        urgeBtnVisible: true,
        urgeVisible: false,
        cancelOrderBtnVisible: true,
        list: [],
        orderDetail: {}, // 存放订货表格数据
        haveReplenishment: false,
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
        request({
          url: "/order/orderDetail.do",
          method: "post",
          data: { orderNo: this.currentRow.order_no }
        }).then(res => {
          this.orderDetail = res.data;
        });
      },
      removeAction(cartId, index) {
        cartRemove(cartId).then(res => {
          if (res.errorCode == 0) {
            this.list.splice(index, 1)
          }
        })
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.order.replenishmentList.length - 2) {
          if (columnIndex === 11) {
            return {
              rowspan: 1,
              colspan: 12
            }
          } else if (columnIndex > 11) {
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
              colspan: 8
            }
          } else if (columnIndex === 8) {
            return {
              rowspan: 1,
              colspan: 4
            }
          } else if (columnIndex === 12) {
            return {
              rowspan: 1,
              colspan: 3
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
      recordTime() {
        const now = Date.now()
        const diff = parseInt(this.enterStatusTime - now) / (1000 * 60 * 60 * 24) + 1
        if (diff >= 11) {
          this.urgeVisible = true
        } else if (diff >= 27) {
          this.cancelOrderBtnVisible = true
        } else {
          this.cancelOrderBtnVisible = false
          this.urgeVisible = true
        }
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
      window.setTimeout(() => {
//        this.$refs['sumTable'].$el.children[3].children['0'].children[1].children['0'].cells[3].children['0'].innerHTML = `<div style="display: flex;justify-content: flex-end"><span>合计:</span></div>`

        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'].$el.offsetHeight

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth

//        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 2].cells[0].style.textAlign = 'right'

        this.$refs["replenishmentTable"
          ].$el.children[1].children["0"].children[1].children["0"].children["0"].children["0"].style.textAlign = 'right'

        this.$refs["replenishmentTable"
          ].$el.children[1].children["0"].children[1].children["1"].children["0"].children["0"].style.textAlign = 'left'

        this.$refs["replenishmentTable"
          ].$el.children[1].children["0"].children[1].children["1"].children["1"].children["0"].style.textAlign = 'right'

      }, 100)
//      this.recordTime()
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
