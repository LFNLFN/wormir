<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="品牌序列号/品牌名称"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

     <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row stripe size="mini" style="width: 100%" >
      <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
      <el-table-column align="center" label="品牌名称（中文）" prop="chineseName" />
      <el-table-column align="center" label="品牌名称（英文）" prop="englishName" />
      <el-table-column align="center" label="原产国/产地" prop="provenance" />
      <el-table-column align="center" label="品牌状态" prop="status" />
      <el-table-column width= "200" align="center" :label="$t('order.operation')" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="productCodeDetail(scope.row)">查看商品码</el-button>
          <el-button type="primary" size="mini" @click="boxCodeDetail(scope.row)">查看箱码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isProductCodeDetailShow">
      <product-code-detail :brand="currentBrand" v-if="isProductCodeDetailShow"></product-code-detail>
    </el-dialog>

    <el-dialog :visible.sync="isBoxCodeDetailShow">
      <box-code-detail :brand="currentBrand" v-if="isBoxCodeDetailShow"></box-code-detail>
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import productCodeDetail from './productCodeDetail'
import boxCodeDetail from './boxCodeDetail'

export default {
  components: {
    productCodeDetail,
    boxCodeDetail
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
      list: [],
      isProductCodeDetailShow: false,
      isBoxCodeDetailShow: false,
      currentBrand: '',
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
      this.list.push({
        brandNo: '123456',
        chineseName: '兰蔻',
        englishName: 'Lancome',
        provenance: '法国',
        status: '正常供货'
      })
      this.listLoading = false
    },
    handleCurrentChange() {
    },
    productCodeDetail(row) {
      this.isProductCodeDetailShow = true
      this.currentBrand = row
    },
    boxCodeDetail(row) {
      this.isBoxCodeDetailShow = true
      this.currentBrand = row
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
