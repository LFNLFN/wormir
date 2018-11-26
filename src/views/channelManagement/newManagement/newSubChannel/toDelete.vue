<template>
  <div>
    <p v-if="currentRow.channelStatus<3">终止说明: 超级管理员特有权限，仅存在渠道支付保证金之前操作，请谨慎操作！</p>
    <el-form ref="form" :model="form" label-width="80px" style="border: 1px solid #D5D5D5;border-bottom-width: 1px">
      <el-form-item v-if="currentRow.channelStatus===3" label="合同信息" class="form-row border-bottom table-row" ref="constractMsg"
      :style="{height: tableHeight+'px'}">
        <el-table
          border
          :data="contractData"
          ref="contractTable"
          style="width: 100%"
          class="no-border">
          <el-table-column
            prop="contractID"
            label="合同编号"
            align="center"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="contractProp"
            label="合同属性"
            align="center"
            min-width="90">
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
              <span v-if="currentRow.channelStatus===0">{{'待审核'}}</span>
              <span v-if="currentRow.channelStatus===1">{{'待签合同'}}</span>
              <span v-if="currentRow.channelStatus===2">{{'待付保证金'}}</span>
              <span v-if="currentRow.channelStatus===3">{{'待接系统'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="终止理由" class="form-row">
        <el-input type="textarea" class="noBorderTextarea" :rows="1" v-model="form.reason"
                  placeholder="请输入终止理由"></el-input>
      </el-form-item>
      <el-form-item label="终止类型" class="form-row" v-if="currentRow.channelStatus===3">
        <el-radio-group v-model="form.terminationType">
          <el-radio :label="0" >提前终止</el-radio>
          <el-radio :label="1" >违规终止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="终止日期" class="form-row" v-if="currentRow.channelStatus===3">
        <el-input style="margin-left: -1em" class="noBorderInput" v-model="form.terminationDate" placeholder="请输入终止日期"></el-input>
      </el-form-item>
      <el-form-item label="保证金处理" class="form-row border-bottom" v-if="currentRow.channelStatus===3" style="height: 30px">
        <el-radio-group v-model="form.depositHandleWay">
          <el-radio :label="1" >返还</el-radio>
          <el-radio :label="0" >不返还</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit">提交</el-button>
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
        tableHeight: 0
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

        this.tableHeight += this.$refs['contractTable'].$el.offsetHeight


        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[0].style.textAlign = 'left'

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
