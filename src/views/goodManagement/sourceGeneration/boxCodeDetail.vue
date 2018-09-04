<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="3" align="left"><div class="grid-content bg-purple">品牌序列号</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple">{{brand.brandNo}}</div></el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="3" align="left"><div class="grid-content bg-purple">{{$t('brand.brandName')}}</div></el-col>
      <el-col :span="21"><div class="grid-content bg-purple">{{brand.englishName}}&nbsp;&nbsp;&nbsp;{{brand.chineseName}}</div></el-col>
    </el-row>

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="箱码/操作账号/接收邮箱"
                v-model="listQuery.keyword" size="mini">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter" size="mini">{{$t('table.search')}}</el-button>
    </div>

    <el-row :gutter="5">
      <el-col :span="21" align="left"><div class="grid-content bg-purple">已生成发送{{totalCount}}个箱码</div></el-col>
    </el-row>

    <!--清单-->
    <el-table key='boxList' :data="list" border fit highlight-current-row :summary-method="getSummaries" show-summary
        v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" label="箱码" prop="boxCode" />
      <el-table-column align="center" label="下载文件包名称" prop="downloadFile" />
      <el-table-column align="center" label="操作账号" prop="createUserId" />
      <el-table-column align="center" label="接收邮箱" prop="recipients" />
      <el-table-column align="center" label="发送时间" prop="createTime" />

    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'boxCodeDetail',
  props: {
    brand: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  directives: {
    waves
  },
  computed: {
  },
  data() {
    return {
      list: [{
        boxCode: '123456',
        downloadFile: 'download.zip',
        createUserId: '1',
        recipients: '0@mail.com',
        createTime: '2018-09-01'
      }],
      listQuery: {
        keyword: ''
      },
      totalCount: 0,
      brandName: 'abcde',
      codeAccumulate: '100',
      listLoading: false,
      resendLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listLoading = false
    },
    downloadFile(downloadFile) {
      window.open(downloadFile)
    },
    resend(listObject) {
      this.resendLoading = true
      this.resendLoading = false
    },
    getSummaries(param) {
      const sums = []
      sums[0] = this.list.length
      return sums
    }
  }
}
</script>
<style>
  .el-table .cell {
    word-break: break-word;
  }
</style>

