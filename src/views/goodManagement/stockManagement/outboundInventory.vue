<template>
  <div>
    <div style="width: 100%; float: left" >
    <el-table :data="brandList" border fit highlight-current-row
        v-loading="brandListLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
      <el-table-column align="center" label="品牌名称（中文）" prop="brandChineseName" />
      <el-table-column align="center" label="品牌名称（英文）" prop="brandEnglishName" />
      <el-table-column align="center" label="商品名称（中文）" prop="goodsChineseName" />
    </el-table>
    <el-table :data="list" border fit highlight-current-row
        v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 50%; float: left" >
      <el-table-column align="center" :label="$t('product.productCode')" prop="goodsNo"/>
      <el-table-column align="center" :label="$t('product.productName')" prop="englishName" />
      <el-table-column align="center" :label="$t('product.size')" prop="capacityEnglish" />
      <el-table-column align="center" :label="$t('order.packageSpecification')" prop="packageSpecification" />
      <el-table-column align="center" :label="$t('order.cartonType')" prop="cartonType" />
      <el-table-column align="center" :label="$t('product.cartonSize')" prop="cartonSize" />
    </el-table>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" :placeholder="$t('product.inventoryDetailSearch')"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>
    </div>
    <el-table class="empty-table" :data="emptyList" border fit highlight-current-row
        v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" :label="$t('product.inStock')" >
        <el-table-column align="center" :label="$t('product.boxCode')"/>
        <el-table-column align="center" :label="$t('product.productCodeAll')"/>
        <el-table-column align="center" :label="$t('product.unitsQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.productQuantityAll')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.inventoryStatus')"/>
      </el-table-column>
      <el-table-column align="center" :label="$t('product.outbound')" >
        <el-table-column align="center" :label="$t('product.unitsQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.devanningQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.individualQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.inventoryStatus')"/>
        <el-table-column align="center" :label="$t('product.operationID')" />
        <el-table-column align="center" :label="$t('product.outbound')" >
          <el-table-column align="center" :label="$t('order.orderNo')" />
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" :label="$t('product.outboundInventory')" >
        <el-table-column align="center" :label="$t('product.productQuantityAll')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.unitsQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" />
        </el-table-column>
        <el-table-column align="center" :label="$t('product.individualProductQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" />
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-row :gutter="5" style="width: 100%" >
      <el-col align="center"><div class="grid-content bg-purple">Full Unit</div></el-col>
    </el-row>
    <el-table :data="fullUnitList" border fit highlight-current-row :show-header="false"
        v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" :label="$t('product.inStock')" >
        <el-table-column align="center" :label="$t('product.boxCode')" prop="boxCode"/>
        <el-table-column align="center" :label="$t('product.productCodeAll')" prop="productCode"/>
        <el-table-column align="center" :label="$t('product.unitsQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="inStockUnitsQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.productQuantityAll')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="inStockProductQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.inventoryStatus')" prop="inventoryStatus"/>
      </el-table-column>
      <el-table-column align="center" :label="$t('product.outbound')" >
        <el-table-column align="center" :label="$t('product.unitsQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="outboundUnitsQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.devanningQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="outboundDevanningQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.individualQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="outboundindividualQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.inventoryStatus')" prop="inventoryStatus"/>
        <el-table-column align="center" :label="$t('product.operationID')" prop="operationID"/>
        <el-table-column align="center" :label="$t('product.outbound')" >
          <el-table-column align="center" :label="$t('order.orderNo')" prop="orderNo"/>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" :label="$t('product.outboundInventory')" >
        <el-table-column align="center" :label="$t('product.productQuantityAll')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="outboundInventoryProductQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.unitsQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="outboundInventoryUnitsQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.individualProductQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="individualProductQuantity"/>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-row :gutter="5" style="width: 100%" >
      <el-col align="center"><div class="grid-content bg-purple">Devanning</div></el-col>
    </el-row>
    <el-table :data="devanningList" border fit highlight-current-row :summary-method="getSummaries" show-summary
      :show-header="false"  v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" :label="$t('product.inStock')" >
        <el-table-column align="center" :label="$t('product.boxCode')" prop="boxCode"/>
        <el-table-column align="center" :label="$t('product.productCodeAll')" prop="productCode"/>
        <el-table-column align="center" :label="$t('product.unitsQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="inStockUnitsQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.productQuantityAll')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="inStockProductQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.inventoryStatus')" prop="inventoryStatus"/>
      </el-table-column>
      <el-table-column align="center" :label="$t('product.outbound')" >
        <el-table-column align="center" :label="$t('product.unitsQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="outboundUnitsQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.devanningQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="outboundDevanningQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.individualQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="outboundindividualQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.inventoryStatus')" prop="inventoryStatus"/>
        <el-table-column align="center" :label="$t('product.operationID')" prop="operationID"/>
        <el-table-column align="center" :label="$t('product.outbound')" >
          <el-table-column align="center" :label="$t('order.orderNo')" prop="orderNo"/>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" :label="$t('product.outboundInventory')" >
        <el-table-column align="center" :label="$t('product.productQuantityAll')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="outboundInventoryProductQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.unitsQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="outboundInventoryUnitsQuantity"/>
        </el-table-column>
        <el-table-column align="center" :label="$t('product.individualProductQuantity')">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="individualProductQuantity"/>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'outboundInventory',
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
      emptyList: [],
      fullUnitList: [
        {
          boxCode: '12345678',
          productCode: 'abc1234567',
          inStockUnitsQuantity: 1,
          inStockProductQuantity: 12,
          inventoryStatus: this.$t('product.pendingOutbound'),
          outboundUnitsQuantity: 20,
          outboundDevanningQuantity: 10,
          outboundindividualQuantity: 13,
          outboundTime: '2018-08-02 10:00:00',
          operationID: '123bcd',
          orderNo: 'abcd123456',
          outboundInventoryProductQuantity: 5,
          outboundInventoryUnitsQuantity: 1,
          individualProductQuantity: 1
        },
        {
          boxCode: '12345678',
          productCode: 'abc1212345',
          inStockUnitsQuantity: 1,
          inStockProductQuantity: 12,
          inventoryStatus: this.$t('product.outbound'),
          outboundUnitsQuantity: 15,
          outboundDevanningQuantity: 10,
          outboundindividualQuantity: 8,
          outboundTime: '2018-08-02 10:00:00',
          operationID: '123bcd',
          orderNo: 'abcd123456',
          outboundInventoryProductQuantity: 3,
          outboundInventoryUnitsQuantity: 0,
          individualProductQuantity: 0
        }
      ],
      devanningList: [
        {
          boxCode: '12345678',
          productCode: 'abc1234567',
          inStockUnitsQuantity: 1,
          inStockProductQuantity: 12,
          inventoryStatus: this.$t('product.pendingOutbound'),
          outboundUnitsQuantity: 20,
          outboundDevanningQuantity: 10,
          outboundindividualQuantity: 13,
          outboundTime: '2018-08-02 10:00:00',
          operationID: '123bcd',
          orderNo: 'abcd123456',
          outboundInventoryProductQuantity: 5,
          outboundInventoryUnitsQuantity: 1,
          individualProductQuantity: 1
        },
        {
          boxCode: '12345678',
          productCode: 'abc1212345',
          inStockUnitsQuantity: 1,
          inStockProductQuantity: 12,
          inventoryStatus: this.$t('product.outbound'),
          outboundUnitsQuantity: 15,
          outboundDevanningQuantity: 10,
          outboundindividualQuantity: 8,
          outboundTime: '2018-08-02 10:00:00',
          operationID: '123bcd',
          orderNo: 'abcd123456',
          outboundInventoryProductQuantity: 3,
          outboundInventoryUnitsQuantity: 0,
          individualProductQuantity: 0
        }
      ],
      listQuery: {
        keyword: ''
      },
      listLoading: false,
      brandListLoading: false
    }
  },
  computed: {
    sumInStockUnitsQuantity() {
      var totalAmount = 0
      for (var i = 0; i < this.fullUnitList.length; i++) {
        totalAmount += this.fullUnitList[i].inStockUnitsQuantity
      }
      for (var j = 0; j < this.devanningList.length; j++) {
        totalAmount += this.devanningList[j].inStockUnitsQuantity
      }
      return totalAmount
    },
    sumInStockProductQuantity() {
      var totalAmount = 0
      for (var i = 0; i < this.fullUnitList.length; i++) {
        totalAmount += this.fullUnitList[i].inStockProductQuantity
      }
      for (var j = 0; j < this.devanningList.length; j++) {
        totalAmount += this.devanningList[j].inStockProductQuantity
      }
      return totalAmount
    },
    sumOutboundUnitsQuantity() {
      var totalAmount = 0
      for (var i = 0; i < this.fullUnitList.length; i++) {
        totalAmount += this.fullUnitList[i].outboundUnitsQuantity
      }
      for (var j = 0; j < this.devanningList.length; j++) {
        totalAmount += this.devanningList[j].outboundUnitsQuantity
      }
      return totalAmount
    },
    sumOutboundDevanningQuantity() {
      var totalAmount = 0
      for (var i = 0; i < this.fullUnitList.length; i++) {
        totalAmount += this.fullUnitList[i].outboundDevanningQuantity
      }
      for (var j = 0; j < this.devanningList.length; j++) {
        totalAmount += this.devanningList[j].outboundDevanningQuantity
      }
      return totalAmount
    },
    sumOutboundindividualQuantity() {
      var totalAmount = 0
      for (var i = 0; i < this.fullUnitList.length; i++) {
        totalAmount += this.fullUnitList[i].outboundindividualQuantity
      }
      for (var j = 0; j < this.devanningList.length; j++) {
        totalAmount += this.devanningList[j].outboundindividualQuantity
      }
      return totalAmount
    },
    sumOutboundInventoryProductQuantity() {
      var totalAmount = 0
      for (var i = 0; i < this.fullUnitList.length; i++) {
        totalAmount += this.fullUnitList[i].outboundInventoryProductQuantity
      }
      for (var j = 0; j < this.devanningList.length; j++) {
        totalAmount += this.devanningList[j].outboundInventoryProductQuantity
      }
      return totalAmount
    },
    sumOutboundInventoryUnitsQuantity() {
      var totalAmount = 0
      for (var i = 0; i < this.fullUnitList.length; i++) {
        totalAmount += this.fullUnitList[i].outboundInventoryUnitsQuantity
      }
      for (var j = 0; j < this.devanningList.length; j++) {
        totalAmount += this.devanningList[j].outboundInventoryUnitsQuantity
      }
      return totalAmount
    },
    sumIndividualProductQuantity() {
      var totalAmount = 0
      for (var i = 0; i < this.fullUnitList.length; i++) {
        totalAmount += this.fullUnitList[i].individualProductQuantity
      }
      for (var j = 0; j < this.devanningList.length; j++) {
        totalAmount += this.devanningList[j].individualProductQuantity
      }
      return totalAmount
    }
  },
  methods: {
    handleFilter() {
    },
    getSummaries(param) {
      const sums = []
      sums[2] = this.sumInStockUnitsQuantity
      sums[3] = this.sumInStockProductQuantity
      sums[5] = this.sumOutboundUnitsQuantity
      sums[6] = this.sumOutboundDevanningQuantity
      sums[7] = this.sumOutboundindividualQuantity
      sums[11] = this.sumOutboundInventoryProductQuantity
      sums[12] = this.sumOutboundInventoryUnitsQuantity
      sums[13] = this.sumIndividualProductQuantity
      return sums
    }
  }
}
</script>
<style>
  .el-table .cell {
    word-break: break-word;
  }
  .filter-container {
    width: 50%;
    float: left;
    padding-left: 3%;
    padding-top: 1%;
  }
  .empty-table .el-table__body-wrapper {
    display: none;
  }
  .el-row {
    margin: 0;
  }
</style>

