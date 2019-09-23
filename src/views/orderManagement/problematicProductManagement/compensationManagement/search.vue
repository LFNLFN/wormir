<template>
  <div class="app-container">
    <h2 :style="{textAlign: 'center', width: rowLength+'px'}">{{monthValue | month}}珠海吾蜜公司赔保金额明细单</h2>
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
        <el-table-column  align="center" label="物流公司" prop="logisticCompanyName" fixed="left"/>
        <el-table-column  align="center" label="物流单号" prop="logisticCompensationAmount"/>
        <el-table-column  align="center" label="赔保类型" prop="logisticCompensationType"
        >
          <template slot-scope="scope">
            {{ logisticCompensationTypeFilter(scope.row.logisticCompensationType) }}
          </template>
        </el-table-column>
        <el-table-column  align="center" label="取证照片" :min-width="150">
          <template slot-scope="scope">
            <img :src="scope.row.proofImage" style="width:80px;height:80px;" class="link-type"
                 @click="isViewImageShow=true; imageViewed=scope.row.proofImage"/>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="送货人" prop="sendProductPerson"/>
        <el-table-column  align="center" label="送货电话" prop="sendProductTel"/>
        <el-table-column  align="center" label="货单号" :min-width="150" prop="orderNo">

        </el-table-column>
        <el-table-column  align="center" label="渠道号" :min-width="150" prop="channelNo"/>
        <el-table-column  align="center" label="商品编号" prop="code"/>
        <el-table-column  align="center" label="商品名称" prop="goodName"/>
        <el-table-column  align="center" label="商品规格" prop="sizeZh"/>
        <el-table-column  align="center" label="确认收货时间" :min-width="150" prop="channelReceiveTime"/>
        <el-table-column  align="center" label="赔保金额" prop="logisticCompensationAmount">
          <template slot-scope="scope">
            {{ scope.row.logisticCompensationAmountSymbol }} {{ Number(scope.row.logisticCompensationAmount).toFixed(2) }}
          </template>
        </el-table-column>

      </el-table>
      <el-row>
        <el-col :span="22" align="right">
          <div class="grid-content bg-purple" style="background: #DFF2FC;border: 1px solid #ccc;">合计:</div>
        </el-col>
        <el-col :span="2" >
          <div class="grid-content bg-purple" style="border: 1px solid #ccc;">{{ totalMoney }}</div>
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

    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="75%">
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "search.vue",
        props: {
          list: {
            type: Object,
            required: true
          },
          totalMoney: {
            type: String,
            required: true
          },
          monthValue:  {
            type: String,
            required: true
          }
        },
        data () {
          return {
            isViewImageShow: false,
            imageViewed: '',
            totalAmount: 0
          }
        },
        // mounted () {
        //   this.list.forEach(e => {
        //     this.totalAmount += Number(e.logisticCompensationAmount)
        //   })
        //   this.totalAmount = '￥' + this.totalAmount.toFixed(2)
        // },
        filters: {
          month: function (val) {
            return val.getFullYear() + '年' + (val.getMonth() + 1) + '月'
          }
        },
        methods: {
          logisticCompensationTypeFilter(value) {
            const statusMap = {
              1: '少货赔保',
              2: '破损赔保',
            }
            return statusMap[value]
          },
        }
    }
</script>

<style scoped>

</style>
