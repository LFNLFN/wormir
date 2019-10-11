<template>
    <div style="padding:1em;">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="filterForm.searchText" placeholder="请输入货单号/渠道号" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table
      border v-loading="tableLoading"
      :data="brandTableData"
      style="width: 100%;border: 1px solid #d5d5d5"
      >
      <el-table-column
        prop="brandNo"
        label="货单号/并单号"
        min-width="100"
        align="center"
        fixed="left">
      </el-table-column>
      <el-table-column
        prop="englishName"
        label="交易SWFIT Code"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="chineseName"
        label="交易类型"
        min-width="120"
        :filters="[{ text: '国内收款', value: 100 }, { text: '国外收款', value: -100 }]"
        :filter-method="filterHandler"
        align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.brandStatus | brandStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="productionPlaceChinese"
        label="交易项目"
        :filters="[{ text: '国内收款', value: 100 }, { text: '国外收款', value: -100 }]"
        :filter-method="filterHandler"
        min-width="100"
        align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.brandStatus | brandStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="contractStatus"
        label="交易收支"
        min-width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="brandStatus"
        label="确认收支时间"
        min-width="120"
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
            @click="showEditBrand(scope.row)">查看详情
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
    </div>
</template>

<script>
export default {
    data(){
        return{
            filterForm:{
                searchText:''
            },
            tableLoading:false,
            brandTableData:[]
        }
    },
    methods:{
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        handleSizeChange(val){

        },
        handleCurrentChange(val){
            
        }
    }
}
</script>