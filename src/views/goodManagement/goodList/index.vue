<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label>
        <el-input
          v-model="filterForm.searchText"
          :placeholder="filterForm.placeholder1"
          style="width:250px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="goodBlurSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="addGood()">新增商品</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="goodTableData"
      style="width: 100%"
      class="border-top2 border-left2 border-right1"
    >
      <el-table-column
        fixed="left"
        prop="goodsImg"
        label="缩略图-点击放大"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.goodsImg"
            alt="点击放大"
            width="50"
            height="50"
            @click="enlargePic(scope.row)"
          >
        </template>
      </el-table-column>
      <el-table-column prop="goodsSerialNo" label="商品序列号" min-width="150" align="center"></el-table-column>
      <el-table-column prop="brandChineseName" label="商品品牌" min-width="120" align="center"></el-table-column>
      <el-table-column
        label="商品属性"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{goodsCategoryList[scope.row.goodsCategory]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchandiseMainVariety" label="主品类" min-width="90" align="center"></el-table-column>
      <el-table-column prop="merchandiseChildVariety" label="子品类" min-width="90" align="center"></el-table-column>
      <el-table-column prop="series" label="商品系列" min-width="110" align="center"></el-table-column>
      <el-table-column prop="goodsNo" label="商品编号" width="100" align="center"></el-table-column>
      <el-table-column
        prop="goodsChineseName"
        label="商品名称-中文"
        width="120"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="goodsEnglishName"
        label="商品名称-英文"
        width="120"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <!-- <el-table-column
        prop="goodStatus"
        width="110"
        label="商品状态"
        :filters="[{ text: '待提交审核', value: '待提交审核' }, { text: '待审核', value: '待审核' }, { text: '正常销售', value: '正常销售' }, { text: '停止销售', value: '停止销售' }]"
        :filter-method="filterHandler_goodStatus"
        align="center"
      ></el-table-column> -->
      <el-table-column
        width="110"
        label="商品状态"
        align="center"
      >
        <template slot-scope="scope">
          <span>正常销售</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodPrice" label="商品售价" width="100" align="center">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.unitPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="initialDiscount" label="起订折扣" width="100" align="center"></el-table-column>
      <el-table-column
        prop="checkInTime"
        label="录入时间"
        min-width="120"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="checkGoodDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 1em;text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterForm.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="filterForm.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterForm.total"
      ></el-pagination>
    </div>
    <el-dialog
      :visible.sync="isEnlargeGoodThumbnailShow"
      width="70%"
      @close="isEnlargeGoodThumbnailShow = false"
      title="商品图片"
      append-to-body
    >
      <div style="margin: 0 auto">
        <img :src="currentGoodThumbnail" alt style="width: 100%;height: 100%">
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="isGoodDetailShow"
      width="70%"
      @close="isGoodDetailShow = false"
      title="品牌商品详情"
      append-to-body
    >
      <goodDetail :theGoodDetail="theGoodDetail"></goodDetail>
    </el-dialog>
    <el-dialog
      :visible.sync="isAddGoodShow"
      width="70%"
      @close="isAddGoodShow = false"
      title="添加品牌商品"
      append-to-body
    >
      <addGood v-if="isAddGoodShow" @submitSuccess="addSuccess" :goodsNo='selectedGoodsNo'></addGood>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodList } from '@/api/goods'
import goodDetail from './goodDetail/index.vue'
import addGood from './addGood/index.vue'
import request from "@/utils/request";
export default {
  data() {
    return {
      goodTableData: [],
      filterForm: {
        searchText: '',
        placeholder1: '商品编号/商品名称/商品系列',
        page: 1,
        limit: 10,
        total: 0
      },
      currentGoodThumbnail: '',
      isEnlargeGoodThumbnailShow: false,
      isGoodDetailShow: false,
      theGoodDetail: {},
      isAddGoodShow: false,
      goodsCategoryList: {
        10: '常规',
        20: '促销',
        30: '新品'
      },
      selectedGoodsNo: undefined
    }
  },
  methods: {
    goodBlurSearch() {
      request({
        url: '/goodsInfo/list.do',
        method: 'post',
        data: this.filterForm
      }).then(res => {
        this.filterForm.total = res.data.total
        this.goodTableData = res.data.items
      })
    },
    handleSizeChange(val) {
      this.filterForm.limit = val
      this.goodBlurSearch()
    },
    handleCurrentChange(val) {
      this.filterForm.limit = val
      this.goodBlurSearch()
    },
    addGood() {
      this.selectedGoodsNo = undefined
      this.isAddGoodShow = true
    },
    enlargePic(row) {
      this.currentGoodThumbnail = row.goodsImg
      this.isEnlargeGoodThumbnailShow = true
    },
    filterHandler_goodProp(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    filterHandler_goodStatus(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    checkGoodDetail(row) {
      this.selectedGoodsNo = row.goodsNo
      this.isAddGoodShow = true
    },
    addSuccess() {
      this.isAddGoodShow = false
      this.filterForm.currentPage = 1
      this.goodBlurSearch()
    }
  },
  mounted() {
    this.goodBlurSearch()
  },
  components: {
    goodDetail,
    addGood
  }
}
</script>

<style lang="scss" scoped>
</style>
