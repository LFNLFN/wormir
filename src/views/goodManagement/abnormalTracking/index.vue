<template>
  <div class="app-container">
    <div class="trade-category-wrap" style="margin-bottom: 10px">
      <el-radio v-model="listQuery.propertyOfSale" :label="1" @change="propertyOfSaleChange">一般贸易商品</el-radio>
      <el-radio v-model="listQuery.propertyOfSale" :label="2" @change="propertyOfSaleChange">跨境贸易商品</el-radio>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleSearch" style="width: 400px;" class="filter-item"
                placeholder="品牌序列号/品牌名称/商品编号/商品名称/商品码/箱码/渠道号"
                v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleSearch">
        {{$t('table.search')}}
      </el-button>
    </div>
    <!-- border-left2 border-top2 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row size="mini" style="width: 100%"
              class="table_border">
      <el-table-column min-width="120" align="center" label="品牌名称（英文）" prop="brandNameEn"/>
      <el-table-column min-width="100" align="center" label="商品编号" prop="goodNoForBrand"/>
      <el-table-column min-width="140" align="center" label="商品名称（英文）" prop="goodNameEn" show-overflow-tooltip/>
      <el-table-column min-width="140" align="center" label="商品名称（中文）" prop="goodNameZh" show-overflow-tooltip/>
      <el-table-column min-width="100" align="center" label="商品规格" prop="goodSpecification">
        <template slot-scope="scope">
          <span>{{ scope.row.goodSpecification + scope.row.goodSpecificationUnit }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="140" align="center" label="商品码" prop="sourceCode"/>
      <el-table-column min-width="100" align="center" label="箱码" prop="cartonCode"/>
      <el-table-column min-width="170" align="center" label="订货渠道号" prop="channelNo">
        <template slot-scope="scope">
          <span class="link-type" @click="showCheck(scope.row)">{{ scope.row.channelNo }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="收货状态" prop="channelReceiveProductStatus" :filters="receiveStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ receiveStatusMap[scope.row.channelReceiveProductStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="商品情况" prop="productStatusFront"
                       :filters="productStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ productStatusMap[scope.row.productStatusFront].text }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="收货时间" prop="channelReceiveProductTime">
        <template slot-scope="scope">
          <span>{{ scope.row.channelReceiveProductTime || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="流转状态" prop="transferStatus"
                       :filters="transferStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ transferStatusMap[scope.row.transferStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="流转时间" prop="transferTime"/>
      <el-table-column min-width="100" align="center" label="激活状态" prop="activationState"
                       :filters="activeStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ activeStatusMap[scope.row.activationState].text }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100" align="center" label="流转情况" prop="transferSituation"
                       :filters="transferSituationFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ transferSituationMap[scope.row.transferSituation].text }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="200" align="center" :label="$t('order.operation')"
                       class-name="small-padding">
        <template slot-scope="scope">
          <el-button v-if="scope.row.transferSituation==0" type="primary" size="mini" @click="abnormalDetail(scope.row, 0)">异常明细</el-button>
          <el-button v-if="scope.row.transferSituation==1" type="primary" size="mini" @click="abnormalDetail(scope.row, 1)">同箱明细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="isCheckShow" width="75%" @close="isCheckShow = false" title="查看渠道档案">
      <to-check-detail :currentRow="currentRow" v-if="isCheckShow"></to-check-detail>
    </el-dialog>
    <el-dialog :visible.sync="isDetailsShow" width="1200px">
      <detail :currentRow="currentProduct" v-if="isDetailsShow"></detail>
    </el-dialog>

  </div>
</template>
<script>
  import Mock from 'mockjs'
  import waves from '@/directive/waves'
  import detail from './detail'
  import toCheckDetail from './toCheckDetail.vue'

  export default {
    components: {
      detail,
      toCheckDetail,
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
          propertyOfSale: 1,
        },
        currentRow: null,
        isCheckShow: false,
        list: [],
        transferSituationFilters: [
          { text: '异常', value: 0 },
          { text: '正常', value: 1 },
        ],
        transferSituationMap: {
          0: { text: '异常', value: 0 },
          1: { text: '正常', value: 1 },
        },
        activeStatusFilters: [
          { text: '无效激活', value: 0 },
          { text: '有效激活', value: 1 },
          { text: '未激活', value: 2 },
        ],
        activeStatusMap: {
          0: { text: '无效激活', value: 0 },
          1: { text: '有效激活', value: 1 },
          2: { text: '未激活', value: 2 },
        },
        receiveStatusFilters: [
          { text: '已收货', value: 1 },
          { text: '未收货', value: 2 },
        ],
        receiveStatusMap: {
          1: { text: '已收货', value: 1 },
          2: { text: '未收货', value: 2 },
        },
        productStatusFilters: [
          { text: '正常商品', value: 1 },
          { text: '瑕疵商品', value: 2 },
          { text: '破损商品', value: 3 },
          { text: '少货商品', value: 4 },
          { text: '瑕疵待确认', value: 5 },
          { text: '破损待确认', value: 6 },
          { text: '未定义商品', value: 0 }
        ],
        productStatusMap: {
          0: { text: '未定义商品', value: 0 },
          1: { text: '正常商品', value: 1 },
          2: { text: '瑕疵商品', value: 2 },
          3: { text: '破损商品', value: 3 },
          4: { text: '少货商品', value: 4 },
          5: { text: '瑕疵待确认', value: 5 },
          6: { text: '破损待确认', value: 6 },
        },
        transferStatusFilters: [
          { text: '已售出', value: 0 },
          { text: '未售出', value: 1 },
          { text: '已作废', value: 2 },
          { text: '未定义', value: 3 },
        ],
        transferStatusMap: {
          0: { text: '已售出', value: 0 },
          1: { text: '未售出', value: 1 },
          2: { text: '已作废', value: 2 },
          3: { text: '未定义', value: 3 },
        },

        isDetailsShow: false,
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
         url: '/issue/abnormalTrackingList.do',
         method: 'post',
         data: this.listQuery
       }).then((res) => {
         this.list = res.data.items
         this.total = res.data.total
         this.listLoading = false
       }).catch((err) => {
         this.listLoading = false
         this.$message.error('数据请求失败');
       })
      },
      propertyOfSaleChange() {
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
      },
      abnormalDetail(row, flag) {
        this.isDetailsShow = true
        this.currentProduct = row
        this.$request({
          url: '/channel/viewChannelDetail.do',
          method: 'post',
          data: {
            channelNo: row.channelNo
          }
        }).then((res) => {
          if (res.errorCode == 0) {
            Object.assign(this.currentProduct, res.data.channelObj)
            this.isDetailsShow = true
          } else {
            this.$message.error('没有找到匹配结果');
            
          }
        }).catch((err) => {
          this.$message.error('没有找到匹配结果');
         
        })
      },
      handleSearch() {
        this.getList()
      },
      showCheck(row) {
        this.currentRow = row
        this.$request({
          url: '/channel/viewChannelDetail.do',
          method: 'post',
          data: {
            channelNo: row.channelNo
          }
        }).then((res) => {
          if (res.errorCode == 0) {
            Object.assign(this.currentRow, res.data.channelObj)
            this.isCheckShow = true
          } else {
            this.$message.error('没有找到匹配结果');
            
          }
        }).catch((err) => {
          this.$message.error('没有找到匹配结果');
         
        })
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
    }
  }
</script>

<style scoped>

</style>
