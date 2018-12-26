<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label>
        <el-input
          style="min-width: 300px;"
          v-model="filterForm.searchText"
          placeholder="渠道号/渠道名称/联系人/手机"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="channelTableData" style="width: 100%">
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
          <span>{{ cooperationTypeMap[scope.row.cooperationType] ? cooperationTypeMap[scope.row.cooperationType].text : '' }}</span>
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
          <span>{{ channelTypeMap[scope.row.channelType] ? channelTypeMap[scope.row.channelType].text : '' }}</span>
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
          >{{ channelPropMap[scope.row.channelProp] ? channelPropMap[scope.row.channelProp].text : '' }}</div>
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
          <span>{{ channelLevelMap[scope.row.channelLevel] ? channelLevelMap[scope.row.channelLevel].text : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="联系人" align="center" min-width="100"></el-table-column>
      <el-table-column
        prop="job"
        label="职务"
        align="center"
        min-width="130"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.position | job  }}</span>
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
import { job } from '@/filters/index'
import request from '@/utils/request'

export default {
  data() {
    return {
      jobTypeFilters: [
        { text: '渠道联系人', value: 0 },
        { text: '技术对接人', value: 1 },
        { text: '采购', value: 2 },
        { text: '收货人', value: 3 },
        { text: '业务', value: 4 },
        { text: '财务', value: 5 },
        { text: '其他', value: 6 }
      ],
      jobTypeMap: {
        0: { text: '渠道联系人', value: 0 },
        1: { text: '技术对接人', value: 1 },
        2: { text: '采购', value: 2 },
        3: { text: '收货人', value: 3 },
        4: { text: '业务', value: 4 },
        5: { text: '财务', value: 5 },
        6: { text: '其他', value: 6 }
      },
      filterForm: {
        searchText: '',
        page: 1,
        limit: 10,
        total: 0
      },
      channelTableData: [
        //          {
        //            channelNum: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
        //            channelName: 'zxc总店',
        //            channelCode: Mock.Random.natural(0, 2),
        //            channelStatus: 0,
        //            cooperationType: Mock.Random.natural(0, 1),
        //            channelType: Mock.Random.natural(0, 3),
        //            channelProp: 0,
        //            channelLevel: Mock.Random.natural(0, 3),
        //            FXQDbelongCode: 'FXQD' + 20180522001,
        //            FXQDbelongName: 'FXQD',
        //            contactPerson: '王小虎',
        //            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
        //            businessEntity: 0,
        //            jobType: Mock.Random.natural(0, 6),
        //            contactEmail: Mock.Random.email('gmail.com'),
        //            contactTel: Mock.Random.natural(13184758879, 13948578603),
        //            contactAddress: Mock.Random.county(true),
        //            remark: '此人是常客',
        //          }
      ],
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
        { text: '分销渠道(FXQD)', value: 3 },
        { text: '分销渠道(FXZQD)', value: 4 }
      ],
      channelPropMap: {
        1: { text: '独立渠道(DLQD)', value: 1 },
        2: { text: '代发渠道(DFQD)', value: 2 },
        3: { text: '分销渠道(FXQD)', value: 3 },
        4: { text: '分销子渠道(FXZQD)', value: 4 }
      },
      channelLevelFilters: [
        { text: 'A级渠道', value: 1 },
        { text: 'B级渠道', value: 2 },
        { text: 'C级渠道', value: 3 },
        { text: 'D级渠道', value: 4 }
      ],
      channelLevelMap: {
        1: { text: 'A级渠道', value: 1 },
        2: { text: 'B级渠道', value: 2 },
        3: { text: 'C级渠道', value: 3 },
        4: { text: 'C级渠道', value: 4 },
      },
    }
  },
  methods: {
    channelBlurSearch() {
      request({
        url: '/channel/contactList.do',
        method: 'post',
        data: this.filterForm
      })
        .then((res) => {
          this.channelTableData = res.data.items;
          this.filterForm.total = res.data.total
        })
      // .catch(() => { this.$message.error('表格加载失败') })
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
