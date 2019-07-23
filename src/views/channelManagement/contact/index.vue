<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label>
        <el-input
          style="min-width: 300px;"
          v-model="filterForm.searchText"
          placeholder="渠道号/渠道名称/联系人/手机"
          @keyup.enter.native="channelBlurSearch"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="channelTableData" style="width: 100%;border-left-width: 2px;border-top-width: 2px" v-loading="listLoading">
      <el-table-column prop="channelNo" label="渠道号" min-width="180" align="center"></el-table-column>
      <el-table-column prop="channelName" label="渠道名称" min-width="170" align="center"></el-table-column>
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
      <el-table-column prop="userName" label="联系人" align="center" min-width="100"></el-table-column>
      <el-table-column
        prop="dutyName"
        label="职务"
        align="center"
        min-width="130"
        :filters="dutyNameFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.position | job  }}</span> -->
          <span>{{ scope.row.dutyName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="联系邮箱" min-width="180" align="center"></el-table-column>
      <el-table-column prop="mobile" label="联系电话" min-width="150" align="center"></el-table-column>
      <el-table-column prop="address" label="联系地址" min-width="190" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注字段" min-width="190" align="center"></el-table-column>
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
  </div>
</template>

<script>
import { channel_BlurSearch } from '@/api/channel'
import request from '@/utils/request'

export default {
  data() {
    return {
      filterForm: {
        searchText: '',
        page: 1,
        limit: 10,
        total: 0
      },
      channelTableData: [],
      channelCodeFilters: [
        { text: 'DLQD', value: 1 },
        { text: 'DFQD', value: 2 },
        { text: 'FXQD', value: 3 }
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
      channelPropFilters: [
        { text: '独立渠道(DLQD)', value: 1 },
//        { text: '代发渠道(DFQD)', value: 2 },
        { text: '分销渠道(FXQD)', value: 3 },
        { text: '分销渠道(FXZQD)', value: 4 }
      ],
      channelLevelFilters: [
        { text: 'A级渠道', value: 1 },
        { text: 'B级渠道', value: 2 },
        { text: 'C级渠道', value: 3 },
        { text: 'D级渠道', value: 4 },
        { text: '--', value: 5 },
      ],
      jobFilters: [
        { text: 'A级渠道', value: 1 },
      ],
      dutyNameFilters: [],
      listLoading: false
    }
  },
  methods: {
    channelBlurSearch() {
      this.listLoading = true
      request({
        url: '/channel/contactList.do',
        method: 'post',
        data: this.filterForm
      })
        .then((res) => {
          this.channelTableData = res.data.items;
          this.filterForm.total = res.data.total
          this.dutyNameFilters = res.data.dutyNameFilters
          this.listLoading = false
        })
       .catch(() => { this.$message.error('表格加载失败') })
    },
    handleSizeChange(val) {
      this.filterForm.limit = val
      this.channelBlurSearch()
    },
    handleCurrentChange(val) {
      this.filterForm.page = val
      this.channelBlurSearch()
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
  },
  mounted() {
    this.channelBlurSearch()
  }
}
</script>

<style lang="scss" scoped>
</style>
