<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="filterForm.searchText" placeholder="请输入品牌序列号/品牌名称/产地" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="brandBlurSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="showAddBrand">新增品牌</el-button>
      </el-form-item>
    </el-form>
    <!-- border-top: 2px solid #d5d5d5;border-left: 2px solid #d5d5d5 -->
    <el-table
      border v-loading="tableLoading"
      :data="brandTableData"
      style="width: 100%;"
      >
      <el-table-column
        prop="brandNo"
        label="品牌序列号"
        min-width="100"
        align="center"
        fixed="left">
      </el-table-column>
      <el-table-column
        prop="englishName"
        label="品牌名称（英文）"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="chineseName"
        label="品牌名称（中文）"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="productionPlaceChinese"
        label="原产国/产地"
        min-width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="contractStatus"
        label="合同状态"
        min-width="120"
        :filters="[{ text: '自动续签', value: 100 }, { text: '到期终止', value: -100 }, { text: '提前终止', value: -200 }]"
        :filter-method="filterHandler"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contractStatus | contractStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="brandStatus"
        label="品牌状态"
        min-width="120"
        :filters="[{ text: '正常供货', value: 1 }, { text: '停止供货', value: 2 }, { text: '待定', value: 3 }]"
        :filter-method="filterHandler"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brandStatus | brandStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sublicense"
        label="品牌授权"
        min-width="120"
        :filters="[{ text: '转授权', value: 1 }, { text: '非转授权', value: 2 }]"
        :filter-method="filterHandler"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sublicense | sublicenseFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="discountTargetObj"
        label="供货类型"
        min-width="120"
        :filters="[{ text: '一般贸易', value: 1 }, { text: '跨境贸易', value: 2 }, { text: '一般贸易+跨境贸易', value: 3 }]"
        :filter-method="filterHandler"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.discountTargetObj | discountTargetObjFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="flow"
        label="系统使用"
        min-width="120"
        :filters="[{ text: '全部使用常规流程', value: 1 }, { text: '部分使用特殊流程', value: 2 }]"
        :filter-method="filterHandler"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.flow | flowFilter }}</span>
        </template>
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

          <!--style="margin: 1em 0;"-->
          <el-badge :value="scope.row.unReviewCount==0? '0':scope.row.unReviewCount">
            <el-button
              size="mini"
              @click="showGoodManagement(scope.row)">商品管理
            </el-button>
          </el-badge>


          <!-- <el-button
            size="mini"
            type="danger"
            @click="stopCooperationShow(scope.$index, scope.row)">终止合作
          </el-button> -->
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
    <el-dialog :visible.sync="isAddBrandShow" v-if="isAddBrandShow" width="85%" @close="isAddBrandShow = false" title="新增品牌">
      <addBrand v-if="isAddBrandShow" @submitSuccess="submitSuccess"></addBrand>
    </el-dialog>
    <el-dialog :visible.sync="isEditBrandShow" width="85%" @close="isEditBrandShow = false" title="编辑品牌">
      <editBrand :brandNo="currentBrand.brandNo" v-if="isEditBrandShow" @submitSuccess="editSuccess"></editBrand>
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
        :brandNo="selectBrandNo"
        :brandName='selectBrandName'
        v-if="isGoodManagementShow"
        @closeDialog="isGoodManagementShow=false">
      </goodManagement>
    </el-dialog>
  </div>
</template>

<script>
  import { brand_BlurSearch } from '@/api/brand'
  import { getUserInfo } from '@/api/login'
//  import addBrand from './addBrand/index.vue'
  import addBrand from './addBrand/newIndex.vue'
//  import editBrand from './editBrand/index.vue'
  import editBrand from './addBrand/editIndex.vue'
  import goodManagement from './goodManagement/index.vue'
  import request from "@/utils/request";

  import { brandStatusFilter } from '@/filters/index'

  export default {
    data() {
      return {
        tableLoading: false,
        brandTableData: [],
        filterForm: {
          searchText: '',
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
        selectBrandNo: '',
        selectBrandName: ''
      }
    },
    methods: {
      brandBlurSearch() {
        this.tableLoading = true
        request({
          url: '/brand/brandList.do',
          method: 'post',
          data: {
            page: this.filterForm.currentPage,
            limit: this.filterForm.page_size,
            searchText: this.filterForm.searchText
          }
        }).then((res) => {
          console.log(res)
          this.brandTableData = res.data.items
          this.filterForm.total = res.data.total
          this.tableLoading = false
          
        }).catch((err) => {
          console.log(err)
          this.$message.error('数据请求失败');
          this.tableLoading = false
        })
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
      filterHandler(value, row, column) {
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
        this.goodName = row.chineseName
        this.selectBrandNo = row.brandNo
        this.selectBrandName = row.englishName
        this.isGoodManagementShow = true
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
      submitSuccess() {
        this.isAddBrandShow = false
        this.$confirm(`品牌信息已保存，可在“品牌列表页”点击『编辑』进行修改。`, { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
        this.brandBlurSearch()
      },
      editSuccess() {
        this.isEditBrandShow = false
        this.$message({
          message: '编辑成功！',
          type: 'success'
        });
        this.brandBlurSearch()
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
