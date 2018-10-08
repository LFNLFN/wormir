<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.channelMsg1" :placeholder="filterForm.placeholder1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="brandBlurSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="">新增品牌</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="brandTableData"
      style="width: 100%">
      <el-table-column
        fixed
        prop="thumbnail"
        :label="$t('product.thumbnail')"
        align="center">
        <template slot-scope="scope">
          <img src="" alt="No pic">
        </template>
      </el-table-column>
      <el-table-column
        prop="productSerialNo"
        :label="$t('product.productSerialNo')"
        align="center">
        <template slot-scope="scope">
          <span>103883683</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandName"
        :label="$t('brand.brandName')"
        align="center">
        <template slot-scope="scope">
          <span>LANCOME</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="goodProp"
        label="商品属性"
        align="center">
        <template slot-scope="scope">
          <span>常规</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mainType"
        label="主品类"
        align="center">
        <template slot-scope="scope">
          <span>面部</span>
        </template>
      </el-table-column>
      <el-table-column
        label="子品类"
        align="center">
        <template slot-scope="scope">
          <span>保湿</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品系列"
        align="center">
        <template slot-scope="scope">
          <span>薰衣草</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品编号"
        align="center">
        <template slot-scope="scope">
          <span>32453453</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称-中文"
        align="center">
        <template slot-scope="scope">
          <span>兰蔻（LANCOME）空气轻垫唇油 口红唇釉唇彩 空气轻垫唇油166 6ML</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称-英文"
        align="center">
        <template slot-scope="scope">
          <span>Lancome (LANCOME) air cushion lip oil mouth red lip gloss lip gloss air cushion lip oil 166 6ML</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品状态"
        align="center">
        <template slot-scope="scope">
          <span>正常销售</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品售价"
        align="center">
        <template slot-scope="scope">
          <span>240.00</span>
        </template>
      </el-table-column>
      <el-table-column
        label="起订折扣"
        align="center">
        <template slot-scope="scope">
          <span>1.0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="录入时间"
        align="center">
        <template slot-scope="scope">
          <span>2018-03-20 09:50</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="130"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="">查看详情
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
  </div>
</template>

<script>
  import { brand_BlurSearch } from '@/api/brand'
  export default {
    data() {
      return {
        filterForm: {
          placeholder1: '品牌号/品牌名称',
          channelMsg1: '',
          currentPage: 1,
          page_size: 10,
          total: 0
        },
        brandTableData: [{
          brandNo: 'DLQD20180522001',
          brandName_ZH: '兰蔻',
          brandName_EN: 'LANCOME',
          brandStatus: '淘宝企业店',
        }]
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
      }
    },
    mounted() {
      this.brandBlurSearch()
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
