<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="品牌序列号">
      <el-input v-model.number="form.no" disabled></el-input>
    </el-form-item>
    <el-form-item label="需生成">
      <el-input v-model.number="form.num" placeholder="请填写生成数量"></el-input>
    </el-form-item>
    <el-form-item label="生成日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="溯源码样例">
      <img :src="form.qrcode" style="width:100px"/>
    </el-form-item>
    <el-form-item>
      <el-button type="warning" @click="generationBtn">确认生成</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import img_qrcode from '@/assets/qrcode.png'
  export default {
    data() {
      return {
        form: {
          no: 10001,
          num: 0,
          date1: '',
          qrcode: img_qrcode
        }
      }
    },
    methods: {
      generationBtn() {
        this.$message.error('API disabled')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
