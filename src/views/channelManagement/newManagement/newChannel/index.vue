<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.searchText" :placeholder="filterForm.placeholder"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="showAdd">新增渠道</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="channelTableData"
      style="width: 100%;"
      class="border-top2 border-left2">
      <el-table-column
        prop="channelNum"
        label="渠道号"
        min-width="130"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelCode"
        label="渠道名称"
        min-width="100"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channelCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelStatus"
        label="渠道状态"
        align="center"
        min-width="100"
        :filters="channelStatusFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ channelStatusMap[scope.row.channelStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cooperationType"
        label="合作类型"
        align="center"
        min-width="90"
        :filters="cooperationTypeFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ cooperationTypeMap[scope.row.cooperationType].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelType"
        label="渠道类别"
        align="center"
        min-width="90"
        :filters="channelTypeFilters"
        :filter-method="filterHandler">
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
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <div style="min-width: 4em;margin: 0 auto">{{ channelPropMap[scope.row.channelProp].text }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelLevel"
        label="渠道级别"
        align="center"
        min-width="90"
        :filters="channelLevelFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ channelLevelMap[scope.row.channelLevel].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.channelStatus==100"
            @click="showConfirm(scope.row)">去确认
          </el-button>
          <el-button
            size="mini"
            @click="showCheck(scope.row)">去查看
          </el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.channelStatus==100"
            @click="showDelete(scope.row)">强制注销
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
        :page-size="filterForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterForm.total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isAddShow" width="75%" @close="isAddShow = false" title="添加渠道">
      <to-add v-if="isAddShow" @submitSuccess="addSuccess"></to-add>
    </el-dialog>
    <el-dialog :visible.sync="isConfirmShow" width="75%" @close="isConfirmShow = false" title="签订合同">
      <to-confirm :currentRow="currentRow" v-if="isConfirmShow" @submitSuccess="confirmSuccess"></to-confirm>
    </el-dialog>
    <el-dialog :visible.sync="isCheckShow" width="75%" @close="isCheckShow = false" title="渠道档案信息">
      <to-check :currentRow="currentRow" v-if="isCheckShow"></to-check>
    </el-dialog>
    <el-dialog :visible.sync="isDeleteShow" width="75%" @close="isDeleteShow = false" title="操作信息">
      <to-delete :currentRow="currentRow" v-if="isDeleteShow" @submitSuccess="deleteSuccess"></to-delete>
    </el-dialog>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import toAdd from './toAdd.vue'
  import toConfirm from './toConfirm.vue'
  import toCheck from './toCheck.vue'
  import toDelete from './toDelete.vue'
  import { channel_BlurSearch } from '@/api/channel'
  import request from "@/utils/request";

  export default {
    data() {
      return {
        filterForm: {
          placeholder: '渠道号/渠道名称',
          searchText: '',
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        channelTableData: [],
        channelCodeFilters: [
          { text: 'DLQD', value: 1 },
          { text: 'DFQD', value: 2 },
          { text: 'FXQD', value: 3 }
        ],
        channelCodeMap: {
          1: { text: 'DLQD', value: 1 },
          2: { text: 'DFQD', value: 2 },
          3: { text: 'FXQD', value: 3 }
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
          { text: 'A级渠道', value: 0 },
          { text: 'B级渠道', value: 1 },
          { text: 'C级渠道', value: 2 },
          { text: 'D级渠道', value: 3 }
        ],
        channelLevelMap: {
          0: { text: 'A级渠道', value: 0 },
          1: { text: 'B级渠道', value: 1 },
          2: { text: 'C级渠道', value: 2 },
          3: { text: 'C级渠道', value: 3 },
        },
        isAddShow: false,
        isConfirmShow: false,
        isCheckShow: false,
        isDeleteShow: false,
        currentRow: null
      }
    },
    methods: {
      channelSearch() {
        request({
          url: '/channel/newChannelList.do',
          method: 'post',
          data: {
            page: this.filterForm.currentPage,
            limit: this.filterForm.pageSize,
            searchText: this.filterForm.searchText
          }
        }).then((res) => {
          this.channelTableData = res.data.items
          this.filterForm.total = res.data.total
          console.log(res.data.items)
        }).catch(() => {
          this.$message.error('数据请求失败');
        })
      },
      showAdd() {
        this.isAddShow = true
      },
      showConfirm(row) {
        this.currentRow = row
        this.isConfirmShow = true
      },
      showCheck(row) {
        this.currentRow = row
        this.isCheckShow = true
      },
      showDelete(row) {
        this.currentRow = row
        this.isDeleteShow = true
      },
      handleSizeChange(val) {
//        channel_BlurSearch(this.filterForm.searchText, 1, val)
//          .then((res) => {
//            this.channelTableData = res.data;
//            this.filterForm.total = res.data.length
//          })
        this.filterForm.pageSize = val
      },
      handleCurrentChange(val) {
//        channel_BlurSearch(this.filterForm.searchText, val)
//          .then((res) => {
//            this.channelTableData = res.data;
//            this.filterForm.total = res.data.length
//          })
        this.filterForm.currentPage = val
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      addSuccess() {
        this.isAddShow = false
        this.$message({
          message: '新增成功！',
          type: 'success'
        });
      },
      confirmSuccess() {
        this.isConfirmShow = false
        this.$message({
          message: '确认成功！',
          type: 'success'
        })
      },
      deleteSuccess() {
        this.isDeleteShow = false
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      },
    },
    components: {
      toAdd,
      toCheck,
      toConfirm,
      toDelete
    },
    mounted() {
      this.channelSearch()
    }
  }
</script>

<style lang="scss" scoped>
  .el-table .el-button {
    width: 7em;
    margin-left: 1px;
    margin-bottom: 10px;

  &
  :last-of-type {
    margin-bottom: 0
  }

  }
</style>
