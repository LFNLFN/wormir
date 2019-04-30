<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.searchText" placeholder="子渠道名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border v-loading="listLoading"
      :data="channelTableData"
      style="width: 100%;border-width: 2px;border-right-width: 1px">
      <el-table-column
        prop="channelNum"
        label="渠道号"
        min-width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道名称"
        min-width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelStatus"
        label="渠道状态"
        align="center"
        min-width="100"
        :filters="channelStatusFilters"
        :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.channelStatus | channelStatusFilter }}</span>
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
          <span>{{ scope.row.channelType | channelTypeFilter }}</span>
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
          <div style="min-width: 5em;margin: 0 auto">{{ scope.row.channelProp | channelPropFilter }}</div>
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
          <span>{{ scope.row.channelLevel | channelLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="parentChannelNo"
        label="所属FXQD号"
        align="center"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="parentChannelName"
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
          <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
          <el-button size="mini" @click="showConfirm(scope.row)" v-if="scope.row.channelStatus!=300 && scope.row.channelStatus > 0">去确认</el-button>
          <el-button size="mini" type="danger" @click="showDelete(scope.row)" v-if="scope.row.channelStatus!=400 && scope.row.channelStatus > 0">强制终止</el-button>
          <el-button size="mini" type="danger" @click="showDelete(scope.row)" v-if="scope.row.channelStatus==400">终止渠道</el-button>
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

    <!--<el-dialog :visible.sync="isAddShow" width="75%" @close="isAddShow = false" title="添加渠道">-->
    <!--<to-add v-if="isAddShow"></to-add>-->
    <!--</el-dialog>-->
    <el-dialog :visible.sync="isConfirmShow" width="75%" @close="isConfirmShow = false" title="子渠道审批">
      <to-confirm :currentRow="currentRow" v-if="isConfirmShow" @closeDialog="isConfirmShow=false;channelBlurSearch()"></to-confirm>
    </el-dialog>
    <el-dialog :visible.sync="isCheckShow" width="75%" @close="isCheckShow = false" title="子渠道查看">
      <to-check :currentRow="currentRow" v-if="isCheckShow"></to-check>
    </el-dialog>
    <el-dialog :visible.sync="isDeleteShow" width="75%" @close="isDeleteShow = false" title="操作信息">
      <to-delete v-if="isDeleteShow" :currentRow="currentRow"  @closeOutDialog="isDeleteShow = false;channelBlurSearch()"></to-delete>
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
          searchText: '',
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        channelTableData: [],
        channelTableData111: [
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
            businessEntity: 1
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
            businessEntity: Mock.Random.natural(0, 1)
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
            businessEntity: Mock.Random.natural(0, 1)
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
            businessEntity: Mock.Random.natural(0, 1)
          },
          // 待付保证金
          {
            channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: 2,
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: 0,
            channelLevel: Mock.Random.natural(0, 3),
            FXQDbelongCode: 'FXQD' + 20180522001,
            FXQDbelongName: 'FXQD',
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
            businessEntity: Mock.Random.natural(0, 1)
          },
          // 待接系统
          {
            channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: 3,
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: 0,
            channelLevel: Mock.Random.natural(0, 3),
            FXQDbelongCode: 'FXQD' + 20180522001,
            FXQDbelongName: 'FXQD',
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
            businessEntity: Mock.Random.natural(0, 1)
          },
          // 停止签合同
          {
            channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: 6,
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: 0,
            channelLevel: Mock.Random.natural(0, 3),
            FXQDbelongCode: 'FXQD' + 20180522001,
            FXQDbelongName: 'FXQD',
            createTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
            businessEntity: Mock.Random.natural(0, 1)
          },
        ],
        channelCodeFilters: [
          { text: 'DLQD', value: 1 },
          { text: 'DFQD', value: 2 },
          { text: 'FXQD', value: 3 },
          { text: 'FXZQD', value: 4 },
          { text: '--', value: 5 },
        ],
        channelStatusFilters: [
          { text: '待审核', value: 50 },
          { text: '停止审核', value: -50 },
          { text: '待签合同', value: 100 },
          { text: '停止合同', value: -100 },
          { text: '待付保证金', value: 300 },
          { text: '停止付保证金', value: -300 },
          { text: '待接系统', value: 400 },
          { text: '停止接系统', value: -400 },
          { text: '驳回申请', value: -40 },
          { text: '审核不通过', value: -40 },
        ],
        channelPropFilters: [
          { text: '分销子渠道(FXZQD)', value: 4 },
        ],
        cooperationTypeFilters: [
          { text: '渠道入驻', value: 1 },
          { text: '渠道变更', value: 2 }
        ],
        channelTypeFilters: [
          { text: '淘宝C店', value: 1 },
          { text: '淘宝企业店', value: 2 },
          { text: '天猫店', value: 3 },
          { text: 'B2C平台', value: 4 },
        ],
        channelLevelFilters: [
          { text: 'A级渠道', value: 1 },
          { text: 'B级渠道', value: 2 },
          { text: 'C级渠道', value: 3 },
          { text: 'D级渠道', value: 4 },
          { text: '--', value: 0 },
        ],
        isConfirmShow: false,
        isCheckShow: false,
        isDeleteShow: false,
        currentRow: null,
        listLoading: false
      }
    },
    computed: {
      confirmTitle() {
        if (this.currentRow && this.currentRow.channelStatus === 0) return '子渠道审批'
        if (this.currentRow && this.currentRow.channelStatus === 1) return '签订合同'
      },
      checkTitle() {
        if (this.currentRow && this.currentRow.channelStatus === 2
        ) {
          return '子渠道档案'
        }
        else {
          return '查看子渠道档案'
        }
      }
    },
    methods: {
      channelBlurSearch() {
        this.listLoading = true
        this.$request({
          url: '/channel/subChannelList.do',
          method: 'post',
          data: {
            parentChannelNo: this.$store.state.user.relevanceNo,
            page: this.filterForm.currentPage,
            limit: this.filterForm.pageSize,
            searchText: this.filterForm.searchText
          }
        }).then((res) => {
          if (res.errorCode == 0) {
            this.channelTableData = res.data.items
            this.filterForm.total = res.data.total
            console.log(res.data.items)
          } else {
            this.$message.error('数据请求失败');
          }
          this.listLoading = false
        }).catch(() => {
          this.$message.error('数据请求失败');
          this.listLoading = false
        })
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      }
      ,
      handleSizeChange(val) {
        channel_BlurSearch(this.filterForm.value1, 1, val)
          .then((res) => {
            this.channelTableData = res.data
            this.filterForm.total = res.data.length
          })
        this.filterForm.pageSize = val
      }
      ,
      handleCurrentChange(val) {
        this.channelBlurSearch()
        this.filterForm.currentPage = val
      }
      ,
      showConfirm(row) {
        this.currentRow = row
        this.isConfirmShow = true
      }
      ,
      showCheck(row) {
        this.currentRow = row
        this.isCheckShow = true
      }
      ,
      showDelete(row) {
        this.currentRow = row
        this.isDeleteShow = true
      }
      ,
    }
    ,
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
