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
            <span>{{ packageSpecificationData[scope.$index].packageSpecificationZh }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="英文">
          <template slot-scope="scope">
            <span>{{ packageSpecificationData[scope.$index].packageSpecificationEn }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="商品数量">
        <template slot-scope="scope">
          <span>{{ packageSpecificationData[scope.$index].goodsNum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="装箱单位">
        <el-table-column align="center" label="中文">
          <template slot-scope="scope">
            <span>{{ packageSpecificationData[scope.$index].packageUnitZh }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="英文">
          <template slot-scope="scope">
            <span>{{ packageSpecificationData[scope.$index].packageUnitEn }}</span>
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
            <span>{{ packageSpecificationData[scope.$index].cartonNumUnitZh }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="英文">
          <template slot-scope="scope">
            <span>{{ packageSpecificationData[scope.$index].cartonNumUnitEn }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      packageSpecificationData: { required: true, },
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>

</style>
