<template>
  <div>
    <div style="width: 100%; float: left">
      <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item"
                    placeholder="箱码/商品码/订货单号/操作账号"
                    v-model="listQuery.keyword">
          </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
            {{$t('table.search')}}
          </el-button>
      </div>
      <el-table :data="brandList" border fit highlight-current-row
                v-loading="brandListLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%"
                class="border-top2 border-left2 no-border-bottom">
        <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
        <el-table-column align="center" label="品牌名称（中文）" prop="brandChineseName"/>
        <el-table-column align="center" label="品牌名称（英文）" prop="brandEnglishName"/>
        <el-table-column align="center" label="商品名称（英文）" prop="goodsEnglishName"/>
      </el-table>

        <el-table :data="list" border fit highlight-current-row
                  v-loading="listLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%"
                  class="no-border-top border-left2 no-border-right no-border-bottom last-tr0">
          <el-table-column align="center" :label="$t('product.productCode')" prop="goodsNo"/>
          <el-table-column align="center" :label="$t('product.productName')" prop="brandChineseName"/>
          <el-table-column align="center" label="商品规格" prop="goodsSpecificationEnglish"/>
          <el-table-column align="center" :label="$t('order.packageSpecification')" prop="cartonSpecification">
            <template slot-scope="scope">{{ scope.row.cartonSpecification }}件/箱</template>
          </el-table-column>
          <el-table-column align="center" label="箱型编号" prop="cartonSizeId"/>
          <el-table-column align="center" label="箱子尺寸" prop="cartonSize"/>
        </el-table>
        
    </div>
    <el-table :data="fullUnitList" border fit highlight-current-row
              v-loading="listLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%"
              :max-height="500"
              class="border-left2 last-tr0">
      <el-table-column align="center" label="已入库">
        <el-table-column align="center" label="箱码" prop="boxCode"/>
        <el-table-column width="120" align="center" label="商品码" prop="productCode"/>
        <el-table-column align="center" label="装箱数量">
          <el-table-column align="center" label="(units)" prop="inStockUnitsQuantity"/>
        </el-table-column>
        <el-table-column align="center" label="商品数量">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="inStockProductQuantity"/>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="实际库存">
        <el-table-column align="center" label="整箱">
          <el-table-column align="center" label="(units)" prop="outboundUnitsQuantity"/>
        </el-table-column>
        <el-table-column align="center" label="商品数量">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="outboundDevanningQuantity"/>
        </el-table-column>
        <el-table-column align="center" label="库存状态" prop="inventoryStatus"/>
        <el-table-column align="center" label="出库的订货单号" prop="orderNo"/>
        <el-table-column align="center" label="出库时间"/>
        <el-table-column align="center" label="操作账号" prop="operationID"/>
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
      this.brandList[0] = this.product
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
            inventoryStatus: '待出库',
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
            inventoryStatus: '已出库',
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
            inventoryStatus: '待出库',
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
            inventoryStatus: '已出库',
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
<style scoped>
  .filter-container {
    width: 50%;
    float: left;
    /* padding-left: 3%; */
    padding-top: 1%;
  }

  .el-row {
    margin: 0;
  }
</style>

