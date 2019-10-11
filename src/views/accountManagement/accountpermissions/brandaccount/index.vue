<template>
    <div style="padding:1em;">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="filterForm.searchText" placeholder="吾蜜账号/姓名/部门名称/职位/手机号码/联系邮箱" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" icon="el-icon-plus" @click="showAddAccount">新增账户</el-button>
            </el-form-item>
        </el-form>
        <el-table
            border v-loading="tableLoading"
            :data="wormirTableData"
            style="width: 100%;border-bottom:1px solid #d5d5d5;"
            class="table_border"
            >
            <el-table-column
                prop="brandNo"
                label="品牌名称"
                min-width="100"
                align="center"
                :filters="[{ text: '正常使用', value: 1 }, { text: '停止使用', value: 2 }]"
                :filter-method="filterHandler"
                fixed="left">
            </el-table-column>
            <el-table-column
                prop="englishName"
                label="品牌账户"
                min-width="120"
                align="center">
            </el-table-column>
            <el-table-column
                prop="chineseName"
                label="账户姓名"
                min-width="120"
                align="center">
            </el-table-column>
            <el-table-column
                prop="productionPlaceChinese"
                label="联系电话"
                min-width="120"
                align="center">
            </el-table-column>
                <!-- :filters="[{ text: '自动续签', value: 100 }, { text: '到期终止', value: -100 }, { text: '提前终止', value: -200 }]"
                :filter-method="filterHandler" -->
            <el-table-column
                prop="contractStatus"
                label="性别"
                min-width="100"
                align="center">
                <!-- <template slot-scope="scope">
                <span>{{ scope.row.contractStatus | contractStatus }}</span>
                </template> -->
            </el-table-column>
                <!-- :filters="[{ text: '正常供货', value: 1 }, { text: '停止供货', value: 2 }, { text: '待定', value: 3 }]"
                    :filter-method="filterHandler" -->
            <el-table-column
                prop="brandStatus"
                label="工作部门"
                min-width="120"
                
                align="center">
                <!-- <template slot-scope="scope">
                <span>{{ scope.row.brandStatus | brandStatusFilter }}</span>
                </template> -->
            </el-table-column>
                <!-- :filters="[{ text: '转授权', value: 1 }, { text: '非转授权', value: 2 }]"
                :filter-method="filterHandler" -->
            <el-table-column
                prop="sublicense"
                label="工作职位"
                min-width="120"
                
                align="center">
                <!-- <template slot-scope="scope">
                <span>{{ scope.row.sublicense | sublicenseFilter }}</span>
                </template> -->
            </el-table-column>
                <!-- :filters="[{ text: '一般贸易', value: 1 }, { text: '跨境贸易', value: 2 }, { text: '一般贸易+跨境贸易', value: 3 }]"
                    :filter-method="filterHandler" -->
            <el-table-column
                prop="discountTargetObj"
                label="联系邮箱"
                min-width="120"
            
                align="center">
                <!-- <template slot-scope="scope">
                <span>{{ scope.row.discountTargetObj | discountTargetObjFilter }}</span>
                </template> -->
            </el-table-column>
            <el-table-column
                prop="flow"
                label="账号状态"
                min-width="120"
                :filters="[{ text: '正常使用', value: 1 }, { text: '停止使用', value: 2 }]"
                :filter-method="filterHandler"
                align="center">
                <!-- <template slot-scope="scope">
                <span>{{ scope.row.flow | flowFilter }}</span>
                </template> -->
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
                <!-- <el-badge :value="scope.row.unReviewCount==0? '0':scope.row.unReviewCount">
                    <el-button
                    size="mini"
                    @click="showGoodManagement(scope.row)">商品管理
                    </el-button>
                </el-badge> -->


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
        <el-dialog :visible.sync="isAddAccountShow" v-if="isAddAccountShow" width="85%" @close="isAddAccountShow = false" title="新增账户">
        <addCount v-if="isAddAccountShow"></addCount>
        </el-dialog>
    </div>
</template>

<script>
import addCount from './addCount/index.vue'
export default {
    components: {
        addCount
    },
    data(){
        return{
            filterForm: {
                searchText: '',
                currentPage: 1,
                page_size: 10,
                total: 0
            },
            tableLoading: false,
            wormirTableData:[],
            isAddAccountShow:false
        }
    },
    methods:{
        showAddAccount(){
            this.isAddAccountShow=true;
        },
        handleSizeChange(val) {
        this.filterForm.page_size = val
      },
      handleCurrentChange(val) {
        this.filterForm.currentPage = val
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
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
