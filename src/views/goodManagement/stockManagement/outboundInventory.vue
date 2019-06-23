<template>
  <div>
    <div style="width: 100%; float: left">
      <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item"
                    placeholder="箱码/商品码/订货单号/操作账号"
                    v-model="listQuery.searchText">
          </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
            {{$t('table.search')}}
          </el-button>
      </div>
      <el-table :data="brandList" border fit highlight-current-row
                v-loading="brandListLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%;border-left-width: 2px;border-top-width: 2px;"
                class="no-border-bottom">
        <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
        <el-table-column align="center" label="品牌名称（中文）" prop="brandChineseName"/>
        <el-table-column align="center" label="品牌名称（英文）" prop="brandEnglishName"/>
        <el-table-column align="center" label="商品名称（英文）" prop="goodsEnglishName"/>
      </el-table>

        <el-table :data="list" border fit highlight-current-row
                  v-loading="listLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%;border-left-width: 2px;border-right-width: 2px;"
                  class="no-border-top border-left2 no-border-bottom last-tr0">
          <el-table-column align="center" :label="$t('product.productCode')" prop="goodsNo"/>
          <el-table-column align="center" :label="$t('product.productName')" prop="brandChineseName"/>
          <el-table-column align="center" label="商品规格" prop="specificationChinese"/>
          <el-table-column align="center" :label="$t('order.packageSpecification')" prop="packageSpecificationZh"/>
        <el-table-column align="center" label="箱型编号" prop="cartonSizeId"/>
        <el-table-column width="140" align="center" label="箱子尺寸">
          <template slot-scope="scope">
            {{ cartonSize(scope.row.cartonParam) }}
          </template>
        </el-table-column>
        </el-table>
        
    </div>
    <el-table :data="prodcutCodeList" border fit :summary-method="getSummaries" show-summary
              v-loading="productListLoading" size="mini" :max-height="500"
              style="width: 100%;
              border: 2px solid #D5D5D5;border-top-width: 1px;border-bottom-width: 2px;border-right-width: 2px;"
              :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',outline: '#D5D5D5 solid 1px',padding:0}"
              :span-method="objectSpanMethod"
              :cell-style="{borderRight:'1px solid #d5d5d5'}">
      <el-table-column align="center" label="已入库">
        <el-table-column align="center" label="箱码" prop="carton_code"/>
        <el-table-column align="center" label="商品码" prop="source_code" width="120"/>
        <!-- <el-table-column align="center" label="Record time" prop="create_time" /> -->
        <!-- <el-table-column align="center" :label="$t('product.operationID')" prop="create_user_id"/> -->
        <el-table-column align="center" label="装箱数量">
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="cartonCount">
            <template slot-scope="scope">1</template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="商品数量">
          <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="selling_unit"/>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="实际库存" >
        <el-table-column align="center" label="整箱" >
          <el-table-column align="center" :label="'(' + $t('order.units') + ')'" prop="currentUnitQuantity"/>
        </el-table-column>
        <el-table-column align="center" label="商品数量" >
          <el-table-column align="center" label="(pcs)" prop="currentPcsQuantity"/>
        </el-table-column>
        <el-table-column align="center" label="库存状态" prop="">
          <template slot-scope="scope">{{ scope.row.status==1? 'Pending Outbound':'Outbound' }}</template>
        </el-table-column>
        <el-table-column align="center" label="出库订货单号" prop="">
          <template slot-scope="scope">{{ scope.row.status==1? '/':scope.row.order_no }}</template>
        </el-table-column>
        <el-table-column align="center" label="出库时间" prop="">
          <template slot-scope="scope">{{ scope.row.status==1? '/':scope.row.outbound_time }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作账号" prop="operation_id">
           <template slot-scope="scope">{{ scope.row.status==1? '/':scope.row.operation_id }}</template>
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
      this.brandList[0] = this.product
      this.getProdcutCodeList(this.product.goodsNo, this.product.boxSize)
    },
    data() {
      return {
        productListLoading: false,
        brandList: [],
        list: [],
        emptyList: [],
        prodcutCodeList: [
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
          searchText: ''
        },
        listLoading: false,
        brandListLoading: false
      }
    },
    computed: {
      sumPackingQuantity() {
        let cartonCodeArr = []
        for (var i = 0; i < this.prodcutCodeList.length; i++) {
          const ele = this.prodcutCodeList[i]
          cartonCodeArr.push(ele.carton_code)
        }
          
        return Array.from(new Set(cartonCodeArr)).length
      },
      sumproductQuantity() {
        // var totalAmount = 0
        // for (var i = 0; i < this.prodcutCodeList.length; i++) {
        //   const ele = this.prodcutCodeList[i]
        //   totalAmount += ele.currentPcsQuantity/1
        // }
        return this.prodcutCodeList.length
      },

    },
    methods: {
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
      getProdcutCodeList(goodsNo, cartonSizeId) {
        this.prodcutCodeListst = []
        this.spanArr = []
        this.productListLoading = true

        this.$request({
          url: '/goods/outBoundInventory.do',
          method: 'post',
          data: {
            goodsNo: goodsNo,
            searchText: this.listQuery.searchText
          }
        }).then((res) => {
          this.prodcutCodeList = res.data.items
          this.getSpanArr(this.prodcutCodeList)
          this.productListLoading = false
        }).catch(() => {
          this.$message.error('Error');
          this.productListLoading = false
        })
      },
      handleFilter() {
        this.getProdcutCodeList(this.product.goodsNo, 1)
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
      getSummaries(param) {
        var boxCodeList = []
        for (var i = 0; i < this.prodcutCodeList.length; i++) {
          boxCodeList.push(this.prodcutCodeList[i].carton_code)
        }
        const sums = []
        sums[4] = Array.from(new Set(boxCodeList)).length
        sums[5] = this.prodcutCodeList.length
        sums[6] = this.sumPackingQuantity
        sums[7] = this.sumproductQuantity
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

