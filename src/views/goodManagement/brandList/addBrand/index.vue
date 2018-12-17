<template>
  <div>
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <div class="border1 form-error-inline">
        <el-form-item label="品牌序列号" prop="brandNo" class="form-row add-brand-row">
          <el-input v-model="form.brandNo" placeholder="请输入品牌序列号"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称（中文）" prop="chineseName" class="form-row add-brand-row">
          <el-input v-model="form.chineseName" placeholder="请输入品牌名称（中文）"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称（英文）" prop="englishName" class="form-row add-brand-row">
          <el-input v-model="form.englishName" placeholder="请输入品牌名称（英文）"></el-input>
        </el-form-item>
        <el-form-item label="原产国/产地" prop="origin" class="form-row add-brand-row">
          <el-input v-model="form.origin" placeholder="请输入原产国/产地"></el-input>
        </el-form-item>
        <el-form-item label="品牌公司名称" prop="brandCompanyName" class="form-row add-brand-row">
          <el-input v-model="form.brandCompanyName" placeholder="请输入品牌公司名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌公司地址" prop="brandCompanyAddress" class="form-row add-brand-row">
          <el-input v-model="form.brandCompanyAddress" placeholder="请输入品牌公司地址"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌介绍"
          prop="brandIntroduction"
          class="form-row add-brand-row textareaTitle"
        >
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.brandIntroduction"
            style="margin: 3px;width: 98%"
            placeholder="请输入品牌介绍"
          ></el-input>
        </el-form-item>
        <el-form-item label="生产企业名称" prop="producerName" class="form-row add-brand-row">
          <el-input v-model="form.producerName" placeholder="请输入生产企业名称"></el-input>
        </el-form-item>
        <el-form-item label="生产企业地址" prop="producerAddress" class="form-row add-brand-row">
          <el-input v-model="form.producerAddress" placeholder="请输入生产企业地址"></el-input>
        </el-form-item>
        <el-form-item label="海运订货量" prop="orderNumBySea" class="form-row add-brand-row">
          <el-input v-model.number="form.orderNumBySea" placeholder="请输入海运订货量"></el-input>
        </el-form-item>
        <el-form-item
          label="交易账号"
          prop="tradeAccount"
          class="form-row add-brand-row last-form-row few-input-item"
        >
          <el-input v-model.trim.lazy="form.tradeAccount.swfitCode" placeholder="请输入SWFIT Code"></el-input>
          <el-input v-model.trim.lazy="form.tradeAccount.bankName" placeholder="请输入银行名称"></el-input>
          <el-input v-model.trim.lazy="form.tradeAccount.bankAddress" placeholder="请输入银行地址"></el-input>
        </el-form-item>
      </div>

      <p style="margin: 20px"></p>

      <el-form-item label="交易币种" prop="transactionCurrencyInland">
        <div class="add-btn-wrap">
          <el-button type="success" icon="el-icon-plus" @click="addInlandCurrencyType()">添加国内交易币种</el-button>
        </div>
        <el-table
          :data="inlandCurrencyArr"
          border
          class="border2 vali-table"
          :cell-style="{height: '80px'}"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
        >
          <el-table-column align="center" label="类别" width="120" prop="type">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="币种名称" prop="currencyName" width="200">
            <template slot-scope="scope">
              <el-form-item label-width="0" prop="transactionCurrencyInland" style="margin: 0">
                <el-select
                  v-model="form.transactionCurrencyInland[scope.$index]"
                  placeholder="请选择币种"
                >
                  <el-option label="人民币" value="RMB"></el-option>
                  <el-option label="港币" value="HKD"></el-option>
                  <el-option label="澳元" value="AUD"></el-option>
                  <el-option label="英镑" value="GBP"></el-option>
                  <el-option label="美元" value="USD"></el-option>
                  <el-option label="欧元" value="EUR"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100" label="币种符号">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.transactionCurrencyInland[scope.$index]] && currencyInformation[form.transactionCurrencyInland[scope.$index]].symbol || '自动读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100" label="币种单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.transactionCurrencyInland[scope.$index]] && currencyInformation[form.transactionCurrencyInland[scope.$index]].unit || '自动读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteInlandCurrencyType(scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-btn-wrap" style="margin-top: 7px">
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="addOutlandCurrencyType()"
          >添加香港/国外交易币种</el-button>
        </div>
        <el-table
          :data="outlandCurrencyArr"
          border
          class="border2 vali-table"
          :cell-style="{height: '80px'}"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
        >
          <el-table-column align="center" label="类别" width="120" prop="type">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="币种名称" prop="currencyName" width="200">
            <template slot-scope="scope">
              <el-form-item label-width="0" prop="transactionCurrencyOutland" style="margin: 0">
                <el-select
                  v-model="form.transactionCurrencyOutland[scope.$index]"
                  placeholder="请选择币种"
                >
                  <el-option label="人民币" value="RMB"></el-option>
                  <el-option label="港币" value="HKD"></el-option>
                  <el-option label="澳元" value="AUD"></el-option>
                  <el-option label="英镑" value="GBP"></el-option>
                  <el-option label="美元" value="USD"></el-option>
                  <el-option label="欧元" value="EUR"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100" label="币种符号">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.transactionCurrencyOutland[scope.$index]] && currencyInformation[form.transactionCurrencyOutland[scope.$index]].symbol || '自动读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100" label="币种单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.transactionCurrencyOutland[scope.$index]] && currencyInformation[form.transactionCurrencyOutland[scope.$index]].unit || '自动读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteOutlandCurrencyType(scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品品质" required>
        <div class="add-btn-wrap">
          <el-button type="success" icon="el-icon-plus" @click="addGoodsQuality()">添加商品品质</el-button>
        </div>
        <el-table
          :data="goodsQualityArr"
          border
          class="border2 vali-table"
          :cell-style="{height: '80px'}"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
        >
          <el-table-column align="center" label="品质名称" prop="quality">
            <template slot-scope="scope">
              <el-form-item label-width=0 prop="qualityName" style="margin: 0">
                <el-input placeholder="请填写品质名称" v-model.trim.lazy="form.qualityName[scope.$index]"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteGoodsQuality(scope.$index)">删除</el-button>
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
          class="border2 vali-table"
          :cell-style="{height: '80px'}"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
        >
          <el-table-column align="center" label="包装方式" prop="packingWay">
            <template slot-scope="scope">
              <el-form-item label-width=0 prop="packingWay" style="margin: 0">
                <el-input placeholder="请填写包装方式" v-model.trim.lazy="form.packingWay[scope.$index]"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deletePackingWay(scope.$index)">删除</el-button>
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
            <el-button
              type="success"
              icon="el-icon-plus"
              v-if="form.hasBrandSeries"
              @click="brandSeries_addBrandSeries"
            >添加品牌系列</el-button>
          </div>
        </el-row>
        <el-table
          :data="form.brandSeriesArr"
          border
          v-if="form.hasBrandSeries"
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
        >
          <el-table-column width="200" align="center" label="系列名称 " prop="seriesName">
            <template slot-scope="scope">
              <el-form-item label-width=0 prop="inputSeries" style="margin: 0">
                <el-input
                  v-model.trim="form.inputSeries[scope.$index]"
                  placeholder="请输入品牌系列"
                ></el-input>
              </el-form-item>
              <div class="add-btn-wrap" style="margin-top: 20px;">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="brandSeries_deleteSeries(scope.$index, scope.row)"
                >删除系列</el-button>
              </div>
              <div class="add-btn-wrap">
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  size="mini"
                  @click="brandSeries_addMainCategoties(scope.$index, scope.row)"
                >添加主品类</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="品类" :width="brandSeries_mainCategoriesWrap_width">
            <template slot-scope="scope">
              <div class="mainCategories-wrap">
                <div
                  class="mainCategories-item"
                  v-for="(mainCategoriesItems,mainCateIndex) in form.brandSeriesMainCategoriesArr[scope.$index]"
                >
                  <el-form-item label="主品类">
                    <el-input
                      v-model="form.brandSeriesMainCategoriesArr[scope.$index][mainCateIndex].value"
                      placeholder="请输入主品类"
                    ></el-input>
                    <div class="add-btn-wrap" style="margin-top: 5px;">
                      <div>
                           <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        @click="brandSeries_deleteMainCategoties(scope.$index, mainCateIndex)"
                      >删除主品类</el-button>
                      </div>
                     <div style="margin-top: 5px;">
                        <el-button
                        type="success"
                        icon="el-icon-plus"
                        size="mini"
                        @click="brandSeries_addSubCategoties(scope.$index, mainCateIndex)"
                      >添加子品类</el-button>
                     </div>
                    </div>
                  </el-form-item>
                  <div class="subCategories-wrap">
                    <div
                      class="subCategories-item"
                      v-for="(subCategoriesItems,subCateIndex) in form.brandSeriesMainCategoriesArr[scope.$index][mainCateIndex].subCategoriesArr"
                    >
                      <el-form-item label="子品类">
                        <el-input
                          v-model="form.brandSeriesMainCategoriesArr[scope.$index][mainCateIndex].subCategoriesArr[subCateIndex]"
                          placeholder="请输入子品类"
                        >
                          <el-button
                            slot="append"
                            type="danger"
                            icon="el-icon-delete"
                            @click="brandSeries_delSubCategories(scope.$index, mainCateIndex, subCateIndex)"
                          ></el-button>
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
      <el-form-item label="品牌类型" required>
        <el-row>
          <div class="add-btn-wrap">
            <el-button type="success" icon="el-icon-plus" @click="brandType_addBrandType">添加品牌类型</el-button>
          </div>
        </el-row>
        <el-table
          border
          :data="form.brandType_msg.brandTypeArr"
          class="border2"
          :style="{ width: brandType_mainCategoriesWrap_width + 2 + 'px', borderBottom: '1px solid #D5D5D5' }"
        >
          <el-table-column
            prop="typeName"
            align="center"
            label="品类"
            :width="brandType_mainCategoriesWrap_width"
          >
            <template slot-scope="scope">
              <div class="mainCategories-wrap">
                <div
                  class="mainCategories-item"
                  v-for="(mainCategoriesItems,mainCateIndex) in form.brandType_msg.mainCategoriesArr"
                >
                  <el-form-item label="主品类">
                    <el-input
                      v-model="form.brandType_msg.mainCategoriesArr[mainCateIndex].value"
                      placeholder="请输入主品类"
                    ></el-input>
                    <div class="add-btn-wrap" style="margin-top: 5px">
                        <el-button
                          size="mini"
                          type="danger"
                          icon="el-icon-delete"
                          @click="brandType_deleteMainCategoties(mainCateIndex)"
                        >删除主品类</el-button>
                      <el-button
                        type="success"
                        icon="el-icon-plus"
                        size="mini"
                        @click="brandType_addSubCategoties(mainCateIndex)"
                      >添加子品类</el-button>
                    </div>
                  </el-form-item>
                  <div class="subCategories-wrap">
                    <div
                      class="subCategories-item"
                      v-for="(subCategoriesItems,subCateIndex) in form.brandType_msg.mainCategoriesArr[mainCateIndex].subCategoriesArr"
                    >
                      <el-form-item label="子品类">
                        <el-input
                          v-model="form.brandType_msg.mainCategoriesArr[mainCateIndex].subCategoriesArr[subCateIndex]"
                          placeholder="请输入子品类"
                        >
                          <el-button
                            slot="append"
                            type="danger"
                            icon="el-icon-delete"
                            @click="brandType_delSubCategories(mainCateIndex,subCateIndex)"
                          ></el-button>
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
      <el-form-item label="品牌商品规格" required>
        <el-row>
          <div class="add-btn-wrap">
            <el-button
              type="success"
              icon="el-icon-plus"
              @click="brandSpecification_addSpecification"
            >添加品牌商品规格</el-button>
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
                  v-model="form.brandSpecification_msg.specificationInput[scope.$index].goodSpecification.chinese"
                  placeholder="例：30ml/支"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input
                  v-model="form.brandSpecification_msg.specificationInput[scope.$index].goodSpecification.english"
                  placeholder="例：30ml/pc"
                ></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="容量">
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input
                  v-model="form.brandSpecification_msg.specificationInput[scope.$index].capacity.chinese"
                  placeholder="例：30毫升"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input
                  v-model="form.brandSpecification_msg.specificationInput[scope.$index].capacity.english"
                  placeholder="例：30ml"
                ></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="包装单位">
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input
                  v-model="form.brandSpecification_msg.specificationInput[scope.$index].packingUnit.chinese"
                  placeholder="例：支"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input
                  v-model="form.brandSpecification_msg.specificationInput[scope.$index].packingUnit.english"
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
            <el-button type="success" icon="el-icon-plus" @click="brandBox_addBox">添加品牌箱子</el-button>
          </div>
        </el-row>
        <el-table
          border
          :data="form.brandBox_msg.boxArr"
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5"
        >
          <el-table-column align="center" width="150" label="箱型编号">
            <template slot-scope="scope">
              <el-input
                v-model="form.brandBox_msg.boxInput[scope.$index].boxNo"
                placeholder="请输入箱型编号"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="长(cm)">
            <template slot-scope="scope">
              <el-input
                v-model="form.brandBox_msg.boxInput[scope.$index].boxLength"
                placeholder="请输入长(cm)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="宽(cm)">
            <template slot-scope="scope">
              <el-input
                v-model="form.brandBox_msg.boxInput[scope.$index].boxWidth"
                placeholder="请输入宽(cm)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="高(cm)">
            <template slot-scope="scope">
              <el-input
                v-model="form.brandBox_msg.boxInput[scope.$index].boxHeight"
                placeholder="请输入高(cm)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" label="箱子重量(kgs)">
            <template slot-scope="scope">
              <el-input
                v-model="form.brandBox_msg.boxInput[scope.$index].boxHeight"
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
                  v-model.number="form.brandDiscount_msg.discountInput[scope.$index].orderMin"
                  placeholder="区间起订量"
                ></el-input>
              </el-col>
              <el-col :span="2">
                <span>-</span>
              </el-col>
              <el-col :span="11">
                <el-input
                  v-model.number="form.brandDiscount_msg.discountInput[scope.$index].orderMax"
                  placeholder="区间结束量"
                ></el-input>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" label="降幅折扣 -%">
            <template slot-scope="scope">
              <el-input
                v-model.number="form.brandDiscount_msg.discountInput[scope.$index].decreasingDiscount"
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
      <div class="border1">
        <el-form-item label="合作管理" required class="form-row add-brand-row">
          <el-row style>
            <el-col :span="13">
              <el-date-picker
                style="margin-top: 4px"
                v-model="form.timeRange.timeValue"
                type="datetimerange"
                :picker-options="form.timeRange.pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-checkbox style="margin-top: 4px" v-model="form.timeRange.autoRenew" border>自动续签</el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="品牌状态" required class="form-row last-form-row add-brand-row">
          <el-select v-model="form.brandStatus" placeholder="请选择" style="margin-top: 4px">
            <el-option
              v-for="item in brandStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="onSubmit">保存并提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    var validateTradeAccount = (rule, value, callback) => {
      let vali = true;
      for (var key in value) {
        if (!value[key]) {
          vali = false;
          break;
        }
      }
      if (vali) {
        callback();
      } else {
        callback(new Error("请完整填写交易账号信息！"));
      }
    };

    var validateInlandCurrencyType = (rule, value, callback) => {
      let valiNull = value.some((item, index, arr) => {
        return item == false;
      });
      let valiRepeat = value.some((item, index, arr) => {
        if (index >= arr.length - 1) {
          return false;
        } else {
          return arr[index] == arr[index + 1];
        }
      });
      if (valiNull || valiRepeat) {
        callback(new Error("国内交易币种必须填写且不能重复！"));
      } else {
        callback();
      }
    };

    var validateOutlandCurrencyType = (rule, value, callback) => {
      let valiNull = value.some((item, index, arr) => {
        return item == false;
      });
      let valiRepeat = value.some((item, index, arr) => {
        if (index >= arr.length - 1) {
          return false;
        } else {
          return arr[index] == arr[index + 1];
        }
      });
      if (valiNull || valiRepeat) {
        callback(new Error("国外交易币种必须填写且不能重复！"));
      } else {
        callback();
      }
    };

    var validateQualityName = (rule, value, callback) => {
      let valiNull = value.some((item, index, arr) => {
        return item == false;
      });
      let valiRepeat = value.some((item, index, arr) => {
        if (index >= arr.length - 1) {
          return false;
        } else {
          return arr[index] == arr[index + 1];
        }
      });
      if (valiNull || valiRepeat) {
        callback(new Error("品质名称必须填写且不能重复！"));
      } else {
        callback();
      }
    };

    var validatePackingWay = (rule, value, callback) => {
      let valiNull = value.some((item, index, arr) => {
        return item == false;
      });
      let valiRepeat = value.some((item, index, arr) => {
        if (index >= arr.length - 1) {
          return false;
        } else {
          return arr[index] == arr[index + 1];
        }
      });
      if (valiNull || valiRepeat) {
        callback(new Error("包装方式必须填写且不能重复！"));
      } else {
        callback();
      }
    };

    var validateInputSeries = (rule, value, callback) => {
      let valiNull = value.some((item, index, arr) => {
        return item == false;
      });
      let valiRepeat = value.some((item, index, arr) => {
        if (index >= arr.length - 1) {
          return false;
        } else {
          return arr[index] == arr[index + 1];
        }
      });
      if (valiNull || valiRepeat) {
        callback(new Error("品牌系列必须填写且不能重复！"));
      } else {
        callback();
      }
    };

    var validateInputSeries = (rule, value, callback) => {
      let valiNull = value.some((item, index, arr) => {
        return item == false;
      });
      let valiRepeat = value.some((item, index, arr) => {
        if (index >= arr.length - 1) {
          return false;
        } else {
          return arr[index] == arr[index + 1];
        }
      });
      if (valiNull || valiRepeat) {
        callback(new Error("品牌系列必须填写且不能重复！"));
      } else {
        callback();
      }
    };

    var validateBrandSeriesMainCategoriesArr = (rule, value, callback) => {
      let valiNull = value.some((item, index, arr) => {
        return item.value == false;
      });
      let valiRepeat = value.some((item, index, arr) => {
        if (index >= arr.length - 1) {
          return false;
        } else {
          return arr[index].value == arr[index + 1].value;
        }
      });
      let valiSubArrNull = value.some((item, index, arr) => {
        return item.subCategoriesArr.some((item, index, arr) => {
          if (arr[index]) {
            return false;
          } else {
            return true;
          }
       });
      });
      if (valiNull || valiRepeat) {
        callback(new Error("主品类必须填写且不能重复！"));
      } else {
        if (valiSubArrNull) { callback(new Error("子品类必须填写！")); }
        else { callback(); }
      }
    };

    return {
      form: {
        brandNo: "",
        chineseName: "",
        englishName: "",
        brandCompanyName: "",
        brandCompanyAddress: "",
        brandIntroduction: "",
        producerName: "",
        producerAddress: "",
        orderNumBySea: null,
        tradeAccount: {
          swfitCode: null,
          bankName: null,
          bankAddress: null
        },
        forexTime: null,
        transactionCurrencyInland: [],
        transactionCurrencyOutland: [],
        qualityName: [],
        packingWay: [],
        brandSeries_msg: {
          hasBrandSeries: 1,
          brandSeries: "",
          inputSeries: [""],
          mainCategoriesArr: [
            {
              value: "",
              subCategoriesArr: [""]
            }
          ],
          brandSeriesArr: [{ seriesName: " " }],
          mainCategoriesItem_width: 750
        },
        hasBrandSeries: 1,
        inputSeries: [""],
        brandSeriesMainCategoriesArr: [
          [{
            value: "",
            subCategoriesArr: [""]
          }]
        ],
        brandSeriesArr: [{ seriesName: " " }],

        brandType_msg: {
          brandTypeArr: [{ typeName: " " }],
          mainCategoriesArr: [
            {
              value: "",
              subCategoriesArr: [""]
            }
          ],
          mainCategoriesItem_width: 600
        },
        brandSpecification_msg: {
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
        brandBox_msg: {
          boxArr: [{ boxName: " " }],
          boxInput: [
            {
              boxNo: "",
              boxLength: "",
              boxWidth: "",
              boxHeight: "",
              boxWeight: ""
            }
          ]
        },
        brandDiscount_msg: {
          discountArr: [{ discountName: " " }],
          discountInput: [
            {
              orderMin: "",
              orderMax: "",
              decreasingDiscount: 0
            }
          ]
        },
        timeRange: {
          timeValue: "",
          pickerOptions: {
            shortcuts: [
              {
                text: "最近一周",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近一个月",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近三个月",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit("pick", [start, end]);
                }
              }
            ]
          },
          autoRenew: false
        },
        brandStatus: ""
      },
      brandStatusOptions: [
        {
          value: "1",
          label: "正常供货"
        },
        {
          value: "2",
          label: "停止供货"
        }
      ],
      currencyInformation: {
        RMB: { symbol: "￥", unit: "元" },
        HKD: { symbol: "HK$", unit: "港元" },
        AUD: { symbol: "A$", unit: "澳元" },
        GBP: { symbol: "£", unit: "英磅" },
        USD: { symbol: "$", unit: "美元" },
        EUR: { symbol: "€", unit: "欧元" }
      },
      emptyArr: [
        {
          type: { inland: "国内", outland: "香港/国外" },
          quality: "Top",
          packingWay: "Auto"
        }
      ],
      inlandCurrencyArr: [
        {
          type: "国内"
        }
      ],
      outlandCurrencyArr: [
        {
          type: "香港/国外"
        }
      ],
      goodsQualityArr: [
        {
          quality: "Top"
        }
      ],
      packingWayArr: [
        {
          packingWay: "Auto"
        }
      ],
      // 表单验证规则
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
        tradeAccount: [
          { validator: validateTradeAccount, required: true, trigger: "blur" }
        ],
        transactionCurrencyInland: [
          {
            validator: validateInlandCurrencyType,
            required: true,
            trigger: "change"
          }
        ],
        transactionCurrencyOutland: [
          {
            validator: validateOutlandCurrencyType,
            required: true,
            trigger: "change"
          }
        ],
        qualityName: [
          { validator: validateQualityName, required: true, trigger: "change" }
        ],
        packingWay: [
          { validator: validatePackingWay, required: true, trigger: "change" }
        ],
        inputSeries: [
          { validator: validateInputSeries, required: true, trigger: "blur" }
        ],
//        brandSeriesMainCategoriesArr: [
//          { validator: validateBrandSeriesMainCategoriesArr, required: true, trigger: "blur" }
//        ],
      }
    };
  },
  computed: {
    brandSeries_mainCategoriesWrap_width() {
      return (
        this.form.brandSeries_msg.mainCategoriesItem_width *
        this.form.brandSeries_msg.mainCategoriesArr.length
      );
    },
    brandType_mainCategoriesWrap_width() {
      return (
        this.form.brandType_msg.mainCategoriesItem_width *
        this.form.brandType_msg.mainCategoriesArr.length
      );
    }
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log("前端验证ok");
          return false;
          request({
            url: "/channel/createChannel.do",
            method: "post",
            data: this.form
          })
            .then(() => {
              this.$emit("submitSuccess");
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
    addInlandCurrencyType() {
      this.inlandCurrencyArr.push({
        type: "国内"
      });
    },
    deleteInlandCurrencyType(index) {
      this.inlandCurrencyArr.splice(index, 1);
      this.form.transactionCurrencyInland.splice(index, 1);
    },
    addOutlandCurrencyType() {
      this.outlandCurrencyArr.push({
        type: "香港/国外"
      });
    },
    deleteOutlandCurrencyType(index) {
      this.outlandCurrencyArr.splice(index, 1);
      this.form.transactionCurrencyOutland.splice(index, 1);
    },
    addGoodsQuality() {
      this.goodsQualityArr.push({
        quality: "Top"
      });
    },
    deleteGoodsQuality(index) {
      this.goodsQualityArr.splice(index, 1);
      this.form.qualityName.splice(index, 1);
    },
    addPackingWay() {
      this.packingWayArr.push({
        packingWay: "Auto"
      });
    },
    deletePackingWay(index) {
      this.packingWayArr.splice(index, 1);
      this.form.packingWay.splice(index, 1);
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
        value: "",
        subCategoriesArr: [""]
      });
    },
    brandType_deleteMainCategoties(index) {
      if (this.form.brandType_msg.mainCategoriesArr.length === 1) return false;
      this.form.brandType_msg.mainCategoriesArr.splice(index, 1);
    },
    brandType_addSubCategoties(index) {
      this.form.brandType_msg.mainCategoriesArr[index].subCategoriesArr.push(
        ""
      );
    },
    brandType_delSubCategories(mainIndex, subIndex) {
      if (
        this.form.brandType_msg.mainCategoriesArr[mainIndex].subCategoriesArr
          .length === 1
      )
        return false;
      this.form.brandType_msg.mainCategoriesArr[
        mainIndex
      ].subCategoriesArr.splice(subIndex, 1);
    },
    brandSpecification_addSpecification() {
      this.form.brandSpecification_msg.SpecificationArr.push(
        this.form.brandSpecification_msg.SpecificationArr[0]
      );
      this.form.brandSpecification_msg.specificationInput.push({
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
      });
    },
    brandSpecification_deleteSpecification(index, row) {
      if (this.form.brandSpecification_msg.SpecificationArr.length === 1)
        return false;
      this.form.brandSpecification_msg.SpecificationArr.splice(index, 1);
      this.form.brandSpecification_msg.specificationInput.splice(index, 1);
    },
    brandBox_addBox() {
      this.form.brandBox_msg.boxArr.push(this.form.brandBox_msg.boxArr[0]);
      this.form.brandBox_msg.boxInput.push({
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
      this.form.brandBox_msg.boxInput.splice(index, 1);
    },
    brandDiscount_addDiscount() {
      this.form.brandDiscount_msg.discountArr.push(
        this.form.brandDiscount_msg.discountArr[0]
      );
      this.form.brandDiscount_msg.discountInput.push({
        orderMin: "",
        orderMax: "",
        decreasingDiscount: 0
      });
    },
    brandDiscount_deleteDiscount(index, row) {
      if (this.form.brandDiscount_msg.discountArr.length === 1) return false;
      this.form.brandDiscount_msg.discountArr.splice(index, 1);
      this.form.brandDiscount_msg.discountInput.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.mainCategories-wrap {
  display: flex;
  justify-content: flex-start;
}

.mainCategories-item {
  width: 450px;
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
