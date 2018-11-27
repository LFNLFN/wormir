<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.channelMsg1" :placeholder="filterForm.placeholder1"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="filterForm.channelMsg2"
          type="month"
          :placeholder="filterForm.placeholder2">
        </el-date-picker>
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
        min-width="190"
        align="center"
      show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="link-type" @click="showCheck(scope.row)">{{ scope.row.channelNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道名称"
        min-width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="cooperationType"
        label="合作类型"
        align="center"
        min-width="110"
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
        min-width="110"
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
        min-width="110"
        :filters="channelLevelFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ channelLevelMap[scope.row.channelLevel].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="contractPeriod"
        label="合同期限"
        align="center"
        min-width="110">
        <template slot-scope="scope">
          <div>{{ '2019-01-01' }}</div>
          <div>{{ '至' }}</div>
          <div>{{ '2020-01-01' }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        align="center"
        min-width="110">
      </el-table-column>
      <el-table-column
        prop="openingTime"
        label="开通时间"
        align="center"
        min-width="110">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="140">
        <template slot-scope="scope">
          <!--<el-button-->
          <!--size="mini"-->
          <!--@click="showConfirm">去确认-->
          <!--</el-button>-->
          <el-button
          size="mini"
          @click="showManagement(scope.row)">去管理
          </el-button>
          <el-button
          size="mini"
          type="danger"
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
        :page-size="filterForm.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterForm.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="isCheckShow" width="75%" @close="isCheckShow = false" title="查看渠道档案">
      <to-check-detail :currentRow="currentRow" v-if="isCheckShow"></to-check-detail>
    </el-dialog>
    <el-dialog :visible.sync="isDeleteShow" width="85%" @close="isDeleteShow = false" title="注销终止渠道">
      <to-delete v-if="isDeleteShow" :currentRow="currentRow"  @closeOutDialog="isDeleteShow = false"></to-delete>
    </el-dialog>
    <el-dialog :visible.sync="isManagementShow" width="75%" @close="isManagementShow = false" title="管理渠道档案">
      <to-management :currentRow="currentRow" v-if="isManagementShow" @closeDialog="isManagementShow=false"></to-management>
    </el-dialog>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import { channel_BlurSearch_withTime } from '@/api/channel'
  import toCheckDetail from './toCheckDetail.vue'
  import toDelete from './toDelete.vue'
  import toManagement from './toManagement.vue'

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
          placeholder1: '渠道号/渠道名称',
          channelMsg1: '',
          placeholder2: '开通时间',
          channelMsg2: '',
          currentPage: 1,
          page_size: 10,
          total: 0
        },
        channelTableData: [
          // 分销子渠道FXZQD
          {
            channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
            channelName: 'zxc总店',
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: 0,
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: 0,
            channelLevel: Mock.Random.natural(0, 3),
            FXQDbelongCode: 'FXQD' + 20180522001,
            FXQDbelongName: 'FXQD',
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
            openingTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
            businessEntity: 1
          }
        ],
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
          { text: '待签合同', value: 0 },
          { text: '待激活账号', value: 1 },
          { text: '待付保证金', value: 2 },
          { text: '待接系统', value: 3 },
          { text: '停止签合同', value: 4 },
          { text: '停止激活账户', value: 5 },
          { text: '停止付保证金', value: 6 },
        ],
        channelStatusMap: {
          0: { text: '待签合同', value: 0 },
          1: { text: '待激活账号', value: 1 },
          2: { text: '待付保证金', value: 2 },
          3: { text: '待接系统', value: 3 },
          4: { text: '停止签合同', value: 4 },
          5: { text: '停止激活账户', value: 5 },
          6: { text: '停止付保证金', value: 6 }
        },
        cooperationTypeFilters: [
          { text: '渠道入驻', value: 0 },
          { text: '渠道变更', value: 1 }
        ],
        cooperationTypeMap: {
          0: { text: '渠道入驻', value: 0 },
          1: { text: '渠道变更', value: 1 }
        },
        channelTypeFilters: [
          { text: '淘宝C店', value: 0 },
          { text: '淘宝企业店', value: 1 },
          { text: '天猫店', value: 2 },
          { text: 'B2C平台', value: 3 },
        ],
        channelTypeMap: {
          0: { text: '淘宝C店', value: 0 },
          1: { text: '淘宝企业店', value: 1 },
          2: { text: '天猫店', value: 2 },
          3: { text: 'B2C平台', value: 3 },
        },
        channelPropFilters: [
          { text: '独立渠道(DLQD)', value: 0 },
          { text: '代发渠道(DFQD)', value: 1 },
          { text: '分销渠道(FXQD)', value: 2 }
        ],
        channelPropMap: {
          0: { text: '独立渠道(DLQD)', value: 0 },
          1: { text: '代发渠道(DFQD)', value: 1 },
          2: { text: '分销渠道(FXQD)', value: 2 },
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
      }
    },
    methods: {
      channelBlurSearch() {
        channel_BlurSearch_withTime(this.filterForm.channelMsg1, this.filterForm.channelMsg2)
          .then((res) => {
//            this.channelTableData = res.data
            this.filterForm.total = res.data.length
          })
        // .catch(() => { this.$message.error('表格加载失败') })
      },
      handleSizeChange(val) {
        channel_BlurSearch_withTime(this.filterForm.value1, null, 1, val)
          .then((res) => {
            this.channelTableData = res.data
            this.filterForm.total = res.data.length
          })
        this.filterForm.page_size = val
      },
      handleCurrentChange(val) {
        channel_BlurSearch_withTime(this.filterForm.value1, null, val)
          .then((res) => {
            this.channelTableData = res.data
            this.filterForm.total = res.data.length
          })
        this.filterForm.currentPage = val
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
      }
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
