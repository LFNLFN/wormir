<template>
  <div>
    <div style="width: 100%; float: left">
      <el-table :data="brandList" border fit highlight-current-row
                v-loading="brandListLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%"
                class="border-top2 border-left2 no-border-bottom">
        <el-table-column align="center" label="品牌序列号" prop="brandNo"/>
        <el-table-column align="center" label="品牌名称（中文）" prop="brandChineseName"/>
        <el-table-column align="center" label="品牌名称（英文）" prop="brandEnglishName"/>
        <el-table-column align="center" label="商品名称（中文）" prop="goodsChineseName"/>
      </el-table>
      <div style="width: 100%; float: left" class="border-right2">
        <el-table :data="list" border fit highlight-current-row
                  v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini"
                  style="width: 50%; float: left"
                  class="no-border-top border-left2 no-border-right no-border-bottom last-tr0">
          <el-table-column align="center" :label="$t('product.productCode')" prop="goodsNo"/>
          <el-table-column align="center" :label="$t('product.productName')" prop="brandEnglishName"/>
          <el-table-column align="center" label="商品规格" prop="goodsSpecificationEnglish"/>
        </el-table>
        <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 400px;" class="filter-item"
                    placeholder="商品码/箱码/订货单号/操作账号"
                    v-model="listQuery.keyword">
          </el-input>
          <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
            {{$t('table.search')}}
          </el-button>
        </div>
      </div>
    </div>
    <el-table :data="packingDetailList" border fit highlight-current-row
              v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%"
              class="border-left2">
      <el-table-column min-width="110" align="center" label="商品码" prop="productCode"/>
      <el-table-column min-width="100" align="center" label="混箱状态" prop="packingStatus"/>
      <el-table-column min-width="110" align="center" label="箱码" prop="boxCode"/>
      <el-table-column min-width="100" align="center" label="箱型编号" prop="cartonType"/>
      <el-table-column min-width="120" align="center" label="装箱时间" prop="packingTime"/>
      <el-table-column min-width="120" align="center" label="操作账号" prop="operationID"/>
      <el-table-column min-width="100" align="center" label="库存状态" prop="inventoryStatus"/>
      <el-table-column min-width="120" align="center" label="出库的订货单号" prop="outboundOrderNo"/>
      <el-table-column min-width="100" align="center" :label="$t('order.operation')" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="reviewDetail(scope.row.productCode)">
            {{$t('order.reviewDetail')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="isDialogDetailShow" append-to-body width="80%" title="过往装箱记录">
      <el-table :data="productCodeDetailList" border fit highlight-current-row
                v-loading="listLoading" element-loading-text="给我一点时间" stripe size="mini" style="width: 100%"
                class="border-top2 border-left2 border-right2">
        <el-table-column min-width="150" align="center" label="商品码" prop="productCode"/>
        <el-table-column min-width="110" align="center" label="装箱状态" prop="packingStatus"/>
        <el-table-column min-width="120" align="center" label="箱码" prop="boxCode"/>
        <el-table-column min-width="100" align="center" label="箱型编号" prop="cartonType"/>
        <el-table-column min-width="150" align="center" label="装箱时间" prop="packingTime"/>
        <el-table-column min-width="120" align="center" label="操作账号" prop="operationID"/>
        <el-table-column min-width="110" align="center" label="库存状态" prop="inventoryStatus"/>
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
      this.brandList[0] = this.product
    },
    data() {
      return {
        brandList: [],
        list: [],
        packingDetailList: [
          {
            productCode: 'abc1234567',
            packingStatus: '混合装箱',
            boxCode: '12345678',
            cartonType: '30',
            packingTime: '2018-08-02 06:00:00',
            operationID: 'abc1234',
            inventoryStatus: '待出库',
            outboundOrderNo: 'abc11111111111'
          },
          {
            productCode: 'abc1234567',
            packingStatus: '首次装箱',
            boxCode: '12311111',
            cartonType: '20',
            packingTime: '2018-08-02 06:00:00',
            operationID: 'abc1234',
            inventoryStatus: '已出库',
            outboundOrderNo: 'abc1123232321111'
          }
        ],
        productCodeDetailList: [
          {
            productCode: 'abc1234567',
            packingStatus: '混合装箱',
            boxCode: '12345678',
            cartonType: '30',
            packingTime: '2018-08-02 06:00:00',
            operationID: 'abc1234',
            inventoryStatus: '待出库'
          },
          {
            productCode: 'abc1234567',
            packingStatus: '首次装箱',
            boxCode: '12311111',
            cartonType: '20',
            packingTime: '2018-08-02 06:00:00',
            operationID: 'abc1234',
            inventoryStatus: '已出库'
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

