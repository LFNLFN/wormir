<template>
  <div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="箱码/商品码/操作账号"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>
    <el-table :data="brandList" border fit highlight-current-row
        v-loading="brandListLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%;"
    class="no-border-bottom border-left2 border-top2">
      <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
      <el-table-column align="center" label="品牌名称（英文）" prop="brandEnglishName" />
      <el-table-column align="center" label="品牌名称（中文）" prop="brandChineseName" />
      <el-table-column align="center" label="商品名称（英文）" prop="goodsEnglishName" />
    </el-table>
    <el-table :data="list" border fit highlight-current-row
        v-loading="listLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%"
              class="no-border-bottom no-border-top border-left2">
      <el-table-column align="center" :label="$t('product.productCode')" prop="goodsNoForBrand"/>
      <el-table-column align="center" label="商品名称（中文）" prop="goodsChineseName" />
      <el-table-column align="center" label="商品规格" prop="specificationChinese" />
      <el-table-column align="center" :label="$t('order.packageSpecification')" prop="packageSpecificationZh" />
      <el-table-column align="center" label="箱型编号" prop="cartonSizeId" />
      <el-table-column align="center" label="箱子尺寸" width="160">
        <template slot-scope="scope">
          {{ cartonSize(scope.row.cartonParam) }}
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="prodcutCodeList" size="mini"
              border fit highlight-current-row
              :summary-method="getSummaries" show-summary
        v-loading="productListLoading" element-loading-text="给我一点时间"
              :header-cell-style="{padding: 0}"
              style="width: 100%"
              class="no-border-top border-left2"
              :span-method="objectSpanMethod"
              :max-height="500"
              >
      <el-table-column align="center" label="已入库" >
        <el-table-column align="center" label="箱码" prop="boxCode"/>
        <el-table-column align="center" label="商品码" prop="sourceCode"/>
        <el-table-column align="center" label="入库时间" >
          <template slot-scope="scope">{{scope.row.warehouseEntryTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作账号" prop="createUserId"/>
        <el-table-column align="center" label="装箱数量">
          <el-table-column align="center" label="(units)">
            <template slot-scope="scope">
              {{ scope.row.goodsNum / list[0].packageSpecificationZh.replace(/[^0-9]/ig, '') }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="商品数量">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="goodsNum"/>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves'
// import { goodsSourceCodeJxcList } from '@/api/stock'
import { parseTime } from '@/utils'

export default {
  name: 'inventoryDetrails',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  directives: {
    waves
  },
  created() {
    this.list[0] = this.product
    this.brandList[0] = this.product
    this.getProdcutCodeList()
  },
  data() {
    return {
      brandList: [],
      list: [],
      prodcutCodeList: [],
      spanArr: [],
      listQuery: {
        keyword: ''
      },
      downloadLoading: false,
      deleteLoading: false,
      boxCode: 12345678,
      brandListLoading: false,
      listLoading: false,
      productListLoading: false
    }
  },
  computed: {
    sumPackingQuantity() {
      let sellingUnit = this.list[0].packageSpecificationZh.replace(/[^0-9]/ig, '')
      var totalAmount = 0
      for (var i = 0; i < this.prodcutCodeList.length; i++) {
        if (i === 0) {
          totalAmount += this.prodcutCodeList[i].goodsNum / sellingUnit
        } else if (this.prodcutCodeList[i].boxCode !== this.prodcutCodeList[i - 1].boxCode) {
          totalAmount += this.prodcutCodeList[i].goodsNum / sellingUnit
        }
      }
      return totalAmount
    },
    sumproductQuantity() {
      var totalAmount = 0
      for (var i = 0; i < this.prodcutCodeList.length; i++) {
        if (i === 0) {
          totalAmount += this.prodcutCodeList[i].goodsNum
        } else if (this.prodcutCodeList[i].boxCode !== this.prodcutCodeList[i - 1].boxCode) {
          totalAmount += this.prodcutCodeList[i].goodsNum
        }
      }
      return totalAmount
    }
  },
  methods: {
    getParseTime(date) {
      return parseTime(date)
    },
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i == 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].boxCode == data[i - 1].boxCode) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 1) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getProdcutCodeList(goodsNo, cartonSizeId) {
      this.prodcutCodeListst = []
      this.spanArr = []
      this.productListLoading = true

      this.$request({
        url: '/goods/inventoryDetail.do',
        method: 'post',
        data: {
          goodsNo: this.product.goodsNo,
//          propertyOfSale: this.listQuery.propertyOfSale
        }
      }).then((res) => {
        this.prodcutCodeList = res.data.items
        this.getSpanArr(this.prodcutCodeList)
        this.productListLoading = false
      }).catch(() => {
        this.$message.error('Error');
        this.productListLoading = false
      })


//      goodsSourceCodeJxcList(goodsNo, cartonSizeId).then(response => {
//        const itemList = response.data.items
//        itemList.forEach(item => {
//          this.prodcutCodeList.push({
//            'boxCode': item.boxCode,
//            'sourceCode': item.sourceCode,
//            'warehouseEntryTime': item.createTime,
//            'cartonCount': 1,
//            'goodsNum': 0,
//            'createUserId': response.data.createUserId
//          })
//        })
//        this.productListLoading = false
//        this.getSpanArr(this.prodcutCodeList)
//        this.prodcutCodeList.forEach(element => {
//          element.goodsNum = this.spanArr[this.prodcutCodeList.indexOf(element)]
//        })
//      })
    },
    handleFilter() {
    },
    handleDelete(boxCode, status) {
      this.$message({
        message: 'Delete Succeed',
        type: 'success'
      })
    },
    handleProductCodeDelete(productCode, status) {
      this.$message({
        message: 'Delete Succeed',
        type: 'success'
      })
    },
    submit() {
      this.$confirm(this.$t('product.submitPackingAndInventory'), '', {
        confirmButtonText: this.$t('product.keepPacking'),
        cancelButtonText: this.$t('product.close'),
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Submit succeed!'
        })
      })
    },
    getSummaries(param) {
      var boxCodeList = []
      for (var i = 0; i < this.prodcutCodeList.length; i++) {
        boxCodeList.push(this.prodcutCodeList[i].boxCode)
      }
      const sums = []
      sums[0] = Array.from(new Set(boxCodeList)).length
      sums[1] = this.prodcutCodeList.length
      sums[4] = this.sumPackingQuantity
      sums[5] = this.sumproductQuantity
      return sums
    },
    cartonSize(cartonParam) {
      let cartonSizeStr = ''
      for (let key in cartonParam) {
        if (key == 'id' || key == 'cartonNo') {
          continue
        }
        if (key != 'weight') {
          cartonSizeStr += [key] + ':' + cartonParam[key] + 'cm' + '\n'
        } else {
          cartonSizeStr += [key] + ':' + cartonParam[key] + 'kg'
        }
      }
      return cartonSizeStr
    },
  }
}
</script>

<style scoped>

</style>

