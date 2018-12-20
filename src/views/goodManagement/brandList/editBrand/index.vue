<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px" :rules="formRules">
      <div class="border1 form-error-inline">
        <el-form-item label="品牌序列号" prop="brandNo" class="form-row add-brand-row">
          <el-input v-model="form.brandNo"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称（中文）" prop="chineseName" class="form-row add-brand-row">
          <el-input v-model="form.chineseName"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称（英文）" prop="englishName" class="form-row add-brand-row">
          <el-input v-model="form.englishName"></el-input>
        </el-form-item>
        <el-form-item label="原产国/产地" prop="origin" class="form-row add-brand-row">
          <el-input v-model="form.origin"></el-input>
        </el-form-item>
        <el-form-item label="品牌公司名称" prop="brandCompanyName" class="form-row add-brand-row">
          <el-input v-model="form.brandCompanyName"></el-input>
        </el-form-item>
        <el-form-item label="品牌公司地址" prop="brandCompanyAddress" class="form-row add-brand-row">
          <el-input v-model="form.brandCompanyAddress"></el-input>
        </el-form-item>
        <el-form-item label="品牌介绍" prop="brandIntroduction" class="form-row add-brand-row textareaTitle">
          <el-input type="textarea" :rows="2" v-model="form.brandIntroduction"
                    style="margin: 3px;width: 98%"></el-input>
        </el-form-item>
        <el-form-item label="生产企业名称" prop="producerName" class="form-row add-brand-row">
          <el-input v-model="form.producerName"></el-input>
        </el-form-item>
        <el-form-item label="生产企业地址" prop="producerAddress" class="form-row add-brand-row">
          <el-input v-model="form.producerAddress"></el-input>
        </el-form-item>
        <el-form-item label="海运订货量" prop="orderNumBySea" class="form-row add-brand-row">
          <el-input v-model.number="form.orderNumBySea"></el-input>
        </el-form-item>
        <el-form-item label="外汇到账时间" prop="receiptTime" class="form-row last-form-row add-brand-row">
          <el-col :span="11">
            <el-input v-model.trim.number="form.receiptTime" placeholder="请输入外汇到账时间">
              <template slot="append">小时</template>
            </el-input>
          </el-col>
        </el-form-item>
      </div>

      <p style="margin: 20px"></p>

      <el-form-item label="交易币种" required>
        <div class="add-btn-wrap">
          <el-button type="success" icon="el-icon-plus" @click="addInlandCurrencyType()">添加国内交易币种</el-button>
        </div>
        <el-table
          :data="inlandCurrencyArr"
          border
          class="border2 vali-table"
          :cell-style="{height: '80px'}"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
          v-if="viewInlandTable"
        >
          <el-table-column align="center" label="类别" width="120" prop="type">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="币种名称" prop="currencyName" width="200">
            <template slot-scope="scope">
              <el-form-item label-width="0" prop="" style="margin: 0">
                <el-select
                  v-model="inlandCurrencyTitle[scope.$index]"
                  @change="inlandCurrency"
                  placeholder="请选择币种">
                  <el-option label="港币" :value="scope.$index+'-'+0"></el-option>
                  <el-option label="人民币" :value="scope.$index+'-'+1"></el-option>
                  <el-option label="澳元" :value="scope.$index+'-'+2"></el-option>
                  <el-option label="英镑" :value="scope.$index+'-'+3"></el-option>
                  <el-option label="欧元" :value="scope.$index+'-'+4"></el-option>
                  <el-option label="美元" :value="scope.$index+'-'+5"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100" label="币种符号">
            <template slot-scope="scope">
              <span>{{  inlandCurrencyTitle[scope.$index] && currencyInformation[(inlandCurrencyTitle[scope.$index].split('-')[1])/1+1].symbol || '自动读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100" label="币种单位">
            <template slot-scope="scope">
              <span>{{  inlandCurrencyTitle[scope.$index] && currencyInformation[(inlandCurrencyTitle[scope.$index].split('-')[1])/1+1].unit || '自动读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteInlandCurrencyType(scope.$index)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-btn-wrap" style="margin-top: 7px">
          <el-button type="success" icon="el-icon-plus" @click="addOutlandCurrencyType()">添加香港/国外交易币种</el-button>
        </div>
        <el-table
          :data="outlandCurrencyArr"
          border
          class="border2 vali-table"
          :cell-style="{height: '80px'}"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
          v-if="viewOutlandTable">
          <el-table-column
            align="center"
            label="类别"
            width="120"
            prop="type">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="币种名称" prop="currencyName" width="200">
            <template slot-scope="scope">
              <el-form-item label-width="0" prop="" style="margin: 0">
                <el-select
                  v-model="outlandCurrencyTitle[scope.$index]"
                  @change="outlandCurrency"
                  placeholder="请选择币种">
                  <el-option label="港币" :value="scope.$index+'-'+0"></el-option>
                  <el-option label="人民币" :value="scope.$index+'-'+1"></el-option>
                  <el-option label="澳元" :value="scope.$index+'-'+2"></el-option>
                  <el-option label="英镑" :value="scope.$index+'-'+3"></el-option>
                  <el-option label="欧元" :value="scope.$index+'-'+4"></el-option>
                  <el-option label="美元" :value="scope.$index+'-'+5"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100" label="币种符号">
            <template slot-scope="scope">
              <span>{{  outlandCurrencyTitle[scope.$index] && currencyInformation[(outlandCurrencyTitle[scope.$index].split('-')[1])/1+1].symbol || '自动读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100" label="币种单位">
            <template slot-scope="scope">
              <span>{{  outlandCurrencyTitle[scope.$index] && currencyInformation[(outlandCurrencyTitle[scope.$index].split('-')[1])/1+1].unit || '自动读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作"
                           min-width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteOutlandCurrencyType(scope.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品品质" required>
        <div class="add-btn-wrap">
          <el-button type="success" icon="el-icon-plus" @click="addGoodsQuality()">添加商品品质</el-button>
        </div>
        <el-table
          :data="goodsQualityArr" border
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column
            align="center"
            label="品质名称"
            prop="quality">
            <template slot-scope="scope">
              <el-input placeholder="请填写品质名称" v-model="form.qualityName[scope.$index]"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteGoodsQuality(scope.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="包装设置" required>
        <div class="add-btn-wrap">
          <el-button type="success" icon="el-icon-plus" @click="addPackingWay()">添加包装方式</el-button>
        </div>
        <el-table
          :data="packingWayArr"
          border
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column
            align="center"
            label="包装方式"
            prop="packingWay">
            <template slot-scope="scope">
              <el-input placeholder="请填写包装方式" v-model="form.packingWay[scope.$index]"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deletePackingWay(scope.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="品牌系列" required>
        <el-radio-group v-model="form.hasBrandSeries">
          <el-radio :label="1">有品牌系列</el-radio>
          <el-radio :label="0">无品牌系列</el-radio>
        </el-radio-group>
        <el-row>
          <div class="add-btn-wrap">
            <el-button type="success" icon="el-icon-plus" v-if="form.hasBrandSeries"
                       @click="brandSeries_addBrandSeries">添加品牌系列
            </el-button>
          </div>
        </el-row>
        <el-table
          :data="form.brandSeriesArr"
          border
          v-if="form.hasBrandSeries&&handleSeriesData"
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column
            width="200"
            align="center"
            label="系列名称 "
            prop="seriesName">
            <template slot-scope="scope">
              <el-form-item label-width=0 prop="inputSeries" style="margin: 0">
                <el-input
                  v-model.trim="form.inputSeries[scope.$index].name"
                  placeholder="请输入品牌系列"
                ></el-input>
              </el-form-item>
              <div class="add-btn-wrap" style="margin-top: 10px">
                <el-button
                  size="mini"
                  type="danger" icon="el-icon-delete"
                  @click="brandSeries_deleteSeries(scope.$index, scope.row)">删除系列
                </el-button>
              </div>
              <div class="add-btn-wrap">
                <el-button
                  type="success" icon="el-icon-plus"
                  size="mini"
                  @click="brandSeries_addMainCategoties(scope.$index, scope.row)">添加主品类
                </el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="品类" :width="brandSeries_mainCategoriesWrap_width">
            <template slot-scope="scope">
              <div class="mainCategories-wrap">
                <div class="mainCategories-item"
                     v-for="(mainCategoriesItems,mainCateIndex) in form.brandSeriesMainCategoriesArr[scope.$index]">
                  <el-form-item label="主品类">
                    <el-input v-model="form.brandSeriesMainCategoriesArr[scope.$index][mainCateIndex].value"
                              placeholder="请输入主品类"></el-input>
                    <div class="add-btn-wrap" style="margin-top: 5px">
                      <el-button
                        size="mini"
                        type="danger" icon="el-icon-delete"
                        @click="brandSeries_deleteMainCategoties(scope.$index,mainCateIndex)">删除主品类
                      </el-button>
                      <el-button
                        type="success" icon="el-icon-plus"
                        size="mini"
                        @click="brandSeries_addSubCategoties(scope.$index,mainCateIndex)">添加子品类
                      </el-button>
                    </div>
                  </el-form-item>
                  <div class="subCategories-wrap">
                    <div class="subCategories-item"
                         v-for="(subCategoriesItems,subCateIndex) in form.brandSeriesMainCategoriesArr[scope.$index][mainCateIndex].subCategoriesArr">
                      <el-form-item label="子品类">
                        <el-input
                          v-model="form.brandSeriesMainCategoriesArr[scope.$index][mainCateIndex].subCategoriesArr[subCateIndex]"
                          placeholder="请输入子品类">
                          <el-button slot="append" type="danger" icon="el-icon-delete"
                                     @click="brandSeries_delSubCategories(scope.$index,mainCateIndex,subCateIndex)"></el-button>
                        </el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!--<el-form-item label="品牌类型" required>-->
        <!--<el-row>-->
          <!--<div class="add-btn-wrap">-->
            <!--<el-button type="success" icon="el-icon-plus" @click="brandType_addBrandType">添加品牌类型</el-button>-->
          <!--</div>-->
        <!--</el-row>-->
        <!--<el-table border-->
                  <!--:data="form.brandType_msg.brandTypeArr"-->
                  <!--class="border2"-->
                  <!--:style="{ width: brandType_mainCategoriesWrap_width + 2 + 'px', borderBottom: '1px solid #D5D5D5' }">-->
          <!--<el-table-column prop="typeName" align="center" label="品类" :width="brandType_mainCategoriesWrap_width">-->
            <!--<template slot-scope="scope">-->
              <!--<div class="mainCategories-wrap">-->
                <!--<div class="mainCategories-item"-->
                     <!--v-for="(mainCategoriesItems,mainCateIndex) in form.brandType_msg.mainCategoriesArr">-->
                  <!--<el-form-item label="主品类">-->
                    <!--<el-input v-model="form.brandType_msg.mainCategoriesArr[mainCateIndex].value"-->
                              <!--placeholder="请输入主品类"></el-input>-->
                    <!--<div class="add-btn-wrap" style="margin-top: 5px">-->
                      <!--<el-button-->
                        <!--size="mini"-->
                        <!--type="danger" icon="el-icon-delete"-->
                        <!--@click="brandType_deleteMainCategoties(mainCateIndex)">删除主品类-->
                      <!--</el-button>-->
                      <!--<el-button-->
                        <!--type="success" icon="el-icon-plus"-->
                        <!--size="mini"-->
                        <!--@click="brandType_addSubCategoties(mainCateIndex)">添加子品类-->
                      <!--</el-button>-->
                    <!--</div>-->
                  <!--</el-form-item>-->
                  <!--<div class="subCategories-wrap">-->
                    <!--<div class="subCategories-item"-->
                         <!--v-for="(subCategoriesItems,subCateIndex) in form.brandType_msg.mainCategoriesArr[mainCateIndex].subCategoriesArr">-->
                      <!--<el-form-item label="子品类">-->
                        <!--<el-input-->
                          <!--v-model="form.brandType_msg.mainCategoriesArr[mainCateIndex].subCategoriesArr[subCateIndex]"-->
                          <!--placeholder="请输入子品类">-->
                          <!--<el-button slot="append" type="danger" icon="el-icon-delete"-->
                                     <!--@click="brandType_delSubCategories(mainCateIndex,subCateIndex)"></el-button>-->
                        <!--</el-input>-->
                      <!--</el-form-item>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      <!--</el-form-item>-->
      <el-form-item label="品牌商品规格" prop="specificationInput">
        <el-row>
          <div class="add-btn-wrap">
            <el-button
              type="success"
              icon="el-icon-plus"
              @click="brandSpecification_addSpecification"
            >添加品牌商品规格
            </el-button>
          </div>
        </el-row>
        <el-table
          border
          :data="form.brandSpecification_msg.SpecificationArr"
          class="border2"
          :header-cell-style="{padding: 0}"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
        >
          <el-table-column align="center" label="商品规格" prop="specificationName">
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="form.specificationInput[scope.$index].goodSpecificationChinese"
                  placeholder="例：30ml/支"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="form.specificationInput[scope.$index].goodSpecificationEnglish"
                  placeholder="例：30ml/pc"
                ></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="容量">
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="form.specificationInput[scope.$index].capacityChinese"
                  placeholder="例：30毫升"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="form.specificationInput[scope.$index].capacityEnglish"
                  placeholder="例：30ml"
                ></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="包装单位">
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="form.specificationInput[scope.$index].packingUnitChinese"
                  placeholder="例：支"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="form.specificationInput[scope.$index].packingUnitEnglish"
                  placeholder="例：pc"
                ></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="brandSpecification_deleteSpecification(scope.$index, '')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="品牌箱子" required>
        <el-row>
          <div class="add-btn-wrap">
            <el-button type="success" icon="el-icon-plus" @click="brandBox_addBox()">添加品牌箱子</el-button>
          </div>
        </el-row>
        <el-table
          border
          :data="form.brandBox_msg.boxArr"
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column align="center" width="150" label="箱型编号">
            <template slot-scope="scope">
              <el-input
                v-model.trim="form.boxInput[scope.$index].boxNo"
                placeholder="请输入箱型编号"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="长(cm)">
            <template slot-scope="scope">
              <el-input
                v-model.trim="form.boxInput[scope.$index].boxLength"
                placeholder="请输入长(cm)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="宽(cm)">
            <template slot-scope="scope">
              <el-input
                v-model.trim="form.boxInput[scope.$index].boxWidth"
                placeholder="请输入宽(cm)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="高(cm)">
            <template slot-scope="scope">
              <el-input
                v-model.trim="form.boxInput[scope.$index].boxHeight"
                placeholder="请输入高(cm)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" label="箱子重量(kgs)">
            <template slot-scope="scope">
              <el-input
                v-model.trim="form.boxInput[scope.$index].boxWeight"
                placeholder="请输入箱子重量(kgs)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="brandBox_deleteBox(scope.$index, '')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="品牌折扣" required>
        <el-row>
          <div class="add-btn-wrap">
            <el-button type="success" icon="el-icon-plus" @click="brandDiscount_addDiscount">添加品牌折扣</el-button>
          </div>
        </el-row>
        <el-table
          border
          :data="form.brandDiscount_msg.discountArr"
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
        >
          <el-table-column align="center" width="250" label="订货区间">
            <template slot-scope="scope">
              <el-col :span="11">
                <el-input
                  v-model.trim.number="form.discountInput[scope.$index].orderMin"
                  placeholder="区间起订量"
                ></el-input>
              </el-col>
              <el-col :span="2">
                <span>-</span>
              </el-col>
              <el-col :span="11">
                <el-input
                  v-model.trim.number="form.discountInput[scope.$index].orderMax"
                  placeholder="区间结束量"
                ></el-input>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" label="降幅折扣 -%">
            <template slot-scope="scope">
              <el-input
                v-model.trim.number="form.discountInput[scope.$index].decreasingDiscount"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="brandDiscount_deleteDiscount(scope.$index, '')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="合作管理" required v-if="this.form.contract">
        <el-table border
                  :data="form.cooperationManagement_Arr"
                  class="border2"
                  style="width: 100%; border-bottom: 1px solid #D5D5D5; border-right: 1px solid #D5D5D5">
          <el-table-column
            prop="contractNo"
            align="center"
            min-width="140"
            label="合同编号">
          </el-table-column>
          <el-table-column
            prop="contractProp"
            align="center"
            min-width="100"
            label="合同属性">
          </el-table-column>
          <el-table-column
            prop="beginTime"
            align="center"
            min-width="120"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="endTime"
            align="center"
            min-width="120"
            label="结束时间">
          </el-table-column>
          <el-table-column
            prop="brandStatus"
            align="center"
            min-width="110"
            label="品牌状态">
          </el-table-column>
          <el-table-column
            prop="endDate"
            align="center"
            min-width="120"
            label="终止日期">
          </el-table-column>
          <el-table-column
            prop="endType"
            align="center"
            min-width="110"
            label="终止类型">
          </el-table-column>
          <el-table-column
            prop="endReason"
            align="center"
            min-width="140"
            label="终止原因">
          </el-table-column>
          <el-table-column
            align="center"
            min-width="100"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="showStopContract">终止合同</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="submitEdit()">保存并提交</el-button>
      </div>
    </el-form>
    <el-dialog :visible.sync="isStopContractShow" class="" width="70%" @close="isStopContractShow = false" title="终止合同"
               append-to-body>
      <el-form :model="stopContract_ruleForm" :rules="stopContract_rules" ref="deleteChannel_ruleForm"
               label-width="150px" class="demo-ruleForm">
        <div class="border1">
          <el-form-item label="终止日期" class="form-row add-brand-row">
            <el-date-picker
              v-model="stopContract_ruleForm.applyTime"
              type="date"
              placeholder="请输入停止供货日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="终止类型" prop="operateType" class="form-row add-brand-row">
            <el-radio-group v-model="stopContract_ruleForm.operateType" style="margin:5px 3px 0;">
              <el-radio label="到期终止" value="1"></el-radio>
              <el-radio label="提前终止" value="2"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="终止原因" prop="applyReason" class="form-row add-brand-row textareaTitle">
            <el-input type="textarea" placeholder="请输入终止合作原因" :rows="2" v-model="stopContract_ruleForm.applyReason"
                      style="margin: 3px;width: 98%"></el-input>
          </el-form-item>
          <el-form-item label="品牌状态" class="form-row add-brand-row last-form-row">
            <el-select v-model="stopContract_ruleForm.brandStatus" placeholder="请选择" style="margin: 3px;">
              <el-option
                v-for="item in brandStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="dialogBottomButton-wrap">
          <el-button type="primary" @click="sumbitTerminationContract()">保存并提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import request from "@/utils/request"
  export default {
    props: {
      brandObj: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        inlandCurrencyTitle: [''],
        outlandCurrencyTitle: [''],
        form: {
          brandNo: '',
          chineseName: '',
          englishName: '',
          origin: '',
          hasBrandSeries: '',
          inputSeries: [""],
          brandSeriesArr: [
            { seriesName: ' ' }
          ],
          brandSeriesMainCategoriesArr: [
            [{
              value: "",
              subCategoriesArr: [""]
            }]
          ],
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
          boxInput: [
            {
              boxNo: "",
              boxLength: "",
              boxWidth: "",
              boxHeight: "",
              boxWeight: ""
            }
          ],
          discountInput: [
            {
              orderMin: "",
              orderMax: "",
              decreasingDiscount: 0
            }
          ],
          contract: '',


          brandCompanyName: '',
          brandCompanyAddress: '',
          brandIntroduction: '',
          producerName: '',
          producerAddress: '',
          orderNumBySea: null,
          receiptTime: null,
          transactionCurrencyInland: [''],
          transactionCurrencyOutland: [''],
          qualityName: [''],
          packingWay: [],
          brandSeries_msg: {
            hasBrandSeries: true,
            inputSeries: [''],
            mainCategoriesArr: [
              {
                value: '',
                subCategoriesArr: ['']
              }
            ],
            brandSeriesArr: [
              { seriesName: ' ' }
            ],
            mainCategoriesItem_width: 750
          },
          brandType_msg: {
            brandTypeArr: [
              { typeName: ' ' }
            ],
            mainCategoriesArr: [
              {
                value: '',
                subCategoriesArr: ['']
              }
            ],
            mainCategoriesItem_width: 600
          },
          brandSpecification_msg: {
            SpecificationArr: [
              { specificationName: ' ' }
            ],
            specificationInput: [
              {
                goodSpecification: {
                  chinese: '',
                  english: ''
                },
                capacity: {
                  chinese: '',
                  english: ''
                },
                packingUnit: {
                  chinese: '',
                  english: ''
                }
              }
            ]
          },
          brandBox_msg: {
            boxArr: [
              { boxName: ' ' }
            ],
            boxInput: [
              {
                boxNo: '',
                boxLength: '',
                boxWidth: '',
                boxHeight: '',
                boxWeight: ''
              }
            ]
          },
          brandDiscount_msg: {
            discountArr: [
              { discountName: ' ' }
            ],
            discountInput: [
              {
                orderMin: '',
                orderMax: '',
                decreasingDiscount: 0
              }
            ]
          },
          brandStatus: ''
        },
        brandStatusOptions: [{
          value: '1',
          label: '正常供货'
        }, {
          value: '2',
          label: '停止供货'
        }],
        currencyInformation: {
          1: { symbol: "HK$", unit: "港元" },
          2: { symbol: "￥", unit: "元" },
          3: { symbol: "A$", unit: "澳元" },
          4: { symbol: "£", unit: "英磅" },
          5: { symbol: "€", unit: "欧元" },
          6: { symbol: "$", unit: "美元" },
        },
        emptyArr: [
          {
            type: { inland: '国内', outland: '香港/国外' },
            quality: 'Top',
            packingWay: 'Auto'
          }
        ],
        inlandCurrencyArr: [
          {
            type: '国内'
          }
        ],
        outlandCurrencyArr: [
          {
            type: '香港/国外'
          }
        ],
        goodsQualityArr: [
          {
            quality: 'Top',
          }
        ],
        packingWayArr: [
          {
            packingWay: 'Auto'
          }
        ],
        isStopContractShow: false,
        stopContract_ruleForm: {
          applyReason: null,
          operateType: null,
          applyTime: null,
          brandStatus: ''
        },
        stopContract_rules: {},
        transactionCurrencyArr: [
          {
            name: '港币',
            id: 1,
            symbol: '$',
            unit: '港元'
          },
          {
            name: '人民币',
            id: 2,
            symbol: '￥',
            unit: '元'
          },
          {
            name: '澳元',
            id: 3,
            symbol: 'A$',
            unit: '澳元'
          },
          {
            name: '英镑',
            id: 4,
            symbol: '£',
            unit: '英镑'
          },
          {
            name: '欧元',
            id: 5,
            symbol: '€',
            unit: '欧元'
          },
          {
            name: '美元',
            id: 6,
            symbol: '$',
            unit: '美元'
          },
        ],
        viewInlandTable: false,
        viewOutlandTable: false,
        handleSeriesData: false,
        formRules: {
          brandNo: [{ required: true, message: "不能为空", trigger: "blur" }],
          chineseName: [{ required: true, message: "不能为空", trigger: "blur" }],
          englishName: [{ required: true, message: "不能为空", trigger: "blur" }],
          origin: [{ required: true, message: "不能为空", trigger: "blur" }],
          brandCompanyName: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          brandCompanyAddress: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          brandIntroduction: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          producerName: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          producerAddress: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          orderNumBySea: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          receiptTime: [
            { required: true, type:'number', min: 0, message: "不能为空", trigger: "blur" }
          ],
          
        }
      }
    },
    computed: {
      brandSeries_mainCategoriesWrap_width() {
        return this.form.brandSeries_msg.mainCategoriesItem_width * this.form.brandSeries_msg.mainCategoriesArr.length
      },
      brandType_mainCategoriesWrap_width() {
        return this.form.brandType_msg.mainCategoriesItem_width * this.form.brandType_msg.mainCategoriesArr.length
      }
    },
    methods: {
      inlandCurrency(value) {
        let a = value.split('-')[0]
        let b = value.split('-')[1]
        this.form.transactionCurrencyInland[a] = this.transactionCurrencyArr[b]
      },
      outlandCurrency(value) {
        let a = value.split('-')[0]
        let b = value.split('-')[1]
        this.form.transactionCurrencyOutland[a] = this.transactionCurrencyArr[b]
      },
      addInlandCurrencyType() {
        this.inlandCurrencyArr.push(
          {
            type: '国内'
          }
        )
      },
      deleteInlandCurrencyType(index) {

        if (index===this.inlandCurrencyTitle.length-1) {
          this.inlandCurrencyArr.splice(index, 1)
          this.inlandCurrencyTitle.splice(index, 1)
          this.form.transactionCurrencyInland.splice(index, 1)
        }
        else {
          let coverValue = this.inlandCurrencyTitle[index+1]
          coverValue = index + '-' + coverValue.split('-')[1]
          this.inlandCurrencyArr.splice(index, 1)
          this.inlandCurrencyTitle.splice(index, 1)
          this.form.transactionCurrencyInland.splice(index, 1)
          this.inlandCurrencyTitle[index] = coverValue
          this.inlandCurrency(coverValue)
        }
      },
      addOutlandCurrencyType() {
        this.outlandCurrencyArr.push(
          {
            type: '香港/国外'
          }
        )
      },
      deleteOutlandCurrencyType(index) {
        if (index===this.outlandCurrencyTitle.length-1) {
          this.outlandCurrencyArr.splice(index, 1)
          this.outlandCurrencyTitle.splice(index, 1)
          this.form.transactionCurrencyOutland.splice(index, 1)
        }
        else {
          let coverValue = this.outlandCurrencyTitle[index+1]
          coverValue = index + '-' + coverValue.split('-')[1]
          this.outlandCurrencyArr.splice(index, 1)
          this.outlandCurrencyTitle.splice(index, 1)
          this.form.transactionCurrencyOutland.splice(index, 1)
          this.outlandCurrencyTitle[index] = coverValue
          this.outlandCurrency(coverValue)
        }
      },
      addGoodsQuality() {
        this.goodsQualityArr.push(
          {
            quality: 'Top'
          }
        )
      },
      deleteGoodsQuality(index) {
        this.goodsQualityArr.splice(index, 1)
        this.form.qualityName.splice(index, 1)
      },
      addPackingWay() {
        this.packingWayArr.push(
          {
            packingWay: 'Auto'
          }
        )
      },
      deletePackingWay(index) {
        this.packingWayArr.splice(index, 1)
        this.form.packingWay.splice(index, 1)
      },
      brandSeries_addBrandSeries() {
        this.form.brandSeriesArr.push(
          this.form.brandSeriesArr[0]
        );
        this.form.inputSeries.push("");
        this.form.brandSeriesMainCategoriesArr.push([{
          value: "",
          subCategoriesArr: [""]
        }])
      },
      brandSeries_deleteSeries(index, row) {
        if (this.form.brandSeriesArr.length === 1) return false;
        this.form.brandSeriesArr.splice(index, 1);
        this.form.brandSeriesMainCategoriesArr.splice(index, 1);
        this.form.inputSeries.splice(index, 1);
      },
      brandSeries_addMainCategoties(index, row) {
        this.form.brandSeriesMainCategoriesArr[index].push({
          value: "",
          subCategoriesArr: [""]
        });
      },
      brandSeries_deleteMainCategoties(rowIndex, itemIndex) {
        if (this.form.brandSeriesMainCategoriesArr[rowIndex].length === 1)
          return false;
        this.form.brandSeriesMainCategoriesArr[rowIndex].splice(itemIndex, 1);
      },
      brandSeries_addSubCategoties(rowIndex, mainIndex) {
        this.form.brandSeriesMainCategoriesArr[rowIndex][mainIndex].subCategoriesArr.push(
          ""
        );
      },
      brandSeries_delSubCategories(rowIndex, mainIndex, subIndex) {
        if (
          this.form.brandSeriesMainCategoriesArr[rowIndex][mainIndex].subCategoriesArr
            .length === 1
        )
          return false;
        this.form.brandSeriesMainCategoriesArr[rowIndex][
          mainIndex
          ].subCategoriesArr.splice(subIndex, 1);
      },
      brandType_addBrandType(index, row) {
        this.form.brandType_msg.mainCategoriesArr.push({
          value: '',
          subCategoriesArr: ['']
        })
      },
      brandType_deleteMainCategoties(index) {
        if (this.form.brandType_msg.mainCategoriesArr.length === 1) return false
        this.form.brandType_msg.mainCategoriesArr.splice(index, 1)
      },
      brandType_addSubCategoties(index) {
        this.form.brandType_msg.mainCategoriesArr[index].subCategoriesArr.push('')
      },
      brandType_delSubCategories(mainIndex, subIndex) {
        if (this.form.brandType_msg.mainCategoriesArr[mainIndex].subCategoriesArr.length === 1) return false
        this.form.brandType_msg.mainCategoriesArr[mainIndex].subCategoriesArr.splice(subIndex, 1)
      },
      brandSpecification_addSpecification() {
        this.form.brandSpecification_msg.SpecificationArr.push(
          this.form.brandSpecification_msg.SpecificationArr[0]
        );
        this.form.specificationInput.push({
          goodSpecificationChinese: '',
          goodSpecificationEnglish: '',
          capacityChinese: '',
          capacityEnglish: '',
          packingUnitChinese: '',
          packingUnitEnglish: '',
        });
      },
      brandSpecification_deleteSpecification(index, row) {
        if (this.form.brandSpecification_msg.SpecificationArr.length === 1)
          return false;
        this.form.brandSpecification_msg.SpecificationArr.splice(index, 1);
        this.form.specificationInput.splice(index, 1);
      },

      brandBox_addBox() {
        this.form.brandBox_msg.boxArr.push(this.form.brandBox_msg.boxArr[0]);
        this.form.boxInput.push({
          boxNo: "",
          boxLength: "",
          boxWidth: "",
          boxHeight: "",
          boxWeight: ""
        });
      },
      brandBox_deleteBox(index, row) {
        if (this.form.brandBox_msg.boxArr.length === 1) return false;
        this.form.brandBox_msg.boxArr.splice(index, 1);
        this.form.boxInput.splice(index, 1);
      },

      brandDiscount_addDiscount() {
        this.form.brandDiscount_msg.discountArr.push(
          this.form.brandDiscount_msg.discountArr[0]
        );
        this.form.discountInput.push({
          orderMin: "",
          orderMax: "",
          decreasingDiscount: 0
        });
      },
      brandDiscount_deleteDiscount(index, row) {
        if (this.form.brandDiscount_msg.discountArr.length === 1) return false;
        this.form.brandDiscount_msg.discountArr.splice(index, 1);
        this.form.discountInput.splice(index, 1);
      },

      showStopContract() {
        this.isStopContractShow = true
      },
      sumbitTerminationContract() {
        const vm = this
        this.$alert('终止合同成功。', '', {
          confirmButtonText: this.$t('table.confirm'),
          showClose: false,
          center: true,
          callback() {
            vm.isStopContractShow = false
          }
        })
      },
      submitEdit() {
        console.log(this.form)
        const vm = this
        this.$alert('编辑成功。', '', {
          confirmButtonText: this.$t('table.confirm'),
          showClose: false,
          center: true,
          callback() {
            vm.$emit('closeDialog')
          }
        })
      }
    },
    mounted() {
//      console.log(this.brandObj)
      request({
        url: '/brand/brandDetail.do',
        method: 'post',
        data: { brandNo: this.brandObj.brandNo }
      }).then((res) => {
//        this.$emit('submitSuccess')
        if (res.errorCode == 0) {
//          console.log(res.data)
          const brandResData = res.data
          this.form.brandNo = brandResData.brandDetail.brandNo
          this.form.chineseName = brandResData.brandDetail.chineseName
          this.form.englishName = brandResData.brandDetail.englishName
          this.form.origin = brandResData.brandDetail.origin
          this.form.brandCompanyName = brandResData.brandDetail.brandCompanyName
          this.form.brandCompanyAddress = brandResData.brandDetail.brandCompanyAddress
          this.form.brandIntroduction = brandResData.brandDetail.brandIntroduction
          this.form.producerName = brandResData.brandDetail.producerName
          this.form.producerAddress = brandResData.brandDetail.producerAddress
          this.form.orderNumBySea = brandResData.brandDetail.orderNumBySea
          this.form.receiptTime = brandResData.brandDetail.receiptTime

          // 处理国内币种
          this.form.transactionCurrencyInland = brandResData.transactionCurrencyInland
          let tempArr1 = []
          this.form.transactionCurrencyInland.forEach((item, index) =>{
            tempArr1.push(`${index}-${item.currencyId-1}`)
          })
          this.inlandCurrencyTitle = tempArr1
          this.viewInlandTable = true
          // 处理国外币种
          this.form.transactionCurrencyOutland = brandResData.transactionCurrencyOutland
          let tempArr2 = []
          this.form.transactionCurrencyOutland.forEach((item, index) =>{
            tempArr2.push(`${index}-${item.currencyId-1}`)
          })
          this.outlandCurrencyTitle = tempArr2
          this.viewOutlandTable = true

          this.form.qualityName = brandResData.brandDetail.qualityName
          this.form.packingWay = brandResData.brandDetail.packingWay

          this.form.inputSeries = brandResData.brandSeries

          // 品牌系列数据处理
          let temp = []
          brandResData.brandSeries.forEach( (item, index, arr) => {
//             brandResData.mainVariety[item.id] // 某个系列下的主品类对象的数组集合arr
            let temp2 = []
             brandResData.mainVariety[item.id].forEach( (sub_item, sub_index, sub_arr) => {
               let obj = {
                 value: sub_item.name,
                 subCategoriesArr:[]
               }
//               this.form.brandSeriesMainCategoriesArr[index].value = sub_item.name

//               this.form.brandSeriesMainCategoriesArr[index].subCategoriesArr = brandResData.childVariety[sub_item.id] // 主品类ID
//             } )
               brandResData.childVariety[sub_item.id].forEach(childItem => {
                obj.subCategoriesArr.push(childItem.name)
               })
               temp2.push(obj)
             })
            temp.push(temp2)
          } )
          this.form.brandSeriesMainCategoriesArr = temp
          this.handleSeriesData = true

          this.form.hasBrandSeries = brandResData.brandDetail.hasBrandSeries

          this.form.specificationInput = brandResData.specificationInput
          this.form.boxInput = brandResData.boxInput
          this.form.discountInput = brandResData.discountInput
          this.form.contract = brandResData.contract
          console.log(this.form)
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('操作失败');
//        this.isSubmitting = false
      })
    }
  }
</script>

<style lang="scss" scoped>
  .mainCategories-wrap {
    display: flex;
    justify-content: flex-start;
  }

  .mainCategories-item {
    width: 450px
  }

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
