<template>
  <div>
    <div class="border1" style="border-bottom-width: 2px">
      <el-row>
        <el-col :span="3" align="left">
          <div class="grid-content bg-purple">品牌序列号</div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple">{{brand.brandNo}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="left">
          <div class="grid-content bg-purple">{{$t('brand.brandName')}}</div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple">{{brand.englishName}}&nbsp;&nbsp;&nbsp;{{brand.chineseName}}</div>
        </el-col>
      </el-row>
    </div>
    <p style="margin: 20px"></p>

    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 400px;"
        class="filter-item"
        placeholder="箱码/操作账号/接收邮箱"
        v-model="listQuery.searchText"
        size="mini"
      ></el-input>
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
        size="mini"
      >{{$t('table.search')}}</el-button>
    </div>

    <p style="margin-top: 0">已生成发送&nbsp;{{listQuery.total}}&nbsp;个箱码</p>

    <!--清单-->
    <el-table
      key="boxList"
      :data="list"
      border
      fit
      highlight-current-row
      size="mini"
      :summary-method="getSummaries"
      show-summary
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      style="width: 100%;border-top-width: 2px;border-left-width: 2px;"
      :max-height="300"
    >
      <el-table-column align="center" label="箱码" prop="id" min-width="120px"/>
      <el-table-column align="center" label="下载文件包名称" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" @click="downLoadAction(scope.row)">{{ scope.row.fileName ? scope.row.fileName : '文件名' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作账号" prop="create_user_id" min-width="100px"/>
      <el-table-column align="center" label="接收邮箱" prop="recipients" min-width="130px"/>
      <el-table-column align="center" label="发送时间" prop="createTime" min-width="130px"/>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listQuery.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Mock from 'mockjs'

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
    downloadFileBagName() {
      return this.brand.brandNo.toString() + '-' + this.totalCount.toString() + '-' + this.fileNameTime(new Date()).toString()
    }
  },
  data() {
    return {
      list: [],
      listQuery: {
        searchText: '',
        total: 0,
        page: 1,
        limit: 10,
        type: 2
      },
      brandName: 'abcde',
      codeAccumulate: '100',
      listLoading: false,
      resendLoading: false
    }
  },
  created() {
    this.getList()
    this.totalCount = this.list.length
  },
  methods: {
    getList() {
      this.listLoading = true
      this.$request({
        url: '/goods/checkGoodsCode.do',
        method: 'post',
        data: this.listQuery
      }).then(res => {
        this.listLoading = false
        this.list = res.data.items
        this.listQuery.total = res.data.total
      })
    },
    downLoadAction(row) {
      if (row.filePath) {
        window.open(row.filePath)
      } else {
        this.$message.error('文件路径有误')

      }
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    resend(listObject) {
      this.resendLoading = true
      this.resendLoading = false
    },
    getSummaries(param) {
      const sums = []
      sums[0] = this.list.length
      return sums
    },
    fileNameTime(date) {
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      return formatObj.y.toString() + formatObj.m.toString() + formatObj.d.toString() + formatObj.h.toString() + formatObj.i.toString() + formatObj.s.toString()
    },
    handleFilter() {
      this.getList()
    },
  }
}
</script>
<style scoped>
.el-row {
  border: 1px solid #d5d5d5;
  border-bottom: none;
}

.el-col {
  border-radius: 0;
}

.el-col:nth-child(odd) {
  background: #dff2fc;
  color: #424242;
  font-weight: 700;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-col:nth-child(odd):not(:last-of-type) {
  border-right: 1px solid #d5d5d5;
}

.el-col:nth-child(even) {
  color: #424242;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.el-col:nth-child(even) div {
  padding-left: 1em;
}

.el-col:nth-child(even):not(:last-of-type) {
  border-right: 1px solid #d5d5d5;
}

.grid-content {
  border: none;
}
</style>

