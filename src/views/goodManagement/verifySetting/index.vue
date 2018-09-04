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
          <el-row>
            <el-button type="primary" size="mini" @click="firstStagePage(scope.row)">一级页面</el-button>
          </el-row>
          <el-row>
            <el-button type="primary" size="mini" @click="secondStagePage(scope.row)">二级页面</el-button>
          </el-row>
          <el-row>
            <el-button type="primary" size="mini" @click="thirdStagePage(scope.row)">三级页面</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isFirstPageDetailShow">
      <product-code-detail :brand="currentBrand" v-if="isFirstPageDetailShow"></product-code-detail>
    </el-dialog>

    <el-dialog :visible.sync="isSecondPageDetailShow">
      <box-code-detail :brand="currentBrand" v-if="isSecondPageDetailShow"></box-code-detail>
    </el-dialog>

    <el-dialog :visible.sync="isThirdPageDetailShow">
      <box-code-detail :brand="currentBrand" v-if="isThirdPageDetailShow"></box-code-detail>
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves'

export default {
  components: {
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
      isFirstPageDetailShow: false,
      isSecondPageDetailShow: false,
      isThirdPageDetailShow: false,
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
    firstStagePage(row) {
      this.isFirstPageDetailShow = true
      this.currentBrand = row
    },
    secondStagePage(row) {
      this.isSecondPageDetailShow = true
      this.currentBrand = row
    },
    thirdStagePage(row) {
      this.isThirdPageDetailShow = true
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
