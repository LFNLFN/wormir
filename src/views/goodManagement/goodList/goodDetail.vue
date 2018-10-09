<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="品牌">
        <span class="msg-span">{{ form.goodBrand }}({{ form.brandNo }})</span>
      </el-form-item>
      <el-form-item label="商品序列号">
        <span class="msg-span">{{ form.goodID }}</span>
      </el-form-item>
      <el-form-item label="商品组成">
        <span class="msg-span">{{ form.isSuite? '套组' : '非套组' }}</span>
      </el-form-item>
      <el-form-item label="商品编号">
        <span class="msg-span">{{ form.goodID }}</span>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名称（中文）">
            <span class="msg-span">{{ form.goodName_ZH }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品名称（英文）">
            <span class="msg-span">{{ form.goodName_EN }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="原产国/产地">
        <span class="msg-span">{{ form.goodOrigin }}</span>
      </el-form-item>
      <el-form-item label="商品属性">
        <span class="msg-span">{{ form.goodProp }}</span>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品系列">
            <span class="msg-span">{{ form.goodSeries }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品主品类">
            <span class="msg-span">{{ form.mainCategory }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品子品类">
            <span class="msg-span">{{ form.subCategory }}</span>
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
                <span class="msg-span">{{ scope.row.goodSpecification.chinese }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.goodSpecification.english }}</span>
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
                <span class="msg-span">{{ scope.row.capacity.chinese }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.capacity.english }}</span>
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
                <span class="msg-span">{{ scope.row.packingUnit.chinese }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.packingUnit.english }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品净重">
            <span class="msg-span">{{ form.goodNetWeight }}kgs</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品毛重">
            <span class="msg-span">{{ form.goodGrossWeight }}kgs</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="商品品质">
        <span class="msg-span">{{ form.goodQuality }}</span>
      </el-form-item>
      <el-form-item label="包装方式">
        <span class="msg-span">{{ form.packingWay }}</span>
      </el-form-item>
      <el-form-item label="申报要素">
        <span class="msg-span">{{ form.slogan }}</span>
      </el-form-item>
      <el-row>
        <el-col :span="9">
          <el-form-item label="起始折扣">
            <span class="msg-span">{{ form.minDiscount }}%</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="装箱规格">
        <el-table
          :data="form.cartonSpecificationArr"
          style="width: 100%">
          <el-table-column
            align="center"
            width="140"
            label="箱型编号">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.cartonNo }}</span>
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
                <span class="msg-span">{{ scope.row.cartonSpecification.chinese }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="180"
              label="英文">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.cartonSpecification.english }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            width="140"
            label="商品数量">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.goodQuantity }}</span>
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
                <span class="msg-span">{{ scope.row.goodUnit.chinese }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="130"
              label="英文">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.goodUnit.english }}</span>
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
                <span class="msg-span">{{ scope.row.cartonUnit.chinese }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="130"
              label="英文">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.cartonUnit.english }}</span>
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
                <span class="msg-span">{{ scope.row.cartonSize }}</span>
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
                <span class="msg-span">{{ scope.row.cartonWeight }}</span>
              </template>
            </el-table-column>
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
              <span class="msg-span">{{ scope.row.salesArea }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="交易币种">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.transactionCurrency }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="币种符号">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.currencySymbol }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.currencyUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="金额">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            label="商品售价">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11"><span class="msg-span">{{ scope.row.thePrice.withSymbol }}</span></el-col>
                <el-col :span="2">/</el-col>
                <el-col :span="11"><span class="msg-span">{{ scope.row.thePrice.withUnit }}</span></el-col>
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
              <span class="msg-span">{{ scope.row.transactionCurrency }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="币种符号">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.currencySymbol }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="单位">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.currencyUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            label="金额">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="商品售价">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="11"><span class="msg-span">{{ scope.row.replenishment.withSymbol }}</span></el-col>
                <el-col :span="2">/</el-col>
                <el-col :span="11"><span class="msg-span">{{ scope.row.replenishment.withUnit }}</span></el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品成份">
        <span class="msg-span">{{ form.goodNote.ingredients }}</span>
      </el-form-item>
      <el-form-item label="商品功效">
        <span class="msg-span">{{ form.goodNote.efficacy }}</span>
      </el-form-item>
      <el-form-item label="商品卖点">
        <span class="msg-span">{{ form.goodNote.sellingPoint }}</span>
      </el-form-item>
      <el-form-item label="使用感受">
        <span class="msg-span">{{ form.goodNote.userfeeling }}</span>
      </el-form-item>
      <el-form-item label="适用人群">
        <span class="msg-span">{{ form.goodNote.targetUser }}</span>
      </el-form-item>
      <el-form-item label="商品方形图">
        <el-row>
          <img v-for="item in form.fiveFilesList" :src="item.url" alt="" width="126" height="126" style="margin-right: 0.5em">
        </el-row>
      </el-form-item>
      <el-form-item label="商品详情图">
        <el-row>
          <img v-for="item in form.oneFileList" :src="item.url" alt="" width="126" height="126">
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      theGoodDetail: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        form: {}
      }
    },
    methods: {
    },
    mounted() {
      this.form = this.theGoodDetail
    }
  }
</script>

<style lang="scss" scoped>
  .msg-span {
    color: #999
  }
</style>
