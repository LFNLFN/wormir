<template>
  <div class="app-container">
    <div class="trade-category-wrap" style="margin-bottom: 10px">
      <el-radio v-model="listQuery.propertyOfSale" :label="1" @change="getList">一般贸易促销商品</el-radio>
      <el-radio v-model="listQuery.propertyOfSale" :label="2" @change="getList">跨境贸易促销商品</el-radio>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="品牌名称/商品编号/商品名称/商品系列/商品主品类/商品子品类" v-model="listQuery.searchText">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table
      :key='tableKey' :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      class="border1"
      style="width: 100%;">
      <el-table-column min-width="120px" align="center" label="渠道号" prop="channelCode"/>

      <el-table-column min-width="150px" align="center" label="渠道名称" prop="channelName"/>

      <el-table-column min-width="120px" align="center" label="申请类型" prop="applyStatus"  :filters="applicationTypeFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.applyStatus | applicationTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('payOrder.operation')" min-width="120" class-name="small-padding">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.applyPromotionStatus == 2 || scope.row.applyPromotionStatus == 6" type="primary" @click="reviewDialog(scope.row)">
            审批促销
          </el-button>

            <!--<el-button-->
              <!--v-if="scope.row.applyPromotionStatus == 1"-->
              <!--type="primary" size="mini"-->
              <!--@click="showDLDFfirstApplicationForm(scope.row, scope.$index)"-->
            <!--&gt;首次申请（DL/DF）-->
            <!--</el-button>-->
            <!--<el-button-->
              <!--v-if="scope.row.applyPromotionStatus == 2"-->
              <!--type="primary" size="mini"-->
              <!--@click="showDLDFfirstApplicationResultProcessing(scope.row, scope.$index)"-->
            <!--&gt;-->
              <!--首次结果（DL/DF审核中）-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
                       <!--v-if="scope.row.applyPromotionStatus == 3"-->
                       <!--@click="showDLDFfirstResultNotChangeNumber(scope.row, scope.$index)"-->
            <!--&gt;首次结果（DL/DF同意不改数量）-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
                       <!--v-if="scope.row.applyPromotionStatus == 4"-->
                       <!--@click="showDLDFfirstResultButChangeNumber(scope.row, scope.$index)"-->
            <!--&gt;首次结果（DL/DF同意改数量）-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
                       <!--v-if="scope.row.applyPromotionStatus == 5"-->
                       <!--@click="showDLDFfirstResultRejectApplication(scope.row, scope.$index)"-->
            <!--&gt;首次结果（DL/DF驳回）-->
            <!--</el-button>-->


            <!--&lt;!&ndash;<el-button type="primary" size="mini" style="margin-left:0"&ndash;&gt;-->
                       <!--&lt;!&ndash;v-if="scope.row.applyPromotionStatus == 3 || scope.row.applyPromotionStatus == 4 || scope.row.applyPromotionStatus == 5"&ndash;&gt;-->
                       <!--&lt;!&ndash;@click="showDLDFsecondApplicationForm(scope.row, scope.$index)"&ndash;&gt;-->
            <!--&lt;!&ndash;&gt;再次申请（DL/DF）</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="primary" size="mini" style="margin-left:0"&ndash;&gt;-->
                       <!--&lt;!&ndash;v-if="scope.row.applyPromotionStatus == 6"&ndash;&gt;-->
                       <!--&lt;!&ndash;@click="showDLDFsecondApplicationResultProcessing(scope.row, scope.$index)"&ndash;&gt;-->
            <!--&lt;!&ndash;&gt;再次结果（DL/DF审核中）&ndash;&gt;-->
            <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
            <!--<el-button type="primary" size="mini"-->
                       <!--v-if="scope.row.applyPromotionStatus == 7"-->
                       <!--@click="showDLDFsecondResultNotChangeNumber(scope.row, scope.$index)"-->
            <!--&gt;再次结果（DL/DF同意不改数量）-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
                       <!--v-if="scope.row.applyPromotionStatus == 8"-->
                       <!--@click="showDLDFsecondResultButChangeNumber(scope.row, scope.$index)"-->
            <!--&gt;再次结果（DL/DF同意改数量）-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
                       <!--v-if="scope.row.applyPromotionStatus == 9"-->
                       <!--@click="showDLDFsecondResultRejectApplication(scope.row, scope.$index)"-->
            <!--&gt;再次结果（DL/DF驳回申请）-->
            <!--</el-button>-->

            <!--&lt;!&ndash;<el-button type="primary" size="mini"&ndash;&gt;-->
                       <!--&lt;!&ndash;v-if="scope.row.applyPromotionStatus == 1"&ndash;&gt;-->
                       <!--&lt;!&ndash;@click="showFXQDfirstApplicationForm(scope.row, scope.$index)"&ndash;&gt;-->
            <!--&lt;!&ndash;&gt;首次申请（FX提交申请）&ndash;&gt;-->
            <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="primary" size="mini"&ndash;&gt;-->
                       <!--&lt;!&ndash;v-if="scope.row.applyPromotionStatus == 2"&ndash;&gt;-->
                       <!--&lt;!&ndash;@click="showFXQDfirstApplicationResultProcessing(scope.row, scope.$index)"&ndash;&gt;-->
            <!--&lt;!&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;首次结果(FX申请审核中)&ndash;&gt;-->
            <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
            <!--<el-button type="primary" size="mini"-->
                       <!--v-if="scope.row.applyPromotionStatus == 3"-->
                       <!--@click="showFXQDfirstApplicationResult(scope.row, scope.$index)"-->
            <!--&gt;-->
              <!--首次结果(FX申请结果)-->
            <!--</el-button>-->

            <!--&lt;!&ndash;<el-button type="primary" size="mini" style="margin-left:0"&ndash;&gt;-->
                       <!--&lt;!&ndash;v-if="scope.row.applyPromotionStatus == 3"&ndash;&gt;-->
                       <!--&lt;!&ndash;@click="showFXQDsecondApplicationForm(scope.row, scope.$index)">再次申请（FX提交申请）</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="primary" size="mini" style="margin-left:0"&ndash;&gt;-->
                       <!--&lt;!&ndash;v-if="scope.row.applyPromotionStatus == 6"&ndash;&gt;-->
                       <!--&lt;!&ndash;@click="showFXQDsecondApplicationResultProcessing(scope.row, scope.$index)">再次结果(FX申请审核中)&ndash;&gt;-->
            <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
            <!--<el-button type="primary" size="mini"-->
                       <!--v-if="scope.row.applyPromotionStatus == 7"-->
                       <!--@click="showFXQDsecondApplicationResult(scope.row, scope.$index)">-->
              <!--再次结果(FX申请结果)-->
            <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--取消并单-->
    <!--<el-dialog :visible.sync="isDialogDetailShow">-->
      <!--<el-row :gutter="5">-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">促销商品</div>-->
        <!--</el-col>-->
        <!--<el-col :span="21">-->
          <!--<el-table :key="'product'" :data="productlist" v-loading="listLoading" element-loading-text="给我一点时间" border-->
                    <!--fit highlight-current-row style="width: 100%">-->
            <!--<el-table-column label="商品品牌"></el-table-column>-->
            <!--<el-table-column label="商品编号"></el-table-column>-->
            <!--<el-table-column label="商品名称"></el-table-column>-->
            <!--<el-table-column label="商品规格"></el-table-column>-->
            <!--<el-table-column label="装箱规格"></el-table-column>-->
          <!--</el-table>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="5">-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">渠道号</div>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
          <!--<div class="grid-content bg-purple">12323</div>-->
        <!--</el-col>-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">渠道名称</div>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
          <!--<div class="grid-content bg-purple"></div>-->
        <!--</el-col>-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">渠道级别</div>-->
        <!--</el-col>-->
        <!--<el-col :span="3">-->
          <!--<div class="grid-content bg-purple"></div>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="5">-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">申请理由</div>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="5">-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">申请资料</div>-->
        <!--</el-col>-->
        <!--<el-col :span="10">-->

        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="5">-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">促销活动日期</div>-->
        <!--</el-col>-->
        <!--<el-col :span="8">-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="5">-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">申请数量</div>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
          <!--<div class="grid-content bg-purple">12323</div>-->
        <!--</el-col>-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">库存数量</div>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
          <!--<div class="grid-content bg-purple"></div>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="5">-->
        <!--<div>申请时间：</div>-->
      <!--</el-row>-->
      <!--<el-row :gutter="5">-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content bg-purple">审核结果</div>-->
        <!--</el-col>-->
        <!--<el-col :span="21">-->
          <!--<el-radio-group v-model="radio" :change="radioChange()">-->
            <!--<el-radio :label="1">同意申请</el-radio>-->
            <!--<el-radio :label="2">驳回申请</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="5">-->
        <!--<el-col :span="3" align="center">-->
          <!--<div class="grid-content"></div>-->
        <!--</el-col>-->
        <!--<el-col :span="21">-->
          <!--<el-checkbox v-model="checked" :change="checkBoxChange()" :disabled="checkDisable">审批数量</el-checkbox>-->
          <!--<el-input-number v-model="AllowNum" :min="1" :disabled="numDisable"></el-input-number>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<div style="text-align:center;">-->
        <!--<el-button type="primary" @click="" :loading="submitLoading">确认提交</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <!--审核弹层-->
    <el-dialog :visible.sync="isDialogDetailShow" width="70%">
      <applicationReview :applyStatus="applyStatus" v-if="isDialogDetailShow" :goodsObject="goodsObject" :channelProp="currentRow.channelProp" @submit-success="firstTimeReviewSuccess"></applicationReview>
    </el-dialog>

  </div>
