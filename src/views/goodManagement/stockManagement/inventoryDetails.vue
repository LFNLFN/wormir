<template>
  <div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" :placeholder="$t('product.inventoryDetailSearch')"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>
    <el-table :data="brandList" border fit highlight-current-row
        v-loading="brandListLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
      <el-table-column align="center" label="品牌名称（中文）" prop="brandChineseName" />
      <el-table-column align="center" label="品牌名称（英文）" prop="brandEnglishName" />
      <el-table-column align="center" label="商品名称（中文）" prop="goodsChineseName" />
    </el-table>
    <el-table :data="list" border fit highlight-current-row
        v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" :label="$t('product.productCode')" prop="goodsNo"/>
      <el-table-column align="center" :label="$t('product.productName')" prop="goodsEnglishName" />
      <el-table-column align="center" :label="$t('product.size')" prop="goodsSpecificationEnglish" />
      <el-table-column align="center" :label="$t('order.packageSpecification')" prop="cartonSpecification" />
      <el-table-column align="center" :label="$t('order.cartonType')" prop="cartonSizeId" />
      <el-table-column align="center" :label="$t('product.cartonSize')" prop="boxSize" />
    </el-table>
    <el-table :data="prodcutCodeList" border fit highlight-current-row :summary-method="getSummaries" show-summary
        v-loading="productListLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" :span-method="objectSpanMethod">
      <el-table-column align="center" :label="$t('product.inStock')" >
        <el-table-column align="center" :label="$t('product.boxCode')" prop="boxCode"/>
        <el-table-column align="center" :label="$t('product.productCodeAll')" prop="sourceCode"/>
        <el-table-column align="center" :label="$t('product.stockEntryTime')" >
          <template slot-scope="scope">{{getParseTime(scope.row.warehouseEntryTime)}}</template></el-table-column>
        <el-table-column align="center" :label="$t('product.operationID')" prop="createUserId"/>
        <el-table-column align="center" :label="$t('product.packingQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="cartonCount"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.productQuantityAll')">
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
    console.log(this.product)
    this.getProdcutCodeList(this.product.goodsNo, this.product.cartonSizeId)
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
      var totalAmount = 0
      for (var i = 0; i < this.prodcutCodeList.length; i++) {
        if (i === 0) {
          totalAmount += this.prodcutCodeList[i].cartonCount
        } else if (this.prodcutCodeList[i].boxCode !== this.prodcutCodeList[i - 1].boxCode) {
          totalAmount += this.prodcutCodeList[i].cartonCount
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
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].boxCode === data[i - 1].boxCode) {
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
      // this.productListLoading = true
      // goodsSourceCodeJxcList(goodsNo, cartonSizeId).then(response => {
      //   const itemList = response.data.items
      //   itemList.forEach(item => {
      //     console.log(this.spanArr[itemList.indexOf(item)])
      //     this.prodcutCodeList.push({
      //       'boxCode': item.boxCode,
      //       'sourceCode': item.sourceCode,
      //       'warehouseEntryTime': item.createTime,
      //       'cartonCount': 1,
      //       'goodsNum': 0,
      //       'createUserId': response.data.createUserId
      //     })
      //   })
      //   this.productListLoading = false
      //   this.getSpanArr(this.prodcutCodeList)
      //   this.prodcutCodeList.forEach(element => {
      //     element.goodsNum = this.spanArr[this.prodcutCodeList.indexOf(element)]
      //  })
      // })
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
    }
  }
}
</script>
<style>
  .el-table .cell {
    word-break: break-word;
  }
</style>

