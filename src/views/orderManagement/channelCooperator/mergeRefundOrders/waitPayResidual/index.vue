<template>
  <div class="app-container">
    <div class="mainContent">
      <div class="filter-container theTopMsgBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">Order No. :</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple link-type" @click="viewDialog">{{ currentRow.orderNo }}</div>
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

            <el-table-column align="center" label="70% Residual Payment" width="170">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification * scope.row.orderQuantity * 0.7).toFixed(2)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!--补货表格-->
          <el-table v-if="hasReplenishment" key='replenishment' :data="order.replenishmentList"
                    border fit size="mini"
                    style="width: 100%;border: 1px solid #d5d5d5;border-top:none;"
                    class="orderTable" ref="replenishmentTable"
                    :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
            <el-table-column align="center" width="85" label="Code" prop="goodsNo">
              <template slot-scope="scope">
                <span>{{ scope.row.goodsNo }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="130" label="Description" prop="goodsChineseName"
                             show-overflow-tooltip/>

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
                <span>￥ {{(scope.row.supplyPrice * scope.row.packingUnit).toFixed(2)}}</span>
              </template>
            </el-table-column>

            <el-table-column width="140" align="center" label="Total Purchase Price">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="130" label="30% Deposit">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.3).toFixed(2)}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="70% Residual Payment" width="170">
              <template slot-scope="scope">
                <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.7).toFixed(2)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table :key='2' :data="totalTableData" ref="totalTable"
                    border fit size="mini"
                    style="width: 100%;border: 1px solid #d5d5d5;border-top:none;"
                    class="orderTable"
                    :span-method="arraySpanMethod"
                    :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0, display: 'none'}">
            <el-table-column align="center" width="85" label="Code" prop="goodsNo">
              <template slot-scope="scope">
                <span>{{ scope.row.goodsNo }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="130" label="Description" prop="goodsChineseName"
                             show-overflow-tooltip/>

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

            <el-table-column align="left" width="90" label="Retail Price">
              <template slot-scope="scope">
                <span v-if="scope.$index==totalTableData.length-1&&currentRow.payWay==2" class="text-danger">{{ '温馨提醒：由于收到订金后才备货，所以请及时自行转帐，并核准以上帐号信息以人民币种转帐，因个人错误转帐造成的损失自行承担。' }}</span>
                <span v-else-if="scope.$index==totalTableData.length-1" class="text-muted"> 支付70%余款时间: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                <span v-else>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
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

            <el-table-column width="140" align="right" label="Unit Purchase Price">
              <template slot-scope="scope">
                <span v-if="scope.$index==totalTableData.length-1" class="text-total">{{ 'unpaid 70% residual payment：' }}</span>
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
                <span v-if="scope.$index==totalTableData.length-1" class="text-total">￥ {{ deposit30Amount.toFixed(2) }}</span>
                <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.3).toFixed(2)}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="70% Residual Payment" width="170">
              <template slot-scope="scope">
                <span v-if="scope.$index==totalTableData.length-1" class="text-total">￥ {{ deposit70Amount.toFixed(2) }}</span>
                <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.7).toFixed(2)}}</span>
              </template>
            </el-table-column>

          </el-table>

        </div>

      </div>

    </div>

    <el-dialog :visible.sync="isDialogShow" fullscreen style="padding: 20px" append-to-body title="待发货货单">
      <wait-shipment></wait-shipment>
    </el-dialog>

  </div>
</template>

<script>
  /* eslint-disable */

  // import { requestShopCart, cartRemove, createOrder } from "@/api/goods";
  import waitShipment from './waitShipment.vue'

  export default {
    components: { waitShipment },
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
//        this.order.replenishmentList.forEach((replenishItem, index, arr) => {
//          if (arr.length - 1 === index) return false
//          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.3
//        })
        return itemOrder_amount + itemReplenish_amount
      },
      deposit70Amount() {
        let itemOrder_amount = 0
        this.order.orderSubs.forEach((subsItem, index) => {
          itemOrder_amount += subsItem.orderQuantity * subsItem.packingSpecification * subsItem.supplyPrice * 0.7
        })
        let itemReplenish_amount = 0
//        this.order.replenishmentList.forEach((replenishItem, index, arr) => {
//          if (arr.length - 1 === index) return false
//          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.3
//        })
        return itemOrder_amount + itemReplenish_amount
      },
    },
    data() {
      return {
        list: [],
        hasReplenishment: false,
        replenishmentList: [],
        listLoading: false,
        isDialogShow: false,
        cartListSelect: [],
        replenishmentListSelect: [],
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
          }
        ],
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
        tableHeight: 0,
        rowLength: 0
      }
    },
    methods: {
      viewDialog() {
        this.isDialogShow = true
      },
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
        if (rowIndex === this.totalTableData.length - 1) {
          if (columnIndex === 5) {
            return {
              rowspan: 1,
              colspan: 7
            }
          } else if (columnIndex === 7) {
            return {
              rowspan: 1,
              colspan: 3
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
      // 弹层里面橙色总价
      payment_amount() {
        this.$emit('payment_amountChange', this.deposit70Amount)
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      this.payment_amount()
      this.$nextTick(() => {

        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'] && this.$refs['replenishmentTable'].$el.offsetHeight || 0
        this.tableHeight += this.$refs['totalTable'].$el.offsetHeight

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth + window.document.getElementsByClassName('brand-col')[0].offsetWidth

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
