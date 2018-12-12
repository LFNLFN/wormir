<template>
  <div>
    <div class="theBorder">
      <el-row>
        <el-col :span="4"><span>补货单号: </span></el-col>
        <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
        <el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><span>渠道号: </span></el-col>
        <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
        <el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>
      </el-row>

      <div class="zh-msg" v-if="'国内交易'">
        <el-row>
          <el-col :span="4"><span>地址: </span></el-col>
          <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
          <el-col :span="20"><span>{{ '广州番禺广场' }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>联系人: </span></el-col>
          <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
          <el-col :span="8"><span>{{ '王小虎' }}</span></el-col>
          <el-col :span="4"><span>联系电话: </span></el-col>
          <el-col :span="8"><span>{{ '13456455678' }}</span></el-col>
        </el-row>
      </div>

      <div class="en-msg" v-if="'香港交易'">
        <el-row>
          <el-col :span="4"><span>Address:</span></el-col>
          <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
          <el-col :span="20"><span>{{ '广州番禺广场' }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>Consignee's Name::</span></el-col>
          <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
          <el-col :span="20"><span>{{ '王小虎' }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>Contact:</span></el-col>
          <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
          <el-col :span="8"><span>{{ 'qwe@qq.com' }}</span></el-col>
          <el-col :span="4"><span>Tel:</span></el-col>
          <el-col :span="8"><span>{{ '13456455678' }}</span></el-col>
        </el-row>
      </div>

      <div class="table-wrap">
        <el-table key='0' :data="cargoShortageDetailsList" ref="sumTable"
                  v-loading="cargoShortageDetailsListLoading"
                  element-loading-text="给我一点时间"
                  border fit highlight-current-row size="mini"
                  :span-method="arraySpanMethod"
                  style="width: 100%;border:none;display: block">
          <el-table-column align="center" label="商品品牌" prop="brandEnglishName">
            <template slot-scope="scope">
              <span v-if="scope.$index===cargoShortageDetailsList.length-1">{{ '合计：' }}</span>
              <span v-else>{{ scope.row.brandEnglishName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品编号" prop="goodsNo"/>
          <el-table-column align="center" :label="$t('product.productName')" prop="goodsChineseName"/>
          <el-table-column align="center" label="商品规格" prop="goodsSpecification"/>
          <el-table-column align="center" label="补货数量" prop="cargoShortageQuantity">
            <template slot-scope="scope">
              <span v-if="scope.$index===cargoShortageDetailsList.length-1">{{ cargoShortageQuantityTotal }}</span>
              <span v-else>{{ scope.row.cargoShortageQuantity }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="发货数量" prop="" class-name="last-col-td0">
            <el-table-column align="center" label="（箱）" prop="shipmentQuantity" class-name="last-col-td0">
              <template slot-scope="scope">
                <span v-if="scope.$index===cargoShortageDetailsList.length-1">{{ shipmentQuantityTotal }}</span>
                <span v-else>{{ scope.row.shipmentQuantity }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <div class="agreeTime-msg" v-if="'待补货'">
        <el-row class="no-border-bottom">
          <el-col :span="0"></el-col>
          <el-col :span="24">
            <span class="text-muted">{{ 同意申请时间：2018-4-14  23：48：56' }}</span>
          </el-col>
        </el-row>
      </div>

      <div class="shipment-msg" v-if="'待收货开始之后'">
        <el-row>
          <el-col :span="4"><span>快递公司：</span></el-col>
          <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
          <el-col :span="8"><span>{{ '顺丰快递' }}</span></el-col>
          <el-col :span="4"><span>快递单号：</span></el-col>
          <el-col :span="8"><span>{{ '69056455678' }}</span></el-col>
        </el-row>
      </div>

      <div class="sendTime-msg" v-if="'待收货开始之后'">
        <el-row class="no-border-bottom">
          <el-col :span="0"></el-col>
          <el-col :span="24">
            <span class="text-muted">{{ '确认发货时间：2018-4-14  23：48：56' }}</span>
          </el-col>
        </el-row>
      </div>

      <!--问题表格-->
      <div class="problem-product-wrap" v-if="'已收货'">
        <el-table :key='2' :data="problematicProduct" border fit ref="problematicTable"
                  v-loading="listLoading" element-loading-text="给我一点时间"
                  size="mini" style="width: 100%;" class="orderTable no-border-left no-border-bottom no-border-right"
                  :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',padding:0}">

          <el-table-column align="center" :label="$t('order.defectiveProduct')">
            <el-table-column align="center" label="商品编号"
                             prop="defectiveCode"></el-table-column>
            <el-table-column align="center" label="商品名称"
                             prop="defectiveDesc"></el-table-column>
          </el-table-column>
          <el-table-column align="center" :label="defective_product_num.toString()" ref="defeTotalCol">
            <el-table-column align="center" class-name="units-wrap" :label="$t('order.quantity')"
                             prop="defectiveQuantity">
              <template slot-scope="scope">
                <el-row style="padding-left: 0">
                  <el-col :span="12" style="display: flex;justify-content: center;padding-left: 0">
                    <span>{{scope.row.defectiveQuantity}}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center;padding-left: 0">
                    <span>箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table-column>


          <el-table-column align="center" :label="$t('order.damagedProduct')">
            <el-table-column align="center" label="商品编号"
                             prop="damagedCode"></el-table-column>
            <el-table-column align="center" label="商品名称"
                             prop="damagedDesc"></el-table-column>
          </el-table-column>
          </el-table-column>
          <el-table-column align="center" :label="damage_product_num.toString()">
            <el-table-column align="center" class-name="units-wrap" :label="$t('order.quantity')"
                             prop="damagedQuantity">
              <template slot-scope="scope">
                <el-row style="padding-left: 0">
                  <el-col :span="12" style="display: flex;justify-content: center;padding-left: 0">
                    <span>{{scope.row.damagedQuantity}}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center;padding-left: 0">
                    <span>箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table-column>


          <el-table-column align="center" :label="$t('order.lessCargoProduct')">
            <el-table-column align="center" label="商品编号"
                             prop="LessCargoCode"></el-table-column>
            <el-table-column align="center" label="商品名称"
                             prop="LessCargoDesc"></el-table-column>
          </el-table-column>
          <el-table-column align="center" :label="lessCargo_product_num.toString()" class-name="last-col-td0">
            <el-table-column align="center" class-name="units-wrap last-col-td0" :label="$t('order.quantity')" prop="LessCargoQuantity">
              <template slot-scope="scope">
                <el-row style="padding-left: 0">
                  <el-col :span="12" style="display: flex;justify-content: center;padding-left: 0">
                    <span>{{scope.row.LessCargoQuantity}}</span>
                  </el-col>
                  <el-col :span="12" style="display: flex;justify-content: center;padding-left: 0">
                    <span>箱</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table-column>


        </el-table>
      </div>
      <div class="receiveTime-msg">
        <el-row class="no-border-bottom">
          <el-col :span="0"></el-col>
          <el-col :span="24">
            <span class="text-muted">{{ '确认收货时间：2018-4-14  23：48：56' }}</span>
          </el-col>
        </el-row>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    props: {
      currentRow: {
        type: Object,
        default: function() {
          return {
            boxCode: 1111,
            compensationAmount: 1765,
            goodsNo: 123123,
            goodsName: '唇膏',
            brandEnglishName: 'LANCOM',
            channelClassify: 1,
            channelNo: 20001,
            compensation: 170,
            compensationStatus: 12,
            compensationType: 11,
            description: "Lancome (LANCOME) air cushion lip oil",
            mergePaymentNo: 857938502482,
            orderMethod: 20,
            orderNo: 10001,
            orderStatus: 10,
            proofImage:
              "http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg",
            cargoShortageDetailsList: [
              {
                brandEnglishName: 'LANCOM',
                goodsNo: '1001',
                goodsChineseName: '兰蔻',
                goodsSpecification: '30毫升/支',
                cargoShortageQuantity: 2
              },
              {
                brandEnglishName: 'LANCOM',
                goodsNo: '1001',
                goodsChineseName: '兰蔻',
                goodsSpecification: '30毫升/支',
                cargoShortageQuantity: 2
              },
            ],
          }
        }
      },
    },
    data() {
      return {
        cargoShortageDetailsListLoading: false,
        isViewImageShow: false,
        imageViewed: null,
        listLoading: false,
        submitLoading: false,
        tableHeight: 0,
        productType: 'less',
        defective_product_num: 3,
        damage_product_num: 4,
        lessCargo_product_num: 5,
        cargoShortageDetailsList: [
          {
            brandEnglishName: 'LANCOM',
            goodsNo: '1001',
            goodsChineseName: '兰蔻',
            goodsSpecification: '30毫升/支',
            cargoShortageQuantity: 2,
            shipmentQuantity: 1
          },
          {
            brandEnglishName: 'LANCOM',
            goodsNo: '1001',
            goodsChineseName: '兰蔻',
            goodsSpecification: '30毫升/支',
            cargoShortageQuantity: 2,
            shipmentQuantity: 3
          },
        ],
        problematicProduct: [
          {
            defectiveCode: 7356775,
            defectiveDesc: '弹力水润',
            defectiveQuantity: 3,
            damagedCode: 3365875,
            damagedDesc: '保湿精华',
            damagedQuantity: 4,
            LessCargoCode: 5456875,
            LessCargoDesc: '美白眼霜',
            LessCargoQuantity: 5
          }
        ],
      }
    },
    computed: {
      cargoShortageQuantityTotal() {
        let total = 0
        this.cargoShortageDetailsList.forEach((item, index, arr) => {
          if (index >= arr.length - 1) return false
          total += item.cargoShortageQuantity
        })
        return total
      },
      shipmentQuantityTotal() {
        let total = 0
        this.cargoShortageDetailsList.forEach((item, index, arr) => {
          if (index >= arr.length - 1) return false
          total += item.shipmentQuantity
        })
        return total
      }
    },
    methods: {
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },
      submitApplication() {
        this.$emit('closeDialog')
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.cargoShortageDetailsList.length - 1) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 4
            }
          } else if (columnIndex >= 4 && columnIndex <= 5) {
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
    },
    mounted() {
      this.cargoShortageDetailsList.push(
        {
          brandEnglishName: 'LANCOM',
          goodsNo: '1001',
          goodsChineseName: '兰蔻',
          goodsSpecification: '30毫升/支',
          cargoShortageQuantity: 2,
          shipmentQuantity: 1
        },
        {
          brandEnglishName: 'LANCOM',
          goodsNo: '1001',
          goodsChineseName: '兰蔻',
          goodsSpecification: '30毫升/支',
          cargoShortageQuantity: 2,
          shipmentQuantity: 1
        }
      )

      window.setTimeout(() => {
        this.$refs['sumTable'].$el.children[2].children["0"].children[1].children[this.cargoShortageDetailsList.length - 1].cells[0].style.textAlign = 'right'

        this.$refs['problematicTable'].$el.children[1].children[0].children[1].children[0].cells[1].attributes.style.nodeValue += 'background-color: transparent!important'
        this.$refs['problematicTable'].$el.children[1].children[0].children[1].children[0].cells[3].attributes.style.nodeValue += 'background-color: transparent!important'
        this.$refs['problematicTable'].$el.children[1].children[0].children[1].children[0].cells[5].attributes.style.nodeValue += 'background-color: transparent!important'
      }, 10)

    }
  }
</script>

<style lang="scss" scoped>
  .el-col:nth-of-type(even) {
    padding-left: 1em;
  }

  .theBorder {
    border: solid #d5d5d5 2px;

  &
  .el-row {
    border-bottom: solid #d5d5d5 1px;
    margin-bottom: 0;
  }

  }
  .el-row {
    margin: 0;
  }

  .el-col:nth-of-type(odd):not(.text-muted) div {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .el-col:nth-of-type(even) div {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
    background-color: transparent;
    font-weight: normal;
  }

  .el-col:nth-child(odd) {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
  }

  .el-col:nth-child(even) {
    color: #424242;
    display: flex;
    align-items: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
  }

  .el-col:last-of-type {
    border-right: none;
  }

  .el-col:only-of-type {
    border-right: none;
  }

  .units-wrap .el-col {
    border: none;
    background-color: transparent;
    font-weight: normal;
  }

  .units-wrap .el-row {
    border: none;
    background-color: transparent;
    font-weight: normal;
  }
</style>
