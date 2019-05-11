<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 400px;"
        class="filter-item"
        placeholder="品牌序列号/品牌名称"
        v-model="listQuery.searchText"
      ></el-input>
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
      >{{$t('table.search')}}</el-button>
    </div>

    <el-table
      :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      size="mini"
      style="width: 100%;border-top-width: 2px;border-left-width: 2px;"
    >
      <el-table-column
        align="center"
        label="品牌序列号"
        prop="brandNo"
        min-width="150"
      />

      <el-table-column
        align="center"
        label="品牌名称（中文）"
        prop="chineseName"
        min-width="140"
      />

      <el-table-column
        align="center"
        label="品牌名称（英文）"
        prop="englishName"
        min-width="140"
      />

      <el-table-column align="center" label="原产国/产地" prop="productionPlaceChinese" min-width="140"/>
      <el-table-column
        prop="brandStatus"
        label="品牌状态"
        min-width="120"
        :filters="[{ text: '正常供货', value: 1 }, { text: '停止供货', value: 2 }]"
        :filter-method="filterHandler"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brandStatus | brandStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        align="center"
        :label="$t('order.operation')"
        class-name="small-padding"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="productCodeDetail(scope.row)" :disabled="scope.row.flow==2">查看商品码</el-button>
          <el-button type="primary" size="mini" @click="boxCodeDetail(scope.row)" :disabled="scope.row.flow==2">查看箱码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog :visible.sync="isProductCodeDetailShow" title="查看商品码" width="80%">
      <product-code-detail :brand="currentBrand" v-if="isProductCodeDetailShow"></product-code-detail>
    </el-dialog>

    <el-dialog :visible.sync="isBoxCodeDetailShow" title="查看箱码" width="80%">
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
        searchText: '',
        page: 1,
        limit: 20
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
      this.$request({
          url: '/brand/brandList.do',
          method: 'post',
          data: this.listQuery
        }).then((res) => {
          this.list = res.data.items
          this.total = res.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
          this.$message.error('数据请求失败');
        })

    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    productCodeDetail(row) {
      this.currentBrand = row
      this.isProductCodeDetailShow = true
    },
    boxCodeDetail(row) {
      this.currentBrand = row
      this.isBoxCodeDetailShow = true
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
  }
}
</script>
<style>
.el-table .cell {
  word-break: break-word;
}
</style>
