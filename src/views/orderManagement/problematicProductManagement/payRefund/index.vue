<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="Merge Payment No./Order No./Code/Description"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='0' :data="list"
              v-loading="listLoading" element-loading-text="给我一点时间"
              border fit
              size="mini" style="width: 100%;" class="main-table">
      <el-table-column align="center" min-width="160" :label="$t('order.mergePaymentNo')" prop="orderNo" fixed="left"/>
      <el-table-column align="center" min-width="230" :label="$t('order.beneficiaryBankSWIFITCode')" prop="b_bankAccount" />
      <el-table-column align="center" min-width="180" :label="$t('order.beneficiaryBankName')" prop="b_bankName" />
      <el-table-column align="center" min-width="190" :label="$t('order.beneficiaryBankAddress')" prop="b_bankAddress" />
      <el-table-column align="center" min-width="170" :label="$t('order.compensationAmount')">
        <template slot-scope="scope">
          <span>€ {{ scope.row.compensation.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" class-name="status-col" :label="$t('order.compensationStatus')">
        <template slot-scope="scope">
          {{ compensationStatusesMap[scope.row.compensationStatus] }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('order.operation')" class-name="small-padding" width="130" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="viewDetail(scope.row)">
            {{ scope.row.compensationStatus == 10 ? 'Make payment' : 'Review Detail'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isDialogDetailShow" fullscreen style="padding: 20px">
      <div v-if="isDialogDetailShow" class="dialog-wrap" style="width:753px;border-bottom-width: 1px">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">{{$t('order.mergePaymentNo')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{currentOrder.mergePaymentNo}}</div></el-col>
        </el-row>

        <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.beneficiaryBankSWIFITCode')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">
          </div>{{ currentOrder.r_bankAccount }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.beneficiaryBankName')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.r_bankName }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.beneficiaryBankAddress')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.r_bankAddress }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.remittingBankSWIFITCode')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.b_bankAccount }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.remittingBankName')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.r_bankName }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.remittingBankAddress')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">{{ currentOrder.r_bankAddress }}</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8" align="right"><div class="grid-content bg-purple">{{$t('order.totalPendingCompensation')}}</div></el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">€ {{ currentOrder.compensation.toFixed(2) }}</div></el-col>
        </el-row>

        <!--<compensation-order-detail v-for="order in orders" :detail="order"-->
                                   <!--:key="order.orderNo" @image-view="viewImage" />-->
        <compensation-order-detail :detail="currentOrder"
                                   :key="currentOrder.orderNo" @image-view="viewImage" />
      </div>
      <div style="text-align: center;margin-top: 20px" v-if="currentOrder.compensationStatus==10 && !currentOrder.confirmCompensationPayment">
        <el-button type="primary" @click="confirmAction(currentOrder)">Confirm Transfer</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="isViewImageShow" width="75%">
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>

  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import CompensationOrderDetail from './compensationOrderDetail'
  // import { getInventoryReservationList } from '../../../api/order'

  export default {
    name: 'pay-compensation',
    components: { CompensationOrderDetail },
    directives: {
      waves
    },
    data() {
      return {
        compensationStatusesMap: {
          10: this.$t('order.pendingCompensation'),
          20: this.$t('order.paidCompensation')
        },
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          rows: 20,
          keyword: undefined,
          keywordFields: ['orderNo'],
          orderNo: undefined
        },
        isDialogDetailShow: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogTransportChangeVisible: false,
        pvData: [],
        rules: {
          type: [
            { required: true, message: 'type is required', trigger: 'change' }
          ],
          timestamp: [
            {
              type: 'date',
              required: true,
              message: 'timestamp is required',
              trigger: 'change'
            }
          ],
          title: [
            { required: true, message: 'title is required', trigger: 'blur' }
          ]
        },
        downloadLoading: false,
        currentOrder: {},
        orders: [{}],
        isViewImageShow: false,
        imageViewed: ''
      }
    },

    created() {
      // this.getList()
    },
    methods: {
      // 查看货单
      viewDetail(row) {
        this.currentOrder = row
        this.isDialogDetailShow = true
      },

      toPayRefund(row) {
        this.currentOrder = row
        this.$refs.payment.open()
      },

      confirmAction(row) {
        this.list.forEach((item2, index2) => {
          if (item2 === row) {
            this.list.splice(index2, 1)
          }
        })
        const vm = this
        this.$confirm('Please check that the refund corresponding to the merge order number has been transferred and then click "Confirm Transfer" button', '', {
          confirmButtonText: this.$t('table.confirm'),
          cancelButtonText: 'Cancel',
          showClose: true
        }).then(() => {
          vm.isDialogDetailShow = false
        }).catch(() => {

        })
      },

      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },

      async getList() {
        this.listLoading = true
        const { data } = await getInventoryReservationList(this.listQuery)
        this.list = data.items
//        this.total = data.totalRecords
        this.total = data.items.length
        this.listLoading = false
      },

      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.rows = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },

      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = [
            'timestamp',
            'title',
            'type',
            'importance',
            'status'
          ]
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j === 'timestamp') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          })
        )
      }
    }
  }
</script>
<style lang="scss" scoped>
.el-row {
  margin: 0;
}
.el-col:nth-of-type(odd):not(.text-muted) div {
  background: #dff2fc;
  color: #424242;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.el-col:nth-of-type(even) div {
  background: #dff2fc;
  color: #424242;
  font-weight: 700;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-weight: normal;
}
.el-col:nth-child(odd) {
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
.el-col:nth-child(even) {
  color: #424242;
  display: flex;
  align-items: center;
  font-size: 12px;
  border-right: none;
  border-bottom: 1px #d5d5d5 solid;
}
.el-col:nth-child(even) div {
  padding-left: 1em;
}
</style>
