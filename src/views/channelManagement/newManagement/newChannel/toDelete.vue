<template>
  <div>
    <p v-if="currentRow.channelStatus<400">注销说明: 超级管理员特有权限，仅存在渠道支付保证金之前操作，请谨慎操作！</p>
    <h3 v-if="currentRow.channelStatus>=200" class="form-part-title">合同信息</h3>
    <el-table
      v-if="currentRow.channelStatus>=200"
      border
      :data="contractData"
      ref="contractTable"
      style="width: 100%;border-width: 2px;border-bottom-width: 1px"
      class="no-border">
      <el-table-column
        prop="contractNo"
        label="合同编号"
        align="center"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="contractSigningType"
        label="合同属性"
        align="center"
        min-width="90">
        <template slot-scope="scope">
          {{ scope.row.contractSigningType | contractSigningTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        align="center"
        min-width="110">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="结束时间"
        align="center"
        min-width="110">
      </el-table-column>
      <el-table-column
        prop="channelStatus"
        label="渠道状态"
        align="center"
        min-width="140">
        <template slot-scope="scope">
          <span>{{ currentRow.channelStatus | channelStatusFilter }}</span>
        </template>
      </el-table-column>
    </el-table>
    <p></p>
    <el-form ref="form" :model="form" label-width="80px" style="border: 1px solid #D5D5D5;border-bottom-width: 2px">
      <el-form-item label="终止理由" class="form-row">
        <el-input type="textarea" class="noBorderTextarea" :rows="1" v-model="form.reason"
                  placeholder="请输入终止理由" style="margin-left: -1em"></el-input>
      </el-form-item>
      <el-form-item label="终止类型" class="form-row" v-if="currentRow.channelStatus==400">
        <el-radio-group v-model="form.terminationType">
          <el-radio :label="-200" >提前终止</el-radio>
          <el-radio :label="-300" >违规终止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="终止日期" class="form-row" v-if="currentRow.channelStatus==400">
        <el-date-picker v-model="form.terminationDate" type="date" placeholder="请输入终止日期" style="margin-left: -1em" class="noBorderInput"></el-date-picker>
      </el-form-item>
      <el-form-item label="保证金处理" class="form-row border-bottom" v-if="currentRow.channelStatus==4" style="height: 30px">
        <el-radio-group v-model="form.depositHandleWay">
          <el-radio :label="1" >返还</el-radio>
          <el-radio :label="2" >不返还</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit" :loading="isSubmitting">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        form: {
          reason: null,
          terminationType: -200,
          terminationDate: null,
          depositHandleWay: 1
        },
        contractData: [],
        tableHeight: 0,
        isSubmitting: false,
        cancelStatus: null,
      }
    },
    methods: {
      onSubmit() {
        this.isSubmitting = true
        if (!this.form.reason || (!this.form.terminationDate && this.currentRow.channelStatus == 400 )) {
          this.isSubmitting = false
          const vm = this
          this.$alert('请完整填写终止信息。', '', {
            confirmButtonText: this.$t('table.confirm'),
            showClose: false,
            center: true,
            callback() {}
          })
          return false
        }
        switch (this.currentRow.channelStatus) {
          case 50:
            this.cancelStatus = -50 // 停止审核
            break;
          case 100:
            this.cancelStatus = -100 // 停止签合同
            break;
          case 300:
            this.cancelStatus = -300 // 停止付保证金
            break;
          case 400:
            this.cancelStatus = -400 // 停止对接系统
            break;
//          default:
//            n 与 case 1 和 case 2 不同时执行的代码
        }

        this.$request({
          url: '/channel/channelCancel.do',
          method: 'post',
          data: {
            channelNo: this.currentRow.channelNo,
            status: this.cancelStatus,
            reason: this.form.reason,
            depositHandleWay: this.form.depositHandleWay,
            terminationDate: this.form.terminationDate,
          }
        }).then((res) => {
          if (res.errorCode == 0) {
            const vm = this
            this.$alert('提交成功', '', {
              confirmButtonText: this.$t('table.confirm'),
              showClose: false,
              center: true,
              callback() {
                vm.$emit('closeOutDialog')
              }
            })
          }
        }).catch(() => {
          this.$message.error('操作失败');
          this.isSubmitting = false
        })

      }
    },
    mounted() {
      window.setTimeout(() => {
        if (this.$refs['contractTable']) {
          this.tableHeight += this.$refs['contractTable'].$el.offsetHeight
        }

        if (this.$refs['replenishmentTable']) {
          this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[0].style.textAlign = 'left'
        }

      }, 100)
    },
    created() {
      this.contractData = this.currentRow.contractData
    }
  }
</script>

<style lang="scss" scoped>
  .el-textarea{
    vertical-align: middle;
    height: 34px;
  }
  .form-row {
    margin: 0;
    height: 29px;
  }

</style>
