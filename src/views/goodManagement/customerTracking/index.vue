<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="顾客编号/联系电话/商品码"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

     <el-table :data="list"
               v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row size="mini"
               class="border-top2 border-left2"
               style="width: 100%" >
      <el-table-column  min-width="120" align="center" label="顾客编号" prop="customerNo" />
      <el-table-column  min-width="100" align="center" label="顾客姓名" prop="name" />
      <el-table-column  min-width="120" align="center" label="电话号码" prop="phone" />
      <el-table-column  min-width="100" align="center" label="顾客性别" prop="gender" />
      <el-table-column  min-width="100" align="center" label="顾客年龄" prop="age" />
      <el-table-column  min-width="120" align="center" label="顾客生日" prop="birthday" />
      <el-table-column width= "120" align="center" :label="$t('order.operation')" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="buyingDetail(scope.row)">购买详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.rows"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="isBuyingDetailShow" width="1200px">
      <buying-detail :brand="currentCustomer" v-if="isBuyingDetailShow"></buying-detail>
    </el-dialog>

  </div>
</template>
<script>
import waves from '@/directive/waves'
import buyingDetail from './buyingDetail'
import Mock from 'mockjs'
import toCheckDetail  from './toCheckDetail'

export default {
  components: {
    buyingDetail,
    toCheckDetail
  },
  directives: {
    waves
  },
  data() {
    return {
      listQuery: {
        keyword: '',
        page: 1,
        rows: 20
      },
      list: [],
      isBuyingDetailShow: false,
      currentCustomer: '',
      listLoading: false,
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.list.push({
        customerNo: Mock.Random.natural(1000000000, 9999999999),
        name: '兰蔻',
        phone: '18588888888',
        gender: '女',
        age: '20',
        birthday: '1997-10-01'
      })
      this.listLoading = false
    },
    handleCurrentChange() {
    },
    buyingDetail(row) {
      this.isBuyingDetailShow = true
      this.currentCustomer = row
    },
    handleFilter() {
    },
    handleSizeChange(val) {
      this.listQuery.rows = val
    },

  }
}
</script>
<style scoped>

</style>
