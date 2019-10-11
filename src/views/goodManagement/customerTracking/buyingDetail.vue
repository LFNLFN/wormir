<template>
  <div>
    <el-date-picker
      v-model="yearValue"
      type="year"
      @change="showDataEachYear"
      placeholder="选择年">
    </el-date-picker>
    <p></p>
    <!-- border2 -->
    <el-table
      key='boxList' :data="list"
      border fit highlight-current-row
      v-loading="listLoading" element-loading-text="给我一点时间"
      size="mini" style="width: 100%;border-top:1px solid #d5d5d5;border-left:1px solid #d5d5d5;"
    class="">
      <el-table-column align="center" label="品牌名称" prop="" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.brandNameEn || scope.row.brandNameZh }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品编号" prop="goodNoForBrand" min-width="100"/>
      <el-table-column align="center" label="商品名称" prop="" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.goodNameEn || scope.row.goodNameZh }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品规格" prop="goodSpecification" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.goodSpecification + scope.row.goodSpecificationUnit }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品码" prop="sourceCode" min-width="120"/>
      <el-table-column align="center" label="最低零售价" prop="minRetailerPrice" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.minRetailerPriceSymbol }} {{ Number(scope.row.minRetailerPrice).toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="出库售价" prop="outboundPrice" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.outboundPriceSymbol }} {{ Number(scope.row.outboundPrice).toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="购买/获取渠道" prop="purchaseType" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.purchaseType==1">吾蜜公司赠送</span>
          <span v-else class="link-type" @click="showCheck(scope.row)">{{ scope.row.purchaseType }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="出库属性" prop="outboundProperty"
                       :filters="propertyFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ propertyMap[scope.row.outboundProperty].text }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="商品情况" prop="goodSituation"
                       :filters="productStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ productStatusMap[scope.row.goodSituation].text }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="激活状态" prop="activationState"
                       :filters="activeStatusFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ activeStatusMap[scope.row.activationState].text }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="销售/出库时间" prop="outboundTime" min-width="120" />

      <el-table-column min-width="100" align="center" label="异常详情" prop="exceptionDetails">
        <template slot-scope="scope">
          <span>{{ exceptionDetailsMap[scope.row.exceptionDetails].text }}</span>
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column min-width="100" align="center" label="所在城市" prop="city"/>
      <el-table-column min-width="250" align="center" label="收货地址" prop="address"/>
      <el-table-column min-width="150" align="center" label="身份证号" prop="IDCard"/>
      <el-table-column min-width="100" align="center" label="验证手机号" prop="verifyPhone">
        <template slot-scope="scope">
          <span style="color: blue" v-if="scope.row.verifyPhone != scope.row.member_phone">{{ scope.row.verifyPhone || '--' }}</span>
          <span v-else>{{ scope.row.verifyPhone || '--' }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="isCheckShow" width="75%" @close="isCheckShow = false" title="查看渠道档案" append-to-body>
      <to-check-detail :currentRow="currentRow" v-if="isCheckShow"></to-check-detail>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves'
  import Mock from 'mockjs'
  import toCheckDetail from './toCheckDetail.vue'

  export default {
    name: 'buyingDetail',
    components: {
      toCheckDetail
    },
    props: {
      currentCustomer: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    directives: {
      waves
    },
    computed: {},
    data() {
      return {
        yearValue: null,
        currentRow: '',
        isCheckShow: false,
        list: [],
        productStatusFilters: [
          { text: '正常商品', value: 1 },
          { text: '瑕疵商品', value: 2 },
          { text: '破损商品', value: 3 },
          { text: '少货商品', value: 4 },
          { text: '瑕疵待确认', value: 5 },
          { text: '破损待确认', value: 6 },
          { text: '未定义商品', value: 0 },
          { text: '正常赠品', value: 7 },
          { text: '瑕疵赠品', value: 8 },
          { text: '破损赠品', value: 9 },
          { text: '少货赠品', value: 10 },
          { text: '未定义赠品', value: 11 },
        ],
        productStatusMap: {
          0: { text: '未定义商品', value: 0 },
          1: { text: '正常商品', value: 1 },
          2: { text: '瑕疵商品', value: 2 },
          3: { text: '破损商品', value: 3 },
          4: { text: '少货商品', value: 4 },
          5: { text: '瑕疵待确认', value: 5 },
          6: { text: '破损待确认', value: 6 },
          7: { text: '正常赠品', value: 7 },
          8: { text: '瑕疵赠品', value: 8 },
          9: { text: '破损赠品', value: 9 },
          10: { text: '少货赠品', value: 10 },
          11: { text: '未定义赠品', value: 11 },
        },
        activeStatusFilters: [
          { text: '无效激活', value: 0 },
          { text: '有效激活', value: 1 },
        ],
        activeStatusMap: {
          0: { text: '无效激活', value: 0 },
          1: { text: '有效激活', value: 1 },
        },
        propertyFilters: [
          { text: '一般贸易商品', value: 0 },
          { text: '跨境贸易商品', value: 1 },
          { text: '一般贸易赠品', value: 2 },
        ],
        propertyMap: {
          0: { text: '一般贸易商品', value: 0 },
          1: { text: '跨境贸易商品', value: 1 },
          2: { text: '一般贸易赠品', value: 2 },
        },
        exceptionDetailsMap: {
          1: { text: '没有', value: 1 },
          2: { text: '距出库时间>25天未收货', value: 2 },
          3: { text: '未收货商品已售', value: 3 },
          4: { text: '破损商品已售', value: 4 },
          5: { text: '少货商品已售', value: 5 },
          6: { text: '瑕疵待确认商品已售', value: 6 },
          7: { text: '破损待确认商品已售', value: 7 },
          8: { text: '距末次销售>30天', value: 8 },
        },
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
        this.$request({
          url: "/user/memberPurchaseHistory.do",
          method: "post",
          data: { memberNo: this.currentCustomer.member_no }
        })
        .then(res => {
          if (res.errorCode == 0) {
            this.list = res.data.items;
            // this.totalAmount = 0;
            // this.list.forEach((e, i, s) => {
            //   this.totalAmount += Number(e.logisticCompensationAmount);
            // });
            // this.totalAmount = "￥" + this.totalAmount.toFixed(2);
            // this.total = res.data.total;
            // this.brandNameFilters = res.data.brandNameFilters;
            this.listLoading = false;
          } else {
            this.$message.error("没有找到匹配结果");
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("没有找到匹配结果");
          this.listLoading = false;
        });
      },
      showCheck(row) {
        this.currentRow = row
        this.isCheckShow = true
      },
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      showDataEachYear(value) {
        if (value.getFullYear() === 2018) {
          this.list = [{
            boxCode: '123456',
            downloadFile: 'download.zip',
            createUserId: '1',
            recipients: '0@mail.com',
            createTime: '2018-09-01',

            brandEnglishName: 'LANCOM',
            brandChineseName: '兰蔻',
            goodsNo: Mock.Random.natural(123, 199),
            goodsEnglishName: 'Lipstick',
            goodsChineseName: '口红',
            goodsSpecificationChinese: '4克',
            sourceCode: Mock.Random.natural(123, 199),
            goodsPrice: Mock.Random.natural(500, 799),
            actualPrice: Mock.Random.natural(400, 499),
            channelNo: 'FXQD' + 20180522001 + '-' + Mock.Random.natural(1001, 1009),
            channelName: 'zxc总店',
            channelCode: Mock.Random.natural(0, 2),
            channelStatus: 0,
            cooperationType: Mock.Random.natural(0, 1),
            channelType: Mock.Random.natural(0, 3),
            channelProp: 0,
            channelLevel: Mock.Random.natural(0, 3),
            FXQDbelongCode: 'FXQD' + 20180522001,
            FXQDbelongName: 'FXQD',
            openingTime: Mock.Random.now(),
            proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg',
            businessEntity: 1,

            //        productStatus: Mock.Random.natural(0, 6),
            productStatus: Mock.Random.natural(1, 6),
            salesTime: Mock.Random.now(),
            activeStatus: Mock.Random.natural(0, 1),
            abnormalDetail: '商品标签不完整',
            city: '广州',
            address: '番禺区百越广场',
            identification: 440683944958667283,
            verifyPhone: 13456766787,
            buyPhone: 13875509478
          }]
        }
      }
    }
  }
</script>
<style scoped>

</style>