</template>

<script>
  import {
    fetchList,
    fetchPv,
    createArticle,
    updateArticle
  } from '@/api/article'
  import { requestOrderGenerate } from '@/api/order'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import Mock from 'mockjs'
  import applicationReview from './applicationReview'

  import DLDFfirstTimeApplicationForm from './DLQDandDFQD/firstTimeApplicationForm'
  import DLDFfirstTimeApplicationResultProcessing from './DLQDandDFQD/firstTimeApplicationResultProcessing'
  import DLDFfirstTimeResultAgreeNotChangeNumber from './DLQDandDFQD/firstTimeResultAgreeNotChangeNumber'
  import DLDFfirstTimeResultAgreeButChangeNumber from './DLQDandDFQD/firstTimeResultAgreeButChangeNumber'
  import DLDFfirstTimeResultRejectApplication from './DLQDandDFQD/firstTimeResultRejectApplication'
  import DLDFsecondTimeApplicationForm from './DLQDandDFQD/secondTimeApplicationForm'
  import DLDFsecondTimeApplicationResultProcessing from './DLQDandDFQD/secondTimeApplicationResultProcessing'
  import DLDFsecondTimeResultAgreeNotChangeNumber from './DLQDandDFQD/secondTimeResultAgreeNotChangeNumber'
  import DLDFsecondTimeResultAgreeButChangeNumber from './DLQDandDFQD/secondTimeResultAgreeButChangeNumber'
  import DLDFsecondTimeResultRejectApplication from './DLQDandDFQD/secondTimeResultRejectApplication'

  import FXQDfirstTimeApplicationForm from './FXQD/firstTimeApplicationForm'
  import FXQDfirstTimeApplicationResultProcessing from './FXQD/firstTimeApplicationResultProcessing'
  import FXQDfirstTimeResult from './FXQD/firstTimeResult'
  import FXQDsecondTimeApplicationForm from './FXQD/secondTimeApplicationForm'
  import FXQDsecondTimeApplicationResultProcessing from './FXQD/secondTimeApplicationResultProcessing'
  import FXQDsecondTimeResult from './FXQD/secondTimeResult'

  export default {
    name: 'SalesPromotion',
    directives: {
      waves
    },
    components: {
      applicationReview,

      DLDFfirstTimeApplicationForm,
      DLDFfirstTimeApplicationResultProcessing,
      DLDFfirstTimeResultAgreeNotChangeNumber,
      DLDFfirstTimeResultAgreeButChangeNumber,
      DLDFfirstTimeResultRejectApplication,
      DLDFsecondTimeApplicationForm,
      DLDFsecondTimeApplicationResultProcessing,
      DLDFsecondTimeResultAgreeNotChangeNumber,
      DLDFsecondTimeResultAgreeButChangeNumber,
      DLDFsecondTimeResultRejectApplication,

      FXQDfirstTimeApplicationForm,
      FXQDfirstTimeApplicationResultProcessing,
      FXQDfirstTimeResult,
      FXQDsecondTimeApplicationForm,
      FXQDsecondTimeApplicationResultProcessing,
      FXQDsecondTimeResult,
    },
    data() {
      return {

        DLDFfirstApplicationShow: false,
        DLDFfirstApplicationResultProcessingShow: false,
        DLDFfirstProcessing: false,
        DLDFfirstAgreeNotChangeNumber: false,
        DLDFfirstAgreeButChangeNumber: false,
        DLDFfirstRejectApplication: true,
        DLDFfirstTimeResultAgreeNotChangeNumberShow: false,
        DLDFfirstTimeResultAgreeButChangeNumberShow: false,
        DLDFfirstTimeResultRejectApplicationShow: false,

        DLDFsecondTimeApplicationShow: false,
        DLDFsecondProcessing: false,
        DLDFsecondApplicationResultProcessingShow: false,
        DLDFsecondAgreeNotChangeNumber: false,
        DLDFsecondTimeResultAgreeNotChangeNumberShow: false,
        DLDFsecondAgreeButChangeNumber: false,
        DLDFsecondTimeResultAgreeButChangeNumberShow: false,
        DLDFsecondRejectApplication: true,
        DLDFsecondTimeResultRejectApplicationShow: false,

        FXQDfirstApplicationShow: false,
        FXQDfirstProcessing: false,
        FXQDfirstApplicationResultProcessingShow: false,
        FXQDfirstResult: false,
        FXQDfirstTimeResultShow: false,
        FXQDsecondTimeApplicationShow: false,
        FXQDsecondProcessing: false,
        FXQDsecondApplicationResultProcessingShow: false,
        FXQDsecondResult: false,
        FXQDsecondTimeResultShow: false,

        tableKey: 0,
        list: null,
        applicationTypeFilters: [
          { text: '首次申请', value: 0 },
          { text: '再次申请', value: 1 }
        ],
        productlist: [],
        submitLoading: false,
        radio: 1,
        checked: false,
        AllowNum: 0,
        numDisable: true,
        checkDisable: false,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          searchText: undefined,
          type: undefined,
          sort: '+id',
          propertyOfSale: 1
        },
        importanceOptions: [1, 2, 3],
        sortOptions: [
          { label: 'ID Ascending', key: '+id' },
          { label: 'ID Descending', key: '-id' }
        ],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        isDialogDetailShow: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogTransportChangeVisible: false,
        pvData: [],
        rules: {
          type: [
            { required: true, message: 'type is required', trigger: 'change' }
          ],
          timestamp: [
            {
              type: 'date',
              required: true,
              message: 'timestamp is required',
              trigger: 'change'
            }
          ],
          title: [
            { required: true, message: 'title is required', trigger: 'blur' }
          ]
        },
        downloadLoading: false,
        currentRow: {},
        goodsObject: null,
        applyStatus: 0,
        operationIndex: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      filterHandler(value, row, column) {
        console.log(value)
        console.log(row)
        console.log(column)
        const property = column['property']
        return row[property] === value
      },
      radioChange() {
        if (this.radio === 2) {
          this.checkDisable = true
          // this.numDisable = true
        } else if (this.radio === 1) {
          this.checkDisable = false
          // this.checkBoxChange()
        }
      },
      checkBoxChange() {
        if (this.checked && this.checkDisable === false) {
          this.numDisable = false
        } else if (this.checked === false || this.checkDisable) {
          this.numDisable = true
        }
      },
      // 审核促销
      reviewDialog(row) {
        console.log(row);
        this.currentRow = row

        var url  = "/goodsInfo/DLQDApplyPromotionGoodList.do"
        console.log(row.channelCode.indexOf('FXQD'))
        if (row.channelCode.indexOf('FXQD') == 0) {
          this.currentRow.channelProp = 3;
          url = "/goodsInfo/FXQDApplyPromotionGoodList.do";
        } else {
          this.currentRow.channelProp = 1
        }
        var data = {
          channelCode: row.channelCode,
          // channelCode: "DLQD20180411001",
          goodsNo: row.goodsNo
        }
        this.$request({
          url: url,
          method: "post",
          data: data
        }).then((res) => {
          if (res.errorCode == 0) {
            console.log(res)
            this.applyStatus = row.applyStatus;
            this.goodsObject = res.data.goodInfo;

            this.goodsObject.brands = res.data.brands;
            this.goodsObject.channelNo = res.data.channelInfo.channelCode;
            this.goodsObject.channelLevel = res.data.channelInfo.channelLevel;
            this.goodsObject.channelName = res.data.channelInfo.channelName;
            this.goodsObject.goodsNo = row.goodsNo;
            this.goodsObject.goodPromotionApplication = res.data.goodPromotionApplication;
            this.goodsObject.order_start_time = new Date();
            if (this.currentRow.channelProp == 3) {
              this.goodsObject.goodPromotionApplication.map((item) => {
                // if (typeof item=='object' && item.constructor==Array) {
                //
                // }
                item.isAgree = null;
                item.reject_explain = '';
                item.isAgreeTitle = null;
                item.approve_num = null;
                item.noApproveNum = true;

              })
            }
            this.isDialogDetailShow = true;
            // this.goodsObject.brands = res.data.brands;
            // this.goodsObject.goodPromotionApplication = res.data.goodPromotionApplication
            // console.log(JSON.parse(this.goodsObject.declarationSpecification))
            // console.log(JSON.parse(this.goodsObject.packageSpecificationData))
            // console.log(this.goodsObject)
          } else {
            // this.$message.error('数据请求失败');
          }
          this.listLoading = false

        }).catch((err) => {
          console.log(err)
          // this.$message.error('数据请求失败');
          this.listLoading = false
        })

      },

      getList() {
        this.listLoading = true

        this.$request({
          url: "/goodsInfo/approvalGoodList.do",
          method: 'post',
          data: this.listQuery
        }).then((res) => {
          console.log(res)
          if (res.errorCode == 0) {
            res.data.items.forEach((item) => {
              if (item.applyPromotionStatus <= 5) {
                item.applyStatus = 0;
              } else   {
                item.applyStatus = 1;
              }
            })
            console.log(res.data)
            this.list = res.data.items;
            this.total = res.data.total

            // this.brandNameFilters = res.data.brandNameFilters
            this.listLoading = false
          } else {
            this.$message.error('数据请求失败');
            this.listLoading = false
          }
        }).catch((err) => {
          this.$message.error('数据请求失败');
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },

      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.isDialogDetailShow = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.isDialogDetailShow = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.isDialogDetailShow = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.isDialogDetailShow = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogTransportChangeVisible = true
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = [
            'timestamp',
            'title',
            'type',
            'importance',
            'status'
          ]
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j === 'timestamp') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          })
        )
      },

      firstTimeReviewSuccess(data) {
        this.isDialogDetailShow = false
        var url = "/goodsInfo/approvalDLQD.do"
        if (this.currentRow.channelProp == 3) {
          url = "/goodsInfo/approvalFXQD.do";
        }
        this.$request({
          url: url,
          method: 'post',
          data: data
        }).then((res) => {
          if (res.errorCode == 0) {
            this.$message.success('审核成功')
            this.getList();
          } else {
            this.$message.success('提交失败')
          }
        }).catch((err) => {
          this.$message.success('提交失败')
        })

      },
      propertyOfSaleChange () {
        !this.listQuery.propertyOfSale;
        this.getList()
      },



      showDLDFfirstResultRejectApplication(data, index) {

        this.goodsObject = data
        this.getMessage(data.goodsNo)
        this.DLDFfirstTimeResultRejectApplicationShow = true
        console.log(data)
        this.operationIndex = index
      },

      showDLDFsecondApplicationForm(data, index) {

        this.goodsObject = data
        this.getMessage(data.goodsNo)
        this.DLDFsecondTimeApplicationShow = true

        this.operationIndex = index
      },
      showDLDFsecondApplicationResultProcessing(data, index) {
        this.goodsObject = data
        this.getMessage(data.goodsNo)
        this.DLDFsecondApplicationResultProcessingShow = true

        this.operationIndex = index
      },

      showDLDFsecondResultNotChangeNumber(data, index) {
        this.goodsObject = data
        this.getMessage(data.goodsNo)
        this.DLDFsecondTimeResultAgreeNotChangeNumberShow = true

        this.operationIndex = index
      },
      showDLDFsecondResultButChangeNumber(data, index) {
        this.goodsObject = data
        this.getMessage(data.goodsNo)
        this.DLDFsecondTimeResultAgreeButChangeNumberShow = true

        this.operationIndex = index
      },
      showDLDFsecondResultRejectApplication(data, index) {
        this.goodsObject = data
        this.getMessage(data.goodsNo)
        this.DLDFsecondTimeResultRejectApplicationShow = true

        this.operationIndex = index
      },
      showFXQDfirstApplicationResult(data, index) {
        this.getMessage(data.goodsNo)
        this.FXQDfirstTimeResultShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      showFXQDsecondApplicationResult(data, index) {
        this.getMessage(data.goodsNo)
        this.FXQDsecondTimeResultShow = true
        this.goodsObject = data
        this.operationIndex = index


      },
    },
    filters: {
      applicationTypeFilter(status) {
        const statusMap = {
          0: '首次申请',
          1: '再次申请',
        }
        return statusMap[status]
      },
    }
  }
</script>
<style scoped>
  .el-dialog {
    width: 90%;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    padding-top: 6px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
