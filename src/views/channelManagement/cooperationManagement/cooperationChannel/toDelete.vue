<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :rules="formRules" style="border: 1px solid #D5D5D5;border-bottom-width: 1px" class="textareaError">
      <el-form-item label="系统状态" class="form-row">
        <span class="text-muted" style="font-size: 12px">待后期有系统数据后对接 注意：终止日期设定为系统自动读取，读取系统状态皆完成的当天后的第3天为终止日期，然后该日期零点一到自动进入终止处理中的流程-暂未实现</span>
      </el-form-item>
      <el-form-item label="终止理由" class="form-row" prop="reason">
        <el-input type="textarea" class="noBorderTextarea" :rows="1" v-model="form.reason"
                  placeholder="请输入终止理由"></el-input>
      </el-form-item>
      <el-form-item label="终止类型" class="form-row">
        <el-radio-group v-model="form.terminationType">
          <el-radio :label="0" >提前终止</el-radio>
          <el-radio :label="1" >违规终止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="终止日期" class="form-row">
        <el-date-picker
          v-model="form.terminationDate"
          type="date"
          class="noBorderInput"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="保证金处理" class="form-row border-bottom"  style="height: 30px">
        <el-radio-group v-model="form.depositHandleWay">
          <el-radio :label="1" >返还</el-radio>
          <el-radio :label="0" >不返还</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit">提交确认</el-button>
    </div>
  </div>
</template>

<script>
  import Mock from 'mockjs'
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
          terminationType: 0,
          terminationDate: Mock.Random.now('yyyy-MM-dd'),
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
        }
      }
    },
    methods: {
      onSubmit() {
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
    },
    mounted() {
      window.setTimeout(() => {

//        this.tableHeight += this.$refs['contractTable'].$el.offsetHeight
//
//
//        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[0].style.textAlign = 'left'

      }, 100)
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
