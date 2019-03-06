let uploadMsg = {
  ingredientForm: [],
  hazardForm: [],
  tagFile: [],
  officialDocuments: [],
  MSDSEn: [],
  MSDSZh: [],
  commitment: [],
  uploadTemplateData: [
    { title: '成分配比表', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+成分配表；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
    { title: '危害识别表', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+危害识别表；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
    { title: '标签文件', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+标签文件；文件格式：pdf./jpg./jpeg./png.', fileList: [] },
    { title: '化妆品备案批文', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+化妆品备案批文；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
    { title: 'MSDS（英文）', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+MSDS（英文）；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
    { title: 'MSDS（中文）', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+MSDS（中文）；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [] },
    { title: '进口化妆品安全性承诺书', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：品牌名称+进口化妆品安全性承诺书；文件格式：doc./docx./pdf./jpg./jpeg./png.', fileList: [] },
  ]
}

export function submitUpload(index) {
  // if (!this.$refs.upload[index]) {
  //   this.$confirm('请确保已选中文件再进行上传。', { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
  //   return false
  // } else {
  //   this.$refs.upload[index].submit()
  // }
  this.$refs.upload[index].submit()
}
export function fileRemove(file, fileList) {
  console.log(file, fileList);
}
export function filePreview(file) {
  console.log(file);
}
export function fileExceed(files, fileList) {
  this.$confirm('上传文件的数量已超出“上传品名数量”。请调整“上传品名数量”或进入『查看上传目录』删除多余的文件后，再重新上传。', { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
}

export function getUploadMsg() {
  this.form.uploadTemplateData = this.uploadTemplateData
}

export function fileBeforeUpload(file) {
  console.log(file)
}

export function fileOnChange(file, fileList) {
  console.log(file)
  console.log(fileList)
}

export function changeItemUploadNameNum(val) {
  if (val == 0) {
    this.itemUploadNameNumIs0 = true
  } else {
    this.itemUploadNameNumIs0 = false
    window.setTimeout(() => {
      this.editItemUploadNameNum = !this.editItemUploadNameNum
    }, 10)
    window.setTimeout(() => {
      this.editItemUploadNameNum = !this.editItemUploadNameNum
    }, 15)
  }
}


export default uploadMsg
