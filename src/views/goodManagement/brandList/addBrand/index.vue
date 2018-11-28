<template>
  <div>
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <div class="border1">
        <el-form-item label="品牌序列号" required class="form-row add-brand-row">
          <el-input v-model="form.brandNo" placeholder="请输入品牌序列号"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称（中文）" required class="form-row add-brand-row">
          <el-input v-model="form.chineseName" placeholder="请输入品牌名称（中文）"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称（英文）" required class="form-row add-brand-row">
          <el-input v-model="form.englishName" placeholder="请输入品牌名称（英文）"></el-input>
        </el-form-item>
        <el-form-item label="原产国/产地" required class="form-row add-brand-row">
          <el-input v-model="form.origin" placeholder="请输入原产国/产地"></el-input>
        </el-form-item>
        <el-form-item label="品牌公司名称" required class="form-row add-brand-row">
          <el-input v-model="form.brandCompany" placeholder="请输入品牌公司名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌公司地址" required class="form-row add-brand-row">
          <el-input v-model="form.brandCompanyAddress" placeholder="请输入品牌公司地址"></el-input>
        </el-form-item>
        <el-form-item label="品牌介绍" required class="form-row add-brand-row textareaTitle">
          <el-input type="textarea" v-model="form.brandIntroduction" style="margin: 3px;width: 98%"
                    placeholder="请输入品牌介绍"></el-input>
        </el-form-item>
        <el-form-item label="生产企业名称" required class="form-row add-brand-row">
          <el-input v-model="form.producer" placeholder="请输入生产企业名称"></el-input>
        </el-form-item>
        <el-form-item label="生产企业地址" required class="form-row add-brand-row">
          <el-input v-model="form.producerAddress" placeholder="请输入生产企业地址"></el-input>
        </el-form-item>
        <el-form-item label="海运订货量" required class="form-row add-brand-row">
          <el-input v-model.number="form.orderBySea" placeholder="请输入海运订货量"></el-input>
        </el-form-item>
        <el-form-item label="外汇到账时间" required class="form-row last-form-row add-brand-row">
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="请输入外汇到账时间" v-model="form.forexTime"
                            style="width: 100%;"></el-time-picker>
          </el-col>
          <el-col :span="2"></el-col>
        </el-form-item>
      </div>

      <p style="margin: 20px"></p>

      <el-form-item label="交易币种" required>
        <el-button type="success" icon="el-icon-plus" @click="addInlandCurrencyType()">添加国内交易币种</el-button>
        <p style="margin: 5px"></p>
        <el-table
          :data="inlandCurrencyArr"
          border
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column
            align="center"
            label="类别"
            prop="type">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="币种名称"
            prop="currencyName"
            width="190">
            <template slot-scope="scope">
              <el-form-item label-width="0" style="margin: 0">
                <el-select v-model="form.transactionCurrencyInland[scope.$index]" placeholder="请选择币种">
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
          <el-table-column
            align="center"
            label="币种符号">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.transactionCurrencyInland[scope.$index]] && currencyInformation[form.transactionCurrencyInland[scope.$index]].symbol || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="币种单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.transactionCurrencyInland[scope.$index]] && currencyInformation[form.transactionCurrencyInland[scope.$index]].unit || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteInlandCurrencyType(scope.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <p style="margin: 10px"></p>
        <el-button type="success" icon="el-icon-plus" @click="addOutlandCurrencyType()">添加香港/国外交易币种</el-button>
        <p style="margin: 5px"></p>
        <el-table
          :data="outlandCurrencyArr"
          border
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column
            align="center"
            label="类别"
            prop="type">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="币种名称"
            prop="currencyName"
            width="190">
            <template slot-scope="scope">
              <el-form-item label-width="0" style="margin: 0">
                <el-select v-model="form.transactionCurrencyOutland[scope.$index]" placeholder="请选择币种">
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
          <el-table-column
            align="center"
            label="币种符号">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.transactionCurrencyOutland[scope.$index]] && currencyInformation[form.transactionCurrencyOutland[scope.$index]].symbol || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="币种单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.transactionCurrencyOutland[scope.$index]] && currencyInformation[form.transactionCurrencyOutland[scope.$index]].unit || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
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
        <el-radio-group v-model="form.brandSeries_msg.hasBrandSeries">
          <el-radio :label="true">有品牌系列</el-radio>
          <el-radio :label="false">无品牌系列</el-radio>
        </el-radio-group>
        <el-row>
          <div class="add-btn-wrap">
            <el-button type="success" icon="el-icon-plus" v-if="form.brandSeries_msg.hasBrandSeries"
                       @click="brandSeries_addBrandSeries">添加品牌系列
            </el-button>
          </div>
        </el-row>
        <el-table
          :data="form.brandSeries_msg.brandSeriesArr" border
          v-if="form.brandSeries_msg.hasBrandSeries"
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column
            width="200"
            align="center"
            label="系列名称 "
            prop="seriesName">
            <template slot-scope="scope">
              <el-input v-model="form.brandSeries_msg.inputSeries[scope.$index]" placeholder="请输入品牌系列"></el-input>
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
                     v-for="(mainCategoriesItems,mainCateIndex) in form.brandSeries_msg.mainCategoriesArr">
                  <el-form-item label="主品类">
                    <el-input v-model="form.brandSeries_msg.mainCategoriesArr[mainCateIndex].value"
                              placeholder="请输入主品类"></el-input>
                    <div class="add-btn-wrap" style="margin-top: 5px">
                      <el-button
                        size="mini"
                        type="danger" icon="el-icon-delete"
                        @click="brandSeries_deleteMainCategoties(mainCateIndex)">删除主品类
                      </el-button>
                      <el-button
                        type="success" icon="el-icon-plus"
                        size="mini"
                        @click="brandSeries_addSubCategoties(mainCateIndex)">添加子品类
                      </el-button>
                    </div>
                  </el-form-item>
                  <div class="subCategories-wrap">
                    <div class="subCategories-item"
                         v-for="(subCategoriesItems,subCateIndex) in form.brandSeries_msg.mainCategoriesArr[mainCateIndex].subCategoriesArr">
                      <el-form-item label="子品类">
                        <el-input
                          v-model="form.brandSeries_msg.mainCategoriesArr[mainCateIndex].subCategoriesArr[subCateIndex]"
                          placeholder="请输入子品类">
                          <el-button slot="append" type="danger" icon="el-icon-delete"
                                     @click="brandSeries_delSubCategories(mainCateIndex,subCateIndex)"></el-button>
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
        <el-table border
                  :data="form.brandType_msg.brandTypeArr"
                  class="border2"
                  :style="{ width: brandType_mainCategoriesWrap_width + 2 + 'px', borderBottom: '1px solid #D5D5D5' }">
          <el-table-column prop="typeName" align="center" label="品类" :width="brandType_mainCategoriesWrap_width">
            <template slot-scope="scope">
              <div class="mainCategories-wrap">
                <div class="mainCategories-item"
                     v-for="(mainCategoriesItems,mainCateIndex) in form.brandType_msg.mainCategoriesArr">
                  <el-form-item label="主品类">
                    <el-input v-model="form.brandType_msg.mainCategoriesArr[mainCateIndex].value"
                              placeholder="请输入主品类"></el-input>
                    <div class="add-btn-wrap" style="margin-top: 5px">
                      <el-button
                        size="mini"
                        type="danger" icon="el-icon-delete"
                        @click="brandType_deleteMainCategoties(mainCateIndex)">删除主品类
                      </el-button>
                      <el-button
                        type="success" icon="el-icon-plus"
                        size="mini"
                        @click="brandType_addSubCategoties(mainCateIndex)">添加子品类
                      </el-button>
                    </div>
                  </el-form-item>
                  <div class="subCategories-wrap">
                    <div class="subCategories-item"
                         v-for="(subCategoriesItems,subCateIndex) in form.brandType_msg.mainCategoriesArr[mainCateIndex].subCategoriesArr">
                      <el-form-item label="子品类">
                        <el-input
                          v-model="form.brandType_msg.mainCategoriesArr[mainCateIndex].subCategoriesArr[subCateIndex]"
                          placeholder="请输入子品类">
                          <el-button slot="append" type="danger" icon="el-icon-delete"
                                     @click="brandType_delSubCategories(mainCateIndex,subCateIndex)"></el-button>
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
            <el-button type="success" icon="el-icon-plus" @click="brandSpecification_addSpecification">添加品牌商品规格
            </el-button>
          </div>
        </el-row>
        <el-table border
                  :data="form.brandSpecification_msg.SpecificationArr"
                  class="border2"
                  style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column
            align="center"
            label="商品规格"
            prop="specificationName">
            <el-table-column
              align="center"
              label="中文">
              <template slot-scope="scope">
                <el-input
                  v-model="form.brandSpecification_msg.specificationInput[scope.$index].goodSpecification.chinese"
                  placeholder="例：30ml/支"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <el-input
                  v-model="form.brandSpecification_msg.specificationInput[scope.$index].goodSpecification.english"
                  placeholder="例：30ml/pc"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="容量">
            <el-table-column
              align="center"
              label="中文">
              <template slot-scope="scope">
                <el-input v-model="form.brandSpecification_msg.specificationInput[scope.$index].capacity.chinese"
                          placeholder="例：30毫升"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <el-input v-model="form.brandSpecification_msg.specificationInput[scope.$index].capacity.english"
                          placeholder="例：30ml"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="包装单位">
            <el-table-column
              align="center"
              label="中文">
              <template slot-scope="scope">
                <el-input v-model="form.brandSpecification_msg.specificationInput[scope.$index].packingUnit.chinese"
                          placeholder="例：支"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <el-input v-model="form.brandSpecification_msg.specificationInput[scope.$index].packingUnit.english"
                          placeholder="例：pc"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="brandSpecification_deleteSpecification(scope.$index, '')"></el-button>
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
        <el-table border
                  :data="form.brandBox_msg.boxArr"
                  class="border2"
                  style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column
            align="center"
            width="150"
            label="箱型编号">
            <template slot-scope="scope">
              <el-input v-model="form.brandBox_msg.boxInput[scope.$index].boxNo" placeholder="请输入箱型编号"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            label="长(cm)">
            <template slot-scope="scope">
              <el-input v-model="form.brandBox_msg.boxInput[scope.$index].boxLength" placeholder="请输入长(cm)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            label="宽(cm)">
            <template slot-scope="scope">
              <el-input v-model="form.brandBox_msg.boxInput[scope.$index].boxWidth" placeholder="请输入宽(cm)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="150"
            label="高(cm)">
            <template slot-scope="scope">
              <el-input v-model="form.brandBox_msg.boxInput[scope.$index].boxHeight" placeholder="请输入高(cm)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            label="箱子重量(kgs)">
            <template slot-scope="scope">
              <el-input v-model="form.brandBox_msg.boxInput[scope.$index].boxHeight"
                        placeholder="请输入箱子重量(kgs)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="brandBox_deleteBox(scope.$index, '')"></el-button>
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
        <el-table border
                  :data="form.brandDiscount_msg.discountArr"
                  class="border2"
                  style="width: 100%; border-bottom: 1px solid #D5D5D5">
          <el-table-column
            align="center"
            width="250"
            label="订货区间">
            <template slot-scope="scope">
              <el-col :span="11">
                <el-input v-model.number="form.brandDiscount_msg.discountInput[scope.$index].orderMin"
                          placeholder="区间起订量"></el-input>
              </el-col>
              <el-col :span="2"><span> - </span></el-col>
              <el-col :span="11">
                <el-input v-model.number="form.brandDiscount_msg.discountInput[scope.$index].orderMax"
                          placeholder="区间结束量"></el-input>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            label="降幅折扣 -%">
            <template slot-scope="scope">
              <el-input
                v-model.number="form.brandDiscount_msg.discountInput[scope.$index].decreasingDiscount"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="brandDiscount_deleteDiscount(scope.$index, '')"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <div class="border1">
        <el-form-item label="合作管理" required class="form-row add-brand-row">
          <el-row style="">
            <el-col :span="13">
              <el-date-picker
                style="margin-top: 4px"
                v-model="form.timeRange.timeValue"
                type="datetimerange"
                :picker-options="form.timeRange.pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-checkbox
                style="margin-top: 4px"
                v-model="form.timeRange.autoRenew" border>自动续签
              </el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="品牌状态" required class="form-row last-form-row add-brand-row">
          <el-select v-model="form.brandStatus" placeholder="请选择" style="margin-top: 4px">
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
        <el-button type="primary" @click="onSubmit">保存并提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          brandNo: '',
          chineseName: '',
          englishName: '',
          brandCompany: '',
          brandCompanyAddress: '',
          brandIntroduction: '',
          producer: '',
          producerAddress: '',
          orderBySea: null,
          forexTime: null,
          transactionCurrencyInland: [],
          transactionCurrencyOutland: [],
          qualityName: [],
          packingWay: [],
          brandSeries_msg: {
            hasBrandSeries: true,
            brandSeries: '',
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
          timeRange: {
            timeValue: '',
            pickerOptions: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                  picker.$emit('pick', [start, end])
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date()
                  const start = new Date()
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                  picker.$emit('pick', [start, end])
                }
              }]
            },
            autoRenew: false
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
          RMB: { symbol: '¥', unit: '元' },
          HKD: { symbol: 'HK$', unit: '港元' },
          AUD: { symbol: 'A$', unit: '澳元' },
          GBP: { symbol: '£', unit: '英磅' },
          USD: { symbol: '$', unit: '美元' },
          EUR: { symbol: '€', unit: '欧元' }
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
        // 表单验证规则
        formRules: {}
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
      onSubmit() {
        const vm = this
        this.$alert('新增品牌成功。', '', {
          confirmButtonText: this.$t('table.confirm'),
          showClose: false,
          center: true,
          callback() {
            vm.$emit('closeDialog')
          }
        })
      },
      addInlandCurrencyType() {
        this.inlandCurrencyArr.push(
          {
            type: '国内'
          }
        )
      },
      deleteInlandCurrencyType(index) {
        this.inlandCurrencyArr.splice(index, 1)
        this.form.transactionCurrencyInland.splice(index, 1)
      },
      addOutlandCurrencyType() {
        this.outlandCurrencyArr.push(
          {
            type: '香港/国外'
          }
        )
      },
      deleteOutlandCurrencyType(index) {
        this.outlandCurrencyArr.splice(index, 1)
        this.form.transactionCurrencyOutland.splice(index, 1)
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
        this.form.brandSeries_msg.brandSeriesArr.push(this.form.brandSeries_msg.brandSeriesArr[0])
        this.form.brandSeries_msg.inputSeries.push('')
      },
      brandSeries_deleteSeries(index, row) {
        if (this.form.brandSeries_msg.brandSeriesArr.length === 1) return false
        this.form.brandSeries_msg.brandSeriesArr.splice(index, 1)
        this.form.brandSeries_msg.inputSeries.splice(index, 1)
      },
      brandSeries_addMainCategoties(index, row) {
        this.form.brandSeries_msg.mainCategoriesArr.push({
          value: '',
          subCategoriesArr: ['']
        })
      },
      brandSeries_deleteMainCategoties(index) {
        if (this.form.brandSeries_msg.mainCategoriesArr.length === 1) return false
        this.form.brandSeries_msg.mainCategoriesArr.splice(index, 1)
      },
      brandSeries_addSubCategoties(index) {
        this.form.brandSeries_msg.mainCategoriesArr[index].subCategoriesArr.push('')
      },
      brandSeries_delSubCategories(mainIndex, subIndex) {
        if (this.form.brandSeries_msg.mainCategoriesArr[mainIndex].subCategoriesArr.length === 1) return false
        this.form.brandSeries_msg.mainCategoriesArr[mainIndex].subCategoriesArr.splice(subIndex, 1)
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
        this.form.brandSpecification_msg.SpecificationArr.push(this.form.brandSpecification_msg.SpecificationArr[0])
        this.form.brandSpecification_msg.specificationInput.push({
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
        })
      },
      brandSpecification_deleteSpecification(index, row) {
        if (this.form.brandSpecification_msg.SpecificationArr.length === 1) return false
        this.form.brandSpecification_msg.SpecificationArr.splice(index, 1)
        this.form.brandSpecification_msg.specificationInput.splice(index, 1)
      },
      brandBox_addBox() {
        this.form.brandBox_msg.boxArr.push(this.form.brandBox_msg.boxArr[0])
        this.form.brandBox_msg.boxInput.push({
          boxNo: '',
          boxLength: '',
          boxWidth: '',
          boxHeight: '',
          boxWeight: ''
        })
      },
      brandBox_deleteBox(index, row) {
        if (this.form.brandBox_msg.boxArr.length === 1) return false
        this.form.brandBox_msg.boxArr.splice(index, 1)
        this.form.brandBox_msg.boxInput.splice(index, 1)
      },
      brandDiscount_addDiscount() {
        this.form.brandDiscount_msg.discountArr.push(this.form.brandDiscount_msg.discountArr[0])
        this.form.brandDiscount_msg.discountInput.push({
          orderMin: '',
          orderMax: '',
          decreasingDiscount: 0
        })
      },
      brandDiscount_deleteDiscount(index, row) {
        if (this.form.brandDiscount_msg.discountArr.length === 1) return false
        this.form.brandDiscount_msg.discountArr.splice(index, 1)
        this.form.brandDiscount_msg.discountInput.splice(index, 1)
      }
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
