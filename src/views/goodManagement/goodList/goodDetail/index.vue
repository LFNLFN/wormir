<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px">
      <div class="border1 viewDetail" style="border-bottom-width: 2px">
        <el-form-item label="品牌" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.brandChineseName }}({{ theGoodDetail.brandNo }})</span>
        </el-form-item>
        <el-form-item label="商品序列号" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.goodsSerialNo }}</span>
        </el-form-item>
        <el-form-item label="商品组成" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.isSuite || '暂无数据' }}</span>
        </el-form-item>
        <el-form-item label="商品编号" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.goodsNo }}</span>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称（中文）" class="form-row add-brand-row clear-border-right textareaTitleShow">
              <span class="msg-span">{{ theGoodDetail.goodsChineseName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品名称（英文）" class="form-row add-brand-row textareaTitleShow">
              <span class="msg-span">{{ theGoodDetail.goodsEnglishName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="原产国/产地" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.goodOrigin || '暂无数据' }}</span>
        </el-form-item>
        <el-form-item label="商品属性" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.goodProp || '暂无数据' }}</span>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品系列" class="form-row add-brand-row clear-border-right">
              <span class="msg-span">{{ theGoodDetail.series }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品主品类" class="form-row add-brand-row clear-border-right">
              <span class="msg-span">{{ theGoodDetail.merchandiseMainVariety }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品子品类" class="form-row add-brand-row">
              <span class="msg-span">{{ theGoodDetail.merchandiseChildVariety }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <p style="margin: 20px"></p>

      <el-form-item label="商品规格">
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
                <!--<span class="msg-span">{{ scope.row.goodSpecification.chinese }}</span>-->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <!--<span class="msg-span">{{ scope.row.goodSpecification.english }}</span>-->
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
                <!--<span class="msg-span">{{ scope.row.capacity.chinese }}</span>-->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文">
              <template slot-scope="scope">
                <!--<span class="msg-span">{{ scope.row.capacity.english }}</span>-->
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
                <!--<span class="msg-span">{{ scope.row.packingUnit.chinese }}</span>-->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="英文"
              class-name="last-col">
              <template slot-scope="scope">
                <!--<span class="msg-span">{{ scope.row.packingUnit.english }}</span>-->
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-form-item>

      <div class="border1 viewDetail">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品净重" class="form-row add-brand-row clear-border-right">
              <span class="msg-span">{{ theGoodDetail.net_weight }}kgs</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品毛重" class="form-row add-brand-row">
              <span class="msg-span">{{ theGoodDetail.rough_weight }}kgs</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="商品品质" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.goods_quality }}</span>
        </el-form-item>
        <el-form-item label="包装方式" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.goods_packaging_mode }}</span>
        </el-form-item>
        <el-form-item label="申报要素" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.slogan }}</span>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="起始折扣" class="form-row add-brand-row last-form-row">
              <span class="msg-span">{{ theGoodDetail.initialDiscount }}%</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <p style="margin: 20px"></p>

      <el-form-item label="装箱规格" prop="">
        <el-table
          :data="theGoodDetail.box"
          class="border2"
          style="width: 100%; border-bottom: 1px solid #D5D5D5">
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
                <span class="msg-span">{{ scope.row.specification }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="180"
              label="英文">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.specification }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            width="140"
            label="商品数量">
            <template slot-scope="scope">
              <span class="msg-span">{{ scope.row.counts }}</span>
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
                <span class="msg-span">{{ scope.row.encasement_unit }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="130"
              label="英文">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.encasement_unit }}</span>
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
                <!--<span class="msg-span">{{ scope.row.cartonUnit.chinese }}</span>-->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="130"
              label="英文">
              <template slot-scope="scope">
                <!--<span class="msg-span">{{ scope.row.cartonUnit.english }}</span>-->
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="箱子尺寸">
            <el-table-column
              align="center"
              width="220"
              label="长 宽 高 cm"
            prop="box_size">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.box_size }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="箱子重量" prop="box_weight">
            <el-table-column
              align="center"
              width="140"
              label="kgs">
              <template slot-scope="scope">
                <span class="msg-span">{{ scope.row.box_weight }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="商品售价">
        <el-table
          border
          :data="form.goodPriceArr"
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5">
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
            label="商品售价"
            class-name="last-col">
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
          class="noBorder last-tr2"
          style="width: 100%;border-left: 2px solid #D5D5D5">
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
            label="商品售价"
            class-name="last-col">
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

      <div class="border1">
        <el-form-item label="商品成份" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.ingredients || '' }}</span>
        </el-form-item>
        <el-form-item label="商品功效" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.efficacy || ''  }}</span>
        </el-form-item>
        <el-form-item label="商品卖点" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.sellingPoint || '' }}</span>
        </el-form-item>
        <el-form-item label="使用感受" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.userfeeling || '' }}</span>
        </el-form-item>
        <el-form-item label="适用人群" class="form-row add-brand-row">
          <span class="msg-span">{{ theGoodDetail.targetUser || '' }}</span>
        </el-form-item>

        <el-form-item label="商品方形图" class="form-row imgTitle">
          <el-row>
            <img v-for="item in form.fiveFilesList" :src="item.url" alt="" width="126" height="126"
                 style="margin-right: 0.5em">
          </el-row>
        </el-form-item>
        <el-form-item label="商品详情图" class="form-row imgTitle last-form-row">
          <el-row>
            <img v-for="item in form.oneFileList" :src="item.url" alt="" width="126" height="126">
          </el-row>
        </el-form-item>
      </div>
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
    methods: {},
    mounted() {
      this.form = this.theGoodDetail
    }
  }
</script>

<style lang="scss" scoped>
  .msg-span {
    color: #999;
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
