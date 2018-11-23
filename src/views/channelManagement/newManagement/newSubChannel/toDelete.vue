<template>
  <div>
    <p>终止说明: 超级管理员特有权限，仅存在渠道支付保证金之前操作，请谨慎操作！</p>
    <el-form ref="form" :model="form" label-width="80px" style="border: 1px solid #D5D5D5;border-bottom-width: 2px">
      <el-form-item label="终止原因" class="form-row border-bottom">
        <el-input type="textarea" class="noBorderTextarea" :rows="1" v-model="form.reason"
                  placeholder="请输入终止原因"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          reason: null
        }
      }
    },
    methods: {
      onSubmit() {
        this.$message('submit!')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-textarea{
    vertical-align: middle;
    height: 34px;
  }
</style>
