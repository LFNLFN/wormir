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

      <div class="zh-msg">
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

      <div class="en-msg">
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

      <div class="shipment-msg">
        <el-row>
          <el-col :span="4"><span>快递公司：</span></el-col>
          <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
          <el-col :span="8"><span>{{ '顺丰快递' }}</span></el-col>
          <el-col :span="4"><span>快递单号：</span></el-col>
          <el-col :span="8"><span>{{ '69056455678' }}</span></el-col>
        </el-row>
      </div>

      <div class="sendTime-msg">
        <el-row class="no-border-bottom">
          <el-col :span="0"></el-col>
          <el-col :span="24">
            <span class="text-muted">{{ '确认发货时间：2018-4-14  23：48：56' }}</span>
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
        submitLoading: false,
        tableHeight: 0,
        productType: 'less',
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
</style>
