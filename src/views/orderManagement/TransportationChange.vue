<template>
  <div>
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item :label="$t('mergeRefundOrders.orderNo')" class="form-row add-brand-row">
        <div class="form-row-text">1212312</div>
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.transportQuantity')" class="form-row add-brand-row">
        <el-input v-model.number.lazy="form.transportQuantity" placeholder="请输入">
          <template slot="append">pcs</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.currentTransportation')" class="form-row add-brand-row">
        <span class="form-row-text">空运</span>
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.quantityAtLeaseForTransportation')" class="form-row add-brand-row">
        <el-input v-model="form.atLease" placeholder="请输入">
          <template slot="append">pcs</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.whetherToChange')" class="form-row add-brand-row last-form-row">
        <el-radio-group v-model="form.change">
          <el-radio :label="1">{{$t('table.yes')}}</el-radio>
          <el-radio :label="0">{{$t('table.no')}}</el-radio>
        </el-radio-group>
        <span style="margin: 0 20px"></span>
        <el-radio-group v-model="form.transportation" v-if="form.change===1">
          <el-radio :label="1">{{$t('mergeRefundOrders.byAir')}}</el-radio>
          <el-radio :label="0">{{$t('mergeRefundOrders.bySea')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="submit">{{$t('mergeRefundOrders.confirmChange')}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { changeTransportation } from '../../api/bill'

  export default {
    name: 'TransportationChange',
    props: {
      order: Object
    },
    data() {
      return {
        form: {
          orderNo: '',
          transportation: '',
          change: '',
          atLease: 56,
          transportQuantity: 100
        }
      }
    },
    methods: {
      async submit() {
//        await changeTransportation(this.form)
//        this.$message({
//          message: this.$t('mergeRefundOrders.changeTransportationSuccessTips')
//            .replace('#orderNo', this.form.orderNo).replace('#transportation#', this.form.transportation),
//          type: 'success'
//        })
//        this.$emit('change')
        const vm = this
        this.$alert('货单号：1232355的运输方式已调整为#海运#，采购金额已作相应变化，请知悉。', '', {
          confirmButtonText: this.$t('table.confirm'),
          showClose: false,
          center: true,
          callback() {
            vm.$emit('cancel') // 关闭调整运输弹层
          }
        })
      },
      cancel() {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped lang="scss">
  .form-row {
    margin: 0;
  }

  .form-row .el-input {
    margin: 3px;
    width: 98%;
  }

  .form-row .el-form-item__label {
    height: 35px;
  }



  .el-radio-group {
   margin: 3px 5px 0;
    border: #409EFF 1px solid;
    border-radius: 5px;
    padding: 5px;
  }
</style>
