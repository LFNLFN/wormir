<template>
  <div class="add-good-index-vue">
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <h2>基础信息</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="商品品牌" prop="brandMsg" class="border1 no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            v-loading="brandNoLoading"
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
                <el-select
                  v-model="form.brandMsg[0].brandEnglishName"
                  @change="brandEnglishNameChange"
                  placeholder="请选择品牌"
                >
                  <el-option
                    v-for="(item,index) in brandOptions"
                    :key="item.index"
                    :label="item.englishName"
                    :value="item.brandNo">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="品牌名称（中文）">
              <template slot-scope="scope">
                <span>{{ form.brandChineseName || '选择后显示' }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="商品序列号" prop="" class="form-row add-brand-row border-bottom">
          <el-row><el-col align="center"><span>{{ form.goodsNo || '系统自动生成，编号规则为：品牌序列号+生成年月日+两位顺序号（如01、02…...）' }}</span></el-col></el-row>
        </el-form-item>
        <el-form-item label="原产国/产地" prop="" class="form-row add-brand-row border-bottom">
          <el-row>
            <el-col :span="12" align="center" class="border-right" style="height: 35px"><span>{{ form.productionPlaceEnglish || '选品牌后显示英文名称' }}</span></el-col>
            <el-col :span="12" align="center" style="height: 35px"><span>{{ form.productionPlaceChinese || '选完品牌后显示中文名称' }}</span></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="商品编号" prop="goodsNoForBrand" class="form-row add-brand-row">
          <el-input v-model.trim="form.goodsNoForBrand" placeholder="输入品牌商使用的商品编号"></el-input>
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
                <el-form-item label="" prop="goodName_EN" style="margin-bottom: 0">
                  <el-input v-model.trim="form.goodName_EN" placeholder="输入商品英文名称"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品常规名称（中文）">
              <template slot-scope="scope">
                <el-form-item label="" prop="goodName_ZH" style="margin-bottom: 0">
                  <el-input v-model.trim="form.goodName_ZH" placeholder="输入商品中文名称"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
          <el-table border :data="[{}]" class="no-border-right no-border-bottom" style="width: 80%;margin: 4px">
            <el-table-column align="center" label="商品赠品名称（英文）">
              <template slot-scope="scope">
                <el-form-item label="" prop="giftEnglishName" style="margin-bottom: 0">
                  <el-input v-model.trim="form.giftEnglishName" placeholder="输入商品赠品英文名称"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品赠品名称（中文）">
              <template slot-scope="scope">
                <el-form-item label="" prop="giftChineseName" style="margin-bottom: 0">
                  <el-input v-model.trim="form.giftChineseName" placeholder="输入商品赠品中文名称"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="商品条形码" prop="barcode" class="form-row add-brand-row">
          <el-input v-model.trim="form.barcode" placeholder="输入商品条形码（Bar Code）"></el-input>
        </el-form-item>
        <el-form-item label="商品组成" prop="" class="border1 no-border-bottom no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-radio-group v-model="form.makeUpOfGoods">
            <el-radio :label="1">单品</el-radio>
            <el-radio :label="2">套组</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <h2>商品设置</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="销售属性设置" prop="propertyOfSale" class="border-left border-right"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-checkbox-group v-model="form.propertyOfSale" style="margin: 0 5px">
            <el-checkbox :label="1" border v-if="brandPropertyOfSale.findIndex(x => x == 1)>-1" :disabled="brandPropertyOfSale.length==1">作为一般贸易商品销售</el-checkbox>
            <el-checkbox :label="2" border v-if="brandPropertyOfSale.findIndex(x => x == 2)>-1" :disabled="brandPropertyOfSale.length==1">作为跨境贸易商品销售</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品分类设置" prop="" class="border1 no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            v-loading="brandNoLoading"
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="系列名称">
              <template slot-scope="scope">
                <el-form-item label="" prop="seriesName" style="margin-bottom: 0">
                  <el-select v-model="seriesName" placeholder="选择系列" @change="seriesChange">
                    <el-option
                      v-for="(item,index) in seriesOptions"
                      :key="item.index"
                      :label="item.seriesName"
                      :value="item.seriesName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="主品类">
              <template slot-scope="scope">
                <el-form-item label="" prop="mainCategoryName" style="margin-bottom: 0">
                  <el-select
                    v-model="mainCategoryName"
                    placeholder="选择主品类 "
                    @change="mainCategoryNameChange"
                    :disabled="mainCategoryOptions==[]"
                  >
                    <el-option
                      v-for="(item,index) in mainCategoryOptions"
                      :key="item.index"
                      :label="item.mainName"
                      :value="item.mainName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="子品类">
              <template slot-scope="scope">
                <el-form-item label="" prop="subCategoryName" style="margin-bottom: 0">
                  <el-select
                    v-model="subCategoryName"
                    placeholder="选择子品类"
                    @change="subCategoryNameChange"
                    :disabled="subCategoryOptions===[]"
                  >
                    <el-option
                      v-for="(item,index) in subCategoryOptions"
                      :key="item.index"
                      :label="item.subName"
                      :value="item.subName">
                    </el-option>
                  </el-select>
                </el-form-item>
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
                  <el-form-item label="" prop="specificationId" style="margin-bottom: 0">
                    <el-select
                      v-model="specificationId"
                      placeholder="选择规格 "
                      @change="specificationIdChange"
                      :disabled="!brandOptions"
                    >
                      <el-option
                        v-for="(item,index) in specificationOptions"
                        :key="item.index"
                        :label="item.specificationChinese"
                        :value="item.tableId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="英文">
                <template slot-scope="scope">
                  <span>{{ form.specificationEnglish || '选择后显示' }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="容量">
              <el-table-column align="center" label="中文">
                <template slot-scope="scope">
                  <span>{{ form.capacityChinese || '选择后显示' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="英文">
                <template slot-scope="scope">
                  <span>{{ form.capacityEnglish || '选择后显示' }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="包装单位">
              <el-table-column align="center" label="中文">
                <template slot-scope="scope">
                  <span>{{ form.packageUnitChinese || '选择后显示' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="英文">
                <template slot-scope="scope">
                  <span>{{ form.packageUnitEnglish || '选择后显示' }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="商品净重">
              <template slot-scope="scope">
                <el-form-item label="" prop="netWeight" style="margin-bottom: 0">
                  <el-input
                    v-model.trim="form.netWeight"
                    placeholder="输入数字" clearable @change="netWeightChange"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品毛重">
              <template slot-scope="scope">
                <el-form-item label="" prop="grossWeight" style="margin-bottom: 0">
                  <el-input
                    v-model.trim="form.grossWeight"
                    placeholder="输入数字" clearable @change="grossWeightChange"
                  ></el-input>
                </el-form-item>
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
        <el-form-item label="申报要素表设置" prop="declarationSetting" class="border1 no-border-top" style="padding: 5px 0;margin-bottom: 0">
          <declarationTable
            :declarationSetting.async="form.declarationSetting" :brandChineseName.async="form.brandChineseName"
            :declarationSpecification.async="form.declarationSpecification" :declarationNum.async="form.declarationNum"
            :specificationId.async="specificationId" :specificationOptions.async="specificationOptions"
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
                <el-form-item label="" prop="cartonNo" style="margin-bottom: 0">
                  <el-select v-model="cartonNo" placeholder="选择箱型编号" @change="cartonNoChange">
                    <el-option
                      v-for="(item,index) in cartonOptions"
                      :key="item.index"
                      :label="item.cartonNo"
                      :value="item.cartonNo">
                    </el-option>
                  </el-select>
                </el-form-item>
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
          <el-form-item label="" prop="packageSpecificationData" style="margin-bottom: 0">
            <packageSpecificationTable
              :packageSpecificationData.async="form.packageSpecificationData"></packageSpecificationTable>
          </el-form-item>
        </el-form-item>
      </div>

      <div class="for-senior-executive" v-if="true">
        <h2>合作设置</h2>
        <div class="border1 form-error-inline">
          <el-form-item label="商品属性设置" prop="" class="border1 no-border-bottom no-border-top"
                        style="padding: 5px 0;margin-bottom: 0">
            <el-radio-group v-model="form.propertyOfGoods">
              <el-radio :label="1">新品</el-radio>
              <el-radio :label="2">常规</el-radio>
              <el-radio :label="3">促销</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="" class="border1 no-border-bottom no-border-top"
                        style="padding: 5px 0;margin-bottom: 0">
            <h2 style="text-align: center">促销数量设置</h2>
            <div style="display: flex">
              <el-table
                border :show-header="false"
                :data="[{},{},{}]"
                :cell-class-name="promotionTableClass"
                class="no-border-right no-border-bottom"
                style="width: 40%;margin: 4px">
                <el-table-column align="center" label="hide">
                  <template slot-scope="scope">
                    <span v-if="scope.$index==0">增加可促销数量</span>
                    <span v-if="scope.$index==1">累计已审批数量</span>
                    <span v-if="scope.$index==2">目前可审批数量</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="hide">
                  <template slot-scope="scope">
                    <el-form-item label="" prop="" style="margin-bottom: 0" v-if="scope.$index==0">
                      <el-input v-model.trim.number="form.addPromotionNum" placeholder="输入整数">
                        <template slot="append">套</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" prop="" style="margin-bottom: 0" v-if="scope.$index==1">
                      <el-input v-model.trim.number="form.alreadyApprovalNum" placeholder="输入整数">
                        <template slot="append">套</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" prop="" style="margin-bottom: 0" v-if="scope.$index==2">
                      <el-input v-model.trim.number="form.approvableNumSoFar" placeholder="输入整数">
                        <template slot="append">套</template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
              <el-table
                border :show-header="false"
                :data="[{},{},{}]"
                :cell-class-name="promotionTableClass"
                class=" no-border-bottom"
                style="width: 40%;margin: 4px">
                <el-table-column align="center" label="hide">
                  <template slot-scope="scope">
                    <span v-if="scope.$index==0">减少可促销数量</span>
                    <span v-if="scope.$index==1">累计未订货数量</span>
                    <span v-if="scope.$index==2">累计可促销数量</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="hide">
                  <template slot-scope="scope">
                    <el-form-item label="" prop="" style="margin-bottom: 0" v-if="scope.$index==0">
                      <el-input v-model.trim.number="form.reducePromotionNum" placeholder="输入整数">
                        <template slot="append">套</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" prop="" style="margin-bottom: 0" v-if="scope.$index==1">
                      <el-input v-model.trim.number="form.notOrderNum" placeholder="输入整数">
                        <template slot="append">套</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" prop="" style="margin-bottom: 0" v-if="scope.$index==2">
                      <el-input v-model.trim.number="form.availablePromotionNum" placeholder="输入整数">
                        <template slot="append">套</template>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
          <el-form-item label="销售渠道设置" prop="" class="border1 no-border-bottom no-border-top"
                        style="padding: 5px 0;margin-bottom: 0">
            <el-radio-group v-model="form.sublicense">
              <el-radio :label="1">非转授权</el-radio>
              <el-radio :label="2">转授权</el-radio>
            </el-radio-group>
            <div>可售渠道：<el-checkbox-group v-model="form.availableSalesChannel" style="display: inline-block">
              <el-checkbox label="A级渠道" border></el-checkbox>
              <el-checkbox label="B级渠道" border></el-checkbox>
              <el-checkbox label="C级渠道" border></el-checkbox>
              <el-checkbox label="D级渠道" border></el-checkbox>
              <el-checkbox label="分销渠道" border></el-checkbox>
            </el-checkbox-group>
            </div>
            <el-table
              border :data="[{}]"
              class="no-border-right no-border-bottom"
              style="width: 80%;margin: 4px">
              <el-table-column align="center" label="渠道号">
                <template slot-scope="scope">
                  <el-select
                    v-model="sublicenseChannelMsg"
                    @change="sublicenseChannelNoChange"
                    placeholder="选择转授权渠道号"
                    value-key="id"
                  >
                    <el-option
                      v-for="(item,index) in sublicenseChannelOptions"
                      :key="item.id"
                      :label="item.channelNo"
                      :value="item">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="渠道名称">
                <template slot-scope="scope">
                  <span>{{ sublicenseChannelMsg[sublicenseChannelMsg.channelNo] || '选择后显示' }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click=""></el-button>
                  <el-button type="success" icon="el-icon-plus" size="mini" @click=""></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </div>

      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="onSubmit" :loading="isSubmitting">保存并提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import formDataRules from './formRules/formRules'
  import { currentTimeStr } from '@/utils/timeFormat'
  import clearanceFileUpload from './components/clearanceFileUpload.vue'
  import declarationTable from './components/declarationTable.vue'
  import packageSpecificationTable from './components/packageSpecificationTable.vue'
  import { fileTitle,addFile,deleteFile,validateFile } from './function/clearanceFile'
  export default {
    components: { clearanceFileUpload,declarationTable,packageSpecificationTable },
    data() {
      return {
        form: {
          brandMsg: [{ brandEnglishName: null, }],
          brandNo: null,
          brandChineseName: null,
          goodName_EN: null,
          goodName_ZH: null,
          giftEnglishName: null,
          giftChineseName: null,
          goodsNoForBrand: null,
          barcode: null,
          makeUpOfGoods: 2,
          propertyOfSale: [1],
          specificationEnglish: null,
          capacityChinese: null,
          capacityEnglish: null,
          packageUnitChinese: null,
          packageUnitEnglish: null,
          netWeight: null,
          grossWeight: null,
          ingredientArr: [{}],
          hazardArr: [{}],
          tagArr: [{}],
          officialArr: [{}],
          MSDSenArr: [{}],
          MSDSzhArr: [{}],
          declarationSetting: [{skuName: null, use: null, package: null,  brandName: null}],
          declarationSpecification: [{text:null}],
          declarationNum: null,
          cartonNo: null,
          length: null,
          width: null,
          height: null,
          weight: null,
          packageSpecificationData: [
            {
              packageSpecificationZh: null,
              packageSpecificationEn: null,
              goodsNum: 0,
              packageUnitZh: null,
              packageUnitEn: null,
              mergeCartonUnit: '个/箱',
              cartonNumUnitZh: null,
              cartonNumUnitEn: null,
            }
          ],
          propertyOfGoods: 1,
          sublicense: 1,
          sublicenseChannelMsg: {channelNo: null, channelName: null, id: null}
        },
        sublicenseChannelMsg: {channelNo: null, channelName: null, id: null},
        formRules: {},
        brandNoLoading: false,
        brandOptions: [],
        specificationOptions: [],
        seriesOptions: [],
        mainCategoryOptions: [],
        subCategoryOptions: [],
        seriesName: null,
        mainCategoryName: null,
        subCategoryName: null,
        specificationId: null,
        isSubmitting: false,
        clearanceFileData: [
          {type: 1},{type: 2},{type: 3},{type: 4},{type: 5},{type: 6},
        ],
        cartonOptions: [],
        cartonNo: null,
        brandPropertyOfSale: [],
        sublicenseChannelOptions: [],
      }
    },
    methods: {
      brandEnglishNameChange(val) {
        this.brandOptions.some(item => {
          if (item.brandNo == val) {
            this.$set(this.form, 'brandNo', item.brandNo)
            this.$set(this.form, 'brandChineseName', item.chineseName)
            this.$request({
              url: '/goods/getMaxGoodsNo.do',
              method: "post",
              data: { brandNo: val }
            }).then((res) => {
              if (res.errorCode != 0) return false
              let val = null
              if (parseInt(res.data.item.toString().substr(-1,2))+1<10) {
                val = '0'+(parseInt(res.data.item.toString().substr(-1,2))+1)
              } else {
                val = parseInt(res.data.item.toString().substr(-1,2))+1
              }
              this.$set(this.form, 'goodsNo', item.brandNo+currentTimeStr()+val)
              this.$set(this.form, 'productionPlaceChinese', item.productionPlaceChinese)
              this.$set(this.form, 'productionPlaceEnglish', item.productionPlaceEnglish)
              })
            return true
          }
        })
        this.$request({
          url: '/goods/getBrandSeries.do',
          method: "post",
          data: { brandNo: val }
        }).then( res => {
          if (res.errorCode==0) {
            this.seriesOptions = res.data.items
            this.form.declarationSetting.forEach((item) => { item.brandName = this.form.brandChineseName })
          }
        })
        this.$request({
          url: '/goods/getBrandGoodsSpecification.do',
          method: "post",
          data: { brandNo: val }
        }).then( res => {
          if (res.errorCode==0) {
            this.specificationOptions = res.data.items
          }
        })
        this.$request({
          url: '/brand/getBrandCartonMsg.do',
          method: "post",
          data: { brandNo: val }
        }).then( res => {
          if (res.errorCode==0) {
            this.cartonOptions = res.data.items
          }
        })
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
        // 获取转授权渠道号信息
        this.$request({
          url: '/brand/getSublicenseChannelMsg.do',
          method: 'post',
          data: { brandNo: this.form.brandNo }
        }).then(res => {
          this.sublicenseChannelOptions = res.data.items
        })
      },
      seriesChange(val) {
        let mainCategoryArr = []
        this.seriesOptions.forEach(item => {
          if (item.seriesName==val) {
            this.$set(this.form, 'seriesName', this.seriesName)
            mainCategoryArr.push(item)
          }
        })
        this.mainCategoryOptions = mainCategoryArr
      },
      mainCategoryNameChange(val) {
        let subCategoryArr = []
        this.mainCategoryOptions.forEach(item => {
          if (item.mainName==val) {
            this.$set(this.form, 'mainCategoryName', this.mainCategoryName)
            subCategoryArr.push(item)
          }
        })
        this.subCategoryOptions = subCategoryArr
      },
      subCategoryNameChange(val) {
        this.$set(this.form, 'subCategoryName', this.subCategoryName)
      },
      specificationIdChange(val) {
        this.specificationOptions.some(item => {
          if (item.tableId==val) {
            this.$set(this.form, 'specificationId', this.specificationId)
            this.$set(this.form, 'specificationEnglish', item.specificationEnglish)
            this.$set(this.form, 'capacityChinese', item.capacityChinese)
            this.$set(this.form, 'capacityEnglish', item.capacityEnglish)
            this.$set(this.form, 'packageUnitChinese', item.packageUnitChinese)
            this.$set(this.form, 'packageUnitEnglish', item.packageUnitEnglish)
            return true
          }
        })
      },
      fileTitle,addFile,deleteFile,
      cartonNoChange(val) {
        this.cartonOptions.some(item => {
          if (item.cartonNo == val) {
            this.$set(this.form, 'cartonNo', val)
            this.$set(this.form, 'height', item.height)
            this.$set(this.form, 'width', item.width)
            this.$set(this.form, 'length', item.length)
            this.$set(this.form, 'weight', item.weight)
            return true
          }
        })
      },
      netWeightChange(val) {
        // 非空验证
        if (!val) return false
        // 两位小数验证
        if (!(val/1 > 0)) return false // 如果不是数字，报错
        // 如果有小数点
        if (val.indexOf('.') > -1) {
          if (val.indexOf('.') == 0) { val = '0'+val } //小数点之前没有数字
          val = val.substring(0, val.indexOf('.')+3)
          if (val.length == val.indexOf('.')+1) { val += '00' }
          else if (val.length == val.indexOf('.')+1+1) { val += '0' }// 判断此时小数点后是否够两位小数
          else {}
        }
        // 如果没有小数点
        else {
          // 去除字符串开头多余的0
          let targetIndex = -1
          for (let ii=0; ii<val.length; ii++) {
            if (val[ii] != 0) { targetIndex=ii; break }
            else {}
          }
          if (targetIndex>=1) { val = val.substring(targetIndex) }
          val += '.00'
        }
        this.form.netWeight = val
      },
      grossWeightChange(val) {
        // 非空验证
        if (!val) return false
        // 两位小数验证
        if (!(val/1 > 0)) return false // 如果不是数字，报错
        // 如果有小数点
        if (val.indexOf('.') > -1) {
          if (val.indexOf('.') == 0) { val = '0'+val } //小数点之前没有数字
          val = val.substring(0, val.indexOf('.')+3)
          if (val.length == val.indexOf('.')+1) { val += '00' }
          else if (val.length == val.indexOf('.')+1+1) { val += '0' }// 判断此时小数点后是否够两位小数
          else {}
        }
        // 如果没有小数点
        else {
          // 去除字符串开头多余的0
          let targetIndex = -1
          for (let ii=0; ii<val.length; ii++) {
            if (val[ii] != 0) { targetIndex=ii; break }
            else {}
          }
          if (targetIndex>=1) { val = val.substring(targetIndex) }
          val += '.00'
        }
        this.form.grossWeight = val
      },
      validateFile,
      sublicenseChannelNoChange(val) {
        console.log(val)
        this.sublicenseChannelMsg = val
        this.form.sublicenseChannelMsg = val
      },
      onSubmit() {
        this.isSubmitting = true;
//        if(!this.validateFile()) {
//          this.isSubmitting = false
//          return false
//        }
        console.log(this.form)

        this.$refs["form"].validate(valid => {
          if (valid) {
            return false
            request({
              url: '/goods/createGood.do',
              method: "post",
              data: this.form
            })
              .then(res => {
                if (res.errorCode == 0) {
                  this.$confirm(`新增商品信息已提交审核，可在“商品列表页”中查看详情。`, { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
                  this.isSubmitting = false;
                }
                else {
                  this.$message.error("新增失败");
                  this.isSubmitting = false;
                }
              })
              .catch(() => {
                this.$message.error("新增失败");
                this.isSubmitting = false;
              });
          } else {
            this.isSubmitting = false;
            this.$message.error("请填写全部信息");
            return false;
          }
        });
      },
      ClearanceFileClass({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 0) {
            return 'fake-table-head'
        }
      },
      promotionTableClass({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 0) {
          return 'fake-table-head'
        }
      },
    },
    created() {
      Object.assign(this.formRules, formDataRules)
      this.$request({
        url: '/brand/getBrandEnglishName.do',
        method: "post",
      }).then( res => {
          if (res.errorCode==0) {
            this.brandOptions = res.data.items
          }
        })
      this.$request({
        url: '/user/getTemporarySaveAddingGoodsMsg.do',
        method: 'post',
        data: {id:1}
      }).then((res) => {
//        this.form = JSON.parse(res.data.item.addingGoodsMsg)
//        this.brandPropertyOfSale = this.form.propertyOfSale
      })
    },
    beforeDestroy() {
      this.$emit('temporary-save', this.form)
    }
  }
</script>

<style lang="scss" scoped>
  .form-row .el-input {
    margin: 3px;
    width: 98%;
  }
</style>
