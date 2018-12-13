<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.value1" :placeholder="filterForm.placeholder"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
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
          <span>{{ channelCodeMap[scope.row.channelCode].text }}</span>
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
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        min-width="100">
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
    <el-dialog :visible.sync="isAddShow" width="75%" @close="isAddShow = false" title="添加渠道">
      <to-add v-if="isAddShow"></to-add>
    </el-dialog>
    <el-dialog :visible.sync="isConfirmShow" width="75%" @close="isConfirmShow = false" title="签订合同">
      <to-confirm></to-confirm>
    </el-dialog>
    <el-dialog :visible.sync="isCheckShow" width="75%" @close="isCheckShow = false" title="渠道档案信息">
      <to-check></to-check>
    </el-dialog>
    <el-dialog :visible.sync="isDeleteShow" width="75%" @close="isDeleteShow = false" title="操作信息">
      <to-delete></to-delete>
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

  export default {
    data() {
      return {
        filterForm: {
          placeholder: '渠道号/渠道名称',
          value1: '',
          currentPage: 1,
          page_size: 10,
          total: 0
        },
        channelTableData: [
          {
            channelNum: 'FXQD' + Mock.Random.natural(20180522001, 20180522009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: Mock.Random.natural(0, 6),
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: Mock.Random.natural(0, 2),
            channelLevel: Mock.Random.natural(0, 3),
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss')
          },
          {
            channelNum: 'DLQD' + Mock.Random.natural(20180522001, 20180522009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: Mock.Random.natural(0, 6),
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: Mock.Random.natural(0, 2),
            channelLevel: Mock.Random.natural(0, 3),
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss')
          },
          {
            channelNum: 'DFQD' + Mock.Random.natural(20180522001, 20180522009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: Mock.Random.natural(0, 6),
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: Mock.Random.natural(0, 2),
            channelLevel: Mock.Random.natural(0, 3),
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss')
          },
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
        isAddShow: false,
        isConfirmShow:
          false,
        isCheckShow:
          false,
        isDeleteShow:
          false
      }
    },
    methods: {
      channelBlurSearch() {
        channel_BlurSearch(this.filterForm.value1)
          .then((res) => {
            this.channelTableData = res.data
            this.filterForm.total = res.data.length
          })
          .catch(() => {
//            this.$message.error('表格加载失败')
            this.filterForm.total = this.channelTableData.length
          })
      },
      showAdd() {
        this.isAddShow = true
      },
      showConfirm() {
        this.isConfirmShow = true
      },
      showCheck() {
        this.isCheckShow = true
      },
      showDelete() {
        this.isDeleteShow = true
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
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
    },
    components: {
      toAdd,
      toCheck,
      toConfirm,
      toDelete
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
