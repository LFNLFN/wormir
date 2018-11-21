<template>
  <div class="addChannelDialog">
    <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
      <dl>
        <dt><h3 class="form-part-title">渠道特点</h3></dt>
        <dd>
          <el-form-item label="合作类型">
            <el-radio-group v-model="form.cooperativeType">
              <el-radio label="1">渠道入驻</el-radio>
              <el-radio label="2">渠道变更</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="渠道属性">
            <el-radio-group v-model="form.channelProp">
              <el-radio label="1">DLQD</el-radio>
              <el-radio label="2">DFQD</el-radio>
              <el-radio label="3">FXQD</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="渠道类别">
            <el-radio-group v-model="form.channelType">
              <el-radio label="1">淘宝C店</el-radio>
              <el-radio label="2">淘宝企业店</el-radio>
              <el-radio label="3">天猫店</el-radio>
              <el-radio label="4">B2C平台</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="渠道属性">
            <el-radio-group v-model="form.channelLevel">
              <el-radio label="1">A级渠道</el-radio>
              <el-radio label="2">B级渠道</el-radio>
              <el-radio label="3">C级渠道</el-radio>
              <el-radio label="4">D级渠道</el-radio>
            </el-radio-group>
          </el-form-item>
        </dd>
      </dl>

      <dl>
        <dt><h3 class="form-part-title">基本信息</h3></dt>
        <dd>
          <el-form-item label="经营主体" label-width="100px">
            <el-radio-group v-model="form.businessEntity">
              <el-radio label="1">个人</el-radio>
              <el-radio label="2">企业</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号码" label-width="100px" class="idCardCode">
            <el-input style="margin-left: -1em" class="noBorderInput" v-model="form.personID" placeholder="请输入身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="" style="margin: 10px 0;" class="idCardUpload">
            <el-col :span="11">
              <el-form-item prop="id1" label="身份证正面" label-width="100px" class="idCardLabel">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="id2" label="身份证反面" label-width="100px" class="idCardLabel">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="店铺/平台名称" label-width="130px" class="form-row">
            <el-col :span="11" class="marginToLeft">
              <el-form-item label="">
                <el-input v-model="form.storeName" class="noBorderInput" style="margin-left: -1em" placeholder="请输入店铺/平台名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2"><span>渠道名称</span></el-col>
          </el-form-item>
          <el-form-item label="PC店铺/平台链接" label-width="130px" class="form-row last-form-row">
            <el-col :span="11" class="marginToLeft">
              <el-form-item label="">
                <el-input v-model="form.PCLink" class="noBorderInput marginToLeft" placeholder="请输入PC店铺/平台链接"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机店铺/平台链接" label-width="130px">
                <el-input v-model="form.appLink" class="noBorderInput marginToLeft" placeholder="请输入手机店铺/平台链接"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <p style="color: red">*由于涉及后期的技术对接，以上两项请输入正确的链接。若实在没有PC或手机店铺/平台，请输入“123456”</p>
          <el-form-item label="经营范围" label-width="130px">
            <el-input class="noBorderTextarea marginToLeft" :rows="1" type="textarea" v-model="form.businessRange" placeholder="请输入经营内容（200字以内）"></el-input>
          </el-form-item>
          <el-form-item label="经营过的类似商品" label-width="130px">
            <el-input class="noBorderTextarea marginToLeft" :rows="1" type="textarea" v-model="form.similarGoods" placeholder="请提供商品名称和销量（200字以内）"></el-input>
          </el-form-item>
        </dd>
        <dt><h3 class="form-part-title">联系方式</h3></dt>
        <dd>
        <dt>联系方式 <span style="color: red">(温馨提示：渠道联系人及技术对接人必填哦！)</span></dt>
        <dd>
          <el-table
            border
            :data="contactData"
            style="width: 100%">
            <el-table-column
              align="center"
              prop="job"
              label="职务"
              width="150">
              <template slot-scope="scope">
                <el-select v-model="form.job" placeholder="请选择">
                  <el-option
                    v-for="item in jobType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="姓名"
              width="">
              <template slot-scope="scope">
                <el-input v-model="form.personName" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="mobile"
              label="电话">
              <template slot-scope="scope">
                <el-input v-model="form.mobile" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="email"
              label="邮箱">
              <template slot-scope="scope">
                <el-input v-model="form.email" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              label="地址">
              <template slot-scope="scope">
                <el-input v-model="form.address" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="remark"
              label="备注">
              <template slot-scope="scope">
                <el-input v-model="form.remark" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop=""
              label="操作" width="170">
              <template slot-scope="scope">
                <el-button type="success" icon="el-icon-plus"></el-button>
                <el-button type="danger" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </dd>
        </dd>
        <dt><h3 class="form-part-title">保证金</h3></dt>
        <dd>
          <el-form-item label="保证金金额" label-width="100px" class="form-row">
            <el-select class="noBorderInput marginToLeft" v-model="form.depositValue" placeholder="请选择">
              <el-option
                v-for="item in depositOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        <dd>
          <div class="dialogBottomButton-wrap">
            <el-button type="primary" @click="">立即提交</el-button>
          </div>
        </dd>
        </dd>
      </dl>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          cooperativeType: '',
          channelProp: '',
          channelType: '',
          channelLevel: '',

          businessEntity: '',
          personID: '',
          storeName: '',
          PCLink: '',
          appLink: '',
          similarGoods: '',

          job: '',
          personName: '',
          depositValue: ''
        },
        imageUrl: '',
        contactData: [{
          job: '技术对接人',
          name: '王小虎',
          mobile: 15268172199,
          email: '315889743@qq.com',
          address: '上海市普陀区金沙江路 1518 弄',
          remark: '此人非常重要'
        }],
        jobType: [
          { label: '渠道联系人', value: 1 },
          { label: '技术对接人', value: 2 },
          { label: '采购', value: 3 },
          { label: '收货人', value: 4 },
          { label: '业务', value: 5 },
          { label: '财务', value: 6 },
          { label: '其他', value: 7 }
        ],
        depositOptions: [
          { label: '¥2000', value: 1 },
          { label: '¥4000', value: 2 },
          { label: '¥10000', value: 3 },
          { label: '¥30000', value: 4 },
          { label: '¥50000', value: 5 }
        ],
        formRules: {}
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-uploader .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .avatar-uploader-icon:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>
