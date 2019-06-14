<template>
  <div class="app-container">

    <div class="mainContent">
      <div class="filter-container theBorder no-border-bottom" :style="{paddingBottom: 0, width: rowLength+'px'}">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">Order No.</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ orderDetail.orderNo }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">Retailer No.</div>
          </el-col>
          <el-col :span="15">
            <div class="grid-content bg-purple">{{ orderDetail.channelNo }}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">Transportation</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">{{ orderDetail.transportation | transportationFilter }}</div>
          </el-col>
        </el-row>

        <div v-if="orderDetail.propertyOfSale==1">
          <!--<el-row>-->
            <!--<el-col :span="3" align="center">-->
              <!--<div class="grid-content bg-purple">收货地址:</div>-->
            <!--</el-col>-->
            <!--<el-col :span="19">-->
              <!--<div class="grid-content bg-purple">{{ orderDetail.address }}</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row>-->
            <!--<el-col :span="3" align="center">-->
              <!--<div class="grid-content bg-purple">收货方:</div>-->
            <!--</el-col>-->
            <!--<el-col :span="9">-->
              <!--<div class="grid-content bg-purple">{{orderDetail.name}}</div>-->
            <!--</el-col>-->
            <!--<el-col :span="2" align="center">-->
              <!--<div class="grid-content bg-purple">联系人:</div>-->
            <!--</el-col>-->
            <!--<el-col :span="4">-->
              <!--<div class="grid-content bg-purple">{{orderDetail.contact}}</div>-->
            <!--</el-col>-->
            <!--<el-col :span="2" align="center">-->
              <!--<div class="grid-content bg-purple">联系电话:</div>-->
            <!--</el-col>-->
            <!--<el-col :span="4">-->
              <!--<div class="grid-content bg-purple">{{orderDetail.tel}}</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
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
            <div :style="{paddingBottom: 0, width: rowLength+'px'}">
              <el-table
                key="productList"
                :data="orderDetail.goodList || []"
                border
                fit
                size="mini"
                style="width: 100%;border:none;border-left: 2px solid #d5d5d5;border-right: 1px solid #d5d5d5"
                class="orderTable"
                ref="orderTable1"
                :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700',height: '36px'}"
              >
                <el-table-column
                  align="center"
                  width="85"
                  label="Brand"
                  prop="brandEnglishName"
                />
                <el-table-column
                  align="center"
                  width="85"
                  label="Code"
                  prop="goodsNo"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.goodsNoForBrand }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="130"
                  label="Description"
                  prop="goodsEnglishName"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Size"
                  width="100"
                  prop="specificationEnglish"
                  show-overflow-tooltip
                />
                <el-table-column
                  align="center"
                  width="220"
                  class-name="units-wrap"
                  label="Selling Unit"
                  prop="packingSpecification"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="12" style="display: flex;justify-content: center">
                        <span>{{scope.row.packingSpecification.replace(/[^0-9]/ig,"")}}</span>
                      </el-col>
                      <el-col :span="12" style="display: flex;justify-content: center">
                        <span>pcs</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="90" label="Retail Price">
                  <template slot-scope="scope">
                    <span>{{ scope.row.symbol }} {{ scope.row.unitPrice }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  class-name="units-wrap"
                  label="Order Quantity"
                >
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="12" style="display: flex;justify-content: center">
                        <span>{{scope.row.orderBoxNum}}</span>
                      </el-col>
                      <el-col :span="12" style="display: flex;justify-content: center">
                        <span>units</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="Unit Purchase price"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.symbol }} {{(scope.row.unitPrice * scope.row.finalDiscount/100).toFixed(2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="Total Purchase Price"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.symbol }} {{scope.row.orderPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="30% Deposit"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.symbol }} {{scope.row.earnestAmount}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!--补货表格-->
          <div class="filter-container">
            <el-table key='replenishment' :data="order.replenishmentList" border fit
                      size="mini"
                      style="width: 100%;border: 1px solid #d5d5d5;border-left-width: 2px;border-top:none;"
                      class="orderTable" ref="replenishmentTable1"
                      :show-header="haveReplenishment"
                      :span-method="arraySpanMethod_replenishment1"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
              <el-table-column
                align="center"
                width="85"
                label="商品品牌"
                prop="brandName"
              />
              <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
                <template slot-scope="scope">
                  <!--<span class="text-muted"> 支付30%订金时间: {{ orderDetail.payEarnestTime }}</span>-->
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName"
                               show-overflow-tooltip/>
              <el-table-column align="center" width="100" :label="$t('product.productSpecification')"
                               prop="specificationChinese" show-overflow-tooltip/>
              <el-table-column align="center" :label="$t('order.replenishmentSpecification')">
                <el-table-column align="center" width="220" class-name="units-wrap"
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
              </el-table-column>
              <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
                <template slot-scope="scope">
                  <span>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" class-name="units-wrap"
                               :label="$t('order.replenishmentQuantity')">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span style="color:gray">{{scope.row.replenishmentQuantity}}</span>
                    </el-col>
                    <el-col :span="12" style="display: flex;justify-content: center">
                      <span>箱</span>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('price.orderUnitPrice')">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">{{'Unpaid 30％ Deposit：'}}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.packingUnit).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('order.orderAmount')">
                <template slot-scope="scope">
                  <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('order.thirtyPercentDeposit')">
                <template slot-scope="scope">
                  <span class="text-total">{{ symbol }} {{ currentRow.total_earnest_amount }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>

      </div>

    </div>

    <div style="visibility: hidden;position: absolute">
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
                    <span>{{ scope.row.symbol }} {{ scope.row.unitPrice }}</span>
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
                    <span>{{ scope.row.symbol }} {{(scope.row.unitPrice * scope.row.finalDiscount/100).toFixed(2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="140"
                  :label="$t('order.orderAmount')"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.symbol }} {{scope.row.orderPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  :label="$t('order.thirtyPercentDeposit')"
                  width="130"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.symbol }} {{scope.row.earnestAmount}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!--补货表格-->
            <div class="filter-container">
              <el-table key='replenishment' :data="order.replenishmentList" border fit
                        size="mini"
                        style="width: 100%;border: 1px solid #d5d5d5;border-left-width: 2px;border-top:none;"
                        class="orderTable" ref="replenishmentTable"
                        :show-header="haveReplenishment"
                        :span-method="arraySpanMethod_replenishment"
                        :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}">
                <el-table-column
                  align="center"
                  width="85"
                  label="商品品牌"
                  prop="brandName"
                />
                <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-muted"> 支付30%订金时间: {{ orderDetail.payEarnestTime }}</span>
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
                <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')">
                  <template slot-scope="scope">
                    <span>{{scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="120" class-name="units-wrap"
                                 :label="$t('order.replenishmentQuantity')">
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="12" style="display: flex;justify-content: center">
                        <span style="color:gray">{{scope.row.replenishmentQuantity}}</span>
                      </el-col>
                      <el-col :span="12" style="display: flex;justify-content: center">
                        <span>箱</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="140" :label="$t('price.startDiscount')">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1" class="text-total">{{'已付30%订金：'}}</span>
                    <span v-else>{{scope.row.startDiscount}}%</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="140" :label="$t('price.orderDiscount')">
                  <template slot-scope="scope">
                    <span>{{scope.row.orderDiscount}}%</span>
                  </template>
                </el-table-column>
                <el-table-column width="140" align="center" :label="$t('price.orderUnitPrice')">
                  <template slot-scope="scope">
                    <span>￥ {{(scope.row.supplyPrice * scope.row.packingUnit).toFixed(2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="140" align="center" :label="$t('order.orderAmount')">
                  <template slot-scope="scope">
                    <span>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity).toFixed(2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="130" :label="$t('order.thirtyPercentDeposit')">
                  <template slot-scope="scope">
                    <span class="text-total">{{ symbol }} {{ currentRow.total_earnest_amount }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */

  import { requestShopCart, cartRemove, createOrder } from "@/api/goods";
  import request from "@/utils/request";
  import '@/styles/address-table.scss';

  export default {
    components: {},
    props: {
      currentRow: {
        type: Object,
      },
      hideTile: {
        type: Boolean
      }
    },
    data() {
      return {
        list: [],
        orderDetail: {}, // 存放订货表格数据
        haveReplenishment: false,
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
        listLoading: false,
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
        rowLength: 0,
        symbol: null,
      }
    },
    methods: {
      getList() {
        request({
          url: "/order/orderDetail.do",
          method: "post",
          data: { orderNo: this.currentRow.orderNo }
        }).then(res => {
          this.orderDetail = res.data;
          this.symbol = this.orderDetail.goodList[0].symbol
        });
      },
      arraySpanMethod_replenishment({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == this.replenishmentList.length - 1) {
          if (columnIndex == 1) {
            return {
              rowspan: 1,
              colspan: 8
            }
          } else if (columnIndex == 8) {
            return {
              rowspan: 1,
              colspan: 4
            }
          } else if (columnIndex == 12) {
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
      arraySpanMethod_replenishment1({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == this.replenishmentList.length - 1) {
          if (columnIndex == 1) {
            return {
              rowspan: 1,
              colspan: 7
            }
          } else if (columnIndex == 7) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else if (columnIndex == 9) {
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
      cancelOrderProcess() {
        this.cancelOrderVisible = true
      },
    },
    created() {
      this.getList()
    },
    mounted() {

      this.$nextTick(() => {

        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'].$el.offsetHeight

        this.rowLength = this.$refs['orderTable'].$el.offsetWidth

        this.$refs["replenishmentTable"].$el.children[1].children["0"].children[1].children["0"].cells["0"].style.textAlign = 'left'
        this.$refs["replenishmentTable"].$el.children[1].children["0"].children[1].children["0"].cells[1].style.textAlign = 'right'

        this.$refs["replenishmentTable1"].$el.children[1].children["0"].children[1].children["0"].cells["0"].style.textAlign = 'left'
        this.$refs["replenishmentTable1"].$el.children[1].children["0"].children[1].children["0"].cells[1].style.textAlign = 'right'

      })
    }
  }
</script>

<style scoped lang="scss">
  .orderTable .el-col {
    border-right: none;
  }
</style>
