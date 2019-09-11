<template>
  <div class="app-container">
    <div class="email">未确认邮件: <span>{{emailNumber}}</span></div>
    <div class="trade-category-wrap" style="margin-bottom: 10px">
      <el-radio v-model="listQuery.propertyOfSale" :label="0" @change="getList">香港收款</el-radio>
      <el-radio v-model="listQuery.propertyOfSale" :label="1" @change="getList">香港付款</el-radio>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="货单号/并单号" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>
    <el-table
      :key='tableKey' :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      class="border2"
      style="width: 100%;border-right-width: 1px;border-bottom-width: 1px">
      <el-table-column min-width="120px" align="center" label="货单号/并单号" prop="order_no"/>

      <el-table-column min-width="150px" align="center" label="金额" prop="total_surplus_amount"/>

      <el-table-column min-width="120px" align="center" label="收款类型" prop="order_status_mes"  >

      </el-table-column>
      <el-table-column align="center" :label="$t('payOrder.operation')" min-width="120" class-name="small-padding">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="reviewDialog(scope.row)">
            {{listQuery.propertyOfSale? '确认付款' : '确认收款'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="isStopCooperationShow"
               width="70%"
               v-if="isStopCooperationShow"
               @close="isStopCooperationShow = false">
      <el-table
        :key='tableKey'
        v-loading="listLoading" element-loading-text="给我一点时间"
        border fit highlight-current-row
        class="border2" :data="[{}]"
        style="width: 100%;border-right-width: 1px;border-bottom-width: 1px">
        <el-table-column min-width="120px" align="center" label="货单号/并单号">
          <template slot-scope="scope">
            <el-input v-model="input_mes.order_no" placeholder="请输入货单号/并单号"></el-input>
          </template>
        </el-table-column>

        <el-table-column min-width="150px" align="center" label="金额" >
          <template slot-scope="scope">
            <el-input v-model="input_mes.total_surplus_amount" placeholder="请输入金额"></el-input>
          </template>
        </el-table-column>

      </el-table>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="submitCooperationTermination(input_mes)">{{listQuery.propertyOfSale? '确认付款' : '确认收款'}}</el-button>
      </div>
    </el-dialog>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index.vue",
        data () {
          return {
            emailNumber: 0,
            tableKey: 0,
            title: undefined,
            list: [],
            listLoading: false,
            listQuery: {
              page: 1,
              limit: 10,
              title: undefined,
              // importance: undefined,
              // searchText: undefined,
              // type: undefined,
              // sort: "+id",
              propertyOfSale: 0
            },
            total: null,
            isStopCooperationShow: false,
            input_list: [{}],
            input_mes: {
              total_surplus_amount: '',
              order_no: ''
            },
            choice_order: undefined
          }
        },
        created () {
          this.getList();
          this.getMailNum()
        },
        methods: {
          getMailNum () {
            this.$request({
              url: "/email/getEamilNum.do",
              method: 'get'
            }).then((res) => {
              if (res.errorCode == 0 && res.data) {
                this.emailNumber = res.data.results.length;
              }
            }).catch((err) => {
              this.$message.error('数据请求失败');
              this.listLoading = false
            })
          },
          getList () {
            this.listLoading = true;
            if (this.listQuery.title == '') this.listQuery.title = undefined;
            this.$request({
              url: "/order/getHongKongPayment.do",
              method: 'post',
              data: this.listQuery
            }).then((res) => {
              console.log(res)
              if (res.errorCode == 0) {
                res.data.rows.map((item) => {
                  let property_of_sale = "";
                  if (item.property_of_sale == 1) property_of_sale = "(一般贸易)";
                  if (item.property_of_sale == 2) property_of_sale = "(跨境贸易)";
                  return item.order_status_mes = item.order_status + property_of_sale;
                })
                this.list = res.data.rows;
                this.total = res.data.count

                // this.brandNameFilters = res.data.brandNameFilters
                this.listLoading = false
              } else {
                this.$message.error('数据请求失败');
                this.listLoading = false
              }
            }).catch((err) => {
              this.$message.error('数据请求失败');
              this.listLoading = false
            })
          },
          handleSizeChange(val) {
            this.listQuery.limit = val
            this.getList();
          },
          handleFilter () {
            this.getList();
          },
          reviewDialog (row) {
            console.log(row)
            this.isStopCooperationShow = true;
            this.choice_order = row;
            this.input_mes = {
              order_no: row.order_no,
              total_surplus_amount: row.total_surplus_amount
            }
          },
          submitCooperationTermination (mes) {
            let self = this;
            let choice_order = self.choice_order;
            if (choice_order.order_no == mes.order_no && choice_order.total_surplus_amount == mes.total_surplus_amount) {
              self.open2(mes);
              this.isStopCooperationShow = false;
            } else {
              self.open();
            }
          },
          open() {
            this.$alert('输入信息有误，请核对准确的邮件信息后再重新输入。', '', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          },
          open2(mes) {
            var payment_status = 0;
            switch (mes.pay_num) {
              case 0:
              case 2:
                payment_status = 2;
                break;
              case 1:
              case 3:
              case 4:
                payment_status = 3;
                break;
            }
            let that = this;
            this.$request({
              url: "/order/changePayment.do",
              method: 'post',
              data: {
                orderNo: that.input_mes.order_no,
                pay_num: mes.pay_num,
                payment_status: payment_status
              }
            }).then((res) => {
              if (res.errorCode == 0) {
                this.$message({
                  message: '确认成功!',
                  type: 'success'
                });
                this.getList();
              } else {
                this.$message.error('数据请求失败');
                this.listLoading = false
              }
            }).catch((err) => {
              this.$message.error('数据请求失败');
              this.listLoading = false
            })

          },
          handleCurrentChange(val) {
            this.listQuery.page = val
            this.getList()
          }
        }
    }
</script>

<style scoped>
  .email {
    margin-bottom: 5px;
    font-size: 14px;
    /*color: #409EFF;*/
    font-weight: 500;
  }
</style>
