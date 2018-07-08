<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column :label="$t('bill.emailContact')" width="180">
        <el-checkbox-group v-model="emailsChecked">
          <el-checkbox v-for="item in emails" :label="item" :key="item" />
        </el-checkbox-group>
      </el-table-column>
      <el-table-column :label="$t('bill.emailTitle')" width="180">
        {{ $t('bill.mergeOrderNo') + mergeOrderNo + $t('dispatched') }}
      </el-table-column>
      <el-table-column :label="$t('bill.documentPackage')" width="180">
        {{ $t('bill.mergeOrderNo') + mergeOrderNo + $t('dispatched') + '.zip' }}
      </el-table-column>
      <el-table-column :label="$t('bill.document')" width="180">
        <p v-for="item in orderNos" :key="item">{{ $t('bill.orderNo') + item + 'shd.xlsx' }}</p>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{$t('table.cancel')}}</el-button>
      <el-button type="primary" @click="send" :disabled="emailsChecked.length > 0">{{$t('bill.mailBill')}}</el-button>
    </div>
  </div>
</template>

<script>
  import { sendOrderBill } from '../../api/bill'

  export default {
    name: "mailBill",
    data() {
      return {
        emails: [
          "abc@abc.com"
        ],
        emailsChecked: [],
        mergeOrderNo: "xxxxxxx",
        orderNos: ["234235234"]
      }
    },
    methods: {
      cancel() {
        this.$emit("cancel")
        this.emailsChecked = []
      },
      async send() {
        await sendOrderBill(this.mergeOrderNo, this.emailsChecked)
        this.$message({
          message: this.$t('bill.mailBillSuccess'),
          type: 'success',

        });
        this.$emit("send")
      }
    }
  }
</script>

<style scoped>

</style>
