<template>
  <div>
    <el-table
      border fit
      :data="packageSpecificationData"
      class="no-border-right no-border-bottom"
      style="width: 95%;margin: 4px">
      <el-table-column align="center" label="装箱规格">
        <el-table-column align="center" label="中文" width="200">
          <template slot-scope="scope">
            <el-input v-model.trim="packageSpecificationData[scope.$index].packageSpecificationZh" placeholder="例：24支/箱"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="英文">
          <template slot-scope="scope">
            <el-input v-model.trim="packageSpecificationData[scope.$index].packageSpecificationEn" placeholder="例：24pcs"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="商品数量">
        <template slot-scope="scope">
          <el-input v-model.trim="packageSpecificationData[scope.$index].goodsNum" placeholder="输入整数"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="装箱单位">
        <el-table-column align="center" label="中文">
          <template slot-scope="scope">
            <el-input v-model.trim="packageSpecificationData[scope.$index].packageUnitZh" placeholder="例：支/箱"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="英文">
          <template slot-scope="scope">
            <el-input v-model.trim="packageSpecificationData[scope.$index].packageUnitEn" placeholder="例：pcs"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="并箱单位">
        <el-table-column align="center" label="中文">
          <template slot-scope="scope">{{ scope.row.mergeCartonUnit }}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="箱数单位">
        <el-table-column align="center" label="中文">
          <template slot-scope="scope">
            <el-input v-model.trim="packageSpecificationData[scope.$index].cartonNumUnitZh" placeholder="例：箱"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="英文">
          <template slot-scope="scope">
            <el-input v-model.trim="packageSpecificationData[scope.$index].cartonNumUnitEn" placeholder="例：units"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletePackageSpecification(scope.$index)"></el-button>
          </div>
          <div style="margin: 3px 0">
            <el-button type="success" icon="el-icon-plus" size="mini" @click="addPackageSpecification(scope.$index)"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      packageSpecificationData: { required: true, type: Array },
    },
    methods: {
      deletePackageSpecification(index) {
        if (this.packageSpecificationData.length==1) { return false }
        this.packageSpecificationData.splice(index,1)
      },
      addPackageSpecification(index) {
        this.packageSpecificationData.splice(index,0,{
          packageSpecificationZh: null,
          packageSpecificationEn: null,
          goodsNum: 0,
          packageUnitZh: null,
          packageUnitEn: null,
          mergeCartonUnit: '个/箱',
          cartonNumUnitZh: null,
          cartonNumUnitEn: null,
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
