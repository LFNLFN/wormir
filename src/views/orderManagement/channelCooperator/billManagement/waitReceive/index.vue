<template>
  <div class="app-container">
    <div class="mainContent">
      <div class="filter-container theTopMsgBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">货单号:</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ currentRow.orderNo }}</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">渠道号:</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">{{ currentRow.channelClassify }}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">渠道名称</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ currentRow.channelName }}</div>
          </el-col>
        </el-row>
        <div v-if="orderDetail.propertyOfSale==1">
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">收货地址:</div>
            </el-col>
            <el-col :span="19">
              <div class="grid-content bg-purple">{{ orderDetail.address }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">收货方:</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">{{orderDetail.name}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">联系人:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.contact}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">联系电话:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.tel}}</div>
            </el-col>
          </el-row>
        </div>
        <div v-if="orderDetail.propertyOfSale==2">
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">Address:</div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple">{{ orderDetail.address}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">City:</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">{{orderDetail.city}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">Consignee's Name:</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">{{orderDetail.name}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">Contact:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.contact}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">Tel:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.tel}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="grid-content bg-purple">收款SWFIT Code</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{ orderDetail.wormirSwiftCode }}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">收款银行</div>
            </el-col>
            <el-col :span="4">
             <div class="grid-content bg-purple">{{ orderDetail.wormirBankName }}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">银行地址</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">{{ orderDetail.wormirBankAddress }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">汇款SWFIT Code</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">{{orderDetail.channelSwiftCode}}</div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">汇款银行</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">{{orderDetail.channelBankName}}</div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">银行地址</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple">{{orderDetail.channelBankAddress}}</div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div style="display: flex">
        <div class="brand-col">
          <div class="col-head border-bottom" style="border-left: 2px solid #d5d5d5">商品品牌</div>
          <div class="col-content"
               :style="{height: tableHeight-37+'px', borderLeft: '2px solid #d5d5d5', borderBottom: '2px solid #d5d5d5'}">
            <span>AESOP</span>
          </div>
        </div>
        <div class="twoTable-wrap" style="padding-right: 20px">
          <!--订货表格-->
          <div class="filter-container" style="padding-bottom: 0">
            <el-table key='productList' :data="order.orderSubs || []"
                      border fit size="mini"
                      style="width: 100%;border:none;border-left: 1px solid #d5d5d5;border-right: 1px solid #d5d5d5"
                      class="orderTable" ref="orderTable"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700'}">
              <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
                <template slot-scope="scope">
                  <span>{{scope.row.goodsNo}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.goodsChineseName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="90" :label="$t('product.productSpecification')"
                               prop="specificationChinese" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.specificationChinese}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="220" class-name="units-wrap"
                               :label="$t('order.packageSpecification')" prop="packingSpecification"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.packingSpecification || 0}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>支/箱</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" width="90" label="国内零售价">
                <template slot-scope="scope">
                  <span>{{scope.row.supplyCurrencySymbol}}{{scope.row.supplyPrice.toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="120" class-name="units-wrap" :label="$t('order.orderQuantity')">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.orderQuantity}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>箱</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>

              <el-table-column align="center" width="140" label="起始折扣">
                <template slot-scope="scope">
                  <span>{{scope.row.startDiscount}}%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" label="订货折扣">
                <template slot-scope="scope">
                  <span>{{scope.row.orderDiscount}}%</span>
                </template>
              </el-table-column>

              <el-table-column align="center" width="140" :label="$t('price.orderUnitPrice')">
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" :label="$t('order.orderAmount')">
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification * scope.row.orderQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('order.thirtyPercentDeposit')" width="130">
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.supplyPrice * scope.row.packingSpecification * scope.row.orderQuantity * 0.3).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('order.residualPayment')" align="center"
                               width="170">
                <template slot-scope="scope">
                  <span>￥ {{ (scope.row.supplyPrice * scope.row.packingSpecification * scope.row.orderQuantity * 0.7).toFixed(2) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--补货表格-->
          <div class="filter-container">
            <el-table key='replenishment' :data="order.replenishmentList" border fit
                      size="mini"
                      style="width: 100%;border: 1px solid #d5d5d5;border-top:none;"
                      class="orderTable" ref="replenishmentTable"
                      :span-method="arraySpanMethod"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">

              <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-1" class="text-muted">
                    确认出库时间: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }} ;
                    上传运单时间: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
                  </span>
                  <span v-else>{{ scope.row.goodsNo }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName"
                               show-overflow-tooltip/>
              <el-table-column align="center" width="90" :label="$t('product.productSpecification')"
                               prop="specificationChinese" show-overflow-tooltip/>
              <el-table-column align="center" :label="$t('order.replenishmentSpecification')">
                <el-table-column align="center" width="120" class-name="units-wrap"
                                 :label="$t('order.replenishmentQuantity')">
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="12" style="display: flex;justify-content: center">
                        <span>{{scope.row.replenishmentQuantity}}</span>
                      </el-col>
                      <el-col :span="12" style="display: flex;justify-content: center">
                        <span>瓶</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="100" label="装箱规格">
                  <template slot-scope="scope">
                    <span>{{scope.row.packingUnit}} 瓶/箱</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" width="90" label="国内零售价">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-1">{{ '合计: ' }}</span>
                  <span v-else>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="120" class-name="units-wrap"
                               :label="$t('order.replenishmentQuantity')">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span v-if="scope.$index===order.replenishmentList.length-1"
                            style="color:gray">{{ cartonTotal }}</span>
                      <span v-else style="color:gray">{{ scope.row.replenishmentQuantity }}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>箱</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" label="起始折扣">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-1"
                        class="text-total">{{ '（待收货）已付货款: ' }}</span>
                  <span v-else>{{ scope.row.startDiscount }}%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" label="订货折扣">
                <template slot-scope="scope">
                  <span>{{ scope.row.orderDiscount }}%</span>
                </template>
              </el-table-column>
              <el-table-column width="140" align="center" :label="$t('price.orderUnitPrice')">
                <template slot-scope="scope">
                  <span>￥ {{ (scope.row.supplyPrice * scope.row.packingUnit).toFixed(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
                <template slot-scope="scope">
                  <span class="text-total" v-if="scope.$index===order.replenishmentList.length-1">￥ {{ (deposit30Amount+deposit70Amount).toFixed(2) }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                <template slot-scope="scope">
                  <span class="text-total" v-if="scope.$index===order.replenishmentList.length-1">￥ {{ deposit30Amount.toFixed(2) }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.3).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                <template slot-scope="scope">
                  <span class="text-total" v-if="scope.$index===order.replenishmentList.length-1">￥ {{ deposit70Amount.toFixed(2) }}</span>
                  <span v-else>￥ {{ (scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.7).toFixed(2) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div style="display: flex;justify-content: flex-end;">
            <el-button class="filter-item" type="primary" @click="viewEmailChoosing()">发送货单</el-button>
          </div>
          <div style="display: flex;justify-content: flex-end">
            <div class="invoice-chooseing-wrap">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
              </el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">
                  {{city}}
                  <el-button type="primary" size="mini" @click="previewInvoice(city)"
                             style="margin-left: 5px;width: 3em;padding: 0">{{ '预览' }}
                  </el-button>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--选择邮箱-->
    <el-dialog :visible.sync="isSendBoxShow" append-to-body fullscreen style="padding: 20px">
      <el-table :key='2' :data="emailTable" style="width: 100%;border:solid 2px #D5D5D5"
                :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700'}" fit border srtipe
                size="mini">
        <el-table-column align="center" width="400" :label="$t('order.emailContact')">
          <template slot-scope="scope">
            <el-row type="flex" justify="start" style="margin: 5px 0" key="add">
              <el-col :span="5" class="clear-col-style emailConfig no-border-right">
                <el-button type="danger" size="mini" @click="isAddingEmail=false" v-if="isAddingEmail">取消
                </el-button>
                <el-button type="success" size="mini" @click="isAddingEmail=true" v-else>新增</el-button>
              </el-col>
              <el-col :span="18" class="clear-col-style emailConfig" v-if="isAddingEmail">
                <el-input v-model.lazy.trim="addedEmail" style="margin-right: 4px"></el-input>
                <el-button type="primary" size="mini" @click="addIntoEmailList">保存</el-button>
              </el-col>
            </el-row>
            <el-row type="flex" justify="start" v-for="(item,index) in emails" style="margin: 5px 0" :key="index">
              <el-col :span="14" class="clear-col-style emailConfig">
                <el-input v-model.lazy="editingEmails[index]" v-if="isEditingEmail[index]"></el-input>
                <el-checkbox :label="item" :key="item" v-else v-model="checkedEmails"/>
              </el-col>
              <el-col :span="10" class="clear-col-style" v-if="isEditingEmail[index]">
                <el-button type="success" size="mini" @click="saveEdit(index)">Save</el-button>
                <el-button type="danger" size="mini" @click="cancelEditEmail(index)">Cancel</el-button>
              </el-col>
              <el-col :span="10" class="clear-col-style" v-else>
                <el-button type="danger" size="mini" style="padding: 3px 8px" icon="el-icon-delete"
                           @click="emails.splice(index,1)"></el-button>
                <el-button type="primary" size="mini" style="padding: 3px 8px" icon="el-icon-edit"
                           @click="editEmail(index)"></el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('order.emailSubject')">
          <template slot-scope="scope">
            {{ order.orderNo || 'xxxx' }} ODO.
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('order.documentPackage')">
          <template slot-scope="scope">
            {{ order.orderNo || "xxxx" }} ODO.ZIP
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('order.document')">
          <template slot-scope="scope">
            {{ order.orderNo || "xxxx" }} ODO.xlsx
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isSendBoxShow = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="send" :disabled="checkedEmails.length === 0">{{$t('order.send')}}</el-button>
      </div>
    </el-dialog>


    <!--预览货单-->
    <!--收货单0-->
    <el-dialog :visible.sync="receiveInvoiceVisible" fullscreen append-to-body center>
      <div id="subOutputRank-print">
        <receiveInvoice></receiveInvoice>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="printContent(0)">打印</el-button>
      </div>
    </el-dialog>
    <!--订货单1-->
    <el-dialog :visible.sync="orderInvoiceVisible" fullscreen append-to-body center>
      <div id="subOutputRank-print">
        <orderInvoice></orderInvoice>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="printContent(1)">打印</el-button>
      </div>
    </el-dialog>
    <!--空运/海运单2-->
    <el-dialog :visible.sync="shipmentInvoiceVisible" fullscreen append-to-body center>
      <p>这里是空运/海运单</p>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="shipmentInvoiceVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!--发票3-->
    <el-dialog :visible.sync="invoiceInvoiceVisible" fullscreen append-to-body center>
      <div id="subOutputRank-print">
        <invoiceInvoice></invoiceInvoice>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="printContent(3)">打印</el-button>
      </div>
    </el-dialog>
    <!--装箱单4-->
    <el-dialog :visible.sync="packageInvoiceVisible" fullscreen append-to-body center>
      <div id="subOutputRank-print">
        <packingInvoice></packingInvoice>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="printContent(4)">打印</el-button>
      </div>
    </el-dialog>
    <!--装箱明细5-->
    <el-dialog :visible.sync="packageDetailInvoiceVisible" fullscreen append-to-body center>
      <div id="subOutputRank-print">
        <packingDetailInvoice></packingDetailInvoice>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="printContent(5)">打印</el-button>
      </div>
    </el-dialog>
    <!--申报单6-->
    <el-dialog :visible.sync="applicationInvoiceVisible" fullscreen append-to-body center>
      <div id="subOutputRank-print">
        <applicationInvoice></applicationInvoice>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="printContent(6)">打印</el-button>
      </div>
    </el-dialog>


    <!--点击去付订金-->
    <el-dialog :visible.sync="payWindowVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">货单号: <span>{{currentRow.orderNo}}</span></div>
      <div style="text-align: center">账户余额: ￥{{accountResidual.toFixed(2)}}</div>
      <div style="text-align: center">支付70%余款: ￥{{deposit30.toFixed(2)}}</div>
      <div style="text-align: center" class="text-muted" v-if="accountResidual<deposit30">提醒：帐户余额不足扣减 ，请先充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="payWindowVisible=false">暂不</el-button>
        <el-button type="primary" v-if="accountResidual>=deposit30" @click="handlePaymentConfirm()">确认支付</el-button>
        <el-button type="primary" v-else @click="goRecharge()">去充值</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="completePaymentVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">货单号<span>{{currentRow.orderNo}}</span>已完成余款支付，当前帐户余额¥<span>{{(accountResidual-deposit30).toFixed(2)}}</span>。可在待备货状态项下『查看货单』。
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="completePaymentVisible=false">知道了</el-button>
      </div>
    </el-dialog>

    <!--充值环节-->
    <el-dialog :visible.sync="rechargeWindowVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center;">账户余额: ￥{{accountResidual.toFixed(2)}}</div>
      <div style="text-align: center;">充值金额:<span
        style="color: red">请充入不少于 ¥ {{(deposit30-accountResidual).toFixed(2)}}</span>
        <el-input v-model.number.lazy="rechargeAmount"></el-input>
      </div>
      <div style="text-align: center" class="text-muted">温馨提示：充值前请确保已绑定的银行卡有足够金额进行充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeWindowVisible=false">暂不</el-button>
        <el-button type="primary" @click="handleRechargeConfirm()">确认充值</el-button>
        <el-button type="primary" @click="handleRechargeFailConfirm()">确认充值(失败)</el-button>
      </div>
    </el-dialog>
    <!--充值成功-->
    <el-dialog :visible.sync="rechargeSuccessVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">已完成充值，当前帐户余额：¥ <span>{{accountResidual.toFixed(2)}}</span>，是否继续完成之前的余款支付？</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeSuccessVisible=false;payWindowVisible=false">否</el-button>
        <el-button type="primary" @click="stayInGoPayDeposit()">是</el-button>
      </div>
    </el-dialog>
    <!--充值失败-->
    <el-dialog :visible.sync="rechargeFailVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">充值金额: ￥ <span>{{Number(rechargeAmount).toFixed(2)}}</span><span
        style="color: red">未完成充值！</span></div>
      <div style="text-align: center" class="text-muted">说明：由于帐户绑定的银行卡余额不足，无法完成此次充值。请先确认银行卡金额充足再充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeFailVisible=false;payWindowVisible=false">暂不</el-button>
        <el-button type="primary" @click="rechargeAgain()">再去充值</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable */

//  import { requestShopCart, cartRemove, createOrder } from "@/api/goods";
  import orderInvoice from "./sevenPage/orderInvoice.vue";
  import receiveInvoice from "./sevenPage/receiveInvoice.vue";
  import invoiceInvoice from "./sevenPage/invoiceInvoice.vue";
  import packingInvoice from "./sevenPage/packingInvoice.vue";
  import packingDetailInvoice from "./sevenPage/packingDetailInvoice.vue";
  import applicationInvoice from "./sevenPage/applicationInvoice.vue";

  const cityOptions = ['收货单', '订货单', '空运/海运单', '发票', '装箱单', '装箱明细', '申报单']

  export default {
    components: {
      orderInvoice,
      receiveInvoice,
      invoiceInvoice,
      packingInvoice,
      packingDetailInvoice,
      applicationInvoice
    },
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    computed: {
      deposit30Amount() {
        let itemOrder_amount = 0
        this.order.orderSubs.forEach((subsItem, index) => {
          itemOrder_amount += subsItem.orderQuantity * subsItem.packingSpecification * subsItem.supplyPrice * 0.3
        })
        let itemReplenish_amount = 0
        this.order.replenishmentList.forEach((replenishItem, index) => {
          if (index === this.order.replenishmentList.length - 1) return false
          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.3
        })
        const deposit30_amount = itemOrder_amount + itemReplenish_amount
        return deposit30_amount
      },
      deposit70Amount() {
        let itemOrder_amount = 0
        this.order.orderSubs.forEach((subsItem, index) => {
          itemOrder_amount += subsItem.orderQuantity * subsItem.packingSpecification * subsItem.supplyPrice * 0.7
        })
        let itemReplenish_amount = 0
        this.order.replenishmentList.forEach((replenishItem, index) => {
          if (index === this.order.replenishmentList.length - 1) return false
          itemReplenish_amount += replenishItem.supplyPrice * replenishItem.replenishmentQuantity * 0.7
        })
        const deposit70_amount = itemOrder_amount + itemReplenish_amount
        return deposit70_amount
      },
      crossCountryAmount() {
        let itemOrder_amount = 0
        this.order.orderSubs.forEach((subsItem, index) => {
          itemOrder_amount += subsItem.supplyPrice * 0.119
        })
        let itemReplenish_amount = 0
        this.order.replenishmentList.forEach((replenishItem, index) => {
          itemReplenish_amount += replenishItem.supplyPrice * 0.119
        })
        const crossCountryAmount = itemOrder_amount + itemReplenish_amount
        return crossCountryAmount
      },
      cartonTotal() {
        let replenishmentQuantityTotal = 0
        this.order.orderSubs.forEach((subsItem, index, arr) => {
          if (index === arr.length - 1) return false
          replenishmentQuantityTotal += subsItem.orderQuantity
        })
        this.order.replenishmentList.forEach((subsItem, index, arr) => {
          if (index === arr.length - 1) return false
          replenishmentQuantityTotal += subsItem.replenishmentQuantity
        })
        return replenishmentQuantityTotal
      }
    },
    data() {
      return {
        list: [],
        replenishmentList: [],
        listLoading: false,
        cartListSelect: [],
        replenishmentListSelect: [],
        addAddressShow: false,
        addTransferAccountShow: false,
        payWay: '1',
        orderQuantityInput: [],
        channelClassifyMap: {
          1: '独立渠道',
//        1: 'DLQD',
          2: '代发渠道',
//        2: 'DFQD',
          3: '分销渠道',
//        3: 'FXQD',
          4: '分销子渠道'
//        4: 'FXZQD'
        },
        completeStockTime: '2018-11-11 14:22:56',
        order: {
          orderNo: 10005,
          refundOrderStatus: 40,
          r_bankAccount: 3674506939865543,
          r_bankName: 'Bank of China',
          r_bankAddress: 'Guangzhou Panyu District',
          paymentAmount: '￥ 3,763.70',
          b_bankAccount: 1456884739665543,
          b_bankName: 'China Construction Bank',
          b_bankAddress: 'Guangzhou Panyu District',
          createTime: new Date(),
          boxCode: 5555,
          paymentStatus: 10,
          description: 'Lancome (LANCOME) air cushion lip oil',
          channelClassify: 1, // retailer categories
          channelNo: 20005, // retailer no
          orderStatus: 50,
          orderMethod: 20,
          consigneeAddress: '23 Jianguomen Avenue, Chaoyang District',
          city: 'Beijing',
          consigneeName: 'Paul Lee',
          consigneeMobile: 13456789454,
          tel: 95338,
          brandEnglishName: 'LANCOM',
          proofImage: 'http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg', // 补款并单表格
          orderSubs: [
            {
              startDiscount: 70,
              orderDiscount: 68,
              goodsNo: 2564645,
              goodsChineseName: '精华保湿',
              specificationChinese: '100 ml',
              packingSpecification: 15,
              orderQuantity: 5,
              orderQuantity_input: 0,
              inventoryQuantity: 200,
              waitingForStock: 0,
              outOfStock: 0,
              supplyCurrencySymbol: '￥ ',
              supplyPrice: 20,
              orderGoodsNum: 10,
              unitPrice: '',
              totalChannelAmount: '',
              shipmentQuantity: 4,
              cartonNo: '046524'
            },
            {
              startDiscount: 70,
              orderDiscount: 68,
              goodsNo: 2564645,
              goodsChineseName: '精华保湿',
              specificationChinese: '100 ml',
              packingSpecification: 15,
              orderQuantity: 5,
              orderQuantity_input: 0,
              inventoryQuantity: 200,
              waitingForStock: 0,
              outOfStock: 0,
              supplyCurrencySymbol: '￥ ',
              supplyPrice: 20,
              orderGoodsNum: 10,
              unitPrice: '',
              totalChannelAmount: '',
              shipmentQuantity: 4,
              cartonNo: '046524'
            },
            {
              startDiscount: 70,
              orderDiscount: 68,
              goodsNo: 8964645,
              goodsChineseName: '保湿润肤',
              specificationChinese: '100 ml',
              packingSpecification: 10,
              orderQuantity: 5,
              orderQuantity_input: 0,
              inventoryQuantity: 10,
              waitingForStock: 0,
              outOfStock: 0,
              supplyCurrencySymbol: '￥ ',
              supplyPrice: 30,
              orderGoodsNum: 20,
              unitPrice: '',
              totalChannelAmount: '',
              shipmentQuantity: 4,
              cartonNo: '048922'
            },
            {
              startDiscount: 70,
              orderDiscount: 68,
              goodsNo: 8964645,
              goodsChineseName: '美白眼霜',
              specificationChinese: '100 ml',
              packingSpecification: 10,
              orderQuantity: 5,
              orderQuantity_input: 0,
              inventoryQuantity: 10,
              waitingForStock: 0,
              outOfStock: 0,
              supplyCurrencySymbol: '￥ ',
              supplyPrice: 30,
              orderGoodsNum: 20,
              unitPrice: '',
              totalChannelAmount: '',
              shipmentQuantity: 4,
              cartonNo: '048922'
            }
          ],
          replenishmentList: [
            {
              startDiscount: 70,
              orderDiscount: 68,
              goodsNo: 7534645,
              goodsChineseName: '美白保湿',
              specificationChinese: '200 ml',
              packingUnit: 12,
              supplyCurrencySymbol: '￥ ',
              supplyPrice: 40,
              unitsReplenishment: 10,
              individualReplenishment: 0,
              iProdQuantity_inventory: 15,
              // unitsQuantities: [24, 28, 36, 40, 48],
              unitsQuantities: [
                [ // 一个数组为一行，一行最多放三个数据
                  { unit: 24, inventory: 200 },
                  { unit: 28, inventory: 210 },
                  { unit: 36, inventory: 220 }
                ],
                [ // 一个数组为一行，一行最多放三个数据
                  { unit: 40, inventory: 230 },
                  { unit: 48, inventory: 240 }
                ]
              ],
              isAddedRow: false,
              replenishmentQuantity: 36,
              replenishmentQuantity_input: 0,
              shipmentQuantity: 1,
              cartonNo: '043524',
              packingSpecification: 24
            }
          ],
          shipmentStatus: 50,
          refundType: 100,
          refundAmount: 274,
          compensationType: 10,
          compensation: 240,
          compensationStatus: 10,
          mergePaymentNo: 857938502482
        },
        isCancelOrder: false,
        cancelOrderVisible: false,
        cancelOrderSubmitVisible: false,
        payWindowVisible: false,
        accountResidual: 100,
        deposit30: 2232,
        completePaymentVisible: false,
        rechargeWindowVisible: false,
        rechargeAmount: 0,
        rechargeSuccessVisible: false,
        rechargeFailVisible: false,
        tableHeight: 0,
        rowLength: 0,
        // 发送货单多选框
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        isSendBoxShow: false,
        checkedEmails: [],
        emails: ['abc@abc.com', 'qwe@qwe.com', 'asd@asd.com'],
        editingEmails: ['abc@abc.com', 'qwe@qwe.com', 'asd@asd.com'],
        emailTable: [{ contacts: [], emailSubject: '', document: '' }],
        addedEmail: null,
        isAddingEmail: false,
        isEditingEmail: [false, false, false, false, false, false, false, false],
        receiveInvoiceVisible: false,
        orderInvoiceVisible: false,
        shipmentInvoiceVisible: false,
        invoiceInvoiceVisible: false,
        packageInvoiceVisible: false,
        packageDetailInvoiceVisible: false,
        applicationInvoiceVisible: false,
      }
    },
    methods: {
      handleCartListSelect(val) {
        this.cartListSelect = val
      },
      handleReplenishmentListSelect(val) {

      },
      addAddress() {
        this.addAddressShow = true;
      },

      handleSubmit() {
        let param = {}
      },
      getList() {
//        requestShopCart().then(res => {
//          this.list = res.data
//        })
      },
      removeAction(cartId, index) {
        // cartRemove(cartId).then(res => {
        //   if (res.errorCode == 0) {
        //     this.list.splice(index, 1)
        //   }
        // })
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.order.replenishmentList.length - 1) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 5
            }
          }
          else if (columnIndex < 5 && columnIndex > 0) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          else if (columnIndex === 7) {
            return {
              rowspan: 1,
              colspan: 3
            }
          }
          else if (columnIndex > 7 && columnIndex < 10) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
      },
      cancelOrderProcess() {
        this.cancelOrderVisible = true
      },
      handleConfirm() {
        this.isCancelOrder = true
        this.cancelOrderVisible = false
        this.cancelOrderSubmitVisible = true
      },
      handlePaymentConfirm() {
        this.completePaymentVisible = true
        this.payWindowVisible = false
      },
      goRecharge() {
        this.rechargeWindowVisible = true
      },
      handleRechargeConfirm() {
        this.accountResidual += this.rechargeAmount
        this.rechargeSuccessVisible = true
        this.rechargeWindowVisible = false
      },
      handleRechargeFailConfirm() {
        this.accountResidual += this.rechargeAmount
        this.rechargeFailVisible = true
        this.rechargeWindowVisible = false
      },
      stayInGoPayDeposit() {
        this.rechargeSuccessVisible = false
        this.payWindowVisible = true
      },
      rechargeAgain() {
        this.rechargeAmount = 0
        this.deposit30 = 2232
        this.accountResidual = 100
        this.rechargeFailVisible = true
        this.rechargeWindowVisible = true
      },
      goPayDeposit() {
        this.payWindowVisible = true
      },
      // 发送货单多选框
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      viewEmailChoosing() {
        this.isSendBoxShow = true
        if (window.localStorage.getItem('isPrintReload') && Number(window.localStorage.getItem('printingIndex')) >= 0) {
          this.checkedEmails = window.localStorage.getItem('alreadyCheckedEmails')
        }
      },
      send() {
        const vm = this
        this.isSendBoxShow = false
//        this.$alert(this.$t('order.sendODOSuccess'), '', {
//          confirmButtonText: this.$t('table.confirm'),
//          showClose: false,
//          callback() {
//            vm.$emit('close')
//          }
//        })
        this.$notify({
          title: '发送成功',
          message: this.$t('order.sendODOSuccess'),
          duration: 3000,
          type: 'success'
        })
      },
      addIntoEmailList() {
        if (!this.addedEmail) return false
        this.emails.push(this.addedEmail)
        this.addedEmail = null
        this.isAddingEmail = false
      },
      editEmail(index) {
        this.$set(this.isEditingEmail, index, true)
      },
      cancelEditEmail(index) {
        this.$set(this.isEditingEmail, index, false)
      },
      saveEdit(index) {
        this.$set(this.isEditingEmail, index, false)
        this.emails = this.editingEmails
      },
      // 预览单据
      previewInvoice(city) {
        switch (city) {
          case '收货单':
            this.receiveInvoiceVisible = true;
            break;
          case '订货单':
            this.orderInvoiceVisible = true;
            break;
          case '空运/海运单':
            this.shipmentInvoiceVisible = true;
            break;
          case '发票':
            this.invoiceInvoiceVisible = true;
            break;
          case '装箱单':
            this.packageInvoiceVisible = true;
            break;
          case '装箱明细':
            this.packageDetailInvoiceVisible = true;
            break;
          case '申报单':
            this.applicationInvoiceVisible = true;
            break;
        }
      },
      printContent(index) {
        window.localStorage.setItem('printingIndex', index)
        window.localStorage.setItem('isPrintReload', true)
        window.localStorage.setItem('alreadyCheckedInvoice', this.checkedCities)
        window.localStorage.setItem('alreadyCheckedEmails', this.checkedEmails)
        let subOutputRankPrint = document.getElementById('subOutputRank-print');
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      this.order.orderSubs.push({
        startDiscount: 70,
        orderDiscount: 68,
        goodsNo: 2564645,
        goodsChineseName: '精华保湿',
        specificationChinese: '100 ml',
        packingSpecification: 15,
        orderQuantity: 5,
        orderQuantity_input: 0,
        inventoryQuantity: 200,
        waitingForStock: 0,
        outOfStock: 0,
        supplyCurrencySymbol: '￥ ',
        supplyPrice: 20,
        orderGoodsNum: 10,
        unitPrice: '',
        totalChannelAmount: '',
        shipmentQuantity: 4,
        cartonNo: '046524'
      },)
      this.order.replenishmentList.push({
        startDiscount: 70,
        orderDiscount: 68,
        goodsNo: 7534645,
        goodsChineseName: '美白保湿',
        specificationChinese: '200 ml',
        packingUnit: 12,
        supplyCurrencySymbol: '￥ ',
        supplyPrice: 40,
        unitsReplenishment: 10,
        individualReplenishment: 0,
        iProdQuantity_inventory: 15,
        // unitsQuantities: [24, 28, 36, 40, 48],
        unitsQuantities: [
          [ // 一个数组为一行，一行最多放三个数据
            { unit: 24, inventory: 200 },
            { unit: 28, inventory: 210 },
            { unit: 36, inventory: 220 }
          ],
          [ // 一个数组为一行，一行最多放三个数据
            { unit: 40, inventory: 230 },
            { unit: 48, inventory: 240 }
          ]
        ],
        isAddedRow: false,
        replenishmentQuantity: 36,
        replenishmentQuantity_input: 0,
        shipmentQuantity: 1,
        cartonNo: '043524',
        packingSpecification: 24
      })

      window.setTimeout(() => {
//        this.$refs['sumTable'].$el.children[3].children['0'].children[1].children['0'].cells[3].children['0'].innerHTML = `<div style="display: flex;justify-content: flex-end"><span>合计:</span></div>`

        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'].$el.offsetHeight

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth + window.document.getElementsByClassName('brand-col')[0].offsetWidth

        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[0].style.textAlign = 'left'
        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[1].style.textAlign = 'right'
        this.$refs['replenishmentTable'].$el.children[2].children[0].children[1].children[this.order.replenishmentList.length - 1].cells[3].style.textAlign = 'right'

        this.$nextTick(() => {
          if (window.localStorage.getItem('isPrintReload') && Number(window.localStorage.getItem('printingIndex')) >= 0) {
//            switch (Number(window.localStorage.getItem('printingIndex'))) {
//              case 0:
//                this.receiveInvoiceVisible = true;
//                break;
//              case 1:
//                this.orderInvoiceVisible = true;
//                break;
//              case '空运/海运单':
//                this.shipmentInvoiceVisible = true;
//                break;
//              case 3:
//                this.invoiceInvoiceVisible = true;
//                break;
//              case 4:
//                this.packageInvoiceVisible = true;
//                break;
//              case 5:
//                this.packageDetailInvoiceVisible = true;
//                break;
//              case 6:
//                this.applicationInvoiceVisible = true;
//                break;
//            }
            window.localStorage.setItem('isPrintReload', false)
            window.localStorage.setItem('printingIndex', null)
            this.checkedCities = window.localStorage.getItem('alreadyCheckedInvoice').split(",")
          }
        })
      }, 100)

    }
  }
</script>

<style scoped lang="scss">

  .col-head {
    background: rgb(223, 242, 252);
    color: rgb(66, 66, 66);
    font-weight: 700;
    font-size: 12px;
    line-height: 36px;
    text-align: center;
    width: 100px;
  }

  .col-content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: rgb(66, 66, 66);
    width: 100px;
  }

  .orderTable .el-col {
    border-right: none;
  }

  .invoice-chooseing-wrap {
    margin: 5px 0;
    border: 1px solid #409EFF;
    border-radius: 5px;
    padding: 5px;
  }

  /*邮件的样式对齐问题*/
  .emailConfig {
    justify-content: flex-start !important;

  &
  .el-input {
    margin-right: 10px;
  }

  }
  /*清除一些el-col的自定义默认样式*/
  .clear-col-style {
    background-color: transparent !important;
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
  & .el-row {
      border-bottom: solid #d5d5d5 1px;
      margin-bottom: 0;
    & .el-col:nth-child(even) {
    padding-left: 1em;
      }
    }
  }
  .units-wrap .el-col {
    border: none!important;
    background-color: transparent;
    font-weight: normal;
  }
  .units-wrap .el-input--medium .el-input__inner {
    height: 24px;
    line-height: 24px;
    max-width: 40px;
  }
</style>
