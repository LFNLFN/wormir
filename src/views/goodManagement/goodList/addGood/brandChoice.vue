<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.filterMsg1" placeholder="品牌编号/品牌名称/原产国/产地" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable" border
      :data="singleTableData"
      highlight-current-row
      @current-change="handleCurrentChange"
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
        property="brandName_ZH"
        label="品牌名称（中文）">
      </el-table-column>
      <el-table-column
        align="center"
        property="brandName_EN"
        label="品牌名称（英文）">
      </el-table-column>
      <el-table-column
        align="center"
        property="brandStatus"
        label="品牌状态">
      </el-table-column>
      <el-table-column
        align="center"
        property="origin"
        label="原产国/产地">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filterForm: {
          filterMsg1: ''
        },
        singleTableData: [{
          brandNo: 10001,
          brandName_ZH: '兰蔻',
          brandName_EN: 'LANCOME',
          brandStatus: '正常供货',
          origin: '法国'
        }, {
          brandNo: 10002,
          brandName_ZH: '香奈尔',
          brandName_EN: 'Chanel',
          brandStatus: '正常供货',
          origin: '法国'
        }],
        currentRow: null
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val
        this.$emit('choice-close', val)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
