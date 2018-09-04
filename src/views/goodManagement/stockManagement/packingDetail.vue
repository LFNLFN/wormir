<template>
  <div>
    <div style="width: 100%; float: left" >
    <el-table :data="brandList" border fit highlight-current-row
        v-loading="brandListLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
      <el-table-column align="center" label="品牌名称（中文）" prop="brandChineseName" />
      <el-table-column align="center" label="品牌名称（英文）" prop="brandEnglishName" />
      <el-table-column align="center" label="商品名称（中文）" prop="goodsChineseName" />
    </el-table>
    <el-table :data="list" border fit highlight-current-row
        v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 50%; float: left" >
      <el-table-column align="center" :label="$t('product.productCode')" prop="goodsNo"/>
      <el-table-column align="center" :label="$t('product.productName')" prop="englishName" />
      <el-table-column align="center" :label="$t('product.size')" prop="capacityEnglish" />
    </el-table>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item" :placeholder="$t('product.packingDetailSearch')"
                v-model="listQuery.keyword">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>
    </div>
    <el-table :data="packingDetailList" border fit highlight-current-row 
      v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
      <el-table-column align="center" :label="$t('product.productCodeAll')" prop="productCode"/>
      <el-table-column align="center" :label="$t('product.packingStatus')" prop="packingStatus"/>
      <el-table-column align="center" :label="$t('product.boxCode')" prop="boxCode"/>
      <el-table-column align="center" :label="$t('order.cartonType')" prop="cartonType"/>
      <el-table-column align="center" :label="$t('product.packingTime')" prop="packingTime"/>
      <el-table-column align="center" :label="$t('product.operationID')" prop="operationID"/>
      <el-table-column align="center" :label="$t('product.inventoryStatus')" prop="inventoryStatus"/>
      <el-table-column align="center" :label="$t('product.outboundOrderNo')" prop="outboundOrderNo"/>
      <el-table-column align="center" :label="$t('order.operation')" class-name="small-padding" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="reviewDetail(scope.row.productCode)">{{$t('order.reviewDetail')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="isDialogDetailShow" append-to-body>
      <el-table :data="productCodeDetailList" border fit highlight-current-row 
      v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%" >
        <el-table-column align="center" :label="$t('product.productCode')" prop="productCode"/>
        <el-table-column align="center" :label="$t('product.packingStatus')" prop="packingStatus"/>
        <el-table-column align="center" :label="$t('product.boxCode')" prop="boxCode"/>
        <el-table-column align="center" :label="$t('order.cartonType')" prop="cartonType"/>
        <el-table-column align="center" :label="$t('product.packingTime')" prop="packingTime"/>
        <el-table-column align="center" :label="$t('product.operationID')" prop="operationID"/>
        <el-table-column align="center" :label="$t('product.inventoryStatus')" prop="inventoryStatus"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'packingDetail',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  directives: {
    waves
  },
  created() {
    this.list[0] = this.product
  },
  data() {
    return {
      brandList: [],
      list: [],
      packingDetailList: [
        {
          productCode: 'abc1234567',
          packingStatus: this.$t('product.mixPackage'),
          boxCode: '12345678',
          cartonType: '30',
          packingTime: '2018-08-02 06:00:00',
          operationID: 'abc1234',
          inventoryStatus: this.$t('product.pendingOutbound'),
          outboundOrderNo: 'abc11111111111'
        },
        {
          productCode: 'abc1234567',
          packingStatus: this.$t('product.initialPackage'),
          boxCode: '12311111',
          cartonType: '20',
          packingTime: '2018-08-02 06:00:00',
          operationID: 'abc1234',
          inventoryStatus: this.$t('product.outbound'),
          outboundOrderNo: 'abc1123232321111'
        }
      ],
      productCodeDetailList: [
        {
          productCode: 'abc1234567',
          packingStatus: this.$t('product.mixPackage'),
          boxCode: '12345678',
          cartonType: '30',
          packingTime: '2018-08-02 06:00:00',
          operationID: 'abc1234',
          inventoryStatus: this.$t('product.pendingOutbound')
        },
        {
          productCode: 'abc1234567',
          packingStatus: this.$t('product.initialPackage'),
          boxCode: '12311111',
          cartonType: '20',
          packingTime: '2018-08-02 06:00:00',
          operationID: 'abc1234',
          inventoryStatus: this.$t('product.outbound')
        }
      ],
      listQuery: {
        keyword: ''
      },
      listLoading: false,
      brandListLoading: false,
      isDialogDetailShow: false
    }
  },
  methods: {
    handleFilter() {
    },
    reviewDetail(brandSerialNumber) {
      this.isDialogDetailShow = true
      this.currentBrandSerialNumber = brandSerialNumber
    }
  }
}
</script>
<style>
  .el-table .cell {
    word-break: break-word;
  }
  .filter-container {
    width: 50%;
    float: left;
    padding-left: 3%;
    padding-top: 1%;
  }
  .empty-table .el-table__body-wrapper {
    display: none;
  }
</style>

