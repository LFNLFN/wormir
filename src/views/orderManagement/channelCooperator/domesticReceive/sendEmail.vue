<template>
  <div>
    <el-table
      :key="2"
      :data="emailTable"
      style="width: 100%;border:solid 2px #D5D5D5;border-bottom-width: 1px"
      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700'}"
      fit
      border=""
      srtipe
      size="mini"
    >
      <el-table-column align="center" width="400" :label="$t('order.emailContact')">
        <template slot-scope="scope">
          <el-row type="flex" justify="start" style="margin: 5px 0" key="add">
            <el-col :span="5" class="clear-col-style emailConfig no-border-right">
              <el-button
                type="danger"
                size="mini"
                @click="isAddingEmail=false"
                v-if="isAddingEmail"
              >Cancel</el-button>
              <el-button type="success" size="mini" @click="isAddingEmail=true" v-else>Add</el-button>
            </el-col>
            <el-col :span="18" class="clear-col-style emailConfig" v-if="isAddingEmail">
              <el-input v-model.lazy.trim="addedEmail" style="margin-right: 4px"></el-input>
              <el-button
                type="primary"
                size="mini"
                @click="addIntoEmailList"
                :loading="addingLoading"
              >Save</el-button>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="start"
            v-for="(item,index) in emails"
            style="margin: 5px 0"
            :key="index"
          >
            <el-col :span="14" class="clear-col-style emailConfig">
              <el-input v-model.lazy="editingEmails[index]" v-if="isEditingEmail[index]"></el-input>
              <el-checkbox :label="item" :key="item" v-else v-model="checkedEmails"/>
            </el-col>
            <el-col :span="10" class="clear-col-style" v-if="isEditingEmail[index]">
              <el-button
                type="success"
                size="mini"
                @click="saveEdit(index)"
                :loading="savingLoading"
              >Save</el-button>
              <el-button type="danger" size="mini" @click="cancelEditEmail(index)">Cancel</el-button>
            </el-col>
            <el-col :span="10" class="clear-col-style" v-else>
              <el-button
                type="danger"
                size="mini"
                style="padding: 3px 8px"
                icon="el-icon-delete"
                @click="deleteEmail(index)"
                :loading="deleteLoading"
              ></el-button>
              <el-button
                type="primary"
                size="mini"
                style="padding: 3px 8px"
                icon="el-icon-edit"
                @click="editEmail(index)"
              ></el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('order.emailSubject')">
        <template slot-scope="scope">{{ emailTitle }}</template>
      </el-table-column>
      <el-table-column align="center" label="Document Subject">
        <template slot-scope="scope">
          <!-- <p v-if="docTitle.length>0" v-for="(e,i) in docTitle" :key="i">{{ e }}</p> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 1em">
      <el-button style="width: 100px" @click="$emit('cancelSending')">{{$t('table.cancel')}}</el-button>
      <el-button
        style="width: 100px"
        type="primary"
        @click="send"
        :disabled="checkedEmails.length === 0"
      >{{$t('order.send')}}</el-button>
    </div>
  </div>
</template>

