<template>
  <div class="app-container">
    <div class="theBorder">
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">渠道号</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{goodsObject.channelNo}}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">渠道名称</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">{{channelClassifyMap[goodsObject.channelClassify]}}</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">渠道级别</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">{{goodsObject.channelLevel}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">申请理由</div>
        </el-col>
        <el-col :span="21">
          <el-input type="textarea" :rows="1" placeholder="100字以内简要说明理由" class="noBorderTextarea"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" align="center" style="min-height: 64px;">
          <div class="grid-content bg-purple">上传申请资料</div>
        </el-col>
        <el-col :span="10" style=";padding-left: 1em
">
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
          <el-date-picker class="noBorderDatePicker" v-model="dateRange" type="daterange"
                          range-separator="————" start-placeholder="开始日期"
                          end-placeholder="结束日期"></el-date-picker>
        </el-col>
        <el-col :span="11" align="center" style="background-color: transparent">
          <div align="left" style="color:red;line-height: 36px">温馨提示：促销活动的开始日期距离今天需要≥35天。</div>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="3">已申请数量</el-col>
        <el-col :span="1" class="no-border-right" style="display: flex;justify-content: center"><span>{{isFirstTimeReject? 0 : 100}}</span>
        </el-col>
        <el-col :span="1" class="noBackground"><span>套</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="3">再申请数量</el-col>
        <el-col :span="3" class="no-border-right">
          <el-input class="noBorderInput" placeholder="输入申请数量"></el-input>
        </el-col>
        <el-col :span="1" class="noBackground"><span>套</span></el-col>
        <el-col :span="0"></el-col>
        <el-col :span="3">库存数量</el-col>
        <el-col :span="1" class="no-border-right" style="display: flex;justify-content: center"><span>500</span>
        </el-col>
        <el-col :span="1" class="noBackground"><span>套</span></el-col>
      </el-row>
      <el-row class="no-border-bottom">
        <el-col :offset="8" :span="10" class="noBackground"><span
          style="color: grey">“库存数量”仅供参考，以吾蜜公司同意申请后才正式为该申请预留库存。</span></el-col>
      </el-row>
    </div>


    <div class="dialogBottomButton-wrap">
      <el-button type="primary" @click="submitApplication" :loading="submitLoading">提交申请</el-button>
    </div>

    <el-dialog :visible.sync="failDialogVisible" width="30%" append-to-body :show-close="false">
      <span>提交申请不成功，促销活动的开始日期距离今天不足35天。</span>
      <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button type="primary" @click="failDialogVisible = false, submitLoading = false">知道了</el-button>
          </div>
    </el-dialog>

    <el-dialog :visible.sync="successDialogVisible" width="30%" append-to-body :show-close="false">
      <span>申请已提交，可点击“再次结果”了解进度和详情。</span>
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
        dateRange: [],
        fileList: [],
        failDialogVisible: false,
        successDialogVisible: false,
        submitLoading: false,
        channelClassifyMap: {
          1: '独立渠道',
          2: '代发渠道',
          3: '代发渠道'
        },
        isFirstTimeReject: true
      }
    },
    methods: {
      submitApplication() {
        this.submitLoading = true
        if (this.dateRange === '' || this.dateRange.length === 0) {
          this.failDialogVisible = true
          return
        }
        const now = Date.now()
        const diff = parseInt(this.dateRange[0] - now) / (1000 * 60 * 60 * 24) + 1
        if (diff >= 35) {
          this.successDialogVisible = true
          this.$emit('submit-first-application')
        } else {
          this.failDialogVisible = true
        }
      },
      handlePreview() {
      },
      handleRemove() {
      },
      handleConfirm() {
        this.$emit('closeDLDFsecondApplicationForm')
        this.submitLoading = false
      }
    }
  }
</script>

<style scope>
  .el-input--medium .el-input__inner {
    line-height: 24px;
    height: 24px;
  }
</style>
