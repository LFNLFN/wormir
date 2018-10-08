<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.brandMsg1" :placeholder="filterForm.placeholder1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="brandBlurSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="showAddBrand">新增品牌</el-button>
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
        label="品牌状态"
        align="center">
        <template slot-scope="scope">
          <span>正常供货</span>
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
        label="录入时间"
        align="center">
        <template slot-scope="scope">
          <span>2018-03-20 09:44</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="">编辑
          </el-button>
          <el-button
            size="mini"
            @click="">商品管理
          </el-button>
          <el-button
            size="mini"
            @click="">终止合作
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
    <el-dialog :visible.sync="isAddBrandShow" width="75%" @close="isAddBrandShow = false" title="新增品牌">
      <addBrand></addBrand>
    </el-dialog>
  </div>
</template>

<script>
  import { brand_BlurSearch } from '@/api/brand'
  import addBrand from './addBrand/index.vue'
  export default {
    data() {
      return {
        filterForm: {
          placeholder1: '品牌号/品牌名称',
          brandMsg1: '',
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
        isAddBrandShow: false
      }
    },
    methods: {
      brandBlurSearch() {
        brand_BlurSearch(this.filterForm.brandMsg1)
          .then((res) => { this.brandTableData = res.data; this.filterForm.total = res.data.length })
          // .catch(() => { this.$message.error('表格加载失败') })
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
      showAddBrand() {
        this.isAddBrandShow = true
      }
    },
    mounted() {
      this.brandBlurSearch()
    },
    components: {
      addBrand
    }
  }
</script>

<style lang="scss" scoped>
  .el-table .el-button {
    width: 7em;
    margin-left: 1px;
    margin-bottom: 10px;
    &:last-of-type {
       margin-bottom: 0
     }
  }
</style>
