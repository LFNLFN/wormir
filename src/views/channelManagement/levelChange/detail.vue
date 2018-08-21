<template>
    <div class="app-container">
        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="渠道号" min-width="65" prop="channelNo" />
            <el-table-column align="center" label="渠道名称" min-width="65" prop="channelName" />
            <el-table-column align="center" label="合作类型" min-width="65" prop="cooperationType" />
            <el-table-column align="center" label="渠道类别" min-width="65" prop="channelType" />
            <el-table-column align="center" label="渠道属性" min-width="65" prop="channelCategory" />
            <el-table-column align="center" label="渠道级别" min-width="65" prop="channelLevel" />
            <el-table-column align="center" label="级别变化" min-width="65" prop="levelChange" />
            <el-table-column align="center" label="变化类型" min-width="65" prop="changeType" />
        </el-table>
        <div>各品牌销量与所在级别要求销量对比</div>
        <el-table :data="compareList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="品牌" min-width="65" prop="brandName" />
            <el-table-column align="center" label="当前级别销量要求" min-width="65" prop="standard" />
            <el-table-column align="center" label="当月" >
              <el-table-column align="center" label="销量" min-width="65" prop="thisMonthSale" />
              <el-table-column align="center" label="对比情况" min-width="65" prop="compareThisMonth" />
            </el-table-column>
            <el-table-column align="center" label="上月" >
              <el-table-column align="center" label="销量" min-width="65" prop="lastMonthSale" />
              <el-table-column align="center" label="对比情况" min-width="65" prop="cpmpareLastMonth" />
            </el-table-column>
        </el-table>
        <el-table :data="productList" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="品牌" min-width="65" prop="channelNo" />
            <el-table-column align="center" label="商品编号" min-width="65" prop="channelName" />
            <el-table-column align="center" label="商品名称" min-width="65" prop="cooperationType" />
            <el-table-column align="center" label="商品码" min-width="65" prop="channelType" />
            <el-table-column align="center" label="商品规格" min-width="65" prop="channelCategory" />
            <el-table-column align="center" label="商品售价" min-width="65" prop="channelLevel" />
            <el-table-column align="center" label="出库时间" min-width="65" prop="levelChange" />
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'detail',
  props: {
    channel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      listQuery: {
        title: ''
      },
      listLoading: false,
      list: [],
      compareList: [{
        brandName: 'AESOP',
        standard: '2000',
        thisMonthSale: '2112',
        compareThisMonth: '>2000',
        lastMonthSale: '1890',
        cpmpareLastMonth: '<2000'
      }]
    }
  },
  created() {
    this.getChannel()
  },
  methods: {
    getChannel() {
      this.list.push(this.channel)
    }
  }
}
</script>

<style>
</style>
