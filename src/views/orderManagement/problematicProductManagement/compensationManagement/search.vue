<template>
  <div class="app-container">
    <h2 :style="{textAlign: 'center', width: rowLength+'px'}">2019年8月珠海吾蜜公司赔保金额明细单</h2>
    <div style="border: 1px solid #ccc">
      <el-table
        :key="tableKey"
        :data="list"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        border=""
        fit
        highlight-current-row
        class="border2"
        style="width: 100%;border-right-width: 1px"
      >
        <el-table-column  align="center" label="物流公司" prop="remittingBankName"/>
        <el-table-column  align="center" label="物流单号" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="赔保类型" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="取证照片" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="送货人" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="送货电话" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="货单号" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="渠道号" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="商品编号" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="商品名称" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="商品规格" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="确认收货时间" prop="remittingBankAddress"/>
        <el-table-column  align="center" label="赔保金额" prop="remittingBankAddress"/>

      </el-table>
      <el-row>
        <el-col :span="22" align="right">
          <div class="grid-content bg-purple" style="background: #DFF2FC;border: 1px solid #ccc;">合计:</div>
        </el-col>
        <el-col :span="2" >
          <div class="grid-content bg-purple" style="border: 1px solid #ccc;"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple" style="background: #DFF2FC;border: 1px solid #ccc;">收款户名:</div>
        </el-col>
        <el-col :span="6" >
          <div class="grid-content bg-purple" style="border: 1px solid #ccc;">珠海市吾蜜电子商务有限责任公司</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple" style="background: #DFF2FC;border: 1px solid #ccc;">收款账号:</div>
        </el-col>
        <el-col :span="6" >
          <div class="grid-content bg-purple" style="border: 1px solid #ccc;">1</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple" style="background: #DFF2FC;border: 1px solid #ccc;">收款银行:</div>
        </el-col>
        <el-col :span="6" >
          <div class="grid-content bg-purple" style="border: 1px solid #ccc;">1</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple" style="background: #DFF2FC;border: 1px solid #ccc;">汇款户名:</div>
        </el-col>
        <el-col :span="6" >
          <div class="grid-content bg-purple" style="border: 1px solid #ccc;">1</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple" style="background: #DFF2FC;border: 1px solid #ccc;">汇款账号:</div>
        </el-col>
        <el-col :span="6" >
          <div class="grid-content bg-purple" style="border: 1px solid #ccc;">1</div>
        </el-col>
        <el-col :span="2" align="center">
          <div class="grid-content bg-purple" style="background: #DFF2FC;border: 1px solid #ccc;">汇款银行:</div>
        </el-col>
        <el-col :span="6" >
          <div class="grid-content bg-purple" style="border: 1px solid #ccc;">1</div>
        </el-col>
      </el-row>
      <span :span="24" style="color: red;text-align: center;display: flex;">制表单位:珠海市吾蜜电子商务有限责任公司；制表时间: 2019-9-1 00:30:00</span>
    </div>

  </div>
</template>

<script>
    export default {
        name: "search.vue"
    }
</script>

<style scoped>

</style>
