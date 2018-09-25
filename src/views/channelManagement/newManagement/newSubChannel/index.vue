<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.channelName" placeholder="渠道名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="channelTableData"
      style="width: 100%">
      <el-table-column
        prop="channelNum"
        label="渠道号"
        width=""
      align="center">
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道名称"
        width="">
      </el-table-column>
      <el-table-column
        prop="channelStatus"
        label="渠道状态">
      </el-table-column>
      <el-table-column
        prop="channelType"
        label="渠道类别">
      </el-table-column>
      <el-table-column
        prop="channelProp"
        label="渠道属性">
      </el-table-column>
      <el-table-column
        prop="channelLevel"
        label="渠道级别">
      </el-table-column>
      <el-table-column
        prop="FXQD_Num"
        label="所属FXQD号">
      </el-table-column>
      <el-table-column
        prop="FXQD_Name"
        label="所属FXQD名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showConfirm">去确认
          </el-button>
          <el-button
            size="mini"
            @click="showCheck">去查看
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="showDelete">强制注销
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
  import { channel_BlurSearch } from '@/api/channel'
  export default {
    data() {
      return {
        filterForm: {
          channelName: '',
          currentPage: 1,
          page_size: 10,
          total: 0
        },
        channelTableData: [{
          channelNum: 'DLQD20180522001',
          channelName: 'FXQD',
          channelStatus: '待激活账号',
          channelType: '淘宝企业店',
          channelProp: '独立渠道',
          channelLevel: 'B级渠道',
          FXQD_Num: '',
          FXQD_Name: '',
          createTime: '2018-05-22 17:58'
        }, {
          channelNum: 'FXQD20180526001',
          channelName: 'FXQD',
          channelStatus: '待激活账号',
          channelType: '淘宝企业店',
          channelProp: '分销渠道(FXQD)',
          channelLevel: 'B级渠道',
          FXQD_Num: '',
          FXQD_Name: '',
          createTime: '2018-05-26 22:33'
        }]
      }
    },
    methods: {
      channelBlurSearch() {
        channel_BlurSearch(this.filterForm.value1)
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
    width: 6em;
    margin-left: 1px;
    margin-bottom: 10px;
  }
</style>
