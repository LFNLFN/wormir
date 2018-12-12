<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px">
      <div class="border1" style="border-bottom-width: 2px">
        <el-form-item label="品牌" class="form-row add-brand-row">
          <span style="color: #999">{{ form.goodBrand }}({{ form.brandNo }})</span>
        </el-form-item>
        <el-form-item label="商品序列号" required class="form-row add-brand-row">
          <el-input v-model="form.goodID"></el-input>
        </el-form-item>
        <el-form-item label="商品组成" required class="form-row add-brand-row">
          <el-radio-group v-model="form.isSuite" style="margin:5px 3px 0;">
            <el-radio :label="false">非套组</el-radio>
            <el-radio :label="true">套组</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品编号" required class="form-row add-brand-row">
          <el-input v-model="form.goodNo"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称（中文）" required class="form-row add-brand-row textareaTitle clear-border-right">
              <el-input v-model="form.goodName_ZH" type="textarea" :rows="2" style="margin: 3px;width: 98%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品名称（英文）" required class="form-row add-brand-row textareaTitle">
              <el-input v-model="form.goodName_EN" type="textarea" :rows="2" style="margin: 3px;width: 98%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="原产国/产地" required class="form-row add-brand-row">
          <el-input v-model="form.goodOrigin"></el-input>
        </el-form-item>
        <el-form-item label="商品属性" required class="form-row add-brand-row">
          <el-select v-model="form.goodProp" placeholder="请选择" class="select-form-margin">
            <el-option
              v-for="item in goodPropOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品系列" required class="form-row add-brand-row clear-border-right">
              <el-select v-model="form.goodSeries" placeholder="请选择" class="select-form-margin">
                <el-option
                  v-for="item in goodSeriesOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品主品类" required class="form-row add-brand-row clear-border-right">
              <el-select v-model="form.mainCategory" placeholder="请选择" class="select-form-margin">
                <el-option
                  v-for="item in mainCategoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品子品类" required class="form-row add-brand-row">
              <el-select v-model="form.subCategory" class="select-form-margin" placeholder="请选择">
                <el-option
                  v-for="item in subCategoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <p style="margin: 20px"></p>

      <el-form-item label="商品规格" required>
        <el-table
          :data="form.goodSpecificationArr"
          border
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5"
          :header-cell-style="{padding: 0}">>
          <el-table-column
            align="center"
            label="商品规格">
            <el-table-column
              align="center"
              label="中文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.goodSpecification.chinese" placeholder="例：30毫升/支"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.goodSpecification.english" placeholder="例：30ml/pc"></el-input>
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
                <el-input v-model="scope.row.capacity.chinese" placeholder="例：30毫升"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.capacity.english" placeholder="例：30ml"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="包装单位"
            class-name="last-col">
            <el-table-column
              align="center"
              label="中文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.packingUnit.chinese" placeholder="例：支"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文"
              class-name="last-col">
              <template slot-scope="scope">
                <el-input v-model="scope.row.packingUnit.english" placeholder="例：pc"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-form-item>

      <div class="border1">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品净重" required class="form-row add-brand-row clear-border-right">
              <el-input v-model="form.goodNetWeight">
                <template slot="append">kgs</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品毛重" required class="form-row add-brand-row">
              <el-input v-model="form.goodGrossWeight">
                <template slot="append">kgs</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="商品品质" required class="form-row add-brand-row">
          <el-select v-model="form.goodQuality" class="select-form-margin" placeholder="请选择">
            <el-option
              v-for="item in goodQualityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包装方式" required class="form-row add-brand-row">
          <el-select v-model="form.packingWay" class="select-form-margin" placeholder="请选择">
            <el-option
              v-for="item in packingWayOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申报要素" required class="form-row add-brand-row">
          <el-input v-model="form.slogan"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="起始折扣" required class="form-row add-brand-row last-form-row">
              <el-input v-model="form.minDiscount" style="width: 200px;">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <p style="margin: 20px"></p>

      <el-form-item label="装箱规格" required>
        <el-row>
          <div class="add-btn-wrap">
            <el-button type="success" icon="el-icon-plus" @click="addPackingSpecification">添加装箱规格</el-button>
          </div>
        </el-row>
        <el-table
          :data="form.cartonSpecificationArr"
          class="border2"
          style="width: 100%">
          <el-table-column
            align="center"
            width="140"
            label="箱型编号">
            <template slot-scope="scope">
              <el-select v-model="scope.row.cartonNo" placeholder="请选择">
                <el-option
                  v-for="item in [{value: '02',label: '02'},{value: '03',label: '03'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="装箱规格">
            <el-table-column
              align="center"
              width="180"
              label="中文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonSpecification.chinese" placeholder="例：10支/箱"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="180"
              label="英文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonSpecification.english" placeholder="例：10PCS/CTN"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            width="140"
            label="商品数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.goodQuantity" placeholder="请选择"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="商品单位">
            <el-table-column
              align="center"
              width="130"
              label="中文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.goodUnit.chinese" placeholder="例：支"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="130"
              label="英文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.goodUnit.english" placeholder="例：PCS"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            width="130"
            label="装箱单位">
            <el-table-column
              align="center"
              label="中文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonUnit.chinese" placeholder="例：箱"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="130"
              label="英文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonUnit.english" placeholder="例：CTN"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="箱子尺寸">
            <el-table-column
              align="center"
              width="220"
              label="长 宽 高 cm">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonSize" type="textarea" :rows="2" placeholder="系统填充"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="箱子重量">
            <el-table-column
              align="center"
              width="140"
              label="kgs">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cartonWeight" placeholder="默认读取"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete"
                         @click="deletePackingSpecification(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品售价" required>
        <el-table
          border
          :data="form.goodPriceArr"
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5">
          <el-table-column
            align="center"
            width="200px"
            label="销售区域">
            <template slot-scope="scope">
              <el-input v-model="scope.row.salesArea"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="交易币种">
            <template slot-scope="scope">
              <el-select v-model="scope.row.transactionCurrency" placeholder="请选择">
                <el-option label="人民币" value="RMB"></el-option>
                <el-option label="港币" value="HKD"></el-option>
                <el-option label="澳元" value="AUD"></el-option>
                <el-option label="英镑" value="GBP"></el-option>
                <el-option label="美元" value="USD"></el-option>
                <el-option label="欧元" value="EUR"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="币种符号">
            <template slot-scope="scope">
              <span>{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].symbol || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].unit || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="金额">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="商品售价"
            class-name="last-col">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11">
                  <el-input v-model="scope.row.thePrice.withSymbol">
                    <template slot="prepend">{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].symbol || '默认读取' }}</template>
                  </el-input>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <el-input v-model="scope.row.thePrice.withUnit">
                    <template slot="append">{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].unit || '默认读取' }}</template>
                  </el-input>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="补款金额" required>
        <el-table
          border
          :data="form.replenishmentArr"
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5">
          <el-table-column
            align="center"
            width="320px"
            label="交易币种">
            <template slot-scope="scope">
              <el-select v-model="scope.row.transactionCurrency" placeholder="请选择">
                <el-option label="人民币" value="RMB"></el-option>
                <el-option label="港币" value="HKD"></el-option>
                <el-option label="澳元" value="AUD"></el-option>
                <el-option label="英镑" value="GBP"></el-option>
                <el-option label="美元" value="USD"></el-option>
                <el-option label="欧元" value="EUR"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="币种符号">
            <template slot-scope="scope">
              <span>{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].symbol || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].unit || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="金额">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="商品售价"
            class-name="last-col">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11">
                  <el-input v-model="scope.row.replenishment.withSymbol">
                    <template slot="prepend">{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].symbol || '默认读取' }}</template>
                  </el-input>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <el-input v-model="scope.row.replenishment.withUnit">
                    <template slot="append">{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].unit || '默认读取' }}</template>
                  </el-input>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <div class="border1">
        <el-form-item label="商品成份" required class="form-row add-brand-row textareaTitle">
          <el-input v-model="form.goodNote.ingredients" type="textarea" :rows="2"
                    class="select-form-margin select-form-width"></el-input>
        </el-form-item>
        <el-form-item label="商品功效" required class="form-row add-brand-row textareaTitle">
          <el-input v-model="form.goodNote.efficacy" type="textarea" :rows="2"
                    class="select-form-margin select-form-width"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" required class="form-row add-brand-row textareaTitle">
          <el-input v-model="form.goodNote.sellingPoint" type="textarea" :rows="2"
                    class="select-form-margin select-form-width"></el-input>
        </el-form-item>
        <el-form-item label="使用感受" required class="form-row add-brand-row textareaTitle">
          <el-input v-model="form.goodNote.userfeeling" type="textarea" :rows="2"
                    class="select-form-margin select-form-width"></el-input>
        </el-form-item>
        <el-form-item label="适用人群" required class="form-row add-brand-row textareaTitle last-form-row">
          <el-input v-model="form.goodNote.targetUser" type="textarea" :rows="2"
                    class="select-form-margin select-form-width"></el-input>
        </el-form-item>


      <el-form-item label="商品方形图(最多五张)" required class="form-row imgUploadTitle">
        <el-row style="padding-top: 17px">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            multiple
            :limit="5"
            :file-list="form.fiveFilesList"
            :on-exceed="handleExceed"
            :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!--<span style="color: red">温馨提示：商品方形图最多支持5张图片哦！</span>-->
          <el-dialog :visible.sync="uploadPicVisible" append-to-body>
            <img width="100%" :src="uploadImageUrl" alt="">
          </el-dialog>
        </el-row>
      </el-form-item>
      <el-form-item label="商品详情图(最多一张)" required class="form-row imgUploadTitle">
        <el-row style="padding-top: 17px">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :file-list="form.oneFileList"
            :on-exceed="handleExceed"
            :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-row>
      </el-form-item>
        <el-form-item label="可售渠道" required class="form-row add-brand-row last-form-row">
          <el-checkbox-group v-model="form.sellingChannelList" style="margin-top: 4px">
            <el-checkbox border label="A级"></el-checkbox>
            <el-checkbox border label="B级"></el-checkbox>
            <el-checkbox border label="C级"></el-checkbox>
            <el-checkbox border label="D级"></el-checkbox>
            <el-checkbox border label="分销渠道"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <p style="margin: 20px"></p>

      <el-form-item label="商品采购价" required>
        <el-table
          border
          :data="form.procurementPriceArr"
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5">
          <el-table-column
            align="center"
            width="120"
            label="采购方式">
            <template slot-scope="scope">
              <span>{{scope.row.transportation}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="交易币种">
            <template slot-scope="scope">
              <el-select v-model="scope.row.transactionCurrency" placeholder="请选择">
                <el-option label="人民币" value="RMB"></el-option>
                <el-option label="港币" value="HKD"></el-option>
                <el-option label="澳元" value="AUD"></el-option>
                <el-option label="英镑" value="GBP"></el-option>
                <el-option label="美元" value="USD"></el-option>
                <el-option label="欧元" value="EUR"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="币种符号">
            <template slot-scope="scope">
              <span>{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].symbol || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].unit || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="金额">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="商品售价"
            class-name="last-col">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11">
                  <el-input v-model="scope.row.thePrice.withSymbol">
                    <template slot="prepend">{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].symbol || '默认读取' }}</template>
                  </el-input>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <el-input v-model="scope.row.thePrice.withUnit">
                    <template slot="append">{{ currencyInformation[scope.row.transactionCurrency] && currencyInformation[scope.row.transactionCurrency].unit || '默认读取' }}</template>
                  </el-input>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <div class="border1">
        <el-form-item label="商品状态" required class="form-row add-brand-row last-form-row">
          <el-select v-model="form.goodStatus" class="select-form-margin" placeholder="请选择">
            <el-option
              v-for="item in [{value: '正常销售',label: '正常销售'},{value: '停止销售',label: '停止销售'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="submitSaving">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      editGoodDetail: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        // 上传组件数据
        uploadImageUrl: '',
        uploadPicVisible: false,
        // 上传组件数据
        form: {
          goodNote: {
            ingredients: '不详',
            efficacy: '不详',
            sellingPoint: '不详',
            userfeeling: '不详',
            targetUser: '不详',
          }
        },
        goodPropOptions: [{
          value: '常规',
          label: '常规'
        }, {
          value: '促销',
          label: '促销'
        }, {
          value: '新品',
          label: '新品'
        }],
        goodSeriesOptions: [{
          value: '薰衣草',
          label: '薰衣草'
        }, {
          value: '非系列',
          label: '非系列'
        }],
        mainCategoryOptions: [{
          value: '面部',
          label: '面部'
        }],
        subCategoryOptions: [{
          value: '保湿',
          label: '保湿'
        }],
        goodQualityOptions: [{
          value: '特等品',
          label: '特等品'
        }, {
          value: '一等品',
          label: '一等品'
        }, {
          value: '二等品',
          label: '二等品'
        }, {
          value: '三等品',
          label: '三等品'
        }],
        packingWayOptions: [{
          value: 'carton',
          label: 'carton'
        }],
        currencyInformation: {
          RMB: { symbol: '￥', unit: '元' },
          HKD: { symbol: 'HK$', unit: '港元' },
          AUD: { symbol: 'A$', unit: '澳元' },
          GBP: { symbol: '£', unit: '英磅' },
          USD: { symbol: '$', unit: '美元' },
          EUR: { symbol: '€', unit: '欧元' }
        },
      }
    },
    methods: {
      addPackingSpecification() {
        this.form.cartonSpecificationArr.push({
          cartonNo: '',
          cartonSpecification: {
            chinese: '',
            english: ''
          },
          goodQuantity: '',
          goodUnit: {
            chinese: '',
            english: ''
          },
          cartonUnit: {
            chinese: '',
            english: ''
          },
          cartonSize: '',
          cartonWeight: ''
        })
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
      submitSaving() {
        const vm = this
        this.$alert('保存成功。', '', {
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
      this.form = this.editGoodDetail
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
