<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 500px;" class="filter-item"
                placeholder="品牌名称/商品编号/商品名称/商品系列/商品主品类/商品子品类" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>

    <el-table
      :key='tableKey' :data="list"
      v-loading="listLoading" element-loading-text="给我一点时间"
      border fit highlight-current-row
      class="border2"
      style="width: 100%;border-right-width: 1px;border-bottom-width: 1px">
      <el-table-column min-width="120px" align="center" label="渠道号" prop="channelNo"/>

      <el-table-column min-width="150px" align="center" label="渠道名称" prop="channelName"/>

      <el-table-column min-width="120px" align="center" label="申请类型" prop="applicationType"  :filters="applicationTypeFilters"
                       :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.applicationType | applicationTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('payOrder.operation')" min-width="120" class-name="small-padding">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="viewDetail(scope.row)">
            审批促销
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--取消并单-->
    <el-dialog :visible.sync="isDialogDetailShow">
      <el-row :gutter="5">
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">促销商品</div>
        </el-col>
        <el-col :span="21">
          <el-table :key="'product'" :data="productlist" v-loading="listLoading" element-loading-text="给我一点时间" border
                    fit highlight-current-row style="width: 100%">
            <el-table-column label="商品品牌"></el-table-column>
            <el-table-column label="商品编号"></el-table-column>
            <el-table-column label="商品名称"></el-table-column>
            <el-table-column label="商品规格"></el-table-column>
            <el-table-column label="装箱规格"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">渠道号</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">12323</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">渠道名称</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">渠道级别</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">申请理由</div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">申请资料</div>
        </el-col>
        <el-col :span="10">

        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">促销活动日期</div>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">申请数量</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">12323</div>
        </el-col>
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">库存数量</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <div>申请时间：</div>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="3" align="center">
          <div class="grid-content bg-purple">审核结果</div>
        </el-col>
        <el-col :span="21">
          <el-radio-group v-model="radio" :change="radioChange()">
            <el-radio :label="1">同意申请</el-radio>
            <el-radio :label="2">驳回申请</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="3" align="center">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="21">
          <el-checkbox v-model="checked" :change="checkBoxChange()" :disabled="checkDisable">审批数量</el-checkbox>
          <el-input-number v-model="AllowNum" :min="1" :disabled="numDisable"></el-input-number>
        </el-col>
      </el-row>
      <div style="text-align:center;">
        <el-button type="primary" @click="" :loading="submitLoading">确认提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    fetchList,
    fetchPv,
    createArticle,
    updateArticle
  } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import Mock from 'mockjs'

  export default {
    name: 'SalesPromotion',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: [
          {
            channelNo: Mock.Random.natural(20180522001, 20180522100),
            channelName: 'ASD总店',
            applicationType: Mock.Random.natural(0, 1),
          }
        ],
        applicationTypeFilters: [
          { text: '首次申请', value: 0 },
          { text: '再次申请', value: 1 }
        ],
        productlist: [],
        submitLoading: false,
        radio: 1,
        checked: false,
        AllowNum: 0,
        numDisable: true,
        checkDisable: false,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        sortOptions: [
          { label: 'ID Ascending', key: '+id' },
          { label: 'ID Descending', key: '-id' }
        ],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        isDialogDetailShow: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogTransportChangeVisible: false,
        pvData: [],
        rules: {
          type: [
            { required: true, message: 'type is required', trigger: 'change' }
          ],
          timestamp: [
            {
              type: 'date',
              required: true,
              message: 'timestamp is required',
              trigger: 'change'
            }
          ],
          title: [
            { required: true, message: 'title is required', trigger: 'blur' }
          ]
        },
        downloadLoading: false,
        currentOrder: {}
      }
    },
    created() {
//    this.getList()
    },
    methods: {
      filterHandler(value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      radioChange() {
        if (this.radio === 2) {
          this.checkDisable = true
          // this.numDisable = true
        } else if (this.radio === 1) {
          this.checkDisable = false
          // this.checkBoxChange()
        }
      },
      checkBoxChange() {
        if (this.checked && this.checkDisable === false) {
          this.numDisable = false
        } else if (this.checked === false || this.checkDisable) {
          this.numDisable = true
        }
      },
      // 查看并单
      viewDetail(row) {
        this.currentOrder = row
        this.isDialogDetailShow = true
      },

      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.items
          this.total = response.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },

      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.isDialogDetailShow = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.isDialogDetailShow = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.isDialogDetailShow = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.isDialogDetailShow = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogTransportChangeVisible = true
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = [
            'timestamp',
            'title',
            'type',
            'importance',
            'status'
          ]
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j === 'timestamp') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          })
        )
      }
    },
    filters: {
      applicationTypeFilter(status) {
        const statusMap = {
          0: '首次申请',
          1: '再次申请',
        }
        return statusMap[status]
      },
    }
  }
</script>
<style scoped>
  .el-dialog {
    width: 90%;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    padding-top: 6px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
