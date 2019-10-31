<template>
  <div class="app-container">
    <h2 v-if="currentRow.order_status==-110" :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">取消待退订金</h2>
    <h2 v-else-if="currentRow.order_status==-120" :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">取消已退订金</h2>
    <h2 v-else-if="currentRow.order_status==-150" :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">缺货待退订金</h2>
    <h2 v-else-if="currentRow.order_status==-160" :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">缺货已退订金</h2>
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
            </el-table>
          </div>

          <!--补货表格-->
          <div class="filter-container">
            <el-table key='replenishment' :data="order.replenishmentList" border fit
                      size="mini" :show-header="false"
                      style="width: 100%;border: 1px solid #d5d5d5;border-top:none;border-left-width: 1px"
                      class="orderTable" ref="replenishmentTable"
                      :span-method="arraySpanMethod_replenishment"
                      :header-cell-style="{background:'#dff2fc',color:'#424242',fontWeight: '700', padding: 0}"
                      :cell-style="summaryCellStyle" :cell-class-name="summaryCellClass">
              <el-table-column
                align="center"
                width="85"
                label="商品品牌"
                prop="brandName"
              />
              <el-table-column align="center" width="85" :label="$t('product.productNo')" prop="goodsNo">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-2 && (currentRow.order_status==-110 || currentRow.order_status==-150)" class="text-muted">
                    取消订货时间: {{ orderDetail.cancelOrderTime }}</span>
                  <el-popover v-else-if="scope.$index===order.replenishmentList.length-2&&currentRow.order_status==-120"
                    placement="right" title="" width="280" trigger="click"
                  >
                    <div class="text-muted">
                      <p>{{'提交订单时间：' + orderDetail.orderCreateTime}}</p>
                      <p>{{'支付订金时间：' + orderDetail.payEarnestTime}}</p>
                      <p>{{'完成备货时间：' + orderDetail.completeStockUpTime}}</p>
                      <p>{{'取消订货时间：' + orderDetail.cancelOrderTime}}</p>
                      <p>{{'支付退款时间：' + orderDetail.depositRefundTime}}</p>
                    </div>
                    <el-button slot="reference" type="primary">操作时间记录</el-button>
                  </el-popover>
                  <el-popover v-else-if="scope.$index===order.replenishmentList.length-2&&currentRow.order_status==-160"
                              placement="right" title="" width="280" trigger="click"
                  >
                    <div class="text-muted">
                      <p>{{'提交订单时间：' + orderDetail.orderCreateTime}}</p>
                      <p>{{'支付订金时间：' + orderDetail.payEarnestTime}}</p>
                      <p>{{'取消订货时间：' + orderDetail.cancelOrderTime}}</p>
                      <p>{{'支付退款时间：' + orderDetail.depositRefundTime}}</p>
                    </div>
                    <el-button slot="reference" type="primary">操作时间记录</el-button>
                  </el-popover>

                  <span v-else-if="scope.$index===order.replenishmentList.length-2&&currentRow.order_status==-150" class="text-muted">{{'取消订货时间：' + orderDetail.cancelOrderTime}}</span>
                  <el-popover v-else-if="scope.$index===order.replenishmentList.length-2&&currentRow.order_status==-160"
                              placement="right" title="" width="280" trigger="click"
                  >
                    <div class="text-muted">
                      <p>{{'提交订单时间：' + orderDetail.orderCreateTime}}</p>
                      <p>{{'支付订金时间：' + orderDetail.payEarnestTime}}</p>
                      <p>{{'取消订货时间：' + orderDetail.cancelOrderTime}}</p>
                      <p>{{'支付退款时间：' + orderDetail.depositRefundTime}}</p>
                    </div>
                    <el-button slot="reference" type="primary">操作时间记录</el-button>
                  </el-popover>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1">{{ '原因: ' }}</span>
                  <span v-else>{{ scope.row.goodsNo }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="130" :label="$t('product.productName')" prop="goodsChineseName">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-1&&currentRow.order_status==-110">{{ '等待备货时间过长，渠道商取消订货。' }}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1&&currentRow.order_status==-120">{{ '等待备货时间过长，渠道商取消订货。' }}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1&&currentRow.order_status==-150">{{ '不再备货，品牌商取消订货。' }}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1&&currentRow.order_status==-160">{{ '不再备货，品牌商取消订货。' }}</span>
                  <span v-else>{{ scope.row.goodsChineseName }}</span>
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
                <el-table-column align="center" width="100" label="装箱规格" prop="refundTitleHead">
                  <template slot-scope="scope">
                    <span v-if="scope.$index===order.replenishmentList.length-1">{{ '退款说明: ' }}</span>
                    <span v-else>{{scope.row.packingUnit}} 瓶/箱</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column align="center" width="90" :label="$t('price.domesticRetailPrice')" prop="tips">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-1&&currentRow.order_status==-110">退款将退回到您的账户余额，完成退款后可查看您账户余额的变化情况。</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1&&currentRow.order_status==-150">退款将退回到您的账户余额，完成退款后可查看您账户余额的变化情况。</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1&&currentRow.order_status==-120">退款已退回到您的账户余额，可查看您账户余额的变化情况。</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-1&&currentRow.order_status==-160">退款已退回到您的账户余额，可查看您账户余额的变化情况。</span>
                  <span v-else>{{ scope.row.supplyCurrencySymbol + scope.row.supplyPrice.toFixed(2) }}</span>
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
              <el-table-column align="center" width="140" :label="$t('price.startDiscount')" prop="tipsRight">
                <template slot-scope="scope">
                  <span v-if="scope.$index===order.replenishmentList.length-2&&currentRow.order_status==-110" class="text-total">{{'待退30%订金 : '}}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-2&&currentRow.order_status==-120" class="text-total">{{'已退30%订金 : '}}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-2&&currentRow.order_status===-150" class="text-total">{{'待退30%订金 : '}}</span>
                  <span v-else-if="scope.$index===order.replenishmentList.length-2&&currentRow.order_status===-160" class="text-total">{{'已退30%订金 : '}}</span>
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
                  <span v-if="scope.$index===order.replenishmentList.length-2" class="text-total">￥ {{ currentRow.total_earnest_amount }}</span>
                  <span v-else>￥ {{(scope.row.supplyPrice * scope.row.replenishmentQuantity * 0.3).toFixed(2)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>

      </div>

    </div>

    <div :style="{paddingBottom: 0, width: rowLength+'px'}" class="text-center">
      <el-button v-if="currentRow.order_status==-110 || currentRow.order_status==-150" class="filter-item" type="primary" style="margin-bottom: 0;" @click="goPayDeposit(currentRow.order_status-10)">支付退款</el-button>
    </div>

    <el-dialog :visible.sync="cancelOrderSubmitVisible" width="30%" append-to-body :show-close="false">
      <p style="text-align: center">该次订货已被取消，可在“停止订货”状态中查看详情。</p>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="cancelOrderSubmitVisible=false">知道了</el-button>
      </div>
    </el-dialog>

    <!--点击去付订金-->
    <el-dialog :visible.sync="payWindowVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">
        货单号:
        <span>{{orderDetail.orderNo}}</span>
      </div>
      <div style="text-align: center;">账户余额: ￥{{ accountResidual.toFixed(2) }}</div>
      <div style="text-align: center;">支付退款: ￥{{ currentRow.total_earnest_amount }}</div>
      <div style="text-align: center" class="text-muted" v-if="accountResidual < currentRow.total_earnest_amount">提醒：帐户余额不足扣减 ，请先充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="payWindowVisible=false">暂不</el-button>

        <el-button type="primary" v-if="accountResidual >= currentRow.total_earnest_amount" @click="handlePaymentConfirm(currentRow.order_status-10)">确认支付</el-button>
        <el-button type="primary" v-else @click="goRecharge()">去充值</el-button>
      </div>
    </el-dialog>

    <!-- 支付成功弹层 -->
    <el-dialog
      :visible.sync="completePaymentVisible"
      width="36%"
      append-to-body
      :show-close="false"
    >
      <div style="text-align: center">
        货单号
        <span>{{currentRow.order_no}}</span> 已完成退款支付。
        <br>当前帐户余额 ￥
        <span>{{ (accountResidual - currentRow.total_earnest_amount).toFixed(2) }}</span>
        <br>
        <span v-if="currentRow.order_status==-150">可在缺货已退订金状态项下『查看货单』。</span>
        <span v-else-if="currentRow.order_status==-110">可在取消已退订金状态项下『查看货单』。</span>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="completePayment(currentRow.order_status-10)">知道了</el-button>
      </div>
    </el-dialog>


    <!--充值环节-->
    <el-dialog :visible.sync="rechargeWindowVisible" width="35%" append-to-body :show-close="false">
      <div style="text-align: center;">账户余额: ￥ {{accountResidual.toFixed(2)}}</div>
      <div style="text-align: center;">
        充值金额:
        <span style="color: red">请充入不少于 ￥ {{(currentRow.total_earnest_amount-accountResidual).toFixed(2)}}</span>
        <el-input v-model.number.lazy="rechargeAmount"></el-input>
      </div>
      <div style="text-align: center" class="text-danger">温馨提示：充值前请确保已绑定的银行卡有足够金额进行充值。</div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeWindowVisible=false">暂不</el-button>
        <el-button type="primary" @click="handleRechargeConfirm()">确认充值</el-button>
        <!--<el-button type="primary" @click="handleRechargeFailConfirm()">确认充值(失败)</el-button>-->
      </div>
    </el-dialog>
    <!--充值成功-->
    <el-dialog
      :visible.sync="rechargeSuccessVisible"
      width="30%"
      append-to-body
      :show-close="false"
    >
      <div style="text-align: center">
        已完成充值，当前帐户余额：¥
        <span>{{accountResidual.toFixed(2)}}</span>，是否继续完成之前的订金支付？
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rechargeSuccessVisible=false;payWindowVisible=false">否</el-button>
        <el-button type="primary" @click="stayInGoPayDeposit()">是</el-button>
      </div>
    </el-dialog>
    <!--充值失败-->
    <el-dialog :visible.sync="rechargeFailVisible" width="30%" append-to-body :show-close="false">
      <div style="text-align: center">
        充值金额: ￥
        <span>{{Number(rechargeAmount).toFixed(2)}}</span>
        <span style="color: red">未完成充值！</span>
      </div>
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

  import { requestShopCart, cartRemove, createOrder } from "@/api/goods";
  import request from "@/utils/request";

  export default {
    components: {},
    props: {
      currentRow: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        list: [],
        replenishmentList: [],
        listLoading: false,
        orderDetail: {}, // 存放订货表格数据
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
        isCancelOrder: false,
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
        rowLength: 0
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
        })
      },
      handlePaymentConfirm(statusCode) {
        request({
          url: "/order/orderStatusChange.do",
          method: "post",
          data: {
            orderNo: this.currentRow.order_no,
            statusChangeTo: statusCode,
          }
        }).then(res => {
          if (res.errorCode == 0) {
            this.completePaymentVisible = true;
            this.cancelOrderVisible = false;
            this.payWindowVisible = false;
          }
        });
      },
      completePayment(statusCode) {
        this.$emit('orderStatusChange', statusCode)
      },
      goRecharge() {
        this.rechargeWindowVisible = true;
      },
      handleRechargeConfirm() {
        this.accountResidual += this.rechargeAmount;
        this.rechargeSuccessVisible = true;
        this.rechargeWindowVisible = false;
      },
      handleRechargeFailConfirm() {
        this.accountResidual += this.rechargeAmount;
        this.rechargeFailVisible = true;
        this.rechargeWindowVisible = false;
      },
      stayInGoPayDeposit() {
        this.rechargeSuccessVisible = false;
        this.payWindowVisible = true;
      },
      rechargeAgain() {
        this.rechargeAmount = 0;
        this.deposit30 = 2232;
        this.accountResidual = 100;
        this.rechargeFailVisible = true;
        this.rechargeWindowVisible = true;
      },
      goPayDeposit() {
        this.payWindowVisible = true;
      },
      arraySpanMethod_replenishment({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.order.replenishmentList.length - 2) {
          if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 8
            }
          } else if (columnIndex === 8) {
            return {
              rowspan: 1,
              colspan: 4
            }
          } else if (columnIndex === 12) {
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
        if (rowIndex === this.order.replenishmentList.length - 1) {
          if (columnIndex === 1) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else if (columnIndex === 2) {
            return {
              rowspan: 1,
              colspan: 3
            }
          } else if (columnIndex === 5) {
            return {
              rowspan: 1,
              colspan: 1
            }
          }  else if (columnIndex === 6) {
            return {
              rowspan: 1,
              colspan: 8
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      summaryCellStyle({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 1 && rowIndex == 0) {
            return { textAlign: 'left' }
        }
        else if (column.property == 'goodsChineseName') {
          return { textAlign: 'left' }
        }
        else if (column.property == 'tips') {
          return { textAlign: 'left' }
        }
        else if (column.property == 'tipsRight') {
          return { textAlign: 'right' }
        }
      },
      summaryCellClass({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 1 && rowIndex == 1) {
          return 'fake-table-head'
        }
        else if (column.property == 'refundTitleHead') {
          return 'fake-table-head'
        }
      },
    },
    created() {
      this.getList()
    },
    mounted() {
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

      this.$nextTick(() => {
        this.tableHeight += this.$refs['orderTable'].$el.offsetHeight
        this.tableHeight += this.$refs['replenishmentTable'].$el.offsetHeight
        this.rowLength = this.$refs['orderTable'].$el.offsetWidth
      })
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

</style>
