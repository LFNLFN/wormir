<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="filterForm.goodSearchingMsg1" :placeholder="filterForm.placeholder1" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" icon="el-icon-search" @click="goodBlurSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              icon="el-icon-plus"
              @click="addGood()">新增商品
            </el-button>
          </el-form-item>
        </el-form>
    <el-table
      border
      :data="goodTableData"
      style="width: 100%">
      <el-table-column
        fixed="left"
        prop="goodThumbnailSrc"
        label="缩略图-点击放大"
        width="80"
        align="center">
        <template slot-scope="scope">
          <img :src="scope.row.goodThumbnailSrc" alt="点击放大" width="50" height="30" @click="enlargePic(scope.row)">
        </template>
      </el-table-column>
      <el-table-column
        prop="goodID"
        label="商品序列号"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodBrand"
        label="商品品牌"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodProp"
        label="商品属性"
        width="100"
        :filters="[{ text: '常规', value: '常规' }, { text: '促销', value: '促销' }, { text: '新品', value: '新品' }]"
        :filter-method="filterHandler_goodProp"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mainCategory"
        label="主品类"
        align="center">
      </el-table-column>
      <el-table-column
        prop="subCategory"
        label="子品类"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodSeries"
        label="商品系列"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodNo"
        label="商品编号"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodName_ZH"
        label="商品名称-中文"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodName_EN"
        label="商品名称-英文"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodStatus"
        label="商品状态"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodPrice"
        label="商品售价"
        align="center">
      </el-table-column>
      <el-table-column
        prop="minDiscount"
        label="起订折扣"
        align="center">
      </el-table-column>
      <el-table-column
        prop="checkInTime"
        label="录入时间"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="checkGoodDetail(scope.row)">查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="isEnlargeGoodThumbnailShow" width="70%" @close="isEnlargeGoodThumbnailShow = false" title="商品图片" append-to-body>
      <img :src="currentGoodThumbnail" alt="">
    </el-dialog>
    <el-dialog :visible.sync="isGoodDetailShow" width="70%" @close="isGoodDetailShow = false" title="品牌商品详情" append-to-body>
      <goodDetail :theGoodDetail="theGoodDetail"></goodDetail>
    </el-dialog>
    <el-dialog :visible.sync="isAddGoodShow" width="70%" @close="isAddGoodShow = false" title="添加品牌商品" append-to-body>
      <addGood></addGood>
    </el-dialog>
  </div>
</template>

<script>
  import { getGoodList } from '@/api/goods'
  import goodDetail from './goodDetail.vue'
  import addGood from './addGood/index.vue'
  export default {
    data() {
      return {
        goodTableData: [],
        filterForm: {
          goodSearchingMsg1: '',
          placeholder1: '商品编号/商品名称/商品系列'
        },
        currentGoodThumbnail: '',
        isEnlargeGoodThumbnailShow: false,
        isGoodDetailShow: false,
        theGoodDetail: {},
        isAddGoodShow: false
      }
    },
    methods: {
      goodBlurSearch() {
        getGoodList(this.filterForm.brandMsg1)
          .then((res) => {
            this.goodTableData = res.data.items
            this.filterForm.total = this.goodTableData.length
          })
        // .catch(() => { this.$message.error('表格加载失败') })
      },
      addGood() {
        this.isAddGoodShow = true
      },
      enlargePic(row) {
        this.currentGoodThumbnail = row.goodThumbnailSrc
        this.isEnlargeGoodThumbnailShow = true
      },
      filterHandler_goodProp(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      checkGoodDetail(row) {
        this.isGoodDetailShow = true
        this.theGoodDetail = row
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
