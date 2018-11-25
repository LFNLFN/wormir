<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.channelName" placeholder="子渠道名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="channelTableData"
      class="border-top2 border-left2"
      style="width: 100%">
      <el-table-column
        prop="channelNum"
        label="渠道号"
        min-width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelCode"
        label="渠道名称"
        min-width="100"
        align="center">
        <template slot-scope="scope">
          <span>{{ channelCodeMap['2'].text }}</span>
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
          <div style="min-width: 5em;margin: 0 auto">{{ channelPropMap[scope.row.channelProp].text }}</div>
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
        prop="FXQDbelongCode"
        label="所属FXQD号"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="FXQDbelongName"
        label="所属FXQD名称"
        align="center"
        min-width="130">
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
        min-width="130">
        <template slot-scope="scope">
          <div v-if="scope.row.channelStatus===0">
            <el-button
              size="mini"
              @click="showConfirm(scope.row)">去确认
            </el-button>
            <el-button
              size="mini"
              @click="showCheck(scope.row)">去查看
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="showDelete">强制注销
            </el-button>
          </div>
          <div v-else-if="scope.row.channelStatus===4 || scope.row.channelStatus===5">
            <el-button
              size="mini"
              @click="showCheck(scope.row)">去查看
            </el-button>
          </div>
          <div v-if="scope.row.channelStatus===1">
            <el-button
              size="mini"
              @click="showConfirm(scope.row)">去确认
            </el-button>
            <el-button
              size="mini"
              @click="showCheck(scope.row)">去查看
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="showDelete">强制注销
            </el-button>
          </div>
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

    <!--<el-dialog :visible.sync="isAddShow" width="75%" @close="isAddShow = false" title="添加渠道">-->
    <!--<to-add v-if="isAddShow"></to-add>-->
    <!--</el-dialog>-->
    <el-dialog :visible.sync="isConfirmShow" width="75%" @close="isConfirmShow = false" :title="confirmTitle">
      <to-confirm :currentRow="currentRow" v-if="isConfirmShow" @closeDialog="isConfirmShow=false"></to-confirm>
    </el-dialog>
    <el-dialog :visible.sync="isCheckShow" width="75%" @close="isCheckShow = false" title="子渠道档案">
      <to-check :currentRow="currentRow" v-if="isCheckShow"></to-check>
    </el-dialog>
    <el-dialog :visible.sync="isDeleteShow" width="75%" @close="isDeleteShow = false" title="操作信息">
      <to-delete v-if="isDeleteShow"></to-delete>
    </el-dialog>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import { channel_BlurSearch } from '@/api/channel'
  import toConfirm from './toConfirm.vue'
  import toCheck from './toCheck.vue'
  import toDelete from './toDelete.vue'

  export default {
    components: {
      toCheck,
      toConfirm,
      toDelete
    },
    data() {
      return {
        filterForm: {
          channelName: '',
          currentPage: 1,
          page_size: 10,
          total: 0
        },
        channelTableData: [
          // 待审核
          {
            channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: 0,
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: 0,
            channelLevel: 99 || Mock.Random.natural(0, 3),
            FXQDbelongCode: 'FXQD' + 20180522001,
            FXQDbelongName: 'FXQD',
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
          },
          // 驳回申请
          {
            channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: 4,
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: 0,
            channelLevel: 99 || Mock.Random.natural(0, 3),
            FXQDbelongCode: 'FXQD' + 20180522001,
            FXQDbelongName: 'FXQD',
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
          },
          // 停止审核
          {
            channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: 5,
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: 0,
            channelLevel: 99 || Mock.Random.natural(0, 3),
            FXQDbelongCode: 'FXQD' + 20180522001,
            FXQDbelongName: 'FXQD',
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
          },
          // 待签合同
          {
            channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: 1,
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: 0,
            channelLevel: Mock.Random.natural(0, 3),
            FXQDbelongCode: 'FXQD' + 20180522001,
            FXQDbelongName: 'FXQD',
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
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
          { text: '待审核', value: 0 },
          { text: '待签合同', value: 1 },
          { text: '待付保证金', value: 2 },
          { text: '待接系统', value: 3 },
          { text: '驳回申请', value: 4 },
          { text: '停止审核', value: 5 },
          { text: '停止签合同', value: 6 },
        ],
        channelStatusMap: {
          0: { text: '待审核', value: 0 },
          1: { text: '待签合同', value: 1 },
          2: { text: '待付保证金', value: 2 },
          3: { text: '待接系统', value: 3 },
          4: { text: '驳回申请', value: 4 },
          5: { text: '停止审核', value: 5 },
          6: { text: '停止签合同', value: 6 }
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
          { text: '分销子渠道(FXZQD)', value: 0 },
        ],
        channelPropMap: {
          0: { text: '分销子渠道(FXZQD)', value: 0 },
        },
        channelLevelFilters: [
          { text: 'A级渠道', value: 0 },
          { text: 'B级渠道', value: 1 },
          { text: 'C级渠道', value: 2 },
          { text: 'D级渠道', value: 3 },
          { text: '----', value: 99 },
        ],
        channelLevelMap: {
          0: { text: 'A级渠道', value: 0 },
          1: { text: 'B级渠道', value: 1 },
          2: { text: 'C级渠道', value: 2 },
          3: { text: 'C级渠道', value: 3 },
          99: { text: '----', value: 99 },
        },
        isConfirmShow: false,
        isCheckShow: false,
        isDeleteShow: false,
        currentRow: null
      }
    },
    computed: {
      confirmTitle() {
        if (this.currentRow && this.currentRow.channelStatus === 0) return '子渠道审批'
        if (this.currentRow && this.currentRow.channelStatus === 1) return '签订合同'
      }
    },
    methods: {
      channelBlurSearch() {
        channel_BlurSearch(this.filterForm.value1)
          .then((res) => {
            this.channelTableData = res.data
            this.filterForm.total = res.data.length
          })
        // .catch(() => { this.$message.error('表格加载失败') })
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      handleSizeChange(val) {
        channel_BlurSearch(this.filterForm.value1, 1, val)
          .then((res) => {
            this.channelTableData = res.data
            this.filterForm.total = res.data.length
          })
        this.filterForm.page_size = val
      },
      handleCurrentChange(val) {
        channel_BlurSearch(this.filterForm.value1, val)
          .then((res) => {
            this.channelTableData = res.data
            this.filterForm.total = res.data.length
          })
        this.filterForm.currentPage = val
      },
      showConfirm(row) {
        this.currentRow = row
        this.isConfirmShow = true
      },
      showCheck(row) {
        this.currentRow = row
        this.isCheckShow = true
      },
      showDelete() {
        this.isDeleteShow = true
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
