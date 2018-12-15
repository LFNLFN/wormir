<template>
  <div>
    <p style="text-decoration: underline">注销说明: 超级管理员特有权限，仅存在渠道支付保证金之前操作，请谨慎操作！</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="注销原因">
        <el-input type="textarea" v-model="form.reason" placeholder="请输入注销原因"></el-input>
      </el-form-item>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" :loading="isSubmitting" @click="onSubmit" style="width: 8em">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import request from "@/utils/request";

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
          reason: null
        },
        isSubmitting: false,
      }
    },
    methods: {
      onSubmit() {
        this.isSubmitting = true
        if(!this.form.reason) {
          this.$message.error('请填写注销原因！');
          this.isSubmitting = false
          return false
        }
        request({
          url: '/channel/channelCancel.do',
          method: 'post',
          data: {
            channelNo: this.currentRow.channelNo
          }
        }).then(() => {
          this.$emit('submitSuccess')
        }).catch(() => {
          this.$message.error('操作失败');
          this.isSubmitting = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
