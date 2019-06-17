<template>
  <div>
    <div class="topTitle colFlex">
      <h1 style="text-align:center">WORMIR INTERNATTIONAL CO., LIMITED</h1>
      RM18S,27/F HO KING COMM CTR2-16 FAYUEN ST MONGKOK KLN HONG KONG<br/><br/>
      <h1 style="text-align:center">装箱单</h1>
      PACKING LIST<br/><br/>
    </div>
    <div class="topTable theBorder no-border-bottom" style="margin: 0 10%">
      <el-row>
        <el-col :span="4" align="center">
          <div class="grid-content bg-purple">{{ '箱单编号/Packing List No：' }}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ 'WanMing' }}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ '日期/Date：' }}</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{ '18888888888' }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" align="center">
          <div class="grid-content bg-purple">{{ 'To：' }}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ 'WanMing' }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" align="center">
          <div class="grid-content bg-purple">{{ '厂商/Manufacturer：' }}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ 'WanMing' }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" align="center">
          <div class="grid-content bg-purple">{{ '地址/Address：' }}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ 'WanMing' }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="bottomTable" style="margin: 0 10%">
      <el-table key='invoiceTable' :data="invoiceTableList" border fit
                size="mini"
                style="width: 100%"
                class="theBorder orderTable border-left2 border-bottom border-right2 border-top2" ref="invoiceTable"
                :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">

        <el-table-column align="center" min-width="100" label="项目 Term" prop="goodsNo" :render-header="renderHeader">
            <template slot-scope="scope">
            <span>{{ scope.row.cartonNo }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="货号 Code" prop="goodsNo" :render-header="renderHeader">
          <template slot-scope="scope">
            <span>{{ scope.row.cartonNo }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="190" label="商品名称 Descripition" prop="goodsName" :render-header="renderHeader"/>

        <el-table-column align="center" min-width="100" label="商品规格 Size" prop="" :render-header="renderHeader"> 
        </el-table-column>

        <el-table-column align="center" min-width="190" label="数量（件） Quantity（Pcs）" prop="applicationElement" :render-header="renderHeader"/>

        <el-table-column align="center" min-width="100" label="净重（Kg） Net Weight（Kg）" prop="brand" :render-header="renderHeader"/>

        <el-table-column align="center" min-width="100" label="毛重（Kg） Gross Weight（Kg）" prop="goodSpec" :render-header="renderHeader">
          <template slot-scope="scope">
            <span>{{ scope.row.goodSpec }}瓶/箱</span>
          </template>
        </el-table-column>
      </el-table>
      //TODO: 合计/Total
      <div class="bottomTable theBorder " style="margin: -4px 0 0 0">
        <el-row>
        <el-col :span="5" align="center">
          <div class="grid-content bg-purple">{{ '原产国Country of origin:' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ 'WanMing' }}</div>
        </el-col>
        <el-col :span="5" align="center">
          <div class="grid-content bg-purple">{{ 'CIF' }}</div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">{{ '18888888888' }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" align="center">
          <div class="grid-content bg-purple">{{ 'Total in' }}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ '读取发货总箱数' + ' ' + 'Carton' }}</div>
        </el-col>
      </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'packing-list',
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
            brand: 'LANCOM',
            cartonNo: 14643567,
            goodsNo: 345234,
            goodsName: 'LANCOM lip oil',
            goodsQty: 23,
            shipmentQty: 10,
            unitPrice: 100,
            goodsGrossWeight: 5,
            goodsNetWeight: 5,
            cartonWeight: 5,
            goodSpec: 20,
            packingSpec: 10,
            cartonSize: '29.8x20.6x14.6CM',
            remark: '',
            applicationElement: '品名：LANCOM 水润面膜 / 用途：面部护理/ 包装：盒装 / 品牌: LANCOM'
          },
          {
            brand: 'LANCOM',
            cartonNo: 14643567,
            goodsNo: 345234,
            goodsName: 'LANCOM lip oil',
            goodsQty: 23,
            shipmentQty: 10,
            unitPrice: 100,
            goodsGrossWeight: 5,
            goodsNetWeight: 5,
            cartonWeight: 5,
            goodSpec: 20,
            packingSpec: 10,
            cartonSize: '29.8x20.6x14.6CM',
            remark: '',
            applicationElement: '品名：LANCOM 水润面膜 / 用途：面部护理/ 包装：盒装 / 品牌: LANCOM'
          },
          {
            brand: 'LANCOM',
            cartonNo: 14643567,
            goodsNo: 345234,
            goodsName: 'LANCOM lip oil',
            goodsQty: 23,
            shipmentQty: 10,
            unitPrice: 100,
            goodsGrossWeight: 5,
            goodsNetWeight: 5,
            cartonWeight: 5,
            goodSpec: 20,
            packingSpec: 10,
            cartonSize: '29.8x20.6x14.6CM',
            remark: '',
            applicationElement: '品名：LANCOM 水润面膜 / 用途：面部护理/ 包装：盒装 / 品牌: LANCOM'
          }
        ]
      }
    },
    methods: {
        renderHeader(createElement, { column, _self }) { 
                console.log(createElement)      //  function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
                const label = column.label 
                const labelArr = label.split(' ') 
                return createElement( 
                             'span',     //创建最外层的标签可随意
                             [ 
                                 createElement('span', {  // 创建第一个元素的标签可随意
                                 attrs: { type: 'text' } 
                                 },[labelArr[0]] ), 
                                 createElement('br'),
                                 createElement('span', {  // 创建第二个元素的标签可随意 
                                 attrs: { type: 'text' } // 给分割的某个元素单独加样式
                                 }, [labelArr[1], labelArr[2]?' ' + labelArr[2]:''] ) 
                             ]
                 ) 
         },
      invoiceArraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.order.replenishmentList.length - 1) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
          else if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 3
            }
          }
          else if (columnIndex < 4 && columnIndex > 1) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          else if (columnIndex === 4) {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
          else if (columnIndex === 5) {
            return {
              rowspan: 1,
              colspan: 3
            }
          }
          else {
            return {
              rowspan: 0,
              colspan: 0
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

    }
  }
</script>

<style lang="scss" scoped>
  .topTitle.colFlex > * {
    margin: .25em;
  }
</style>
