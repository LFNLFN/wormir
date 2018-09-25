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
      :data="trackingTableData"
      style="width: 100%">
      <el-table-column
        fixed
        prop="brandNo"
        label="溯源状态"
        align="center">
        <template slot-scope="scope">
          <span>未开发</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="品牌编号"
        align="center">
        <template slot-scope="scope">
          <span>10001</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="商品编号"
        align="center">
        <template slot-scope="scope">
          <span>32010001</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="商品名称"
        align="center">
        <template slot-scope="scope">
          <span>兰蔻（LANCOME）空气轻垫唇油 口红唇釉唇彩 空气轻垫唇油166 6ML</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="商品规格"
        align="center">
        <template slot-scope="scope">
          <span>102毫升/支</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="溯源码"
        align="center">
        <template slot-scope="scope">
          <span>10001180329p1225856n</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="箱码"
        align="center">
        <template slot-scope="scope">
          <span>100011803299100002X</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="销售价格"
        align="center">
        <template slot-scope="scope">
          <span>240.00</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="中国库存"
        align="center">
        <template slot-scope="scope">
          <span>1</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="商品属性"
        align="center">
        <template slot-scope="scope">
          <span>特等品</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="销售数量"
        align="center">
        <template slot-scope="scope">
          <span>10</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="售出时间"
        align="center">
        <template slot-scope="scope">
          <span>2018-03-20 09:44</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="销售渠道号"
        align="center">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="销售级别"
        align="center">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="收货时间"
        align="center">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="订货单号"
        align="center">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandNo"
        label="数量"
        align="center">
        <template slot-scope="scope">
          <span>1</span>
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
          placeholder1: '品牌编号/品牌名称',
          channelMsg1: '',
          currentPage: 1
        },
        trackingTableData: [{
          brandNo: 'DLQD20180522001'
        }]
      }
    },
    methods: {
      brandBlurSearch() {
        brand_BlurSearch(this.filterForm.brandMsg1)
          .then((res) => { this.brandTableData = res.data; this.filterForm.total = res.data.length  })
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
      }
    },
    mounted() {
      this.brandBlurSearch()
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
