<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="品牌序列号/品牌名称"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table :data="list"
              v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row size="mini"
              class="border-top2 border-left2"
              style="width: 100%">
      <el-table-column min-width="120" align="center" label="品牌序列号" prop="brandNo"
                       :filters="brandFilters"
                       :filter-method="filterHandler"/>
      <el-table-column min-width="120" align="center" label="品牌名称（中文）" prop="chineseName"
                       :filters="chineseNameFilters"
                       :filter-method="filterHandler" />
      <el-table-column min-width="120" align="center" label="品牌名称（英文）" prop="englishName"
                       :filters="englishNameFilters"
                       :filter-method="filterHandler" />
      <el-table-column min-width="120" align="center" label="原产国/产地" prop="provenance"/>
      <el-table-column min-width="120" align="center" label="品牌状态" prop="status"
                       :filters="statusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ statusMap[scope.row.status].text }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" :label="$t('order.operation')" class-name="small-padding">
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

    <el-dialog :visible.sync="isFirstPageDetailShow" width="95%" title="一级页面">
      <first-page :brand="currentBrand" v-if="isFirstPageDetailShow"></first-page>
    </el-dialog>

    <el-dialog :visible.sync="isSecondPageDetailShow">
      <second-page :brand="currentBrand" v-if="isSecondPageDetailShow"></second-page>
    </el-dialog>

    <el-dialog :visible.sync="isThirdPageDetailShow">
      <third-page :brand="currentBrand" v-if="isThirdPageDetailShow"></third-page>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves'
  import Mock from 'mockjs'
  import firstPage from './firstPage/index.vue'

  export default {
    components: {
      firstPage
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
        total: 0,
        brandFilters: [
          { text: 'LANCOM', value: 123456 },
          { text: 'AESOP', value: 654321 }
        ],
        chineseNameFilters: [
          { text: '兰蔻', value: '兰蔻' },
          { text: '伊索', value: '伊索' }
        ],
        englishNameFilters: [
          { text: 'LANCOM', value: 'LANCOM' },
          { text: 'AESOP', value: 'AESOP' }
        ],
        statusFilters: [
          { text: '兰蔻', value: '兰蔻' },
          { text: '伊索', value: '伊索' }
        ],
        statusMap: {
          0: { text: '停止供货', value: 0 },
          1: { text: '正常供货', value: 1 },
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        this.list.push({
          brandNo: 123456,
          chineseName: '兰蔻',
          englishName: 'LANCOM',
          provenance: '法国',
          status: Mock.Random.natural(0, 1)
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
