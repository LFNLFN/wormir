<template>
  <div>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">{{$t('compensation.orderNo')}}</div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">商品编号</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">商品名称</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">{{$t('compensation.applicationReason')}}</div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light">{{$t('compensation.applicationReasonContent')}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="8"><div class="text-muted">{{$t('compensation.applicationTime') + new Date()}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">现场照片</div></el-col>
      <el-col :span="20"><div class="grid-content bg-purple-light">{{$t('compensation.clickToLarge')}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">补款金额</div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light">$1243</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">审核结果</div></el-col>
      <el-col :span="16" v-if="'申请后付款'"><div class="grid-content bg-purple-light">{{$t('compensation.applicationApproval')}}</div></el-col>
      <el-col :span="16" v-else><div class="grid-content bg-purple-light">{{$t('compensation.applicationApproval')}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="8"><div class="text-muted">{{$t('compensation.reviewTime') + new Date()}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">申诉理由</div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light">{{$t('compensation.involveNegotiation')}}</div></el-col>
    </el-row>
    <el-row v-if="'协商后补款'">
      <el-col :span="8"><div class="grid-content bg-purple">审核结果</div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light">{{$t('compensation.statusToCompensate')}}</div></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'CompensationStatusForm',
    props: {
      order: Object
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 5px;
  }
  .el-row:last-child{
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 28px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
