<template>
  <div class="app-container">
    <h4>促销商品</h4>
    <div class="theBorder theTopMsgBorder">

      <el-row>
        <!--<el-col :span="3" align="center" :style="{ height: tableHeight + 'px' }">-->
          <!--<div class="grid-content bg-purple">促销商品</div>-->
        <!--</el-col>-->
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
            <div class="grid-content bg-purple">{{ goodsObject.channelLevel  }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center" style="min-height: 5em">
            <div class="grid-content bg-purple">申请理由</div>
          </el-col>
          <el-col :span="21">

            <div v-if="applyStatus == 0">{{ goodsObject.goodPromotionApplication.firstApplyReason }}</div>
            <div v-else>{{ goodsObject.goodPromotionApplication.againApplyReason }}</div>
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
                <!--<el-col :span="20"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""-->
                                                                                        <!--height="48px" width="48px"-->
                                                                                        <!--class="link-type"></span></el-col>-->
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center">
            <div class="grid-content bg-purple">促销活动日期</div>
          </el-col>
          <el-col :span="8">
            <div v-if="applyStatus == 0">{{ goodsObject.goodPromotionApplication.firstPromotionStartTime | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{ goodsObject.goodPromotionApplication.firstPromotionEndTime | parseTime('{y}年{m}月{d}日') }}
            </div>
            <div v-else>{{ goodsObject.goodPromotionApplication.againPromotionStartTime | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{ goodsObject.goodPromotionApplication.againPromotionEndTime | parseTime('{y}年{m}月{d}日') }}</div>
          </el-col>
        </el-row>

        <template v-if="applyStatus == 0">
          <el-row>
            <el-col :span="3">申请数量</el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{ goodsObject.goodPromotionApplication.firstPromotionQuantities}}</div>
            </el-col>
            <el-col :span="1" class="noBackground"><span>套</span></el-col>
            <el-col :span="0"></el-col>
            <el-col :span="0"></el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="3">库存数量</el-col>
            <el-col :span="3"><span>{{goodsObject.holdInventoryQuantity}}</span></el-col>
            <el-col :span="1" class="noBackground"><span>套</span></el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row>
            <el-col :span="3">已申请数量</el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{ goodsObject.goodPromotionApplication.firstApprovedQuantities}}</div>
            </el-col>
            <el-col :span="1" class="noBackground"><span>套</span></el-col>
            <el-col :span="0"></el-col>
          </el-row>
          <el-row>
            <el-col :span="3">再申请数量</el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{ goodsObject.goodPromotionApplication.againPromotionQuantities}}</div>
            </el-col>
            <el-col :span="1" class="noBackground"><span>套</span></el-col>
            <el-col :span="0"></el-col>
            <el-col :span="0"></el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="3">库存数量</el-col>
            <el-col :span="3"><span>{{goodsObject.currentInventoryQuantity}}</span></el-col>
            <el-col :span="1" class="noBackground"><span>套</span></el-col>
            <el-col :span="0"></el-col>
          </el-row>
        </template>


        <el-row>
          <el-col :span="0"></el-col>
          <el-col :span="6" :offset="3">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ goodsObject.goodPromotionApplication.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">审核结果</el-col>
          <el-col :span="10" style="padding-top: 5px">
            <el-radio-group v-model="isAgree" @change="applicationIsAgree">
              <el-radio :label="true" size="mini">同意申请</el-radio>
              <el-radio :label="false" size="mini">驳回申请</el-radio>
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
            <div>{{ goodsObject.order_start_time | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;
              <!--至&nbsp;&nbsp; {{ order_end_time | parseTime('{y}年{m}月{d}日') }}-->
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
        <template v-for="(item, index) in goodsObject.goodPromotionApplication">
          <div style="border-top: solid 10px #D5D5D5"></div>
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">子渠道号</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{ item.channelCode }}</div>
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
              <div v-if="applyStatus == 0">{{ item.firstApplyReason }}</div>
              <div v-else>{{ item.againApplyReason }}</div>
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
              <div v-if="applyStatus == 0">{{ item.firstPromotionStartTime | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{
                item.firstPromotionEndTime |
                parseTime('{y}年{m}月{d}日') }}
              </div>
              <div v-else>
                {{ item.againPromotionStartTime | parseTime('{y}年{m}月{d}日') }} &nbsp;&nbsp;至&nbsp;&nbsp; {{
                item.againPromotionEndTime |
                parseTime('{y}年{m}月{d}日') }}
              </div>
            </el-col>
          </el-row>
          <template v-if="applyStatus == 0">
            <el-row>
              <el-col :span="3">申请数量</el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">{{ item.firstPromotionQuantities }}</div>
              </el-col>
              <el-col :span="1" class="noBackground"><span>套</span></el-col>
              <el-col :span="0"></el-col>
              <el-col :span="0"></el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="3">库存数量</el-col>
              <el-col :span="3"><span>{{goodsObject.currentInventoryQuantity}}</span></el-col>
              <el-col :span="1" class="noBackground"><span>套</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="0"></el-col>
              <el-col :span="6" :offset="3">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-row>
              <el-col :span="3">已申请数量</el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">{{ item.firstApprovedQuantities }}</div>
              </el-col>
              <el-col :span="1" class="noBackground"><span>套</span></el-col>
              <el-col :span="0"></el-col>
            </el-row>
            <el-row>
              <el-col :span="3">再申请数量</el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">{{ item.againPromotionQuantities }}</div>
              </el-col>
              <el-col :span="1" class="noBackground"><span>套</span></el-col>
              <el-col :span="0"></el-col>
              <el-col :span="0"></el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="3">库存数量</el-col>
              <el-col :span="3"><span>{{goodsObject.holdInventoryQuantity}}</span></el-col>
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
              <el-radio-group v-model="item.isAgree" @change="subApplicationIsAgree(item.isAgree , index)">
                <el-radio :label="true" size="mini">同意申请</el-radio>
                <el-radio :label="false" size="mini">驳回申请</el-radio>
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
              <div>{{ goodsObject.order_start_time | parseTime('{y}年{m}月{d}日') }} &nbsp;
                <!--&nbsp;至&nbsp;&nbsp; {{ item.order_end_time | parseTime('{y}年{m}月{d}日') }}-->
              </div>
            </el-col>
          </el-row>
        </template>
      </template>


    </div>


    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">确认提交</el-button>
    </div>
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
      <img :src="imageViewed" alt="" width="100%">
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
      },
      applyStatus: {
        type: Number,
        required: true,
        value: 0
      }
    },
    computed: {
      goodslist() {
        return [
          {
            brandChineseName: this.goodsObject.brands.brandChineseName,
            goodsNo: this.goodsObject.goodsNo,
            goodsName: this.goodsObject.goodsChineseName,
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
        order_start_time: new Date(),
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
      subApplicationIsAgree(val, index) {
        console.log(val, index)
        // let currentIndex = val.split('-')[0]
        // let currentResult = val.split('-')[1]

        if (val == true) {
          this.goodsObject.goodPromotionApplication[index].noApproveNum = false;
          this.goodsObject.goodPromotionApplication[index].approve_num = null
          // this.goodsObject.goodPromotionApplication[index].isAgree = true
        }
        else {
          this.goodsObject.goodPromotionApplication[index].noApproveNum = true;
          this.goodsObject.goodPromotionApplication[index].approve_num = null
          // this.goodsObject.goodPromotionApplication[index].isAgree = false
        }
        console.log(this.goodsObject.goodPromotionApplication[index])
        this.goodsObject.goodPromotionApplication.push({name: '1112'})
        this.goodsObject.goodPromotionApplication.splice(1, this.goodsObject.goodPromotionApplication.length)
        this.$forceUpdate();
      },
      onSubmit() {
        console.log('xoxoxo')
        var data = {
          channelCode: this.goodsObject.channelNo,

          goodsNo: this.goodsObject.goodsNo
        }

        if (this.channelProp != 3) {
            if ((parseInt(this.goodsObject.goodPromotionApplication.firstPromotionQuantities) < this.approve_num && this.applyStatus == 0) || (this.applyStatus == 1 && parseInt(this.goodsObject.goodPromotionApplication.againPromotionQuantities) < this.approve_num)) {
            this.$message.error('同意的数量不能超过申请的数量');
            return false;
          }
          data.checkTime = new Date()
          data.applyPromotionStatus = this.applyStatus == 0?3:7
          if (this.isAgree) {
            if (this.approve_num) {
              data.ApprovedQuantities = this.approve_num;
              data.applyPromotionStatus = this.applyStatus == 0?4:8
            }
          } else {
            data.reason = this.reject_explain;
            data.applyPromotionStatus = this.applyStatus == 0?5:9
            data.orderDeadLine = this.goodsObject.goodPromotionApplication.againPromotionEndTime
          }
          data.checkTime = this.goodsObject.order_start_time;
        }

        if (this.channelProp != 3 && this.isAgree == null) {
          this.$message.error('必须填写审核结果！');
          return false
        }
        if (this.channelProp != 3 && this.isAgree == false && this.reject_explain == '') {
          this.$message.error('必须填写驳回说明！');
          return false
        }
        if (this.channelProp == 3) {
          data.childChannelCode = []
          data.applyPromotionStatus = []
          data.checkTime = this.goodsObject.order_start_time
          data.orderDeadLine = []
          data.ApprovedQuantities = []
          data.reason = []
          let isResultNull = this.goodsObject.goodPromotionApplication.some((item, index, arr)=>{
            return item.isAgree == null
          })
          if(isResultNull) {
            this.$message.error('必须填写全部审核结果！');
            return false
          }
          let isReasonNull = this.goodsObject.goodPromotionApplication.some((item, index, arr)=>{
            if(item.isAgree == false) { return item.reject_explain == '' }
            else { return false }
          })
          if(isReasonNull) {
            this.$message.error('必须填写全部驳回理由！');
            return false
          }
          this.goodsObject.goodPromotionApplication.forEach((item) => {
            if ((this.applyStatus == 0 && parseInt(item.firstPromotionQuantities) < item.approve_num) || (this.applyStatus == 1 && parseInt(item.againPromotionQuantities) < item.approve_num)) {
              this.$message.error('同意的数量不能超过申请的数量');
              return false;
            }
            data.childChannelCode.push(item.ChannelCode)
            data.applyPromotionStatus.push(this.applyStatus == 0?3:7)
            // data.checkTime.push(item.firstPromotionStartTime)
            data.orderDeadLine.push(item.againPromotionEndTime)
            data.ApprovedQuantities.push(item.approve_num? item.approve_num : '')
            data.reason.push(item.isAgree? '': item.reject_explain)
          })

        }

        // this.submitSuccess()
        console.log(data)
        this.$emit('submit-success', data)
      }
    },
    mounted() {
      this.$nextTick(() => {
        console.log(this.goodsObject)
        // this.tableHeight += this.$refs['goodsTable'].$el.offsetHeight
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
