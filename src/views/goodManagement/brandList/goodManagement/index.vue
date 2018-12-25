<template>
  <div>
    <el-form :inline="true" :model="filterForm" class="demo-form-inline" style="margin: 1em">
      <el-form-item label>
        <el-input
          v-model="filterForm.goodSearchingMsg1"
          style="width: 250px"
          placeholder="商品编号/商品名称/商品系列"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="goodBlurSearch">查询</el-button>
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
        prop="goodThumbnailSrc"
        label="缩略图-点击放大"
        min-width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span class="link-type">
            <img
              :src="scope.row.goodsImg"
              alt="点击放大"
              width="50"
              height="50"
              @click="enlargePic(scope.row)"
            >
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsSerialNo" min-width="150" label="商品序列号" align="center"></el-table-column>
      <el-table-column  label="商品品牌" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ brandName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品属性" width="100" align="center">
        <template slot-scope="scope">
          <span>{{goodsCategoryList[scope.row.goodsCategory]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchandiseMainVariety" label="主品类" min-width="90" align="center"></el-table-column>
      <el-table-column prop="merchandiseChildVariety" label="子品类" min-width="90" align="center"></el-table-column>
      <el-table-column prop="series" label="商品系列" min-width="110" align="center"></el-table-column>
      <el-table-column prop="goodsNo" width="100" label="商品编号" align="center"></el-table-column>
      <el-table-column
        prop="goodsChineseName"
        width="120"
        label="商品名称-中文"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="goodsEnglishName"
        width="120"
        label="商品名称-英文"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <!-- <el-table-column
        prop="goodStatus"
        width="110"
        label="商品状态"
        :filters="[{ text: '待审核', value: '待审核' }, { text: '正常供货', value: '正常供货' }, { text: '停止供货', value: '停止供货' }]"
        :filter-method="filterHandler"
        align="center"
      ></el-table-column>-->
      <el-table-column width="110" label="商品状态" align="center">
        <template slot-scope="scope">
          <span>正常销售</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodPrice" label="商品售价" width="100" align="center">
        <template slot-scope="scope">
          <span>￥ {{ scope.row.unitPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="initialDiscount" label="起订折扣" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.initialDiscount }}%</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="checkInTime"
        label="录入时间"
        min-width="120"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editGood(scope.row)">编辑</el-button>
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
      <img :src="currentGoodThumbnail" alt>
    </el-dialog>
    <el-dialog
      :visible.sync="isEditGoodShow"
      width="90%"
      @close="isEditGoodShow = false"
      title="编辑品牌商品"
      append-to-body
    >
      <editGood
        v-if="isEditGoodShow"
        @submitSuccess="editSuccess"
        :goodsNo='selectedGoodsNo'
      ></editGood>
    </el-dialog>
  </div>
</template>

<script>
import editGood from '../../goodList/addGood/index'
import request from '@/utils/request'
export default {
  props: ['brandNo', 'brandName'],
  data() {
    return {
      goodTableData: [],
      filterForm: {
        searchText: '',
        page: 1,
        limit: 10,
        total: 0,
        brandNo: ''
      },
      currentGoodThumbnail: '',
      isEnlargeGoodThumbnailShow: false,
      isEditGoodShow: false,
      editGoodDetail: {},
      goodsCategoryList: {
        10: '常规',
        20: '促销',
        30: '新品'
      },
      selectedGoodsNo: undefined
    }
  },
  methods: {
    getList() {
      request({
        url: '/brand/goodList.do',
        method: 'post',
        data: this.filterForm
      }).then(res => {
        this.goodTableData = res.data.items
        this.filterForm.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.filterForm.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.filterForm.limit = val
      this.getList()
    },
    editGood(row) {
      this.selectedGoodsNo = row.goodsNo
      this.isEditGoodShow = true
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    goodBlurSearch(val) {
      this.filterForm.searchText = val
      this.getList()
    },
    editSuccess() {
      this.isEditGoodShow = false
      this.filterForm.page = 1
      this.getList()
    }
  },
  created() {
    if (this.brandNo) {
      this.filterForm.brandNo = this.brandNo
      this.getList()
    }

  },
  components: {
    editGood
  }
}
</script>

<style lang="scss" scoped>
</style>
