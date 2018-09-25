<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.channelMsg1" :placeholder="filterForm.placeholder1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="brandBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="brandTableData"
      style="width: 100%">
      <el-table-column
        prop="brandNo"
        label="品牌序列号"
        align="center">
        <template slot-scope="scope">
          <span>10001</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="品牌名称（中文）"
        align="center">
        <template slot-scope="scope">
          <span>兰蔻</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="品牌名称（英文）"
        align="center">
        <template slot-scope="scope">
          <span>LANCOME</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="已入库"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="">20
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="原产国/产地"
        align="center">
        <template slot-scope="scope">
          <span>法国</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="品牌状态"
        align="center">
        <template slot-scope="scope">
          <span>正常供货</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="generationShow">生成箱码
          </el-button>
        </template>
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
    <el-dialog :visible.sync="isGenerationShow" width="75%" @close="isGenerationShow = false" title="箱码生成">
      <code-generation></code-generation>
    </el-dialog>
  </div>
</template>

<script>
  import { brand_BlurSearch } from '@/api/brand'
  import codeGeneration from './codeGeneration'
  export default {
    data() {
      return {
        filterForm: {
          placeholder1: '关键字 品牌编号/品牌名称',
          channelMsg1: '',
          currentPage: 1,
          page_size: 10,
          total: 0
        },
        brandTableData: [{
          brandNo: 'DLQD20180522001',
          brandName_ZH: '兰蔻',
          brandName_EN: 'LANCOME',
          brandStatus: '淘宝企业店'
        }],
        isGenerationShow: false
      }
    },
    methods: {
      brandBlurSearch() {
        brand_BlurSearch(this.filterForm.brandMsg1)
          .then((res) => { this.brandTableData = res.data; this.filterForm.total = res.data.length })
          .catch(() => { this.$message.error('表格加载失败') })
      },
      handleSizeChange(val) {
        brand_BlurSearch(this.filterForm.value1, 1, val)
          .then((res) => { this.brandTableData = res.data; this.filterForm.total = res.data.length })
        this.filterForm.page_size = val
      },
      handleCurrentChange(val) {
        brand_BlurSearch(this.filterForm.value1, val)
          .then((res) => { this.brandTableData = res.data; this.filterForm.total = res.data.length })
        this.filterForm.currentPage = val
      },
      generationShow() {
        this.isGenerationShow = true
      }
    },
    mounted() {
      this.brandBlurSearch()
    },
    components: {
      codeGeneration
    }
  }
</script>

<style lang="scss" scoped>
  .el-table .el-button {
    width: 8em;
    margin-left: 1px;
    margin-bottom: 10px;
  &:last-of-type {
     margin-bottom: 0
   }
  }
</style>
