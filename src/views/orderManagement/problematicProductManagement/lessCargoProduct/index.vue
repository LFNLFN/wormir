<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 500px;"
        class="filter-item"
        placeholder="货单号/品牌名称/渠道号/渠道名称/商品编号/商品名称"
        v-model="listQuery.searchText"
      ></el-input>
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
      >{{$t('table.search')}}</el-button>
    </div>
    <div class="trade-category-wrap" style="margin-bottom: 10px">
      <el-radio v-model="listQuery.propertyOfSale" :label="1" @change="propertyOfSaleChange">一般贸易商品</el-radio>
      <el-radio v-model="listQuery.propertyOfSale" :label="2" @change="propertyOfSaleChange">跨境贸易商品</el-radio>
    </div>
    <el-table
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border=""
      fit
      highlight-current-row
      class=""
      style="width: 100%;border:1px solid #d5d5d5;"
    >
      <el-table-column
        align="center"
        :label="$t('payRefund.orderNo')"
        min-width="120"
        prop="orderNo"
        fixed="left"
      >
        <template slot-scope="scope">
          <span class="link-type" @click="showOrder(scope.row)">{{scope.row.orderNo}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="120px"
        align="center"
        :label="$t('payRefund.brandName')"
        :filters="brandNameFilters"
        :filter-method="filterHandler"
        prop="brandNameZh"
      >
        <template slot-scope="scope">
          <span>{{scope.row.brandNameZh}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="120px"
        :label="$t('payRefund.retailerCategories')"
        align="center"
        :filters="channelPropFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{scope.row.channelProp | channelPropFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="120px"
        align="center"
        :label="$t('payRefund.retailerNo')"
        prop="channelNo"
      />
      <el-table-column
        min-width="120px"
        align="center"
        :label="$t('payRefund.retailerName')"
        prop="channelName"
      />
      <el-table-column min-width="120px" align="center" label="商品编号" prop="code"/>
      <el-table-column min-width="120px" align="center" label="商品名称" prop="goodName"/>
      <el-table-column min-width="120px" align="center" label="商品规格" prop="sizeZh"/>
      <el-table-column min-width="130px" align="center" label="商品码" prop="goodNo"/>
      <el-table-column min-width="120px" align="center" label="退款金额" prop="lessCargoRefundMoney"/>
      <el-table-column
        min-width="120px"
        align="center"
        label="退款状态"
        prop="lessCargoRefundStatus"
        :filters="lessCargoRefundStatusFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.lessCargoRefundStatus | lessCargoRefundStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="120px"
        align="center"
        label="退款类型"
        prop="lessCargoRefundType"
        :filters="lessCargoRefundTypeFilters"
        :filter-method="filterHandler"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.lessCargoRefundType | lessCargoRefundTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('payRefund.operation')"
        min-width="150"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <!--申请退款-->
          <el-button
            type="primary"
            size="mini"
            v-if="scope.row.lessCargoRefundStatus==0&&scope.row.lessCargoRefundType==1"
            @click="viewApplication(scope.row)"
          >申请退款</el-button>
          <!--待审核状态-->
          <el-button
            type="primary"
            size="mini"
            v-if="scope.row.lessCargoRefundStatus==1&&scope.row.lessCargoRefundType==2"
            @click="viewWaitReview(scope.row)"
          >查看详情</el-button>
          <!--待退款-->
          <div v-if="scope.row.lessCargoRefundStatus==2&&scope.row.propertyOfSale==1">
            <el-button
              type="primary"
              size="mini"
              v-if="scope.row.lessCargoRefundTyppe==2&&scope.row.brandLessCargoRefundPaymentTime"
              @click="goForPayment(scope.row)"
            >去支付</el-button>
            <el-button
              type="primary"
              size="mini"
              v-if="scope.row.lessCargoRefundTyppe==2&&!scope.row.brandLessCargoRefundPaymentTime"
              @click="viewWaitForRefund(scope.row)"
            >查看详情</el-button>
          </div>
          <!--已退款-->
          <el-button
            type="primary"
            size="mini"
            v-if="scope.row.lessCargoRefundStatus==3"
            @click="viewAlreadyRefund(scope.row)"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background=""
        @current-change="changePageList"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!--申请退款状态-->
    <el-dialog :visible.sync="isApplicationShow" :width="dialogWidth">
      <applyForRefund
        :currentRow="currentRow"
        v-if="isApplicationShow"
        @closeApplicationDialog="isApplicationShow=false; getList()"
      ></applyForRefund>
    </el-dialog>
    <!--待审核状态-->
    <el-dialog :visible.sync="isWaitReviewShow" :width="dialogWidth">
      <waitReview :currentRow="currentRow" v-if="isWaitReviewShow"></waitReview>
    </el-dialog>
    <!--待退款状态-->
    <el-dialog :visible.sync="isWaitForRefundShow" :width="dialogWidth">
      <waitForRefund :currentRow="currentRow" v-if="isWaitForRefundShow"></waitForRefund>
    </el-dialog>
    <!--已退款状态-->
    <el-dialog :visible.sync="isAlreadyRefundShow" :width="dialogWidth">
      <alreadyRefund :currentRow="currentRow" v-if="isAlreadyRefundShow"></alreadyRefund>
    </el-dialog>
    <!--查看已收货货单-->
    <el-dialog :visible.sync="isOrderShow" fullscreen style="padding: 20px">
      <alreadyReceive :currentRow="currentRow" v-if="isOrderShow"></alreadyReceive>
    </el-dialog>
    <!--点击去付订金-->
    <el-dialog :visible.sync="payWindowVisible" width="30%" :show-close="false">
      <div v-if="payWindowVisible">
        <div style="text-align: center">
          货单号:
          <span>{{currentRow.orderNo}}</span>
        </div>
        <div style="text-align: center;">账户余额: ￥{{ Number(ruleForm.accountBalance).toFixed(2) }}</div>
        <div style="text-align: center;">支付赔偿退款: ￥{{ currentRow.compensationMoney.substring(1) }}</div>
        <div
          class="warn-notice"
          v-if="Number(ruleForm.accountBalance) < Number(currentRow.compensationMoney.substring(1))"
        >
          温馨提醒：账户余额不足 ，未能支付该笔款项。请使用您绑定的XX银行账号XXXXXXXXXXXXXX自行向吾蜜公司在农商行开通的总金户账户汇入足额金额。
          账户户名：珠海市吾蜜电子商务有限责任公司
        </div>
        <div
          slot="footer"
          class="dialog-footer"
          style="text-align: center"
          v-if="Number(ruleForm.accountBalance) >= Number(currentRow.compensationMoney.substring(1))"
        >
          <el-button type="primary" @click="payWindowVisible=false">暂不</el-button>
          <el-button type="primary" @click="handlePaymentConfirm()">确认支付</el-button>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center" v-else>
          <el-button type="primary" @click="payWindowVisible=false;$emit('close')">知道了</el-button>
        </div>
      </div>
    </el-dialog>
    <!--输入密码弹层 isInputPSWShow-->
    <el-dialog
      :visible.sync="isInputPSWShow"
      class=""
      width="30%"
      @close="isInputPSWShow = false"
      title=""
    >
      <div v-if="isInputPSWShow">
        <h4 class="text-center">请输入密码</h4>
        <el-input type="password" v-model="password" autocomplete="off"></el-input>
        <div class="dialogBottomButton-wrap">
          <el-button type="primary" @click="submitPassword(currentRow)">确认提交</el-button>
          <el-button type="primary" @click="forgetPassword()">忘记密码</el-button>
        </div>
      </div>
    </el-dialog>
    <!--获取验证码弹层 isValiCodeShow-->
    <el-dialog
      :visible.sync="isValiCodeShow"
      class=""
      width="30%"
      @close="isValiCodeShow = false"
      title=""
    >
      <h4 class="text-center">重置密码</h4>
      <p class="text-center text-muted">向已绑定银行卡在银行预留的手机号138****4467发送验证码</p>
      <el-input v-model="valiCode">
        <el-button
          slot="append"
          @click="requestValiCode"
        >{{ theCount || '获取验证码' }}{{theCount?'s':''}}</el-button>
      </el-input>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="submitValiCode()">确认</el-button>
      </div>
    </el-dialog>
    <!--修改密码弹层-->
    <el-dialog
      :visible.sync="isModifyPWDShow"
      class=""
      width="40%"
      @close="isModifyPWDShow = false"
      title="修改密码"
    >
      <el-form
        :model="modifyPWD_ruleForm"
        status-icon
        :rules="pwd_rules"
        ref="modifyPWD_ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="输入密码" prop="newPassword">
          <el-input type="password" v-model="modifyPWD_ruleForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="affirmPassword">
          <el-input type="password" v-model="modifyPWD_ruleForm.affirmPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop>
          <p class="text-muted">温馨提示：请设置6位数字的密码。</p>
        </el-form-item>
        <div class="dialogBottomButton-wrap">
          <el-button type="primary" @click="submitModPasswordForm('modifyPWD_ruleForm')">确认提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { issueGoods } from "@/api/goods";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import alreadyReceive from "../alreadyReceive/index.vue";
import orderStatus from "./orderStatus/index.vue";
import * as tableFilters from "@/tableFilters/index.js";

import waitReview from "./waitReview/index.vue";
import applyForRefund from "./applyForRefund/index.vue";
import waitForRefund from "./waitForRefund/index.vue";
import alreadyRefund from "./alreadyRefund/index.vue";

export default {
  name: "defective-product",
  components: {
    alreadyReceive,
    orderStatus,
    waitReview,
    applyForRefund,
    waitForRefund,
    alreadyRefund
  },
  directives: {
    waves
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请输入密码"));
      } else if (!(value / 1 + 1 > 0) || value.length != 6) {
        callback(new Error("请输入6位数字密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请输入密码"));
      } else if (value !== this.modifyPWD_ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      modifyPWD_ruleForm: {
        account: null,
        oldPassword: null,
        newPassword: null,
        affirmPassword: null
      },
      pwd_rules: {
        account: null,
        oldPassword: [
          { validator: validatePass, required: true, trigger: "blur" }
        ],
        newPassword: [
          { validator: validatePass, required: true, trigger: "blur" }
        ],
        affirmPassword: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ]
      },
      isModifyPWDShow: false,
      theCount: 0,
      valiCode: "",
      isValiCodeShow: false,
      isInputPSWShow: false,
      payWindowVisible: false,
      ruleForm: {},
      password: null,

      isApplicationShow: false,
      isWaitReviewShow: false,
      isWaitForRefundShow: false,
      isAlreadyRefundShow: false,

      list: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        searchText: undefined,
        limit: 20,
        issueType: 30,
        propertyOfSale: 1
      },
      lessCargoRefundStatusFilters: tableFilters.lessCargoRefundStatusFilters,
      lessCargoRefundTypeFilters: tableFilters.lessCargoRefundTypeFilters,
      channelPropFilters: tableFilters.channelPropFilters,
      downloadLoading: false,

      isDetailShow: false,
      detail: {},
      reviewResult: undefined,
      imageViewed: "",
      isViewImageShow: false,
      dialogWidth: "70%",
      brandNameFilters: [],
      isOrderShow: false
    };
  },
  created() {
    this.getList();
    // 获取已绑定的银行账户信息
    this.$request({
      url: "/user/getChannelBindingBankInfo.do",
      method: "post",
      data: {
        account: JSON.parse(window.localStorage.userData).account
      }
    }).then(res => {
      if (res.errorCode == 0) {
        this.ruleForm = res.data;
      }
    });
  },
  methods: {
    // 提交修改的重置密码
    submitModPasswordForm() {
      this.$alert("支付密码已重新设置，请重新进入支付流程。", "", {
        confirmButtonText: "知道了",
        showClose: false,
        center: true,
        type: "success",
        callback: action => {
          this.isModifyPWDShow = false;
          this.isValiCodeShow = false;
          this.isInputPSWShow = false;
          this.payWindowVisible = false;
        }
      });
    },
    // 获取验证码
    submitValiCode() {
      this.isModifyPWDShow = true;
    },
    requestValiCode() {
      this.theCount = 60;
      let _interval = setInterval(() => {
        this.theCount -= 1;
        if (this.theCount === 0) {
          clearInterval(_interval);
        }
      }, 1000);
    },
    forgetPassword() {
      this.isValiCodeShow = true;
    },
    submitPassword(row) {
      this.payWindowVisible = false;
      this.$alert(
        `货单号${row.orderNo}已完成赔偿退款支付，当前账户余额
        ¥ ${(
          Number(this.ruleForm.accountBalance) -
          Number(row.compensationMoney.substring(1))
        ).toFixed(2)}`,
        "",
        {
          confirmButtonText: "知道了",
          showClose: false,
          type: "success",
          callback: action => {
            this.payWindowVisible = false;
            this.isInputPSWShow = false;
          }
        }
      );
    },
    goForPayment(row) {
      this.currentRow = row;
      this.payWindowVisible = true;
    },
    handlePaymentConfirm() {
      this.isInputPSWShow = true;
    },
    getList() {
      this.listLoading = true;
      this.$request({
        url: "/issue/lessCargoProductListManager.do",
        method: "post",
        data: this.listQuery
      })
        .then(res => {
          if (res.errorCode == 0) {
            this.list = res.data.items;
            this.total = res.data.total;
            this.brandNameFilters = res.data.brandNameFilters;
            this.listLoading = false;
          } else {
            this.$message.error("Request failed");
            this.listLoading = false;
          }
        })
        .catch(err => {
          this.$message.error("Request failed");
          this.listLoading = false;
        });
    },

    // 操作详情
    async reviewDetail(row) {
      this.isDetailShow = true;
    },

    async submitApplicationReview() {
      this.$message("提交审核结果");
      this.isDetailShow = false;
    },

    // 操作详情
    async viewApplication(row) {
      this.isApplicationShow = true;
      this.currentRow = row;
    },
    // 待审核状态
    async viewWaitReview(row) {
      this.isWaitReviewShow = true;
      this.currentRow = row;
    },
    // 待退款状态
    async viewWaitForRefund(row) {
      this.isWaitForRefundShow = true;
      this.currentRow = row;
    },
    // 已退款状态
    async viewAlreadyRefund(row) {
      this.isAlreadyRefundShow = true;
      this.currentRow = row;
    },

    viewImage(src) {
      this.imageViewed = src;
      this.isViewImageShow = true;
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    changePageList(val) {
      this.listQuery.page = val;
      this.getList();
    },

    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    showOrder(row) {
      this.currentRow = row;
      this.isOrderShow = true;
    },
    propertyOfSaleChange(val) {
      this.getList();
    }
  }
};
</script>
<style scoped>
.text-muted {
  color: #999;
}

.el-table .el-button {
  min-width: 6em;
}
</style>
