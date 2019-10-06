<template>
  <div class="app-container">
    <h2 :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">中断订货</h2>
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
            <el-col :span="3">
              <div class="grid-content bg-purple">受益人账户</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">收款名称</div>
            </el-col>
            <el-col :span="4">
            <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">收款地址</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple"></div>
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
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">汇款人账户</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">汇款名称</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">汇款地址</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple"></div>
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
          <div class="filter-container" style="padding-bottom: 0">
            <el-table key='replenishment' :data="order.replenishmentList" border fit
                      size="mini" :show-header="false"
                      style="width: 100%;border: 1px solid #d5d5d5;border-top:none;border-left-width: 2px"
                      :span-method="arraySpanMethod"
                      class="orderTable" ref="replenishmentTable"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}"
                      :cell-style="summaryCellStyle" :cell-class-name="summaryCellClass">
              <el-table-column align="center" width="85" label="商品品牌" prop="brandName" />
              <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
                <template slot-scope="scope">
                  <el-popover v-if="scope.$index===order.replenishmentList.length-2&&currentRow.order_status==-50"
                              placement="right" title="" width="280" trigger="click"
                  >
                    <div class="text-muted">
                      <p>{{'支付订金时间：' + orderDetail.payEarnestTime}}</p>
                      <p>{{'完成备货时间：' + orderDetail.completeStockUpTime}}</p>
                      <p>{{'中断订货时间：' + orderDetail.cancelOrderTime}}</p>
                    </div>
                    <el-button slot="reference" type="primary">操作时间记录</el-button>
                  </el-popover>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1">{{ '原因: ' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName">
                <template slot-scope="scope">
                  <span>渠道商超过期限未付余款，订货终止，订金不予退回。</span>
                </template>
              </el-table-column>
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
                <el-table-column align="center" width="100" label="装箱规格" prop="refundTitleHead">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1">{{ '退款说明: ' }}</span>
                    <span v-else>{{scope.row.packingUnit}} 瓶/箱</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')" prop="tips">
                <template slot-scope="scope">
                  <!--<span>渠道商超过期限未付余款，订货终止，订金不予退回。</span>-->
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
                  <!--<div v-if="scope.$index===order.replenishmentList.length-2" class="text-total">{{-->
                  <!--currentRow.channelClassify!==2?-->
                  <!--'已付货款+跨境税金' : '70%余款' }} :-->
                  <!--</div>-->
                  <span v-if="scope.$index===order.replenishmentList.length-2&&currentRow.orderStatus===15" class="text-total">{{ '待退货款：' }}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-2&&currentRow.orderStatus===16" class="text-total">{{ '已退货款：' }}</span>
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
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">{{ '合计： ' }}</span>

                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.packingUnit).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">￥ {{ currentRow.total_channel_amount }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">￥ {{ currentRow.total_earnest_amount }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.3).toFixed(2)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>

      </div>

    </div>

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
    data() {
      return {
        list: [],
        replenishmentList: [],
        orderDetail: {}, // 存放订货表格数据
        haveReplenishment: false,
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
        tableHeight: 0,
        rowLength: 0
      }
    },
    methods: {
      getList() {
        request({
          url: "/order/orderDetail.do",
          method: "post",
          data: { orderNo: this.currentRow.order_no }
        }).then(res => {
          this.orderDetail = res.data;
          this.orderDetail.goodList.forEach((item, index, arr) => {
            this.orderBoxNumTotal += item.orderBoxNum
          })
        });
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.order.replenishmentList.length - 2) {
          if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 10
            }
          } else if (columnIndex >= 10) {
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
              colspan: 1
            }
          } else if (columnIndex === 2) {
            return {
              rowspan: 1,
              colspan: 12
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      summaryCellStyle({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 1 && rowIndex == 0) {
          return { textAlign: 'left' }
        }
        else if (column.property == 'goodsChineseName') {
          return { textAlign: 'left' }
        }
        else if (column.property == 'tips') {
          return { textAlign: 'left' }
        }
        else if (column.property == 'tipsRight') {
          return { textAlign: 'right' }
        }
      },
      summaryCellClass({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 1 && rowIndex == 1) {
          return 'fake-table-head'
        }
        else if (column.property == 'refundTitleHead') {
          return 'fake-table-head'
        }
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
      this.$nextTick(() => {

        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'].$el.offsetHeight

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth

        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 3].cells[0].style.textAlign = 'right'
        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 3].cells[1].style.textAlign = 'right'
        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 2].cells[0].style.textAlign = 'left'
        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 2].cells[1].style.textAlign = 'right'
        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[0].style.textAlign = 'left'

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
</style>
