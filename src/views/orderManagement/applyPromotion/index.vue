<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="品牌名称/商品编号/商品名称/商品系列/商品主品类/商品子品类" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <div class="table-wrap" style="border: 1px solid #d5d5d5;border-right-width: 0">
      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                highlight-current-row
                style="width: 100%">
        <el-table-column align="center" :label="$t('table.brandName') " :min-width="120" prop="brandEnglishName"
                         :filters="[{text: 'LANCOME', value: 'LANCOME'}]"
                         :filter-method="filterHandler"/>
        <el-table-column align="center" :label="$t('table.productImg')" :min-width="150">
          <template slot-scope="scope">
            <img :src="scope.row.goodsImg" style="width:80px;height:80px;"
                 @click="isViewImageShow=true; imageViewed=scope.row.goodsImg"/>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.produdctNo')" :min-width="110" prop="goodsNo"/>
        <el-table-column align="center" :label="$t('table.productName')" :min-width="200" prop="goodsChineseName"/>
        <el-table-column align="center" :label="$t('table.productProperty')" prop="goodsCategory" :min-width="110"
                         :filters="[{text: '常规', value: 10}, {text: '促销', value: 20}]"
                         :filter-method="filterHandler">
          <template slot-scope="scope">
            <span>{{goodsCategory[scope.row.goodsCategory]}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.productSeries')" :min-width="130" prop="series"
                         :filters="[{text: '薰衣草', value: '薰衣草'}, {text: '洁面霜', value: '洁面霜'}]"
                         :filter-method="filterHandler"/>
        <el-table-column align="center" :label="$t('table.productMain')" :min-width="180" prop="merchandiseMainVariety"
                         :filters="[{text: '面部', value: '面部'}]"
                         :filter-method="filterHandler"/>
        <el-table-column align="center" :label="$t('table.productSub')" :min-width="180" prop="merchandiseChildVariety"
                         :filters="[{text: '保湿', value: '保湿'},{text: '润肤', value: '润肤'}]"
                         :filter-method="filterHandler"/>
        <el-table-column align="center" :label="$t('table.productSpec')" :min-width="160" prop="goodsSpecification"/>
        <el-table-column align="center" :label="$t('table.boxSpec')" :min-width="200" prop="cartonSpecification">
          <template slot-scope="scope">
            <div>
              <el-radio v-model="chosenCartonSpecification[scope.$index]" label="16">16瓶/箱</el-radio>
            </div>
            <div>
              <el-radio v-model="chosenCartonSpecification[scope.$index]" label="25">25瓶/箱</el-radio>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :min-width="140" :label="$t('table.retailPrice')">
          <template slot-scope="scope">
            <span>￥{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.operation')" :min-width="520" fixed="right" class-name="buttonMarginLeft">
          <template slot-scope="scope">
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showDLDFfirstApplicationForm(scope.row, scope.$index)"-->
            <!--v-if="!DLDFfirstApplicationStatus[scope.$index]">首次申请-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showDLDFfirstApplicationResultProcessing(scope.row, scope.$index)"-->
            <!--v-else-if="DLDFfirstApplicationStatus[scope.$index]&&DLDFfirstProcessing">-->
            <!--首次结果-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showDLDFfirstResultNotChangeNumber(scope.row, scope.$index)"-->
            <!--v-else-if="DLDFfirstApplicationStatus[scope.$index]&&DLDFfirstAgreeNotChangeNumber">首次结果-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showDLDFfirstResultButChangeNumber(scope.row, scope.$index)"-->
            <!--v-else-if="DLDFfirstApplicationStatus[scope.$index]&&DLDFfirstAgreeButChangeNumber">首次结果-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showDLDFfirstResultRejectApplication(scope.row, scope.$index)"-->
            <!--v-else-if="DLDFfirstApplicationStatus[scope.$index]&&DLDFfirstRejectApplication">首次结果-->
            <!--</el-button>-->


            <!--<el-button type="primary" size="mini" style="margin-left:0"-->
            <!--:disabled="!(DLDFfirstApplicationStatus[scope.$index]&&!DLDFfirstProcessing)"-->
            <!--@click="showDLDFsecondApplicationForm(scope.row, scope.$index)"-->
            <!--v-if="!DLDFsecondApplicationStatus[scope.$index]">再次申请</el-button>-->
            <!--<el-button type="primary" size="mini" style="margin-left:0"-->
            <!--@click="showDLDFsecondApplicationResultProcessing(scope.row, scope.$index)"-->
            <!--v-else-if="DLDFsecondApplicationStatus[scope.$index]&&DLDFsecondProcessing">再次结果-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showDLDFsecondResultNotChangeNumber(scope.row, scope.$index)"-->
            <!--v-else-if="DLDFsecondApplicationStatus[scope.$index]&&DLDFsecondAgreeNotChangeNumber">再次结果-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showDLDFsecondResultButChangeNumber(scope.row, scope.$index)"-->
            <!--v-else-if="DLDFsecondApplicationStatus[scope.$index]&&DLDFsecondAgreeButChangeNumber">再次结果-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showDLDFsecondResultRejectApplication(scope.row, scope.$index)"-->
            <!--v-else-if="DLDFsecondApplicationStatus[scope.$index]&&DLDFsecondRejectApplication">再次结果-->
            <!--</el-button>-->



            <!--<el-button type="primary" size="mini"-->
            <!--@click="showFXQDfirstApplicationForm(scope.row, scope.$index)"-->
            <!--v-if="!FXQDfirstApplicationStatus[scope.$index]">首次申请-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showFXQDfirstApplicationResultProcessing(scope.row, scope.$index)"-->
            <!--v-else-if="FXQDfirstApplicationStatus[scope.$index]&&FXQDfirstProcessing">-->
            <!--首次结果-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showFXQDfirstApplicationResult(scope.row, scope.$index)"-->
            <!--v-else-if="FXQDfirstApplicationStatus[scope.$index]&&FXQDfirstResult">-->
            <!--首次结果-->
            <!--</el-button>-->

            <!--<el-button type="primary" size="mini" style="margin-left:0"-->
            <!--:disabled="!(FXQDfirstApplicationStatus[scope.$index]&&!FXQDfirstProcessing)"-->
            <!--@click="showFXQDsecondApplicationForm(scope.row, scope.$index)"-->
            <!--v-if="!FXQDsecondApplicationStatus[scope.$index]">再次申请</el-button>-->
            <!--<el-button type="primary" size="mini" style="margin-left:0"-->
            <!--@click="showFXQDsecondApplicationResultProcessing(scope.row, scope.$index)"-->
            <!--v-else-if="FXQDsecondApplicationStatus[scope.$index]&&FXQDsecondProcessing">再次结果-->
            <!--</el-button>-->
            <!--<el-button type="primary" size="mini"-->
            <!--@click="showFXQDsecondApplicationResult(scope.row, scope.$index)"-->
            <!--v-else-if="FXQDsecondApplicationStatus[scope.$index]&&FXQDsecondResult">-->
            <!--再次结果-->
            <!--</el-button>-->
            <el-button type="primary" size="mini"
                       @click="showDLDFfirstApplicationForm(scope.row, scope.$index)"
            >首次申请（DL/DF）
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showDLDFfirstApplicationResultProcessing(scope.row, scope.$index)"
            >
              首次结果（DL/DF审核中）
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showDLDFfirstResultNotChangeNumber(scope.row, scope.$index)"
            >首次结果（DL/DF同意不改数量）
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showDLDFfirstResultButChangeNumber(scope.row, scope.$index)"
            >首次结果（DL/DF同意改数量）
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showDLDFfirstResultRejectApplication(scope.row, scope.$index)"
            >首次结果（DL/DF驳回）
            </el-button>


            <el-button type="primary" size="mini" style="margin-left:0"
                       @click="showDLDFsecondApplicationForm(scope.row, scope.$index)"
            >再次申请（DL/DF）</el-button>
            <el-button type="primary" size="mini" style="margin-left:0"
                       @click="showDLDFsecondApplicationResultProcessing(scope.row, scope.$index)"
            >再次结果（DL/DF审核中）
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showDLDFsecondResultNotChangeNumber(scope.row, scope.$index)"
            >再次结果（DL/DF同意不改数量）
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showDLDFsecondResultButChangeNumber(scope.row, scope.$index)"
            >再次结果（DL/DF同意改数量）
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showDLDFsecondResultRejectApplication(scope.row, scope.$index)"
            >再次结果（DL/DF驳回申请）
            </el-button>



            <el-button type="primary" size="mini"
                       @click="showFXQDfirstApplicationForm(scope.row, scope.$index)"
            >首次申请（FX提交申请）
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showFXQDfirstApplicationResultProcessing(scope.row, scope.$index)"
            >
              首次结果(FX申请审核中)
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showFXQDfirstApplicationResult(scope.row, scope.$index)"
            >
              首次结果(FX申请结果)
            </el-button>

            <el-button type="primary" size="mini" style="margin-left:0"
                       @click="showFXQDsecondApplicationForm(scope.row, scope.$index)">再次申请（FX提交申请）</el-button>
            <el-button type="primary" size="mini" style="margin-left:0"
                       @click="showFXQDsecondApplicationResultProcessing(scope.row, scope.$index)">再次结果(FX申请审核中)
            </el-button>
            <el-button type="primary" size="mini"
                       @click="showFXQDsecondApplicationResult(scope.row, scope.$index)">
              再次结果(FX申请结果)
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--viewImage-->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="75%">
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>

    <!--DLDF首次申请-->
    <el-dialog :visible.sync="DLDFfirstApplicationShow">
      <DLDFfirstTimeApplicationForm :goodsObject="goodsObject" v-if="DLDFfirstApplicationShow"
                                    @closeDLDFfirstApplicationForm="closeDLDFfirstApplicationForm"
                                    @submit-first-application="afterDLDFfirstApplication"
                                    :operationIndex="operationIndex">
      </DLDFfirstTimeApplicationForm>
    </el-dialog>

    <!--DLDF首次申请结果--审核中-->
    <el-dialog :visible.sync="DLDFfirstApplicationResultProcessingShow">
      <DLDFfirstTimeApplicationResultProcessing :goodsObject="goodsObject" v-if="DLDFfirstApplicationResultProcessingShow"
                                                :operationIndex="operationIndex">
      </DLDFfirstTimeApplicationResultProcessing>
    </el-dialog>

    <!--DLQD/DFQD点击首次结果（出现审核结果后-同意申请不修改申请数量）-->
    <el-dialog :visible.sync="DLDFfirstTimeResultAgreeNotChangeNumberShow">
      <DLDFfirstTimeResultAgreeNotChangeNumber :goodsObject="goodsObject" v-if="DLDFfirstTimeResultAgreeNotChangeNumberShow"
                                               :operationIndex="operationIndex">
      </DLDFfirstTimeResultAgreeNotChangeNumber>
    </el-dialog>

    <!--DLQD/DFQD点击首次结果（出现审核结果后-同意申请但修改申请数量）-->
    <el-dialog :visible.sync="DLDFfirstTimeResultAgreeButChangeNumberShow">
      <DLDFfirstTimeResultAgreeButChangeNumber :goodsObject="goodsObject" v-if="DLDFfirstTimeResultAgreeButChangeNumberShow"
                                               :operationIndex="operationIndex">
      </DLDFfirstTimeResultAgreeButChangeNumber>
    </el-dialog>

    <!--DLQD/DFQD点击首次结果（出现审核结果后-驳回申请）-->
    <el-dialog :visible.sync="DLDFfirstTimeResultRejectApplicationShow">
      <DLDFfirstTimeResultRejectApplication :goodsObject="goodsObject" v-if="DLDFfirstTimeResultRejectApplicationShow"
                                            :operationIndex="operationIndex">
      </DLDFfirstTimeResultRejectApplication>
    </el-dialog>

    <!--DLQD/DFQD点击再次申请-->
    <el-dialog :visible.sync="DLDFsecondTimeApplicationShow">
      <DLDFsecondTimeApplicationForm :goodsObject="goodsObject" v-if="DLDFsecondTimeApplicationShow"
                                     @closeDLDFsecondApplicationForm="closeDLDFsecondApplicationForm"
                                     @submit-first-application="afterDLDFsecondApplication"
                                     :operationIndex="operationIndex">
      </DLDFsecondTimeApplicationForm>
    </el-dialog>
    <!--DLQD/DFQD点击再次结果（审核中）-->
    <el-dialog :visible.sync="DLDFsecondApplicationResultProcessingShow">
      <DLDFsecondTimeApplicationResultProcessing :goodsObject="goodsObject" v-if="DLDFsecondApplicationResultProcessingShow"
                                                 :operationIndex="operationIndex">
      </DLDFsecondTimeApplicationResultProcessing>
    </el-dialog>
    <!--DLQD/DFQD点击再次结果（出现审核结果后-同意申请不修改申请数量）-->
    <el-dialog :visible.sync="DLDFsecondTimeResultAgreeNotChangeNumberShow">
      <DLDFsecondTimeResultAgreeNotChangeNumber :goodsObject="goodsObject" v-if="DLDFsecondTimeResultAgreeNotChangeNumberShow"
                                                :operationIndex="operationIndex">
      </DLDFsecondTimeResultAgreeNotChangeNumber>
    </el-dialog>
    <!--DLQD/DFQD点击再次结果（出现审核结果后-同意申请但修改申请数量）-->
    <el-dialog :visible.sync="DLDFsecondTimeResultAgreeButChangeNumberShow">
      <DLDFsecondTimeResultAgreeButChangeNumber :goodsObject="goodsObject" v-if="DLDFsecondTimeResultAgreeButChangeNumberShow"
                                                :operationIndex="operationIndex">
      </DLDFsecondTimeResultAgreeButChangeNumber>
    </el-dialog>
    <!--DLQD/DFQD点击再次结果（出现审核结果后-驳回申请）-->
    <el-dialog :visible.sync="DLDFsecondTimeResultRejectApplicationShow">
      <DLDFsecondTimeResultRejectApplication :goodsObject="goodsObject" v-if="DLDFsecondTimeResultRejectApplicationShow"
                                             :operationIndex="operationIndex">
      </DLDFsecondTimeResultRejectApplication>
    </el-dialog>



    <!--FXQD首次点击申请促销-->
    <el-dialog :visible.sync="FXQDfirstApplicationShow">
      <FXQDfirstTimeApplicationForm :goodsObject="goodsObject" v-if="FXQDfirstApplicationShow"
                                    @closeDLDFfirstApplicationForm="closeFXQDfirstApplicationForm"
                                    @submit-first-application="afterFXQDfirstApplication"
                                    :operationIndex="operationIndex">
      </FXQDfirstTimeApplicationForm>
    </el-dialog>
    <!--FXQD首次申请结果--审核中-->
    <el-dialog :visible.sync="FXQDfirstApplicationResultProcessingShow">
      <FXQDfirstTimeApplicationResultProcessing :goodsObject="goodsObject" v-if="FXQDfirstApplicationResultProcessingShow"
                                                :operationIndex="operationIndex">
      </FXQDfirstTimeApplicationResultProcessing>
    </el-dialog>
    <!--FXQD点击首次结果（出现审核结果后-同意申请不修改或修改申请数量或驳回申请）-->
    <el-dialog :visible.sync="FXQDfirstTimeResultShow">
      <FXQDfirstTimeResult :goodsObject="goodsObject" v-if="FXQDfirstTimeResultShow"
                           :operationIndex="operationIndex">
      </FXQDfirstTimeResult>
    </el-dialog>
    <!--FXQD点击再次申请-->
    <el-dialog :visible.sync="FXQDsecondTimeApplicationShow">
      <FXQDsecondTimeApplicationForm :goodsObject="goodsObject" v-if="FXQDsecondTimeApplicationShow"
                                     @closeDLDFsecondApplicationForm="closeFXQDsecondApplicationForm"
                                     @submit-first-application="afterFXQDsecondApplication"
                                     :operationIndex="operationIndex">
      </FXQDsecondTimeApplicationForm>
    </el-dialog>
    <!--FXQD点击再次结果（审核中）-->
    <el-dialog :visible.sync="FXQDsecondApplicationResultProcessingShow">
      <FXQDsecondTimeApplicationResultProcessing :goodsObject="goodsObject" v-if="FXQDsecondApplicationResultProcessingShow"
                                                 :operationIndex="operationIndex">
      </FXQDsecondTimeApplicationResultProcessing>
    </el-dialog>
    <!--FXQD点击再次结果（出现审核结果后-同意申请不修改申请数量或修改申请数量或驳回申请）-->
    <el-dialog :visible.sync="FXQDsecondTimeResultShow">
      <FXQDsecondTimeResult :goodsObject="goodsObject" v-if="FXQDsecondTimeResultShow"
                            :operationIndex="operationIndex">
      </FXQDsecondTimeResult>
    </el-dialog>

  </div>
</template>

<script>
  /* eslint-disable */
  import waves from '@/directive/waves' // 水波纹指令
  import { requestOrderGenerate } from '@/api/order'
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
    name: 'applyPromotion',
    components: {
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
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          title: undefined,
          type: undefined,
          sort: '+id',
        },
        goodsCategory: {
          10: '常规',
          20: '促销',
          30: '新品'
        },
        isViewImageShow: false,
        imageViewed: '',
        chosenCartonSpecification: [],


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
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        downloadLoading: false,
        goodsObject: undefined,
        submitFirstApplication: false,

        DLDFfirstApplicationStatus: [false, false, false, false],
        DLDFsecondApplicationStatus: [false, false, false, false],
        FXQDfirstApplicationStatus: [false, false, false, false],
        FXQDsecondApplicationStatus: [false, false, false, false],
        operationIndex: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        requestOrderGenerate(this.listQuery).then(response => {
          console.log(response)
          if (response.errorCode == 0) {
            this.list = response.data.items
            this.total = response.data.totalRecords
          }
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
      showDLDFfirstApplicationForm(data, index) {
        this.DLDFfirstApplicationShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      closeDLDFfirstApplicationForm() {
        this.DLDFfirstApplicationShow = false
      },

      showDLDFfirstApplicationResultProcessing(data, index) {
        this.DLDFfirstApplicationResultProcessingShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      closeDLDFfirstApplicationResultProcessing() {
        this.DLDFfirstApplicationResultProcessingShow = false
      },

      showDLDFfirstResultNotChangeNumber(data, index) {
        this.DLDFfirstTimeResultAgreeNotChangeNumberShow = true
        this.goodsObject = data
        this.operationIndex = index
      },

      showDLDFfirstResultButChangeNumber(data, index) {
        this.DLDFfirstTimeResultAgreeButChangeNumberShow = true
        this.goodsObject = data
        this.operationIndex = index
      },

      showDLDFfirstResultRejectApplication(data, index) {
        this.DLDFfirstTimeResultRejectApplicationShow = true
        this.goodsObject = data
        this.operationIndex = index
      },

      showDLDFsecondApplicationForm(data, index) {
        this.DLDFsecondTimeApplicationShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      closeDLDFsecondApplicationForm() {
        this.DLDFsecondTimeApplicationShow = false
      },

      showDLDFsecondApplicationResultProcessing(data, index) {
        this.DLDFsecondApplicationResultProcessingShow = true
        this.goodsObject = data
        this.operationIndex = index
      },

      showDLDFsecondResultNotChangeNumber(data, index) {
        this.DLDFsecondTimeResultAgreeNotChangeNumberShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      showDLDFsecondResultButChangeNumber(data, index) {
        this.DLDFsecondTimeResultAgreeButChangeNumberShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      showDLDFsecondResultRejectApplication(data, index) {
        this.DLDFsecondTimeResultRejectApplicationShow = true
        this.goodsObject = data
        this.operationIndex = index
      },

      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      afterDLDFfirstApplication() {
        this.$set(this.DLDFfirstApplicationStatus, this.operationIndex, true)
      },
      afterDLDFsecondApplication() {
        this.$set(this.DLDFsecondApplicationStatus, this.operationIndex, true)
      },


      closeFXQDfirstApplicationForm() {
        this.FXQDfirstApplicationShow = false
      },
      showFXQDfirstApplicationForm(data, index) {
        this.FXQDfirstApplicationShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      afterFXQDfirstApplication() {
        this.$set(this.FXQDfirstApplicationStatus, this.operationIndex, true)
      },

      closeFXQDsecondApplicationForm() {
        this.FXQDsecondTimeApplicationShow = false
      },
      showFXQDsecondApplicationForm(data, index) {
        this.FXQDsecondTimeApplicationShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      afterFXQDsecondApplication() {
        this.$set(this.FXQDsecondApplicationStatus, this.operationIndex, true)
      },
      showFXQDfirstApplicationResultProcessing(data, index) {
        this.FXQDfirstApplicationResultProcessingShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      showFXQDfirstApplicationResult(data, index) {
        this.FXQDfirstTimeResultShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      showFXQDsecondApplicationResultProcessing(data, index) {
        this.FXQDsecondApplicationResultProcessingShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
      showFXQDsecondApplicationResult(data, index) {
        this.FXQDsecondTimeResultShow = true
        this.goodsObject = data
        this.operationIndex = index
      },
    }
  }
</script>
<style scope>

</style>
