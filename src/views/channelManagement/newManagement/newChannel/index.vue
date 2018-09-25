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
      style="width: 100%">
      <el-table-column
        prop="channelNum"
        label="渠道号"
        width="180"
      align="center">
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道名称"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelStatus"
        label="渠道状态"
        align="center">
      </el-table-column>
      <el-table-column
        prop="cooperationType"
        label="合作类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelType"
        label="渠道类别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelProp"
        label="渠道属性"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelLevel"
        label="渠道级别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
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
      <to-add></to-add>
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
        channelTableData: [{
          channelNum: 'DLQD20180522001',
          channelName: 'FXQD',
          channelStatus: '待激活账号',
          cooperationType: '暂未开发',
          channelType: '淘宝企业店',
          channelProp: '独立渠道',
          channelLevel: 'B级渠道',
          createTime: '2018-05-22 17:58'
        }, {
          channelNum: 'FXQD20180526001',
          channelName: 'FXQD',
          channelStatus: '待激活账号',
          cooperationType: '暂未开发',
          channelType: '淘宝企业店',
          channelProp: '分销渠道(FXQD)',
          channelLevel: 'B级渠道',
          createTime: '2018-05-26 22:33'
        }],
        channelStatus_filters: [
          { text: '待激活账号', value: '' },
          { text: '待签合同', value: '' }
        ],
        isAddShow: false,
        isConfirmShow: false,
        isCheckShow: false,
        isDeleteShow: false
      }
    },
    methods: {
      channelBlurSearch() {
        channel_BlurSearch(this.filterForm.value1)
          .then((res) => { this.channelTableData = res.data; this.filterForm.total = res.data.length })
          .catch(() => { this.$message.error('表格加载失败') })
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
          .then((res) => { this.channelTableData = res.data; this.filterForm.total = res.data.length })
        this.filterForm.page_size = val
      },
      handleCurrentChange(val) {
        channel_BlurSearch(this.filterForm.value1, val)
          .then((res) => { this.channelTableData = res.data; this.filterForm.total = res.data.length })
        this.filterForm.currentPage = val
      }
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
  &:last-of-type {
     margin-bottom: 0
   }
  }
</style>
