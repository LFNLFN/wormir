<template>
  <div style="padding: 1em">
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="渠道状态:">
        <el-select v-model="filterForm.channelStatus" placeholder="请选择" style="width:130px;">
          <el-option
            v-for="item in channelStatusFilters"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作类型:">
        <el-select v-model="filterForm.cooperationType" placeholder="请选择" style="width:130px;">
          <el-option
            v-for="item in cooperationTypeFilters"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道类别:">
        <el-select v-model="filterForm.channelType" placeholder="请选择" style="width:130px;">
          <el-option
            v-for="item in channelTypeFilters"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道属性:">
        <el-select v-model="filterForm.channelProp" placeholder="请选择" style="width:130px;">
          <el-option
            v-for="item in channelPropFilters"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道级别:">
        <el-select v-model="filterForm.channelLevel" placeholder="请选择" style="width:130px;">
          <el-option
            v-for="item in channelLevelFilters"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="filterForm.searchText" :placeholder="filterForm.placeholder" style="wdith:230px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="channelSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="showAdd">新增渠道</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :border="true"
      :data="channelTableData"
      style="width: 100%;border-top: 1px solid #D5D5D5;border-left: 1px solid #D5D5D5"
      v-loading="listLoading"
    >
      <el-table-column prop="channelNum" label="渠道号" min-width="180" align="center"></el-table-column>
      <el-table-column prop="channelCode" label="渠道名称" min-width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channelCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelStatusText"
        label="渠道状态"
        align="center"
        min-width="130"
        
      >
        <!-- :filters="channelStatusFilters"
        :filter-method="filterHandler" -->
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.channelStatus | channelStatusFilter }}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="cooperationTypeText"
        label="合作类型"
        align="center"
        min-width="120"
      >
          <!-- :filters="cooperationTypeFilters"
          :filter-method="filterHandler" -->
        <!-- <template slot-scope="scope">
          
          <span>{{ scope.row.cooperationType | cooperationTypeFilter }}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="channelType"
        label="渠道类别"
        align="center"
        min-width="120"
      >
         <!-- :filters="channelTypeFilters" -->
        <!-- :filter-method="filterHandler" -->
        <template slot-scope="scope">
          <span v-if="scope.row.channelType>0">{{ scope.row.channelType | channelTypeFilter }}</span>
          <span v-else>——</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelPropText"
        label="渠道属性"
        align="center"
        min-width="120"
        
      >
      <!-- :filters="channelPropFilters" -->
        <!-- :filter-method="filterHandler" -->
        <!-- <template slot-scope="scope">
          <div style="min-width: 4em;margin: 0 auto">{{ scope.row.channelProp | channelPropFilter }}</div>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        width="160"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" min-width="150">
        <template slot-scope="scope">
          <!-- 待签合同 -->
          <div v-if="scope.row.channelStatus==1" class="button-wrap">
            <el-button size="mini" @click="showConfirm(scope.row)">去确认</el-button>
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
            <el-button size="mini" type="danger" @click="showDelete(scope.row)">强制注销</el-button>
          </div>
          <!-- 停止签合同 -->
          <div v-else-if="scope.row.channelStatus==1" class="button-wrap">
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
          </div>
          <!-- 待激活账号 -->
          <div v-else-if="scope.row.channelStatus==2" class="button-wrap">
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
            <el-button size="mini" type="danger" @click="showDelete(scope.row)">强制注销</el-button>
          </div>
          <!-- 停止激活账号 -->
          <div v-else-if="scope.row.channelStatus==2" class="button-wrap">
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
          </div>
          <!-- 待付保证金 -->
          <div v-else-if="scope.row.channelStatus==3" class="button-wrap">
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
            <el-button size="mini" type="danger" @click="showDelete(scope.row)">强制注销</el-button>
          </div>
          <!-- 停止付保证金 -->
          <div v-else-if="scope.row.channelStatus==-3" class="button-wrap">
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
          </div>
          <!-- 待接系统-待审核渠道申请注销（首次） -->
          <div
            v-else-if="scope.row.channelStatus==4&&scope.row.cancellationStatus==1&&scope.row.cancellationOperateType==2"
            class="button-wrap"
          >
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
            <el-button size="mini" type="danger" @click="showReviewCancel(scope.row)">注销审核</el-button>
          </div>
          <!-- 待接系统 -->
          <div v-else-if="scope.row.channelStatus==4" class="button-wrap">
            <el-button size="mini" @click="showConfirm(scope.row)">去确认</el-button>
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
            <el-button size="mini" type="danger" @click="showDelete(scope.row)">注销渠道</el-button>
          </div>
          <!-- 待返还保证金 -->
          <div v-else-if="scope.row.channelStatus==8" class="button-wrap">
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
          </div>
          <div v-else>
            <el-button
              size="mini"
              v-if="scope.row.channelStatus==3"
              @click="confirmSecurityAmount(scope.row)"
            >确认付保证金</el-button>
            <el-button size="mini" @click="showCheck(scope.row)">去查看</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 1em;text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filterForm.currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="filterForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterForm.total"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="isAddShow" width="75%" @close="isAddShow = false" title="新增渠道">
      <to-add v-if="isAddShow" @submitSuccess="addSuccess"></to-add>
    </el-dialog>
    <el-dialog :visible.sync="isConfirmShow" width="75%" @close="isConfirmShow = false" title="">
      <to-confirm :currentRow="currentRow" v-if="isConfirmShow" @submitSuccess="confirmSuccess"></to-confirm>
    </el-dialog>
    <el-dialog :visible.sync="isCheckShow" width="75%" @close="isCheckShow = false" title="渠道档案">
      <to-check :currentRow="currentRow" v-if="isCheckShow"></to-check>
    </el-dialog>
    <el-dialog
      :visible.sync="isDeleteShow"
      width="75%"
      @close="isDeleteShow = false;channelSearch()"
      title="注销渠道"
    >
      <to-delete :currentRow="currentRow" v-if="isDeleteShow" @submitSuccess="deleteSuccess"></to-delete>
    </el-dialog>
    <el-dialog
      :visible.sync="isReviewCancelShow"
      width="75%"
      @close="isReviewCancelShow = false"
      title="注销审核"
    >
      <reviewCancel
        :currentRow="currentRow"
        v-if="isReviewCancelShow"
        @cancelReviewSuccess="cancelReviewSuccess"
      ></reviewCancel>
    </el-dialog>
  </div>
