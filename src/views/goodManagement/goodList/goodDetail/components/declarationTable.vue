<template>
  <div>
    <el-table
      :header-cell-style="headerCellStyle"
      border fit :data="declarationStyleData"
      class="no-border-right no-border-bottom"
      style="width: 95%;margin: 4px">
      <el-table-column align="center" label="申报要素">
        <el-table-column align="center" label="" width="50px"><template slot-scope="scope">品名</template></el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <span>{{ scope.$index && declarationSetting[scope.$index].skuName || '暂无数据' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="50px"><template slot-scope="scope">用途</template></el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <span>{{ scope.$index && declarationSetting[scope.$index].use || '暂无数据' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="50px"><template slot-scope="scope">包装</template></el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <span>{{ scope.$index && declarationSetting[scope.$index].package || '暂无数据' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申报要素" width="50px"><template slot-scope="scope">品牌</template></el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <span>{{ scope.$index && declarationSetting[scope.$index].brandName || '自动显示' }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table
      :header-cell-style="headerCellStyle"
      border fit :data="[{}]"
      class="no-border-right no-border-bottom"
      style="width: 95%;margin: 4px">
        <el-table-column align="center" label="品牌类型">
          <template slot-scope="scope">
            境外品牌
          </template>
        </el-table-column>
      <el-table-column align="center" label="包装规格">
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <span v-for="item in declarationSpecification">{{item.text}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <span>{{ declarationNum || '自动显示' }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="商品规格" v-if="!propertyOfSaleStatus">
        <template slot-scope="scope">
          {{ getSpecification() }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      declarationSetting: { required: true },
      brandChineseName: { required: true },
      declarationSpecification: { required: true },
      declarationNum: { required: true },
      specificationId: { required: true },
      specificationOptions: { required: true },
      makeUpOfGoods: { required: true },
      propertyOfSale: { required: true },
    },
    data() {
      return {
        declarationStyleData: [{foo:'bar'}]
      }
    },
    computed: {
      propertyOfSaleStatus() {
        return this.propertyOfSale.length==1 && this.propertyOfSale.findIndex(x => x == 1)==0
      }
    },
    methods: {
      headerCellStyle({row, column, rowIndex, columnIndex}) {
        if (rowIndex>0) {
            return { display: 'none' }
        }
      },
      getSpecification() {
        let specificationName = null
        this.specificationOptions.some(item => {
          if (item.tableId == this.specificationId) {
            specificationName = item.specificationChinese
          }
        })
        return specificationName || '自动显示'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
