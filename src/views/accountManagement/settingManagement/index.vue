<template>
  <div class="setting-management-index-vue" style="padding: 0 20px 20px">
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
      <h2>基础信息</h2>
      <div class="border1 form-error-inline" style="">
        <el-form-item label="香港吾蜜交易账号" prop="tradeAccountSetting" class="border1 no-border-top no-border-bottom"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="form.tradeAccountSetting"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px 4px 0">
            <el-table-column align="center" label="SWIFT Code">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.$index==0" placeholder="输入中文SWIFT Code" clearable
                  v-model.trim="form.tradeAccountSetting[0].swiftCodeZh"
                ></el-input>
                <el-input
                  v-if="scope.$index==1" placeholder="输入英文SWIFT Code" clearable
                  v-model.trim="form.tradeAccountSetting[1].swiftCodeEn"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="银行名称/Bank Name">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.$index==0" placeholder="输入中文银行名称" clearable
                  v-model.trim="form.tradeAccountSetting[0].bankNameZh"
                ></el-input>
                <el-input
                  v-if="scope.$index==1" placeholder="输入英文银行名称" clearable
                  v-model.trim="form.tradeAccountSetting[1].bankNameEn"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="银行地址/Bank Address">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.$index==0" placeholder="输入中文银行地址" clearable
                  v-model.trim="form.tradeAccountSetting[0].bankAddressZh"
                ></el-input>
                <el-input
                  v-if="scope.$index==1" placeholder="输入英文银行地址" clearable
                  v-model.trim="form.tradeAccountSetting[1].bankAddressEn"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            border
            :data="form.tradeAccountSetting"
            :span-method="objectSpanMethod"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin:0px 4px 4px">
            <el-table-column align="center" label="受益人/汇款人账户">
              <template slot-scope="scope">
                <el-input placeholder="输入受益人/汇款人账户" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收/汇款名称">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.$index==0" placeholder="输入收/汇款公司/个体的中文名称" clearable
                ></el-input>
                <el-input
                  v-if="scope.$index==1" placeholder="输入收/汇款公司/个体的中文名称" clearable
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收/汇款地址">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.$index==0" placeholder="输入收/汇款公司/个体的银行登记中文名称" clearable
                ></el-input>
                <el-input
                  v-if="scope.$index==1" placeholder="输入收/汇款公司/个体的银行登记中文名称" clearable
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="e商快线总金户设置" prop="eQuickSetting" class="border1 no-border-top no-border-bottom"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="form.eQuickSetting"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 4px">
            <el-table-column align="center" label="账户户名">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入开通e商快线的账户户名" clearable
                  v-model.trim="form.eQuickSetting[0].eQuickName"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="银行账号">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入开通e商快线的银行账号" clearable
                  v-model.trim="form.eQuickSetting[0].eQuickBankAccount"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="银行名称">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入银行名称" clearable
                  v-model.trim="form.eQuickSetting[0].eQuickBankName"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="赔保设置" prop="compensationBeneficiary" class="border1 no-border-top no-border-bottom"
                      style="padding: 5px 0 0;margin-bottom: 0">
          <el-table
            border
            :data="form.compensationBeneficiary"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 0 4px 4px">
            <el-table-column align="center" label="收款户名">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入接收赔保金额的收款户名" clearable
                  v-model.trim="form.compensationBeneficiary[0].compensationBeneficiaryName"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收款账号">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入接收赔保金额的收款账号" clearable
                  v-model.trim="form.compensationBeneficiary[0].compensationBeneficiaryAccount"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收款银行">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入接收赔保金额的银行名称" clearable
                  v-model.trim="form.compensationBeneficiary[0].compensationBeneficiaryBankName"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="" prop="compensationRemitter" class="border1 no-border-top no-border-bottom"
                      style="padding: 0 0 5px;margin-bottom: 0">
          <el-table
            border
            :data="form.compensationRemitter"
            class="no-border-top no-border-right no-border-bottom"
            style="width: 95%;margin: -4px 4px 4px">
            <el-table-column align="center" label="汇款户名">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入汇出赔保金额的汇款户名" clearable
                  v-model.trim="form.compensationRemitter[0].compensationRemitterName"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="汇款账号">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入汇出赔保金额的汇款账号" clearable
                  v-model.trim="form.compensationRemitter[0].compensationRemitterAccount"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="汇款银行">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入汇出赔保金额的银行名称" clearable
                  v-model.trim="form.compensationRemitter[0].compensationRemitterBankName"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="国内货权公司设置" prop="domesticAuthorityCompanyMsg" class="border1 no-border-top no-border-bottom"
                      style="padding: 5px 0 0;margin-bottom: 0">
            <el-table
              v-for="(item, index) in domesticAuthorityCompanyMsg" :key="index"
              border :show-header="false"
              :data="[{},{}]"
              :span-method="domesticAuthorityCompanyMsgSpanMethod"
              :cell-class-name="domesticAuthorityCompanyMsgCellClassName"
              class="no-border-right no-border-bottom"
              style="width: 95%;margin: 0 4px 4px">
              <el-table-column align="center" label="0">
                <template slot-scope="scope">
                  <span v-if="scope.$index==0">Address</span>
                  <span v-if="scope.$index==1">Consignee's Name</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="1" width="50px">
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.$index==0" placeholder="国内货权公司的英文地址" clearable
                    type="textarea" autosize
                    v-model.trim="form.domesticAuthorityCompanyMsg[index].address"
                  ></el-input>
                  <el-input
                    v-if="scope.$index==1" placeholder="国内货权公司的英文名称" clearable
                    v-model.trim="form.domesticAuthorityCompanyMsg[index].englishName"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="2">
                <template slot-scope="scope">
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="3" width="80px">
                <template slot-scope="scope">
                  <span v-if="scope.$index==1">Contact</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="4">
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.$index==1" placeholder="清关联系人" clearable
                    v-model.trim="form.domesticAuthorityCompanyMsg[index].contact"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="5" width="60px">
                <template slot-scope="scope">
                  <span v-if="scope.$index==0">City</span>
                  <span v-if="scope.$index==1">Tel</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="6">
                <template slot-scope="scope">
                  <el-input
                    v-if="scope.$index==0" placeholder="清关城市" clearable
                    v-model.trim="form.domesticAuthorityCompanyMsg[index].city"
                  ></el-input>
                  <el-input
                    v-if="scope.$index==1" placeholder="清关联系人电话" clearable
                    v-model.trim="form.domesticAuthorityCompanyMsg[index].tel"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="7" width="70px">
                <template slot-scope="scope">
                  <p v-show="form.domesticAuthorityCompanyMsg.length>1" style="padding-top: 10px">
                    <el-button type="danger" icon="el-icon-delete" @click="deleteDomesticAuthorityCompany(index)"></el-button>
                  </p>
                  <p v-show="index==form.domesticAuthorityCompanyMsg.length-1" style="padding-top: 10px">
                    <el-button type="success" icon="el-icon-plus" @click="addDomesticAuthorityCompany(index)"></el-button>
                  </p>
                </template>
              </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="境外货权公司设置" prop="externalAuthorityCompanyMsg" class="border1 no-border-top no-border-bottom"
                      style="padding: 5px 0 0;margin-bottom: 0">
          <el-table
            border
            :data="externalAuthorityCompanyMsg"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 0 4px 4px">
            <el-table-column align="center" label="境外货权公司名称">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入货权公司英文名称" clearable
                  v-model.trim="form.externalAuthorityCompanyMsg[scope.$index].name"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="境外货权公司地址">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入货权公司英文地址" clearable
                  v-model.trim="form.externalAuthorityCompanyMsg[scope.$index].address"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="境外货权公司电话">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入货权公司联系电话" clearable
                  v-model.trim="form.externalAuthorityCompanyMsg[scope.$index].tel"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" @click="deleteExternalAuthorityCompany(scope.$index)"
                           v-show="form.externalAuthorityCompanyMsg.length>1"></el-button>
                <el-button type="success" icon="el-icon-plus" @click="addExternalAuthorityCompany(scope.$index)"
                           v-show="scope.$index==form.externalAuthorityCompanyMsg.length-1"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>

      <h2>设置信息</h2>
      <div class="border1 form-error-inline" style="border-top-width: 1px;border-bottom-width: 1px;">
        <el-form-item label="商品分类设置" prop="categorySetting" class="border1 no-border-top no-border-bottom"
                                     style="padding: 5px 0;margin-bottom: 0">
        <el-table
          v-loading="categoryTableLoading"
          border
          :data="form.categorySetting"
          :span-method="categorySettingSpanMethod"
          class="no-border-right no-border-bottom"
          style="width: 95%;margin: 0 4px 4px">
          <el-table-column align="center" label="主品类">
            <template slot-scope="scope">
              <el-input
                placeholder="输入主品类名称" clearable
                v-model.trim="form.categorySetting[scope.$index].mainName"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <!-- <el-button type="danger" icon="el-icon-delete" @click="deleteMainCategory(form.categorySetting[scope.$index].mainIndex,scope.$index)" v-show="form.categorySetting[form.categorySetting.length-1].mainIndex!=form.categorySetting[0].mainIndex"></el-button>
              <el-button type="success" icon="el-icon-plus" @click="addMainCategory(scope.$index)" v-show="form.categorySetting[scope.$index].mainIndex==form.categorySetting[form.categorySetting.length-1].mainIndex"></el-button> -->
              <el-button type="danger" icon="el-icon-delete" @click="deleteMain(scope.$index)" v-show="form.categorySetting[form.categorySetting.length-1].mainIndex!=form.categorySetting[0].mainIndex"></el-button>
              <el-button type="success" icon="el-icon-plus" @click="addMain(scope.$index)" v-show="form.categorySetting[scope.$index].mainIndex==form.categorySetting[form.categorySetting.length-1].mainIndex"></el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="子品类">
            <template slot-scope="scope">
              <!-- <el-input
                placeholder="输入相同主品类下的子品类名称" clearable
                v-model.trim="form.categorySetting[scope.$index].subName"
              ></el-input>
              <el-button type="danger" icon="el-icon-delete" @click="deleteSubCategory(scope.$index)" v-show="form.categorySetting.length>1"></el-button>
              <el-button type="success" icon="el-icon-plus" @click="addSubCategory(scope.$index)" v-show="scope.$index == form.categorySetting.length-1 || form.categorySetting[scope.$index].mainIndex != form.categorySetting[scope.$index+1].mainIndex"></el-button> -->
              <div v-for="(i,index) in form.categorySetting[scope.$index].subList" style="margin-bottom:5px">
                <el-input
                style="width:50%"
                placeholder="输入相同主品类下的子品类名称" clearable
                v-model.trim="i.subName"
              ></el-input>
              <el-button type="danger" icon="el-icon-delete" @click="deletemore(scope.$index,index)" v-show="form.categorySetting[scope.$index].subList.length>1"></el-button>
              <el-button type="success" icon="el-icon-plus" @click="addmore(scope.$index,index)" v-show="scope.$index == form.categorySetting.length-1 || form.categorySetting[scope.$index].mainIndex != form.categorySetting[scope.$index+1].mainIndex"></el-button>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" @click="deleteSubCategory(scope.$index)" v-show="form.categorySetting.length>1"></el-button>
              <el-button type="success" icon="el-icon-plus" @click="addSubCategory(scope.$index)" v-show="scope.$index == form.categorySetting.length-1 || form.categorySetting[scope.$index].mainIndex != form.categorySetting[scope.$index+1].mainIndex"></el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-form-item>
        <el-form-item label="OCC系统特殊流程" prop="occSpecialSetting" class="border1 no-border-top no-border-bottom"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="occSpecialSetting"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 0 4px 4px">
            <el-table-column align="center" label="OCC系统特殊流程">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入特殊流程名称" clearable
                  v-model.trim="form.occSpecialSetting[scope.$index].flowName"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" @click="deleteFlow(scope.$index)" v-show="form.occSpecialSetting.length>1"></el-button>
                <el-button type="success" icon="el-icon-plus" @click="addFlow(scope.$index)" v-show="scope.$index == form.occSpecialSetting.length-1"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="渠道保证金设置" prop="securityAmountSetting" class="border1 no-border-top no-border-bottom"
                      style="padding: 5px 0;margin-bottom: 0">
          <el-table
            border
            :data="form.securityAmountSetting"
            class="no-border-right no-border-bottom"
            style="width: 95%;margin: 0 4px 4px">
            <el-table-column align="center" label="保证金额设置">
              <template slot-scope="scope">
                <el-input
                  placeholder="输入金额" clearable
                  v-model.trim="form.securityAmountSetting[scope.$index].securityAmount"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete"  @click="deleteCash(scope.$index)" v-show="form.securityAmountSetting.length>1"></el-button>
                <el-button type="success" icon="el-icon-plus" @click="addCash(scope.$index)" v-show="form.securityAmountSetting[scope.$index].itemIndex==form.securityAmountSetting[form.securityAmountSetting.length-1].itemIndex"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>

      <div class="dialogBottomButton-wrap">
        <el-button type="primary" @click="onSubmit" :loading="isSubmitting">保存</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
  import basicMsg from './formMsg/basicMsg'
  import settingMsg from './formMsg/settingMsg'
  import basicMsgRules from './formRules/basicMsgRules'
  import settingMsgRules from './formRules/settingMsgRules'
  import { domesticAuthorityCompanyMsgSpanMethod, domesticAuthorityCompanyMsgCellClassName, deleteDomesticAuthorityCompany, addDomesticAuthorityCompany,  deleteExternalAuthorityCompany, addExternalAuthorityCompany } from './formMsg/basicMsg'
  import { deleteSubCategory, addSubCategory, deleteMainCategory, addMainCategory,categorySettingSpanMethod,getSpanArr,addFlow,deleteFlow } from './formMsg/settingMsg'

  export default {
    data() {
      return {
        isInitial: true,
        form: {},
        basicMsg: {},
        settingMsg: {},
        formRules: {},
        basicMsgRules: {},
        settingMsgRules: {},
        isSubmitting: false,
        domesticAuthorityCompanyMsg: [{ address: null, city: null, englishName: null, contact: null, tel: null }], // 用于货权公司信息渲染
        externalAuthorityCompanyMsg: [{ name: null, address: null, tel: null }],
        // categorySetting: [{mainIndex: 0,mainName: null,subIndex: 0,subName: null,subList:[{subIndex:0,subName:''}]}],
        categorySetting: [{mainIndex: 0,mainName: null,subList:[{subIndex:0,subName:''}]}],
        securityAmountSetting:[{ itemIndex:0,securityAmount:''}],
        spanArr: [],
        pos: 0,
        occSpecialSetting: [{flowName: null, flowIndex: 0}],
        categoryTableLoading: false
      }
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      onSubmit() {
        this.isSubmitting = true;
        console.log(this.form)
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$request({
              url: this.isInitial ? '/user/updateAccount.do' : '/user/initAccount.do',
              method: "post",
              data: this.form
            })
              .then(res => {
                if (res.errorCode == 0) {
                  this.$confirm('信息已保存，可在“账户管理”中的“设置管理”查看详情或进行修改。', { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }).then(()=>{
                    if (!this.isInitial) { this.isInitial = true }
                    this.isSubmitting = false;
                    // setTimeout(function(){
                      this.getData();
                      // location.reload();
                    // },1000);
                  })
                }
                else {
                  this.$message.error("数据获取失败");
                  this.isSubmitting = false;
                }
              })
              .catch(() => {
                this.$message.error("无法连接服务器");
                this.isSubmitting = false;
              });
          } else {
            this.isSubmitting = false;
            this.$message.error("请正确填写全部信息");
            return false;
          }
        })

      },
      // 添加主品类
      addMain(index){
        var len=this.form.categorySetting.length;
        console.log('前',this.form.categorySetting,len)
        var obj={mainIndex:Date.now().toString(36),mainName: null,subList:[{subIndex:0,subName:''}]}
        this.form.categorySetting.push(obj)
        console.log('后',this.form.categorySetting)
      },
      // 删除主品类
      deleteMain(index){
        this.form.categorySetting.splice(index, 1)
        console.log(this.form.categorySetting)
      },
      // 添加子品类
      addmore(mainindex,subindex){
        if (!this.form.categorySetting[mainindex].mainName) {
          this.$message.error('请先完成主品类的填写');
          return false
        }
        var obj={subIndex:Date.now().toString(36),subName:''}
        this.form.categorySetting[mainindex].subList.push(obj)
      },
      // 删除子品类
      deletemore(mainindex,subindex){
        this.form.categorySetting[mainindex].subList.splice(subindex, 1)
      },
      // 保证金添加
      addCash(index){
        console.log(index)
        var len=this.form.securityAmountSetting.length;
        console.log('前',this.form.securityAmountSetting,len)
        var obj={itemIndex:Date.now().toString(36),securityAmount:''}
        this.form.securityAmountSetting.push(obj)
        console.log('后',this.form.securityAmountSetting)
      },
      // 删除保证金
      deleteCash(index){
        console.log(index);
        this.form.securityAmountSetting.splice(index, 1)
        console.log(this.form.securityAmountSetting)
      },
      getData(){
        this.basicMsg = JSON.parse(JSON.stringify(basicMsg))
        this.settingMsg = JSON.parse(JSON.stringify(settingMsg))
        this.basicMsgRules = basicMsgRules
        this.settingMsgRules = settingMsgRules
        Object.assign(this.form, this.basicMsg, this.settingMsg)
        Object.assign(this.formRules, this.basicMsgRules, this.settingMsgRules)
        this.form.account = 'admin'
        this.$request({
          url: '/user/getAccount.do',
          method: "post",
          data: { account: 'admin' }
        }).then(res => {
          console.log('接口',res)
          if (res.errorCode==0) {
            this.form.tradeAccountSetting = res.data.tradeAccountSetting
            this.form.eQuickSetting = res.data.eQuickSetting
            this.form.compensationBeneficiary = res.data.compensationBeneficiary
            this.form.compensationRemitter = res.data.compensationRemitter
            this.form.domesticAuthorityCompanyMsg = res.data.domesticAuthorityCompanyMsg
            this.domesticAuthorityCompanyMsg = JSON.parse(JSON.stringify(res.data.domesticAuthorityCompanyMsg))
            this.form.externalAuthorityCompanyMsg = res.data.externalAuthorityCompanyMsg
            this.externalAuthorityCompanyMsg = JSON.parse(JSON.stringify(res.data.externalAuthorityCompanyMsg))
            
            if(res.data.categorySetting.length==0){
              res.data.categorySetting.push({mainIndex: 0,mainName: null,subList:[{subIndex:0,subName:''}]})
            }
            this.form.categorySetting = res.data.categorySetting;
            this.categorySetting=res.data.categorySetting
            if(res.data.securityAmountSetting.length==0){
              res.data.securityAmountSetting.push({itemIndex:0,securityAmount:''})
            }
            this.form.securityAmountSetting = res.data.securityAmountSetting;
            this.securityAmountSetting= res.data.securityAmountSetting;
            this.categorySetting = JSON.parse(JSON.stringify(res.data.categorySetting))
            this.form.occSpecialSetting = res.data.occSpecialSetting
            this.occSpecialSetting = JSON.parse(JSON.stringify(res.data.occSpecialSetting))
          } else {
            this.isInitial = false
          }

        })
      },
      domesticAuthorityCompanyMsgSpanMethod,domesticAuthorityCompanyMsgCellClassName,deleteDomesticAuthorityCompany,addDomesticAuthorityCompany,deleteExternalAuthorityCompany, addExternalAuthorityCompany,deleteSubCategory, addSubCategory, deleteMainCategory, addMainCategory, categorySettingSpanMethod,getSpanArr,addFlow,deleteFlow
    },

    created() {
      this.getData();
    }
  }
</script>

<style lang="scss" scoped>

</style>
