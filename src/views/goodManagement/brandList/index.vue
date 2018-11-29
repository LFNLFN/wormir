<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.brandMsg1" placeholder="请输入 品牌编号/品牌名称/产地" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="brandBlurSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="showAddBrand">新增品牌</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="brandTableData"
      style="width: 100%"
      class="border-top2 border-left2 border-right1">
      <el-table-column
        prop="brandNo"
        label="品牌序列号"
        min-width="100"
        align="center"
        fixed="left">
      </el-table-column>
      <el-table-column
        prop="chineseName"
        label="品牌名称（中文）"
        min-width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="englishName"
        label="品牌名称（英文）"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="brandStatus"
        label="品牌状态"
        min-width="120"
        :filters="[{ text: '正常供货', value: '正常供货' }, { text: '停止供货', value: '停止供货' }]"
        :filter-method="filterHandler_brandStatus"
        align="center">
      </el-table-column>
      <el-table-column
        prop="brandOrigin"
        label="原产国/产地"
        min-width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="checkInTime"
        label="录入时间"
        min-width="140"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="130"
        fixed="right"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showEditBrand(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            @click="showGoodManagement(scope.row)">商品管理
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="stopCooperationShow(scope.$index, scope.row)">终止合作
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 1em;text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterForm.currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="filterForm.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterForm.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="isAddBrandShow" width="75%" @close="isAddBrandShow = false" title="新增品牌">
      <addBrand @closeDialog="isAddBrandShow=false" v-if="isAddBrandShow"></addBrand>
    </el-dialog>
    <el-dialog
      :visible.sync="isEditBrandShow"
      width="75%"
      @close="isEditBrandShow = false"
      title="编辑品牌">
      <editBrand
        :brandObj="currentBrand"
        v-if="isEditBrandShow"
        @closeDialog="isEditBrandShow=false">
      </editBrand>
    </el-dialog>
    <el-dialog :visible.sync="isStopCooperationShow"
               width="70%"
               v-if="isStopCooperationShow"
               @close="isStopCooperationShow = false"
               title="终止合作">
      <el-form :model="stopCooperation_ruleForm" :rules="stopCooperation_rules" ref="stopCooperation_ruleForm"
               label-width="150px" class="demo-ruleForm">
        <div class="border1">
          <el-form-item label="终止日期" required class="form-row add-brand-row">
            <el-date-picker
              v-model="stopCooperation_ruleForm.applyTime"
              type="date"
              placeholder="请输入停止供货日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="终止类型" prop="operateType" required class="form-row add-brand-row">
            <el-radio-group v-model="stopCooperation_ruleForm.operateType"
                            style="margin:5px 3px 0;">
              <el-radio label="到期终止" value="1"></el-radio>
              <el-radio label="提前终止" value="2"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="终止原因" prop="applyReason" required class="form-row add-brand-row textareaTitle">
            <el-input type="textarea" placeholder="请输入终止合作原因" v-model="stopCooperation_ruleForm.applyReason"
                      style="margin: 3px;width: 98%"></el-input>
          </el-form-item>
          <el-form-item label="品牌状态" required class="form-row add-brand-row last-form-row">
            <el-select v-model="stopCooperation_ruleForm.brandStatus" placeholder="请选择" style="margin: 3px;">
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
          <el-button type="primary" @click="submitCooperationTermination">保存并提交</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="isGoodManagementShow" width="90%"
               @close="isGoodManagementShow = false"
               :title="goodName + ' 商品管理'">
      <goodManagement
        :goodTableData="goodTableData"
        v-if="isGoodManagementShow"
        @closeDialog="isGoodManagementShow=false">
      </goodManagement>
    </el-dialog>
  </div>
</template>

<script>
  import { brand_BlurSearch } from '@/api/brand'
  import addBrand from './addBrand/index.vue'
  import editBrand from './editBrand/index.vue'
  import goodManagement from './goodManagement/index.vue'

  export default {
    data() {
      return {
        brandTableData: [],
        filterForm: {
          placeholder1: '品牌号/品牌名称',
          brandMsg1: '',
          currentPage: 1,
          page_size: 10,
          total: 0
        },
        isAddBrandShow: false,
        isEditBrandShow: false,
        currentBrand: {},
        isStopCooperationShow: false,
        stopCooperation_ruleForm: {
          applyReason: null,
          operateType: null,
          applyTime: null,
          brandStatus: ''
        },
        stopCooperation_rules: {},
        brandStatusOptions: [{
          value: '1',
          label: '正常供货'
        }, {
          value: '2',
          label: '停止供货'
        }],
        isGoodManagementShow: false,
        goodName: '',
        goodTableData: []
      }
    },
    methods: {
      brandBlurSearch() {
        brand_BlurSearch(this.filterForm.brandMsg1)
          .then((res) => {
            // 这里添加的是补充数据，补充品牌需要但是接口没有给出的信息
            res.data.items.forEach((item, index, arr) => {
              item.transactionCurrencyInland = ['RMB']
              item.transactionCurrencyOutland = ['EUR']
              item.qualityName = ['顶级品质']
              item.packingWay = ['自动包装']
            })
            this.brandTableData = res.data.items
            this.filterForm.total = res.data.items.length
          })
        // .catch(() => { this.$message.error('表格加载失败') })
      },
      handleSizeChange(val) {
        brand_BlurSearch(this.filterForm.value1, 1, val)
          .then((res) => {
            this.brandTableData = res.data.items;
            this.filterForm.total = res.data.items.length
          })
        this.filterForm.page_size = val
      },
      handleCurrentChange(val) {
        brand_BlurSearch(this.filterForm.value1, val)
          .then((res) => {
            this.brandTableData = res.data.items;
            this.filterForm.total = res.data.items.length
          })
        this.filterForm.currentPage = val
      },
      filterHandler_brandStatus(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      showAddBrand() {
        this.isAddBrandShow = true
      },
      showEditBrand(row) {
        this.isEditBrandShow = true
        this.currentBrand = row
      },
      stopCooperationShow() {
        this.isStopCooperationShow = true
      },
      showGoodManagement(row) {
        this.isGoodManagementShow = true
        this.goodName = row.chineseName
        this.goodTableData = row.goodManagement_Arr
      },
      submitCooperationTermination() {
        const vm = this
        this.$alert('终止合作成功。', '', {
          confirmButtonText: this.$t('table.confirm'),
          showClose: false,
          center: true,
          callback() {
            vm.isStopCooperationShow = false
          }
        })
      },
    },
    mounted() {
      this.brandBlurSearch()
    },
    components: {
      addBrand,
      editBrand,
      goodManagement
    }
  }
</script>

<style lang="scss" scoped>
  .el-table .el-button {
    width: 7em;
    margin-left: 1px;
    margin-bottom: 10px;

  &
  :last-of-type {
    margin-bottom: 0
  }

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
