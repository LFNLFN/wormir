<template>
  <div class="app-container">
    <div class="mainContent">
      <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0, marginTop: '10px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">货单号</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ orderDetail.orderNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">渠道号</div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple">{{ orderDetail.channelNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">收货地址</div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple">{{ orderDetail.address }}</div>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">收货方</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">{{orderDetail.name}}</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple">联系人</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{orderDetail.contact}}</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple">联系电话</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{orderDetail.tel}}</div>
        </el-col>
      </el-row>
      </div>

      <div :style="{paddingBottom: 0}" class="twoTable-wrap">
          <!--订货表格-->
          <div class="filter-container" style="padding-bottom: 0">
            <el-table
              key="productList"
              :data="orderDetail.goodList || []"
              border fit size="mini"
              style="width: 100%;border:none;border-left: 1px solid #d5d5d5;border-right: 1px solid #d5d5d5;border-bottom: 1px solid #d5d5d5"
              class="orderTable"
              ref="orderTable"
              :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',height: '36px'}"
              >
              <el-table-column
                align="center"
                width="85"
                label="商品品牌"
                prop="brandEnglishName"
              />
              <el-table-column
                align="center"
                width="85"
                label="商品编号"
                prop="goodsNoForBrand"
              />
              <el-table-column
                align="center"
                width="130"
                label="商品名称"
                prop="goodsEnglishName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="center"
                width="90"
                label="商品规格"
                prop="specificationChinese"
                show-overflow-tooltip
              />
              <el-table-column
                align="center"
                width="220"
                class-name="units-wrap"
                label="装箱规格"
                prop="packingSpecification"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.packingSpecification.replace(/[^0-9]/ig,"")}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.packingSpecification.replace(/[0-9]/ig,"")}}</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" width="90" label="国内零售价">
                <template slot-scope="scope">
                  <span>{{ scope.row.symbol }} {{ scope.row.unitPrice }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                class-name="units-wrap"
                width="140"
                label="订货数量"
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
               <el-table-column
                align="center"
                width="85"
                label="起始折扣"
                prop="goodsNo"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.initialDiscount}}%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" :label="$t('price.orderDiscount')" show-overflow-tooltip>
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
                  <span>{{ scope.row.symbol }} {{(scope.row.unitPrice * scope.row.finalDiscount/100).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="140"
                :label="$t('order.orderAmount')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.symbol }} {{scope.row.orderPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :label="$t('order.thirtyPercentDeposit')"
                width="130"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.symbol }} {{scope.row.earnestAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                <template slot-scope="scope">
                  <span>{{ scope.row.symbol }} {{ scope.row.surplusAmount }}</span>
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
  import '@/styles/address-table.scss';

  export default {
    components: {},
    props: {
      currentRow: {
        type: Object,
      },
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
          },
        ],
        listLoading: false,
        payWay: '1',
        order: {
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
        },
        symbol: null,
      }
    },
    methods: {
      getList() {
        request({
          url: "/order/orderDetail.do",
          method: "post",
          data: { orderNo: this.currentRow.orderNo }
        }).then(res => {
          this.orderDetail = res.data;
//          this.symbol = this.currentRow.symbol
          this.orderDetail.goodList.forEach((e, i) => {
//            e.unitPrice = this.currentRow.unitPrice
          })
        });
      },
      arraySpanMethod_replenishment({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == this.replenishmentList.length - 1) {
          if (columnIndex == 1) {
            return {
              rowspan: 1,
              colspan: 8
            }
          } else if (columnIndex == 8) {
            return {
              rowspan: 1,
              colspan: 4
            }
          } else if (columnIndex == 12) {
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
      arraySpanMethod_replenishment1({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == this.replenishmentList.length - 1) {
          if (columnIndex == 1) {
            return {
              rowspan: 1,
              colspan: 7
            }
          } else if (columnIndex == 7) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else if (columnIndex == 9) {
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
    },
    created() {
      this.getList()
    },
  }
</script>

<style scoped lang="scss">
  .orderTable .el-col {
    border-right: none;
  }
</style>
