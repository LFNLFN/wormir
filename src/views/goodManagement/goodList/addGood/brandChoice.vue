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
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filterForm: {
          filterMsg1: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
