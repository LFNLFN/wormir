<template>
  <div>
    <el-form :inline="true" :model="filterForm" class="demo-form-inline" style="margin: 1em">
      <el-form-item label="">
        <el-input v-model="filterForm.goodSearchingMsg1" :placeholder="filterForm.placeholder1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="el-icon-search" @click="goodBlurSearch">查询</el-button>
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
        align="center">
        <template slot-scope="scope">
          <img :src="scope.row.goodThumbnailSrc" alt="点击放大" width="50" height="30" @click="enlargePic(scope.row)">
        </template>
      </el-table-column>
      <el-table-column
        prop="goodID"
        label="商品序列号"
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
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodName_ZH"
        label="商品名称-中文"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodName_EN"
        label="商品名称-英文"
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
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editGood(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="isEnlargeGoodThumbnailShow" width="70%" @close="isEnlargeGoodThumbnailShow = false" title="商品图片" append-to-body>
      <img :src="currentGoodThumbnail" alt="">
    </el-dialog>
    <el-dialog :visible.sync="isEditGoodShow" width="70%" @close="isEditGoodShow = false" title="编辑品牌商品" append-to-body>
      <editGood :editGoodDetail="editGoodDetail"></editGood>
    </el-dialog>
  </div>
</template>

<script>
  import editGood from './editGood'
  export default {
    props: {
      goodTableData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        filterForm: {
          goodSearchingMsg1: '',
          placeholder1: '商品编号/商品名称/商品系列'
        },
        currentGoodThumbnail: '',
        isEnlargeGoodThumbnailShow: false,
        isEditGoodShow: false,
        editGoodDetail: {}
      }
    },
    methods: {
      goodBlurSearch() {},
      enlargePic(row) {
        this.currentGoodThumbnail = row.goodThumbnailSrc
        this.isEnlargeGoodThumbnailShow = true
      },
      editGood(row) {
        this.isEditGoodShow = true
        this.editGoodDetail = row
      }
    },
    components: {
      editGood
    }
  }
</script>

<style lang="scss" scoped>

</style>
