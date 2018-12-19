<template>
  <div>
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <div class="border1 form-error-inline" style="border-bottom-width: 2px">
        <el-form-item label="品牌" required class="form-row add-brand-row">
          <el-col :span="4" class="select-form-margin">
            <span v-if="chosenBrand"
                  style="color: #999">{{ chosenBrand.brandName_ZH }}({{ chosenBrand.brandNo }})</span>
          </el-col>
          <el-col :span="8" class="select-form-margin">
            <el-button type="primary" size="mini" @click="chooseBrand">选择品牌</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="商品序列号" required class="form-row add-brand-row">
          <el-col :span="9">
            <el-input v-model="form.goodID" disabled></el-input>
          </el-col>
          <el-col :span="9" style="padding-top: 2px">
            <span style="color: #999">&nbsp;企业商品自编号</span>
          </el-col>
        </el-form-item>
        <el-form-item label="商品组成" prop="isSuite" class="form-row add-brand-row">
          <el-radio-group v-model="form.isSuite" style="margin:5px 3px 0;">
            <el-radio :label="0">单品</el-radio>
            <el-radio :label="1">套组</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品编号" prop="goodNo" class="form-row add-brand-row">
          <el-input v-model="form.goodNo" placeholder="请输入商品编号"></el-input>
        </el-form-item>
        <el-row class="form-error-inside">
          <el-col :span="12">
            <el-form-item label="商品名称（中文）" prop="goodName_ZH" class="form-row add-brand-row" style="border-right: none">
              <el-input v-model="form.goodName_ZH" type="textarea" autosize
                        class="select-form-margin select-form-width" placeholder="请输入商品名称（中文）"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品名称（英文）" prop="goodName_EN" class="form-row add-brand-row">
              <el-input v-model="form.goodName_EN" type="textarea" class="select-form-margin select-form-width"
                        autosize placeholder="请输入商品名称（英文）"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="原产国/产地" prop="goodOrigin" class="form-row add-brand-row">
          <el-input v-model="form.goodOrigin" placeholder="请输入原产国/产地"></el-input>
        </el-form-item>
        <el-form-item label="商品属性" required class="form-row add-brand-row">
          <el-select v-model="form.goodProp" class="select-form-margin" placeholder="请选择">
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
              <el-select v-model="form.goodSeries" class="select-form-margin" placeholder="请选择">
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
              <el-select v-model="form.mainCategory" class="select-form-margin" placeholder="请选择">
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
              <el-select v-model="form.subCategory" placeholder="请选择" class="select-form-margin">
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
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5">
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
              <el-input v-model="form.goodNetWeight" placeholder="请输入商品净重">
                <template slot="append">kgs</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品毛重" required class="form-row add-brand-row">
              <el-input v-model="form.goodGrossWeight" placeholder="请输入商品毛重">
                <template slot="append">kgs</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="商品品质" required class="form-row add-brand-row">
          <el-select v-model="form.goodQuality" placeholder="请选择" class="select-form-margin">
            <el-option
              v-for="item in goodQualityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包装方式" required class="form-row add-brand-row">
          <el-select v-model="form.packingWay" placeholder="请选择" class="select-form-margin">
            <el-option
              v-for="item in packingWayOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申报要素" required class="form-row add-brand-row">
          <el-input v-model="form.slogan" placeholder="请输入申报要素"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="起始折扣" required class="form-row add-brand-row last-form-row">
              <el-input v-model="form.minDiscount" style="width: 200px" placeholder="请输入起始折扣">
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
            label="销售区域">
            <template slot-scope="scope">
              <el-input v-model="scope.row.salesArea" placeholder="例：广东"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="交易币种">
            <template slot-scope="scope">
              <el-select v-model="form.transactionCurrency" placeholder="请选择">
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
              <span>{{ currencyInformation[form.transactionCurrency] && currencyInformation[form.transactionCurrency].symbol || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.transactionCurrency] && currencyInformation[form.transactionCurrency].unit || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="金额">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            label="商品售价"
            class-name="last-col">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11">
                  <el-input v-model="scope.row.thePrice.withSymbol" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <el-input v-model="scope.row.thePrice.withUnit" placeholder="请输入"></el-input>
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
            label="交易币种">
            <template slot-scope="scope">
              <el-select v-model="form.replenishmentCurrency" placeholder="请选择">
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
              <span>{{ currencyInformation[form.replenishmentCurrency] && currencyInformation[form.replenishmentCurrency].symbol || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <span>{{ currencyInformation[form.replenishmentCurrency] && currencyInformation[form.replenishmentCurrency].unit || '默认读取' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="金额">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="商品售价"
            class-name="last-col">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11">
                  <el-input v-model="scope.row.replenishment.withSymbol" placeholder="请输入"></el-input>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <el-input v-model="scope.row.replenishment.withUnit" placeholder="请输入"></el-input>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <div class="border1" style="border-bottom-width:2px">
        <el-form-item label="商品成份" required class="form-row add-brand-row textareaTitle">
          <el-input
            v-model="form.goodNote.ingredients"
            type="textarea" placeholder="请输入商品成份"
            :rows="2"
            class="select-form-margin select-form-width"></el-input>
        </el-form-item>
        <el-form-item label="商品功效" required class="form-row add-brand-row textareaTitle">
          <el-input v-model="form.goodNote.efficacy" type="textarea" :rows="2" placeholder="请输入商品功效"
                    class="select-form-margin select-form-width"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" required class="form-row add-brand-row textareaTitle">
          <el-input v-model="form.goodNote.sellingPoint" type="textarea" :rows="2" placeholder="请输入商品卖点"
                    class="select-form-margin select-form-width"></el-input>
        </el-form-item>
        <el-form-item label="使用感受" required class="form-row add-brand-row textareaTitle">
          <el-input v-model="form.goodNote.userfeeling" type="textarea" :rows="2" placeholder="请输入使用感受"
                    class="select-form-margin select-form-width"></el-input>
        </el-form-item>
        <el-form-item label="适用人群" required class="form-row add-brand-row textareaTitle">
          <el-input v-model="form.goodNote.targetUser" type="textarea" :rows="2" placeholder="请输入适用人群"
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
      </div>
      <div class="dialogBottomButton-wrap">
        <!--<el-button type="primary" @click="">保存</el-button>-->
        <el-button type="primary" @click="onSubmit" :loading="isSubmitting">提交审核</el-button>
      </div>
    </el-form>
    <el-dialog :visible.sync="isChooseBrandShow" width="70%" @close="isChooseBrandShow = false" title="选择品牌"
               append-to-body>
      <brandChoice @choice-close="isChooseBrandShow = false; chosenBrand = $event"></brandChoice>
    </el-dialog>
  </div>
</template>

<script>
  import brandChoice from './brandChoice'

  export default {
    data() {
      return {
        currencyInformation: {
          RMB: { symbol: '￥', unit: '元' },
          HKD: { symbol: 'HK$', unit: '港元' },
          AUD: { symbol: 'A$', unit: '澳元' },
          GBP: { symbol: '£', unit: '英磅' },
          USD: { symbol: '$', unit: '美元' },
          EUR: { symbol: '€', unit: '欧元' },
        },
        transactionCurrency: '',
        replenishmentCurrency: '',
        // 上传组件数据
        uploadImageUrl: '',
        uploadPicVisible: false,
        // 上传组件数据
        form: {
          goodID: 100032018101010001,
          goodBrand: '',
          goodProp: '',
          mainCategory: '',
          subCategory: '',
          goodSeries: '',
          goodNo: '',
          goodName_ZH: '',
          goodName_EN: '',
          goodStatus: '',
          goodPrice: '',
          minDiscount: '',
          checkInTime: '',
          // 以上是商品管理的表格而下面是编辑商品所需要的补充信息
          isSuite: '',
          goodOrigin: '',
          goodSpecificationArr: [
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
          ],
          goodNetWeight: '',
          goodGrossWeight: '',
          goodQuality: '',
          packingWay: '',
          slogan: '',
          cartonSpecificationArr: [{
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
          }],
          goodPriceArr: [{
            salesArea: '',
            transactionCurrency: '',
            currencySymbol: '',
            currencyUnit: '',
            amount: '',
            thePrice: {
              withSymbol: '',
              withUnit: ''
            }
          }],
          replenishmentArr: [{
            transactionCurrency: '',
            currencySymbol: '',
            currencyUnit: '',
            amount: '',
            replenishment: {
              withSymbol: '',
              withUnit: ''
            }
          }],
          goodNote: {
            ingredients: '',
            efficacy: '',
            sellingPoint: '',
            userfeeling: '',
            targetUser: ''
          },
          fiveFilesList: [],
          oneFileList: []
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
        isChooseBrandShow: false,
        chosenBrand: null,
        isSubmitting: false,
        formRules: {
          isSuite: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
          goodNo: [
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
        }
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
      chooseBrand() {
        this.isChooseBrandShow = true
      },
      onSubmit() {
        this.isSubmitting = true

//        if (!this.chosenBrand) {
//          this.$message.error('请选择品牌!');
//          this.isSubmitting = false
//          return false
//        }

        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.isSubmitting = false
            return false
            request({
              url: '/channel/createChannel.do',
              method: 'post',
              data: this.form
            }).then(() => {
              this.$emit('submitSuccess')
            }).catch(() => {
              this.$message.error('新增失败');
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
