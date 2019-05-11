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
      border fit
      v-loading="listLoading" element-loading-text="给我一点时间"
      :data="goodTableData"
      style="width: 100%;border-top: 2px solid #D5D5D5;border-left: 2px solid #D5D5D5"
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
      <el-table-column prop="goodsNo" label="商品序列号" min-width="150" align="center"></el-table-column>
      <el-table-column prop="brandEnglishName" label="商品品牌" min-width="120" align="center"></el-table-column>
      <el-table-column prop="goodsNoForBrand" label="商品编号" width="100" align="center"></el-table-column>
      <el-table-column
        prop="goodsEnglishName"
        label="商品名称-英文"
        width="180"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="goodsChineseName"
        label="商品名称-中文"
        width="180"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="商品组成" width="100" align="center" :filters="[{ text: '单品', value: 1 }, { text: '套组', value: 2 }]"
                       :filter-method="filterHandler" prop="makeUpOfGoods">
        <template slot-scope="scope">
          <span>{{ scope.row.makeUpOfGoods | makeUpOfGoodsFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="series" label="商品系列" min-width="110" align="center"></el-table-column>
      <el-table-column prop="merchandiseMainVariety" label="主品类" min-width="90" align="center"></el-table-column>
      <el-table-column prop="merchandiseChildVariety" label="子品类" min-width="90" align="center"></el-table-column>
      <el-table-column label="商品属性" width="100" align="center" :filters="[{ text: '新品', value: 1 }, { text: '常规', value: 2 }, { text: '促销', value: 3 }]"
                       :filter-method="filterHandler" prop="propertyOfGoods">
        <template slot-scope="scope">
          <span>{{scope.row.propertyOfGoods | propertyOfGoodsFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sublicense"
        label="商品授权"
        min-width="120"
        :filters="[{ text: '转授权', value: 1 }, { text: '非转授权', value: 2 }]"
        :filter-method="filterHandler"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sublicense | sublicenseFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110" label="商品状态" align="center" prop="goodStatus" :filters="[{ text: '正常销售', value: 1 }, { text: '停止销售', value: 2 }]" :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.goodStatus | goodsStatusFilter }}</span>
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
        <img :src="currentGoodThumbnail" alt class="normal-size-pic">
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="isGoodDetailShow"
      width="95%"
      @close="isGoodDetailShow = false"
      title="品牌商品详情"
    >
      <goodDetail v-if="isGoodDetailShow" :goodsNo="currentGood.goodsNo"></goodDetail>
    </el-dialog>
    <el-dialog
      :visible.sync="isAddGoodShow"
      width="95%"
      @close="isAddGoodShow = false" :before-close="addDialogBeforeClose"
      title="添加品牌商品"
      append-to-body
    >
      <addGood v-if="isAddGoodShow" @submitSuccess="addSuccess" :goodsNo='selectedGoodsNo' @temporary-save="temporarySave($event)" @submitSuccesss="submitSuccessAction"></addGood>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodList } from '@/api/goods'
//import goodDetail from './goodDetail/index.vue'
import goodDetail from './addGood/editIndex.vue'
//import addGood from './addGood/index.vue'
import addGood from './addGood/newIndex.vue'
import request from "@/utils/request"
import { propertyOfGoodsFilter,goodsStatusFilter } from "@/filters/index.js"
export default {
  data() {
    return {
      listLoading: false,
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
      isAddGoodShow: false,
      goodsCategoryList: {
        1: '新品',
        2: '常规',
        3: '促销',
      },
      selectedGoodsNo: undefined,
      isTemporarySave: false,
      currentGood: null
    }
  },
  methods: {
    goodBlurSearch() {
       this.listLoading = true
      request({
        url: '/goodsInfo/list.do',
        method: 'post',
        data: this.filterForm
      }).then(res => {
        this.filterForm.total = res.data.total
        this.goodTableData = res.data.items
        this.listLoading = false
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
      this.currentGood = row
      this.isGoodDetailShow = true
    },
    addSuccess() {
      this.isAddGoodShow = false
      this.filterForm.currentPage = 1
      this.goodBlurSearch()
    },
    addDialogBeforeClose(done) {
//      this.$confirm('是否暂存已填写信息?', '提示', {
//        confirmButtonText: '确定',
//        cancelButtonText: '取消',
//        type: 'warning'
//      }).then(() => {this.isTemporarySave=true;done()}).catch(() => {this.isTemporarySave=false;done()});
      done()
    },
    submitSuccessAction() {
      this.isAddGoodShow = false
      this.goodBlurSearch()
    },
    temporarySave(form) {
      if (!this.isTemporarySave) return false
      this.$request({
        url: '/user/temporarySaveAddingGoodsMsg.do',
        method: 'post',
        data: {addingGoodsMsg: JSON.stringify(form), id:1}
      }).then(() => { this.$message.success("暂存成功") })
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
  },
  mounted() {
    this.goodBlurSearch()
  },
  components: {
    goodDetail,
    addGood
  },
  filters: {
    propertyOfGoodsFilter,goodsStatusFilter
  }
}
</script>

<style lang="scss" scoped>

</style>
