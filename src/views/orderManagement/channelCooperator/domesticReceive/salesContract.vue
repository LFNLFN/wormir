<template>
  <div>
    <div class="topTitle colFlex">
      <h1 style="text-align:center">购货合同
        <br>
        <br>SALES CONTRACT
        <br>
        <br>
      </h1>
    </div>
    <div class="topTable theBorder no-border-bottom" style="margin: 0 10%">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{ '合同编号/Contract No：' }}</div>
        </el-col>
        <el-col :span="13">
          <div class="grid-content bg-purple">{{ mergeOrderNo }}</div>
        </el-col>
        <el-col :span="7" align="center">
          <div class="grid-content bg-purple">{{ currentOrder.generateSaleContractTime }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="0" align="center">
          <div class="grid-content"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ '买方/Buyer：' }}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ domesticAuthorityCompanyMsg.english_name }}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ '电话/Tel：' }}</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{ domesticAuthorityCompanyMsg.tel }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ '地址/Address：' }}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ domesticAuthorityCompanyMsg.address }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="0" align="center">
          <div class="grid-content"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ '卖方/Seller：' }}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ externalAuthorityCompanyMsg.name }}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ '电话/Tel：' }}</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{ externalAuthorityCompanyMsg.tel }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ '地址/Address：' }}</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ externalAuthorityCompanyMsg.address }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="0" align="center">
          <div class="grid-content"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" align="center">
          <div class="grid-content bg-purple">{{ '厂商/Manufacturer：' }}</div>
        </el-col>
        <el-col :span="13">
          <div class="grid-content bg-purple">{{ currentOrder.brandEnglishName }}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">{{ '电话/Tel：' }}</div>
        </el-col>
        <el-col :span="3" v-if="brandInfo.brandDetail">
          <div class="grid-content bg-purple">{{ brandInfo.brandDetail.brandCompanyPhone }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" align="center">
          <div class="grid-content bg-purple">{{ '地址/Address：' }}</div>
        </el-col>
        <el-col :span="13" v-if="brandInfo.brandDetail">
          <div class="grid-content bg-purple">{{ brandInfo.brandDetail.brandCompanyAddress }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="0" align="center">
          <div class="grid-content"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="width:100%">
          <div
            style="text-align: left; background: #fff; width: 100%; padding: 10px"
          >1.经买卖双方确认根据下列条款订立合同：
            <br>The under signed Seller and Buyer and Manufactuer have confirmed this contract in accordance with the terms and conditions stipulate of below：
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bottomTable" style="margin: 0 10%">
      <el-table
        key="invoiceTable"
        :data="invoiceTableList"
        border=""
        fit
        size="mini"
        style="width: 100%"
        class="theBorder orderTable border-left2 no-border-bottom border-right2 no-border-top"
        ref="invoiceTable"
        :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}"
      >
        <el-table-column
          align="center"
          min-width="100"
          label="项目 Term"
          prop="goodsNo"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="100"
          label="货号 Code"
          prop="goods_no_for_brand"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_no_for_brand }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="190"
          label="商品名称 Descripition"
          prop="goods_english_name"
          :render-header="renderHeader"
        />
        <el-table-column
          align="center"
          min-width="100"
          label="商品规格 Size"
          prop="specification_english"
          :render-header="renderHeader"
        ></el-table-column>
        <el-table-column
          align="center"
          min-width="190"
          label="数量（件） Quantity（Pcs）"
          prop="order_goods_num"
          :render-header="renderHeader"
        />
        <el-table-column
          align="center"
          min-width="100"
          label="单价（€） Unit Price（€）"
          prop="unitPrice"
          :render-header="renderHeader"
        />
        <el-table-column
          align="center"
          width="100"
          label="金额（€） Amount（€）"
          prop="goodSpec"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <span>{{ (Number(scope.row.unitPrice) * scope.row.order_goods_num).toFixed(2) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="[{}]"
        border=""
        fit
        size="mini"
        style="width: 100%;"
        class="theBorder orderTable border-left2 no-border-bottom border-right2 no-border-top"
        :show-header="false"
      >
        <el-table-column
          align="right"
          min-width="100"
          label=""
          prop=""
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <span class="text-total" style="font-weight:bold">{{ '合计/Total：' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="100"
          label=""
          prop=""
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <span class="text-total" style="font-weight:bold">{{ goodPriceAmount }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottomTable theBorder">
        <el-row>
          <el-col :span="6" align="left">
            <div class="grid-content bg-purple">{{ '原产国Country of origin:' }}</div>
          </el-col>
          <el-col :span="6" v-if="brandInfo.brandDetail">
            <div class="grid-content bg-purple">{{ brandInfo.brandDetail.productionPlaceEnglish }}</div>
          </el-col>
          <el-col :span="4" align="left">
            <div class="grid-content bg-purple">{{ 'CIF' }}</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ domesticAuthorityCompanyMsg.city }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" align="left">
            <div class="grid-content bg-purple">{{ '2.包装/Packing：' }}</div>
          </el-col>
          <el-col :span="13">
            <div class="grid-content bg-purple">{{ 'Standard Packing' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" align="left">
            <div class="grid-content bg-purple">{{ '3.装运/Shipping：' }}</div>
          </el-col>
          <el-col :span="13">
            <div class="grid-content bg-purple">{{ currentOrder.transportation==1? 'By Air' : 'By Sea' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" align="left">
            <div class="grid-content bg-purple">{{ '4.运输起讫/Shipment from：' }}</div>
          </el-col>
          <el-col :span="13">
            <div class="grid-content bg-purple" v-if="brandInfo.brandDetail">{{ brandInfo.brandDetail.productionPlaceEnglish }}</div>
            <div class="grid-content bg-purple">{{ 'to' }}</div>
            <div class="grid-content bg-purple">{{ domesticAuthorityCompanyMsg.city }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" align="left">
            <div class="grid-content bg-purple">{{ '5.装运期/Shipment date：' }}</div>
          </el-col>
          <el-col :span="13">
            <div class="grid-content bg-purple">{{ 'before' }}</div>
            <div class="grid-content bg-purple">{{ currentOrder.outboundTime }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" align="left">
            <div class="grid-content bg-purple">{{ '6.付款条件/Terms of payment：' }}</div>
          </el-col>
          <el-col :span="13">
            <div class="grid-content bg-purple">{{ 'By T/T' }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="width:100%">
            <div
              style="text-align: left; background: #fff; width: 100%; padding: 10px"
            >7.本合同共2份，自双方代表签字（盖章）之日生效。
              <br>This contract is in 2 copies，effective being signed/sealed by both parties.
            </div>
          </el-col>
        </el-row>
        <el-row style="min-height: 300px">
          <el-col class="no-border-right" style="width:50%;">
            <div
              style="text-align: center; background: #fff; width: 100%; padding: 100px 10px 10px 10px; font-weight: 1;"
            >卖方/Seller：
              <br>{{externalAuthorityCompanyMsg.name}}
            </div>
          </el-col>
          <el-col class="no-border-left" style="width:50%">
            <div
              style="text-align: center; background: #fff; width: 100%; padding: 100px 10px 10px 10px"
            >买方/Buyer：
              <br>{{domesticAuthorityCompanyMsg.english_name}}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="text-align: center; margin: 10px">
      <el-button
        style='width: 200px'
        type="primary"
        @click="handleDownload"
      >下载</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "sales-contract",
  props: {
    mergeOrderNo: {
      type: [String, Number]
    },
    currentOrder: {
      type: [Object]
    },
    orders: {
      type: [Array]
    },
  },
  data() {
    return {
      order: {
        orderNo: 10005,
        refundOrderStatus: 40,
        r_bankAccount: 3674506939865543,
        r_bankName: "Bank of China",
        r_bankAddress: "Guangzhou Panyu District",
        paymentAmount: "￥ 3,763.70",
        b_bankAccount: 1456884739665543,
        b_bankName: "China Construction Bank",
        b_bankAddress: "Guangzhou Panyu District",
        createTime: new Date(),
        boxCode: 5555,
        paymentStatus: 10,
        description: "Lancome (LANCOME) air cushion lip oil",
        channelClassify: 1, // retailer categories
        channelNo: 20005, // retailer no
        orderStatus: 50,
        orderMethod: 20,
        consigneeAddress: "23 Jianguomen Avenue, Chaoyang District",
        city: "Beijing",
        consigneeName: "Paul Lee",
        consigneeMobile: 13456789454,
        tel: 95338,
        brandEnglishName: "LANCOM",
        proofImage:
          "http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg", // 补款并单表格
        orderSubs: [
          {
            startDiscount: 70,
            orderDiscount: 68,
            goodsNo: 2564645,
            goodsChineseName: "精华保湿",
            specificationChinese: "100 ml",
            packingSpecification: 15,
            orderQuantity: 5,
            orderQuantity_input: 0,
            inventoryQuantity: 200,
            waitingForStock: 0,
            outOfStock: 0,
            supplyCurrencySymbol: "￥ ",
            supplyPrice: 20,
            orderGoodsNum: 10,
            unitPrice: "",
            totalChannelAmount: "",
            shipmentQuantity: 4,
            cartonNo: "046524"
          },
          {
            startDiscount: 70,
            orderDiscount: 68,
            goodsNo: 2564645,
            goodsChineseName: "精华保湿",
            specificationChinese: "100 ml",
            packingSpecification: 15,
            orderQuantity: 5,
            orderQuantity_input: 0,
            inventoryQuantity: 200,
            waitingForStock: 0,
            outOfStock: 0,
            supplyCurrencySymbol: "￥ ",
            supplyPrice: 20,
            orderGoodsNum: 10,
            unitPrice: "",
            totalChannelAmount: "",
            shipmentQuantity: 4,
            cartonNo: "046524"
          },
          {
            startDiscount: 70,
            orderDiscount: 68,
            goodsNo: 8964645,
            goodsChineseName: "保湿润肤",
            specificationChinese: "100 ml",
            packingSpecification: 10,
            orderQuantity: 5,
            orderQuantity_input: 0,
            inventoryQuantity: 10,
            waitingForStock: 0,
            outOfStock: 0,
            supplyCurrencySymbol: "￥ ",
            supplyPrice: 30,
            orderGoodsNum: 20,
            unitPrice: "",
            totalChannelAmount: "",
            shipmentQuantity: 4,
            cartonNo: "048922"
          },
          {
            startDiscount: 70,
            orderDiscount: 68,
            goodsNo: 8964645,
            goodsChineseName: "美白眼霜",
            specificationChinese: "100 ml",
            packingSpecification: 10,
            orderQuantity: 5,
            orderQuantity_input: 0,
            inventoryQuantity: 10,
            waitingForStock: 0,
            outOfStock: 0,
            supplyCurrencySymbol: "￥ ",
            supplyPrice: 30,
            orderGoodsNum: 20,
            unitPrice: "",
            totalChannelAmount: "",
            shipmentQuantity: 4,
            cartonNo: "048922"
          }
        ],
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
          brand: "LANCOM",
          cartonNo: 14643567,
          goodsNo: 345234,
          goodsName: "LANCOM lip oil",
          goodsQty: 23,
          shipmentQty: 10,
          unitPrice: 100,
          goodsGrossWeight: 5,
          goodsNetWeight: 5,
          cartonWeight: 5,
          goodSpec: 20,
          packingSpec: 10,
          cartonSize: "29.8x20.6x14.6CM",
          remark: "",
          applicationElement:
            "品名：LANCOM 水润面膜 / 用途：面部护理/ 包装：盒装 / 品牌: LANCOM"
        },
        {
          brand: "LANCOM",
          cartonNo: 14643567,
          goodsNo: 345234,
          goodsName: "LANCOM lip oil",
          goodsQty: 23,
          shipmentQty: 10,
          unitPrice: 100,
          goodsGrossWeight: 5,
          goodsNetWeight: 5,
          cartonWeight: 5,
          goodSpec: 20,
          packingSpec: 10,
          cartonSize: "29.8x20.6x14.6CM",
          remark: "",
          applicationElement:
            "品名：LANCOM 水润面膜 / 用途：面部护理/ 包装：盒装 / 品牌: LANCOM"
        },
        {
          brand: "LANCOM",
          cartonNo: 14643567,
          goodsNo: 345234,
          goodsName: "LANCOM lip oil",
          goodsQty: 23,
          shipmentQty: 10,
          unitPrice: 100,
          goodsGrossWeight: 5,
          goodsNetWeight: 5,
          cartonWeight: 5,
          goodSpec: 20,
          packingSpec: 10,
          cartonSize: "29.8x20.6x14.6CM",
          remark: "",
          applicationElement:
            "品名：LANCOM 水润面膜 / 用途：面部护理/ 包装：盒装 / 品牌: LANCOM"
        }
      ],
      domesticAuthorityCompanyMsg: {},
      externalAuthorityCompanyMsg: {},
      brandInfo: {},
      goodPriceAmount: 0,
    };
  },
  methods: {
    renderHeader(createElement, { column, _self }) {
      console.log(createElement); //  function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
      const label = column.label;
      const labelArr = label.split(" ");
      return createElement(
        "span", //创建最外层的标签可随意
        [
          createElement(
            "span",
            {
              // 创建第一个元素的标签可随意
              attrs: { type: "text" }
            },
            [labelArr[0]]
          ),
          createElement("br"),
          createElement(
            "span",
            {
              // 创建第二个元素的标签可随意
              attrs: { type: "text" } // 给分割的某个元素单独加样式
            },
            [labelArr[1], labelArr[2] ? " " + labelArr[2] : ""]
          )
        ]
      );
    },
    invoiceArraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === this.order.replenishmentList.length - 1) {
        if (columnIndex === 0) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else if (columnIndex === 1) {
          return {
            rowspan: 1,
            colspan: 3
          };
        } else if (columnIndex < 4 && columnIndex > 1) {
          return {
            rowspan: 0,
            colspan: 0
          };
        } else if (columnIndex === 4) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else if (columnIndex === 5) {
          return {
            rowspan: 1,
            colspan: 3
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    getWormirCompanyMsg() {
      this.$request({
        url: "/user/getWormirCompanyMsg.do",
        method: "post",
        data: {}
      })
        .then(res => {
          if (res.errorCode == 0) {
            this.domesticAuthorityCompanyMsg =
              res.data.domesticAuthorityCompanyMsg;
              this.externalAuthorityCompanyMsg = res.data.externalAuthorityCompanyMsg
            this.listLoading = false;
          } else {
            this.$message.error("数据请求失败");
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("数据请求失败");
          this.listLoading = false;
        });
    },
    getBrandInfo() {
      this.$request({
        url: "/brand/brandDetail.do",
        method: "post",
        data: {
          brandNo: this.currentOrder.brandNo
        }
      })
        .then(res => {
          if (res.errorCode == 0) {
            this.brandInfo = res.data
          }
        })
        .catch(err => {
          this.$message.error("数据请求失败");
          this.listLoading = false;
        });
    },
    getGoodList() {
      let tmpArr = []
      this.orders.forEach((e,i,s) => {
        tmpArr.push(e.orderNo)
      })
      this.$request({
        url: "/goods/salesContractGoodList.do",
        method: "post",
        data: {
          orderNos: tmpArr
        }
      })
        .then(res => {
          if (res.errorCode == 0) {
            this.invoiceTableList = res.data.items
            this.invoiceTableList.forEach((e,i,s) => {
              e.price_arr = JSON.parse(e.price_arr)
              e.unitPrice = e.price_arr[3]
              this.goodPriceAmount += Number(e.unitPrice) * e.order_goods_num
            })
            this.goodPriceAmount = this.goodPriceAmount.toFixed(2)
          }
        })
        .catch(err => {
          this.$message.error("数据请求失败");
        });
    },
    handleDownload() {},
  },
  computed: {
    cartonTotal() {
      let replenishmentQuantityTotal = 0;
      this.invoiceTableList.forEach((subsItem, index, arr) => {
        if (index === arr.length - 1) return false;
        replenishmentQuantityTotal += subsItem.shipmentQty;
      });
      return replenishmentQuantityTotal;
    },
    amountTotal() {
      let replenishmentQuantityTotal = 0;
      this.invoiceTableList.forEach((subsItem, index, arr) => {
        if (index === arr.length - 1) return false;
        replenishmentQuantityTotal +=
          subsItem.unitPrice * subsItem.goodsQty * subsItem.shipmentQty;
      });
      return replenishmentQuantityTotal;
    }
  },
  created() {
    this.getWormirCompanyMsg()
    this.getBrandInfo()
    this.getGoodList()
  },
  mounted() {
    this.order.replenishmentList.push({
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
    });
    this.order.replenishmentList.push({
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
    });
  }
};
</script>

<style lang="scss" scoped>
.topTitle.colFlex > * {
  margin: 0.25em;
}
</style>
