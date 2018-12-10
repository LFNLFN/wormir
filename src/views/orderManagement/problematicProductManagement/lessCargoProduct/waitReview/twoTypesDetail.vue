<template>
  <div>
    <div class="theBorder">
      <el-row>
        <el-col :span="4"><span>补货单号: </span></el-col>
        <!--<el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>-->
        <el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="4" :style="{height : tableHeight+'px'}"><span>破损/少货商品明细: </span></el-col>
        <el-col :span="20" style="padding-left: 0">
          <div style="width:100%;display: block">

            <el-table key='1' :data="currentRow.cargoShortageDetailsList" ref="topSumTable"
                      v-loading="cargoShortageDetailsListLoading"
                      element-loading-text="给我一点时间"
                      border fit highlight-current-row size="mini"
                      style="width: 100%;border: none;display: block">
              <el-table-column align="center" label="商品品牌" prop="brandEnglishName"/>
              <el-table-column align="center" label="商品编号" prop="goodsNo"/>
              <el-table-column align="center" :label="$t('product.productName')" prop="goodsChineseName"/>
              <el-table-column align="center" :label="$t('table.productSpec')" prop="goodsSpecification"/>
              <el-table-column align="center" label="少货数量" prop="cargoShortageQuantity" class-name="last-col-td0"/>
            </el-table>

            <el-table key='2' :data="currentRow.damageDetailsList" ref="bottomSumTable"
                      v-loading="cargoShortageDetailsListLoading"
                      element-loading-text="给我一点时间"
                      border fit highlight-current-row size="mini"
                      :summary-method="getSummaries" show-summary
                      style="width: 100%;border: none;display: block">
              <el-table-column align="center" label="商品品牌" prop="brandEnglishName"/>
              <el-table-column align="center" label="商品编号" prop="goodsNo"/>
              <el-table-column align="center" :label="$t('product.productName')" prop="goodsChineseName"/>
              <el-table-column align="center" :label="$t('table.productSpec')" prop="goodsSpecification"/>
              <el-table-column align="center" label="破损数量" prop="damageQuantity" class-name="last-col-td0"/>
            </el-table>
          </div>
        </el-col>
      </el-row>

      <el-row class="no-border-bottom">
        <el-col :span="4" style="min-height: 56px"><span>现场照片: </span></el-col>
        <el-col :span="20"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                                height="48px" width="48px"
                                                                                class="link-type"></span></el-col>
      </el-row>
    </div>

    <div class="dialogBottomButton-wrap">
      <el-button type="primary" disabled>审核中</el-button>
    </div>

    <!-- viewImage -->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>
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
            damageDetailsList: [
              {
                brandEnglishName: 'LANCOM',
                goodsNo: '1001',
                goodsChineseName: '兰蔻',
                goodsSpecification: '30毫升/支',
                damageQuantity: 2
              },
              {
                brandEnglishName: 'LANCOM',
                goodsNo: '1001',
                goodsChineseName: '兰蔻',
                goodsSpecification: '30毫升/支',
                damageQuantity: 2
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
        tableHeight: 0
      }
    },
    computed: {
      twoTableTotal() {
        let twoTableTotal = 0
        this.currentRow.cargoShortageDetailsList.forEach((item, index) => {
          twoTableTotal += item.cargoShortageQuantity
        })
        this.currentRow.damageDetailsList.forEach((item, index) => {
          twoTableTotal += item.damageQuantity
        })
        return twoTableTotal
      }
    },
    methods: {
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = ' '
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
          }
        })

        return sums
      },
    },
    mounted() {
      window.setTimeout(() => {
        this.$refs['bottomSumTable'].$el.children[3].children['0'].children[1].children['0'].cells[3].children['0'].innerHTML = `<div style="display: flex;justify-content: flex-end"><span>合计:</span></div>`

        this.$refs['bottomSumTable'].$el.children[3].children['0'].children[1].children['0'].cells[4].children['0'].innerHTML = this.twoTableTotal

        this.tableHeight = this.$refs['topSumTable'].$el.offsetHeight + this.$refs['bottomSumTable'].$el.offsetHeight
      }, 100)
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
