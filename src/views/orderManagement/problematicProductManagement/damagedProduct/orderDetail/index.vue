<template>
  <div>
    <div class="theBorder" style="border-bottom-width: 1px">
      <el-row>
        <el-col :span="4"><span>货单号: </span></el-col>
        <el-col :span="20"><span>{{ currentRow.orderNo }}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="4"><span>商品编号: </span></el-col>
        <el-col :span="8"><span>{{ currentRow.goodsNo }}</span></el-col>
        <el-col :span="4"><span>商品名称: </span></el-col>
        <el-col :span="8"><span>{{ currentRow.goodsName }}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="4"><span>申请理由: </span></el-col>
        <el-col :span="14"><span>{{ '商品破损严重，不能销售给顾客。' }}</span></el-col>
        <el-col :span="0"></el-col>
        <el-col :span="6">
          <div class="text-muted" style="color: #999;padding-left: 0">{{
            $t('order.applicationTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" style="min-height: 56px"><span>现场照片: </span></el-col>
        <el-col :span="20"><span @click="viewImage(currentRow.proofImage)"><img :src="currentRow.proofImage" alt=""
                                                                                height="48px" width="48px"
                                                                                class="link-type"></span></el-col>
      </el-row>

      <el-row class="no-border-bottom">
        <el-col :span="4"><span>补款金额: </span></el-col>
        <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
      </el-row>

      <!--申请后补货-->
      <template v-if="currentRow.compensationStatus===1">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>同意申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">{{
              '补货名额已退回到“选货下单”-对应商品的“去补货”里，或可自行前往“我的帐户-钱包管理-破损商品补货记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货状态: </span></el-col>
          <el-col :span="4"><span>已补货</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>申请后补货</span></el-col>
        </el-row>
      </template>

      <!--申诉后补货-->
      <template v-if="currentRow.compensationStatus===2">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受补货</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="4"><span>同意申诉</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">{{
              '补货名额已退回到“选货下单”-对应商品的“去补货”里，或可自行前往“我的帐户-钱包管理-破损商品补货记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货状态: </span></el-col>
          <el-col :span="4"><span>已补货</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>申诉后补货</span></el-col>
        </el-row>
      </template>

      <!--破损转补款-申诉后要补货-->
      <template v-if="currentRow.compensationStatus===3">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受补货</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>同意申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">{{
              '补货名额已退回到“选货下单”-对应商品的“去补货”里，或可自行前往“我的帐户-钱包管理-破损商品补货记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>补货状态: </span></el-col>
          <el-col :span="4"><span>已补货</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>申诉后补货</span></el-col>
        </el-row>
      </template>

      <!--破损转补款-申诉后吾蜜同意补货-->
      <template v-if="currentRow.compensationStatus===4">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>请求吾蜜公司介入协商</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>同意申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">{{
              '补货名额已退回到“选货下单”-对应商品的“去补货”里，或可自行前往“我的帐户-钱包管理-破损商品补货记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>补货状态: </span></el-col>
          <el-col :span="4"><span>已补货</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>申诉后补货</span></el-col>
        </el-row>
      </template>

      <!--破损转补款-驳回申请后吾蜜协商同意补货-->
      <template v-if="currentRow.compensationStatus===5">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="16" style="padding-left: 0">
            <div class="text-muted">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>请求吾蜜公司介入协商</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>同意申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20" style="padding-left: 0">
            <div class="text-muted">{{
              '补货名额已退回到“选货下单”-对应商品的“去补货”里，或可自行前往“我的帐户-钱包管理-破损商品补货记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货状态: </span></el-col>
          <el-col :span="4"><span>已补货</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>申诉后补货</span></el-col>
        </el-row>
      </template>

      <!--驳回申请-->
      <template v-if="currentRow.compensationStatus===6">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
      </template>

      <!--申诉中状态-，只接受补货-->
      <template v-if="currentRow.compensationStatus===7">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受补货</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
      </template>
      <!--申诉中状态-，要求补款-->
      <template v-if="currentRow.compensationStatus===8">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品有瑕疵，申请转补款继续销售</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
      </template>
      <!--申诉中状态-，破损转补款不接受，只接受补货-->
      <template v-if="currentRow.compensationStatus===9">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <div class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="0"></el-col>
          <el-col :offset="4" :span="20">
            <div class="text-muted">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受补货</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.applicationTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
      </template>

      <!--驳回破损补货申诉-->
      <template v-if="currentRow.compensationStatus===10">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受补货</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>不支持补货</span></el-col>
        </el-row>
      </template>

      <!--驳回瑕疵补款申诉-->
      <template v-if="currentRow.compensationStatus===11">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品有瑕疵，申请转补款继续销售</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>不支持补货</span></el-col>
        </el-row>
      </template>

      <!--破损转补款-驳回补货申诉-->
      <template v-if="currentRow.compensationStatus===12">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="16"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>商品破损严重，只能接受补货</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>不支持补货</span></el-col>
        </el-row>
      </template>

      <!--驳回吾蜜介入申诉-->
      <template v-if="currentRow.compensationStatus===13">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申请</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>请求吾蜜公司介入协商</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
          <span class="text-muted">{{
            $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
          </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>不支持补货</span></el-col>
        </el-row>
      </template>

      <!--破损转补款-驳回吾蜜介入申诉-->
      <template v-if="currentRow.compensationStatus===14">
        <el-row class="border-top">
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>破损转补款</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <span class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="4" class="border-left"><span>补款金额: </span></el-col>
          <el-col :span="4"><span>￥ {{ currentRow.compensationAmount.toFixed(2) }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :span="16"
                  style="background: #fff;font-weight: normal;border-bottom: none;justify-content: flex-start">
            <div class="text-muted" style="background-color: #fff;font-weight: normal;color: #999">{{
              '补款将退回到您的帐户，可在完成补款后自行前往“我的帐户-钱包管理-交易记录”查看明细。' }}
            </div>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="4"><span>申诉理由: </span></el-col>
          <el-col :span="14"><span>请求吾蜜公司介入协商</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <span class="text-muted">{{
              $t('order.appealTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </span>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4"><span>审核结果: </span></el-col>
          <el-col :span="14"><span>驳回申诉</span></el-col>
          <el-col :span="0"></el-col>
          <el-col :span="6">
            <span class="text-muted">{{
              $t('order.reviewTime') }}: {{ new Date() | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><span>补货类型: </span></el-col>
          <el-col :span="4"><span>不支持补货</span></el-col>
        </el-row>
      </template>
    </div>



    <!--待审核-->
    <template v-if="currentRow.compensationStatus===0">
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" disabled>审核中</el-button>
      </div>
    </template>
    <!--申诉中-->
    <template v-if="currentRow.compensationStatus>=7 && currentRow.compensationStatus<=9">
      <div class="dialogBottomButton-wrap">
        <el-button type="primary" disabled>申诉中</el-button>
      </div>
    </template>


    <!-- viewImage -->
    <el-dialog :visible.sync="isViewImageShow" class="image-view" width="45%" append-to-body>
      <img :src="imageViewed" alt="" width="100%">
    </el-dialog>

  </div>
</template>

<script>
  export default {
    props: {
      currentRow: {
        type: Object,
        default: function() {
          return {
            boxCode: 1111,
            compensationAmount: 1765,
            goodsNo: 123123,
            goodsName: '唇膏',
            brandEnglishName: 'LANCOM',
            channelClassify: 1,
            channelNo: 20001,
            compensation: 170,
            compensationStatus: 12,
            compensationType: 11,
            description: "Lancome (LANCOME) air cushion lip oil",
            mergePaymentNo: 857938502482,
            orderMethod: 20,
            orderNo: 10001,
            orderStatus: 10,
            proofImage:
              "http://img14.360buyimg.com/n0/jfs/t2947/207/116269887/42946/55627782/574beb9dN25ec971b.jpg",
          }
        }
      },
    },
    data() {
      return {
        isViewImageShow: false,
        imageViewed: false,
        submitLoading: false,
        successDialogVisible: false
      }
    },
    methods: {
      submitApplication() {
        this.submitLoading = true
        this.successDialogVisible = true
        this.$emit('submit-first-application')
      },
      handleConfirm() {
        this.$emit('closeApplicationDialog')
        this.submitLoading = false
      },
      viewImage(src) {
        this.imageViewed = src
        this.isViewImageShow = true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .el-col:nth-of-type(even) {
    padding-left: 1em;
  }

  .theBorder {
    border: solid #d5d5d5 2px;

  &
  .el-row {
    border-bottom: solid #d5d5d5 1px;
    margin-bottom: 0;
  }

  }
  .el-row {
    margin: 0;
  }

  .el-col:nth-of-type(odd):not(.text-muted) div {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .el-col:nth-of-type(even) div {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
    background-color: transparent;
    font-weight: normal;
  }

  .el-col:nth-child(odd) {
    background: #dff2fc;
    color: #424242;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
  }

  .el-col:nth-child(even) {
    color: #424242;
    display: flex;
    align-items: center;
    font-size: 12px;
    border-right: 1px #d5d5d5 solid;
  }

  .el-col:last-of-type {
    border-right: none;
  }

  .el-col:only-of-type {
    border-right: none;
  }
</style>
