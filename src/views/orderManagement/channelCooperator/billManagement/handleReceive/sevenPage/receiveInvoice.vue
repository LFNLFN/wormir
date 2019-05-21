<template>
  <div>
    <div style="text-align: center"><h3>{{ currentRow.order_no + '收货单' }}</h3></div>
    <div class="filter-container theBorder no-border-bottom right-space" :style="{paddingBottom: 0, width: rowLength +'px'}">
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">货单号:</div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple">{{ currentRow.order_no }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">渠道号:</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">{{ currentRow.channel_no }}</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">渠道名称</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ currentRow.channel_name }}</div>
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
          <el-col :span="3" v-if="orderDetail.payWay==10">
            <div class="grid-content bg-purple">收款SWFIT Code</div>
          </el-col>
          <el-col :span="3" v-if="orderDetail.payWay==10">
            <div class="grid-content bg-purple">453566787469</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">收款银行</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">中国农业银行</div>
          </el-col>
          <el-col :span="2" align="center">
            <div class="grid-content bg-purple">银行地址</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">广州市天河区石牌桥</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center" v-if="orderDetail.payWay==10">
            <div class="grid-content bg-purple">汇款SWFIT Code</div>
          </el-col>
          <el-col :span="3" v-if="orderDetail.payWay==10">
            <div class="grid-content bg-purple">{{orderDetail.bankSwift}}</div>
          </el-col>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">汇款银行</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{orderDetail.bankName}}</div>
          </el-col>
          <el-col :span="2" align="center">
            <div class="grid-content bg-purple">银行地址</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">{{orderDetail.bankAddress}}</div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="twoTable-wrap border-top1" style="display: flex;">
      <!--订货表格-->
      <div class="filter-container">
        <el-table key='productList' :data="orderDetail.goodList || []"
                  border fit size="mini"
                  style="width: 100%;border-left: 2px solid #d5d5d5;border-top: none"
                  class="orderTable" ref="orderTable1"
                  :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700'}">
          <el-table-column align="center" width="85" label="商品品牌" prop="brandName"/>
          <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNoForBrand"/>
          <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsName"
                           show-overflow-tooltip/>
          <el-table-column align="center" width="90" :label="$t('product.productSpecification')"
                           prop="specificationChinese" show-overflow-tooltip/>
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
          <el-table-column align="center" width="120" class-name="units-wrap" :label="$t('order.orderQuantity')">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="12" style="display: flex;justify-content: center">
                  <span>{{scope.row.orderBoxNum}}</span>
                </el-col>
                <el-col :span="12" style="display: flex;justify-content: center">
                  <span>箱</span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="220"
            class-name="units-wrap"
            label="发货装箱规格"
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
          <el-table-column align="center" width="120" class-name="units-wrap" label="发货数量">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="12" style="display: flex;justify-content: center">
                  <span>{{ scope.row.orderBoxNum }}</span>
                </el-col>
                <el-col :span="12" style="display: flex;justify-content: center">
                  <span>箱</span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column align="center" width="85" label="箱号" prop="goodsNo">
            <template slot-scope="scope">
              <span>{{'待完成的功能'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="180" label="发货日期" prop="goodsNo">
            <template slot-scope="scope">
              <div style="margin: 1em 0">{{ orderDetail.domesticShipmentTime }}</div>
              <img :src="img_qrcode" alt="" width="90">
              <div>请扫码收货</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import img_qrcode from '@/assets/qrcode.png'

  export default {
    props: {
      currentRow: {
        type: Object,
        required: true
      },
      orderDetail: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        tableHeight: 0,
        img_qrcode,
        rowLength: 0,
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
      }
    },
    computed: {
      cartonTotal() {
        let replenishmentQuantityTotal = 0
        this.order.orderSubs.forEach((subsItem, index, arr) => {
          if (index === arr.length - 1) return false
          replenishmentQuantityTotal += subsItem.orderQuantity
        })
        this.order.replenishmentList.forEach((subsItem, index, arr) => {
          if (index === arr.length - 1) return false
          replenishmentQuantityTotal += subsItem.replenishmentQuantity
        })
        return replenishmentQuantityTotal
      }
    },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.order.replenishmentList.length - 1) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 5
            }
          }
          else if (columnIndex < 5 && columnIndex > 0) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          else if (columnIndex === 7) {
            return {
              rowspan: 1,
              colspan: 3
            }
          }
          else if (columnIndex > 7 && columnIndex < 10) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.tableHeight += this.$refs['orderTable1'].$el.offsetHeight
        this.rowLength += this.$refs['orderTable1'].$el.offsetWidth
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
    flex-flow: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: rgb(66, 66, 66);
    width: 100px;
  }

  .orderTable .el-col {
    border-right: none;
  }

  .qr-col {
    width: 150px;
  }
</style>
