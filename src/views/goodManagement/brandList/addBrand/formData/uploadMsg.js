const qiniu = require('qiniu-js')
import request from "@/utils/request"

let uploadMsg = {
  ingredientForm: [],
  ingredientFormStr: [],
  _ingredientForm: [],
  hazardForm: [],
  hazardFormStr: [],
  _hazardForm: [],
  tagFile: [],
  tagFileStr: [],
  _tagFile: [],
  officialDocuments: [],
  officialDocumentsStr: [],
  _officialDocuments: [],
  MSDSEn: [],
  MSDSEnStr: [],
  _MSDSEn: [],
  MSDSZh: [],
  MSDSZhStr: [],
  _MSDSZh: [],
  commitment: [],
  commitmentStr: [],
  _commitment: [],
  uploadTemplateData: [
    { title: '成分配比表', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+成分配表；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [], editItemUploadNameNum: true },
    { title: '危害识别表', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+危害识别表；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [], editItemUploadNameNum: true },
    { title: '标签文件', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+标签文件；文件格式：pdf./jpg./jpeg./png.', fileList: [], editItemUploadNameNum: true },
    { title: '化妆品备案批文', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+化妆品备案批文；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [], editItemUploadNameNum: true },
    { title: 'MSDS（英文）', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+MSDS（英文）；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [], editItemUploadNameNum: true },
    { title: 'MSDS（中文）', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：商品品名+MSDS（中文）；文件格式：doc./docx./xls./xlsx./csv./pdf./jpg./jpeg./png.', fileList: [], editItemUploadNameNum: true },
    { title: '进口化妆品安全性承诺书', uploadNameNum: 0, uploadTip: '从电脑中选取文件并上传，文件命名要求：品牌名称+进口化妆品安全性承诺书；文件格式：doc./docx./pdf./jpg./jpeg./png.', fileList: [], editItemUploadNameNum: true },
  ],
  isAllUpload: false
}

export function submitUpload(index, form, message) {
  function uploadAction(file, callback) {
    request({
      url: '/getToken',
      method: 'get'
    }).then(res => {
      let observable = qiniu.upload(file, null, res.data, null, null)
      observable.subscribe({
        next(res) {
          console.log(res,123);
          message.success('上传成功')
        },
        error(err) {
          console.log(err,456)
        },
        complete(res) {
          console.log(res,789);
          callback(res.key)
        }
      })
    })
  }
  switch(index)
  {
    case 0:
      form.ingredientForm = window.___ingredientForm
      form.ingredientForm.forEach(item => {
        uploadAction(item.raw, key => {
          form._ingredientForm.push(`http://asset.wormir.com/${key}`)
          form.ingredientFormStr = form._ingredientForm.join()
        })
      })
      break;
    case 1:
      form.hazardForm = window.___hazardForm
      form.hazardForm.forEach(item => {
        uploadAction(item.raw, key => {
          form._hazardForm.push(`http://asset.wormir.com/${key}`)
          form.hazardFormStr = form._hazardForm.join()
        })
      })
      break;
    case 2:
      form.tagFile = window.___tagFile
      form.tagFile.forEach(item => {
        uploadAction(item.raw, key => {
          form._tagFile.push(`http://asset.wormir.com/${key}`)
          form.tagFileStr = form._tagFile.join()
        })
      })
      break;
    case 3:
      form.officialDocuments = window.___officialDocuments
      form.officialDocuments.forEach(item => {
        uploadAction(item.raw, key => {
          form._officialDocuments.push(`http://asset.wormir.com/${key}`)
          form.officialDocumentsStr = form._officialDocuments.join()
        })
      })
      break;
    case 4:
      form.MSDSEn = window.___MSDSEn
      form.MSDSEn.forEach(item => {
        uploadAction(item.raw, key => {
          form._MSDSEn.push(`http://asset.wormir.com/${key}`)
          form.MSDSEnStr = form._MSDSEn.join()
        })
      })
      break;
    case 5:
      form.MSDSZh = window.___MSDSZh
      form.MSDSZh.forEach(item => {
        uploadAction(item.raw, key => {
          form._MSDSZh.push(`http://asset.wormir.com/${key}`)
          form.MSDSZhStr = form._MSDSZh.join()
        })
      })
      break;
    case 6:
      form.commitment = window.___commitment
      form.commitment.forEach(item => {
        uploadAction(item.raw, key => {
          form._commitment.push(`http://asset.wormir.com/${key}`)
          form.commitmentStr = form._commitment.join()
        })
      })
      break;
  }
  // this.$refs.upload[index].submit()
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

export function fileOnChange0(file, fileList) {
  window.___ingredientForm = fileList
}
export function fileOnChange1(file, fileList) {
  window.___hazardForm = fileList
}
export function fileOnChange2(file, fileList) {
  window.___tagFile = fileList
}
export function fileOnChange3(file, fileList) {
  window.___officialDocuments = fileList
}
export function fileOnChange4(file, fileList) {
  window.___MSDSEn = fileList
}
export function fileOnChange5(file, fileList) {
  window.___MSDSZh = fileList
}
export function fileOnChange6(file, fileList) {
  window.___commitment = fileList
}

export default uploadMsg
