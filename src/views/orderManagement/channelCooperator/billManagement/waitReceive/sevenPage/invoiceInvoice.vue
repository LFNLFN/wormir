<template>
  <div>
    <div class="topTitle colFlex">
      <h3>发票</h3>
      <h4>WORMIR INTERNATIONAL LTD.</h4>
      <h5>FLAT 18, 8/F., GOLDFIELD IND. CRT., 1 SUI WO ROAD, FO TAN, SHATIN,N.T.</h5>
      <h5>TEL：852 3100 0001 （吾蜜电话，读取设置）</h5>
    </div>
    <h2 style="text-align: center">INVOICE</h2>
    <div class="topTable theTopMsgBorder no-border-bottom" style="margin: 0 10%">
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{ 'TO：' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ 'Keypon International Logistics(Guangzhou) Co.,Ltd.' }}</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{ 'DATE：' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ '2018/12/12' }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ 'Attn：' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ 'WanMing' }}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ 'INVOICE NO.：' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ '1000001' }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ 'Tel：' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ '13734565438' }}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ 'ORDER NO.：' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ '10008' }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="bottomTable" style="margin: 0 10%">
      <el-table key='invoiceTable' :data="invoiceTableList" border fit
                size="mini"
                style="width: 100%"
                class="orderTable border-left2 border-bottom border-right no-border-top" ref="invoiceTable"
                :span-method="invoiceArraySpanMethod"
                :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">

        <el-table-column align="center" min-width="85" :label="$t('MARK')" prop="mark">
          <template slot-scope="scope">
            <span v-if="scope.$index===invoiceTableList.length-1" >{{ 'TOTAL : ' }}</span>
            <span v-else>{{ scope.row.mark }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" :label="$t('CopGNO')" prop="goodsNo"
                         show-overflow-tooltip/>
        <el-table-column align="center" min-width="190" :label="$t('GOODS DESCRIPTION')"
                         prop="goodsName" show-overflow-tooltip/>

        <el-table-column align="center" :label="$t('QTY')" prop="">
          <el-table-column align="center" min-width="100" :label="$t('(pcs)')" prop="goodsQty"/>
        </el-table-column>

        <el-table-column align="center" min-width="120" :label="$t('CTNS')" prop="shipmentQty">
          <template slot-scope="scope">
            <span v-if="scope.$index===invoiceTableList.length-1">{{ cartonTotal }}</span>
            <span v-else>{{ scope.row.shipmentQty }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('UNITE PRICE')">
          <el-table-column align="center" min-width="90" :label="$t('($)')">
            <template slot-scope="scope">
              <span v-if="scope.$index===invoiceTableList.length-1">{{ '--' }}</span>
              <span v-else>{{ scope.row.unitPrice.toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center"n:label="$t('AMOUNT')">
          <el-table-column align="center" min-width="90" :label="$t('($)')">
            <template slot-scope="scope">
              <span v-if="scope.$index===invoiceTableList.length-1">{{ amountTotal.toFixed(2) }}</span>
              <span v-else>{{ (scope.row.unitPrice*scope.row.goodsQty*scope.row.shipmentQty).toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table-column>

      </el-table>
    </div>
    <div class="remark-wrap" style="margin: 0 10%">
      <h6 style="margin: 20px 0 5px">REMARKS:</h6>
      <ol style="margin: 0">
        <li>Trade term: CIF GUANGZHOU</li>
        <li>Delivery Date: 20170427</li>
        <li>Payment Term: TT+LC</li>
        <li>Packing: CARTON</li>
      </ol>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        invoiceTableList: [
          {
            mark: 'AESOP',
            goodsNo: 345234,
            goodsName: 'LANCOM lip oil',
            goodsQty: 23,
            shipmentQty: 10,
            unitPrice: 100
          },
          {
            mark: 'AESOP',
            goodsNo: 345234,
            goodsName: 'LANCOM lip oil',
            goodsQty: 23,
            shipmentQty: 10,
            unitPrice: 100
          },
          {
            mark: 'AESOP',
            goodsNo: 345234,
            goodsName: 'LANCOM lip oil',
            goodsQty: 23,
            shipmentQty: 10,
            unitPrice: 100
          }
        ]
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
      },
      invoiceArraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.invoiceTableList.length - 1) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 4
            }
          }
          else if (columnIndex < 4 && columnIndex > 0) {
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
      },
    },
    computed: {
      cartonTotal() {
        let replenishmentQuantityTotal = 0
        this.invoiceTableList.forEach((subsItem, index, arr) => {
          if (index === arr.length - 1) return false
          replenishmentQuantityTotal += subsItem.shipmentQty
        })
        return replenishmentQuantityTotal
      },
      amountTotal() {
        let replenishmentQuantityTotal = 0
        this.invoiceTableList.forEach((subsItem, index, arr) => {
          if (index === arr.length - 1) return false
          replenishmentQuantityTotal += subsItem.unitPrice * subsItem.goodsQty * subsItem.shipmentQty
        })
        return replenishmentQuantityTotal
      }
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
//        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[0].style.textAlign = 'left'
//        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[1].style.textAlign = 'right'
        this.$refs['invoiceTable'].$el.children[2].children[0].children[1].children[this.invoiceTableList.length - 1].cells[0].style.textAlign = 'right'

      }, 100)
    }
  }
</script>

<style lang="scss" scoped>
  .topTitle.colFlex > * {
    margin: .25em;
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
    border: none!important;
    background-color: transparent;
    font-weight: normal;
  }
  .units-wrap .el-input--medium .el-input__inner {
    height: 24px;
    line-height: 24px;
    max-width: 40px;
  }
</style>
