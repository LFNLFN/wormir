<template>
  <div>
    <p>注销说明: 超级管理员特有权限，仅存在渠道支付保证金之前操作，请谨慎操作！</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="注销原因">
        <el-input type="textarea" v-model="form.reason" placeholder="请输入注销原因"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
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

</style>
