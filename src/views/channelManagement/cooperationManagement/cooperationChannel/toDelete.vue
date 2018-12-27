<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" :rules="formRules" style="border: 1px solid #D5D5D5;border-bottom-width: 1px" class="textareaError">
      <el-form-item label="系统状态" class="form-row">
        <span class="text-muted" style="font-size: 12px">待后期有系统数据后对接 注意：终止日期设定为系统自动读取，读取系统状态皆完成的当天后的第3天为终止日期，然后该日期零点一到自动进入终止处理中的流程-暂未实现</span>
      </el-form-item>
      <el-form-item label="终止理由" class="form-row" prop="reason">
        <el-input type="textarea" class="noBorderTextarea" :rows="1" v-model="form.reason"
                  placeholder="请输入终止理由"></el-input>
      </el-form-item>
      <el-form-item label="终止类型" class="form-row" prop="terminationType">
        <el-radio-group v-model="form.terminationType">
          <el-radio :label="-200" >提前终止</el-radio>
          <el-radio :label="-300" >违规终止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="终止日期" class="form-row" prop="terminationDate">
        <el-date-picker
          v-model="form.terminationDate"
          type="date"
          class="noBorderInput"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="保证金处理" class="form-row border-bottom"  style="height: 30px" prop="depositHandleWay">
        <el-radio-group v-model="form.depositHandleWay">
          <el-radio :label="1" >返还</el-radio>
          <el-radio :label="0" >不返还</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit" :loading="isSubmitting">提交确认</el-button>
    </div>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import request from "@/utils/request"

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
        contractData: [{
          contractID: 201805000002,
          contractProp: '首次签订',
          startTime: '2018-05-26',
          endTime: '2018-05-29',
          channelStatus: '待接系统'
        }],
        tableHeight: 0,
        formRules: {
          reason: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          terminationType: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
          terminationDate: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
          depositHandleWay: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
        },
        isSubmitting: false
      }
    },
    methods: {
      onSubmit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            console.log("前端验证ok");
            this.isSubmitting = true
            this.form.channelNo = this.currentRow.channelNo
            request({
              url: "/channel/cancelCooperateChannel.do",
              method: "post",
              data: this.form
            })
              .then((res) => {
                if (res.errorCode == 0) {
                  this.$emit("submitSuccess");
                } else {
                  this.$message.error("操作失败");
                  this.isSubmitting = false;
                }
              })
              .catch(() => {
                this.$message.error("操作失败");
                this.isSubmitting = false;
              });
          } else {
            this.isSubmitting = false;
            this.$message.error("请准确填写全部信息");
            return false;
          }
        });
      }
    },
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
