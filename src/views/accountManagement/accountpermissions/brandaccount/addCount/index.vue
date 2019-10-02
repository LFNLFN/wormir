<template>
    <div class="add-brand-index-vue">
        <div class="border1 form-error-inline addcount_box">
            <el-table
                border
                :data="[{}]"
                class="no-border-right no-border-bottom"
                style="width: 100%;">
                <el-table-column align="center" 
                :filters="[{ text: '正常使用', value: 1 }, { text: '停止使用', value: 2 }]"
                :filter-method="filterHandler"
                label="品牌名称">
                <template slot-scope="scope">
                    <el-input
                    placeholder="品牌名称" clearable
                    ></el-input>
                </template>
                </el-table-column>
                <el-table-column align="center" label="账户姓名">
                <template slot-scope="scope">
                    <el-input
                    placeholder="输入账户姓名" clearable
                    ></el-input>
                </template>
                </el-table-column>
                <el-table-column align="center" label="联系电话">
                    <template slot-scope="scope">
                        <el-input
                        placeholder="输入联系电话" clearable
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="性别">
                    <template slot-scope="scope">
                        <el-input
                        placeholder="输入性别" clearable
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="工作部门">
                    <template slot-scope="scope">
                        <el-input
                        placeholder="输入部门" clearable
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="工作职位">
                    <template slot-scope="scope">
                        <el-input
                        placeholder="输入职位" clearable
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="联系邮箱">
                    <template slot-scope="scope">
                        <el-input
                        placeholder="输入邮箱" clearable
                        ></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="dialogBottomButton-wrap">
            <el-button type="primary" @click="onSubmit" :loading="isSubmitting">确认新增</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form: {},
            isSubmitting: false,
            formRules: {},
        }
    },
    methods:{
        onSubmit(){
            this.$confirm(`上传信息部分尚有未完成上传的项目，请完成后再提交。`, { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
        }
    }
}
</script>
<style lang="scss" scoped>
    .must:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    }
</style>