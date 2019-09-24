<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label>
        <el-input v-model="filterForm.searchText" :placeholder="filterForm.placeholder1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="channelTableData" class="border2" style="width: 100%;border-width:2px;border-right-width: 1px">
      <el-table-column prop="channelNum" label="渠道号" min-width="180" align="center"></el-table-column>
      <el-table-column prop="channelName" label="渠道名称" min-width="170" align="center"></el-table-column>
      <el-table-column
        prop="cooperationType"
        label="合作类型"
        align="center"
        min-width="110"
        :filters="cooperationTypeFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cooperationType | cooperationTypeFilter }}</span>
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
          <span>{{ scope.row.channelType | channelType }}</span>
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
          >{{ scope.row.channelProp | channelPropFilter }}</div>
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
          <span>{{ scope.row.channelLevel | channelLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cancellationTime" label="终止时间" min-width="110" align="center"></el-table-column>
      <el-table-column prop="cancellationTime" label="注销时间" min-width="110" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" min-width="110"></el-table-column>
      <el-table-column prop="openedDate" label="开通时间" align="center" min-width="110"></el-table-column>
      <el-table-column label="操作" width="130" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detailShow(scope.row)">查看详情</el-button>
          <el-button size="mini" type="primary" @click="cancelAccountShow(scope.row)">停止系统对接</el-button>
          <!--<el-button size="mini" type="primary" @click="linkingShow(scope.row)">停止系统对接</el-button>-->
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
      title="渠道档案"
    >
      <check-detail v-if="isDetailShow" :currentRow="currentRow"></check-detail>
    </el-dialog>
    <el-dialog
      :visible.sync="isLinkingShow"
      width="75%"
      @close="isLinkingShow = false"
      title="停止系统对接"
    >
      <stop-linking-system
        v-if="isLinkingShow"
        :currentRow="currentRow"
        @closeDialog="isLinkingShow=false"
      ></stop-linking-system>
    </el-dialog>
  </div>
</template>

<script>
import Mock from 'mockjs'
import request from '@/utils/request'
import checkDetail from './checkDetail.vue'
import stopLinkingSystem from './stopLinkingSystem.vue'

export default {
  data() {
    return {
      currentRow: null,
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
      isDetailShow: false,
      isLinkingShow: false,
      channelCodeFilters: [
        { text: 'DLQD', value: 1 },
        { text: 'DFQD', value: 2 },
        { text: 'FXQD', value: 3 },
        { text: 'FXZQD', value: 4 },
      ],
      channelCodeMap: {
        1: { text: 'DLQD', value: 1 },
        2: { text: 'DFQD', value: 2 },
        3: { text: 'FXQD', value: 3 },
        4: { text: 'FXZQD', value: 4 },
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
        1: { text: '渠道入驻', value: 1 },
        2: { text: '渠道变更', value: 2 }
      },
      channelTypeFilters: [
        { text: '淘宝C店', value: 1 },
        { text: '淘宝企业店', value: 2 },
        { text: '天猫店', value: 3 },
        { text: 'B2C平台', value: 4 },
      ],
      channelTypeMap: {
        1: { text: '淘宝C店', value: 1 },
        2: { text: '淘宝企业店', value: 2 },
        3: { text: '天猫店', value: 3 },
        4: { text: 'B2C平台', value: 4 },
      },
      channelPropFilters: [
        { text: '独立渠道(DLQD)', value: 1 },
        // { text: '代发渠道(DFQD)', value: 2 },
        { text: '分销渠道(FXQD)', value: 3 },
        { text: '分销子渠道(FXZQD)', value: 4 },
      ],
      channelLevelFilters: [
        { text: 'A级渠道', value: 1 },
        { text: 'B级渠道', value: 2 },
        { text: 'C级渠道', value: 3 },
        { text: 'D级渠道', value: 4 },
        // { text: '--', value: 5 },
      ],
    }
  },
  methods: {
    channelBlurSearch() {
      this.$request({
        url: '/channel/terminatingList.do',
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
    linkingShow(row) {
      this.currentRow = row
      this.isLinkingShow = true
    },
    cancelAccountShow(row) {
      this.currentRow = row
      this.$confirm('是否已确认银行款项已处理完毕并注销此账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request({
          url: '/channel/cancellationStatusChange.do',
          method: 'post',
          data: {
            channelNo: this.currentRow.channelNo,
            cancellationStatus: 2,
            historyData: this.currentRow
          },
        }).then((res) => {
          if (res.errorCode==0) {
            this.$alert('此账号已注销，可前往‘终止渠道页面查看’', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.channelBlurSearch()
              }
            });
          }
        })

      })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  },
  mounted() {
    this.channelBlurSearch()
  },
  components: {
    checkDetail,
    stopLinkingSystem
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
