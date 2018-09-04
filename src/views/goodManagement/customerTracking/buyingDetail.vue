<template>
  <div>
    <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
    size="mini">
    </el-date-picker>

    <el-table key='boxList' :data="list" border fit highlight-current-row
        v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" label="品牌名称" prop="brandEnglishName" />
      <el-table-column align="center" label="商品编号" prop="productNo" />
      <el-table-column align="center" label="商品名称" prop="productEnglishName" />
      <el-table-column align="center" label="商品规格" prop="size" />
      <el-table-column align="center" label="商品码" prop="sourceCode" />
      <el-table-column align="center" label="商品售价" prop="price" />
      <el-table-column align="center" label="出库售价" prop="actualPrice" />
      <el-table-column align="center" label="购买渠道" prop="channelNo" />
      <el-table-column align="center" label="商品情况" prop="productStatus" />
      <el-table-column align="center" label="销售时间" prop="sellingTime" />
      <el-table-column align="center" label="激活状态" prop="activeStatus" />
      <el-table-column align="center" label="异常情况" prop="abnormalSituation" />
      <el-table-column align="center" label="所在城市" prop="city" />
      <el-table-column align="center" label="购买地址" prop="address" />
      <el-table-column align="center" label="身份证号" prop="identification" />
      <el-table-column align="center" label="验证手机号" prop="phone" />
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'buyingDetail',
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
      dateRange: undefined,
      listLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listLoading = false
    }
  }
}
</script>
<style>
  .el-table .cell {
    word-break: break-word;
  }
</style>

