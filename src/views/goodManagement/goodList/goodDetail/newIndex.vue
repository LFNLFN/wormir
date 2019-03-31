<template>
  <div class="good-detail-index-vue">
    <el-form ref="form" :model="form" label-width="150px">
      <h2>基础信息</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="商品品牌" class="border1 no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 80%;margin: 4px">
            <el-table-column align="center" label="品牌序列号">
              <template slot-scope="scope">
                <span>{{ form.brandNo || '选择后显示' }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="品牌名称（英文）">
              <template slot-scope="scope">
                <span>{{ form.brandEnglishName || '选择后显示' }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="品牌名称（中文）">
              <template slot-scope="scope">
                <span>{{ form.brandChineseName || '选择后显示' }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="商品序列号" class="form-row add-brand-row border-bottom" style="margin-bottom: 0">
          <el-row><el-col align="center"><span>{{ form.goodsNo || '系统自动生成，编号规则为：品牌序列号+生成年月日+两位顺序号（如01、02…...）' }}</span></el-col></el-row>
        </el-form-item>
        <el-form-item label="原产国/产地" prop="" class="form-row add-brand-row border-bottom" style="margin-bottom: 0">
          <el-row>
            <el-col :span="12" align="center" class="border-right" style="height: 35px"><span>{{ form.productionPlaceEnglish || '选品牌后显示英文名称' }}</span></el-col>
            <el-col :span="12" align="center" style="height: 35px"><span>{{ form.productionPlaceChinese || '选完品牌后显示中文名称' }}</span></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="商品编号" prop="" class="form-row add-brand-row">
          <span>{{ form.goodsNoForBrand }}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="" class="border1 no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 80%;margin: 4px">
            <el-table-column align="center" label="商品常规名称（英文）">
              <template slot-scope="scope">
                <el-form-item label="" prop="" style="margin-bottom: 0">
                  <span>{{ form.goodsEnglishName }}</span>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品常规名称（中文）">
              <template slot-scope="scope">
                <el-form-item label="" prop="" style="margin-bottom: 0">
                  <span>{{ form.goodsChineseName }}</span>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
          <el-table border :data="[{}]" class="no-border-right no-border-bottom" style="width: 80%;margin: 4px">
            <el-table-column align="center" label="商品赠品名称（英文）">
              <template slot-scope="scope">
                <el-form-item label="" prop="" style="margin-bottom: 0">
                  <span>{{ form.giftEnglishName }}</span>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品赠品名称（中文）">
              <template slot-scope="scope">
                <el-form-item label="" prop="" style="margin-bottom: 0">
                  <span>{{ form.giftChineseName }}</span>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="商品条形码" prop="" class="form-row add-brand-row">
          <span>{{ form.barcode }}</span>
        </el-form-item>
        <el-form-item label="商品组成" prop="" class="border1 no-border-bottom no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-radio-group v-model="form.makeUpOfGoods">
            <el-radio :label="1" v-if="form.makeUpOfGoods==1">单品</el-radio>
            <el-radio :label="2" v-if="form.makeUpOfGoods==1">套组</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <h2>商品设置</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="销售属性设置" prop="" class="border-left border-right"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-checkbox-group v-model="form.propertyOfSale" style="margin: 0 5px">
            <el-checkbox :label="1" border v-if="brandPropertyOfSale.findIndex(x => x == 1)>-1" :disabled="brandPropertyOfSale.length==1">作为一般贸易商品销售</el-checkbox>
            <el-checkbox :label="2" border v-if="brandPropertyOfSale.findIndex(x => x == 2)>-1" :disabled="brandPropertyOfSale.length==1">作为跨境贸易商品销售</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品分类设置" prop="" class="border1 no-border-top"

                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="系列名称">
              <template slot-scope="scope">
                  <span>{{ form.series }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="主品类">
              <template slot-scope="scope">
                <span>{{ form.merchandiseMainVariety }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="子品类">
              <template slot-scope="scope">
                <span>{{ form.merchandiseChildVariety }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="商品规格设置" prop="" class="border1 no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border fit
            :data="[{}]"
            class="no-border-right no-border-bottom specification-table"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="商品规格">
              <el-table-column align="center" label="中文" width="120">
                <template slot-scope="scope">
                  <span>{{form.goodsSpecification.specificationChinese}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="英文">
                <template slot-scope="scope">
                  <span>{{ form.goodsSpecification.specificationEnglish || '选择后显示' }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="容量">
              <el-table-column align="center" label="中文">
                <template slot-scope="scope">
                  <span>{{ form.goodsSpecification.capacityChinese || '选择后显示' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="英文">
                <template slot-scope="scope">
                  <span>{{ form.goodsSpecification.capacityEnglish || '选择后显示' }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="包装单位">
              <el-table-column align="center" label="中文">
                <template slot-scope="scope">
                  <span>{{ form.goodsSpecification.packageUnitChinese || '选择后显示' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="英文">
                <template slot-scope="scope">
                  <span>{{ form.goodsSpecification.packageUnitEnglish || '选择后显示' }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="商品净重">
              <template slot-scope="scope">
                <span>{{ form.netWeight }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品毛重">
              <template slot-scope="scope">
                <span>{{ form.grossWeight }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单位">
              <template slot-scope="scope">kgs</template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="清关文件设置" prop="" class="border1 no-border-top" style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border fit :data="clearanceFileData"
            class="no-border-right no-border-bottom"
            :cell-class-name="ClearanceFileClass"
            :show-header="false"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="hide-head">
              <template slot-scope="scope">
                {{ fileTitle(scope.$index+1) }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="hide-head">
              <template slot-scope="scope">
                <el-form-item label="" prop="" style="margin-bottom: 0">
                  <clearanceFileUpload
                    :scope="scope" :brandNo="form.brandNo"
                    :ingredientArr.async="form.ingredientArr"
                    :hazardArr.async="form.hazardArr"
                    :tagArr.async="form.tagArr"
                    :officialArr.async="form.officialArr"
                    :MSDSenArr.async="form.MSDSenArr"
                    :MSDSzhArr.async="form.MSDSzhArr"
                  ></clearanceFileUpload>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="hide-head">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteFile(scope.row.type)" :disabled="form.makeUpOfGoods==1"></el-button>
                <el-button type="success" icon="el-icon-plus" size="mini" @click="addFile(scope.row.type)" :disabled="form.makeUpOfGoods==1"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="申报要素表设置" prop="" class="border1 no-border-top" style="padding: 5px 0;margin-bottom: 0">
          <declarationTable
            :declarationSetting.async="form.declarationSetting" :brandChineseName.async="form.brandChineseName"
            :declarationSpecification.async="form.declarationSpecification" :declarationNum.async="form.declarationNum"
            :specificationId.async="form.specificationId" :specificationOptions.async="specificationOptions"
            :makeUpOfGoods.async="form.makeUpOfGoods" :propertyOfSale.async="form.propertyOfSale"
          ></declarationTable>
        </el-form-item>

        <el-form-item label="装箱规格设置" prop="" class="border1 no-border-top" style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="箱型编号/Carton Type">
              <template slot-scope="scope">
                  <span>{{ form.cartonNo }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="长（cm）">
              <template slot-scope="scope">
                {{ form.length }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="宽（cm）">
              <template slot-scope="scope">
                {{ form.width }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="高（cm）">
              <template slot-scope="scope">
                {{ form.height }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="箱重（kgs）">
              <template slot-scope="scope">
                {{ form.weight }}
              </template>
            </el-table-column>
          </el-table>
          <el-form-item label="" prop="" style="margin-bottom: 0">
            <packageSpecificationTable
              :packageSpecificationData.async="form.packageSpecificationData"></packageSpecificationTable>
          </el-form-item>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  import clearanceFileUpload from './components/clearanceFileUpload.vue'
  import declarationTable from './components/declarationTable.vue'
  import packageSpecificationTable from './components/packageSpecificationTable.vue'
  export default {
    props: {
      theGoodDetail: { required: true, type: Object,  },
    },
    data() {
      return {
        form: {},
        brandPropertyOfSale: [],
        specificationOptions: [],
        clearanceFileData: [
          {type: 1},{type: 2},{type: 3},{type: 4},{type: 5},{type: 6},
        ],
      }
    },
    created() {
      this.form = this.theGoodDetail
      // 获取品牌的销售属性以限制商品销售属性的选择范围
      this.$request({
        url: '/brand/getBrandPropertyOfSale.do',
        method: 'post',
        data: { brandNo: this.form.brandNo }
      }).then((res) => {
        let arr = res.data.item.discountTargetObj.split(',')
        arr.forEach((item,index,arr) => {
          arr[index] = Number(item)
        })
        this.form.propertyOfSale = arr
        this.brandPropertyOfSale = arr
      })
      // 获取包装规格id
      this.$request({
        url: '/goods/getGoodsSpecification.do',
        method: "post",
        data: { id: this.form.specificationId }
      }).then( res => {
        if (res.errorCode==0) {
          this.form.goodsSpecification = res.data.items
        }
      })

      this.$request({
        url: '/goods/getBrandGoodsSpecification.do',
        method: "post",
        data: { brandNo: this.form.brandNo }
      }).then( res => {
        if (res.errorCode==0) {
          this.specificationOptions = res.data.items
        }
      })
    },
    methods: {
      fileTitle(index) {
        switch (index) {
          case 1:
            return '成分配比表'
          case 2:
            return '危害识别表'
          case 3:
            return '标签文件'
          case 4:
            return '化妆品备案批文'
          case 5:
            return 'MSDS（英文）'
          case 6:
            return 'MSDS（中文）'
        }
      },
      ClearanceFileClass({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 0) {
          return 'fake-table-head'
        }
      },
    },
    components: {clearanceFileUpload, declarationTable,packageSpecificationTable}
  }
</script>

<style lang="scss" scoped>

</style>
