<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.channelMsg1" :placeholder="filterForm.placeholder1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="channelTableData"
      style="width: 100%">
      <el-table-column
        prop="channelNum"
        label="渠道号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="endingStatus"
        label="终止状态"
        align="center">
      </el-table-column>
      <el-table-column
        prop="cooperationType"
        label="合作类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelType"
        label="渠道类别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelProp"
        label="渠道属性"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelLevel"
        label="渠道级别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="endingTime"
        label="终止时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="cancellationTime"
        label="注销时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="openingTime"
        label="开通时间"
        align="center">
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
  import { channel_BlurSearch } from '@/api/channel'
  export default {
    data() {
      return {
        filterForm: {
          placeholder1: '渠道号/渠道名称',
          channelMsg1: '',
          currentPage: 1,
          page_size: 10,
          total: 0
        },
        channelTableData: [{
          channelNum: 'DLQD20180522001',
          channelName: 'FXQD',
          endingStatus: '终止状态',
          cooperationType: '暂未开发',
          channelType: '淘宝企业店',
          channelProp: '独立渠道',
          channelLevel: 'B级渠道',
          endingTime: '2018-05-22 17:58',
          cancellationTime: '2018-05-22 17:58',
          createTime: '2018-05-22 17:58',
          openingTime: '2018-05-22 17:58'
        }]
      }
    },
    methods: {
      channelBlurSearch() {
        channel_BlurSearch(this.filterForm.channelMsg1)
          .then((res) => { this.channelTableData = res.data; this.filterForm.total = res.data.length })
          .catch(() => { this.$message.error('表格加载失败') })
      },
      handleSizeChange(val) {
        channel_BlurSearch(this.filterForm.value1, 1, val)
          .then((res) => { this.channelTableData = res.data; this.filterForm.total = res.data.length })
        this.filterForm.page_size = val
      },
      handleCurrentChange(val) {
        channel_BlurSearch(this.filterForm.value1, val)
          .then((res) => { this.channelTableData = res.data; this.filterForm.total = res.data.length })
        this.filterForm.currentPage = val
      }
    },
    mounted() {
      this.channelBlurSearch()
    }
  }
</script>

<style lang="scss" scoped>
  .el-table .el-button {
    width: 9em;
    margin-left: 1px;
    margin-bottom: 10px;
    &:last-of-type {
       margin-bottom: 0
     }
  }
</style>
