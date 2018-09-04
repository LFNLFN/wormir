<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="3" align="left"><div class="grid-content bg-purple">渠道号</div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple">11</div></el-col>
      <el-col :span="3" align="left"><div class="grid-content bg-purple">渠道名称</div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple">11</div></el-col>
      <el-col :span="3" align="left"><div class="grid-content bg-purple">渠道级别</div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple">11</div></el-col>
      <el-col :span="3" align="left"><div class="grid-content bg-purple">联系人</div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple">11</div></el-col>
      <el-col :span="3" align="left"><div class="grid-content bg-purple">联系电话</div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple">11</div></el-col>
    </el-row>
    <el-table :data="list" border fit highlight-current-row 
      v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" label="商品编号" prop="productCode"/>
      <el-table-column align="center" label="商品名称" prop="chineseName"/>
      <el-table-column align="center" label="箱码" prop="boxCode"/>
      <el-table-column align="center" label="商品码" prop="sourceCode"/>
      <el-table-column align="center" label="出库时间" prop="packingTime"/>
      <el-table-column align="center" label="收货状态" prop="operationID"/>
      <el-table-column align="center" label="商品情况" prop="productStatus"/>
      <el-table-column align="center" label="收货时间" prop="receiveTime"/>
      <el-table-column align="center" label="流转状态" prop="transferStatus"/>
      <el-table-column align="center" label="流转时间" prop="transferTime"/>
      <el-table-column align="center" label="商品售价" prop="productPrice"/>
      <el-table-column align="center" label="实际售价" prop="actualPrice"/>
      <el-table-column align="center" label="激活状态" prop="activeTime"/>
      <el-table-column align="center" label="流转情况" prop="transferSituation"/>
      <el-table-column align="center" label="异常情况" prop="abnormalSituation"/>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'detail',
  props: {
  },
  directives: {
    waves
  },
  created() {
  },
  data() {
    return {
      list: [],
      listQuery: {
        keyword: ''
      },
      listLoading: false
    }
  },
  methods: {
  }
}
</script>
<style>
  .el-table .cell {
    word-break: break-word;
  }
  .filter-container {
    width: 50%;
    float: left;
    padding-left: 3%;
    padding-top: 1%;
  }
  .empty-table .el-table__body-wrapper {
    display: none;
  }
</style>

