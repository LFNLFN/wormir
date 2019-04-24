<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label>
        <el-input v-model="filterForm.searchText" placeholder="渠道号/渠道名称"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-date-picker v-model="filterForm.openedDate" type="month" placeholder="开通时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="channelTableData" style="width: 100%;border-width:2px" class="border2">
      <el-table-column
        prop="channelNum"
        label="渠道号"
        min-width="190"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span class="link-type" @click="showCheck(scope.row)">{{ scope.row.channelNum }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="渠道名称" min-width="180" align="center"></el-table-column>
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
      <!--<el-table-column-->
        <!--prop="channelProp"-->
        <!--label="渠道属性"-->
        <!--align="center"-->
        <!--min-width="100"-->
        <!--:filters="channelPropFilters"-->
        <!--:filter-method="filterHandler"-->
      <!--&gt;-->
        <!--<template slot-scope="scope">-->
          <!--<div-->
            <!--style="min-width: 4em;margin: 0 auto"-->
          <!--&gt;{{ channelPropMap[scope.row.channelProp].text }}</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="channelLevel"
        label="渠道级别"
        align="center"
        min-width="110"
        :filters="channelLevelFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.channelProp == 4 ? channelLevelMap[scope.row.channelLevel].text : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contractPeriod" label="合同期限" align="center" min-width="110">
        <template slot-scope="scope">
          <div>{{ scope.row.contractStartTime }}</div>
          <div>{{ '至' }}</div>
          <div>{{ scope.row.contractEndTime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center" min-width="110"></el-table-column>
      <el-table-column prop="openedDate" label="开通时间" align="center" min-width="110"></el-table-column>
      <el-table-column label="操作" align="center" min-width="140">
        <template slot-scope="scope">
          <el-button size="mini" @click="showManagement(scope.row)">去管理</el-button>
          <el-button size="mini" type="danger" @click="showDelete(scope.row)">强制注销</el-button>
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
    <el-dialog :visible.sync="isCheckShow" width="75%" @close="isCheckShow = false" title="查看渠道档案">
      <to-check-detail :currentRow="currentRow" v-if="isCheckShow"></to-check-detail>
    </el-dialog>
    <el-dialog
      :visible.sync="isDeleteShow"
      width="85%"
      @close="isDeleteShow = false"
      title="注销终止渠道"
    >
      <to-delete
        v-if="isDeleteShow"
        :currentRow="currentRow"
        @closeOutDialog="isDeleteShow = false"
        @submitSuccess="deleteSuccess"
      ></to-delete>
    </el-dialog>
    <el-dialog
      :visible.sync="isManagementShow"
      width="75%"
      @close="isManagementShow = false"
      title="管理渠道档案"
    >
      <to-management
        :currentRow="currentRow"
        v-if="isManagementShow"
        @closeDialog="isManagementShow=false"
        @submitSuccess="editSuccess"
      ></to-management>
    </el-dialog>
  </div>
</template>

<script>
import Mock from 'mockjs'
import { channel_BlurSearch_withTime } from '@/api/channel'
import toCheckDetail from './toCheckDetail.vue'
import toDelete from './toDelete.vue'
import toManagement from './toManagement.vue'
import request from '@/utils/request'

export default {
  components: {
    toCheckDetail,
    toDelete,
    toManagement
  },
  data() {
    return {
      currentRow: null,
      isCheckShow: false,
      isDeleteShow: false,
      isManagementShow: false,
      filterForm: {
        searchText: '',
        openedDate: '',
        page: 1,
        limit: 10,
        total: 0
      },
      channelTableData: [],
      channelCodeFilters: [
        { text: 'DLQD', value: 0 },
        { text: 'DFQD', value: 1 },
        { text: 'FXQD', value: 2 }
      ],
      channelCodeMap: {
        0: { text: 'DLQD', value: 0 },
        1: { text: 'DFQD', value: 1 },
        2: { text: 'FXQD', value: 2 }
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
        { text: '代发渠道(DFQD)', value: 2 },
        { text: '分销渠道(FXQD)', value: 3 }
      ],
      channelPropMap: {
        1: { text: '独立渠道(DLQD)', value: 1 },
        2: { text: '代发渠道(DFQD)', value: 2 },
        3: { text: '分销渠道(FXQD)', value: 3 },
      },
      channelLevelFilters: [
        { text: 'A级渠道', value: 1 },
        { text: 'B级渠道', value: 2 },
        { text: 'C级渠道', value: 3 },
        { text: 'D级渠道', value: 4 }
      ],
      channelLevelMap: {
        1: { text: 'A级渠道', value: 1 },
        2: { text: 'B级渠道', value: 2 },
        3: { text: 'C级渠道', value: 3 },
        4: { text: 'D级渠道', value: 4 },
      }
    }
  },
  methods: {
    channelBlurSearch() {
      request({
        url: '/channel/cooperateChannelList.do',
        method: 'post',
        data: this.filterForm,
      }).then((res) => {
        this.channelTableData = res.data.items
        this.filterForm.total = res.data.total
        console.log(this.channelTableData)
      }).catch(() => {
        this.$message.error('表格加载失败')
      })
    },

    handleSizeChange(val) {
      channel_BlurSearch_withTime(this.filterForm.value1, null, 1, val)
        .then((res) => {
          this.channelTableData = res.data
          this.filterForm.total = res.data.length
        })
      this.filterForm.limit = val
    },
    handleCurrentChange(val) {
      channel_BlurSearch_withTime(this.filterForm.value1, null, val)
        .then((res) => {
          this.channelTableData = res.data
          this.filterForm.total = res.data.length
        })
      this.filterForm.page = val
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    showCheck(row) {
      this.currentRow = row
      this.isCheckShow = true
    },
    showDelete(row) {
      this.currentRow = row
      this.isDeleteShow = true
    },
    showManagement(row) {
      this.currentRow = row
      this.isManagementShow = true
    },
    // 提交相关
    editSuccess() {
      this.isManagementShow = false
      this.$message({
        message: '操作成功！',
        type: 'success'
      });
      this.channelBlurSearch()
    },
    deleteSuccess() {
      this.isDeleteShow = false
      this.$message({
        message: '操作成功！',
        type: 'success'
      })
      this.channelBlurSearch()
    },
  },
  mounted() {
    this.channelBlurSearch()
  }
}
</script>

<style lang="scss" scoped>
.el-table .el-button {
  width: 7em;
  margin-left: 1px;
  margin-bottom: 10px;
}
</style>
