<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="品牌">
        <el-col :span="4"><span style="color: #999">

        </span></el-col>
        <el-col :span="8">
          <el-button type="primary" size="mini" @click="chooseBrand">选择品牌</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="商品序列号">
        <el-input v-model="form.goodID"></el-input>
      </el-form-item>
      <el-form-item label="商品组成">
        <el-radio v-model="form.isSuite" :label="false">单品</el-radio>
        <el-radio v-model="form.isSuite" :label="true">套组</el-radio>
      </el-form-item>
      <el-form-item label="商品编号">
        <el-input v-model="form.goodID"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名称（中文）">
            <el-input v-model="form.goodName_ZH" type="textarea" autosize></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品名称（英文）">
            <el-input v-model="form.goodName_EN" type="textarea" autosize></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="原产国/产地">
        <el-input v-model="form.goodOrigin"></el-input>
      </el-form-item>
      <el-form-item label="商品属性">
        <el-select v-model="form.goodProp" placeholder="请选择">
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
          <el-form-item label="商品系列">
            <el-select v-model="form.goodSeries" placeholder="请选择">
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
          <el-form-item label="商品主品类">
            <el-select v-model="form.mainCategory" placeholder="请选择">
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
          <el-form-item label="商品子品类">
            <el-select v-model="form.subCategory" placeholder="请选择">
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
      <el-form-item label="商品规格">
        <el-table
          :data="form.goodSpecificationArr"
          style="width: 100%">
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
            label="包装单位">
            <el-table-column
              align="center"
              label="中文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.packingUnit.chinese" placeholder="例：支"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <el-input v-model="scope.row.packingUnit.english" placeholder="例：pc"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品净重">
            <el-input v-model="form.goodNetWeight">
              <template slot="append">kgs</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品毛重">
            <el-input v-model="form.goodGrossWeight">
              <template slot="append">kgs</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="商品品质">
        <el-select v-model="form.goodQuality" placeholder="请选择">
          <el-option
            v-for="item in goodQualityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="包装方式">
        <el-select v-model="form.packingWay" placeholder="请选择">
          <el-option
            v-for="item in packingWayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申报要素">
        <el-input v-model="form.slogan"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="9">
          <el-form-item label="起始折扣">
            <el-input v-model="form.minDiscount">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="装箱规格">
        <el-row>
          <el-button type="success" icon="el-icon-plus" @click="addPackingSpecification">添加装箱规格</el-button>
        </el-row>
        <el-table
          :data="form.cartonSpecificationArr"
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
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deletePackingSpecification(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品售价">
        <el-table
          border
          :data="form.goodPriceArr"
          style="width: 100%">
          <el-table-column
            align="center"
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
                <el-option
                  v-for="item in [{value: '人民币',label: '人民币'},{value: '美元',label: '美元'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="币种符号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.currencySymbol"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <el-input v-model="scope.row.currencyUnit"></el-input>
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
            width="200"
            label="商品售价">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11"><el-input v-model="scope.row.thePrice.withSymbol"></el-input></el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11"><el-input v-model="scope.row.thePrice.withUnit"></el-input></el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="补款金额">
        <el-table
          border
          :data="form.replenishmentArr"
          style="width: 100%">
          <el-table-column
            align="center"
            label="交易币种">
            <template slot-scope="scope">
              <el-select v-model="scope.row.transactionCurrency" placeholder="请选择">
                <el-option
                  v-for="item in [{value: '人民币',label: '人民币'},{value: '美元',label: '美元'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="币种符号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.currencySymbol"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <el-input v-model="scope.row.currencyUnit"></el-input>
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
            label="商品售价">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11"><el-input v-model="scope.row.replenishment.withSymbol"></el-input></el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11"><el-input v-model="scope.row.replenishment.withUnit"></el-input></el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品成份">
        <el-input v-model="form.goodNote.ingredients" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="商品功效">
        <el-input v-model="form.goodNote.efficacy" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="form.goodNote.sellingPoint" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="使用感受">
        <el-input v-model="form.goodNote.userfeeling" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="适用人群">
        <el-input v-model="form.goodNote.targetUser" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item label="商品方形图">
        <el-row>
          <span style="color: red">温馨提示：商品方形图最多支持5张图片哦！</span>
        </el-row>
        <el-row>
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
      <el-form-item label="商品详情图">
        <el-row>
          <span style="color: red">温馨提示：商品详情图最多支持1张图片哦！</span>
        </el-row>
        <el-row>
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
      <el-form-item label="可售渠道">
        <el-checkbox-group v-model="form.sellingChannelList">
          <el-checkbox border label="A级"></el-checkbox>
          <el-checkbox border label="B级"></el-checkbox>
          <el-checkbox border label="C级"></el-checkbox>
          <el-checkbox border label="D级"></el-checkbox>
          <el-checkbox border label="分销渠道"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="商品采购价">
        <el-table
          border
          :data="form.procurementPriceArr"
          style="width: 100%">
          <el-table-column
            align="center"
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
                <el-option
                  v-for="item in [{value: '人民币',label: '人民币'},{value: '美元',label: '美元'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="币种符号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.currencySymbol"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <el-input v-model="scope.row.currencyUnit"></el-input>
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
            width="200"
            label="商品售价">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11"><el-input v-model="scope.row.thePrice.withSymbol"></el-input></el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11"><el-input v-model="scope.row.thePrice.withUnit"></el-input></el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品状态">
        <el-select v-model="form.goodStatus" placeholder="请选择">
          <el-option
            v-for="item in [{value: '正常销售',label: '正常销售'},{value: '停止销售',label: '停止销售'}]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="">保存</el-button>
        <el-button type="primary" @click="">提交审核</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="isChooseBrandShow" width="70%" @close="isChooseBrandShow = false" title="选择品牌" append-to-body>
      <brandChoice></brandChoice>
    </el-dialog>
  </div>
</template>

<script>
  import brandChoice from './brandChoice'
  export default {
    data() {
      return {
        // 上传组件数据
        uploadImageUrl: '',
        uploadPicVisible: false,
        // 上传组件数据
        form: {
          goodID: '',
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
          fiveFilesList: [
          ],
          oneFileList: [
          ],
          sellingChannelList: [],
          procurementPriceArr: [{
            transportation: '',
            transactionCurrency: '',
            currencySymbol: '',
            currencyUnit: '',
            amount: '',
            thePrice: {
              withSymbol: '',
              withUnit: ''
            }
          }, {
            transportation: '',
            transactionCurrency: '',
            currencySymbol: '',
            currencyUnit: '',
            amount: '',
            thePrice: {
              withSymbol: '',
              withUnit: ''
            }
          }]
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
        isChooseBrandShow: false
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

</style>
