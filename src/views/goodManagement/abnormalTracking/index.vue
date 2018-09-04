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
      <el-table-column align="center" label="商品码" prop="sourceCode" />
      <el-table-column align="center" label="箱码" prop="boxCode" />
      <el-table-column align="center" label="订货渠道号" prop="channelNo" />
      <el-table-column align="center" label="收货状态" prop="receiveStatus" />
      <el-table-column align="center" label="商品情况" prop="productStatus" />
      <el-table-column align="center" label="收货时间" prop="receiveTime" />
      <el-table-column align="center" label="流转状态" prop="transferStatus" />
      <el-table-column align="center" label="流转时间" prop="transferTime" />
      <el-table-column align="center" label="激活状态" prop="activeStatus" />
      <el-table-column align="center" label="流转情况" prop="transferSituation" />
      <el-table-column fixed = "right" width= "200" align="center" :label="$t('order.operation')" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="abnormalDetail(scope.row, 0)">异常明细</el-button>
          <el-button type="primary" size="mini" @click="abnormalDetail(scope.row, 1)">同箱明细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isDetailsShow" width="1200px">
      <detail :product="currentProduct" v-if="isDetailsShow"></detail>
    </el-dialog>

  </div>
</template>
<script>
import waves from '@/directive/waves'
import detail from './detail'

export default {
  components: {
    detail
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
    },
    handleCurrentChange() {
    },
    abnormalDetail(row, flag) {
      this.isDetailsShow = true
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
</style>
