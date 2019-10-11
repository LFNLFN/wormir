<template>
  <div>
    <!-- border: 1px solid #D5D5D5 -->
    <el-form ref="form" :model="form" label-width="110px" style="">
      <el-form-item :label="$t('mergeRefundOrders.orderNo')" class="form-row add-brand-row">
        <div class="form-row-text">{{ order.orderNo }}</div>
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.transportQuantity')" class="form-row add-brand-row">
        <div class="form-row-text">{{ order.orderNum }} pcs</div>
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.currentTransportation')" class="form-row add-brand-row">
        <div class="form-row-text">{{ order.transportation | transportationFilterZh }}</div>
      </el-form-item>
      <el-form-item label="海运起订量" class="form-row add-brand-row">
        <div class="form-row-text" v-if="order.property_of_sale==1">{{ order.minBySea1 }} pcs</div>
        <div class="form-row-text" v-else-if="order.property_of_sale==2">{{ order.minBySea2 }} pcs</div>
      </el-form-item>
      <el-form-item :label="$t('mergeRefundOrders.whetherToChange')" class="form-row add-brand-row last-form-row">
        <div class="form-row-text">
          <el-radio v-model="transportation" :label="1" v-if="order.transportation==2" @change="transportationChange">改为空运</el-radio>
          <el-radio v-model="transportation" :label="2" v-if="order.transportation==1" @change="transportationChange">改为海运</el-radio>
        </div>
      </el-form-item>
    </el-form>

    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="submit" :loading="listLoading">{{$t('mergeRefundOrders.confirmChange')}}</el-button>
    </div>
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
          transportation: '',
        },
        transportation: '',
        transportationText: '',
        listLoading:false
      }
    },
    methods: {
      submit() {
        this.listLoading = true
        this.$request({
          url: '/order/changeTransportation.do',
          method: 'post',
          data: {
            transportation: this.transportation,
            orderNo: this.order.orderNo
          }
        }).then((res) => {
          if (res.errorCode == 0) {

            const vm = this
            this.$alert(`货单号：${this.order.orderNo}的运输方式已调整为#${this.transportationText}#，采购金额已作相应变化，请知悉。`, '', {
              confirmButtonText: this.$t('table.confirm'),
              showClose: false,
              center: true,
              callback() {
                vm.$emit('change') // 关闭调整运输弹层
              }
            })

            this.listLoading = false
          } else {
            this.$message.error('数据请求失败');
            this.listLoading = false
          }
        }).catch((err) => {
          this.$message.error('数据请求失败');
          this.listLoading = false
        })
      },
      transportationChange(val) {
        if (val==1) {
            this.transportationText = '空运'
        } else if (val==2) {
          this.transportationText = '海运'
        }
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
