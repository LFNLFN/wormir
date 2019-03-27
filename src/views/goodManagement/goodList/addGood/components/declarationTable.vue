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
            <el-input
              v-model.trim="declarationSetting[scope.$index].skuName"
              placeholder="依据清关文件名输入" clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="50px"><template slot-scope="scope">用途</template></el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <el-input
              v-model.trim="declarationSetting[scope.$index].use"
              placeholder="例：面部护理" clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="" width="50px"><template slot-scope="scope">包装</template></el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <el-input
              v-model.trim="declarationSetting[scope.$index].package"
              placeholder="例：支装" clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申报要素" width="50px"><template slot-scope="scope">品牌</template></el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <span>{{ declarationSetting[scope.$index].brandName || '自动显示' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDeclaration(scope.$index)" :disabled="makeUpOfGoods==1"></el-button>
            <el-button type="success" icon="el-icon-plus" size="mini" @click="addDeclaration(scope.$index)" :disabled="makeUpOfGoods==1"></el-button>
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
            <el-input v-for="item in declarationSpecification"
              v-model.trim="item.text"
              placeholder="输入相同品名构成规格，例：10ml/支；30ml/支" clearable
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="hide-head">
          <template slot-scope="scope">
            <el-input
              v-model.trim="declarationNum"
              placeholder="输入构成数量，例：3支/套" clearable
              :disabled="propertyOfSaleStatus"
            ></el-input>
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
      declarationSetting: { required: true, type: Array },
      brandChineseName: { required: true },
      declarationSpecification: { required: true },
      declarationNum: { required: true },
      specificationId: { required: true },
      specificationOptions: { required: true },
      makeUpOfGoods: { required: true },
      propertyOfSale: { required: true, type: Array },
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
      addDeclaration(index) {
        this.declarationStyleData.splice(index+1,0,{foo:'bar'})
        this.declarationSetting.splice(index+1,0,{skuName: null, use: null, package: null,  brandName: this.brandChineseName})
        this.declarationSpecification.splice(index+1,0,{text:null})
      },
      deleteDeclaration(index) {
        this.declarationStyleData.splice(index,1)
        this.declarationSetting.splice(index,1)
        this.declarationSpecification.splice(index,1)
      },
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
