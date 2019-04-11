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
  if (type==1) {this.form.ingredientArr.push({})}
  if (type==2) {this.form.hazardArr.push({})}
  if (type==3) {this.form.tagArr.push({})}
  if (type==4) {this.form.officialArr.push({})}
  if (type==5) {this.form.MSDSenArr.push({})}
  if (type==6) {this.form.MSDSzhArr.push({})}
}

export function deleteFile(type) {
  if (type==1) {let len = this.form.ingredientArr.length;if (len==1) return false;this.form.ingredientArr.splice(len-1, 1)}
  if (type==2) {let len = this.form.hazardArr.length;if (len==1) return false;this.form.hazardArr.splice(len-1, 1)}
  if (type==3) {let len = this.form.tagArr.length;if (len==1) return false;this.form.tagArr.splice(len-1, 1)}
  if (type==4) {let len = this.form.officialArr.length;if (len==1) return false;this.form.officialArr.splice(len-1, 1)}
  if (type==5) {let len = this.form.MSDSenArr.length;if (len==1) return false;this.form.MSDSenArr.splice(len-1, 1)}
  if (type==6) {let len = this.form.MSDSzhArr.length;if (len==1) return false;this.form.MSDSzhArr.splice(len-1, 1)}
}

export function validateFile() {
  if (!this.form.ingredientArr[0].fileName || !this.form.hazardArr[0].fileName || !this.form.tagArr[0].fileName || !this.form.officialArr[0].fileName || !this.form.MSDSenArr[0].fileName || !this.form.MSDSzhArr[0].fileName) {
    this.$confirm(`清关文件部分尚有未完成选择的项目，请完成后再提交。`, { center: true, showClose: false, showCancelButton: false, closeOnClickModal: false })
    return false
  } else { return true }
}
