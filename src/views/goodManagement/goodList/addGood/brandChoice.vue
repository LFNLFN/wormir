<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.filterMsg1" placeholder="品牌编号/品牌名称/原产国/产地" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable" border
      :data="singleTableData"
      highlight-current-row
      @row-click='cellClick'
      :header-cell-style="{ borderTop: '1px solid #D5D5D5' }"
      class="noBorder sumBorder"
      style="width: 100%; border-right: none; border-left:solid #D5D5D5 2px">
      <el-table-column
        align="center"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        property="brandNo"
        label="品牌序列号"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        property="chineseName"
        label="品牌名称（中文）">
      </el-table-column>
      <el-table-column
        align="center"
        property="englishName"
        label="品牌名称（英文）">
      </el-table-column>
      <el-table-column
        prop="brandStatus"
        label="品牌状态"
        min-width="120"
        :filters="[{ text: '正常供货', value: 1 }, { text: '停止供货', value: 0 }]"
        :filter-method="filterHandler_brandStatus"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brandStatus? '正常供货' : '停止供货' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="brandOrigin"
        label="原产国/产地"
        class-name="last-col">
      </el-table-column>
    </el-table>
    <div style="margin-top: 1em;text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterForm.currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="filterForm.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterForm.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import request from "@/utils/request";

  export default {
    data() {
      return {
        filterForm: {
          filterMsg1: '',
          page_size: 10,
          currentPage: 1,
          total: 0
        },
        singleTableData: [],
        currentRow: null
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.filterForm.currentPage = val
        this.getList()
      },
      handleSizeChange(val) {
        this.filterForm.page_size = val
        this.getList()
      },
      cellClick(row, event, column) {
         console.log(row);
        request({
          url: '/brand/brandDetail.do',
          method: 'post',
          data: { brandNo: row.brandNo }
        }).then(res => {
//          console.log(res.data)
          this.$emit('choice-close', res.data)
        })
      },
      getList() {
        request({
          url: '/brand/brandList.do',
          method: 'post',
          data: {
            page: this.filterForm.currentPage,
            limit: this.filterForm.page_size,
            searchText: this.filterForm.filterMsg1
          }
        }).then(res => {
          this.filterForm.total = res.data.total
          this.singleTableData = res.data.items
        })
      },
      filterHandler_brandStatus(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    },
    created() {
      this.getList()
    }
  }
</script>

<style lang="scss" scoped>

</style>
