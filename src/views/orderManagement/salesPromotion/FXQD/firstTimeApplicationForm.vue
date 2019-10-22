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
      <el-row type="flex" class="searchRow" style="border: none;margin: 1em 0">
        <div style="width: 80%; padding-left: 1em">
          <el-input placeholder="子渠道号/子渠道名称"></el-input>
        </div>
        <div style="width: 20%;margin-left: 1em">
          <el-button type="primary">搜索子渠道</el-button>
        </div>
      </el-row>

      <div v-for="(item, index) in goodsObject.goodPromotionApplication" class="border-top">
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
            <el-input type="textarea" v-model="item.firstApplyReason" :rows="1" placeholder="100字以内简要说明理由" class="noBorderTextarea"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center" style="min-height: 64px;">
            <div class="grid-content bg-purple">上传申请资料</div>
          </el-col>
          <el-col :span="10" style="padding-left: 1em">
            <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
                       :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
              <div slot="tip" class="el-upload__tip">提示：需上传活动方案、促销版面申请成功截图</div>
              <el-button slot="trigger" size="mini" v-waves type="primary" style="margin-top: 5px">浏览</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" align="center" style="min-height: 36px">
            <div class="grid-content bg-purple">促销活动日期</div>
          </el-col>
          <el-col :span="8">
            <el-date-picker class="noBorderDatePicker" v-model="item.firstPromotionStartTime" type="daterange"
                            range-separator="————" start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
          </el-col>
          <el-col :span="11" align="center" style="background-color: transparent">
            <div align="left" style="color:red;line-height: 36px">温馨提示：促销活动的开始日期距离今天需要≥35天。</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">申请数量</el-col>
          <el-col :span="3" style="border-right: none">
            <el-input class="noBorderInput" v-model="item.firstApprovedQuantities" placeholder="输入申请数量"></el-input>
          </el-col>
          <el-col :span="1" class="noBackground"><span>套</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="3">库存数量</el-col>
          <el-col :span="1" style="display: flex;justify-content: center;border-right: none"><span>{{goodsObject.currentInventoryQuantity}}</span></el-col>
          <el-col :span="1" class="noBackground"><span>套</span></el-col>
        </el-row>
        <el-row class="no-border-bottom">
          <el-col :offset="8" :span="10" class="noBackground"><span style="color: grey">“库存数量”仅供参考，以吾蜜公司同意申请后才正式为该申请预留库存。</span></el-col>
        </el-row>
      </div>
    </div>


    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="submitApplication" :loading="submitLoading">提交申请</el-button>
    </div>

    <el-dialog :visible.sync="failDialogVisible" width="30%" append-to-body :show-close="false">
      <span>提交申请不成功，部分子渠道的促销活动开始日期距离今天不足35天，请检查。</span>
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
        }
      }
    },
    methods: {
      submitApplication() {
        this.submitLoading = true
        // this.dateRange.forEach((item, index) => {
        //   if (item === []) {
        //     this.failDialogVisible = true
        //     return
        //   }
        // })
//        if (this.dateRange === '' || this.dateRange.length === 0) {
//          this.failDialogVisible = true
//          return
//        }
        var data ={
          goodsNo: this.goodsObject.goodsNo,
          reason: [],
          quantity: [],
          startDate: [],
          endDate: [],
          fileName: [],
          fileUrl: []
        }
        const now = Date.now()
        this.goodsObject.goodPromotionApplication.forEach((item, index) => {
          if (item.firstPromotionStartTime == [] || item.firstPromotionStartTime == null) {
            this.failDialogVisible = true
            return
          }
          if (parseInt(item.firstPromotionStartTime[0] - now) / (1000 * 60 * 60 * 24) + 1 < 35) {
            this.failDialogVisible = true
            return
          }
          data.reason.push(item.firstApplyReason)
          data.quantity.push(item.firstApprovedQuantities)
          data.startDate.push(item.firstPromotionStartTime[0])
          data.endDate.push(item.firstPromotionStartTime[1])
          data.fileName.push('1111.doc')
          data.fileUrl.push('/data/111.do')
        })

        this.successDialogVisible = true
        this.$emit('submit-first-application', data)
        /*const diff1 = parseInt(this.dateRange[0][0] - now) / (1000 * 60 * 60 * 24) + 1
        const diff2 = parseInt(this.dateRange[1][0] - now) / (1000 * 60 * 60 * 24) + 1
        const diff3 = parseInt(this.dateRange[2][0] - now) / (1000 * 60 * 60 * 24) + 1*/
        // if (diff1 >= 35 && diff2 >= 35 && diff3 >= 35) {
        //   this.successDialogVisible = true
        //   this.$emit('submit-first-application', data)
        // } else {
        //   this.failDialogVisible = true
        // }
//        const now = Date.now()
//        const diff = parseInt(this.dateRange[0] - now) / (1000 * 60 * 60 * 24) + 1
//        if (diff >= 35) {
//          this.successDialogVisible = true
//          this.$emit('submit-first-application')
//        } else {
//          this.failDialogVisible = true
//        }
      },
      handlePreview() {
      },
      handleRemove() {
      },
      handleConfirm() {
        this.$emit('closeDLDFfirstApplicationForm')
        this.submitLoading = false
      }
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
