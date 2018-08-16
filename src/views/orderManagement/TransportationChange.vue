<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label="$t('mergeRefundOrders.orderNo')">
        <span>xxxxxx</span>
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.transportQuantity')">
        <el-input v-model="form.transportQuantity"/>
        pcs
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.currentTransportation')">
        <span>xxxxxx</span>
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.quantityAtLeaseForTransportation')">
        <el-input v-model="form.atLease"/>
        pcs
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.whetherToChange')">
        <el-radio-group v-model="form.change">
          <el-radio :label="1">{{$t('table.yes')}}</el-radio>
          <el-radio :label="0">{{$t('table.no')}}</el-radio>
        </el-radio-group>
        <el-radio-group v-model="form.transportation">
          <el-radio :label="1">{{$t('mergeRefundOrders.byAir')}}</el-radio>
          <el-radio :label="0">{{$t('mergeRefundOrders.bySea')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">{{$t('mergeRefundOrders.confirmChange')}}</el-button>
        <el-button @click="cancel">{{$t('table.cancel')}}</el-button>
      </el-form-item>
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
          atLease: '',
          transportQuantity: ''
        }
      }
    },
    methods: {
      async submit() {
        await changeTransportation(this.form)
        this.$message({
          message: this.$t('mergeRefundOrders.changeTransportationSuccessTips')
            .replace('#orderNo', this.form.orderNo).replace('#transportation#', this.form.transportation),
          type: 'success'
        })
        this.$emit('change')
      },
      cancel() {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

</style>
