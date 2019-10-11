<template>
  <div class="app-container">
    <h2 :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">待收货</h2>
    <div class="mainContent">
      <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">货单号:</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ orderDetail.orderNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">渠道号:</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ orderDetail.channelNo }}</div>
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
            <el-col :span="3">
              <div class="grid-content bg-purple">受益人账户</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">收款名称</div>
            </el-col>
            <el-col :span="4">
            <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">收款地址</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple"></div>
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
          <el-row>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">汇款人账户</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="3" align="center">
              <div class="grid-content bg-purple">汇款名称</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="2" align="center">
              <div class="grid-content bg-purple">汇款地址</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple"></div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div style="display: flex">
        <!--<div class="brand-col">-->
        <!--<div class="col-head border-bottom" style="border-left: 2px solid #d5d5d5">商品品牌</div>-->
        <!--<div class="col-content"-->
        <!--:style="{height: tableHeight-37+'px', borderLeft: '2px solid #d5d5d5', borderBottom: '2px solid #d5d5d5'}">-->
        <!--<span>AESOP</span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="twoTable-wrap" style="padding-right: 20px">
          <!--订货表格-->
          <div class="filter-container" style="padding-bottom: 0">
            <el-table
              key="productList"
              :data="orderDetail.goodList || []"
              border
              fit
              size="mini"
              style="width: 100%;border:none;border-left: 1px solid #d5d5d5;border-right: 1px solid #d5d5d5"
              class="orderTable"
              ref="orderTable"
              :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',height: '36px'}"
            >
              <el-table-column
                align="center"
                width="85"
                label="商品品牌"
                prop="brandName"
              />
              <el-table-column
                align="center"
                width="85"
                :label="$t('product.productNo')"
                prop="goodsNo"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.goodsNoForBrand }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="130"
                :label="$t('product.productName')"
                prop="goodsName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                align="center"
                width="90"
                :label="$t('product.productSpecification')"
                prop="specificationChinese"
                show-overflow-tooltip
              />
              <el-table-column
                align="center"
                width="220"
                class-name="units-wrap"
                :label="$t('order.packageSpecification')"
                prop="packingSpecification"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.packingSpecification.replace(/[^0-9]/ig,"")}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.packingSpecification.replace(/\d+/g, '')}}</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
                <template slot-scope="scope">
                  <span>￥{{scope.row.unitPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="120"
                class-name="units-wrap"
                :label="$t('order.orderQuantity')"
              >
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>{{scope.row.orderBoxNum}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>箱</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>

              <el-table-column align="center" width="140" :label="$t('price.startDiscount')">
                <template slot-scope="scope">
                  <span>{{scope.row.initialDiscount}}%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" :label="$t('price.orderDiscount')">
                <template slot-scope="scope">
                  <span>{{scope.row.finalDiscount}}%</span>
                </template>
              </el-table-column>

              <el-table-column
                align="center"
                width="140"
                :label="$t('price.orderUnitPrice')"
              >
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.unitPrice * scope.row.finalDiscount/100).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="140"
                :label="$t('order.orderAmount')"
              >
                <template slot-scope="scope">
                  <span>￥ {{scope.row.orderPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :label="$t('order.thirtyPercentDeposit')"
                width="130"
              >
                <template slot-scope="scope">
                  <span>￥ {{scope.row.earnestAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                <template slot-scope="scope">
                  <span>￥ {{ scope.row.surplusAmount }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--合计表格-->
          <div class="filter-container" style="padding-bottom: 0">
            <el-table key='replenishment' :data="replenishmentList" border fit
                      size="mini"
                      style="width: 100%;border: 1px solid #d5d5d5;border-left-width: 2px;border-top:none;"
                      class="orderTable" ref="replenishmentTable"
                      :show-header="haveReplenishment"
                      :span-method="arraySpanMethod"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">

              <el-table-column
                align="center"
                width="85"
                label="商品品牌"
                prop="brandName"
              />
              <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
                <template slot-scope="scope">
                  <div v-if="scope.$index===replenishmentList.length-1" class="text-muted">
                    <span v-if="orderDetail.receiveStatus==1">国外出库时间: {{ orderDetail.externalOutboundTime }}</span>
                    <span v-else-if="orderDetail.receiveStatus==2">国内收货时间: {{ orderDetail.domesticReceiveTime }}</span>
                    <span v-else-if="orderDetail.receiveStatus==3">国内发货时间: {{ orderDetail.domesticShipmentTime }}</span>
                  </div>
                  <div v-else>{{ scope.row.goodsNo }}</div>
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
              <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
                <template slot-scope="scope">
                  <span v-if="scope.$index===replenishmentList.length-1">{{ '合计: ' }}</span>
                  <span v-else>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="120" class-name="units-wrap"
                               :label="$t('order.replenishmentQuantity')">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span v-if="scope.$index===replenishmentList.length-1"
                            style="color:gray">{{ orderBoxNumTotal }}</span>
                      <span v-else style="color:gray">{{ scope.row.replenishmentQuantity }}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>箱</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" :label="$t('price.startDiscount')">
                <template slot-scope="scope">
                  <span v-if="scope.$index===replenishmentList.length-1"
                        class="text-total">{{ '（待收货）已付货款: ' }}</span>
                  <span v-else>{{ scope.row.startDiscount }}%</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" :label="$t('price.orderDiscount')">
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
                  <span class="text-total" v-if="scope.$index===replenishmentList.length-1">￥ {{ currentRow.total_channel_amount }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                <template slot-scope="scope">
                  <span class="text-total" v-if="scope.$index === replenishmentList.length-1">￥ {{ currentRow.total_earnest_amount }}</span>
                  <span v-else>￥ {{ scope.row.total_earnest_amount }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                <template slot-scope="scope">
                  <span class="text-total" v-if="scope.$index === replenishmentList.length-1">￥ {{ currentRow.total_surplus_amount }}</span>
                  <span v-else>￥ {{ scope.row.total_surplus_amount }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--显示物流信息-->
          <div class="filter-container" v-if="orderDetail.receiveStatus==3">
            <el-table key='logistic' :data="replenishmentList" border fit size="mini"
                      style="width: 100%;border: 1px solid #d5d5d5;border-left-width: 2px;border-top:none;"
                      class="orderTable" ref="logisticTable"
                      :show-header="haveReplenishment"
                      :span-method="logisArraySpanMethod"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
              <el-table-column
                align="center"
                width="85"
                label="商品品牌"
                prop="brandName"
              />
              <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo" class-name="fake-table-head">
                <template slot-scope="scope">
                  <div v-if="scope.$index===replenishmentList.length-1">
                    物流公司
                  </div>
                </template>
              </el-table-column>

              <el-table-column align="left" width="130" :label="$t('product.productName')" prop="goodsChineseName"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  顺丰
                </template>
              </el-table-column>

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
              <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
                <template slot-scope="scope">
                  <span v-if="scope.$index===replenishmentList.length-1">{{ '合计: ' }}</span>
                  <span v-else>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="120" class-name="fake-table-head"
                               :label="$t('order.replenishmentQuantity')">
                <template slot-scope="scope">
                  物流单号
                </template>
              </el-table-column>
              <el-table-column align="center" width="140" :label="$t('price.startDiscount')">
                <template slot-scope="scope">
                  <span v-if="scope.$index===replenishmentList.length-1"
                        class="text-total">{{ '（待收货）已付货款: ' }}</span>
                  <span v-else>{{ scope.row.startDiscount }}%</span>
                </template>
              </el-table-column>
              <el-table-column align="left" width="140" :label="$t('price.orderDiscount')">
                <template slot-scope="scope">
                  1234
                </template>
              </el-table-column>
              <el-table-column width="140" align="center" :label="$t('price.orderUnitPrice')">
                <template slot-scope="scope">
                  <span>￥ {{ (scope.row.supplyPrice * scope.row.packingUnit).toFixed(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
                <template slot-scope="scope">
                  <span class="text-total" v-if="scope.$index===replenishmentList.length-1">￥ {{ currentRow.total_channel_amount }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                <template slot-scope="scope">
                  <span class="text-total" v-if="scope.$index === replenishmentList.length-1">￥ {{ currentRow.total_earnest_amount }}</span>
                  <span v-else>￥ {{ scope.row.total_earnest_amount }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                <template slot-scope="scope">
                  <span class="text-total" v-if="scope.$index === replenishmentList.length-1">￥ {{ currentRow.total_surplus_amount }}</span>
                  <span v-else>￥ {{ scope.row.total_surplus_amount }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>


          <div style="display: flex;justify-content: center;" v-if="orderDetail.receiveStatus==3">
            <el-button class="filter-item" type="primary" @click="viewReceiveInvoice()" style="width: 120px">查看货单</el-button>
            <!--<el-button class="filter-item" type="primary" @click="viewEmailChoosing()" style="width: 120px">发送货单</el-button>-->
          </div>
          <!--<div style="display: flex;justify-content: flex-end" v-if="orderDetail.receiveStatus==3">-->
            <!--<div class="invoice-chooseing-wrap">-->
              <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选-->
              <!--</el-checkbox>-->
              <!--<div style="margin: 15px 0;"></div>-->
              <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
                <!--<el-checkbox v-for="city in cities" :label="city" :key="city">-->
                  <!--{{city}}-->
                  <!--<el-button type="primary" size="mini" @click="previewInvoice(city)"-->
                             <!--style="margin-left: 5px;width: 3em;padding: 0">{{ '预览' }}-->
                  <!--</el-button>-->
                <!--</el-checkbox>-->
              <!--</el-checkbox-group>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>

    <!--预览货单-->
    <!--收货单0-->
    <el-dialog :visible.sync="receiveInvoiceVisible" fullscreen style="padding: 20px" append-to-body center>
      <div id="subOutputRank-print">
        <receiveInvoice :currentRow="currentRow" :orderDetail="orderDetail"></receiveInvoice>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <!--<el-button type="primary" @click="printContent(0)">打印</el-button>-->
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


    <el-dialog :visible.sync="isSendBoxShow" append-to-body fullscreen style="padding: 20px">
      <sendEmail v-if="isSendBoxShow" :currentRow="currentRow" @cancelSending="isSendBoxShow = false"></sendEmail>
    </el-dialog>

  </div>
</template>

<script>
  /* eslint-disable */

  import { requestShopCart, cartRemove, createOrder } from "@/api/goods";
  import request from "@/utils/request";

  import orderInvoice from "./sevenPage/orderInvoice.vue";
  import receiveInvoice from "./sevenPage/receiveInvoice.vue";
  import invoiceInvoice from "./sevenPage/invoiceInvoice.vue";
  import packingInvoice from "./sevenPage/packingInvoice.vue";
  import packingDetailInvoice from "./sevenPage/packingDetailInvoice.vue";
  import applicationInvoice from "./sevenPage/applicationInvoice.vue";
  import sendEmail from "./sendEmail.vue";

  const cityOptions = ['收货单', '订货单', '空运/海运单', '发票', '装箱单', '装箱明细', '申报单']

  export default {
    components: {
      orderInvoice,
      receiveInvoice,
      invoiceInvoice,
      packingInvoice,
      packingDetailInvoice,
      applicationInvoice,
      sendEmail
    },
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    computed: {},
    data() {
      return {
        orderDetail: {}, // 存放订货表格数据
        list: [],
        replenishmentList: [
          {
            startDiscount: 70,
            orderDiscount: 68,
            goodsNo: 7534645,
            goodsChineseName: "美白保湿",
            specificationChinese: "200 ml",
            packingUnit: 12,
            supplyCurrencySymbol: "￥ ",
            supplyPrice: 40,
            unitsReplenishment: 10,
            individualReplenishment: 0,
            iProdQuantity_inventory: 15,
            // unitsQuantities: [24, 28, 36, 40, 48],
            unitsQuantities: [
              [
                // 一个数组为一行，一行最多放三个数据
                { unit: 24, inventory: 200 },
                { unit: 28, inventory: 210 },
                { unit: 36, inventory: 220 }
              ],
              [
                // 一个数组为一行，一行最多放三个数据
                { unit: 40, inventory: 230 },
                { unit: 48, inventory: 240 }
              ]
            ],
            isAddedRow: false,
            replenishmentQuantity: 36,
            replenishmentQuantity_input: 0,
            shipmentQuantity: 1,
            cartonNo: "043524",
            packingSpecification: 24
          },
        ],
        haveReplenishment: false,
        orderBoxNumTotal: 0,
        listLoading: false,
        cartListSelect: [],
        replenishmentListSelect: [],
        addTransferAccountShow: false,
        payWay: '1',
        orderQuantityInput: [],
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
        tableHeight: 0,
        rowLength: 0,
        // 发送货单多选框
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        isSendBoxShow: false,
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
      getList() {
        this.listLoading = true
        request({
          url: "/order/orderDetail.do",
          method: "post",
          data: { orderNo: this.currentRow.order_no }
        }).then(res => {
          this.orderDetail = res.data;
          this.orderDetail.goodList.forEach((item, index, arr) => {
            this.orderBoxNumTotal += item.orderBoxNum
          })
          this.listLoading = false
        });
      },
      handleCartListSelect(val) {
        this.cartListSelect = val
      },
      handleReplenishmentListSelect(val) {

      },

      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.replenishmentList.length - 1) {
          if (columnIndex === 0) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          else if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 6
            }
          }
          else if (columnIndex === 6) {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
          else if (columnIndex === 7) {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
          else if (columnIndex === 8) {
            return {
              rowspan: 1,
              colspan: 3
            }
          }
          else if (columnIndex >= 11) {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
          else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      logisArraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == this.replenishmentList.length - 1) {
          if (columnIndex == 1) {
            return {
              rowspan: 1,
              colspan: 2
            }
          }
          else if (columnIndex == 2) {
            return {
              rowspan: 1,
              colspan: 5
            }
          }
          else if (columnIndex === 7) {
            return {
              rowspan: 1,
              colspan: 2
            }
          }
          else if (columnIndex === 9) {
            return {
              rowspan: 1,
              colspan: 5
            }
          }
          else {
            return {
              rowspan: 0,
              colspan: 0
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
      },
      // 看收货单详情
      viewReceiveInvoice() {
        this.receiveInvoiceVisible = true;
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

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth

        this.$refs["replenishmentTable"].$el.children[1].children["0"].children[1].children["0"].cells["0"].style.textAlign = 'left'
        this.$refs["replenishmentTable"].$el.children[1].children["0"].children[1].children["0"].cells[3].style.textAlign = 'right'

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

<style scoped>

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
</style>
