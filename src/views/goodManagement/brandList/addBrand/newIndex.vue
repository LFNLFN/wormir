<template>
  <div class="add-brand-index-vue">
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <h2>基础信息</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="品牌序列号" prop="brandNo" class="form-row add-brand-row">
          <el-input v-model.trim="form.brandNo" placeholder="请输入品牌序列号"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="品牌名称（英文）" prop="englishName" class="form-row add-brand-row no-border-right">
              <el-input v-model.trim="form.englishName" placeholder="请输入品牌名称（英文）"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌名称（中文）" prop="chineseName" class="form-row add-brand-row">
              <el-input v-model.trim="form.chineseName" placeholder="请输入品牌名称（中文）"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="品牌公司名称" prop="brandCompanyName" class="form-row add-brand-row no-border-right">
              <el-input v-model.trim="form.brandCompanyName" placeholder="请输入品牌公司名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="电话" prop="brandCompanyPhone" class="form-row add-brand-row">
              <el-input v-model.trim="form.brandCompanyPhone" placeholder="请输入品牌公司的所在国联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="品牌公司地址" prop="brandCompanyAddress" class="form-row add-brand-row">
          <el-input v-model.trim="form.brandCompanyAddress" placeholder="请输入品牌公司地址"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="15">
            <el-form-item label="生产企业名称" prop="producerName" class="form-row add-brand-row no-border-right">
              <el-input v-model.trim="form.producerName" placeholder="请输入生产企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="电话" prop="producerPhone" class="form-row add-brand-row">
              <el-input v-model.trim="form.producerPhone" placeholder="请输入生产企业的所在国联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="生产企业地址" prop="producerAddress" class="form-row add-brand-row border-bottom">
          <el-input v-model.trim="form.producerAddress" placeholder="请输入生产企业地址"></el-input>
        </el-form-item>
        <el-form-item label="原产国/产地" prop="origin" class="border1 no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 80%;margin: 4px">
            <el-table-column align="center" label="英文">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="form.origin[scope.$index].originEnglish"
                  placeholder="请输入原产国英文名称"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="中文">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="form.origin[scope.$index].originChinese"
                  placeholder="请输入原产国中文名称"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click=""
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>

      <h2>商品信息</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="品牌商品分类设置" prop="categotiesSetting" class="border1 no-border-bottom"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="系列名称">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="form.categotiesSetting[scope.$index].seriesName"
                  placeholder="若无系列名请输入“其他”"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="主品类">
              <template slot-scope="scope">
                <el-select
                  v-model.trim="form.categotiesSetting[scope.$index].mainCategoties"
                  placeholder="请选择品类"
                >
                  <el-option
                    v-for="item in form.mainCategotiesArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="子品类">
              <template slot-scope="scope">
                <el-select
                  v-model.trim="form.categotiesSetting[scope.$index].subCategoties"
                  placeholder="请选择子品类"
                >
                  <el-option
                    v-for="item in form.subCategotiesArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click=""
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="品牌商品规格设置" prop="specificationSetting" class="border1 no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="商品规格">
              <el-table-column align="center" label="中文">
                <template slot-scope="scope">
                  <el-input
                    v-model.trim="form.specificationSetting[scope.$index].goodSpecificationChinese"
                    placeholder="例：30ml/支"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="英文">
                <template slot-scope="scope">
                  <el-input
                    v-model.trim="form.specificationSetting[scope.$index].goodSpecificationEnglish"
                    placeholder="例：30ml"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="容量">
              <el-table-column align="center" label="中文">
                <template slot-scope="scope">
                  <el-input
                    v-model.trim="form.specificationSetting[scope.$index].capacityChinese"
                    placeholder="例：30毫升"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="英文">
                <template slot-scope="scope">
                  <el-input
                    v-model.trim="form.specificationSetting[scope.$index].capacityEnglish"
                    placeholder="例：30ml"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="包装单位">
              <el-table-column align="center" label="中文">
                <template slot-scope="scope">
                  <el-input
                    v-model.trim="form.specificationSetting[scope.$index].packingUnitChinese"
                    placeholder="例：支"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="英文">
                <template slot-scope="scope">
                  <el-input
                    v-model.trim="form.specificationSetting[scope.$index].packingUnitEnglish"
                    placeholder="例：pcs"
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
                  @click=""
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>

      <h2>易货信息</h2>
      <div class="border1 form-error-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="空运国际物流天数" prop="airDeliverDays" class="form-row add-brand-row no-border-right">
              <el-input v-model.trim="form.airDeliverDays" placeholder="请输入整数" style="width: 160px">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="海运国际物流天数" prop="seaDeliverDays" class="form-row add-brand-row">
              <el-input v-model.trim="form.seaDeliverDays" placeholder="请输入整数" style="width: 160px">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="border-bottom">
          <el-col :span="12">
            <el-form-item label="中断订货补偿率" prop="compensationRate" class="form-row add-brand-row no-border-right">
              <el-input v-model.trim="form.compensationRate" placeholder="请输入数字" style="width: 160px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="并单最低货量标准" prop="minMergeCounts" class="form-row add-brand-row">
              <el-input v-model.trim="form.minMergeCounts" placeholder="请输入整数" style="width: 160px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="转海运起订标准" prop="minBySea" class="border-left border-right"
                      style="padding: 3px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 65%;margin: 4px">
            <el-table-column align="center" label="一般贸易">
              <template slot-scope="scope">
                <el-input v-model.trim="form.minBySea[scope.$index].oneChannelminBySea1" placeholder="请输入整数"
                          style="width: 160px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="跨境贸易">
              <template slot-scope="scope">
                <el-input v-model.trim="form.minBySea[scope.$index].oneChannelminBySea2" placeholder="请输入整数"
                          style="width: 160px"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="品牌运输方式" prop="transportation" class="border-left border-right"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-checkbox-group v-model="transportation" @change="transportationChange" style="margin: 0 5px">
            <el-checkbox :label="1" border>By Air</el-checkbox>
            <el-checkbox :label="2" border>By Sea</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="品牌包装设置" prop="packingSetting" class="border-left border-right"
                      style="padding: 3px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 65%;margin: 4px">
            <el-table-column align="center" label="一般贸易">
              <template slot-scope="scope">
                <el-input v-model.trim="form.packingSetting[scope.$index].packing1" placeholder="例：Standard Packing"
                          style="width: 160px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="跨境贸易">
              <template slot-scope="scope">
                <el-input v-model.trim="form.packingSetting[scope.$index].packing2" placeholder="例：Carton"
                          style="width: 160px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click=""
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="品牌国际付款设置" prop="paymentSetting" class="border-left border-right"
                      style="padding: 3px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{}]"
            class="no-border-right no-border-bottom"
            style="width: 65%;margin: 4px">
            <el-table-column align="center" label="一般贸易">
              <template slot-scope="scope">
                <el-input v-model.trim="form.paymentSetting[scope.$index].payment1" placeholder="例：By T/T"
                          style="width: 160px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="跨境贸易">
              <template slot-scope="scope">
                <el-input v-model.trim="form.paymentSetting[scope.$index].payment2" placeholder="例：T/T"
                          style="width: 160px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click=""
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="品牌箱型设置" prop="brandBoxSetting" class="border-left border-right"
                      style="padding: 3px 0;margin-bottom: 0">
          <el-table
            border
            :data="form.brandBoxSetting"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="箱型编号/Carton Type" width="180">
              <template slot-scope="scope">
                <el-input v-model.trim="form.brandBoxSetting[scope.$index].boxNo" placeholder="请输入箱型分类的编号"
                          style="width: 150px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="长（cm）">
              <template slot-scope="scope">
                <el-input v-model.trim="form.brandBoxSetting[scope.$index].length" placeholder="请输入数字"
                          style="width: 120px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="宽（cm）">
              <template slot-scope="scope">
                <el-input v-model.trim="form.brandBoxSetting[scope.$index].width" placeholder="请输入数字"
                          style="width: 120px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="高（cm）">
              <template slot-scope="scope">
                <el-input v-model.trim="form.brandBoxSetting[scope.$index].height" placeholder="请输入数字"
                          style="width: 120px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="重量（kgs）">
              <template slot-scope="scope">
                <el-input v-model.trim="form.brandBoxSetting[scope.$index].weight" placeholder="请输入数字"
                          style="width: 120px"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteBrandBox(form.brandBoxSetting, scope.$index)"
                ></el-button>
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  size="mini"
                  @click="addBrandBox(form.brandBoxSetting)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="品牌起订/降幅设置" prop="discountTargetObj" class="border-left border-right"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-checkbox-group v-model="discountTargetObj" @change="discountTargetObjChange" style="margin: 0 5px">
            <el-checkbox :label="1" border>提供一般贸易商品</el-checkbox>
            <el-checkbox :label="2" border>提供跨境贸易商品</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="" prop="discountRange1ForFX" class="border-left border-right"
                      style="padding: 5px 0;margin-bottom: 0">
          <div v-if="discountRange1Visible">
            <el-table
              border
              :data="form.discountRange1ForFX"
              :header-cell-class-name="discountHeaderClass1"
              :header-cell-style="discountHeaderStyle1"
              class="no-border-right no-border-bottom"
              style="width: 95%;margin: 0 4px">
              <el-table-column align="center" label="一般贸易">
                <el-table-column align="center" label="分销订货起订量">
                  <el-table-column align="center" label="货量区间">
                    <el-table-column align="center" label="hide1" width="200px">
                      <template slot-scope="scope">
                        <span>{{ form.discountRange1ForFX[scope.$index].min }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="hide2" width="40px">
                      <template slot-scope="scope"><span>至</span></template>
                    </el-table-column>
                    <el-table-column align="center" label="hide3" width="200px">
                      <template slot-scope="scope">
                        <el-input v-model.trim="form.discountRange1ForFX[scope.$index].max"
                                  @change="discountItemMaxChange(form.discountRange1ForFX)"
                                  :disabled="form.discountRange1ForFX[0].min/1==0 || form.discountRange1ForFX[scope.$index].disabled"
                                  placeholder="请输入整数"
                                  style="width: 160px">
                        </el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" prop="inputHeader" :render-header="discount1FXLabel">
                  <el-table-column align="center" label="降幅">
                    <template slot-scope="scope">
                      <span v-if="scope.$index == 0">{{ form.discountRange1ForFX[scope.$index].decreasing }}%</span>
                      <el-input v-else
                                v-model.trim="form.discountRange1ForFX[scope.$index].decreasing"
                                :disabled="form.discountRange1ForFX[scope.$index].disabled"
                                @change="discountItemMaxChange(form.discountRange1ForFX)"
                                placeholder="请输入大于上一项的%"
                                style="width: 240px">
                        <template slot="append">%</template>
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click="deleteDiscountRange(form.discountRange1ForFX, scope.$index)"
                        v-show="!form.discountRange1ForFX[scope.$index].disabled"
                      ></el-button>
                      <el-button
                        type="success"
                        icon="el-icon-plus"
                        size="mini"
                        @click="addDiscountRange(form.discountRange1ForFX)"
                        v-show="!form.discountRange1ForFX[scope.$index].disabled"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              border
              :data="form.discountRange1ForDL"
              :header-cell-style="discountHeaderStyle2"
              class="no-border-top no-border-right no-border-bottom"
              style="width: 95%;margin: 0 4px">
              <el-table-column align="center" label="独立订货起订量">
                <el-table-column align="center" label="货量区间">
                  <el-table-column align="center" label="hide1" width="200px">
                    <template slot-scope="scope">
                      <span>{{ form.discountRange1ForDL[scope.$index].min }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="hide2" width="40px">
                    <template slot-scope="scope"><span>至</span></template>
                  </el-table-column>
                  <el-table-column align="center" label="hide3" width="200px">
                    <template slot-scope="scope">
                      <el-input v-model.trim="form.discountRange1ForDL[scope.$index].max"
                                @change="discountItemMaxChange(form.discountRange1ForDL)"
                                :disabled="form.discountRange1ForDL[0].min/1==0 || form.discountRange1ForDL[scope.$index].disabled"
                                placeholder="请输入整数"
                                style="width: 160px"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" prop="inputHeader" :render-header="discount1DLLabel">
                <el-table-column align="center" label="降幅">
                  <template slot-scope="scope">
                    <span v-if="scope.$index == 0">{{ form.discountRange1ForDL[scope.$index].decreasing }}%</span>
                    <el-input v-else
                              v-model.trim="form.discountRange1ForDL[scope.$index].decreasing"
                              :disabled="form.discountRange1ForDL[scope.$index].disabled"
                              @change="discountItemMaxChange(form.discountRange1ForDL)"
                              placeholder="请输入大于上一项的%"
                              style="width: 240px">
                      <template slot="append">%</template>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="deleteDiscountRange(form.discountRange1ForDL, scope.$index)"
                      v-show="!form.discountRange1ForDL[scope.$index].disabled"
                    ></el-button>
                    <el-button
                      type="success"
                      icon="el-icon-plus"
                      size="mini"
                      @click="addDiscountRange(form.discountRange1ForDL)"
                      v-show="!form.discountRange1ForDL[scope.$index].disabled"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="discountRange2Visible">
            <el-table
              border
              :data="form.discountRange2ForFX"
              :header-cell-class-name="discountHeaderClass1"
              :header-cell-style="discountHeaderStyle1"
              class="no-border-right no-border-bottom"
              style="width: 95%;margin: 0 4px">
              <el-table-column align="center" label="跨境贸易">
                <el-table-column align="center" label="分销订货起订量">
                  <el-table-column align="center" label="货量区间">
                    <el-table-column align="center" label="hide1" width="200px">
                      <template slot-scope="scope">
                        <span>{{ form.discountRange2ForFX[scope.$index].min }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="hide2" width="40px">
                      <template slot-scope="scope"><span>至</span></template>
                    </el-table-column>
                    <el-table-column align="center" label="hide3" width="200px">
                      <template slot-scope="scope">
                        <el-input v-model.trim="form.discountRange2ForFX[scope.$index].max"
                                  @change="discountItemMaxChange(form.discountRange2ForFX)"
                                  :disabled="form.discountRange2ForFX[0].min/1==0 || form.discountRange2ForFX[scope.$index].disabled"
                                  placeholder="请输入整数"
                                  style="width: 160px"></el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
                <el-table-column align="center" prop="inputHeader" :render-header="discount2FXLabel">
                  <el-table-column align="center" label="降幅">
                    <template slot-scope="scope">
                      <span v-if="scope.$index == 0">{{ form.discountRange2ForFX[scope.$index].decreasing }}%</span>
                      <el-input v-else
                                v-model.trim="form.discountRange2ForFX[scope.$index].decreasing"
                                :disabled="form.discountRange2ForFX[scope.$index].disabled"
                                @change="discountItemMaxChange(form.discountRange2ForFX)"
                                placeholder="请输入大于上一项的%"
                                style="width: 240px">
                        <template slot="append">%</template>
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click="deleteDiscountRange(form.discountRange2ForFX, scope.$index)"
                        v-show="!form.discountRange2ForFX[scope.$index].disabled"
                      ></el-button>
                      <el-button
                        type="success"
                        icon="el-icon-plus"
                        size="mini"
                        @click="addDiscountRange(form.discountRange2ForFX)"
                        v-show="!form.discountRange2ForFX[scope.$index].disabled"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table>
            <el-table
              border
              :data="form.discountRange2ForDL"
              :header-cell-style="discountHeaderStyle2"
              class="no-border-top no-border-right no-border-bottom"
              style="width: 95%;margin: 0 4px">
              <el-table-column align="center" label="独立订货起订量">
                <el-table-column align="center" label="货量区间">
                  <el-table-column align="center" label="hide1" width="200px">
                    <template slot-scope="scope">
                      <span>{{ form.discountRange2ForDL[scope.$index].min }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="hide2" width="40px">
                    <template slot-scope="scope"><span>至</span></template>
                  </el-table-column>
                  <el-table-column align="center" label="hide3" width="200px">
                    <template slot-scope="scope">
                      <el-input v-model.trim="form.discountRange2ForDL[scope.$index].max"
                                @change="discountItemMaxChange(form.discountRange2ForDL)"
                                :disabled="form.discountRange2ForDL[0].min/1==0 || form.discountRange2ForDL[scope.$index].disabled"
                                placeholder="请输入整数"
                                style="width: 160px"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" prop="inputHeader" :render-header="discount2DLLabel">
                <el-table-column align="center" label="降幅">
                  <template slot-scope="scope">
                    <span v-if="scope.$index == 0">{{ form.discountRange2ForDL[scope.$index].decreasing }}%</span>
                    <el-input v-else
                              v-model.trim="form.discountRange2ForDL[scope.$index].decreasing"
                              :disabled="form.discountRange2ForDL[scope.$index].disabled"
                              @change="discountItemMaxChange(form.discountRange2ForDL)"
                              placeholder="请输入大于上一项的%"
                              style="width: 240px">
                      <template slot="append">%</template>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="deleteDiscountRange(form.discountRange2ForDL, scope.$index)"
                      v-show="!form.discountRange2ForDL[scope.$index].disabled"
                    ></el-button>
                    <el-button
                      type="success"
                      icon="el-icon-plus"
                      size="mini"
                      @click="addDiscountRange(form.discountRange2ForDL)"
                      v-show="!form.discountRange2ForDL[scope.$index].disabled"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>

        </el-form-item>
      </div>

      <h2>交易信息</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="交易账号设置" prop="bankInfo" class="border-left border-right"
                      style="padding: 3px 0;margin-bottom: 0">
          <el-table
            border
            :data="form.bankInfo"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="SWIFT Code">
              <template slot-scope="scope">
                <el-input v-model.trim="form.bankInfo[scope.$index].swiftCode" placeholder="请输入品牌商交易银行的SWIFT Code"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="银行名称">
              <template slot-scope="scope">
                <el-input v-model.trim="form.bankInfo[scope.$index].bankName" placeholder="请输入品牌商交易银行的英文名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="银行地址">
              <template slot-scope="scope">
                <el-input v-model.trim="form.bankInfo[scope.$index].bankAddress" placeholder="请输入品牌商交易银行的英文地址"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="交易币种设置" prop="currencyInfo" class="border-left border-right"
                      style="padding: 3px 0;margin-bottom: 0">
          <el-table
            border
            :data="[{},{}]"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="币种类别">
              <template slot-scope="scope">
                <span v-if="scope.$index==0">采购币种</span>
                <span v-if="scope.$index==1">供货币种</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="币种名称">
              <template slot-scope="scope">
                <el-select
                  v-if="scope.$index==0"
                  v-model="procurementCurrency"
                  placeholder="请选择币种">
                  <el-option label="人民币" :value="2"></el-option>
                  <el-option label="美元" :value="6"></el-option>
                  <el-option label="欧元" :value="5"></el-option>
                  <el-option label="英镑" :value="4"></el-option>
                  <el-option label="澳元" :value="3"></el-option>
                  <el-option label="港币" :value="1"></el-option>
                </el-select>
                <el-select
                  v-if="scope.$index==1"
                  v-model="supplyCurrency"
                  placeholder="请选择币种">
                  <el-option label="人民币" :value="2"></el-option>
                  <el-option label="美元" :value="6"></el-option>
                  <el-option label="欧元" :value="5"></el-option>
                  <el-option label="英镑" :value="4"></el-option>
                  <el-option label="澳元" :value="3"></el-option>
                  <el-option label="港币" :value="1"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="币种符号">
              <template slot-scope="scope">
                <span v-if="scope.$index==0">{{ form.currencyCategories[procurementCurrency-1].symbol }}</span>
                <span v-if="scope.$index==1">{{ form.currencyCategories[supplyCurrency-1].symbol }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="币种单位">
              <template slot-scope="scope">
                <span v-if="scope.$index==0">{{ form.currencyCategories[procurementCurrency-1].unit }}</span>
                <span v-if="scope.$index==1">{{ form.currencyCategories[supplyCurrency-1].unit }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>

      <h2>上传信息</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="文件上传设置" prop="" class="border1" style="margin-bottom: 0">
          <div class="forLayout">
            <div class="uploadItem" v-for="(item, index) in uploadTemplateData" :key="index">
              <div class="title fake-table-head border-left">{{ item.title }}</div>
              <el-row class="border-bottom">
                <el-col :span="8">
                  <el-form-item label="上传品名数量" prop="" class="form-row add-brand-row no-border-left no-border-right">
                    <el-input v-model.trim.number="item.uploadNameNum" @change="changeItemUploadNameNum" placeholder="请输入个数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16" align="right">
                  <el-form-item label="" prop="" class="form-row add-brand-row no-border-right">
                    <div style="line-height: 35px; padding-right: 10px">
                      <el-button v-show="false" type="primary">查看上传目录</el-button>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24" align="left" class="border-left">
                  <el-form-item label="" prop="" class="form-row add-brand-row no-border-right" style="padding-top: 15px">
                    <div v-if="editItemUploadNameNum" v-show="!itemUploadNameNumIs0">
                      <el-upload
                        class="upload-demo"
                        ref="upload"
                        :limit="item.uploadNameNum"
                        multiple
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="filePreview" :on-remove="fileRemove" :on-exceed="fileExceed" :before-upload="fileBeforeUpload" :on-change="fileOnChange"
                        :file-list="item.fileList"
                        :auto-upload="false">
                        <div slot="tip" class="el-upload__tip">{{ item.uploadTip }}</div>
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(index)">上传到服务器</el-button>
                      </el-upload>
                    </div>
                    <div v-show="itemUploadNameNumIs0">请输入上传品名数量</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
      </div>

      <h2>合作信息</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="OCC系统使用设置" class="border-left border-right"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-radio-group v-model="flow" @change="flowChange">
            <el-radio :label="1" border>全部使用常规流程</el-radio>
            <el-radio :label="2" border>部分使用特殊流程</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="useSpecialFlow" label="特殊流程项目" prop="specialProject" class="border-left border-right"
                      style="padding: 3px 0;margin-bottom: 0">
          <el-checkbox-group v-model="specialProject">
            <el-checkbox :label="1">Upload Inventory</el-checkbox>
            <el-checkbox :label="2">Arrange Outbound</el-checkbox>
            <el-checkbox :label="3">Upload Outbound Information</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="合作管理" prop="cooperationManagementData" class="border-left border-right"
                      style="padding: 3px 0;margin-bottom: 0">
          <el-table
            border
            :data="form.cooperationManagementData"
            class="no-border-right no-border-bottom cooperationManagementTable"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="合同编号">
              <template slot-scope="scope">
                <el-input v-model.trim="form.cooperationManagementData[scope.$index].contractNo" placeholder="请输入编号"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="合同属性" width="95px">
              <template slot-scope="scope">
                <span>首次签订</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开始时间">
              <template slot-scope="scope">
                <el-date-picker v-model="form.cooperationManagementData[scope.$index].startTime" @change="timeChange" type="date" placeholder="选择时间" style="width: 140px"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column align="center" label="结束时间">
              <template slot-scope="scope">
                <el-date-picker v-model="form.cooperationManagementData[scope.$index].endTime" @change="timeChange" type="date" placeholder="选择时间" style="width: 140px"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column align="center" label="合同状态">
              <template slot-scope="scope">
                <el-select
                  v-model="contractStatus"
                  @change="contractStatusChange"
                  placeholder="请选择状态">
                  <el-option label="自动续签" :value="1"></el-option>
                  <el-option label="到期终止" :value="2"></el-option>
                  <el-option label="提前终止" :value="3"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" label="品牌状态" width="95px">
              <template slot-scope="scope">
                <span v-if="brandStatus == 1">正常供货</span>
                <span v-if="brandStatus == 2">停止供货</span>
                <span v-if="brandStatus == 3">待定</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            v-if="false"
            border
            :data="[{}]"
            :show-header="false"
            :span-method="terminationReasonSpanMethod"
            :cell-class-name="makeFakeTableHeadClass"
            class="no-border-right no-border-bottom no-border-top cooperationManagementTable"
            style="width: 95%;margin: -4px 4px 4px">
            <el-table-column align="center" label="合同编号">
              <template slot-scope="scope">
                <span>提前终止原因</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="合同属性" width="95px">
              <template slot-scope="scope">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="50字内说明提前终止原因"
                  v-model="terminationReason">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开始时间"/>
            <el-table-column align="center" label="结束时间"/>
            <el-table-column align="center" label="合同状态"/>
            <el-table-column align="center" label="品牌状态" width="95px"/>
          </el-table>
        </el-form-item>
      </div>


      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="onSubmit" :loading="isSubmitting">保存并提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import brandBasicsMsg from './formData/brandBasicsMsg'
  import goodsMsg from './formData/goodsMsg'
  import deliverMsg from './formData/deliverMsg'
  import moneyMsg from './formData/moneyMsg'
  import uploadMsg from './formData/uploadMsg'
  import cooperationMsg from './formData/cooperationMsg'

  import brandBasicsMsgRules from './formRules/brandBasicsMsgRules'
  import goodsMsgRules from './formRules/goodsMsgRules'
  import deliverMsgRules from './formRules/deliverMsgRules'
  import moneyMsgRules from './formRules/moneyMsgRules'
  import cooperationMsgRules from './formRules/cooperationMsgRules'

  import { transportationChange, discountTargetObjChange, addBrandBox, deleteBrandBox, discountHeaderClass1, discountHeaderStyle1, addDiscountRange, deleteDiscountRange, discountHeaderStyle2, discount1FXLabel, discount1DLLabel, discount2FXLabel, discount2DLLabel,discountItemMaxChange } from './formData/deliverMsg'

  import { getCurrencyInfo } from './formData/moneyMsg'

  import { getCooperationData, flowChange, makeFakeTableHeadClass, terminationReasonSpanMethod, contractStatusChange, timeChange } from './formData/cooperationMsg'

  import { submitUpload, fileRemove, filePreview, getUploadMsg, fileExceed, fileBeforeUpload, fileOnChange, changeItemUploadNameNum } from './formData/uploadMsg'

  export default {
    data() {
      return {
        form: {},
        transportation: [], // 用于易货信息的checkbox
        discountTargetObj: [], // 用于易货信息的checkbox
        discountRange1Visible: false, // 用于易货信息的折扣表格
        discountRange2Visible: false, // 用于易货信息的折扣表格
        procurementCurrency: 6, // 用于交易信息的交易币种表格
        supplyCurrency: 6, // 用于交易信息的交易币种表格
        flow: 1, // 用于合作信息的流程radio
        useSpecialFlow: false, // 用于合作信息的流程checkbox
        specialProject: [], // 用于合作信息的被选中的特殊项目
        contractStatus: null, // 用于合作信息的合同状态
        terminationReason: null, // 用于合作信息的提前终止原因
        brandStatus: 3, // 用于合作信息确定品牌状态
        uploadTemplateData: [
          { title: '成分配比表', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+成分配表；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
          { title: '危害识别表', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+危害识别表；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
          { title: '标签文件', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+标签文件；文件格式：pdf./jpg./jpeg./png.', fileList: [] },
          { title: '化妆品备案批文', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+化妆品备案批文；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
          { title: 'MSDS（英文）', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+MSDS（英文）；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
          { title: 'MSDS（中文）', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+MSDS（中文）；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
          { title: '进口化妆品安全性承诺书', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：品牌名称+进口化妆品安全性承诺书；文件格式：doc./docx./pdf./jpg./jpeg./png.', fileList: [] },
        ], // 用于上传信息的视图响应
        editItemUploadNameNum: true, // 用于上传信息的视图响应
        itemUploadNameNumIs0: true, // 用于上传信息的视图响应
        formRules: {},
        isSubmitting: false
      }
    },
    methods: {
      transportationChange, discountTargetObjChange, addBrandBox, deleteBrandBox, discountHeaderStyle1, discountHeaderClass1,
      addDiscountRange, deleteDiscountRange, discountHeaderStyle2, discount1FXLabel, discount2FXLabel, discount1DLLabel,
      discount2DLLabel, discountItemMaxChange,
      getCurrencyInfo, getCooperationData, flowChange, makeFakeTableHeadClass, terminationReasonSpanMethod, contractStatusChange, timeChange,
      submitUpload, fileRemove, filePreview, getUploadMsg, fileExceed, fileBeforeUpload, fileOnChange, changeItemUploadNameNum,
      onSubmit() {
        this.isSubmitting = true;

        // 提交数据预处理
        this.getCurrencyInfo()
        this.getCooperationData()
        this.getUploadMsg()
        console.log(this.form)

        this.$refs["form"].validate(valid => {
          if (valid) {
            request({
              url: '/brand/createBrand.do',
              method: "post",
              data: this.form
            })
              .then((res) => {
                if (res.errorCode == 0) {
                  this.$emit("submitSuccess");
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
    },
    created() {
      Object.assign(this.form, brandBasicsMsg, goodsMsg, deliverMsg, moneyMsg, uploadMsg, cooperationMsg)
      Object.assign(this.formRules, brandBasicsMsgRules, goodsMsgRules, deliverMsgRules, moneyMsgRules, cooperationMsgRules)
    }
  }
</script>

<style lang="scss" scoped>
  .displayNone {
    display: none;
  }

  .mainCategories-wrap {
    display: flex;
    justify-content: flex-start;
  }

  .mainCategories-item .el-form-item {
    width: 350px;
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

  .upload-tip-color {
    color: #606266;
    font-size: 12px;
  }

  .forLayout {
    padding-right: 10px;
  }

  .uploadItem {
    border-right: 1px solid #D5D5D5;
  }
  .uploadItem:not(:nth-of-type(1)) {
    margin: 20px 0;
    border-top: 1px solid #D5D5D5;
  }
</style>


<!--有待解决的问题-->
<!--首次签订的判断依据是什么？-->
