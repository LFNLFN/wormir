<template>
  <div class="add-good-index-vue">
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <h2>基础信息</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="商品品牌" prop="brandMsg" class="border1 border-top no-border-bottom"
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
        <el-form-item label="商品序列号" prop="" class="form-row add-brand-row no-margin-bottom">
          <el-row><el-col align="center"><span>{{ form.goodsNo || '系统自动生成，编号规则为：品牌序列号+生成年月日+两位顺序号（如01、02…...）' }}</span></el-col></el-row>
        </el-form-item>
        <el-form-item label="原产国/产地" prop="" class="form-row add-brand-row no-border-bottom no-margin-bottom">
          <el-row>
            <el-col :span="12" align="center" class="border-right" style="height: 35px"><span>{{ form.productionPlaceEnglish || '选品牌后显示英文名称' }}</span></el-col>
            <el-col :span="12" align="center" style="height: 35px"><span>{{ form.productionPlaceChinese || '选完品牌后显示中文名称' }}</span></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="商品编号" prop="goodsNoForBrand" class="form-row add-brand-row border-bottom no-margin-bottom">
          <el-input v-model.trim="form.goodsNoForBrand" placeholder="输入品牌商使用的商品编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="" class="border1 no-border-top no-border-bottom"
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
        <el-form-item label="商品条形码" prop="barcode" class="form-row add-brand-row border-bottom no-margin-bottom">
          <el-input v-model.trim="form.barcode" placeholder="输入商品条形码（Bar Code）"></el-input>
        </el-form-item>
        <el-form-item label="商品组成" prop="makeUpOfGoods" class="border1 border-bottom no-border-top"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-radio-group v-model="form.makeUpOfGoods" @change="makeUpOfGoodsChange">
            <el-radio :label="1">单品</el-radio>
            <el-radio :label="2">套组</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="goodsImg" label="商品图片" class="border1 border-bottom no-border-top"
                      style="padding: 20px 0;margin-bottom: 0">
          <el-upload
            action=""
            :http-request="uploadGoodsImgAction"
            :limit="1"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <img v-if="form.goodsImg" :src="form.goodsImg" class="avatar" style="width: 146px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogGoodImgVisible" append-to-body>
            <img width="100%" :src="form.goodsImg" alt="">
          </el-dialog>
        </el-form-item>
      </div>

      <h2>商品设置</h2>
      <div class="border1 form-error-inline">
        <el-form-item label="销售属性设置" prop="propertyOfSale" class="border-left border-right border-top"
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
                      :ingredientArr.sync="form.ingredientArr"
                      :hazardArr.sync="form.hazardArr"
                      :tagArr.sync="form.tagArr"
                      :officialArr.sync="form.officialArr"
                      :MSDSenArr.sync="form.MSDSenArr"
                      :MSDSzhArr.sync="form.MSDSzhArr"
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

        <el-form-item label="申报要素表设置" prop="declarationSetting" class="border1 no-border-top no-border-bottom" style="padding: 5px 0;margin-bottom: 0">
          <declarationTable
            :declarationSetting.sync="form.declarationSetting" :brandChineseName.sync="form.brandChineseName"
            :declarationSpecification.sync="form.declarationSpecification" :declarationNum.sync="form.declarationNum"
            :specificationId.sync="specificationId" :specificationOptions.sync="specificationOptions"
            :makeUpOfGoods.sync="form.makeUpOfGoods" :propertyOfSale.sync="form.propertyOfSale"
          ></declarationTable>
        </el-form-item>
        <el-form-item label="" prop="" class="border1 no-border-top" style="padding: 5px 0;margin-bottom: 0">
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
                  <el-form-item label="" prop="declarationSpecification" class="no-border" style="padding: 5px 0;margin-bottom: 0">
                    <el-input v-for="item in form.declarationSpecification"
                              v-model.trim="item.text"
                              placeholder="输入相同品名构成规格，例：10ml/支；30ml/支" clearable
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="hide-head">
                <template slot-scope="scope">
                  <el-form-item v-if="form.declarationNum" label="" prop="declarationNum" class="no-border" style="padding: 5px 0;margin-bottom: 0">
                    <el-input
                      v-model.trim="form.declarationNum"
                      placeholder="输入构成数量，例：3支/套" clearable
                      :disabled="propertyOfSaleStatus"
                    ></el-input>
                  </el-form-item>
                  <span v-else>不需填写</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="商品规格" v-if="!propertyOfSaleStatus">
              <template slot-scope="scope">
                {{ getSpecification() }}
              </template>
            </el-table-column>
          </el-table>
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
              :packageSpecificationData.sync="form.packageSpecificationData"></packageSpecificationTable>
          </el-form-item>
        </el-form-item>
      </div>

      <div class="for-senior-executive" v-if="userLevel==1">
        <h2>合作设置</h2>
        <div class="border1 form-error-inline" style="border-top: 2px solid #d5d5d5">
          <el-form-item v-if="form.makeUpOfGoods" label="商品属性设置" prop="" class="border1 no-border-bottom no-border-top"
                        style="padding: 5px 0;margin-bottom: 0">
            <el-radio-group v-model="form.propertyOfGoods">
              <el-radio :label="1" :disabled="form.makeUpOfGoods==2">新品</el-radio>
              <el-radio :label="2" :disabled="form.makeUpOfGoods==2">常规</el-radio>
              <el-radio :label="3" :disabled="form.makeUpOfGoods==1">促销</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.propertyOfGoods==3" label="" prop="" class="border1 no-border-bottom no-border-top"
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
            <el-form-item v-if="form.sublicense==1" label="" prop="availableSalesChannel" style="margin-bottom: 0">
              <div>可售渠道：<el-checkbox-group v-model="form.availableSalesChannel" style="display: inline-block">
                <el-checkbox label="A级渠道" border></el-checkbox>
                <el-checkbox label="B级渠道" border></el-checkbox>
                <el-checkbox label="C级渠道" border></el-checkbox>
                <el-checkbox label="D级渠道" border></el-checkbox>
                <el-checkbox label="分销渠道" border></el-checkbox>
              </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="" prop="sublicenseChannelMsg" style="margin-bottom: 0">
              <el-table v-if="form.sublicense==2"
                        border :data="sublicenseChannelMsg"
                        class="no-border-right no-border-bottom"
                        style="width: 80%;margin: 4px">
                <el-table-column align="center" label="渠道号">
                  <template slot-scope="scope">
                    <el-select
                      v-model="sublicenseChannelMsg[scope.$index]"
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
                    <span>{{ sublicenseChannelMsg[scope.$index][sublicenseChannelMsg[scope.$index].channelNo] || '选择后显示' }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" size="mini"
                               @click="deleteSublicenseChannel(scope.$index)"></el-button>
                    <el-button type="success" icon="el-icon-plus" size="mini"
                               @click="addSublicenseChannel(scope.$index)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form-item>
          <el-form-item label="价格信息设置" prop="" class="border1 no-border-top" style="padding: 5px 0;margin-bottom: 0">
            <el-table
              border
              :data="priceMsgTableData"
              class="no-border-right no-border-bottom"
              style="width: 95%;margin: 4px"
              :header-cell-style="priceTableHeadStyle"
            :span-method="priceMsgSpanMethod">
              <el-table-column align="center" label="交易项目" prop="projectTitle"/>
              <el-table-column align="center" label="币种类别">
                <template slot-scope="scope">
                  <el-form-item label="" prop="" style="margin-bottom: 0">
                    <el-select
                      v-model="priceType[scope.$index]"
                      placeholder="选择币种类别"
                      value-key="currencyId"
                      @change="priceTypeChange"
                      :disabled="form.propertyOfSale[0]==2&&form.propertyOfSale.length==1 && (scope.$index==3 || scope.$index==5)"
                    >
                      <el-option
                        v-for="(item,index) in currencyCategories"
                        :key="item.currencyId"
                        :label="item.name"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="币种符号" width="100">
                <template slot-scope="scope">
                  {{ priceType[scope.$index].symbol || '选择后显示' }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="币种单位" width="100">
                <template slot-scope="scope">
                  {{ priceType[scope.$index].unit || '选择后显示' }}
                </template>
              </el-table-column>

              <el-table-column align="center" label="价格类型">
                <el-table-column align="center" label="hide" width="90" prop="priceTypeCol"/>
                <el-table-column align="center" label="hide" prop="orderNumRange"/>
              </el-table-column>

              <el-table-column align="center" label="金额">
                <el-table-column align="center" label="hide" width="120px">
                <template slot-scope="scope">
                  <el-form-item label="" prop="" style="margin-bottom: 0">
                    <el-input v-model.trim="priceArr[scope.$index]" placeholder="输入数字" style="width: 100%"
                              @change="priceArrChange"
                              :disabled="form.propertyOfSale[0]==2&&form.propertyOfSale.length==1 && (scope.$index>=3 && scope.$index<=6)"></el-input>
                  </el-form-item>
                </template>
                </el-table-column>
                <el-table-column align="center" label="hide" width="100px">
                  <template slot-scope="scope">
                    <span>{{ priceType[scope.$index].symbol&&priceArr[scope.$index] ? priceType[scope.$index].symbol + priceArr[scope.$index] : '输入后显示'}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" label="折扣">
                <template slot-scope="scope">
                  <el-form-item label="" prop="discountArr" style="margin-bottom: 0">
                    <span v-if="scope.$index==0 || scope.$index==13">0%</span>
                    <el-input v-else v-model.trim.number="discountArr[scope.$index]" placeholder="输入数字" style="width: 100%"
                              @change="discountArrChange"
                              :disabled="form.propertyOfSale[0]==2&&form.propertyOfSale.length==1 && (scope.$index>=3 && scope.$index<=6)">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                  <div style="color: darkgray">{{ discountTips(scope.$index) }}</div>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              border
              :data="[{},{}]"
              class="no-border-right no-border-bottom"
              style="width: 95%;margin: 4px"
            >
              <el-table-column align="center" label="项目" class-name="fake-table-head" width="220px">
                <template slot-scope="scope">
                  <span v-if="scope.$index==0">一般贸易</span>
                  <span v-if="scope.$index==1">跨境贸易</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="分销订货起订折扣">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.$index==0 && form.propertyOfSale[0]==1 && form.propertyOfSale.length==1 || form.propertyOfSale.length==2" label="" prop="minOrderNumDiscountFX1" style="margin-bottom: 0">
                    <el-input v-model.trim.number="form.minOrderNumDiscountFX1" placeholder="输入数字" style="width: 160px"
                              :disabled="form.propertyOfSale[0]==2&&form.propertyOfSale.length==1">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item v-else-if="scope.$index==1 && form.propertyOfSale[0]==2 && form.propertyOfSale.length==1 || form.propertyOfSale.length==2" label="" prop="minOrderNumDiscountFX2" style="margin-bottom: 0">
                    <el-input v-model.trim.number="form.minOrderNumDiscountFX2" placeholder="输入数字" style="width: 160px"
                              :disabled="form.propertyOfSale[0]==1&&form.propertyOfSale.length==1">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                  <span v-else>不需填写</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="独立订货起订折扣">
                <template slot-scope="scope">
                  <el-form-item v-if="scope.$index==0 && form.propertyOfSale[0]==1&&form.propertyOfSale.length==1 || form.propertyOfSale.length==2" label="" prop="minOrderNumDiscountDL1" style="margin-bottom: 0">
                    <el-input v-model.trim.number="form.minOrderNumDiscountDL1" placeholder="输入数字" style="width: 160px"
                              :disabled="form.propertyOfSale[0]==2&&form.propertyOfSale.length==1">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item v-else-if="scope.$index==1 && form.propertyOfSale[0]==2&&form.propertyOfSale.length==1 || form.propertyOfSale.length==2" label="" prop="minOrderNumDiscountDL2" style="margin-bottom: 0">
                    <el-input v-model.trim.number="form.minOrderNumDiscountDL2" placeholder="输入数字" style="width: 160px"
                              :disabled="form.propertyOfSale[0]==1&&form.propertyOfSale.length==1">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                  <span v-else>不需填写</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="商品状态设置" prop="" class="border1 no-border-top" style="padding: 5px 0;margin-bottom: 0">
            <el-select
              v-model="form.goodStatus"
              placeholder="选择商品状态"
            >
              <el-option :key="1" label="正常销售" :value="1"></el-option>
              <el-option :key="2" label="停止销售" :value="2"></el-option>
            </el-select>
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
          makeUpOfGoods: null,
          propertyOfSale: [1],
          specificationEnglish: null,
          capacityChinese: null,
          capacityEnglish: null,
          packageUnitChinese: null,
          packageUnitEnglish: null,
          netWeight: null,
          grossWeight: null,
          availableSalesChannel: [],
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
              goodsNum: 1,
              packageUnitZh: null,
              packageUnitEn: null,
              mergeCartonUnit: '个/箱',
              cartonNumUnitZh: null,
              cartonNumUnitEn: null,
            }
          ],
          propertyOfGoods: null,
          sublicense: 2,
          sublicenseChannelMsg: [{channelNo: null, channelName: null, id: null}],
          priceType: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          priceArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          discountArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          minOrderNumDiscountFX1: null,
          minOrderNumDiscountFX2: null,
          minOrderNumDiscountDL1: null,
          minOrderNumDiscountDL2: null,
          goodStatus: 1,
          cartonParam: null,
        },
        userLevel: JSON.parse(window.localStorage.userData).userLevel,
        sublicenseChannelMsg: [{channelNo: null, channelName: null, id: null}],
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
        priceMsgTableData: [
          {projectTitle: '品牌在本国销售', priceTypeCol: '外国零售价/Retail Price'},
          {projectTitle: '香港吾蜜向外国品牌采购', priceTypeCol: '空运采购价/Unit Purchase Price'},
          {projectTitle: '', priceTypeCol: '海运采购价/Unit Purchase Price'},
          {projectTitle: '香港吾蜜供货/广州吾蜜采购\n' + '（一般贸易）', priceTypeCol: '空运报关价/Unit Price'},
          {projectTitle: '', priceTypeCol: '海运报关价/Unit Price'},
          {projectTitle: '广州吾蜜供货/珠海吾蜜采购\n' + '（一般贸易）', priceTypeCol: '空运易货价', orderNumRange: '品牌货量2500以下'},
          {projectTitle: '广州吾蜜供货/珠海吾蜜采购\n' + '（一般贸易）', priceTypeCol: '空运易货价', orderNumRange: '品牌货量2501-5000'},
          {projectTitle: '广州吾蜜供货/珠海吾蜜采购\n' + '（一般贸易）', priceTypeCol: '空运易货价', orderNumRange: '品牌货量5001-29999'},
          {projectTitle: '广州吾蜜供货/珠海吾蜜采购\n' + '（一般贸易）', priceTypeCol: '空运易货价', orderNumRange: '品牌货量30000以上'},
          {projectTitle: '', priceTypeCol: '海运易货价', orderNumRange: '品牌货量2500以下'},
          {projectTitle: '', priceTypeCol: '海运易货价', orderNumRange: '品牌货量2501-5000'},
          {projectTitle: '', priceTypeCol: '海运易货价', orderNumRange: '品牌货量5001-29999'},
          {projectTitle: '', priceTypeCol: '海运易货价', orderNumRange: '品牌货量30000以上'},
          {projectTitle: '中国渠道销售', priceTypeCol: '中国零售价'},
          {projectTitle: '中国渠道销售下限', priceTypeCol: '中国最低零售价'},
        ],
        currencyCategories: [
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
        priceType: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        priceArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        discountArr: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        dialogGoodImgVisible: false,
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
              if (res.data.item == '00') {
                val = '01'
              } else {
                if (parseInt(res.data.item.toString().substr(-1,2))+1<10) {
                  val = '0'+(parseInt(res.data.item.toString().substr(-1,2))+1)
                } else {
                  val = parseInt(res.data.item.toString().substr(-1,2))+1
                }
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
            this.form.cartonParam = item
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
      validatePriceMsg() {
        this.form.priceType.some((item) => {
          if (!item.symbol) {
            this.$confirm(`请填写价格信息设置中的币种类别。`, { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
            return true
          }
        })
      },
      addSublicenseChannel(index) {
        this.sublicenseChannelMsg.splice(index+1, 0, {channelNo: null, channelName: null, id: null})
        this.form.sublicenseChannelMsg = this.sublicenseChannelMsg
      },
      deleteSublicenseChannel(index) {
        if (this.sublicenseChannelMsg.length==1) return false
        this.sublicenseChannelMsg.splice(index, 1)
        this.form.sublicenseChannelMsg = this.sublicenseChannelMsg
      },
      sublicenseChannelNoChange(val) {
        this.form.sublicenseChannelMsg = this.sublicenseChannelMsg
      },
      priceMsgSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (column.property == 'orderNumRange' && (rowIndex < 5 || rowIndex > 12)) { return [0,0] }
        if (column.property == 'priceTypeCol' && (rowIndex < 5 || rowIndex > 12)) { return [1,2] }
        if (columnIndex<=3) {
            if (rowIndex == 0 || rowIndex == 13 || rowIndex == 14) { return [1, 1] }
            else if (rowIndex == 1 || rowIndex == 3) { return [2, 1] }
            else if (rowIndex == 2 || rowIndex == 4) { return [0, 0] }
            else if (rowIndex == 5) { return [8, 1] }
            else if (rowIndex >= 6 && rowIndex <= 12) { return [0, 0] }
        }
      },
      priceTypeChange(val) {
        this.priceType[2] = this.priceType[1]
        this.priceType[4] = this.priceType[3]
        this.priceType[8] =this.priceType[7] =this.priceType[6] = this.priceType[5]
        this.priceType[12] =this.priceType[11] =this.priceType[10] = this.priceType[9]
        this.form.priceType = this.priceType
      },
      priceArrChange(value) {
        let val = null
        this.priceArr.forEach((item,index) => {
          val = item
          // 非空验证
          if (!val) return false
          // 两位小数验证
          if (!(val/1 > 0)) {
            val=null;
            this.form.priceArr = this.priceArr
            return false
          } // 如果不是数字，报错
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
            this.$set(this.priceArr, index, val)
          }
        })
        this.form.priceArr = this.priceArr
      },
      makeUpOfGoodsChange(val) {
        if (val==1) { this.$set(this.form, 'propertyOfGoods', 1) }
        if (val==2) { this.$set(this.form, 'propertyOfGoods', 3) }
      },
      discountArrChange(val) {
        this.form.discountArr = this.discountArr
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.form.goodsImg = file.url;
        this.dialogGoodImgVisible = true;
      },
      uploadGoodsImgAction(options) {
        this.uploadAction(options.file, key => {
          this.form.goodsImg = `http://asset.wormir.com/${key}`
        })
      },
      onSubmit() {
        this.isSubmitting = true;
        if(!this.validateFile()) {
          this.isSubmitting = false
          return false
        }
        if(this.validatePriceMsg()) {
          this.isSubmitting = false
          return false
        }

        console.log(this.form)

        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$request({
              url: '/goods/createGood.do',
              method: "post",
              data: this.form
            })
              .then(res => {
                if (res.errorCode == 0) {
                  this.$confirm(`新增商品信息已提交审核，可在“商品列表页”中查看详情。`, { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }).then(() => {
                    this.$emit('submitSuccesss')
                    this.$request({
                      url: '/user/temporarySaveAddingGoodsMsg.do',
                      method: 'post',
                      data: {id:1, addingGoodsMsg: null}
                    })
                  })
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
            this.$message.error("请正确填写全部信息");
            return false;
          }
        });
      },
      getSpecification() {
        let specificationName = null
        this.specificationOptions.some(item => {
          if (item.tableId == this.specificationId) {
            specificationName = item.specificationChinese
          }
        })
        return specificationName || '自动显示'
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
      priceTableHeadStyle({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 1) {
          return { display: 'none' }
        }
      },
      headerCellStyle({row, column, rowIndex, columnIndex}) {
        if (rowIndex > 0) {
          return { display: 'none' }
        }
      },
      discountTips(index) {
        switch (index) {
          case 1: return '空运采购价/外国零售价'
          case 2: return '海运采购价/外国零售价'
          case 3: return '空运报关价/外国零售价'
          case 4: return '海运报关价/外国零售价'
          case 5: return '空运易货价/中国零售价'
          case 6: return '空运易货价/中国零售价'
          case 7: return '空运易货价/中国零售价'
          case 8: return '空运易货价/中国零售价'
          case 9: return '海运易货价/中国零售价'
          case 10: return '海运易货价/中国零售价'
          case 11: return '海运易货价/中国零售价'
          case 12: return '海运易货价/中国零售价'
        }
      }
    },
    computed: {
      propertyOfSaleStatus() {
        return this.form.propertyOfSale.length==1 && this.form.propertyOfSale.findIndex(x => x == 1)==0
      }
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
//      this.$request({
//        url: '/user/getTemporarySaveAddingGoodsMsg.do',
//        method: 'post',
//        data: {id:1}
//      }).then((res) => {
////        this.form = JSON.parse(res.data.item.addingGoodsMsg)
////        this.brandPropertyOfSale = this.form.propertyOfSale
//      })
    },
    beforeDestroy() {
      // this.$emit('temporary-save', this.form)
    }
  }
</script>

<style lang="scss" scoped>
  .form-row .el-input {
    margin: 3px;
    width: 98%;
  }
  .no-margin-bottom {
    margin-bottom: 0;
  }
</style>

<!--待解决问题-->
<!--装箱规格没有请求到两位小数-->
<!--品牌安全承诺书请求-->
<!--一般员工和高管区分-->
