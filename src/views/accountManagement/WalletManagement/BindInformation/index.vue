<template>
    <div  style="padding:1em;">
        <div class="bind_box">
            <el-row>
                <el-col :span="12">
                    <div class="bind_tit">子账户绑定信息</div>
                    <el-form label-width="120px">
                        <el-form-item label="渠道帐户：" prop>
                            <div class="bind_txt">wormir000101</div>
                        </el-form-item>
                        <el-form-item label="帐户类型：" prop>
                            <div class="bind_txt">交易帐户</div>
                        </el-form-item>
                        <el-form-item label="开户银行：" prop>
                            <div class="bind_txt">xxxxxx</div>
                        </el-form-item>
                        <el-form-item label="开户名称：" prop>
                            <div class="bind_txt">xxxxxx</div>
                        </el-form-item>
                        <el-form-item label="银行帐号：" prop>
                            <div class="bind_txt">xxxxxx</div>
                        </el-form-item>
                        <el-form-item label="银行帐号：" prop>
                            <div class="bind_txt">xxxxxx</div>
                        </el-form-item>
                        <el-form-item label="银行预留手机号：" prop>
                            <div class="bind_txt">1360****5678</div>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <div class="bind_tit">子账户绑定信息</div>
                    <el-form label-width="120px">
                        <el-form-item label="渠道帐户：" prop>
                            <div class="bind_txt">wormir000101</div>
                        </el-form-item>
                        <el-form-item label="帐户类型：" prop>
                            <div class="bind_txt">扣费帐户</div>
                        </el-form-item>
                        <el-form-item label="开户银行：" prop>
                            <div class="bind_txt">xxxxxx</div>
                        </el-form-item>
                        <el-form-item label="开户名称：" prop>
                            <div class="bind_txt">xxxxxx</div>
                        </el-form-item>
                        <el-form-item label="银行帐号：" prop>
                            <div class="bind_txt">xxxxxx</div>
                        </el-form-item>
                        <el-form-item label="银行帐号：" prop>
                            <div class="bind_txt">xxxxxx</div>
                        </el-form-item>
                        <el-form-item label="银行预留手机号：" prop>
                            <div class="bind_txt">1360****5678</div>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .bind_tit{
        font-size: 18px;
        font-weight:bold;
        margin-bottom:20px;
    }
    .bind_txt{
        font-size: 14px;
    }
    .bind_box .el-form-item--mini.el-form-item{
        margin:0;
    }
</style>