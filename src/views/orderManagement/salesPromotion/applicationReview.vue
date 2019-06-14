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
            <el-table-column align="center" label="商品品牌" prop="brandChineseName"/>
            <el-table-column align="center" label="商品编号" prop="goodsNo"></el-table-column>
            <el-table-column align="center" label="商品名称" prop="goodsName"></el-table-column>
            <el-table-column align="center" label="商品规格" prop="goodsSpecification"></el-table-column>
            <el-table-column align="center" label="装箱规格" prop="packingSpecification"
                             class-name="last-col-td0"></el-table-column>
          </el-table>
        </el-col>
      </el-row>


      <template v-if="channelProp != 3">
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
            <div>{{ promotion_start_time | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{ promotion_end_time
              |
              parseTime('{y}年{m}月{d}日') }}
            </div>
          </el-col>
        </el-row>

        <template v-if="isFirstReview">
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
        </template>
        <template v-else>
          <el-row>
            <el-col :span="3">已申请数量</el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{ already_application_num }}</div>
            </el-col>
            <el-col :span="1" class="noBackground"><span>套</span></el-col>
            <el-col :span="0"></el-col>
          </el-row>
          <el-row>
            <el-col :span="3">再申请数量</el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{ second_application_num }}</div>
            </el-col>
            <el-col :span="1" class="noBackground"><span>套</span></el-col>
            <el-col :span="0"></el-col>
            <el-col :span="0"></el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="3">库存数量</el-col>
            <el-col :span="3"><span>1000</span></el-col>
            <el-col :span="1" class="noBackground"><span>套</span></el-col>
            <el-col :span="0"></el-col>
          </el-row>
        </template>


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
        <el-row>
          <el-col :span="3" :offset="3" style="height: 60px;" class="border-left">驳回说明</el-col>
          <el-col :span="16" style="padding-top: 6px">
            <el-input type="textarea" v-model.trim="reject_explain" placeholder="100字以内做简要说明"></el-input>
          </el-col>
        </el-row>

        <el-row class="no-border-bottom">
          <el-col :span="3" class="border-left">订货时间</el-col>
          <el-col :span="16">
            <div>{{ order_start_time | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{ order_end_time |
              parseTime('{y}年{m}月{d}日') }}
            </div>
          </el-col>
        </el-row>
      </template>

      <template v-if="channelProp == 3">
        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">分销渠道号</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">{{ goodsObject.channelNo }}</div>
          </el-col>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">分销渠道名称</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">{{ goodsObject.channelName }}</div>
          </el-col>
        </el-row>
        <!--遍历生成多个子渠道申请-->
        <template v-for="(item, index) in FXZQD_msg">
          <div style="border-top: solid 10px #D5D5D5"></div>
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">子渠道号</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{ item.channelNo }}</div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">子渠道名称</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{ item.channelName }}</div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">子渠道级别</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{ item.channelLevel | channelLevel }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" align="center" style="min-height: 5em">
              <div class="grid-content bg-purple">申请理由</div>
            </el-col>
            <el-col :span="21">
              <div>{{ item.applicationReason }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" align="center" style="min-height: 64px;">
              <div class="grid-content bg-purple">申请资料</div>
            </el-col>
            <el-col :span="10" style="padding-left: 1em">
              <div style="display: flex;justify-content: flex-start;flex-wrap: wrap">
                <div style="margin: 3px;" v-for="(sub_item, sub_index) in item.fileList">
                  <span>{{ sub_item.fileName }}</span>
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
              <div>{{ item.promotion_start_time | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{
                item.promotion_end_time |
                parseTime('{y}年{m}月{d}日') }}
              </div>
            </el-col>
          </el-row>
          <template v-if="item.isFirstReview">
            <el-row>
              <el-col :span="3">申请数量</el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">{{ item.application_num }}</div>
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
            $t('order.applicationTime') }}: {{ item.promotion_application_Time | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-row>
              <el-col :span="3">已申请数量</el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">{{ item.already_application_num }}</div>
              </el-col>
              <el-col :span="1" class="noBackground"><span>套</span></el-col>
              <el-col :span="0"></el-col>
            </el-row>
            <el-row>
              <el-col :span="3">再申请数量</el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">{{ item.second_application_num }}</div>
              </el-col>
              <el-col :span="1" class="noBackground"><span>套</span></el-col>
              <el-col :span="0"></el-col>
              <el-col :span="0"></el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="3">库存数量</el-col>
              <el-col :span="3"><span>1000</span></el-col>
              <el-col :span="1" class="noBackground"><span>套</span></el-col>
              <el-col :span="0"></el-col>
            </el-row>
            <el-row>
              <el-col :span="0"></el-col>
              <el-col :span="6" :offset="3">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ item.promotion_application_Time | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
              </el-col>
            </el-row>
          </template>
          <el-row>
            <el-col :span="3">审核结果</el-col>
            <el-col :span="10" style="padding-top: 5px">
              <el-radio-group v-model="item.isAgreeTitle" @change="subApplicationIsAgree">
                <el-radio :label="index+'-1'" size="mini">同意申请</el-radio>
                <el-radio :label="index+'-0'" size="mini" @change="subApplicationIsAgree">驳回申请</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="3" style="height: 40px;" class="border-left">批准数量</el-col>
            <el-col :span="6" style="padding-top: 6px">
              <el-input v-model.trim.number="item.approve_num" placeholder="请输入批准数量" :disabled="item.noApproveNum">
                <template slot="append">套</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" :offset="3" style="height: 60px;" class="border-left">驳回说明</el-col>
            <el-col :span="16" style="padding-top: 6px">
              <el-input type="textarea" v-model.trim="item.reject_explain" placeholder="100字以内做简要说明"></el-input>
            </el-col>
          </el-row>

          <el-row class="no-border-bottom">
            <el-col :span="3" class="border-left">订货时间</el-col>
            <el-col :span="16">
              <div>{{ item.order_start_time | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{ item.order_end_time |
                parseTime('{y}年{m}月{d}日') }}
              </div>
            </el-col>
          </el-row>
        </template>
      </template>


    </div>


    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">确认提交</el-button>
    </div>


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
        reject_explain: '',
        isFirstReview: false,
        already_application_num: 200,
        second_application_num: 100,

        FXZQD_msg: [
          {
            fileList: [
              {
                fileName: '111.doc',
              },
            ],
            channelNo: 98876,
            channelName: 'HJK分店',
            channelLevel: 2,
            applicationReason: '回馈客户',
            promotion_start_time: new Date('2018-12-22'),
            promotion_end_time: new Date('2019-02-22'),
            promotion_application_Time: new Date('2018-11-22'),
            application_num: 100,
            isAgree: null,
            isAgreeTitle: null,
            approve_num: null,
            noApproveNum: true,
            order_start_time: new Date('2018-12-12'),
            order_end_time: new Date('2019-03-22'),
            reject_explain: '',
            isFirstReview: true,
            already_application_num: 200,
            second_application_num: 100,
          },
          {
            fileList: [
              {
                fileName: '111.doc',
              },
            ],
            channelNo: 98876,
            channelName: 'HJK分店',
            channelLevel: 2,
            applicationReason: '回馈客户',
            promotion_start_time: new Date('2018-12-22'),
            promotion_end_time: new Date('2019-02-22'),
            promotion_application_Time: new Date('2018-11-22'),
            application_num: 100,
            isAgree: null,
            isAgreeTitle: null,
            approve_num: null,
            noApproveNum: true,
            order_start_time: new Date('2018-12-12'),
            order_end_time: new Date('2019-03-22'),
            reject_explain: '',
            isFirstReview: false,
            already_application_num: 200,
            second_application_num: 100,
          }
        ],

        submitLoading: false,
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
      subApplicationIsAgree(val) {
        let currentIndex = val.split('-')[0]
        let currentResult = val.split('-')[1]
        if (currentResult == 1) {
          this.FXZQD_msg[currentIndex].noApproveNum = false;
          this.FXZQD_msg[currentIndex].approve_num = null
          this.FXZQD_msg[currentIndex].isAgree = true
        }
        else {
          this.FXZQD_msg[currentIndex].noApproveNum = true;
          this.FXZQD_msg[currentIndex].approve_num = null
          this.FXZQD_msg[currentIndex].isAgree = false
        }
      },
      onSubmit() {
        if (this.channelProp != 3 && this.isAgree == null) {
          this.$message.error('必须填写审核结果！');
          return false
        }
        if (this.channelProp != 3 && this.isAgree == false && this.reject_explain == '') {
          this.$message.error('必须填写驳回说明！');
          return false
        }
        if (this.channelProp == 3) {
          let isResultNull = this.FXZQD_msg.some((item, index, arr)=>{
            return item.isAgree == null
          })
          if(isResultNull) {
            this.$message.error('必须填写全部审核结果！');
            return false
          }
          let isReasonNull = this.FXZQD_msg.some((item, index, arr)=>{
            if(item.isAgree == false) { return item.reject_explain == '' }
            else { return false }
          })
          if(isReasonNull) {
            this.$message.error('必须填写全部驳回理由！');
            return false
          }
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
