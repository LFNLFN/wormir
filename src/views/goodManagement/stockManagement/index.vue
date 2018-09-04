<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="品牌序列号/品牌名称/商品编号/商品名称"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

     <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row stripe size="mini" style="width: 100%" >
      <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
      <el-table-column align="center" label="品牌名称（英文）" prop="brandEnglishName" />
      <el-table-column align="center" label="品牌名称（中文）" prop="brandEnglishName" />
      <el-table-column align="center" label="商品编号" prop="goodsNo"/>
      <el-table-column align="center" label="商品名称（英文）" prop="goodsEnglishName" />
      <el-table-column align="center" label="商品名称（中文）" prop="goodsEnglishName" />
      <el-table-column align="center" label="商品规格" prop="goodsSpecificationEnglish" />
      <el-table-column align="center" label="装箱规格" prop="cartonSpecification" />
      <el-table-column align="center" label="箱型编号" prop="cartonSizeId" />
      <el-table-column align="center" label="虚拟库存" >
          <el-table-column align="center" label="商品数量" >
              <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="virtualInStockCount" />
          </el-table-column>
          <el-table-column align="center" label="整箱" >
            <el-table-column align="center" label="(units)" prop="virtualDevanningInStockCount" />
          </el-table-column>
          <el-table-column align="center" label="散货" >
            <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="virtualIndividualInStockCount" />
          </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="实际库存" >
          <el-table-column align="center" label="商品数量" prop="outStockCount">
            <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="outStockCount" />
          </el-table-column>
          <el-table-column align="center" label="整箱" prop="devanningOutStockCount">
            <el-table-column align="center" label="(units)" prop="devanningOutStockCount" />
          </el-table-column>
          <el-table-column align="center" label="散货" prop="individualOutStockCount">
            <el-table-column align="center" :label="'(' + $t('order.pcs') + ')'" prop="individualOutStockCount" />
          </el-table-column>
      </el-table-column>
      <el-table-column fixed = "right" width= "200" align="center" :label="$t('order.operation')" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="inventoryDetails(scope.row)">入库明细</el-button>
          <el-button type="primary" size="mini" @click="holdInventory(scope.row)">虚拟库存明细</el-button>
          <el-button type="primary" size="mini" @click="outboundInventory(scope.row)">实际库存明细</el-button>
          <el-button type="primary" size="mini" @click="packingDetail(scope.row)">装箱明细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isInventoryDetailsShow">
      <inventory-details :product="currentProduct" v-if="isInventoryDetailsShow"></inventory-details>
    </el-dialog>

    <el-dialog :visible.sync="isHoldInventoryShow">
      <hold-inventory :product="currentProduct" v-if="isHoldInventoryShow"></hold-inventory>
    </el-dialog>

    <el-dialog :visible.sync="isOutboundInventoryShow">
      <outbound-inventory :product="currentProduct" v-if="isOutboundInventoryShow"></outbound-inventory>
    </el-dialog>

    <el-dialog :visible.sync="isPackingDetailShow">
      <packing-detail :product="currentProduct" v-if="isPackingDetailShow"></packing-detail>
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
        keyword: '',
        page: 1,
        rows: 20
      },
      list: [{}],
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
      // this.listLoading = true
      // getGoodsListStore(1, 20).then(response => {
      //   const goodList = response.data.items
      //   goodList.forEach(element => {
      //     getGoodsCartonSizeInfo(element.goodsNo).then(response => {
      //       const cartonSizeList = response.data.goodsCartonSize
      //       cartonSizeList.forEach(item => {
      //         stockDetailIndex(element.goodsNo, item.boxId).then(response => {
      //           if (response.data.totalRecords !== 0) {
      //             const stockDetail = response.data.items[0]
      //             this.list.push({
      //               'goodsEnglishName': stockDetail.goodsEnglishName,
      //               'goodsChineseName': stockDetail.goodsChineseName,
      //               'goodsSpecificationChinese': stockDetail.goodsSpecificationChinese,
      //               'goodsSpecificationEnglish': stockDetail.goodsSpecificationEnglish,
      //               'goodsQuality': stockDetail.goodsQuality,
      //               'goodsNo': stockDetail.goodsNo,
      //               'brandNo': stockDetail.brandNo,
      //               'cartonSizeId': stockDetail.cartonSizeId,
      //               'cartonSpecification': stockDetail.cartonSpecification,
      //               'cartonSpecificationEnglish': stockDetail.cartonSpecificationEnglish,
      //               'boxSize': stockDetail.boxSize,
      //               // 这里修改为虚拟库存数量
      //               'inStockCount': stockDetail.inStockCount,
      //               'devanningInStockCount': stockDetail.devanningInStockCount,
      //               'individualInStockCount': stockDetail.individualInStockCount,

      //               'outStockCount': stockDetail.inStockCount,
      //               'devanningOutStockCount': stockDetail.devanningInStockCount,
      //               'individualOutStockCount': stockDetail.individualInStockCount,
      //               'virtualIndividualInStockCount': stockDetail.virtualIndividualInStockCount,
      //               'virtualDevanningInStockCount': stockDetail.virtualDevanningInStockCount,
      //               'virtualInStockCount': stockDetail.virtualInStockCount,
      //               // 出库数量
      //               // 'outStockCount': stockDetail.outStockCount,
      //               // 'devanningOutStockCount': stockDetail.devanningOutStockCount,
      //               // 'individualOutStockCount': stockDetail.individualOutStockCount,
      //               'createUserId': stockDetail.createUserId,
      //               'createTime': stockDetail.createTime
      //             })
      //           }
      //         })
      //       })
      //     })
      //   })
      //   this.listLoading = false
      // })
    },
    handleCurrentChange() {
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
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
    }
  }
}
</script>
<style>
.el-table .cell {
  word-break: break-word;
}
.el-dialog {
  width: 1200px
}
</style>
