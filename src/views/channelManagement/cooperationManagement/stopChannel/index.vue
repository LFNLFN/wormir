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
    <el-table border :data="channelTableData" style="width: 100%;border-left-width: 2px;border-top-width: 2px" v-loading="listLoading">
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
          <span>{{ scope.row.terminationType | channelTerminationTypeFilter }}</span>
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
      <el-table-column prop="terminationTime" label="终止日期" min-width="110" align="center"></el-table-column>
      <el-table-column prop="cancellationTime" label="注销日期" min-width="110" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center" min-width="110"></el-table-column>
      <el-table-column prop="openedDate" label="开通时间" align="center" min-width="110"></el-table-column>
      <el-table-column label="操作" width="130" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detailShow(scope.row)">查看详情</el-button>
          <el-button size="mini" type="primary" @click="stopTechnologyTransferShow(scope.row)" v-if="scope.row.stopTechnologyTransfer">终止系统对接</el-button>
          <el-button size="mini" type="primary" @click="makeChannelChangeShow(scope.row)" v-if="scope.row.makeChannelChange">渠道变更</el-button>
          <el-button size="mini" type="primary" @click="channelChangeHistoryShow(scope.row)" v-if="scope.row.makeChannelChange">渠道历史</el-button>
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

    <el-dialog :visible.sync="isAddShow" width="75%" @close="isAddShow = false" title="渠道变更">
      <makeChannelChange v-if="isAddShow" @submitSuccess="addSuccess" :currentRow="currentRow"></makeChannelChange>
    </el-dialog>

    <el-dialog :visible.sync="isHistoryShow" width="75%" @close="isHistoryShow = false" title="渠道变更">
      <channelChangeHistory v-if="isHistoryShow" :currentRow="currentRow"></channelChangeHistory>
    </el-dialog>

  </div>
</template>

<script>
import { channel_BlurSearch } from '@/api/channel'
import checkDetail from './checkDetail.vue'
import makeChannelChange from './makeChannelChange.vue'
import channelChangeHistory from './channelChangeHistory.vue'
import Vue from 'vue';

export default {
  components: {
    checkDetail,
    makeChannelChange,
    channelChangeHistory,
  },
  data() {
    return {
      currentRow: null,
      isDetailShow: false,
      isAddShow: false,
      isHistoryShow: false,
      filterForm: {
        placeholder1: '渠道号/渠道名称',
        searchText: '',
        page: 1,
        limit: 10,
        total: 0,
        type: 1
      },
      channelTableData: [],
      terminationStatusFilters: [
        { text: '到期终止', value: -100 },
        { text: '提前终止', value: -200 },
        { text: '违规终止', value: -300 },
        { text: '强制终止', value: -400 },
      ],
      channelTypeFilters: [
        { text: '淘宝C店', value: 1 },
        { text: '淘宝企业店', value: 2 },
        { text: '天猫店', value: 3 },
        { text: 'B2C平台', value: 4 },
      ],
      cooperationTypeFilters: [
        { text: '渠道入驻', value: 1 },
        { text: '渠道变更', value: 2 }
      ],
      channelPropFilters: [
        { text: '独立渠道(DLQD)', value: 1 },
        { text: '代发渠道(DFQD)', value: 2 },
        { text: '分销渠道(FXQD)', value: 3 },
        { text: '分销子渠道(FXQD)', value: 4 },
      ],
      channelCodeFilters: [
        { text: 'DLQD', value: 1 },
        { text: 'DFQD', value: 2 },
        { text: 'FXQD', value: 3 }
      ],
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
      channelLevelFilters: [
        { text: 'A级渠道', value: 1 },
        { text: 'B级渠道', value: 2 },
        { text: 'C级渠道', value: 3 },
        { text: 'D级渠道', value: 4 },
        { text: '--', value: 5 },
      ],
      listLoading: false
    }
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    channelBlurSearch() {
      this.listLoading = true
      this.$request({
        url: '/channel/terminateList.do',
        method: 'post',
        data: this.filterForm
      }).then(res => {
        this.channelTableData = res.data.items
        this.filterForm.total = res.data.total
        this.listLoading = false
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
    stopTechnologyTransferShow(row) {
      this.$confirm('是否停止此账号的系统对接?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request({
          url: '/channel/changeTechnologyTransfer.do',
          method: 'post',
          data: {
            channelNo: row.channelNo,
            technologyTransferStatus: -1
          },
        }).then((res) => {
          if (res.errorCode==0) {
            this.$alert('此账号已停止系统对接，', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.channelBlurSearch()
              }
            });
          }
        })

      })
    },
    addSuccess() {
      this.isAddShow = false
      this.channelBlurSearch()
    },
    makeChannelChangeShow(row) {
      this.isAddShow = true
      this.currentRow = row
    },
    channelChangeHistoryShow(row) {
      this.currentRow = row
      this.$request({
        url: '/channel/fetchChannelHistory.do',
        method: 'post',
        data: {channelNo: this.currentRow.channelNo}
      }).then((res) => {

        if (res.errorCode==0) {
          this.form = res.data.formData
          this.form.cooperationType = 2
          this.form.channelNo = this.currentRow.channelNo
          this.isHistoryShow = true
        } else {
          this.$alert('此账号还没有变更历史', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }
      }).catch(() => {
//        this.$alert('此账号还没有变更历史', '提示', {
//          confirmButtonText: '确定',
//          callback: action => {
//          }
//        });
      })
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
