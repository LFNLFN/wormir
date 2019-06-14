<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" placeholder="会员编号/联系电话/商品码"
                v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

     <el-table :data="list"
               v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row size="mini"
               class="border-top2 border-left2"
               style="width: 100%" >
      <el-table-column  min-width="120" align="center" label="会员编号" prop="customerNo" />
      <el-table-column  min-width="100" align="center" label="会员姓名" prop="name" />
      <el-table-column  min-width="120" align="center" label="电话号码" prop="phone" />
      <el-table-column  min-width="100" align="center" label="会员性别" prop="gender" />
      <el-table-column  min-width="100" align="center" label="会员年龄" prop="age" />
      <el-table-column  min-width="120" align="center" label="会员生日" prop="birthday" />
      <el-table-column  min-width="120" align="center" label="会员属性" prop="property" :filters="propertyFilter"/>
      <el-table-column width= "120" align="center" :label="$t('order.operation')" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="buyingDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
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
        searchText: '',
        page: 1,
        limit: 20
      },
      list: [],
      isBuyingDetailShow: false,
      currentCustomer: '',
      listLoading: false,
      total: 0,

      propertyFilter: [
          { text: '普通会员', value: 1 },
          { text: '白银会员', value: 2 },
          { text: '黄金会员', value: 3 },
          { text: '白钻会员', value: 4 },
          { text: '黄钻会员', value: 5 },
          { text: '皇冠会员', value: 6 },
        ],
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
        birthday: '1997-10-01',
        property: '普通会员'
      })
      this.listLoading = false
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
    },
    buyingDetail(row) {
      this.isBuyingDetailShow = true
      this.currentCustomer = row
    },
    handleFilter() {
    },
  }
}
</script>

<style scoped>

</style>
