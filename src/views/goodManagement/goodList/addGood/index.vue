<template>
  <div>
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <div class="border1 form-error-inline" style="border-bottom-width: 2px">
        <el-form-item label="品牌" required class="form-row add-brand-row">
          <el-col :span="4" class="select-form-margin">
            <span
              v-if="chosenBrand"
              style="color: #999"
            >{{ chosenBrand.brandDetail.chineseName }}({{ chosenBrand.brandDetail.brandNo }})</span>
          </el-col>
          <el-col :span="8" class="select-form-margin">
            <el-button type="primary" size="mini" @click="chooseBrand">选择品牌</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="商品序列号" prop="goodID" class="form-row add-brand-row">
          <el-col :span="9">
            <el-input v-model="form.goodID"></el-input>
          </el-col>
          <el-col :span="9" style="padding-top: 2px">
            <span style="color: #999">&nbsp;企业商品自编号</span>
          </el-col>
        </el-form-item>
        <el-form-item label="商品组成" prop="isSuite" class="form-row add-brand-row">
          <el-radio-group v-model="form.isSuite" style="margin:5px 3px 0;">
            <el-radio :label="10">单品</el-radio>
            <el-radio :label="20">套组</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品编号" prop="goodsNo" class="form-row add-brand-row">
          <el-input v-model="form.goodsNo" placeholder="请输入商品编号"></el-input>
        </el-form-item>
        <el-row class="form-error-inside">
          <el-col :span="12">
            <el-form-item
              label="商品名称（中文）"
              prop="goodName_ZH"
              class="form-row add-brand-row"
              style="border-right: none"
            >
              <el-input
                v-model="form.goodName_ZH"
                type="textarea"
                autosize
                class="select-form-margin select-form-width"
                placeholder="请输入商品名称（中文）"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品名称（英文）" prop="goodName_EN" class="form-row add-brand-row">
              <el-input
                v-model="form.goodName_EN"
                type="textarea"
                class="select-form-margin select-form-width"
                autosize
                placeholder="请输入商品名称（英文）"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="原产国/产地" prop="goodOrigin" class="form-row add-brand-row">
          <el-input v-model="form.goodOrigin" placeholder="请输入原产国/产地"></el-input>
        </el-form-item>
        <el-form-item label="商品属性" prop="goodProp" class="form-row add-brand-row">
          <el-select v-model="form.goodProp" class="select-form-margin" placeholder="请选择">
            <el-option
              v-for="item in goodPropOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品系列" required class="form-row add-brand-row clear-border-right">
              <el-select
                v-model="form.goodSeries"
                class="select-form-margin"
                placeholder="请选择"
                @change="seriesSelect"
              >
                <el-option
                  v-for="item in goodSeriesOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品主品类" required class="form-row add-brand-row clear-border-right">
              <el-select
                v-model="form.mainCategory"
                class="select-form-margin"
                placeholder="请选择"
                @change="mainVarietySelect"
              >
                <el-option
                  v-for="item in mainCategoryOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品子品类" prop="subCategory" class="form-row add-brand-row">
              <el-select v-model="form.subCategory" placeholder="请选择" class="select-form-margin">
                <el-option
                  v-for="item in subCategoryOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <p style="margin: 20px"></p>

      <el-form-item label="商品规格" prop="specificationInput">
        <el-table
          :data="form.specificationInput"
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5"
        >
          <el-table-column align="center" label="商品规格" prop="specificationName">
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.goodSpecificationChinese" placeholder="例：30ml/支"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.goodSpecificationEnglish" placeholder="例：30ml/pc"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="容量">
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.capacityChinese" placeholder="例：30毫升"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.capacityEnglish" placeholder="例：30ml"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="包装单位">
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.packingUnitChinese" placeholder="例：支"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input v-model.trim="scope.row.packingUnitEnglish" placeholder="例：pc"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-form-item>

      <div class="border1 form-error-inline">
        <el-row>
          <el-col :span="12" class="form-error-inside">
            <el-form-item
              label="商品净重"
              prop="goodNetWeight"
              class="form-row add-brand-row clear-border-right"
            >
              <el-input v-model="form.goodNetWeight" placeholder="请输入商品净重">
                <template slot="append">kgs</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品毛重" prop="goodGrossWeight" class="form-row add-brand-row">
              <el-input v-model="form.goodGrossWeight" placeholder="请输入商品毛重">
                <template slot="append">kgs</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="商品品质" prop="goodQuality" class="form-row add-brand-row">
          <el-select v-model="form.goodQuality" placeholder="请选择" class="select-form-margin">
            <el-option
              v-for="(item,index) in goodQualityOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包装方式" prop="packingWay" class="form-row add-brand-row">
          <el-select v-model="form.packingWay" placeholder="请选择" class="select-form-margin">
            <el-option
              v-for="(item,index) in packingWayOptions"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申报要素" prop="slogan" class="form-row add-brand-row">
          <el-input v-model.trim="form.slogan" placeholder="请输入申报要素"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="起始折扣"
              prop="startDiscount"
              class="form-row add-brand-row last-form-row"
            >
              <el-input
                v-model.trim.number="form.startDiscount"
                style="width: 200px"
                placeholder="请输入起始折扣"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <p style="margin: 20px"></p>
      <el-form-item label="装箱规格" prop="cartonSpecificationArr">
        <!-- <el-row>
          <div class="add-btn-wrap">
            <el-button type="success" icon="el-icon-plus" @click="addPackingSpecification">添加装箱规格</el-button>
          </div>
        </el-row>-->
        <el-table :data="form.cartonSpecificationArr" class="border2" style="width: 100%">
          <el-table-column align="center" width="140" label="箱型编号">
            <template slot-scope="scope">
              <!-- <el-select v-model="scope.row.cartonNo" placeholder="请选择">
                <el-option
                  v-for="item in [{value: '02',label: '02'},{value: '03',label: '03'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>-->
              <el-input v-model.trim="scope.row.boxNo" placeholder="请输入箱型编号"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="装箱规格">
            <el-table-column align="center" width="180" label="中文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonSpecificationChinese" placeholder="例：10支/箱"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" width="180" label="英文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonSpecificationEnglish" placeholder="例：10PCS/CTN"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" width="140" label="商品数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.goodQuantity" placeholder="请选择"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品单位">
            <el-table-column align="center" width="130" label="中文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.goodUnitChinese" placeholder="例：支"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" width="130" label="英文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.goodUnitEnglish" placeholder="例：PCS"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" width="130" label="装箱单位">
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonUnitChinese" placeholder="例：箱"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" width="130" label="英文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonUnitEnglish" placeholder="例：CTN"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="箱子尺寸">
            <el-table-column align="center" width="220" label="长 宽 高 cm">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.cartonSize"
                  type="textarea"
                  :rows="2"
                  placeholder="系统填充"
                ></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="箱子重量">
            <el-table-column align="center" width="140" label="kgs">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonWeight" placeholder="默认读取"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete"
                         @click="deletePackingSpecification(scope.$index)"></el-button>
            </template>
          </el-table-column>-->
        </el-table>
      </el-form-item>
      <el-form-item label="商品售价" prop="goodPriceArr">
        <el-table
          border
          :data="form.goodPriceArr"
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5"
        >
          <el-table-column align="center" label="销售区域">
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.salesArea" placeholder="例：广东"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="120" label="交易币种">
            <template slot-scope="scope">
              <el-select
                v-model="goodPriceCurrencyTitle"
                placeholder="请选择"
                @change="goodPriceCurrencyChange"
              >
                <el-option label="港币" :value="scope.$index+'-'+0"></el-option>
                <el-option label="人民币" :value="scope.$index+'-'+1"></el-option>
                <el-option label="澳元" :value="scope.$index+'-'+2"></el-option>
                <el-option label="英镑" :value="scope.$index+'-'+3"></el-option>
                <el-option label="欧元" :value="scope.$index+'-'+4"></el-option>
                <el-option label="美元" :value="scope.$index+'-'+5"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100" label="币种符号">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.goodPriceArr[scope.$index].goodPriceCurrency.currencyId] && currencyInformation[form.goodPriceArr[scope.$index].goodPriceCurrency.currencyId].symbol || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100" label="单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.goodPriceArr[scope.$index].goodPriceCurrency.currencyId] && currencyInformation[form.goodPriceArr[scope.$index].goodPriceCurrency.currencyId].unit || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="120" label="金额">
            <template slot-scope="scope">
              <el-input v-model.trim.number="scope.row.amount" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" label="商品售价" class-name="last-col">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11">
                  <el-input v-model.trim.number="scope.row.theMinPrice" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model.trim.number="scope.row.theMaxPrice" placeholder="请输入"></el-input>
                </el-col>
              </el-row>
              <!--<div>-->
              <!--<el-input v-model="scope.row.thePrice" placeholder="请输入"></el-input>-->
              <!--</div>-->
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="补款金额" prop="replenishmentArr">
        <el-table
          border
          :data="form.replenishmentArr"
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5"
        >
          <el-table-column align="center" label="交易币种">
            <template slot-scope="scope">
              <el-select
                v-model="replenishmentCurrencyTitle"
                placeholder="请选择"
                @change="replenishmentCurrencyChange"
              >
                <el-option label="港币" :value="scope.$index+'-'+0"></el-option>
                <el-option label="人民币" :value="scope.$index+'-'+1"></el-option>
                <el-option label="澳元" :value="scope.$index+'-'+2"></el-option>
                <el-option label="英镑" :value="scope.$index+'-'+3"></el-option>
                <el-option label="欧元" :value="scope.$index+'-'+4"></el-option>
                <el-option label="美元" :value="scope.$index+'-'+5"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100" label="币种符号">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.replenishmentArr[scope.$index].replenishmentCurrency.currencyId] && currencyInformation[form.replenishmentArr[scope.$index].replenishmentCurrency.currencyId].symbol || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100" label="单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.replenishmentArr[scope.$index].replenishmentCurrency.currencyId] && currencyInformation[form.replenishmentArr[scope.$index].replenishmentCurrency.currencyId].unit || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="120" label="金额">
            <template slot-scope="scope">
              <el-input v-model.trim.number="scope.row.amount" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品售价" class-name="last-col">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11">
                  <el-input v-model.trim.number="scope.row.minReplenishment" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model.trim.number="scope.row.maxReplenishment" placeholder="请输入"></el-input>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <div class="border1" style="border-bottom-width:2px">
        <el-form-item
          label="商品成份"
          prop="ingredients"
          class="form-row add-brand-row textareaTitle textareaError"
        >
          <el-input
            v-model="form.ingredients"
            type="textarea"
            placeholder="请输入商品成份"
            :rows="2"
            class="select-form-margin select-form-width"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品功效"
          prop="efficacy"
          class="form-row add-brand-row textareaTitle textareaError"
        >
          <el-input
            v-model.trim.lazy="form.efficacy"
            type="textarea"
            :rows="2"
            placeholder="请输入商品功效"
            class="select-form-margin select-form-width"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品卖点"
          prop="sellingPoint"
          class="form-row add-brand-row textareaTitle textareaError"
        >
          <el-input
            v-model.trim.lazy="form.sellingPoint"
            type="textarea"
            :rows="2"
            placeholder="请输入商品卖点"
            class="select-form-margin select-form-width"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="使用感受"
          prop="userfeeling"
          class="form-row add-brand-row textareaTitle textareaError"
        >
          <el-input
            v-model.trim.lazy="form.userfeeling"
            type="textarea"
            :rows="2"
            placeholder="请输入使用感受"
            class="select-form-margin select-form-width"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="适用人群"
          prop="targetUser"
          class="form-row add-brand-row textareaTitle textareaError"
        >
          <el-input
            v-model.trim.lazy="form.targetUser"
            type="textarea"
            :rows="2"
            placeholder="请输入适用人群"
            class="select-form-margin select-form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品方形图" required class="form-row imgUploadTitle">
          <el-row style="padding-top: 17px">
            <el-upload
              action
              :show-file-list="false"
              :http-request="uploadGoodImageAction"
              list-type="picture-card"
            >
              <img
                v-if="form.goodImage"
                :src="form.goodImage"
                style="width:100%;height:100%;object-fit: contain;"
              >
              <i v-else class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="uploadPicVisible" append-to-body>
              <img width="100%" :src="uploadImageUrl" alt>
            </el-dialog>
          </el-row>
        </el-form-item>
        <el-form-item label="商品详情图" required class="form-row imgUploadTitle">
          <el-row style="padding-top: 17px">
            <el-upload
              action
              :http-request="uploadGoodDetailImageAction"
              list-type="picture-card"
              :show-file-list="false"
            >
              <img
                v-if="form.goodDetailImage"
                :src="form.goodDetailImage"
                style="width:100%;height:100%;object-fit: contain;"
              >
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-row>
        </el-form-item>
      </div>
      <div class="dialogBottomButton-wrap">
        <!--<el-button type="primary" @click="">保存</el-button>-->
        <el-button
          type="primary"
          @click="onSubmit"
          :loading="isSubmitting"
        >{{this.checkDetail ? '保存修改' : '创建商品'}}</el-button>
      </div>
    </el-form>
    <el-dialog
      :visible.sync="isChooseBrandShow"
      width="70%"
      @close="isChooseBrandShow = false"
      title="选择品牌"
      append-to-body
    >
      <brandChoice @choice-close="brandDidSelect"></brandChoice>
    </el-dialog>
  </div>
