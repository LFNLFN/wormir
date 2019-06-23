<template>
  <div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="订货单号/操作账号"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <div class="table-wrap">
      <el-table :data="brandList" border fit highlight-current-row
                v-loading="brandListLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%"
                class="no-border-bottom border-left2 border-top2">
        <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
        <el-table-column align="center" label="品牌名称（中文）" prop="brandChineseName"/>
        <el-table-column align="center" label="品牌名称（英文）" prop="brandEnglishName"/>
        <el-table-column align="center" label="商品名称（中文）" prop="goodsChineseName"/>
      </el-table>

      <el-table :data="list" border fit highlight-current-row
                v-loading="listLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%"
                :header-cell-style="{padding: 0}"
                class="no-border-bottom no-border-top border-left2">
        <el-table-column align="center" :label="$t('product.productCode')" prop="goodsNo"/>
        <el-table-column align="center" :label="$t('product.productName')" prop="brandEnglishName"/>
        <el-table-column align="center" label="商品规格" prop="specificationChinese"/>
        <el-table-column align="center" :label="$t('order.packageSpecification')" prop="packageSpecificationZh"/>
        <el-table-column align="center" label="箱型编号" prop="cartonSizeId"/>
        <el-table-column width="140" align="center" label="箱子尺寸">
          <template slot-scope="scope">
            {{ cartonSize(scope.row.cartonParam) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="虚拟库存">
          <el-table-column align="center" label="整箱">
            <el-table-column align="center" label="(units)">
               <template slot-scope="scope">
                {{ scope.row.holdInventoryQuantity / scope.row.packageSpecificationZh.replace(/[^0-9]/ig, '') }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="商品数量">
            <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="holdInventoryQuantity" />
          </el-table-column>
        </el-table-column>
      </el-table>

      <el-table :data="prodcutCodeList" border fit highlight-current-row
                v-loading="listLoading" element-loading-text="给我一点时间" size="mini" style="width: 100%"
                :header-cell-style="{padding: 0}"
                :max-height="500"
                class="no-border-top border-left2">
        <el-table-column min-width="140" align="center" label="备货订货单号" prop="inventoryOrderNo">
          <template slot-scope="scope">
            <span>{{ scope.row.order }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="虚拟备货">
          <el-table-column align="center" label="整箱">
            <el-table-column align="center" label="(units)" prop="unitsQuantity"/>
          </el-table-column>
          <el-table-column align="center" label="商品数量">
            <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="productQuantity"/>
          </el-table-column>
          <el-table-column min-width="120" align="center" label="备货时间" prop="recordTime"/>
          <el-table-column min-width="120" align="center" label="操作账号" prop="operationId"/>
        </el-table-column>
        <el-table-column align="center" label="取消备货">
          <el-table-column align="center" label="整箱">
            <el-table-column align="center" label="(units)" prop="cancelUnitsQuantity"/>
          </el-table-column>
          <el-table-column align="center" label="商品数量">
            <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="cancelProductQuantity"/>
          </el-table-column>
          <el-table-column min-width="120" align="center" label="取消时间" prop="cancelTime"/>
        </el-table-column>
      </el-table>
    </div>

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
      this.brandList[0] = this.product
      this.getList()

    },
    data() {
      return {
        brandList: [],
        list: [],
        prodcutCodeList: [],
        listQuery: {
          keyword: ''
        },
        downloadLoading: false,
        deleteLoading: false,
        listLoading: false,
        brandListLoading: false
      }
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
      getList() {
      this.listLoading = true
      this.$request({
        url: '/order/holdInventoryList.do',
        method: 'post',
        data: {
          goodsNo: this.list[0].goodsNoForBrand,
        }
      }).then((res) => {
        this.prodcutCodeList = res.data.items
        this.listLoading = false
      }).catch(() => {
        this.$message.error('Error');
        this.listLoading = false
      })
    },
      handleFilter() {
        this.getList()
      },
    }
  }
</script>

<style scoped>
  .table-wrap {
    position: relative;
  }
  .table-wrap:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    border-left: solid 2px #D5D5D5;
    top: 0;
    right: 0;
  }
</style>

