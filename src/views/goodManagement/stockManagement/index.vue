<template>
  <div class="app-container">
    <div class="trade-category-wrap" style="margin-bottom: 10px">
      <el-radio v-model="listQuery.propertyOfSale" :label="1" @change="propertyOfSaleChange">一般贸易商品</el-radio>
      <el-radio v-model="listQuery.propertyOfSale" :label="2" @change="propertyOfSaleChange">跨境贸易商品</el-radio>
      <el-radio v-model="listQuery.propertyOfSale" :label="3" @change="propertyOfSaleChange">一般贸易赠品</el-radio>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item"
                placeholder="品牌序列号/品牌名称/商品编号/商品名称"
                v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table :data="list"
              v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row size="mini"
              style="width: 100%;border-width: 2px;border-right-width: 1px;"
              >
      <el-table-column min-width="120" align="center" label="品牌序列号" prop="brandNo"/>
      <el-table-column min-width="150" align="center" label="品牌名称（英文）" prop="brandEnglishName"/>
      <el-table-column min-width="150" align="center" label="品牌名称（中文）" prop="brandChineseName"/>
      <el-table-column min-width="100" align="center" label="商品编号" prop="goodsNoForBrand"/>
      <el-table-column min-width="150" align="center" label="商品名称（英文）" prop="goodsEnglishName"/>
      <el-table-column min-width="150" align="center" label="商品名称（中文）" prop="goodsChineseName"/>
      <el-table-column min-width="100" align="center" label="商品规格" prop="specificationChinese"/>
      <el-table-column min-width="100" align="center" label="装箱规格" prop="packageSpecificationZh"/>
      <el-table-column min-width="100" align="center" label="箱型编号" prop="cartonSizeId"/>
      <el-table-column align="center" label="虚拟库存">
        <el-table-column align="center" label="整箱">
          <el-table-column min-width="100" align="center" label="(units)" prop="">
            <template slot-scope="scope">
              {{ scope.row.holdInventoryQuantity / scope.row.packageSpecificationZh.replace(/[^0-9]/ig, '') }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="商品数量">
          <el-table-column min-width="100" align="center" :label="'(' + $t('order.pcs') + ')'"
                           prop="holdInventoryQuantity"/>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="实际库存">
        <el-table-column align="center" label="整箱" prop="devanningOutStockCount">
          <el-table-column min-width="100" align="center" label="(units)" prop="">
            <template slot-scope="scope">
              {{ scope.row.currentInventoryQuantity / scope.row.packageSpecificationZh.replace(/[^0-9]/ig, '') }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="商品数量" prop="outStockCount">
          <el-table-column min-width="100" align="center" :label="'(' + $t('order.pcs') + ')'" prop="currentInventoryQuantity" />
        </el-table-column>
      </el-table-column>
      <el-table-column fixed="right" width="200" align="center" :label="$t('order.operation')"
                       class-name="small-padding">
        <template slot-scope="scope">
          <div class="table-btn-wrap">
            <el-button type="primary" size="mini" @click="inventoryDetails(scope.row)">入库明细</el-button>
          </div>
          <div class="table-btn-wrap">
            <el-button type="primary" size="mini" @click="holdInventory(scope.row)">虚拟库存明细</el-button>
          </div>
          <div class="table-btn-wrap">
            <el-button type="primary" size="mini" @click="outboundInventory(scope.row)">实际库存明细</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align: right">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isInventoryDetailsShow" title="入库明细" fullscreen style="padding: 20px 10px">
      <inventory-details :product="currentProduct" v-if="isInventoryDetailsShow"></inventory-details>
    </el-dialog>

    <el-dialog :visible.sync="isHoldInventoryShow" title="虚拟库存明细" fullscreen style="padding: 20px 10px">
      <hold-inventory :product="currentProduct" v-if="isHoldInventoryShow"></hold-inventory>
    </el-dialog>

    <el-dialog :visible.sync="isOutboundInventoryShow" title="实际库存明细" fullscreen style="padding: 20px 10px">
      <outbound-inventory :product="currentProduct" v-if="isOutboundInventoryShow"></outbound-inventory>
    </el-dialog>
  </div>
</template>
<script>
  import inventoryDetails from './inventoryDetails'
  import holdInventory from './holdInventory'
  import outboundInventory from './outboundInventory'
  import packingDetail from './packingDetail'
  import waves from '@/directive/waves'
  // import { getGoodsListStore, getGoodsCartonSizeInfo, stockDetailIndex } from '@/api/stock'

  export default {
    components: {
      inventoryDetails,
      holdInventory,
      outboundInventory,
      packingDetail
    },
    directives: {
      waves
    },
    data() {
      return {
        listQuery: {
          searchText: '',
          page: 1,
          limit: 10,
          propertyOfSale: 1
        },
        list: [{brandNo: '1', brandEnglishName: '1', brandChineseName: '1', goodsNoForBrand: '1', goodsEnglishName: '1', goodsChineseName: '1', specificationChinese: '1'}],
        isInventoryDetailsShow: false,
        isHoldInventoryShow: false,
        isOutboundInventoryShow: false,
        isPackingDetailShow: false,
        currentProduct: '',
        listLoading: false,
        total: 0
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.$request({
          url: '/goods/fetchStockManagement.do',
          method: 'post',
          data: this.listQuery
        }).then((res) => {
          if (res.errorCode == 0) {
            this.list = res.data.items
            this.total = res.data.total
            this.listLoading = false
          } else {
            this.listLoading = false
            this.list=[];
            this.$message.error('数据请求失败');
          }
        }).catch((err) => {
          this.listLoading = false
          this.$message.error('数据请求失败');
        })
      },
      inventoryDetails(row) {
        this.isInventoryDetailsShow = true
        this.currentProduct = row
      },
      holdInventory(row) {
        this.isHoldInventoryShow = true
        this.currentProduct = row
      },
      outboundInventory(row) {
        this.isOutboundInventoryShow = true
        this.currentProduct = row
      },
      packingDetail(row) {
        this.isPackingDetailShow = true
        this.currentProduct = row
      },
      handleFilter() {
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
      },
      propertyOfSaleChange(val) {
        this.getList()
      },
    }
  }
</script>
<style scoped>
  .table-btn-wrap:not(:last-of-type) {
    margin-bottom: 5px;
  }
</style>
