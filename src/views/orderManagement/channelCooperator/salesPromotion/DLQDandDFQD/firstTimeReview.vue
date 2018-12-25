<template>
  <div class="app-container">
    <div class="theBorder theTopMsgBorder">
      <el-row>
        <el-col :span="3" align="center" :style="{ height: tableHeight + 'px' }">
          <div class="grid-content bg-purple">促销商品</div>
        </el-col>
        <el-col :span="21" style="padding-left: 0">
          <el-table :key="'product'" :data="goodslist" ref="goodsTable"
                    border fit highlight-current-row
                    :header-cell-style="{ borderTop: 'none' }"
                    class="no-border-right no-border-top no-border-bottom no-border-left last-tr0"
                    style="width: 100%">
            <el-table-column align="center" label="商品品牌" prop="brandChineseName" />
            <el-table-column align="center" label="商品编号" prop="goodsNo"></el-table-column>
            <el-table-column align="center" label="商品名称" prop="goodsName"></el-table-column>
            <el-table-column align="center" label="商品规格" prop="goodsSpecification"></el-table-column>
            <el-table-column align="center" label="装箱规格" prop="packingSpecification" class-name="last-col-td0"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">渠道号</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{ goodsObject.channelNo }}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">渠道名称</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{ goodsObject.channelName }}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">渠道级别</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{ goodsObject.channelLevel | channelLevel }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center" style="min-height: 5em">
          <div class="grid-content bg-purple">申请理由</div>
        </el-col>
        <el-col :span="21">
          <div>{{ goodsObject.applicationReason }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center" style="min-height: 64px;">
          <div class="grid-content bg-purple">申请资料</div>
        </el-col>
        <el-col :span="10" style="padding-left: 1em">
          <div style="display: flex;justify-content: flex-start;flex-wrap: wrap">
            <div style="margin: 3px;" v-for="(item, index) in fileList">
              <span>{{ item.fileName }}</span>
              <span class="link-type">预览</span>
              <span class="link-type">下载</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">促销活动日期</div>
        </el-col>
        <el-col :span="8">
          <div>{{ promotion_start_time | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{ promotion_end_time | parseTime('{y}年{m}月{d}日') }}</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3">申请数量</el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{ application_num }}</div>
        </el-col>
        <el-col :span="1" class="noBackground"><span>套</span></el-col>
        <el-col :span="0"></el-col>
        <el-col :span="0"></el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="3">库存数量</el-col>
        <el-col :span="3"><span>1000</span></el-col>
        <el-col :span="1" class="noBackground"><span>套</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="0"></el-col>
        <el-col :span="6" :offset="3">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ promotion_application_Time | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">审核结果</el-col>
        <el-col :span="10" style="padding-top: 5px">
          <el-radio-group v-model="isAgree" @change="applicationIsAgree">
            <el-radio :label="true" size="mini">同意申请</el-radio>
            <el-radio :label="false" size="mini" @change="applicationIsAgree">驳回申请</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="3" style="height: 40px;" class="border-left">批准数量</el-col>
        <el-col :span="6" style="padding-top: 6px">
          <el-input v-model.trim.number="approve_num" placeholder="请输入批准数量" :disabled="noApproveNum">
            <template slot="append">套</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="no-border-bottom">
        <el-col :span="3" class="border-left">订货时间</el-col>
        <el-col :span="16">
          <div>{{ order_start_time | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{ order_end_time | parseTime('{y}年{m}月{d}日') }}</div>
        </el-col>
      </el-row>

    </div>


    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">提交申请</el-button>
    </div>

    <el-dialog :visible.sync="failDialogVisible" width="30%" append-to-body :show-close="false">
      <span>提交申请不成功，促销活动的开始日期距离今天不足35天。</span>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="failDialogVisible = false, submitLoading = false">知道了</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="successDialogVisible" width="30%" append-to-body :show-close="false">
      <span>申请已提交，可点击“首次结果”了解进度和详情。</span>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="handleConfirm()">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import { channelLevel } from '@/filters/index.js'
  import { parseTime } from '@/utils/index.js'

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
      channelProp: {
        type: Number,
        required: true
      }
    },
    computed: {
      goodslist() {
        return [
          {
            brandChineseName: this.goodsObject.brandChineseName,
            goodsNo: this.goodsObject.goodsNo,
            goodsName: this.goodsObject.goodsName,
            goodsSpecification: this.goodsObject.goodsSpecification,
            packingSpecification: this.goodsObject.packingSpecification,
          }
        ]
      }
    },
    data() {
      return {
        tableHeight: 0,
        fileList: [
          { fileName: '111.doc' }
        ],
        promotion_start_time: new Date('2018-12-22'),
        promotion_end_time: new Date('2019-02-22'),
        promotion_application_Time: new Date('2018-11-22'),
        application_num: 100,
        isAgree: null,
        approve_num: null,
        noApproveNum: true,
        order_start_time: new Date('2018-12-12'),
        order_end_time: new Date('2019-03-22'),
        failDialogVisible: false,
        successDialogVisible: false,
        submitLoading: false,
        channelClassifyMap: {
          1: '独立渠道',
          2: '代发渠道',
          3: '代发渠道'
        },
      }
    },
    methods: {
      applicationIsAgree(val) {
        if (val) {
          this.noApproveNum = false;
          this.approve_num = null
        }
        else {
          this.noApproveNum = true;
          this.approve_num = null
        }
      },
      handleConfirm() {
        this.$emit('closeDLDFfirstApplicationForm')
        this.submitLoading = false
      },
      onSubmit() {
        if (this.isAgree === null) {
          this.$message.error('必须填写审核结果！');
          return false
        }
        this.$emit('submit-success')
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.tableHeight += this.$refs['goodsTable'].$el.offsetHeight
      })
    }
  }
</script>

<style scope>
  .el-input--medium .el-input__inner {
    line-height: 24px;
    height: 24px;
  }

  .el-col {
    border-radius: 0;
  }

  .el-col:nth-child(odd) {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-col:nth-child(odd):not(:last-of-type) {
    border-right: 1px solid #d5d5d5;
  }

  .el-col:nth-child(even) {
    color: #424242;
    font-size: 12px;
    display: flex;
    align-items: center;
  }

  .el-col:nth-child(even):not(:last-of-type) {
    border-right: 1px solid #d5d5d5;
  }

  .grid-content {
    border: none;
  }

  .theTopMsgBorder {
    border: solid #d5d5d5 2px;

  &
  .el-row {
    border-bottom: solid #d5d5d5 1px;
    margin-bottom: 0;

  &
  .el-col:nth-child(even) {
    padding-left: 1em;
  }

  }
  }
</style>
