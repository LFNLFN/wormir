<template>
  <div>
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label>
        <el-input
          v-model="filterForm.goodSearchingMsg1"
          style="width: 250px"
          placeholder="商品序列号/商品名称/商品系列"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="goodBlurSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- border-top2 border-left2 border-right1 border-width: 2px;border-right-width: 1px-->
    <el-table
      border v-loading="listLoading"
      :data="goodTableData"
      style="width: 100%;"
      class="table_border"
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
      <el-table-column prop="goodsNo" min-width="150" label="商品序列号" align="center"></el-table-column>
      <el-table-column  label="商品品牌" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ brandName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsNoForBrand" width="100" label="商品编号" align="center"></el-table-column>
      <el-table-column
        prop="goodsEnglishName"
        width="120"
        label="商品名称-英文"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="goodsChineseName"
        width="120"
        label="商品名称-中文"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="商品组成" width="100" align="center" :filters="[{ text: '单品', value: 1 }, { text: '套组', value: 2 }]"
                       :filter-method="filterHandler"  prop="makeUpOfGoods">
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
      <!--<el-table-column prop="goodPrice" label="商品售价" width="100" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>￥ {{ scope.row.unitPrice }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="initialDiscount" label="起订折扣" width="100" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.initialDiscount }}%</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="checkInTime"
        label="录入时间"
        min-width="120"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editGood(scope.row)">{{ scope.row.waitForReview==1&&userLevel==1? '审核' : '编辑' }}</el-button>
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
import editGood from './editGoodNew.vue'
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
        1: '常规',
        2: '促销',
        3: '新品'
      },
      selectedGoodsNo: undefined,
      listLoading: false,
      userLevel: JSON.parse(window.localStorage.userData).userLevel,
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      request({
        url: '/brand/goodList.do',
        method: 'post',
        data: this.filterForm
      }).then(res => {
        console.log(res)
        if(res.code!=-1){
          this.goodTableData = res.data.items
          this.filterForm.total = res.data.total
        }
        this.listLoading = false
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
    goodBlurSearch() {
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
