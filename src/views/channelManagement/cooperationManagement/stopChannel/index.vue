<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label>
        <el-input v-model="filterForm.searchText" :placeholder="filterForm.placeholder1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="channelTableData" class="border2" style="width: 100%">
      <el-table-column prop="channelNum" label="渠道号" min-width="180" align="center"></el-table-column>
      <el-table-column prop="channelName" label="渠道名称" min-width="170" align="center"></el-table-column>
      <el-table-column
        prop="terminationStatus"
        label="终止状态"
        min-width="100"
        align="center"
        :filters="terminationStatusFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ terminationStatusMap[scope.row.terminationStatus] ? terminationStatusMap[scope.row.terminationStatus].text : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cooperationType"
        label="合作类型"
        align="center"
        min-width="110"
        :filters="cooperationTypeFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ cooperationTypeMap[scope.row.cooperationType].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelType"
        label="渠道类别"
        align="center"
        min-width="110"
        :filters="channelTypeFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ channelTypeMap[scope.row.channelType].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelProp"
        label="渠道属性"
        align="center"
        min-width="100"
        :filters="channelPropFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <div
            style="min-width: 4em;margin: 0 auto"
          >{{ channelPropMap[scope.row.channelProp].text }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelLevel"
        label="渠道级别"
        align="center"
        min-width="110"
        :filters="channelLevelFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ channelLevelMap[scope.row.channelLevel].text }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endingTime" label="终止日期" min-width="110" align="center"></el-table-column>
      <el-table-column prop="cancellationTime" label="注销日期" min-width="110" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center" min-width="110"></el-table-column>
      <el-table-column prop="openedDate" label="开通时间" align="center" min-width="110"></el-table-column>
      <el-table-column label="操作" width="130" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detailShow(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 1em;text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterForm.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="filterForm.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterForm.total"
      ></el-pagination>
    </div>

    <el-dialog
      :visible.sync="isDetailShow"
      width="75%"
      @close="isDetailShow = false"
      title="渠道档案信息"
    >
      <check-detail v-if="isDetailShow" :currentRow="currentRow"></check-detail>
    </el-dialog>
  </div>
</template>

<script>
import Mock from 'mockjs'
import { channel_BlurSearch } from '@/api/channel'
import checkDetail from './checkDetail.vue'
import Vue from 'vue';

export default {
  components: {
    checkDetail
  },
  data() {
    return {
      currentRow: null,
      isDetailShow: false,
      filterForm: {
        placeholder1: '渠道号/渠道名称',
        searchText: '',
        page: 1,
        limit: 10,
        total: 0,
        type: 1
      },
      channelTableData: [
      ],
      terminationStatusFilters: [
        { text: '到期终止', value: 0 },
        { text: '提前终止', value: 1 },
        { text: '违规终止', value: 2 }
      ],
      terminationStatusMap: {
        0: { text: '到期终止', value: 0 },
        1: { text: '提前终止', value: 1 },
        2: { text: '违规终止', value: 2 }
      },
      channelCodeFilters: [
        { text: 'DLQD', value: 1 },
        { text: 'DFQD', value: 2 },
        { text: 'FXQD', value: 3 }
      ],
      channelCodeMap: {
        0: { text: 'DLQD', value: 1 },
        1: { text: 'DFQD', value: 2 },
        2: { text: 'FXQD', value: 3 }
      },
      channelStatusFilters: [
        { text: '停止合作', value: -1000 },
        { text: '停止签合同', value: -100 },
        { text: '停止激活账号', value: -200 },
        { text: '停止付保证金', value: -300 },
        { text: '不返还保证金', value: -350 },
        { text: '停止技术对接', value: -400 },
        { text: '停止审核', value: -50 },
        { text: '审核不通过', value: -40 },
        { text: '待返还保证金', value: -950 },
        { text: '已返还保证金', value: -900 },
        { text: '待提交审核', value: 40 },
        { text: '待审核', value: 50 },
        { text: '待签合同', value: 100 },
        { text: '待激活账号', value: 200 },
        { text: '待付保证金', value: 300 },
        { text: '待接系统', value: 400 },
        { text: '已开通', value: 1000 },
      ],
      channelStatusMap: {
        '-1000': { text: '停止合作', value: -1000 },
        '-100': { text: '停止签合同', value: -100 },
        '-200': { text: '停止激活账号', value: -200 },
        '-300': { text: '停止付保证金', value: -300 },
        '-350': { text: '不返还保证金', value: -350 },
        '-400': { text: '停止技术对接', value: -400 },
        '-50': { text: '停止审核', value: -50 },
        '-40': { text: '审核不通过', value: -40 },
        '-950': { text: '待返还保证金', value: -950 },
        '-900': { text: '已返还保证金', value: -900 },
        '40': { text: '待提交审核', value: 40 },
        '50': { text: '待审核', value: 50 },
        100: { text: '待签合同', value: 100 },
        200: { text: '待激活账号', value: 200 },
        300: { text: '待付保证金', value: 300 },
        400: { text: '待接系统', value: 400 },
        1000: { text: '已开通', value: 1000 },
      },
      cooperationTypeFilters: [
        { text: '渠道入驻', value: 1 },
        { text: '渠道变更', value: 2 }
      ],
      cooperationTypeMap: {
        0: { text: '渠道入驻', value: 1 },
        1: { text: '渠道变更', value: 2 }
      },
      channelTypeFilters: [
        { text: '淘宝C店', value: 1 },
        { text: '淘宝企业店', value: 2 },
        { text: '天猫店', value: 3 },
        { text: 'B2C平台', value: 4 },
      ],
      channelTypeMap: {
        0: { text: '淘宝C店', value: 1 },
        1: { text: '淘宝企业店', value: 2 },
        2: { text: '天猫店', value: 3 },
        3: { text: 'B2C平台', value: 4 },
      },
      channelPropFilters: [
        { text: '独立渠道(DLQD)', value: 1 },
        { text: '代发渠道(DFQD)', value: 2 },
        { text: '分销渠道(FXQD)', value: 3 }
      ],
      channelPropMap: {
        0: { text: '独立渠道(DLQD)', value: 1 },
        1: { text: '代发渠道(DFQD)', value: 2 },
        2: { text: '分销渠道(FXQD)', value: 3 },
      },
      channelLevelFilters: [
        { text: 'A级渠道', value: 1 },
        { text: 'B级渠道', value: 2 },
        { text: 'C级渠道', value: 3 },
        { text: 'D级渠道', value: 4 }
      ],
      channelLevelMap: {
        0: { text: 'A级渠道', value: 1 },
        1: { text: 'B级渠道', value: 2 },
        2: { text: 'C级渠道', value: 3 },
        3: { text: 'C级渠道', value: 4 },
      }
    }
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    channelBlurSearch() {
      this.$request({
        url: '/channel/terminateList.do',
        method: 'post',
        data: this.filterForm
      }).then(res => {
        this.channelTableData = res.data.items
        this.filterForm.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.filterForm.limit = val
      this.channelBlurSearch()
    },
    handleCurrentChange(val) {
      this.filterForm.page = val
      this.channelBlurSearch()
    },
    detailShow(row) {
      this.currentRow = row
      this.isDetailShow = true
    },
  },
  created() {
    this.channelBlurSearch()
  }
}
</script>

<style lang="scss" scoped>
.el-table .el-button {
  width: 9em;
  margin-left: 1px;
  margin-bottom: 10px;

  & :last-of-type {
    margin-bottom: 0;
  }
}
</style>
