<template>
  <div>
    <div style="text-align: center"><h3>订货单</h3></div>
    <div class="rowFlex">
      <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">货单号:</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ 10008 }}</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">渠道号:</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">{{ 1 }}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">运输方式</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ '空运' }}</div>
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
    </div>

    <div class="rowFlex">
      <div class="brand-col">
        <div class="col-head border-bottom border-top1 border-left2 ">商品品牌</div>
        <div class="col-content border-left2 border-bottom2"
             :style="{height: tableHeight-37+'px'}">
          <span>AESOP</span>
        </div>
      </div>
      <div class="twoTable-wrap border-top1">
        <!--订货表格-->
        <div class="filter-container" style="padding-bottom: 0">
          <el-table key='productList' :data="order.orderSubs || []"
                    border fit size="mini"
                    style="width: 100%;border:none;border-left: 1px solid #d5d5d5;"
                    class="orderTable" ref="orderTable"
                    :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700'}">
            <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
              <template slot-scope="scope">
                <span>{{scope.row.goodsNo}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.goodsChineseName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="90" :label="$t('product.productSpecification')"
                             prop="specificationChinese" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.specificationChinese}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="220" class-name="units-wrap"
                             :label="$t('order.packageSpecification')" prop="packingSpecification"
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
            <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
              <template slot-scope="scope">
                <span>{{scope.row.supplyCurrencySymbol}}{{scope.row.supplyPrice.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" class-name="units-wrap" :label="$t('order.orderQuantity')">
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
            <el-table-column align="center" width="120" class-name="units-wrap"
                             label="发货数量">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>{{ scope.row.orderQuantity }}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" width="85" label="发货箱号" prop="goodsNo">
              <template slot-scope="scope">
                <span>{{scope.row.goodsNo}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--补货表格-->
        <div class="filter-container">
          <el-table key='replenishment' :data="order.replenishmentList" border fit
                    size="mini"
                    style="width: 100%"
                    class="orderTable border-left border-bottom no-border-right no-border-top" ref="replenishmentTable"
                    :span-method="arraySpanMethod"
                    :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">

            <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
              <template slot-scope="scope">
                <span v-if="scope.$index===order.replenishmentList.length-1" class="text-muted"></span>
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
                <span v-if="scope.$index===order.replenishmentList.length-1">{{ '合计: ' }}</span>
                <span v-else>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" class-name="units-wrap"
                             :label="$t('order.replenishmentQuantity')">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span v-if="scope.$index===order.replenishmentList.length-1"
                          style="color:gray">{{ cartonTotal }}</span>
                    <span v-else style="color:gray">{{ scope.row.replenishmentQuantity }}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" width="120" class-name="units-wrap"
                             label="收货数量">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span v-if="scope.$index===order.replenishmentList.length-1"
                          style="color:gray">{{ cartonTotal }}</span>
                    <span v-else style="color:gray">{{ scope.row.replenishmentQuantity }}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center">
                    <span>箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" width="85" label="收货箱号" prop="goodsNo">
              <template slot-scope="scope">
                <span v-if="scope.$index===order.replenishmentList.length-1"></span>
                <span v-else>{{scope.row.goodsNo}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="brand-col">
        <div class="col-head border-bottom border-right2 border-top1 qr-col">出库时间</div>
        <div class="col-content qr-col"
             :style="{ height: tableHeight-37+'px', borderBottom: '2px solid #d5d5d5', borderRight: '2px solid #d5d5d5', color: '#000', fontSize: '16px' }">
          <span style="margin: 1em 0">2019-12-12</span>
          <img :src="img_qrcode" alt="" width="90">
          <span>请扫码收货</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import img_qrcode from '@/assets/qrcode.png'

  export default {
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
          else if (columnIndex > 8 && columnIndex < 10) {
            return {
              rowspan: 1,
              colspan: 1
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

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth + window.document.getElementsByClassName('brand-col')[0].offsetWidth + window.document.getElementsByClassName('qr-col')[0].offsetWidth

        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[0].style.textAlign = 'left'
        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[1].style.textAlign = 'right'
//        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[3].style.textAlign = 'right'

      }, 100)
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