</template>

<script>
import brandChoice from './brandChoice'
import request from "@/utils/request"

const qiniu = require('qiniu-js')

var validateSpecificationInput = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  
  if (valiNull) {
    callback(new Error("商品规格表格必须全部填写！"));
  } else {
    callback();
  }
};


var validateCartonSpecificationArr = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) {
        return true
      }
    }
  });
  if (valiNull) {
    callback(new Error("装箱规格表格必须全部填写！"));
  } else {
    callback();
  }
};

var validateGoodPriceArr = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  
  if (valiNull) {
    callback(new Error("商品售价表格必须全部填写！"));
  } else if (value[0].amount < 0 || value[0].theMinPrice < 0 || value[0].theMaxPrice < 0) {
    callback(new Error("金额和商品售价必须为正数！"));
  } else if (parseFloat(value[0].theMinPrice) > parseFloat(value[0].theMaxPrice)) {
    callback(new Error("请正确填写商品售价最小值和最大值！"));
  } else {
    callback();
  }
};

var validateReplenishmentArr = (rule, value, callback) => {
  let valiNull = value.some((item, index, arr) => {
    for (var key in item) {
      if (!item[key]) return true
    }
  });
  
  if (valiNull) {
    callback(new Error("补款金额表格必须全部填写！"));
  } else if (!(value[0].amount > 0 && value[0].minReplenishment > 0 && value[0].maxReplenishment > 0)) {
    callback(new Error("金额和商品售价必须为正数！"));
  } else if (!(value[0].minReplenishment <= value[0].maxReplenishment)) {
    callback(new Error("请正确填写商品售价最小值和最大值！"));
  } else {
    callback();
  }
};

