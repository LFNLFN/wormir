<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="channelBlurSearch" style="width: 500px;" class="filter-item" placeholder="货单号/渠道名称"
                v-model="filterForm.channelMsg1">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="channelBlurSearch">{{$t('table.search')}}
      </el-button>
    </div>
    <el-table :data="channelTableData" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="渠道号" min-width="65" prop="channelNo"/>
      <el-table-column align="center" label="渠道名称" min-width="65" prop="channelName"/>
      <el-table-column align="center" label="合作类型" min-width="65" prop="cooperationType"/>
      <el-table-column align="center" label="渠道类别" min-width="65" prop="channelType"/>
      <el-table-column align="center" label="渠道属性" min-width="65" prop="channelCategory"/>
      <el-table-column align="center" label="渠道级别" min-width="65" prop="channelLevel"/>
      <el-table-column align="center" label="级别变化" min-width="65" prop="levelChange"/>
      <el-table-column align="center" label="变化类型" min-width="65" prop="changeType"/>
      <el-table-column align="center" label="操作" min-width="65">
        <template slot-scope="scope">
          <el-button type="primary" @click="showDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="detailShow" width="1200px">
      <detail :channel="currentChannel"></detail>
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
        currentChannel: undefined,
        channelTableData: [{
          channelNo: '123',
          channelName: 'test',
          cooperationType: '渠道入驻',
          channelType: '天猫店',
          channelCategory: '独立渠道',
          channelLevel: 'A级渠道',
          levelChange: 'A->A',
          changeType: '平级'
        }]
      }
    },
    methods: {
      showDetail(channel) {
        this.detailShow = true
        this.currentChannel = channel
      },
      channelBlurSearch() {
        channel_BlurSearch(this.filterForm.channelMsg1)
          .then((res) => { this.channelTableData = res.data; this.filterForm.total = res.data.length })
          .catch(() => { this.$message.error('表格加载失败') })
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
