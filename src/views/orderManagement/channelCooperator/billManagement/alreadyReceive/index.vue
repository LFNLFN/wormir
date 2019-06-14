<template>
  <div class="app-container">
    <div v-if="currentRow.order_status==200">
      <h2 :style="{textAlign: 'center', width: rowLength+'px'}">渠道收货</h2>
      <div class="mainContent">
        <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
          <el-row>
            <el-col :span="3">
              <div class="grid-content bg-purple">货单号:</div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">{{ currentRow.order_no }}</div>
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
              <el-col :span="3" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">收款SWFIT Code</div>
              </el-col>
              <el-col :span="3" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">453566787469</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">收款银行</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">中国农业银行</div>
              </el-col>
              <el-col :span="2" align="center">
                <div class="grid-content bg-purple">银行地址</div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple">广州市天河区石牌桥</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3" align="center" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">汇款SWFIT Code</div>
              </el-col>
              <el-col :span="3" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">{{orderDetail.bankSwift}}</div>
              </el-col>
              <el-col :span="3" align="center">
                <div class="grid-content bg-purple">汇款银行</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">{{orderDetail.bankName}}</div>
              </el-col>
              <el-col :span="2" align="center">
                <div class="grid-content bg-purple">银行地址</div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple">{{orderDetail.bankAddress}}</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div style="display: flex">
          <div class="twoTable-wrap" style="padding-right: 20px">
            <!--订货表格-->
            <div class="filter-container" style="padding-bottom: 0">
              <el-table
                key="productList"
                :data="orderDetail.goodList || []"
                border
                fit
                size="mini"
                style="width: 100%;border:none;border-left: 2px solid #d5d5d5;border-right: 1px solid #d5d5d5"
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
            <!--补货表格-->
            <div class="filter-container" style="padding-bottom: 0">
              <el-table key='replenishment' :data="order.replenishmentList" border fit
                        size="mini"
                        style="width: 100%;border: 1px solid #d5d5d5;border-top:none;border-bottom:none;border-left-width: 2px"
                        :span-method="arraySpanMethod"
                        class="orderTable" ref="replenishmentTable"
                        :show-header="haveReplenishment"
                        :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
                <el-table-column
                  align="center"
                  width="85"
                  label="商品品牌"
                  prop="brandName"
                />
                <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo" />
                <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName" show-overflow-tooltip/>
                <el-table-column align="center" width="90" :label="$t('product.productSpecification')" prop="specificationChinese" show-overflow-tooltip/>
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
                <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')" />
                <el-table-column align="center" width="120" class-name="units-wrap" :label="$t('order.replenishmentQuantity')" />
                <el-table-column align="center" width="140" :label="$t('price.startDiscount')" />
                <el-table-column align="center" width="140" :label="$t('price.orderDiscount')" />
                <el-table-column width="140" align="center" :label="$t('price.orderUnitPrice')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">合计：</span>
                  </template>
                </el-table-column>
                <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">{{ currentRow.total_channel_amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">￥ {{ currentRow.total_earnest_amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">￥ {{ currentRow.total_surplus_amount }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!--问题表格-->
            <div class="filter-container" style="padding-bottom: 0;display: flex">
              <div :style="{width: tableWidth + 'px'}">
                <h4 style="text-align: center;margin: 0" class="border-left2 border-right2 border-bottom">问题商品（国内收货）</h4>
                <el-table :key='2' :data="domesticReceiveProblematicList" border fit ref="problematicTable"
                          v-loading="listLoading" element-loading-text="给我一点时间"
                          size="mini" style="width: 100%;border-left-width: 2px;border-bottom: none" class="orderTable no-border-top"
                          :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',padding:0}">
                  <el-table-column align="center" :label="$t('order.defectiveProduct')">
                    <el-table-column align="center" min-width="200" label="商品编号"
                                     prop="defectiveCode"></el-table-column>
                    <el-table-column align="center" min-width="200" label="商品名称"
                                     prop="defectiveName"></el-table-column>
                  </el-table-column>
                  <el-table-column align="center" :render-header="renderHeader" prop="defeTotal">
                    <el-table-column align="center" :label="$t('order.quantity')" prop="defectiveNum" min-width="100" />
                  </el-table-column>


                  <el-table-column align="center" :label="$t('order.damagedProduct')">
                    <el-table-column align="center" min-width="200" label="商品编号" prop="damageCode"/>
                    <el-table-column align="center" min-width="200" label="商品名称" prop="damageName"/>
                  </el-table-column>
                  </el-table-column>

                  <el-table-column align="center" :render-header="renderHeader" prop="damaTotal">
                    <el-table-column align="center" :label="$t('order.quantity')" prop="damageNum" min-width="100"/>
                  </el-table-column>

                  <el-table-column align="center" :label="$t('order.lessCargoProduct')">
                    <el-table-column align="center" min-width="200" label="商品编号" prop="lessCargoCode"/>
                    <el-table-column align="center" min-width="200" label="商品名称" prop="lessCargoName"/>
                  </el-table-column>

                  <el-table-column align="center" :render-header="renderHeader" prop="lessTotal">
                    <el-table-column align="center" :label="$t('order.quantity')" prop="lessCargoNum" min-width="100"/>
                  </el-table-column>

                </el-table>
              </div>
            </div>

            <div class="filter-container" style="padding-bottom: 0;display: flex">
              <div :style="{width: tableWidth + 'px'}">
                <h4 style="text-align: center;margin: 0" class="border-left2 border-right2 border-bottom">问题商品（渠道收货）</h4>
                <el-table :key='3' :data="channelReceiveProblematicList" border fit ref="problematicTable1"
                          v-loading="listLoading" element-loading-text="给我一点时间"
                          size="mini" style="width: 100%;border-left-width: 2px" class="orderTable no-border-top"
                          :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',padding:0}">
                  <!--<el-table-column align="center" :label="$t('order.defectiveProduct')">-->
                  <!--<el-table-column align="center" min-width="200" label="商品编号" prop="defectiveCode"/>-->
                  <!--<el-table-column align="center" min-width="200" label="商品名称" prop="defectiveName"/>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column align="center" :render-header="renderHeader" prop="defeTotal">-->
                  <!--<el-table-column align="center" :label="$t('order.quantity')" prop="defectiveNum" min-width="100"/>-->
                  <!--</el-table-column>-->


                  <el-table-column align="center" :label="$t('order.damagedProduct')">
                    <el-table-column align="center" min-width="200" label="商品编号" prop="damageCode"/>
                    <el-table-column align="center" min-width="200" label="商品名称" prop="damageName"/>
                  </el-table-column>
                  </el-table-column>

                  <el-table-column align="center" :render-header="renderHeader" prop="damaTotal">
                    <el-table-column align="center" :label="$t('order.quantity')" prop="damageNum" min-width="100"/>
                  </el-table-column>

                  <el-table-column align="center" :label="$t('order.lessCargoProduct')">
                    <el-table-column align="center" min-width="200" label="商品编号" prop="lessCargoCode"/>
                    <el-table-column align="center" min-width="200" label="商品名称" prop="lessCargoName"/>
                  </el-table-column>

                  <el-table-column align="center" :render-header="renderHeader" prop="lessTotal">
                    <el-table-column align="center" :label="$t('order.quantity')" prop="lessCargoNum" min-width="100"/>
                  </el-table-column>

                </el-table>
                <div class="time-list" style="margin: 1em 0">
                  <el-popover
                    placement="right" title="" width="280" trigger="click"
                  >
                    <div>
                      <p>{{'提交订单时间：' + orderDetail.orderCreateTime}}</p>
                      <p>{{'支付订金时间：' + orderDetail.payEarnestTime}}</p>
                      <p>{{'完成备货时间：' + orderDetail.completeStockUpTime}}</p>
                      <p>{{'支付余款时间：' + orderDetail.paySurplusTime}}</p>
                      <p>{{'国外出库时间：' + orderDetail.externalOutboundTime}}</p>
                      <p>{{'国内收货时间：' + orderDetail.domesticReceiveTime}}</p>
                      <p>{{'国内发货时间：' + orderDetail.domesticShipmentTime}}</p>
                      <p>{{'渠道收货时间：' + orderDetail.completeOrderTime}}；{{'收货人电话：' + orderDetail.tel}}</p>
                    </div>
                    <el-button slot="reference" type="primary">操作时间记录</el-button>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentRow.order_status==210">
      <h2 :style="{textAlign: 'center', width: rowLength+'px'}">国内收货</h2>
      <div class="mainContent">
        <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
          <el-row>
            <el-col :span="3">
              <div class="grid-content bg-purple">货单号:</div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">{{ currentRow.order_no }}</div>
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
              <el-col :span="3" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">收款SWFIT Code</div>
              </el-col>
              <el-col :span="3" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">453566787469</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">收款银行</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">中国农业银行</div>
              </el-col>
              <el-col :span="2" align="center">
                <div class="grid-content bg-purple">银行地址</div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple">广州市天河区石牌桥</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3" align="center" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">汇款SWFIT Code</div>
              </el-col>
              <el-col :span="3" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">{{orderDetail.bankSwift}}</div>
              </el-col>
              <el-col :span="3" align="center">
                <div class="grid-content bg-purple">汇款银行</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">{{orderDetail.bankName}}</div>
              </el-col>
              <el-col :span="2" align="center">
                <div class="grid-content bg-purple">银行地址</div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple">{{orderDetail.bankAddress}}</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div style="display: flex">
          <div class="twoTable-wrap" style="padding-right: 20px">
            <!--订货表格-->
            <div class="filter-container" style="padding-bottom: 0">
              <el-table
                key="productList"
                :data="orderDetail.goodList || []"
                border
                fit
                size="mini"
                style="width: 100%;border:none;border-left: 2px solid #d5d5d5;border-right: 1px solid #d5d5d5"
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
            <!--补货表格-->
            <div class="filter-container" style="padding-bottom: 0">
              <el-table key='replenishment' :data="order.replenishmentList" border fit
                        size="mini"
                        style="width: 100%;border: 1px solid #d5d5d5;border-top:none;border-bottom:none;border-left-width: 2px"
                        :span-method="arraySpanMethod"
                        class="orderTable" ref="replenishmentTable"
                        :show-header="haveReplenishment"
                        :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
                <el-table-column
                  align="center"
                  width="85"
                  label="商品品牌"
                  prop="brandName"
                />
                <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo" />
                <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName" show-overflow-tooltip/>
                <el-table-column align="center" width="90" :label="$t('product.productSpecification')" prop="specificationChinese" show-overflow-tooltip/>
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
                <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')" />
                <el-table-column align="center" width="120" class-name="units-wrap" :label="$t('order.replenishmentQuantity')" />
                <el-table-column align="center" width="140" :label="$t('price.startDiscount')" />
                <el-table-column align="center" width="140" :label="$t('price.orderDiscount')" />
                <el-table-column width="140" align="center" :label="$t('price.orderUnitPrice')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">合计：</span>
                  </template>
                </el-table-column>
                <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">{{ currentRow.total_channel_amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">￥ {{ currentRow.total_earnest_amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">￥ {{ currentRow.total_surplus_amount }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!--问题表格-->
            <div class="filter-container" style="padding-bottom: 0;display: flex">
              <div :style="{width: tableWidth + 'px'}">
                <h4 style="text-align: center;margin: 0" class="border-left2 border-right2 border-bottom">问题商品（国内收货）</h4>
                <el-table :key='2' :data="domesticReceiveProblematicList" border fit ref="problematicTable"
                          v-loading="listLoading" element-loading-text="给我一点时间"
                          size="mini" style="width: 100%;border-left-width: 2px;border-bottom: none" class="orderTable no-border-top"
                          :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',padding:0}">
                  <el-table-column align="center" :label="$t('order.defectiveProduct')">
                    <el-table-column align="center" min-width="200" label="商品编号"
                                     prop="defectiveCode"></el-table-column>
                    <el-table-column align="center" min-width="200" label="商品名称"
                                     prop="defectiveName"></el-table-column>
                  </el-table-column>
                  <el-table-column align="center" :render-header="renderHeader" prop="defeTotal">
                    <el-table-column align="center" :label="$t('order.quantity')" prop="defectiveNum" min-width="100" />
                  </el-table-column>


                  <el-table-column align="center" :label="$t('order.damagedProduct')">
                    <el-table-column align="center" min-width="200" label="商品编号" prop="damageCode"/>
                    <el-table-column align="center" min-width="200" label="商品名称" prop="damageName"/>
                  </el-table-column>
                  </el-table-column>

                  <el-table-column align="center" :render-header="renderHeader" prop="damaTotal">
                    <el-table-column align="center" :label="$t('order.quantity')" prop="damageNum" min-width="100"/>
                  </el-table-column>

                  <el-table-column align="center" :label="$t('order.lessCargoProduct')">
                    <el-table-column align="center" min-width="200" label="商品编号" prop="lessCargoCode"/>
                    <el-table-column align="center" min-width="200" label="商品名称" prop="lessCargoName"/>
                  </el-table-column>

                  <el-table-column align="center" :render-header="renderHeader" prop="lessTotal">
                    <el-table-column align="center" :label="$t('order.quantity')" prop="lessCargoNum" min-width="100"/>
                  </el-table-column>

                </el-table>
              </div>
            </div>

            <div class="time-list" style="margin: 1em 0">
              <el-popover
                placement="right" title="" width="280" trigger="click"
              >
                <div>
                  <p>{{'提交订单时间：' + orderDetail.orderCreateTime}}</p>
                  <p>{{'支付订金时间：' + orderDetail.payEarnestTime}}</p>
                  <p>{{'完成备货时间：' + orderDetail.completeStockUpTime}}</p>
                  <p>{{'支付余款时间：' + orderDetail.paySurplusTime}}</p>
                  <p>{{'国外出库时间：' + orderDetail.externalOutboundTime}}</p>
                  <p>{{'国内收货时间：' + orderDetail.domesticReceiveTime}}</p>
                </div>
                <el-button slot="reference" type="primary">操作时间记录</el-button>
              </el-popover>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-if="currentRow.order_status==220">
      <h2 :style="{textAlign: 'center', width: rowLength+'px'}">国内发货</h2>
      <div class="mainContent">
        <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
          <el-row>
            <el-col :span="3">
              <div class="grid-content bg-purple">货单号:</div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple">{{ currentRow.order_no }}</div>
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
              <el-col :span="3" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">收款SWFIT Code</div>
              </el-col>
              <el-col :span="3" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">453566787469</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">收款银行</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">中国农业银行</div>
              </el-col>
              <el-col :span="2" align="center">
                <div class="grid-content bg-purple">银行地址</div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple">广州市天河区石牌桥</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3" align="center" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">汇款SWFIT Code</div>
              </el-col>
              <el-col :span="3" v-if="orderDetail.payWay==10">
                <div class="grid-content bg-purple">{{orderDetail.bankSwift}}</div>
              </el-col>
              <el-col :span="3" align="center">
                <div class="grid-content bg-purple">汇款银行</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">{{orderDetail.bankName}}</div>
              </el-col>
              <el-col :span="2" align="center">
                <div class="grid-content bg-purple">银行地址</div>
              </el-col>
              <el-col :span="9">
                <div class="grid-content bg-purple">{{orderDetail.bankAddress}}</div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div style="display: flex">
          <div class="twoTable-wrap" style="padding-right: 20px">
            <!--订货表格-->
            <div class="filter-container" style="padding-bottom: 0">
              <el-table
                key="productList"
                :data="orderDetail.goodList || []"
                border
                fit
                size="mini"
                style="width: 100%;border:none;border-left: 2px solid #d5d5d5;border-right: 1px solid #d5d5d5"
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
            <!--补货表格-->
            <div class="filter-container" style="padding-bottom: 0">
              <el-table key='replenishment' :data="order.replenishmentList" border fit
                        size="mini"
                        style="width: 100%;border: 1px solid #d5d5d5;border-top:none;border-bottom:none;border-left-width: 2px"
                        :span-method="arraySpanMethod"
                        class="orderTable" ref="replenishmentTable"
                        :show-header="haveReplenishment"
                        :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
                <el-table-column
                  align="center"
                  width="85"
                  label="商品品牌"
                  prop="brandName"
                />
                <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo" />
                <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName" show-overflow-tooltip/>
                <el-table-column align="center" width="90" :label="$t('product.productSpecification')" prop="specificationChinese" show-overflow-tooltip/>
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
                <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')" />
                <el-table-column align="center" width="120" class-name="units-wrap" :label="$t('order.replenishmentQuantity')" />
                <el-table-column align="center" width="140" :label="$t('price.startDiscount')" />
                <el-table-column align="center" width="140" :label="$t('price.orderDiscount')" />
                <el-table-column width="140" align="center" :label="$t('price.orderUnitPrice')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">合计：</span>
                  </template>
                </el-table-column>
                <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">{{ currentRow.total_channel_amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">￥ {{ currentRow.total_earnest_amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('order.residualPayment')" align="center" width="170">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">￥ {{ currentRow.total_surplus_amount }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="time-list" style="margin: 1em 0">
              <el-popover
                placement="right" title="" width="280" trigger="click"
              >
                <div>
                  <p>{{'提交订单时间：' + orderDetail.orderCreateTime}}</p>
                  <p>{{'支付订金时间：' + orderDetail.payEarnestTime}}</p>
                  <p>{{'完成备货时间：' + orderDetail.completeStockUpTime}}</p>
                  <p>{{'支付余款时间：' + orderDetail.paySurplusTime}}</p>
                  <p>{{'国外出库时间：' + orderDetail.externalOutboundTime}}</p>
                  <p>{{'国内收货时间：' + orderDetail.domesticReceiveTime}}</p>
                  <p>{{'国内发货时间：' + orderDetail.domesticShipmentTime}}</p>
                </div>
                <el-button slot="reference" type="primary">操作时间记录</el-button>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */

  import { requestShopCart, cartRemove, createOrder } from "@/api/goods"
  import request from "@/utils/request"

  export default {
    components: {},
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    computed: {
      cartonTotal() {
        let replenishmentQuantityTotal = 0
        this.order.orderSubs.forEach((subsItem, index, arr) => {
          replenishmentQuantityTotal += subsItem.orderQuantity
        })
        this.order.replenishmentList.forEach((subsItem, index, arr) => {
          if (index >= arr.length - 2) return false
          replenishmentQuantityTotal += subsItem.replenishmentQuantity
        })
        return replenishmentQuantityTotal
      }
    },
    data() {
      return {
        orderDetail: {}, // 存放订货表格数据
        haveReplenishment: false,
        orderBoxNumTotal: 0,
        list: [],
        replenishmentList: [],
        listLoading: false,
        replenishmentListSelect: [],
        payWay: '1',
        order: {
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
        },
        tableHeight: 0,
        tableWidth: 0,
        rowLength: 0,
        domesticReceiveProblematicList: [],
        domesticReceiveProblematicTotal: {
          defeTotal: 0,
          damaTotal: 0,
          lessTotal: 0,
        },
        channelReceiveProblematicList: [],
        channelReceiveProblematicTotal: {
          defeTotal: 0,
          damaTotal: 0,
          lessTotal: 0,
        },
      }
    },
    methods: {
      getList() {
        request({
          url: "/order/orderDetail.do",
          method: "post",
          data: { orderNo: this.currentRow.order_no }
        }).then(res => {
          this.orderDetail = res.data;
          this.orderDetail.goodList.forEach((item, index, arr)=>{
            this.orderBoxNumTotal += item.orderBoxNum
          })
        });

        // 国内收货数据
        request({
          url: "/goods/fetchIssueMsg.do",
          method: "post",
          data: {
            orderNo: this.currentRow.order_no,
            receiveType: 1
          }
        }).then(res => {
          this.domesticReceiveProblematicList = res.data.items;
          this.domesticReceiveProblematicTotal.defeTotal = res.data.defeTotal
          this.domesticReceiveProblematicTotal.damaTotal = res.data.damaTotal
          this.domesticReceiveProblematicTotal.lessTotal = res.data.lessTotal
        });

        // 渠道收货数据
        request({
          url: "/goods/fetchIssueMsg.do",
          method: "post",
          data: {
            orderNo: this.currentRow.order_no,
            receiveType: 2
          }
        }).then(res => {
          this.channelReceiveProblematicList = res.data.items;
          this.channelReceiveProblematicTotal.defeTotal = res.data.defeTotal
          this.channelReceiveProblematicTotal.damaTotal = res.data.damaTotal
          this.channelReceiveProblematicTotal.lessTotal = res.data.lessTotal
        });
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.order.replenishmentList.length - 1) {
          if (columnIndex === 10) {
            return {
              rowspan: 1,
              colspan: 11
            }
          } else if (columnIndex == 11) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else if (columnIndex > 11) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      renderHeader(h, { column, $index }) {
        if (column.property == 'defeTotal') {
          return h('span', this.domesticReceiveProblematicTotal.defeTotal.toString())
        } else if (column.property == 'damaTotal') {
          return h('span', this.domesticReceiveProblematicTotal.damaTotal.toString())
        } else if (column.property == 'lessTotal') {
          return h('span', this.domesticReceiveProblematicTotal.lessTotal.toString())
        } else {
          return h('span', '0')
        }

      }
    },
    created() {
      this.getList()
    },
    mounted() {
      this.$nextTick(() => {

        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'].$el.offsetHeight

        if (this.$refs['problematicTable']) {
          this.tableHeight += this.$refs['problematicTable'].$el.offsetHeight
        }

        this.tableWidth += this.$refs['orderTable'].$el.offsetWidth

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth

        this.$refs["replenishmentTable"].$el.children[1].children["0"].children[1].children["0"].cells[0].style.textAlign = 'right'

        if (!this.$refs['problematicTable']) { return false }
        this.$refs['problematicTable'].$el.children[1].children[0].children[1].children[0].cells[1].attributes.style.nodeValue += 'background-color: transparent!important'
        this.$refs['problematicTable'].$el.children[1].children[0].children[1].children[0].cells[3].attributes.style.nodeValue += 'background-color: transparent!important'
        this.$refs['problematicTable'].$el.children[1].children[0].children[1].children[0].cells[5].attributes.style.nodeValue += 'background-color: transparent!important'

        if (!this.$refs['problematicTable1']) { return false }
        this.$refs['problematicTable1'].$el.children[1].children[0].children[1].children[0].cells[1].attributes.style.nodeValue += 'background-color: transparent!important'
        this.$refs['problematicTable1'].$el.children[1].children[0].children[1].children[0].cells[3].attributes.style.nodeValue += 'background-color: transparent!important'
//        this.$refs['problematicTable1'].$el.children[1].children[0].children[1].children[0].cells[5].attributes.style.nodeValue += 'background-color: transparent!important'
      })
    }
  }
</script>

<style scoped>
  .orderTable .el-col {
    border-right: none;
  }
</style>
