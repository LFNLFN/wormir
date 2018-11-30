<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item"
                placeholder="品牌序列号/品牌名称/商品编号/商品名称"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table :data="list"
              v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row size="mini"
              style="width: 100%"
              class="border-top2 border-left2 border-right1">
      <el-table-column min-width="120" align="center" label="品牌序列号" prop="brandNo"/>
      <el-table-column min-width="150" align="center" label="品牌名称（英文）" prop="brandEnglishName"/>
      <el-table-column min-width="150" align="center" label="品牌名称（中文）" prop="brandChineseName"/>
      <el-table-column min-width="100" align="center" label="商品编号" prop="goodsNo"/>
      <el-table-column min-width="150" align="center" label="商品名称（英文）" prop="goodsEnglishName"/>
      <el-table-column min-width="150" align="center" label="商品名称（中文）" prop="goodsChineseName"/>
      <el-table-column min-width="100" align="center" label="商品规格" prop="goodsSpecificationEnglish"/>
      <el-table-column min-width="100" align="center" label="装箱规格" prop="cartonSpecification">
        <template slot-scope="scope">
          <span>{{scope.row.cartonSpecification}}件/箱</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100" align="center" label="箱型编号" prop="cartonSizeId"/>
      <el-table-column align="center" label="虚拟库存">
        <el-table-column align="center" label="商品数量">
          <el-table-column min-width="100" align="center" :label="'(' + $t('order.pcs') + ')'" prop="virtualInStockCount">
            <template slot-scope="scope">
              <span>{{ scope.row.virtualDevanningInStockCount * scope.row.cartonSpecification + scope.row.virtualIndividualInStockCount }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="整箱">
          <el-table-column min-width="100" align="center" label="(units)" prop="virtualDevanningInStockCount"/>
        </el-table-column>
        <el-table-column align="center" label="散货">
          <el-table-column min-width="100" align="center" :label="'(' + $t('order.pcs') + ')'" prop="virtualIndividualInStockCount"/>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="实际库存">
        <el-table-column align="center" label="商品数量" prop="outStockCount">
          <el-table-column min-width="100" align="center" :label="'(' + $t('order.pcs') + ')'" prop="outStockCount">
            <template slot-scope="scope">
              <span>{{ scope.row.devanningOutStockCount * scope.row.cartonSpecification + scope.row.individualOutStockCount }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="整箱" prop="devanningOutStockCount">
          <el-table-column min-width="100" align="center" label="(units)" prop="devanningOutStockCount"/>
        </el-table-column>
        <el-table-column align="center" label="散货" prop="individualOutStockCount">
          <el-table-column min-width="100" align="center" :label="'(' + $t('order.pcs') + ')'" prop="individualOutStockCount"/>
        </el-table-column>
      </el-table-column>
      <el-table-column fixed="right" width="200" align="center" :label="$t('order.operation')"
                       class-name="small-padding">
        <template slot-scope="scope">
          <div class="table-btn-wrap">
            <el-button type="primary" size="mini" @click="inventoryDetails(scope.row)">入库明细</el-button>
          </div>
          <div class="table-btn-wrap"><el-button type="primary" size="mini" @click="holdInventory(scope.row)">虚拟库存明细</el-button></div>
          <div class="table-btn-wrap"><el-button type="primary" size="mini" @click="outboundInventory(scope.row)">实际库存明细</el-button></div>
          <div class="table-btn-wrap"><el-button type="primary" size="mini" @click="packingDetail(scope.row)">装箱明细</el-button></div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isInventoryDetailsShow" title="入库明细" width="80%">
      <inventory-details :product="currentProduct" v-if="isInventoryDetailsShow"></inventory-details>
    </el-dialog>

    <el-dialog :visible.sync="isHoldInventoryShow" title="虚拟库存明细" width="85%">
      <hold-inventory :product="currentProduct" v-if="isHoldInventoryShow"></hold-inventory>
    </el-dialog>

    <el-dialog :visible.sync="isOutboundInventoryShow" title="实际库存明细" fullscreen style="padding: 20px 10px">
      <outbound-inventory :product="currentProduct" v-if="isOutboundInventoryShow"></outbound-inventory>
    </el-dialog>

    <el-dialog :visible.sync="isPackingDetailShow" title="装箱明细" width="80%">
      <packing-detail :product="currentProduct" v-if="isPackingDetailShow"></packing-detail>
    </el-dialog>
  </div>
</template>
<script>
  import Mock from 'mockjs'
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
        Mock,
        listQuery: {
          keyword: '',
          page: 1,
          rows: 20
        },
        list: [{
          brandNo: Mock.Random.natural(123456, 19999),
          brandEnglishName: 'LANCOM',
          brandChineseName: '兰蔻',
          goodsNo: Mock.Random.natural(123, 199),
          goodsEnglishName: 'Lipstick',
          goodsChineseName: '口红',
          goodsSpecificationEnglish: '4g',
          cartonSpecification: 10,
          cartonSizeId: Mock.Random.natural(1, 9),
          cartonSize: '10cm*10cm*10cm',
          virtualDevanningInStockCount: Mock.Random.natural(1, 9),
          devanningOutStockCount: Mock.Random.natural(1, 9),
          virtualIndividualInStockCount: Mock.Random.natural(1, 9),
          individualOutStockCount: Mock.Random.natural(1, 9),
          boxCode: Mock.Random.natural(100, 999),
          sourceCode: Mock.Random.natural(123, 199),
          warehouseEntryTime: Mock.Random.now(),
          cartonCount: Mock.Random.natural(1, 9),
          goodsNum: Mock.Random.natural(1, 9),
          createUserId: Mock.Random.natural(1, 9)
        }],
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
<style scoped>
  /*.el-dialog {*/
  /*width: 1200px*/
  /*}*/
  .table-btn-wrap:not(:last-of-type) {
    margin-bottom: 5px;
  }
</style>
