<template>
  <div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" :placeholder="$t('product.holdInventorySearch')"
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
      <el-table-column align="center" :label="$t('product.productName')" prop="englishName" />
      <el-table-column align="center" :label="$t('product.size')" prop="capacityEnglish" />
      <el-table-column align="center" :label="$t('order.packageSpecification')" prop="packageSpecification" />
      <el-table-column align="center" :label="$t('order.cartonType')" prop="cartonType" />
      <el-table-column align="center" :label="$t('product.cartonSize')" prop="cartonSize" />
      <el-table-column align="center" :label="$t('product.onHoldInventory')" >
        <el-table-column align="center" :label="$t('product.productQuantityAll')" >
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="productQuantity" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.unitsQuantity')" >
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="unitsQuantity" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.individualProductQuantity')" >
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="individualProductQuantity" />
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table :data="prodcutCodeList" border fit highlight-current-row
        v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" :label="$t('product.inventoryOrderNo')" prop="inventoryOrderNo" />
      <el-table-column align="center" :label="$t('product.onHoldInventory')" >
        <el-table-column align="center" :label="$t('product.unitsQuantity')" >
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="onHoldUnitsQuantity" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.individualProductQuantity')" >
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="onHoldindividualProductQuantity" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.devanningQuantity')" >
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="devanningQuantity" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.devanningIndividualProductQuantity')" >
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="devanningIndividualProductQuantity" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.inventoryOnHoldTime')" prop="inventoryOnHoldTime"/>
        <el-table-column align="center" :label="$t('product.operationID')" prop="operationID"/>
      </el-table-column>
      <el-table-column align="center" :label="$t('product.cancelInventory')" >
        <el-table-column align="center" :label="$t('product.unitsQuantity')" >
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="cancelUnitsQuantity" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.individualProductQuantity')" >
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="cancelIndividualProductQuantity" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.cancelTime')" prop="cancelTime"/>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'holdInventory',
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
  },
  data() {
    return {
      brandList: [],
      list: [],
      prodcutCodeList: [
        {
          inventoryOrderNo: 'sdf1234123412341',
          operationID: 'a123',
          onHoldUnitsQuantity: 10,
          onHoldindividualProductQuantity: 20,
          devanningQuantity: 2,
          devanningIndividualProductQuantity: 1,
          inventoryOnHoldTime: '2018-08-01 10:00:00',
          cancelUnitsQuantity: 0,
          cancelIndividualProductQuantity: 2,
          cancelTime: '2018-08-01 09:00:00'
        },
        {
          inventoryOrderNo: 'sdf1234asdf2341',
          operationID: 'a123',
          onHoldUnitsQuantity: 10,
          onHoldindividualProductQuantity: 20,
          devanningQuantity: 3,
          devanningIndividualProductQuantity: 2,
          inventoryOnHoldTime: '2018-08-01 10:00:00',
          cancelUnitsQuantity: 1,
          cancelIndividualProductQuantity: 2,
          cancelTime: '2018-08-01 09:00:00'
        }
      ],
      listQuery: {
        keyword: ''
      },
      downloadLoading: false,
      deleteLoading: false,
      boxCode: 12345678,
      listLoading: false,
      brandListLoading: false
    }
  },
  methods: {
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
    }
  }
}
</script>
<style>
  .el-table .cell {
    word-break: break-word;
  }
</style>