<script>
import { validateEmail } from "@/utils/validate.js";
export default {
  props: {
    currentRow: {
      type: Object,
      required: false
    },
    parentPage: {
      type: Number
    },
    orders: {
      type: Array
    }
  },
  data() {
    return {
      emailTable: [{ contacts: [], emailSubject: "", document: "" }],
      emails: [],
      ids: [],
      isAddingEmail: false,
      isEditingEmail: [],
      addedEmail: "",
      editingEmails: [],
      checkedEmails: [],
      emailTitle: "",
      docTitle: [],
      addingLoading: false,
      savingLoading: false,
      deleteLoading: false,
      fileUrlArr: []
    };
  },
  methods: {
    addIntoEmailList() {
      if (!validateEmail(this.addedEmail)) {
        this.$message.error("请填写合法邮箱");
        return false;
      }
      let existedEmail = this.emails.some(e => {
        return e == this.addedEmail;
      });
      if (existedEmail) {
        this.$message.error("此邮箱已存在");
        return false;
      }
      this.addingLoading = true;
      this.$request({
        url: "/user/addAccountEmailContact.do",
        method: "post",
        data: {
          email: this.addedEmail
        }
      })
        .then(res => {
          if (res.errorCode == 0) {
            this.addedEmail = null;
            this.isAddingEmail = false;
            this.addingLoading = false;
            this.getList();
          } else {
            this.$message.error("请重试");
          }
        })
        .catch(err => {
          this.$message.error("请重试");
          this.addingLoading = false;
        });
    },
    editEmail(index) {
      this.$set(this.isEditingEmail, index, true);
    },
    cancelEditEmail(index) {
      this.$set(this.isEditingEmail, index, false);
      this.$set(this.editingEmails, index, null);
    },
    saveEdit(index) {
      this.savingLoading = true;
      this.$request({
        url: "/user/editAccountEmailContact.do",
        method: "post",
        data: {
          id: this.ids[index],
          email: this.editingEmails[index]
        }
      }).then(res => {
        this.savingLoading = false;
        this.cancelEditEmail(index);
        this.getList();
      });
    },
    deleteEmail(index) {
      this.$confirm("确定删除邮箱?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteLoading = true;
        this.$request({
          url: "/user/deleteAccountEmailContact.do",
          method: "post",
          data: {
            id: this.ids[index]
          }
        }).then(res => {
          this.deleteLoading = false;
          this.getList();
        });
      });
    },
    getList() {
      this.listLoading = true;
      this.$request({
        url: "/user/getAccountEmailContact.do",
        method: "post",
        data: {}
      }).then(res => {
        this.emails = res.data.emails;
        this.ids = res.data.ids;
        for (let y = 0; y < this.emails.length; y++) {
          this.isEditingEmail.push(false);
        }
        this.listLoading = false;
      });
    },
    async getSendingDoc() {
      let codeArr = [];
      for (let index = 0; index < this.orders.length; index++) {
        const element = this.orders[index].orderNo;
        await this.$request({
          url: "/order/orderDetail.do",
          method: "post",
          data: { orderNo: element }
        }).then(res => {
          if (res.errorCode == 0) {
            res.data.goodList.forEach((e, i) => {
              codeArr.push(e.goodsNoForBrand);
            });
          }
        });
      }
      codeArr = codeArr.filter((e, i, s) => {
        return s.indexOf(e) == i;
      });
      // 以上操作获取了并单中所有商品的商品编号

      this.$request({
        url: "/brand/getSendingDoc.do",
        method: "post",
        data: { codes: codeArr }
      }).then(res => {
        if (res.errorCode == 0) {
          for (let index = 0; index < res.data.fooArr.length; index++) {
            const ele = res.data.fooArr[index];
            this.docTitle.push(ele.fileName);
            this.fileUrlArr.push(ele.fileUrl)
          }
        }
      });
    },
    send() {
      this.$request({
        url: "/brand/brandOutboundSending.do",
        method: "post",
        data: {
          receiverEmailArr: this.checkedEmails,
          filePathArr: this.fileUrlArr,
          fileName: this.emailTitle,
          docTitle: this.docTitle,
        }
      }).then(res => {
        if (res.errorCode == 0) {
          const vm = this;
          // alert确定弹框
          this.$alert(
            "文件已发送至您所选的邮箱。",
            "",
            {
              confirmButtonText: "Confirm",
              showClose: false,
              type: "success",
              callback: action => {
                vm.$emit("cancelSending");
              }
            }
          );
        }
      });
    }
  },
  created() {
    // parentPage
    // 1--arrange outbound -general
    // 2--arrange outbound -cross
    // 3--sendInvoice
    if (this.parentPage == 1) {
      this.emailTitle = this.currentRow.mergeOrderNo + " 报关报检";
      // this.docTitle[0] = this.currentRow.mergeOrderNo + "ODO.pdf";
      this.getSendingDoc();
    } else if (this.parentPage == 2) {
      this.emailTitle = this.currentRow.mergeOrderNo + " 待收发货";
      // this.docTitle[0] = this.currentRow.mergeOrderNo + "ODO.pdf";
      this.getSendingDoc();
    }
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
  /*清除一些el-col的自定义默认样式*/
  .clear-col-style {
    background-color: transparent !important;
  }
  /*邮件的样式对齐问题*/
  .emailConfig {
    justify-content: flex-start !important;
    & .el-input {
      margin-right: 10px;
    }
  }

  .el-col:nth-child(odd):not(:last-of-type) {
    border-right: none;
  }
</style>
