<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item" placeholder="货单号/渠道名称" v-model="listQuery.title">
            </el-input>
            <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
        </div>
        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="渠道号" min-width="65" prop="channelNo" />
            <el-table-column align="center" label="渠道名称" min-width="65" prop="channelName" />
            <el-table-column align="center" label="合作类型" min-width="65" prop="cooperationType" />
            <el-table-column align="center" label="渠道类别" min-width="65" prop="channelType" />
            <el-table-column align="center" label="渠道属性" min-width="65" prop="channelCategory" />
            <el-table-column align="center" label="渠道级别" min-width="65" prop="channelLevel" />
            <el-table-column align="center" label="级别变化" min-width="65" prop="levelChange" />
            <el-table-column align="center" label="变化类型" min-width="65" prop="changeType" />
            <el-table-column align="center" label="操作" min-width="65">
                <template slot-scope="scope">
                    <el-button  type="primary" @click="showDetail(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="detailShow" width="1200px">
          <detail :channel="currentChannel"></detail>
        </el-dialog>
    </div>
</template>

<script>
import detail from './detail'

export default {
  components: {
    detail
  },
  data() {
    return {
      listQuery: {
        title: ''
      },
      listLoading: false,
      detailShow: false,
      currentChannel: undefined,
      list: [{
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
    }
  }
}
</script>

<style>
</style>
