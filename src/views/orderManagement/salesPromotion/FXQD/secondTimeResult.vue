<template>
  <div class="app-container">
    <div class="theBorder">
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">分销渠道号</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">{{goodsObject.channelNo}}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">分销渠道名称</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">{{goodsObject.channel_name}}</div>
        </el-col>
      </el-row>

      <div v-for="(item, index) in goodsObject.goodPromotionApplication">
        <el-row style="height: 2em;background-color: #d5d5d5"></el-row>
        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">子渠道号</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">{{item.channelCode}}</div>
          </el-col>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">子渠道名称</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">{{channelClassifyMap[item.channelClassify]}}</div>
          </el-col>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">子渠道级别</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">{{item.channelLevel}}</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">申请理由</div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple">{{ item.againRejectReason }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">申请资料</div>
          </el-col>
          <el-col :span="10" style="height: 34px">
            <div class="link-type">111111.docx</div>
            <div class="link-type">1111111.pdf</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">促销活动日期</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">{{item.againPromotionStartTime | parseTime('{y}-{m}-{d}')}}-{{item.againPromotionEndTime | parseTime('{y}-{m}-{d}')}}</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">已申请数量</el-col>
          <el-col :span="1" class="no-border-right" style="display: flex;justify-content: center"><span>{{ item.firstPromotionQuantities }}</span></el-col>
          <el-col :span="1" class="noBackground"><span>套</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="3">再申请数量</el-col>
          <el-col :span="1" class="no-border-right" style="display: flex;justify-content: center"><span>{{item.againPromotionQuantities}}</span></el-col>
          <el-col :span="1" class="noBackground"><span>套</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="3" :span="6" style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start"><div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{ $t('order.applicationTime') }}: {{ item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div></el-col>
        </el-row>


        <!--同意且不用改数量-->
        <template v-if="item.applicationResult === 1">
          <el-row>
            <el-col :span="3">审核结果</el-col>
            <el-col :span="2" style="display: flex;justify-content: center"><span>同意申请</span></el-col>
          </el-row>
          <el-row>
            <el-col :offset="3" :span="6" style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start"><div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{ $t('order.reviewTime') }}: {{ item.againCheckTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div></el-col>
          </el-row>

          <el-row class="no-border-bottom">
            <el-col :span="3">订货时间</el-col>
            <el-col :span="6" style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start;padding-left: 1em"><div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{ item.againCheckTime | parseTime('{y}-{m}-{d}') }}
              <!--&#45;&#45; {{ new Date('2019-07-07')-60000*60*24*30 | parseTime('{y}-{m}-{d}') }}-->
            </div></el-col>
          </el-row>
        </template>
        <!--同意但改数量-->
        <template v-if="item.applicationResult === 2">
          <el-row>
            <el-col :span="3">审核结果</el-col>
            <el-col :span="2" style="display: flex;justify-content: center"><span>同意申请</span></el-col>
          </el-row>
          <el-row>
            <el-col :offset="3" :span="6" style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start"><div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{ $t('order.reviewTime') }}: {{ item.againCheckTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div></el-col>
          </el-row>
          <el-row>
            <!--<el-col :offset="3" :span="3" class="border-left">批准数量</el-col>-->
            <el-col :span="3" class="border-left">批准数量</el-col>
            <el-col :span="2" class="no-border-right" style="display: flex;justify-content: center"><span>{{item.againApprovedQuantities}}</span></el-col>
            <el-col :span="1" class="noBackground"><span>套</span></el-col>
          </el-row>
          <el-row class="no-border-bottom">
            <el-col :span="3">订货时间</el-col>
            <el-col :span="6" style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start;padding-left: 1em"><div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{ item.againCheckTime | parseTime('{y}-{m}-{d}') }}
              <!--&#45;&#45; {{ new Date('2019-07-07')-60000*60*24*30 | parseTime('{y}-{m}-{d}') }}-->
            </div></el-col>
          </el-row>
        </template>
        <!--驳回申请-->
        <template v-if="item.applicationResult === 3">
          <el-row>
            <el-col :span="3">审核结果</el-col>
            <el-col :span="2" style="display: flex;justify-content: center"><span>驳回申请</span></el-col>
          </el-row>
          <el-row>
            <el-col :offset="3" :span="6" style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start"><div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{ $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div></el-col>
          </el-row>

          <el-row class="no-border-bottom">
            <el-col :offset="3" :span="3" class="border-left">驳回说明</el-col>
            <el-col :span="18" style="background: #fff;font-weight: normal;justify-content: flex-start;padding-left: 1em"><div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{ rejectReason }}</div></el-col>
          </el-row>
        </template>


      </div>
    </div>

  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'applicationForm',
    directives: {
      waves
    },
    props: {
      goodsObject: {
        type: Object,
        default: () => {
          return {}
        }
      },
      operationIndex: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        list: [],
        dateRange: [
          [], [], []
        ],
        fileList: [],
        failDialogVisible: false,
        successDialogVisible: false,
        submitLoading: false,
        channelClassifyMap: {
          1: '独立渠道',
          2: '代发渠道',
          3: '代发渠道'
        },
        applicatioiinReason: '双十一活动。',
        rejectReason: '促销时间太长。'
      }
    },
    methods: {
    }
  }
</script>

<style scope>
  .searchRow .el-input--medium .el-input__inner {
    line-height: 36px;
    height: 36px;
  }

  .el-input--medium .el-input__inner {
    line-height: 24px;
    height: 24px;
  }
</style>
