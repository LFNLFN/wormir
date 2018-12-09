<template>
  <div>
    <el-row style="background-color: grey;line-height: 24px;height: 24px"></el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">{{'Order No.'}}</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">{{detail.orderNo}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">{{'Retailer No.'}}</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">{{detail.channelNo}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">{{$t('Code')}}</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">{{detail.boxCode || ' '}}</div>
      </el-col>
      <el-col :span="4" style="border-left: 1px solid #d5d5d5">
        <div class="grid-content bg-purple">{{$t('Description')}}</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">{{detail.description || ' '}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">{{$t('Application Reasons')}}</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">{{$t('order.applicationReasonContent')}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="8"
              style="border-bottom: none;background-color: transparent!important;justify-content: flex-start">
        <div class="text-muted" style="background: #fff;font-weight: normal;color: rgb(153, 153, 153)">{{
          $t('Application Time') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
        </div>
      </el-col>
    </el-row>
    <el-row style="border-top:1px solid #d5d5d5">
      <el-col :span="8">
        <div class="grid-content bg-purple" style="line-height: 48px">{{$t('Photo Evidences')}}</div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light " @click="viewImage(detail.proofImage)">
          <img :src="detail.proofImage"
               alt="" height="48px"
               width="48px"
               class="link-type">
        </div>
      </el-col>
    </el-row>

    <!--待补款状态（申请后补款）-->
    <template v-if="detail.compensationType === 10">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('Compensation')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation .toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('Application Result')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{$t('Compensation Approval')}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="8"
                style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start">
          {{ $t('Review Time') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('Replenishment Status')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{$t('Pending Compensation')}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('Compensation Type')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{$t('Compensation After Application')}}
          </div>
        </el-col>
      </el-row>
    </template>

    <!--待补款状态（协商后补款）-->
    <template v-if="detail.compensationType === 20">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('Compensation')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">€ {{ detail.compensation.toFixed(2) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('Application Result')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{$t('Application Dismissed')}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="8"
                style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start">
          {{ $t('Review Time') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('Appeal Request')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{$t('Involve Negotiation')}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="8"
                style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start">
          {{ $t('Appeal Time') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ $t('Final Result') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{ $t('Compensation Approval') }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="8"
                style="border-bottom: none;background-color: #fff;font-weight: normal;color: rgb(153, 153, 153);justify-content: flex-start">
          {{ $t('Review Time') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
        </el-col>
      </el-row>
      <el-row style="border-top:1px solid #d5d5d5">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('Replenishment Status')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{$t('Pending Compensation')}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{$t('Compensation Type')}}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{$t('Compensation After Appeal')}}
          </div>
        </el-col>
      </el-row>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'compensation-order-detail',
    props: {
      detail: {
        type: Object,
        default: function() {
          return {
            boxCode: 1111,
            brandEnglishName: "LANCOM",
            channelClassify: 1,
            channelNo: 20001,
            compensation: 170,
            compensationStatus: 20,
            compensationType: 10,
            createTime: "2018-12-09T07:50:54.433Z",
            description: "Lancome (LANCOME) air cushion lip oil",
            mergePaymentNo: 857938502482,
            orderMethod: 20,
            orderNo: 10001,
            orderStatus: 10,
            paymentAmount: "€ 6,083.20",
            paymentStatus: 10,
            proofImage:
              "http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg",
            shipmentStatus:
              20,
          }
        }
      }
    },
    methods: {
      viewImage(src) {
        this.$emit('image-view', src)
      }
    }
  }
</script>
<style scoped>
  .el-row {
    margin: 0;
  }

  .el-col:nth-of-type(odd):not(.text-muted) div {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .el-col:nth-of-type(even) div {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
    background-color: transparent;
    font-weight: normal;
  }

  .el-col:nth-child(odd) {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
    border-bottom: 1px #d5d5d5 solid;
  }

  .el-col:nth-child(even) {
    color: #424242;
    display: flex;
    align-items: center;
    font-size: 12px;
    border-right: none;
    border-bottom: 1px #d5d5d5 solid;
  }

  .el-col:only-of-type {
    border-right: none;
  }

  .el-col:nth-child(even) div {
    padding-left: 1em;
  }
</style>
