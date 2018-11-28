<template>
  <div class="app-container">
    <el-table :data="list"
              v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row
              class="noBorder"
              style="width: 100%;border-left: solid 2px #D5D5D5">
      <el-table-column
        prop="channelNum"
        label="渠道号"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道名称"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="cooperationType"
        label="合作类型"
        align="center"
        width="100">
        <template slot-scope="scope">
          <span>{{ cooperationTypeMap[scope.row.cooperationType].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelType"
        label="渠道类别"
        align="center"
        width="100">
        <template slot-scope="scope">
          <span>{{ channelTypeMap[scope.row.channelType].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelProp"
        label="渠道属性"
        align="center"
        width="230">
        <template slot-scope="scope">
          <div style="min-width: 4em;margin: 0 auto">{{ channelPropMap[scope.row.channelProp].text }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelLevel"
        label="渠道级别"
        align="center"
        width="100">
        <template slot-scope="scope">
          <span>{{ channelLevelMap[scope.row.currentLevelStatus].text }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center" label="级别变化"
        width="100" prop="levelChange">
        <template slot-scope="scope">
          <span>{{ channelLevelMap[scope.row.lastLevelStatus].text.substr(0,1) }} → {{ channelLevelMap[scope.row.currentLevelStatus].text.substr(0,1) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center" label="变化类型"
        width="100" prop="changeType"
        class-name="last-col">
        <template slot-scope="scope">
          <span v-if="scope.row.currentLevelStatus > scope.row.lastLevelStatus">{{ '升级' }}</span>
          <span v-if="scope.row.currentLevelStatus === scope.row.lastLevelStatus">{{ '平级' }}</span>
          <span v-if="scope.row.currentLevelStatus < scope.row.lastLevelStatus">{{ '降级' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: space-between;padding-right: 3px" class="border-left2">
      <div style="display: flex;flex-direction: column;justify-content: flex-end;">
        <div style="display: flex;flex-direction: column;justify-content: flex-end;" class="select-area">
          <div style="display: flex;justify-content: flex-start" class="select-item">
            <div class="select-title">品牌选择</div>
            <div class="select-content">
              <el-select v-model="brandValue" placeholder="请选择品牌" class="noBorderInput">
                <el-option
                  v-for="item in brandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-start" class="select-item">
            <div class="select-title">年份选择</div>
            <div class="select-content">
              <el-select v-model="yearValue" placeholder="请选择年份" class="noBorderInput">
                <el-option
                  v-for="item in yearOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-start" class="select-item">
            <div class="select-title">月份选择</div>
            <div class="select-content">
              <el-select v-model="monthValue" placeholder="请选择月份" class="noBorderInput">
                <el-option
                  v-for="item in monthOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-table
          :data="compareList"
          v-loading="listLoading" element-loading-text="给我一点时间"
          border fit highlight-current-row
          class="noBorder compareBorder"
          :header-cell-style="{padding: 0}"
          style="width: 100%;border-left: solid 1px #D5D5D5">
          <el-table-column align="center" label="各品牌销量与所在级别要求销量对比" prop="" class-name="last-col">
            <el-table-column align="center" label="品牌" width="100" prop="brandName"/>
            <el-table-column align="center" label="当前级别销量要求" width="130" prop="standard"/>
            <el-table-column align="center" label="当月">
              <el-table-column align="center" label="销量" width="100" prop="thisMonthSale"/>
              <el-table-column align="center" label="对比情况" width="100" prop="compareThisMonth"/>
            </el-table-column>
            <el-table-column align="center" label="上月" class-name="last-col">
              <el-table-column align="center" label="销量" width="100" prop="lastMonthSale"/>
              <el-table-column align="center" label="对比情况" width="100" prop="cpmpareLastMonth" class-name="last-col"/>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="padding-right: 2px">
      <el-table
        :data="productList"
        v-loading="listLoading" element-loading-text="给我一点时间"
        border fit highlight-current-row
        class="noBorder sumBorder"
        style="width: 100%;border-left: solid 2px #D5D5D5"
        show-summary :summary-method="getSummaries">
        <el-table-column align="center" label="品牌" width="100" prop="brandName"/>
        <el-table-column align="center" label="商品编号" width="100" prop="goodsNo"/>
        <el-table-column align="center" label="商品名称" width="200" prop="goodsName"/>
        <el-table-column align="center" label="商品码" width="200" prop="goodsCode"/>
        <el-table-column align="center" label="商品规格" width="130" prop="goodsSpec"/>
        <el-table-column align="center" label="商品售价" width="200" prop="goodsPrice"/>
        <el-table-column align="center" label="出库时间" width="200" prop="outBoundTime" class-name="last-col"/>
      </el-table>
    </div>
  </div>
</template>

<script>
  import Mock from 'mockjs'

  export default {
    name: 'level-detail',
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        brandOptions: [
          {
            value: 0,
            label: 'AESOP'
          },
          {
            value: 1,
            label: 'BONPOINT'
          },
          {
            value: 2,
            label: 'ORDINARY'
          }
        ],
        brandValue: 0,
        monthOptions: [
          {
            value: 1,
            label: '一月'
          }, {
            value: 2,
            label: '二月'
          }, {
            value: 3,
            label: '三月'
          }, {
            value: 4,
            label: '四月'
          }, {
            value: 5,
            label: '五月'
          }, {
            value: 6,
            label: '六月'
          }, {
            value: 7,
            label: '七月'
          }, {
            value: 8,
            label: '八月'
          }, {
            value: 9,
            label: '九月'
          }, {
            value: 10,
            label: '十月'
          }, {
            value: 11,
            label: '十一月'
          }, {
            value: 12,
            label: '十二月'
          }
        ],
        monthValue: 12,
        yearOptions: [{
          value: 0,
          label: '2018'
        }, {
          value: 1,
          label: '2017'
        }, {
          value: 2,
          label: '2016'
        }],
        yearValue: 0,
        listQuery: {
          title: ''
        },
        listLoading: false,
        list: [],
        compareList: [{
          brandName: 'AESOP',
          standard: 2000,
          thisMonthSale: 2112,
          compareThisMonth: '>2000',
          lastMonthSale: 1890,
          cpmpareLastMonth: '<2000'
        }],
        productList: [
          {
            brandName: 'AESOP',
            goodsNo: Mock.Random.natural(20180522001, 20180522100),
            goodsName: '补水面膜',
            goodsCode: Mock.Random.natural(22001, 22100),
            goodsSpec: Mock.Random.natural(4, 10) + '瓶/箱',
            goodsPrice: Mock.Random.natural(100, 200),
            outBoundTime: Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
          }
        ],
        channelCodeMap: {
          0: { text: 'DLQD', value: 0 },
          1: { text: 'DFQD', value: 1 },
          2: { text: 'FXQD', value: 2 }
        },
        channelStatusMap: {
          0: { text: '待签合同', value: 0 },
          1: { text: '待激活账号', value: 1 },
          2: { text: '待付保证金', value: 2 },
          3: { text: '待接系统', value: 3 },
          4: { text: '停止签合同', value: 4 },
          5: { text: '停止激活账户', value: 5 },
          6: { text: '停止付保证金', value: 6 }
        },
        cooperationTypeMap: {
          0: { text: '渠道入驻', value: 0 },
          1: { text: '渠道变更', value: 1 }
        },
        channelTypeMap: {
          0: { text: '淘宝C店', value: 0 },
          1: { text: '淘宝企业店', value: 1 },
          2: { text: '天猫店', value: 2 },
          3: { text: 'B2C平台', value: 3 },
        },
        channelPropMap: {
          0: { text: '独立渠道(DLQD)', value: 0 },
          1: { text: '代发渠道(DFQD)', value: 1 },
          2: { text: '分销渠道(FXQD)', value: 2 },
        },
        channelLevelMap: {
          0: { text: 'A级渠道', value: 0 },
          1: { text: 'B级渠道', value: 1 },
          2: { text: 'C级渠道', value: 2 },
          3: { text: 'C级渠道', value: 3 },
        },
      }
    },
    computed: {
      saleTotal() {
        let saleTotal = 0
        this.compareList.forEach((item, index, arr) => {
          saleTotal += item.thisMonthSale
        })
        return saleTotal
      },
      saleroomTotal() {
        let saleTotal = 0
        this.productList.forEach((item, index, arr) => {
          saleTotal += item.goodsPrice
        })
        return saleTotal
      },
    },
    created() {
      this.getChannel()
    },
    methods: {
      // 计算表格合计项
      getSummaries(param) {
        const { columns } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 3) {
            sums[index] = this.saleTotal
          }
          if (index === 5) {
            sums[index] = '￥ ' + this.saleroomTotal.toFixed(2)
//            return;
          }
        })

        return sums
      },
      getChannel() {
        this.list.push(this.currentRow)
      }
    }
  }
</script>

<style scoped>
  .select-area .select-title {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    width: 99px;
    padding: 5px 10px;
    text-align: center;
    border-right: solid #D5D5D5 1px;
  }

  .select-area .select-content {
    padding-top: 3px;
  }

  .select-item {
    border: solid #D5D5D5 1px;
    border-left: none;
    border-bottom: none;
  }
</style>
