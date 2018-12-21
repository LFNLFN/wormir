<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.searchText" placeholder="品牌编号/品牌名称/原产国/产地" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="brandBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable" border
      :data="singleTableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      class="border-top2 border-left2"
      style="width: 100%">
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
        align="center"
        property="brandStatus"
        label="品牌状态">
      </el-table-column>
      <el-table-column
        align="center"
        property="brandOrigin"
        label="原产国/产地">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import request from "@/utils/request";

  export default {
    data() {
      return {
        filterForm: {
          searchText: ''
        },
        singleTableData: [],
        currentRow: null
      }
    },
    mounted() {
      this.brandBlurSearch()
    },
    methods: {
      brandBlurSearch() {
        request({
          url: '/brand/brandList.do',
          method: 'post',
          data: {
            page: 1,
            limit: 10,
            searchText: this.filterForm.searchText
          }
        }).then((res) => {
          this.singleTableData = res.data.items
//          this.filterForm.total = res.data.total
          console.log(res.data.items)
        }).catch(() => {
          this.$message.error('数据请求失败');
        })
      },
      handleCurrentChange(val) {
        this.currentRow = val
        this.$emit('choice-close', val)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
