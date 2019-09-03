<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item"
                placeholder="货单号/品牌名称/商品名称/商品编号" v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <div class="time-filter-wrap" style="margin-bottom: 20px">
      <!-- <el-date-picker
        v-model="yearValue"
        type="year"
        placeholder="选择年">
      </el-date-picker> -->
      <el-date-picker
        v-model="monthValue"
        @change="(val) => {listQuery.openedDate = val; getList()}"
        type="month"
        placeholder="选择月">
      </el-date-picker>
    </div>

    <div class="table-wrap" style="border: 1px solid #d5d5d5;border-right-width: 0">
      <el-table key='1' :data="list"
      ref="multipleTable"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit
      @selection-change="handleSelectionChange"
      highlight-current-row size="mini" style="width: 100%">

        <el-table-column width="130" align="center" label="货单号" prop="orderNo" fixed="left">
          <template slot-scope="scope">
            <span class="link-type" @click="viewReceive(scope.row)">{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100" align="center" label="品牌名称" prop="brandNameZh"
                         :filters="brandNameFilters"
                         :filter-method="filterHandler"/>

        <el-table-column
        align="center"
        width="170"
        :label="$t('retailer.retailerCategories')"
        prop="channelProp"
        :filters="[{text: 'DLQD', value: 1}, {text: 'FXQD', value: 3}]"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ channelTypeMap[scope.row.channelProp] }}</span>
        </template>
      </el-table-column>
        <el-table-column min-width="100" align="center" label="渠道号" prop="channelNo"/>
        <el-table-column min-width="100" align="center" label="渠道名称" prop="channelName"/>
        <el-table-column min-width="100" align="center" label="商品编号" prop="code"/>
        <el-table-column min-width="200" align="center" label="商品名称" prop="goodName"/>
        <el-table-column min-width="100" align="center" label="商品规格" prop="sizeZh"/>
        <el-table-column min-width="200" align="center" label="物流公司" prop="logisticCompanyName"/>
        <el-table-column min-width="200" align="center" label="物流单号" prop="logisticOrderNo"/>
        <el-table-column align="center" label="取证图片" :min-width="150">
          <template slot-scope="scope">
            <img :src="scope.row.proofImage" style="width:80px;height:80px;" class="link-type"
                 @click="isViewImageShow=true; imageViewed=scope.row.proofImage"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货电话" :min-width="150" prop="receivePhone"/>
        <el-table-column align="center" label="送货人" :min-width="150" prop="sendProductPerson"/>
        <el-table-column align="center" label="送货电话" :min-width="150" prop="sendProductTel"/>
        <el-table-column align="center" label="确认收货时间" :min-width="150" prop="channelReceiveTime"/>
        <el-table-column align="center" label="商品码" :min-width="150" prop="goodsNo"/>
        <el-table-column min-width="100" align="center" label="订货金额">
          <template slot-scope="scope">
            {{ scope.row.orderTotalAmountSymbol }} {{ Number(scope.row.orderTotalAmount).toFixed(2) }}
          </template>
        </el-table-column>

        <el-table-column min-width="100" align="center" label="赔保类型" prop="logisticCompensationType" fixed="right"
                         :filters="logisticCompensationTypeFilters"
                         :filter-method="filterHandler">
          <template slot-scope="scope">
            {{ logisticCompensationTypeFilter(scope.row.logisticCompensationType) }}
          </template>
        </el-table-column>
        <el-table-column min-width="100" align="center" label="赔保状态" prop="logisticCompensationStatus" fixed="right"
                         :filters="logisticCompensationStatusFilters"
                         :filter-method="filterHandler">
          <template slot-scope="scope">
            {{ logisticCompensationStatusFilter(scope.row.logisticCompensationStatus) }}
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="赔保金额" prop="logisticCompensationAmount" fixed="right">
          <template slot-scope="scope">
            {{ scope.row.logisticCompensationAmountSymbol }} {{ Number(scope.row.logisticCompensationAmount).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column type="selection" align="center" width="100" fixed="right"></el-table-column>

      </el-table>
      <el-table key='0' :data="[{}]" border fit :show-header="false"
                highlight-current-row size="mini" style="width: 100%">

        <el-table-column min-width="90" align="right" label="_">
          <template slot-scope="scope">
            <span class="text-total">合计：</span>
          </template>
        </el-table-column>

        <el-table-column width="120" align="center" label="_">
          <template slot-scope="scope">
            <span class="text-total">{{ totalAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('mergeRefundOrders.operation')" width="100"
                       class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary"
                     @click="sendMess(list)">
            {{send ? "发送数据": "去支付"}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>



    </div>

    <p>
      <span class="grid-content bg-purple">{{month}}珠海吾蜜公司赔保金额明细表</span>
      <el-button type="primary" plain>查看</el-button>
      <el-button type="primary" plain>发送赔保明明细表</el-button>
      <el-button type="primary" plain>确认到账</el-button>
    </p>
    <div class="pagination-container">
      <el-pagination background @current-change="changePageList" :current-page="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--viewImage-->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="75%">
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>

    <!--查看已收货货单-->
    <el-dialog :visible.sync="isOrderShow" fullscreen style="padding: 20px">
      <alreadyReceive :currentRow="currentRow" v-if="isOrderShow"></alreadyReceive>
    </el-dialog>
    <el-dialog :visible.sync="isStopCooperationShow"
               width="70%"
               v-if="isStopCooperationShow"
               @close="isStopCooperationShow = false">
      <el-table

        v-loading="listLoading" element-loading-text="给我一点时间"
        border fit highlight-current-row current-row-key="indexkey"
        class="border2" :data="orderSelected"
        style="width: 100%;border-right-width: 1px;border-bottom-width: 1px">
        <el-table-column min-width="120px" align="center" label="邮箱通讯录">
          <template slot-scope="scope">
            <p><el-button style="width: 20%" type="text" @click="addEmail(scope.$index)">新增</el-button>
              <el-input style="width: 80%;"
                        placeholder="请输入邮箱账号"
                        v-model="scope.row.input"
                        clearable>
              </el-input></p>
            <ul  v-for="item in orderSelected.inputList" :key="index">
              <li>{{item}}</li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column min-width="150px" align="center" label="邮件命题" property="emailTitle">

        </el-table-column>
        <el-table-column min-width="150px" align="center" label="文档" property="pdf">

        </el-table-column>
      </el-table>
      <div class="dialogBottomButton-wrap">
        <el-button type="danger" @click="isStopCooperationShow = false">取消</el-button>
        <el-button type="primary" @click="sendPdf">发送</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { issueGoods } from '@/api/goods'
  import waves from '@/directive/waves' // 水波纹指令
  import alreadyReceive from '../alreadyReceive/index.vue'

  export default {
    name: 'compensation-page',
    directives: {
      waves
    },
    components: {
      alreadyReceive
    },
    data() {
      return {
        channelTypeMap: {
          1: "DLQD",
          2: "DFQD",
          3: "FXQD"
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          searchText: undefined,
          limit: 20,
          openedDate: null,
        },
        isViewImageShow: false,
        imageViewed: '',
          brandNameFilters: [],
        logisticCompensationTypeFilters: [
          {text: '少货赔保', value: 1},
          {text: '破损赔保', value: 2},
        ],
        logisticCompensationStatusFilters: [
          {text: '待赔保', value: 1},
          {text: '已赔保', value: 2},
        ],
        yearValue: null,
        monthValue: null,
        totalAmount: 0,
        isOrderShow: false,
        currentRow: {},
        orderSelected: [],
        send: true,
        isStopCooperationShow: false,
        input: '',
        month: ''
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.orderSelected = val;
        this.totalAmount = 0
        console.log(this.orderSelected)
        this.orderSelected.forEach((e,i,s) => {
          this.totalAmount += Number(e.logisticCompensationAmount)
          e.emailTitle = e.orderNo + '珠海吾蜜公司赔保数据'
          e.pdf = e.orderNo + '珠海吾蜜公司赔保数据.pdf';
        })

        this.totalAmount = '￥' + this.totalAmount.toFixed(2)
        if (this.orderSelected.length==0) {
          this.totalAmount = 0
          this.list.forEach((e,i,s) => {
            this.totalAmount += Number(e.logisticCompensationAmount)
          })
          this.totalAmount = '￥' + this.totalAmount.toFixed(2)
        }
      },
      logisticCompensationTypeFilter(value) {
        const statusMap = {
          1: '少货赔保',
          2: '破损赔保',
        }
        return statusMap[value]
      },
      logisticCompensationStatusFilter(value) {
        const statusMap = {
          1: '待赔保',
          2: '已赔保',
        }
        return statusMap[value]
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      changePageList(val) {
        this.listQuery.page = val
        this.getList()
      },
      getList() {
        this.listLoading = true
        this.$request({
          url: '/issue/logisticCompensationListManager.do',
          method: 'post',
          data: this.listQuery
        }).then((res) => {
          if (res.errorCode == 0) {
            this.list = res.data.items
            this.totalAmount = 0
            this.list.forEach((e,i,s) => {
              this.totalAmount += Number(e.logisticCompensationAmount)
              e.input = "";
              e.inputList = [];
            })
            this.totalAmount = '￥' + this.totalAmount.toFixed(2)
            this.total = res.data.total
            this.brandNameFilters = res.data.brandNameFilters
            this.listLoading = false
          } else {
            this.$message.error('没有找到匹配结果');
            this.listLoading = false
          }
        }).catch((err) => {
          this.$message.error('没有找到匹配结果');
          this.listLoading = false
        })
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      viewReceive(row) {
        this.currentRow = row
        this.isOrderShow = true
      },
      sendMess () {
        if (this.orderSelected.length ==0) {
          this.$message('请选择要发送的货单');
        } else {
          this.isStopCooperationShow = true;
        }
      },
      sendPdf () {
        this.isStopCooperationShow = false;
        this.$message({
          message: '文件已发送至您的所选的邮箱!',
          type: 'success'
        });
      },
      addEmail (index) {
        var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");
        var email = this.orderSelected[index].input;
        if (email == "" || !reg.test(email)) {
          this.$message({
            message: '请输入正确的邮箱账号',
            type: 'warning'
          });
        } else {
          this.orderSelected[index].inputList.push(email);
        }
      }
    },
    created() {
      var date = new Date();
      var day = date.getDate();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      this.month = year + "年" + month + "月";
      this.monthValue = year + "-" + month
      this.listQuery.openedDate = year + "-" + month;
      if (day == 1) {
        this.send = true
      }
      this.getList()
    },
  }
</script>

<style lang="scss" scoped>

</style>
