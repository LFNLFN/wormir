<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="channelBlurSearch" style="width: 500px;" class="filter-item" placeholder="货单号/渠道名称"
                v-model="filterForm.channelMsg1">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="channelBlurSearch">
        {{$t('table.search')}}
      </el-button>
    </div>
    <el-table :data="channelTableData"
              v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row
              class="border-top2 border-left2"
              style="width: 100%">
      <el-table-column
        prop="channelNum"
        label="渠道号"
        min-width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道名称"
        min-width="170"
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
          <span>{{ channelLevelMap[scope.row.currentLevelStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center" label="级别变化"
        min-width="100" prop="levelChange"
        :filters="channelLevelFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ channelLevelMap[scope.row.lastLevelStatus].text.substr(0,1) }} → {{ channelLevelMap[scope.row.currentLevelStatus].text.substr(0,1) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center" label="变化类型"
        min-width="100" prop="changeType"
        :filters="changeTypeFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span v-if="scope.row.currentLevelStatus > scope.row.lastLevelStatus">{{ '升级' }}</span>
          <span v-if="scope.row.currentLevelStatus === scope.row.lastLevelStatus">{{ '平级' }}</span>
          <span v-if="scope.row.currentLevelStatus < scope.row.lastLevelStatus">{{ '降级' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="130" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="showDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="detailShow" width="90%" title="渠道销量信息">
      <detail :currentRow="currentRow" v-if="detailShow"></detail>
    </el-dialog>


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
  import detail from './detail'
  import { channel_BlurSearch } from '@/api/channel'
  import Mock from 'mockjs'

  export default {
    components: {
      detail
    },
    data() {
      return {
        filterForm: {
          placeholder1: '渠道号/渠道名称',
          channelMsg1: '',
          currentPage: 1,
          page_size: 10,
          total: 0
        },
        listLoading: false,
        detailShow: false,
        currentRow: {},
        channelTableData: [
//          {
//          channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
//          channelName: 'zxc总店',
//          channelCode: Mock.Random.natural(0, 2),
//          channelStatus: 0,
//          cooperationType: Mock.Random.integer(0, 1),
//          channelType: Mock.Random.natural(0, 3),
//          channelProp: 0,
//          currentLevelStatus: Mock.Random.natural(0, 3),
//          lastLevelStatus: Mock.Random.natural(0, 3),
//          changeType: null,
//          FXQDbelongCode: 'FXQD' + 20180522001,
//          FXQDbelongName: 'FXQD',
//          createTime: Mock.Random.now('yyyy-MM-dd'),
//          openingTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
//          proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
//          businessEntity: 0,
//          endingTime: Mock.Random.now('yyyy-MM-dd'),
//          cancellationTime: Mock.Random.now('yyyy-MM-dd'),
//        }
        ],
        changeTypeFilters: [
          { text: '升级', value: 1 },
          { text: '平级', value: 0 },
          { text: '降级', value: -1 },
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
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      showDetail(row) {
        this.detailShow = true
        this.currentRow = row
      },
      channelBlurSearch() {
        channel_BlurSearch(this.filterForm.channelMsg1)
          .then((res) => {
            this.channelTableData = res.data;
            this.filterForm.total = res.data.length
          })
        // .catch(() => { this.$message.error('表格加载失败') })
      },
      handleSizeChange(val) {
        channel_BlurSearch(this.filterForm.value1, 1, val)
          .then((res) => {
            this.channelTableData = res.data;
            this.filterForm.total = res.data.length
          })
        this.filterForm.page_size = val
      },
      handleCurrentChange(val) {
        channel_BlurSearch(this.filterForm.value1, val)
          .then((res) => {
            this.channelTableData = res.data;
            this.filterForm.total = res.data.length
          })
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
    width: 7em;
    margin-left: 1px;
    margin-bottom: 10px;

  &
  :last-of-type {
    margin-bottom: 0
  }

  }
</style>
