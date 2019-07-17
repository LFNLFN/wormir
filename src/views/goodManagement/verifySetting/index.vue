<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="品牌序列号/品牌名称"
                v-model="listQuery.searchText">
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
      <el-table-column min-width="120" align="center" label="品牌序列号" prop="brandNo"/>
      <el-table-column min-width="120" align="center" label="品牌名称（英文）" prop="englishName"/>
      <el-table-column min-width="120" align="center" label="品牌名称（中文）" prop="chineseName"/>
      <el-table-column min-width="120" align="center" label="原产国/产地" prop="productionPlaceChinese"/>
      <el-table-column min-width="120" align="center" label="品牌状态" prop="status"
                       :filters="statusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ statusMap[scope.row.brandStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" :label="$t('order.operation')" class-name="small-padding">
        <template slot-scope="scope">
          <div class="table-btn-wrap">
            <el-button type="primary" size="mini" @click="firstStagePage(scope.row)">一级页面</el-button>
          </div>
          <div class="table-btn-wrap">
            <el-button type="primary" size="mini" @click="secondStagePage(scope.row)">二级页面</el-button>
          </div>
          <div class="table-btn-wrap">
            <el-button type="primary" size="mini" @click="thirdStagePage(scope.row)">三级页面</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isFirstPageDetailShow" width="95%" title="一级页面">
      <first-page :brand="currentBrand" v-if="isFirstPageDetailShow" @toSecondLevelPage="toSecondLevelPage"></first-page>
    </el-dialog>

    <el-dialog :visible.sync="isSecondPageDetailShow" width="95%" title="二级页面">
      <second-page :brand="currentBrand" v-if="isSecondPageDetailShow" @toThirdLevelPage="toThirdLevelPage"></second-page>
    </el-dialog>

    <el-dialog :visible.sync="isThirdPageDetailShow" width="95%" title="三级页面">
      <third-page :brand="currentBrand" v-if="isThirdPageDetailShow"></third-page>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves'
  import firstPage from './firstPage/index.vue'
  import secondPage from './secondPage/index.vue'
  import thirdPage from './thirdPage/index.vue'

  export default {
    components: {
      firstPage,
      secondPage,
      thirdPage
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
        isFirstPageDetailShow: false,
        isSecondPageDetailShow: false,
        isThirdPageDetailShow: false,
        currentBrand: '',
        listLoading: false,
        total: 0,
        statusFilters: [
          { text: '正常供货', value: 1 },
          { text: '停止供货', value: 2 },
        ],
        statusMap: {
          1: { text: '正常供货', value: 1 },
          2: { text: '停止供货', value: 2 },
        },
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
       }).catch((err) => {
         this.listLoading = false
         this.$message.error('数据请求失败');
       })
      },
      handleFilter() {
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
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
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      toSecondLevelPage() {
        this.isFirstPageDetailShow = false
        this.isSecondPageDetailShow = true
      },
      toThirdLevelPage() {
        this.isSecondPageDetailShow = false
        this.isThirdPageDetailShow = true
      },
    }
  }
</script>

<style scoped>
  .table-btn-wrap {
    margin: 5px 0;
  }
</style>
