<template>
  <div>
    <div class="uploadItem">
      <div class="title fake-table-head border-left">成分配比表</div>
      <el-row class="border-bottom">
        <el-col :span="8">
          <el-form-item label="上传品名数量" prop="" class="form-row add-brand-row no-border-left no-border-right">
            <el-input v-model.trim.number="uploadNameNumIng"
                      @change="uploadNameNumIngChange" placeholder="请输入个数" style="width: 200px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" align="right">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right">
            <div style="line-height: 35px; padding-right: 10px">
              <el-popover v-if="ingFileListStr" placement="left" width="400" trigger="click">
                <h4>成分配比表上传目录</h4>
                <p v-for="item in ingFileListStr.split(',')">
                  <a :href="item.split('^_^')[0]" target="_blank" class="link-type">{{item.split('^_^')[1]}}</a><span class="delete-btn" @click="deleteAlreadyUploadFile(item.split('^_^')[0])"> 删除</span>
                </p>
                <el-button slot="reference" type="primary">查看上传目录</el-button>
              </el-popover>
              <el-button v-else type="danger" plain>未上传</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" align="left" class="border-left">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right" style="padding-top: 15px">
            <div>
              <el-upload
                class="upload-demo"
                :limit="uploadNameNumIng/1"
                multiple
                action=""
                :http-request="submitUpload"
                :on-preview="filePreview" :on-remove="ingFileRemove" :on-exceed="ingFileExceed"
                :on-change="ingFileOnChange"
                :file-list="ingFileList"
                :auto-upload="false">
                <div slot="tip" class="el-upload__tip">
                  从电脑中选取文件并上传，文件命名要求：商品品名+成分配表；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.
                </div>
                <el-button slot="trigger" size="small" type="primary" v-show="uploadNameNumIng>0">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('ing')" :loading="isUploadingIng" v-show="uploadNameNumIng>0">上传到服务器
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <div class="uploadItem">
      <div class="title fake-table-head border-left">危害识别表</div>
      <el-row class="border-bottom">
        <el-col :span="8">
          <el-form-item label="上传品名数量" prop="" class="form-row add-brand-row no-border-left no-border-right">
            <el-input v-model.trim.number="uploadNameNumHaz"
                      @change="uploadNameNumHazChange" placeholder="请输入个数" style="width: 200px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" align="right">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right">
            <div style="line-height: 35px; padding-right: 10px">
              <el-popover v-if="hazFileListStr" placement="left" width="400" trigger="click">
                <h4>危害识别表上传目录</h4>
                <p v-for="item in hazFileListStr.split(',')">
                  <a :href="item.split('^_^')[0]" target="_blank" class="link-type">{{item.split('^_^')[1]}}</a><span class="delete-btn" @click="deleteAlreadyUploadFile(item.split('^_^')[0])"> 删除</span>
                </p>
                <el-button slot="reference" type="primary">查看上传目录</el-button>
              </el-popover>
              <el-button v-else type="danger" plain>未上传</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" align="left" class="border-left">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right" style="padding-top: 15px">
            <div>
              <el-upload
                class="upload-demo"
                :limit="uploadNameNumHaz/1"
                multiple
                action=""
                :http-request="submitUpload"
                :on-preview="filePreview" :on-remove="hazFileRemove"
                :on-exceed="hazFileExceed" :on-change="hazFileOnChange" :file-list="hazFileList"
                :auto-upload="false">
                <div slot="tip" class="el-upload__tip">
                  从电脑中选取文件并上传，文件命名要求：商品品名+危害识别表；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.
                </div>
                <el-button slot="trigger" size="small" type="primary" v-show="uploadNameNumHaz>0">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('haz')" :loading="isUploadingHaz" v-show="uploadNameNumHaz>0">上传到服务器
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <div class="uploadItem">
      <div class="title fake-table-head border-left">标签文件</div>
      <el-row class="border-bottom">
        <el-col :span="8">
          <el-form-item label="上传品名数量" prop="" class="form-row add-brand-row no-border-left no-border-right">
            <el-input v-model.trim.number="uploadNameNumTag"
                      @change="uploadNameNumTagChange" placeholder="请输入个数" style="width: 200px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" align="right">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right">
            <div style="line-height: 35px; padding-right: 10px">
              <el-popover v-if="tagFileListStr" placement="left" width="400" trigger="click">
                <h4>标签文件上传目录</h4>
                <p v-for="item in tagFileListStr.split(',')">
                  <a :href="item.split('^_^')[0]" target="_blank" class="link-type">{{item.split('^_^')[1]}}</a><span class="delete-btn" @click="deleteAlreadyUploadFile(item.split('^_^')[0])"> 删除</span>
                </p>
                <el-button slot="reference" type="primary">查看上传目录</el-button>
              </el-popover>
              <el-button v-else type="danger" plain>未上传</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" align="left" class="border-left">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right" style="padding-top: 15px">
            <div>
              <el-upload
                class="upload-demo"
                :limit="uploadNameNumTag/1"
                multiple
                action=""
                :http-request="submitUpload"
                :on-preview="filePreview" :on-remove="tagFileRemove"
                :on-exceed="tagFileExceed" :on-change="tagFileOnChange" :file-list="tagFileList"
                :auto-upload="false">
                <div slot="tip" class="el-upload__tip">
                  从电脑中选取文件并上传，文件命名要求：商品品名+标签文件；文件格式：pdf./jpg./jpeg./png.
                </div>
                <el-button slot="trigger" size="small" type="primary" v-show="uploadNameNumTag>0">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('tag')" :loading="isUploadingTag" v-show="uploadNameNumTag>0">上传到服务器
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <div class="uploadItem">
      <div class="title fake-table-head border-left">化妆品备案批文</div>
      <el-row class="border-bottom">
        <el-col :span="8">
          <el-form-item label="上传品名数量" prop="" class="form-row add-brand-row no-border-left no-border-right">
            <el-input v-model.trim.number="uploadNameNumOffi"
                      @change="uploadNameNumOffiChange" placeholder="请输入个数" style="width: 200px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" align="right">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right">
            <div style="line-height: 35px; padding-right: 10px">
              <el-popover v-if="offiFileListStr" placement="left" width="400" trigger="click">
                <h4>化妆品备案批文上传目录</h4>
                <p v-for="item in offiFileListStr.split(',')">
                  <a :href="item.split('^_^')[0]" target="_blank" class="link-type">{{item.split('^_^')[1]}}</a><span class="delete-btn" @click="deleteAlreadyUploadFile(item.split('^_^')[0])"> 删除</span>
                </p>
                <el-button slot="reference" type="primary">查看上传目录</el-button>
              </el-popover>
              <el-button v-else type="danger" plain>未上传</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" align="left" class="border-left">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right" style="padding-top: 15px">
            <div>
              <el-upload
                class="upload-demo"
                :limit="uploadNameNumOffi/1"
                multiple
                action=""
                :http-request="submitUpload"
                :on-preview="filePreview" :on-remove="offiFileRemove"
                :on-exceed="offiFileExceed" :on-change="offiFileOnChange" :file-list="offiFileList"
                :auto-upload="false">
                <div slot="tip" class="el-upload__tip">
                  从电脑中选取文件并上传，文件命名要求：商品品名+化妆品备案批文；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.
                </div>
                <el-button slot="trigger" size="small" type="primary" v-show="uploadNameNumOffi>0">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('offi')" :loading="isUploadingOffi" v-show="uploadNameNumOffi>0">上传到服务器
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <div class="uploadItem">
      <div class="title fake-table-head border-left">MSDS（英文）</div>
      <el-row class="border-bottom">
        <el-col :span="8">
          <el-form-item label="上传品名数量" prop="" class="form-row add-brand-row no-border-left no-border-right">
            <el-input v-model.trim.number="uploadNameNumMEn"
                      @change="uploadNameNumMEnChange" placeholder="请输入个数" style="width: 200px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" align="right">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right">
            <div style="line-height: 35px; padding-right: 10px">
              <el-popover v-if="MEnFileListStr" placement="left" width="400" trigger="click">
                <h4>MSDS（英文）上传目录</h4>
                <p v-for="item in MEnFileListStr.split(',')">
                  <a :href="item.split('^_^')[0]" target="_blank" class="link-type">{{item.split('^_^')[1]}}</a><span class="delete-btn" @click="deleteAlreadyUploadFile(item.split('^_^')[0])"> 删除</span>
                </p>
                <el-button slot="reference" type="primary">查看上传目录</el-button>
              </el-popover>
              <el-button v-else type="danger" plain>未上传</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" align="left" class="border-left">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right" style="padding-top: 15px">
            <div>
              <el-upload
                class="upload-demo"
                :limit="uploadNameNumMEn/1"
                multiple
                action=""
                :http-request="submitUpload"
                :on-preview="filePreview" :on-remove="MEnFileRemove"
                :on-exceed="MEnFileExceed" :on-change="MEnFileOnChange" :file-list="MEnFileList"
                :auto-upload="false">
                <div slot="tip" class="el-upload__tip">
                  从电脑中选取文件并上传，文件命名要求：商品品名+MSDS（英文）；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.
                </div>
                <el-button slot="trigger" size="small" type="primary" v-show="uploadNameNumMEn>0">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('MEn')" :loading="isUploadingMEn" v-show="uploadNameNumMEn>0">上传到服务器
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <div class="uploadItem">
      <div class="title fake-table-head border-left">MSDS（中文）</div>
      <el-row class="border-bottom">
        <el-col :span="8">
          <el-form-item label="上传品名数量" prop="" class="form-row add-brand-row no-border-left no-border-right">
            <el-input v-model.trim.number="uploadNameNumMZh"
                      @change="uploadNameNumMZhChange" placeholder="请输入个数" style="width: 200px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" align="right">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right">
            <div style="line-height: 35px; padding-right: 10px">
              <el-popover v-if="MZhFileListStr" placement="left" width="400" trigger="click">
                <h4>MSDS（中文）上传目录</h4>
                <p v-for="item in MZhFileListStr.split(',')">
                  <a :href="item.split('^_^')[0]" target="_blank" class="link-type">{{item.split('^_^')[1]}}</a><span class="delete-btn" @click="deleteAlreadyUploadFile(item.split('^_^')[0])"> 删除</span>
                </p>
                <el-button slot="reference" type="primary">查看上传目录</el-button>
              </el-popover>
              <el-button v-else type="danger" plain>未上传</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" align="left" class="border-left">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right" style="padding-top: 15px">
            <div>
              <el-upload
                class="upload-demo"
                :limit="uploadNameNumMZh/1"
                multiple
                action=""
                :http-request="submitUpload"
                :on-preview="filePreview" :on-remove="MZhFileRemove"
                :on-exceed="MZhFileExceed" :on-change="MZhFileOnChange" :file-list="MZhFileList"
                :auto-upload="false">
                <div slot="tip" class="el-upload__tip">
                  从电脑中选取文件并上传，文件命名要求：商品品名+MSDS（中文）；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.
                </div>
                <el-button slot="trigger" size="small" type="primary" v-show="uploadNameNumMZh>0">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('MZh')" :loading="isUploadingMZh" v-show="uploadNameNumMZh>0">上传到服务器
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <div class="uploadItem">
      <div class="title fake-table-head border-left">进口化妆品安全性承诺书</div>
      <el-row class="border-bottom">
        <el-col :span="8">
          <el-form-item label="上传品名数量" prop="" class="form-row add-brand-row no-border-left no-border-right">
            <el-input v-model.trim.number="uploadNameNumCom"
                      @change="uploadNameNumComChange" :disabled="true" placeholder="请输入个数" style="width: 200px">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" align="right">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right">
            <div style="line-height: 35px; padding-right: 10px">
              <el-button v-if="comFileListStr" type="primary" plain>已上传</el-button>
              <el-button v-else type="danger" plain>未上传</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" align="left" class="border-left">
          <el-form-item label="" prop="" class="form-row add-brand-row no-border-right" style="padding-top: 15px">
            <div>
              <el-upload
                class="upload-demo"
                :limit="uploadNameNumCom/1"
                multiple
                action=""
                :http-request="submitUpload"
                :on-preview="filePreview" :on-remove="comFileRemove"
                :on-exceed="comFileExceed" :on-change="comFileOnChange" :file-list="comFileList"
                :auto-upload="false">
                <div slot="tip" class="el-upload__tip">
                  从电脑中选取文件并上传，文件命名要求：品牌名称+进口化妆品安全性承诺书；文件格式：doc./docx./pdf./jpg./jpeg./png.
                </div>
                <el-button slot="trigger" size="small" type="primary" v-show="uploadNameNumCom>0">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success"
                           @click="submitUpload('com')" :loading="isUploadingCom" v-show="uploadNameNumCom>0">上传到服务器
                </el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  const qiniu = require('qiniu-js')
  import request from "@/utils/request"
  // createNumWithRange
  import { createNumWithRange } from "@/utils/index.js"

  export default {
    computed: {
      isAllUpload() {
        return this.ingFileListStr && this.hazFileListStr && this.tagFileListStr && this.offiFileListStr && this.MEnFileListStr && this.MZhFileListStr && this.comFileListStr && true
      }
    },
    props: {
      brandNo: { required: true },
      _ingFileListStr: [String, Array],
      _hazFileListStr: [String, Array],
      _tagFileListStr: [String, Array],
      _offiFileListStr: [String, Array],
      _MEnFileListStr: [String, Array],
      _MZhFileListStr: [String, Array],
      _comFileListStr: [String, Array],
    },
    data() {
      return {
        uploadNameNumIng: 0, isUploadingIng: false, ingFileList: [], ingFileKeyList: [], ingFileListStr: '',
        uploadNameNumHaz: 0, isUploadingHaz: false, hazFileList: [], hazFileKeyList: [], hazFileListStr: '',
        uploadNameNumTag: 0, isUploadingTag: false, tagFileList: [], tagFileKeyList: [], tagFileListStr: '',
        uploadNameNumOffi: 0, isUploadingOffi: false, offiFileList: [], offiFileKeyList: [], offiFileListStr: '',
        uploadNameNumMEn: 0, isUploadingMEn: false, MEnFileList: [], MEnFileKeyList: [], MEnFileListStr: '',
        uploadNameNumMZh: 0, isUploadingMZh: false, MZhFileList: [], MZhFileKeyList: [], MZhFileListStr: '',
        uploadNameNumCom: 1, isUploadingCom: false, comFileList: [], comFileKeyList: [], comFileListStr: '',
      }
    },
    methods: {
      uploadNameNumIngChange() {this.ingFileList = []},
      uploadNameNumHazChange() {this.hazFileList = []},
      uploadNameNumTagChange() {this.tagFileList = []},
      uploadNameNumOffiChange() {this.offiFileList = []},
      uploadNameNumMEnChange() {this.MEnFileList = []},
      uploadNameNumMZhChange() {this.MZhFileList = []},
      uploadNameNumComChange() {this.comFileList = []},

      filePreview(file) {
        // 点击时的预览功能
        window.open(file.url)
      },

      ingFileRemove(file, fileList) {this.ingFileList = fileList},
      hazFileRemove(file, fileList) {this.hazFileList = fileList},
      tagFileRemove(file, fileList) {this.tagFileList = fileList},
      offiFileRemove(file, fileList) {this.offiFileList = fileList},
      MEnFileRemove(file, fileList) {this.MEnFileList = fileList},
      MZhFileRemove(file, fileList) {this.MZhFileList = fileList},
      comFileRemove(file, fileList) {this.comFileList = fileList},

      CheckFile(indexName, str) {
        let strRegex = null //用于验证文件扩展名的正则表达式

        if (indexName=='ing') {strRegex = "(.doc|.docx|.xls|.xlsx|.csv|.pdf|.jpg|.jpeg|.png)$";}
        else if (indexName=='haz') {strRegex = "(.doc|.docx|.xls|.xlsx|.csv|.pdf|.jpg|.jpeg|.png)$";}
        else if (indexName=='tag') {strRegex = "(.pdf|.jpg|.jpeg|.png)$";}
        else if (indexName=='offi') {strRegex = "(.doc|.docx|.xls|.xlsx|.csv|.pdf|.jpg|.jpeg|.png)$";}
        else if (indexName=='MEn') {strRegex = "(.doc|.docx|.xls|.xlsx|.csv|.pdf|.jpg|.jpeg|.png)$";}
        else if (indexName=='MZh') {strRegex = "(.doc|.docx|.xls|.xlsx|.csv|.pdf|.jpg|.jpeg|.png)$";}
        else if (indexName=='com') {strRegex = "(.doc|.docx|.pdf|.jpg|.jpeg|.png)$";}

        let re = new RegExp(strRegex);

        if (re.test(str)){ return true }
        else{
          this.$confirm(`只能上传该栏目指定格式文件`, { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
          return false
        }
      },
      ingFileOnChange(file, fileList) {
        if (!this.CheckFile('ing', file.name)) {
          fileList.splice(fileList.length-1, 1)
          this.ingFileList = fileList;
          return false
        }
        this.ingFileList = fileList;
      },
      hazFileOnChange(file, fileList) {
        if (!this.CheckFile('haz', file.name)) {
          fileList.splice(fileList.length-1, 1)
          this.hazFileList = fileList;
          return false
        }
        this.hazFileList = fileList
      },
      tagFileOnChange(file, fileList) {
        if (!this.CheckFile('tag', file.name)) {
          fileList.splice(fileList.length-1, 1)
          this.tagFileList = fileList;
          return false
        }
        this.tagFileList = fileList
      },
      offiFileOnChange(file, fileList) {
        if (!this.CheckFile('offi', file.name)) {
          fileList.splice(fileList.length-1, 1)
          this.offiFileList = fileList;
          return false
        }
        this.offiFileList = fileList
      },
      MEnFileOnChange(file, fileList) {
        if (!this.CheckFile('MEn', file.name)) {
          fileList.splice(fileList.length-1, 1)
          this.MEnFileList = fileList;
          return false
        }
        this.MEnFileList = fileList
      },
      MZhFileOnChange(file, fileList) {
        if (!this.CheckFile('MZh', file.name)) {
          fileList.splice(fileList.length-1, 1)
          this.MZhFileList = fileList;
          return false
        }
        this.MZhFileList = fileList
      },
      comFileOnChange(file, fileList) {
        if (!this.CheckFile('com', file.name)) {
          fileList.splice(fileList.length-1, 1)
          this.comFileList = fileList;
          return false
        }
        this.comFileList = fileList
      },

      ingFileExceed(files, fileList) {
        this.$confirm(
          // `当前限制选择 ${this.uploadNameNumIng} 个文件，`,
          '上传文件的数量已超出“上传品名数量”。请调整“上传品名数量”或进入『查看上传目录』删除多余的文件后，再重新上传。',
          { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }
        )
      },
      hazFileExceed(files, fileList) {
        this.$confirm(
          // `当前限制选择 ${this.uploadNameNumHaz} 个文件，`,
          '上传文件的数量已超出“上传品名数量”。请调整“上传品名数量”或进入『查看上传目录』删除多余的文件后，再重新上传。',
          { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }
        )
      },
      tagFileExceed(files, fileList) {
        this.$confirm(
          // `当前限制选择 ${this.uploadNameNumTag} 个文件，`,
          '上传文件的数量已超出“上传品名数量”。请调整“上传品名数量”或进入『查看上传目录』删除多余的文件后，再重新上传。',
          { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }
        )
      },
      offiFileExceed(files, fileList) {
        this.$confirm(
          // `当前限制选择 ${this.uploadNameNumOffi} 个文件，`,
          '上传文件的数量已超出“上传品名数量”。请调整“上传品名数量”或进入『查看上传目录』删除多余的文件后，再重新上传。',
          { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }
        )
      },
      MEnFileExceed(files, fileList) {
        this.$confirm(
          // `当前限制选择 ${this.uploadNameNumMEn} 个文件，`,
          '上传文件的数量已超出“上传品名数量”。请调整“上传品名数量”或进入『查看上传目录』删除多余的文件后，再重新上传。',
          { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }
        )
      },
      MZhFileExceed(files, fileList) {
        this.$confirm(
          // `当前限制选择 ${this.uploadNameNumMZh} 个文件，`,
          '上传文件的数量已超出“上传品名数量”。请调整“上传品名数量”或进入『查看上传目录』删除多余的文件后，再重新上传。',
          { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }
        )
      },
      comFileExceed(files, fileList) {
        this.$confirm(
          // `当前限制选择 ${this.uploadNameNumCom} 个文件，`,
          '该文件只需上传一份，请删除多余的文件后再进行上传。',
          { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }
        )
      },

      submitUpload(indexName) {
        this.$confirm('由于该文件会影响货物进入中国的清关收货，请务必上传正确的文件。',
          { center: true, showClose: false, closeOnClickModal: false, confirmButtonText: '确认上传', cancelButtonText: '先去确认' })
          .then(() => {
            const _this = this
            if (indexName=='ing') {_this.isUploadingIng = true}
            else if (indexName=='haz') {_this.isUploadingHaz = true}
            else if (indexName=='tag') {_this.isUploadingTag = true}
            else if (indexName=='offi') {_this.isUploadingOffi = true}
            else if (indexName=='MEn') {_this.isUploadingMEn = true}
            else if (indexName=='MZh') {_this.isUploadingMZn = true}
            else if (indexName=='com') {_this.isUploadingCom = true}

            let targetArr = []
            function uploadAction(file, index, callback) {
              
              let customedKey = createNumWithRange(6)+'.'+file.name.replace(/^.+\./,'')
              request({
                url: '/getToken',
                method: 'get'
              }).then(res => {
                let observable = qiniu.upload(file, customedKey, res.data, null, null)
                observable.subscribe({
                  next(res) {

                  },
                  error(err) {
                    console.log(err);
                  },
                  complete(res) {
                    if (index+1 == targetArr.length) {
                      if (indexName=='ing') {_this.isUploadingIng = false}
                      else if (indexName=='haz') {_this.isUploadingHaz = false}
                      else if (indexName=='tag') {_this.isUploadingTag = false}
                      else if (indexName=='offi') {_this.isUploadingOffi = false}
                      else if (indexName=='MEn') {_this.isUploadingMEn = false}
                      else if (indexName=='MZh') {_this.isUploadingMZn = false}
                      else if (indexName=='com') {_this.isUploadingCom = false}
                      _this.$confirm(
                        '文件已上传，可点击『查看上传目录』删除已上传的文件。',
                        { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false }
                      )
                    }
                    callback(res.key)
                  }
                })
              })
            }
            if (indexName == 'ing') {
              if(_this.ingFileList.length==0){
                _this.isUploadingIng=false;
                return false
              }
              targetArr = this.ingFileList
              this.ingFileList.forEach((item, _index) => {
                uploadAction(item.raw, _index, key => {
                  _this.ingFileKeyList.push(`http://asset.wormir.com/${key}^_^${item.raw.name}`)
                  _this.ingFileListStr = _this.ingFileKeyList.join()
                  _this.$emit('handleUploadFiles', _this.ingFileListStr, _this.hazFileListStr, _this.tagFileListStr, _this.offiFileListStr,
                    _this.MEnFileListStr, _this.MZhFileListStr, _this.comFileListStr, _this.isAllUpload)

                  this.$request({
                    url: '/brand/addBrandClearanceFile.do',
                    method: "post",
                    data: {
                      brandNo: this.brandNo,
                      fileUrl: `http://asset.wormir.com/${key}`,
                      fileName: item.raw.name,
                      type: 1,
                    }
                  })
                })
              })
            }
            else if (indexName == 'haz') {
              if(_this.hazFileList.length==0){
                _this.isUploadingHaz=false;
                return false
              }
              targetArr = this.hazFileList
              this.hazFileList.forEach((item, _index) => {
                uploadAction(item.raw, _index, key => {
                  _this.hazFileKeyList.push(`http://asset.wormir.com/${key}^_^${item.raw.name}`)
                  _this.hazFileListStr = _this.hazFileKeyList.join()
                  _this.$emit('handleUploadFiles', _this.ingFileListStr, _this.hazFileListStr, _this.tagFileListStr, _this.offiFileListStr,
                    _this.MEnFileListStr, _this.MZhFileListStr, _this.comFileListStr, _this.isAllUpload)
                  this.$request({
                    url: '/brand/addBrandClearanceFile.do',
                    method: "post",
                    data: {
                      brandNo: this.brandNo,
                      fileUrl: `http://asset.wormir.com/${key}`,
                      fileName: item.raw.name,
                      type: 2,
                    }
                  })
                })
              })
            }
            else if (indexName == 'tag') {
              if(_this.tagFileList.length==0){
                _this.isUploadingTag=false;
                return false
              }
              targetArr = this.tagFileList
              this.tagFileList.forEach((item, _index) => {
                uploadAction(item.raw, _index, key => {
                  _this.tagFileKeyList.push(`http://asset.wormir.com/${key}^_^${item.raw.name}`)
                  _this.tagFileListStr = _this.tagFileKeyList.join()
                  _this.$emit('handleUploadFiles', _this.ingFileListStr, _this.hazFileListStr, _this.tagFileListStr, _this.offiFileListStr,
                    _this.MEnFileListStr, _this.MZhFileListStr, _this.comFileListStr, _this.isAllUpload)
                  this.$request({
                    url: '/brand/addBrandClearanceFile.do',
                    method: "post",
                    data: {
                      brandNo: this.brandNo,
                      fileUrl: `http://asset.wormir.com/${key}`,
                      fileName: item.raw.name,
                      type: 3,
                    }
                  })
                })
              })
            }
            else if (indexName == 'offi') {
              if(_this.offiFileList.length==0){
                _this.isUploadingOffi=false;
                return false
              }
              targetArr = this.offiFileList
              this.offiFileList.forEach((item, _index) => {
                uploadAction(item.raw, _index, key => {
                  _this.offiFileKeyList.push(`http://asset.wormir.com/${key}^_^${item.raw.name}`)
                  _this.offiFileListStr = _this.offiFileKeyList.join()
                  _this.$emit('handleUploadFiles', _this.ingFileListStr, _this.hazFileListStr, _this.tagFileListStr, _this.offiFileListStr,
                    _this.MEnFileListStr, _this.MZhFileListStr, _this.comFileListStr, _this.isAllUpload)
                  this.$request({
                    url: '/brand/addBrandClearanceFile.do',
                    method: "post",
                    data: {
                      brandNo: this.brandNo,
                      fileUrl: `http://asset.wormir.com/${key}`,
                      fileName: item.raw.name,
                      type: 4,
                    }
                  })
                })
              })
            }
            else if (indexName == 'MEn') {
              if(_this.MEnFileList.length==0){
                _this.isUploadingMEn=false;
                return false
              }
              targetArr = this.MEnFileList
              this.MEnFileList.forEach((item, _index) => {
                uploadAction(item.raw, _index, key => {
                  _this.MEnFileKeyList.push(`http://asset.wormir.com/${key}^_^${item.raw.name}`)
                  _this.MEnFileListStr = _this.MEnFileKeyList.join()
                  _this.$emit('handleUploadFiles', _this.ingFileListStr, _this.hazFileListStr, _this.tagFileListStr, _this.offiFileListStr,
                    _this.MEnFileListStr, _this.MZhFileListStr, _this.comFileListStr, _this.isAllUpload)
                  this.$request({
                    url: '/brand/addBrandClearanceFile.do',
                    method: "post",
                    data: {
                      brandNo: this.brandNo,
                      fileUrl: `http://asset.wormir.com/${key}`,
                      fileName: item.raw.name,
                      type: 5,
                    }
                  })
                })
              })
            }
            else if (indexName == 'MZh') {
              if(_this.MZhFileList.length==0){
                _this.isUploadingMZn=false;
                return false
              }
              targetArr = this.MZhFileList
              this.MZhFileList.forEach((item, _index) => {
                uploadAction(item.raw, _index, key => {
                  _this.MZhFileKeyList.push(`http://asset.wormir.com/${key}^_^${item.raw.name}`)
                  _this.MZhFileListStr = _this.MZhFileKeyList.join()
                  _this.$emit('handleUploadFiles', _this.ingFileListStr, _this.hazFileListStr, _this.tagFileListStr, _this.offiFileListStr,
                    _this.MEnFileListStr, _this.MZhFileListStr, _this.comFileListStr, _this.isAllUpload)
                  this.$request({
                    url: '/brand/addBrandClearanceFile.do',
                    method: "post",
                    data: {
                      brandNo: this.brandNo,
                      fileUrl: `http://asset.wormir.com/${key}`,
                      fileName: item.raw.name,
                      type: 6,
                    }
                  })
                })
              })
            }
            else if (indexName == 'com') {
              if(_this.comFileList.length==0){
                _this.isUploadingCom=false;
                return false
              }
              targetArr = this.comFileList
              this.comFileList.forEach((item, _index) => {
                uploadAction(item.raw, _index, key => {
                  _this.comFileKeyList.push(`http://asset.wormir.com/${key}^_^${item.raw.name}`)
                  _this.comFileListStr = _this.comFileKeyList.join()
                  _this.$emit('handleUploadFiles', _this.ingFileListStr, _this.hazFileListStr, _this.tagFileListStr, _this.offiFileListStr,
                    _this.MEnFileListStr, _this.MZhFileListStr, _this.comFileListStr, _this.isAllUpload)
                  this.$request({
                    url: '/brand/addBrandClearanceFile.do',
                    method: "post",
                    data: {
                      brandNo: this.brandNo,
                      fileUrl: `http://asset.wormir.com/${key}`,
                      fileName: item.raw.name,
                      type: 7,
                    }
                  })
                })
              })
            }
          })
          .catch(() => {})
      },
      deleteAlreadyUploadFile(url) {
        console.log(url)
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request({
            url: '/brand/deleteAlreadyUpload.do',
            method: "post",
            data: { url: url }
          }).then(res => {
            console.log(res)
            if (res.errorCode==0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }).catch(() => {})

        })
      }
    },
    created() {
      if (this._ingFileListStr && this._hazFileListStr && this._tagFileListStr && this._offiFileListStr && this._MEnFileListStr && this._MZhFileListStr && this._comFileListStr) {
        this.ingFileListStr = this._ingFileListStr
        this.hazFileListStr = this._hazFileListStr
        this.tagFileListStr = this._tagFileListStr
        this.offiFileListStr = this._offiFileListStr
        this.MEnFileListStr = this._MEnFileListStr
        this.MZhFileListStr = this._MZhFileListStr
        this.comFileListStr = this._comFileListStr
      }
    }
  }
</script>

<style lang="scss" scoped>
  .uploadItem {
    border-right: 1px solid #D5D5D5;
  }

  .uploadItem:not(:nth-of-type(1)) {
    margin: 20px 0;
    border-top: 1px solid #D5D5D5;
  }
  .form-row {
    margin: 0;
  }

  .form-row .el-input {
    margin: 3px;
    width: 98%;
  }

  .form-row .el-form-item__label {
    height: 35px;
  }

  .delete-btn {
    color: red;
  }
  .delete-btn:hover {
    cursor: pointer;
  }
</style>
