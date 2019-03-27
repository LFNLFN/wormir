export function requestClearanceFileIng() {
  this.$request({
    url: '/brand/getBrandClearanceFile.do',
    method: "post",
    data: { brandNo: this.brandNo, type: 1 }
  }).then( res => {
    if (res.errorCode==0) {
      this.ingredientOption = res.data.items
    }
  })
}

export function requestClearanceFileHaz() {
  this.$request({
    url: '/brand/getBrandClearanceFile.do',
    method: "post",
    data: { brandNo: this.brandNo, type: 2 }
  }).then( res => {
    if (res.errorCode==0) {
      this.hazardOption = res.data.items
    }
  })
}

export function requestClearanceFileTag() {
  this.$request({
    url: '/brand/getBrandClearanceFile.do',
    method: "post",
    data: { brandNo: this.brandNo, type: 3 }
  }).then( res => {
    if (res.errorCode==0) {
      this.tagOption = res.data.items
    }
  })
}

export function requestClearanceFileOfficial() {
  this.$request({
    url: '/brand/getBrandClearanceFile.do',
    method: "post",
    data: { brandNo: this.brandNo, type: 4 }
  }).then( res => {
    if (res.errorCode==0) {
      this.officialOption = res.data.items
    }
  })
}

export function requestClearanceFileMSDSen() {
  this.$request({
    url: '/brand/getBrandClearanceFile.do',
    method: "post",
    data: { brandNo: this.brandNo, type: 5 }
  }).then( res => {
    if (res.errorCode==0) {
      this.MSDSenOption = res.data.items
    }
  })
}

export function requestClearanceFileMSDSzh() {
  this.$request({
    url: '/brand/getBrandClearanceFile.do',
    method: "post",
    data: { brandNo: this.brandNo, type: 6 }
  }).then( res => {
    if (res.errorCode==0) {
      this.MSDSzhOption = res.data.items
    }
  })
}

export function fileTitle(index) {
  switch (index) {
    case 1:
      return '成分配比表'
    case 2:
      return '危害识别表'
    case 3:
      return '标签文件'
    case 4:
      return '化妆品备案批文'
    case 5:
      return 'MSDS（英文）'
    case 6:
      return 'MSDS（中文）'
  }
}

export function addFile(type) {
  if (type==1) {
    this.form.ingredientArr.push({})
  }
}

export function deleteFile(type) {
  if (type==1) {
    let len = this.form.ingredientArr.length
    if (len==1) return false
    this.form.ingredientArr.splice(len-1, 1)
  }
}

export function validateFile() {
  if (!this.form.ingredientArr[0].fileName || this.form.hazardArr[0].fileName || this.form.tagArr[0].fileName || this.form.officialArr[0].fileName || this.form.MSDSenArr[0].fileName || this.form.MSDSzhArr[0].fileName) {
    this.$confirm(`清关文件部分尚有未完成选择的项目，请完成后再提交。`, { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
    return false
  }
}
