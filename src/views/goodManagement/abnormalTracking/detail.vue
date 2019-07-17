<template>
  <div>
    <el-row class="border1" style="border-top-width: 2px;border-bottom: none">
      <el-col :span="2" align="left">
        <div class="grid-content bg-purple">渠道号</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">{{ currentRow.channelNo }}</div>
      </el-col>
      <el-col :span="2" align="left">
        <div class="grid-content bg-purple">渠道名称</div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">{{ currentRow.channelName }}</div>
      </el-col>
      <el-col :span="2" align="left">
        <div class="grid-content bg-purple">渠道级别</div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple">{{ currentRow.channelLevel || '/' }}</div>
      </el-col>
      <el-col :span="2" align="left">
        <div class="grid-content bg-purple">联系人</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">{{ currentRow.channelUserName }}</div>
      </el-col>
      <el-col :span="2" align="left">
        <div class="grid-content bg-purple">联系电话</div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">{{ currentRow.channelMobile }}</div>
      </el-col>
    </el-row>
    <el-table :data="list" border fit highlight-current-row
              v-loading="listLoading" element-loading-text="给我一点时间"
              size="mini" style="width: 100%;border-top:none"
              class="border2">
      <el-table-column min-width="120" align="center" label="商品编号" fixed="left" prop="goodsNo"/>
      <el-table-column min-width="120" align="center" label="商品名称（英文）" prop="goodsEnglishName"/>
      <el-table-column min-width="120" align="center" label="箱码" prop="boxCode"/>
      <el-table-column min-width="120" align="center" label="商品码" prop="sourceCode"/>
      <el-table-column min-width="120" align="center" label="收货状态" prop="receiveStatus">
        <template slot-scope="scope">
          <span>{{ receiveStatusMap[scope.row.receiveStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="商品情况" prop="productStatus">
        <template slot-scope="scope">
          <span>{{ productStatusMap[scope.row.productStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="收货时间" prop="receiveTime"/>
      <el-table-column align="center" label="流转状态" prop="transferStatus">
        <template slot-scope="scope">
          <span>{{ transferStatusMap[scope.row.transferStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="流转时间" prop="transferTime"/>
      <el-table-column min-width="100" align="center" label="最低零售价" prop="goodsPrice">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.goodsPrice.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100" align="center" label="出库售价" prop="actualPrice">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.actualPrice.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="激活状态" prop="activeStatus">
        <template slot-scope="scope">
          <span>{{ activeStatusMap[scope.row.activeStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="流转情况" prop="transferSituation">
        <template slot-scope="scope">
          <span>{{ transferSituationMap[scope.row.transferSituation].text }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="出库时间" prop="outboundTime"/>
      <el-table-column min-width="100" align="center" label="异常详情" prop="abnormalDetail"/>
    </el-table>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import waves from '@/directive/waves'

  export default {
    name: 'detail',
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    directives: {
      waves
    },
    created() {
    },
    data() {
      return {
        list: [
          {
            goodsNo: Mock.Random.natural(123, 199),
            goodsEnglishName: 'Lipstick',
            boxCode: Mock.Random.natural(100, 999),
            sourceCode: Mock.Random.natural(123, 199),
            outboundTime: Mock.Random.now(),
            receiveStatus: 1,
            productStatus: Mock.Random.natural(1, 6),
            receiveTime: Mock.Random.now(),
            transferStatus: Mock.Random.natural(0, 3),
            transferTime: Mock.Random.now(),
            goodsPrice: Mock.Random.natural(500, 799),
            actualPrice: Mock.Random.natural(400, 499),
            activeStatus: Mock.Random.natural(0, 2),
            transferSituation: Mock.Random.natural(0, 1),
            abnormalDetail: '商品标签不完整'
          }
        ],
        listQuery: {
          keyword: ''
        },
        listLoading: false,
        receiveStatusMap: {
          0: { text: '未收货', value: 0 },
          1: { text: '已收货', value: 1 },
        },
        productStatusMap: {
//          0: { text: '未定义', value: 0 },
          1: { text: '正常商品', value: 1 },
          2: { text: '瑕疵商品', value: 2 },
          3: { text: '破损商品', value: 3 },
          4: { text: '少货商品', value: 4 },
          5: { text: '瑕疵待确认', value: 5 },
          6: { text: '破损待确认', value: 6 },
        },
        transferStatusMap: {
          0: { text: '已售出', value: 0 },
          1: { text: '未售出', value: 1 },
          2: { text: '已作废', value: 2 },
          3: { text: '未定义', value: 3 },
        },
        activeStatusMap: {
          0: { text: '无效激活', value: 0 },
          1: { text: '有效激活', value: 1 },
          2: { text: '未激活', value: 2 },
        },
        transferSituationMap: {
          0: { text: '异常', value: 0 },
          1: { text: '正常', value: 1 },
        },
      }
    },
    methods: {}
  }
</script>
<style scoped>
  .filter-container {
    width: 50%;
    float: left;
    padding-left: 3%;
    padding-top: 1%;
  }

  .empty-table .el-table__body-wrapper {
    display: none;
  }

  .el-row .el-col:nth-child(odd) {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
    border-bottom: 1px #d5d5d5 solid;
  }

  .el-row .el-col:nth-child(even) {
    color: #424242;
    display: flex;
    align-items: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
    border-bottom: 1px #d5d5d5 solid;
  }

  .el-row .el-col:nth-child(even) div {
    padding-left: 1em;
  }

  .el-row .el-col:first-of-type {
    border-left: solid 1px #D5D5D5;
  }
</style>

