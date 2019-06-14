<template>
  <div>
    <el-table :key='2' :data="emailTable" style="width: 100%;border:solid 2px #D5D5D5;border-bottom-width: 1px"
              :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700'}" fit border srtipe size="mini">
      <el-table-column align="center" width="400" :label="$t('order.emailContact')">
        <template slot-scope="scope">

          <el-row type="flex" justify="start" style="margin: 5px 0" key="add">
            <el-col :span="5" class="clear-col-style emailConfig no-border-right">
              <el-button type="danger" size="mini" @click="isAddingEmail=false" v-if="isAddingEmail">取消
              </el-button>
              <el-button type="success" size="mini" @click="isAddingEmail=true" v-else>新增</el-button>
            </el-col>
            <el-col :span="18" class="clear-col-style emailConfig" v-if="isAddingEmail">
              <el-input v-model.lazy.trim="addedEmail" style="margin-right: 4px"></el-input>
              <el-button type="primary" size="mini" @click="addIntoEmailList" :loading="addingLoading">保存</el-button>
            </el-col>
          </el-row>

          <el-row type="flex" justify="start" v-for="(item,index) in emails" style="margin: 5px 0" :key="index">
            <el-col :span="14" class="clear-col-style emailConfig">
              <el-input v-model.lazy="editingEmails[index]" v-if="isEditingEmail[index]"></el-input>
              <el-checkbox :label="item" :key="item" v-else v-model="checkedEmails"/>
            </el-col>
            <el-col :span="10" class="clear-col-style" v-if="isEditingEmail[index]">
              <el-button type="success" size="mini" @click="saveEdit(index)" :loading="savingLoading">保存</el-button>
              <el-button type="danger" size="mini" @click="cancelEditEmail(index)">取消</el-button>
            </el-col>
            <el-col :span="10" class="clear-col-style" v-else>
              <el-button type="danger" size="mini" style="padding: 3px 8px" icon="el-icon-delete"
                         @click="deleteEmail(index)" :loading="deleteLoading"></el-button>
              <el-button type="primary" size="mini" style="padding: 3px 8px" icon="el-icon-edit"
                         @click="editEmail(index)"></el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('order.emailSubject')">
        <template slot-scope="scope">
          {{ emailTitle }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('order.document')">
        <template slot-scope="scope">
          {{ docTitle }}
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 1em">
      <el-button style="width: 100px" @click="$emit('cancelSending')">{{$t('table.cancel')}}</el-button>
      <el-button style="width: 100px" type="primary" @click="send" :disabled="checkedEmails.length === 0">{{$t('order.send')}}</el-button>
    </div>
  </div>
</template>

<script>
  import { validateEmail } from '@/utils/validate.js'
  export default {
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        emailTable: [{ contacts: [], emailSubject: '', document: '' }],
        emails: [],
        ids: [],
        isAddingEmail: false,
        isEditingEmail: [],
        addedEmail: '',
        editingEmails: [],
        checkedEmails: [],
        emailTitle: '',
        docTitle: '',
        addingLoading: false,
        savingLoading: false,
        deleteLoading: false,
      }
    },
    methods: {
      addIntoEmailList() {
        if (!validateEmail(this.addedEmail)) {
          this.$message.error('请填写合法邮箱')
          return false
        }
        let existedEmail = this.emails.some(e => {
          return e == this.addedEmail
        })
        if (existedEmail) {
            this.$message.error('此邮箱已存在')
            return false
        }
        this.addingLoading = true
        this.$request({
          url: "/user/addAccountEmailContact.do",
          method: "post",
          data: {
            account: JSON.parse(window.localStorage.userInfo).account,
            email: this.addedEmail,
            orderNo: this.currentRow.order_no,
          }
        }).then(res => {
          if (res.errorCode==0) {
            this.addedEmail = null
            this.isAddingEmail = false
            this.addingLoading = false
            this.getList()
          }
          else { this.$message.error('请重试') }
        });

      },
      editEmail(index) {
        this.$set(this.isEditingEmail, index, true)
      },
      cancelEditEmail(index) {
        this.$set(this.isEditingEmail, index, false)
        this.$set(this.editingEmails, index, null)
      },
      saveEdit(index) {
        this.savingLoading = true
        this.$request({
          url: "/user/editAccountEmailContact.do",
          method: "post",
          data: {
            id: this.ids[index],
            email: this.editingEmails[index]
          }
        }).then(res => {
          this.savingLoading = false
          this.cancelEditEmail(index)
          this.getList()
        });
      },
      deleteEmail(index) {
        this.$confirm('确定删除邮箱?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteLoading = true
          this.$request({
            url: "/user/deleteAccountEmailContact.do",
            method: "post",
            data: {
              id: this.ids[index],
            }
          }).then(res => {
            this.deleteLoading = false
            this.getList()
          });
        })
      },
      getList() {
        this.listLoading = true
        this.$request({
          url: "/user/getAccountEmailContact.do",
          method: "post",
          data: { account: JSON.parse(window.localStorage.userInfo).account }
        }).then(res => {
          this.emails = res.data.emails;
          this.ids = res.data.ids;
          this.emailTitle = res.data.emailTitle;
          this.docTitle = res.data.docTitle;
          for (let y=0; y<this.emails.length; y++) {
            this.isEditingEmail.push(false)
          }
          this.listLoading = false
        });
      },
      send() {
        this.$emit('cancelSending')
        this.$message.success('文件已发送至您所选的邮箱。')
      },
    },
    created() {
      this.getList()
    }
  }
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