export default {
  props: ['goodsNo'],
  data() {
    return {
      currencyInformation: {
        1: { symbol: "HK$", unit: "港元" },
        2: { symbol: "￥", unit: "元" },
        3: { symbol: "A$", unit: "澳元" },
        4: { symbol: "£", unit: "英磅" },
        5: { symbol: "€", unit: "欧元" },
        6: { symbol: "$", unit: "美元" },
      },
      transactionCurrency: '',
      replenishmentCurrency: '',
      // 上传组件数据
      uploadImageUrl: '',
      uploadPicVisible: false,
      // 上传组件数据
      form: {
        goodID: '',
        goodBrand: '',
        brandNo: '',
        goodProp: '',
        mainCategory: '',
        subCategory: '',
        goodSeries: '',
        goodsNo: '',
        goodName_ZH: '',
        goodName_EN: '',
        goodStatus: '',
        goodPrice: '',
        startDiscount: '',
        checkInTime: '',
        isSuite: '',
        goodOrigin: '',
        goodImage: '',
        goodDetailImage: '',
        goodSpecification_msg: {
          SpecificationArr: [{ specificationName: " " }],
          specificationInput: [
            {
              goodSpecification: {
                chinese: "",
                english: ""
              },
              capacity: {
                chinese: "",
                english: ""
              },
              packingUnit: {
                chinese: "",
                english: ""
              }
            }
          ]
        },
        specificationInput: [
          {
            goodSpecificationChinese: '',
            goodSpecificationEnglish: '',
            capacityChinese: '',
            capacityEnglish: '',
            packingUnitChinese: '',
            packingUnitEnglish: '',
          }
        ],
        goodNetWeight: '',
        goodGrossWeight: '',
        goodQuality: '',
        packingWay: '',
        slogan: '',
        cartonSpecificationArr: [{
          cartonNo: '',
          cartonSpecificationChinese: '',
          cartonSpecificationEnglish: '',
          goodQuantity: '',
          goodUnitChinese: '',
          goodUnitEnglish: '',
          cartonUnitChinese: '',
          cartonUnitEnglish: '',
          cartonSize: '',
          cartonWeight: ''
        }],
        goodPriceArr: [{
          salesArea: '',
          goodPriceCurrency: '',
          amount: '',
          theMinPrice: '',
          theMaxPrice: '',
        }],
        replenishmentArr: [{
          replenishmentCurrency: '',
          amount: '',
          minReplenishment: '',
          maxReplenishment: '',
        }],
        ingredients: '',
        efficacy: '',
        sellingPoint: '',
        userfeeling: '',
        targetUser: '',
        goodSquareFilesList: [],
        goodDetailFileList: []
      },

      goodPropOptions: [{
        value: 10,
        label: '常规'
      }, {
        value: 20,
        label: '促销'
      }, {
        value: 30,
        label: '新品'
      }],
      goodSeriesOptions: [],
      mainCategoryOptions: [],
      subCategoryOptions: [],
      goodQualityOptions: [],
      packingWayOptions: [],
      transactionCurrencyArr: [
        {
          name: '港币',
          currencyId: 1,
          symbol: '$',
          unit: '港元'
        },
        {
          name: '人民币',
          currencyId: 2,
          symbol: '￥',
          unit: '元'
        },
        {
          name: '澳元',
          currencyId: 3,
          symbol: 'A$',
          unit: '澳元'
        },
        {
          name: '英镑',
          currencyId: 4,
          symbol: '£',
          unit: '英镑'
        },
        {
          name: '欧元',
          currencyId: 5,
          symbol: '€',
          unit: '欧元'
        },
        {
          name: '美元',
          currencyId: 6,
          symbol: '$',
          unit: '美元'
        },
      ],
      isChooseBrandShow: false,
      chosenBrand: null,
      isSubmitting: false,
      goodPriceCurrencyTitle: '',
      replenishmentCurrencyTitle: '',
      formRules: {
        goodID: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        isSuite: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        goodsNo: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        goodName_ZH: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        goodName_EN: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        goodOrigin: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        goodProp: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        goodSeries: [
          { required: true, message: ' ', trigger: 'change' },
        ],
        mainCategory: [
          { required: true, message: ' ', trigger: 'change' },
        ],
        subCategory: [
          { required: true, message: ' ', trigger: 'change' },
        ],
        specificationInput: [
          { validator: validateSpecificationInput, required: true, trigger: "change" }
        ],
        goodNetWeight: [
          { type: 'number', min: 0, message: ' ', required: true, trigger: "change" }
        ],
        goodGrossWeight: [
          { type: 'number', min: 0, message: ' ', required: true, trigger: "change" }
        ],
        goodQuality: [
          { required: true, message: '不能为空', trigger: "change" }
        ],
        packingWay: [
          { required: true, message: '不能为空', trigger: "change" }
        ],
        slogan: [
          { required: true, message: '不能为空', trigger: "change" }
        ],
        startDiscount: [
          { type: 'number', min: 0, required: true, message: '不能为空', trigger: "change" }
        ],
        cartonSpecificationArr: [
          { validator: validateCartonSpecificationArr, required: true, trigger: "change" }
        ],
        goodPriceArr: [
          { validator: validateGoodPriceArr, required: true, trigger: "change" }
        ],
        replenishmentArr: [
          { validator: validateReplenishmentArr, required: true, trigger: "change" }
        ],
        ingredients: [
          { required: true, message: '不能为空', trigger: "change" }
        ],
        efficacy: [
          { required: true, message: '不能为空', trigger: "change" }
        ],
        sellingPoint: [
          { required: true, message: '不能为空', trigger: "change" }
        ],
        userfeeling: [
          { required: true, message: '不能为空', trigger: "change" }
        ],
        targetUser: [
          { required: true, message: '不能为空', trigger: "change" }
        ],
      },
      checkDetail: false
    }
  },
  methods: {
    goodPriceCurrencyChange(value) {
      let a = value.split('-')[0]
      let b = value.split('-')[1]
      this.form.goodPriceArr[a].goodPriceCurrency = this.transactionCurrencyArr[b]
    },
    replenishmentCurrencyChange(value) {
      let a = value.split('-')[0]
      let b = value.split('-')[1]
      this.form.replenishmentArr[a].replenishmentCurrency = this.transactionCurrencyArr[b]
    },
    addPackingSpecification() {
      this.form.cartonSpecificationArr.push(
        {
          cartonNo: '',
          cartonSpecificationChinese: '',
          cartonSpecificationEnglish: '',
          goodQuantity: '',
          goodUnitChinese: '',
          goodUnitEnglish: '',
          cartonUnitChinese: '',
          cartonUnitEnglish: '',
          cartonSize: '',
          cartonWeight: ''
        }
      )
    },
    deletePackingSpecification(index) {
      if (this.form.cartonSpecificationArr.length === 1) return false
      this.form.cartonSpecificationArr.splice(index, 1)
    },
    // 上传组件数据
    handleExceed(files, fileList) {
      this.$message.warning('文件数超出限制')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.uploadImageUrl = file.url
      this.uploadPicVisible = true
    },
    chooseBrand() {
      this.isChooseBrandShow = true
    },
    uploadGoodImageAction(options) {
      this.uploadAction(options.file, key => {
        this.form.goodImage = `http://asset.wormir.com/${key}`
      })
    },
    uploadGoodDetailImageAction(options) {
      this.uploadAction(options.file, key => {
        this.form.goodDetailImage = `http://asset.wormir.com/${key}`
      })
    },
    uploadAction(file, callback) {
      request({
        url: '/getToken',
        method: 'get'
      }).then(res => {
        let observable = qiniu.upload(file, null, res.data, null, null)
        observable.subscribe({
          next(res) {
            // console.log(res);
          },
          error(err) {
            console.log(err)
          },
          complete(res) {
            // console.log(res);
            callback(res.key)
          }
        })
      })
    },
    seriesSelect(val) {
      for (let i = 0; i < this.goodSeriesOptions.length; i++) {
        const item = this.goodSeriesOptions[i];
        if (item.name == val) {
          this.mainCategoryOptions = this.chosenBrand.mainVariety[item.id]
          return
        }
      }
    },
    mainVarietySelect(val) {
      for (let i = 0; i < this.mainCategoryOptions.length; i++) {
        const item = this.mainCategoryOptions[i];
        if (item.name == val) {
          this.subCategoryOptions = this.chosenBrand.childVariety[item.id]
          return
        }
      }
    },
    brandDidSelect(val) {
      this.isChooseBrandShow = false;
      this.chosenBrand = val
      this.form.goodOrigin = val.brandDetail.origin
      this.form.specificationInput = val.specificationInput
      this.form.brandNo = val.brandDetail.brandNo
      this.form.companyName = val.brandDetail.brandCompanyName
      this.form.companyAddress = val.brandDetail.brandCompanyAddress
      this.form.producerName = val.brandDetail.producerName
      this.form.producerAddress = val.brandDetail.producerAddress
      this.goodSeriesOptions = val.brandSeries
      this.goodQualityOptions = val.brandDetail.qualityName
      this.packingWayOptions = val.brandDetail.packingWay
    },
    requestGoodsDetail(goodsNo) {
      request({
        url: '/goods/goodDetail.do',
        method: 'post',
        data: { goodsNo }
      }).then(res => {
        if (res.errorCode == 0) {
          this.form.goodID = res.data.goodInfo.goodID
          this.form.isSuite = res.data.goodInfo.isSuite
          this.form.goodsNo = goodsNo
          this.form.goodName_ZH = res.data.goodInfo.goodName_ZH
          this.form.goodName_EN = res.data.goodInfo.goodName_EN
          this.form.goodImage = res.data.goodInfo.goodImage
          this.form.goodDetailImage = res.data.goodInfo.goodDetailImage
          this.form.goodProp = res.data.goodInfo.goodProp
          this.form.goodNetWeight = res.data.goodInfo.goodNetWeight
          this.form.goodGrossWeight = res.data.goodInfo.goodGrossWeight
          this.form.goodQuality = res.data.goodInfo.goodQuality
          this.form.packingWay = res.data.goodInfo.packingWay
          this.form.slogan = res.data.goodInfo.slogan
          this.form.startDiscount = res.data.goodInfo.startDiscount
          if (res.data.carton) {
            this.form.cartonSpecificationArr = [res.data.carton]
          }
          this.form.goodSeries = res.data.goodInfo.goodSeries
          this.form.mainCategory = res.data.goodInfo.mainCategory
          this.form.subCategory = res.data.goodInfo.subCategory
          this.form.ingredients = res.data.goodInfo.ingredients
          this.form.efficacy = res.data.goodInfo.efficacy
          this.form.sellingPoint = res.data.goodInfo.sellingPoint
          this.form.userfeeling = res.data.goodInfo.userfeeling
          this.form.targetUser = res.data.goodInfo.targetUser
          if (res.data.salePrice) {
            let goodPriceObj = {
              amount: res.data.salePrice.amount,
              salesArea: res.data.salePrice.salesArea,
              theMinPrice: res.data.salePrice.theMinPrice,
              theMaxPrice: res.data.salePrice.theMaxPrice,
            }
            this.transactionCurrencyArr.forEach(c => {
              if (c.name == res.data.salePrice.name) {
                goodPriceObj.goodPriceCurrency = c
              }
            })
            this.goodPriceCurrencyTitle = res.data.salePrice.name
            this.form.goodPriceArr = [goodPriceObj]
          }
          if (res.data.replenishmentAmount) {
            let replenishmentObj = {
              amount: res.data.replenishmentAmount.amount,
              minReplenishment: res.data.replenishmentAmount.theMinPrice,
              maxReplenishment: res.data.replenishmentAmount.theMaxPrice,
            }
            this.transactionCurrencyArr.forEach(c => {
              if (c.name == res.data.replenishmentAmount.name) {
                replenishmentObj.replenishmentCurrency = c
              }
            })
            this.replenishmentCurrencyTitle = res.data.replenishmentAmount.name
            this.form.replenishmentArr = [replenishmentObj]
          }


          request({
            url: '/brand/brandDetail.do',
            method: 'post',
            data: { brandNo: res.data.goodInfo.brandNo }
          }).then(res2 => {
            this.brandDidSelect(res2.data)
          })
        }
      })
    },
    onSubmit() {
      // console.log(this.form)
      if (!this.chosenBrand) {
        this.$message.error('请选择品牌!');
        return false
      }

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.isSubmitting = true
          request({
            url: this.checkDetail ? '/goods/updateGoodsInfo.do' : '/goods/createGood.do',
            method: 'post',
            data: this.form
          }).then(() => {
            this.isSubmitting = false
            this.$emit('submitSuccess')
          }).catch(() => {
            this.$message.error('请求失败');
            this.isSubmitting = false
          })
        } else {
          this.isSubmitting = false
          this.$message.error('请正确填写表格信息')
          return false
        }
      })
    }
  },
  created() {
    if (this.goodsNo) {
      this.checkDetail = true
      this.requestGoodsDetail(this.goodsNo)
    } else {
      this.checkDetail = false
    }
  },
  mounted() {
  },
  components: {
    brandChoice
  }
}
</script>

<style lang="scss" scoped>
.form-row {
  margin: 0;
}

.form-row .el-input {
  margin: 3px;
  width: 98%;
}

.form-row .el-form-item__label {
  height: 35px;
}

.add-btn-wrap {
  margin: 0 0 5px;
}
</style>