</template>

<script>
import toAdd from "./toAdd.vue";
import toConfirm from "./toConfirm.vue";
import toCheck from "./toCheck.vue";
import toDelete from "./toDelete.vue";
import reviewCancel from "./reviewCancel.vue";
import { channel_BlurSearch } from "@/api/channel";
import request from "@/utils/request";

export default {
  data() {
    return {
      listLoading: false,
      filterForm: {
        placeholder: "渠道号/渠道名称/公司名称/身份证号",
        searchText: "",
        channelStatus:"",
        cooperationType:'',
        channelType:"",
        channelLevel:'',
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      channelTableData: [], //列表数据
      channelCodeFilters: [
        // { text: "（独立渠道）DLQD", value: 1 },
        // { text: 'DFQD', value: 2 },
        // { text: "（分销渠道）FXQD", value: 3 }
      ],
      channelStatusFilters: [
        // { text: "待签合同", value: 1 }, 100
        // { text: "待激活账号", value: 2 }, 200
        // { text: "待付保证金", value: 3 }, 300
        // { text: "待接系统", value: 4 }, 400 
        // { text: "停止签合同", value: 5 },-100
        // { text: "停止激活账号", value: 6},-200
        // { text: "停止付保证金", value: 7 },-300
        // { text: "不返还保证金", value:10},-350
        /*{ text: "停止技术对接", value: -400 },
        { text: '停止审核', value: -50 },
        { text: '审核不通过', value: -40 },*/
        // { text: "待返还保证金", value: 8 }, -950
        // { text: "已返还保证金", value: 9 }, -900
        /*{ text: '待提交审核', value: 40 },
        { text: '待审核', value: 50 },
        { text: "已开通", value: 1000 }
        { text: '停止合作', value: -1000 },*/
        // {text:'正常合作',value:11},
        // {text:'确认注销',value:12},
        // {text:'驳回申请',value:13},
        // {text:'停止审核',value:14},
      ],
      cooperationTypeFilters: [
        // { text: "渠道入驻", value: 1 },
        // { text: "渠道变更", value: 2 }
      ],
      channelTypeFilters: [
        // { text: "淘宝C店", value: 1 },
        // { text: "淘宝企业店", value: 2 },
        // { text: "天猫店", value: 3 },
        // { text: "B2C平台", value: 4 }
      ],
      channelPropFilters: [
        // { text: "独立渠道(DLQD)", value: 1 },
        /*{ text: '代发渠道(DFQD)', value: 2 },*/
        // { text: "分销渠道(FXQD)", value: 3 }
      ],
      channelLevelFilters:[
        // { text: "A级渠道", value: 1 },
        // { text: 'B级渠道', value: 2 },
        // { text: "C级渠道", value: 3 },
        // { text: "D级渠道", value: 4 },
      ],
      isAddShow: false,
      isConfirmShow: false,
      isCheckShow: false,
      isDeleteShow: false,
      isReviewCancelShow: false,
      currentRow: {
        contactData:[],
        contractData:[],
        terminationData:[],
        channelRejectRecordData:[]
      }
    };
  },
  methods: {
    channelSearch() {
      this.listLoading = true;
      request({
        url: "/channel/newChannelList.do",
        method: "post",
        data: {
          page: this.filterForm.currentPage,
          limit: this.filterForm.pageSize,
          searchText: this.filterForm.searchText
        }
      })
      .then(res => {
        if (res.errorCode == 0) {
          this.channelTableData = res.data.items;
          this.filterForm.total = res.data.total;
          console.log(this.channelTableData)
        } else {
          this.$message.error("数据请求失败");
        }
        this.listLoading = false;
      })
      .catch(() => {
        this.$message.error("数据请求失败");
        this.listLoading = false;
      });
    },
    getCurrentRow(val){
      let _this=this;
      // 联系人
      request({
        url: "/channel/getChannelContactsArr.do",
        method: "post",
        data: {
          channelNo:val
        }
      })
      .then(res => {
        if (res.errorCode == 0) {
          _this.currentRow.contactData=res.data
          console.log('联系人',_this.currentRow)
        } else {
          this.$message.error("数据请求失败");
        }
      })
      .catch(() => {
        this.$message.error("数据请求失败");
      });
      // 合约记录
      request({
        url: "/channel/getContractModelArr.do",
        method: "post",
        data: {
          channelNo:val
        }
      })
      .then(res => {
        if (res.errorCode == 0) {
          _this.currentRow.contractData=res.data
          console.log('合约记录',_this.currentRow)
        } else {
          this.$message.error("数据请求失败");
        }
      })
      .catch(() => {
        this.$message.error("数据请求失败");
      });
      // 终止
      request({
        url: "/channel/getChannelCancelModelArr.do",
        method: "post",
        data: {
          channelNo:val
        }
      })
      .then(res => {
        if (res.errorCode == 0) {
          _this.currentRow.terminationData=res.data
          console.log('终止',_this.currentRow)
        } else {
          this.$message.error("数据请求失败");
        }
      })
      .catch(() => {
        this.$message.error("数据请求失败");
      });
      // 驳回
      request({
        url: "/channel/getChannelRejectRecordArr.do",
        method: "post",
        data: {
          channelNo:val
        }
      })
      .then(res => {
        if (res.errorCode == 0) {
          _this.currentRow.channelRejectRecordData=res.data
          console.log('驳回',_this.currentRow)
        } else {
          this.$message.error("数据请求失败");
        }
      })
      .catch(() => {
        this.$message.error("数据请求失败");
      });
    },
    showAdd() {
      this.isAddShow = true;
    },
    showConfirm(row) {
      let _this=this;
      this.currentRow = row;
      this.getCurrentRow(row.channelNo)
      setTimeout(function(){
        _this.isConfirmShow = true;
      },500)
    },
    confirmSecurityAmount(row) {
      this.$confirm("确认支付保证金?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "confirm",
        center: true
      })
        .then(event => {
          request({
            url: "/channel/confirmDeposit.do",
            method: "post",
            data: { channelNo: row.channelNo }
          }).then(res => {
            if (res.errorCode == 0) {
              this.$message({
                type: "success",
                message: "确认成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    showCheck(row) {
      let _this=this;
      this.currentRow = row;
      this.getCurrentRow(row.channelNo)
      setTimeout(function(){
        _this.isCheckShow = true;
      },500)
      
    },
    showDelete(row) {
      let _this=this;
      this.currentRow = row;
      this.getCurrentRow(row.channelNo)
      setTimeout(function(){
        _this.isDeleteShow = true;
      },500)
    },
    showReviewCancel(row) {
      let _this=this;
      this.currentRow = row;
      this.getCurrentRow(row.channelNo)
      setTimeout(function(){
        _this.isReviewCancelShow = true;
      },500)
    },
    handleSizeChange(val) {
      //        channel_BlurSearch(this.filterForm.searchText, 1, val)
      //          .then((res) => {
      //            this.channelTableData = res.data;
      //            this.filterForm.total = res.data.length
      //          })
      this.filterForm.pageSize = val;
      this.channelSearch();
    },
    handleCurrentChange(val) {
      //        channel_BlurSearch(this.filterForm.searchText, val)
      //          .then((res) => {
      //            this.channelTableData = res.data;
      //            this.filterForm.total = res.data.length
      //          })
      this.filterForm.currentPage = val;
      this.channelSearch();
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      console.log(column)
      return row[property] === value;
    },
    addSuccess() {
      this.isAddShow = false;
      this.$message({
        message: "新增成功！",
        type: "success"
      });
      this.channelSearch();
    },
    confirmSuccess() {
      this.isConfirmShow = false;
      this.channelSearch();
    },
    deleteSuccess() {
      this.isDeleteShow = false;
      this.$message({
        message: "注销成功！",
        type: "success"
      });
      this.channelSearch();
    },
    cancelReviewSuccess() {
      this.isReviewCancelShow = false;
      this.$message({
        message: "审核成功！",
        type: "success"
      });
      this.channelSearch();
    },
    getTag(){
      request({
        url: "/channel/fetchNewChanneDropDownList.do",
        method: "post",
      })
      .then(res => {
        if (res.errorCode == 0) {
          console.log(res.data)
          this.channelCodeFilters=res.data.channelCodeFilters;
          this.channelStatusFilters=res.data.channelStatusFilters;
          this.cooperationTypeFilters=res.data.cooperationTypeFilters;
          this.channelTypeFilters=res.data.channelTypeFilters;
          this.channelPropFilters=res.data.channelPropFilters;
          this.channelLevelFilters=res.data.channelLevelFilters;
        } else {
          this.$message.error("数据请求失败");
        }
      })
      .catch(() => {
        this.$message.error("数据请求失败");
      });
// channel/fetchNewChannelListDetails.do
    },
  },
  components: {
    toAdd,
    toCheck,
    toConfirm,
    toDelete,
    reviewCancel
  },
  mounted() {
    this.getTag();
    this.channelSearch();
  }
};
</script>

<style lang="scss" scoped>
.el-table .el-button {
  width: 9em;
  // margin-left: 1px;
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
}
.el-button + .el-button {
  margin-left: 0px;
}
// 表格按钮列
.button-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
