let settingMsg = {
  categorySetting: [{mainIndex: 0,mainName: null,subIndex: 0,subName: null}],
  occSpecialSetting: [{flowName: null, flowIndex: 0}]
}

export default settingMsg

export function getSpanArr(data) {
  this.spanArr = []
  for (var i = 0; i < data.length; i++) {
    if (i === 0) {
      this.spanArr.push(1)
      this.pos = 0
    } else {
      // 判断当前元素与上一个元素是否相同
      if (data[i].mainIndex === data[i - 1].mainIndex) {
        this.spanArr[this.pos] += 1
        this.spanArr.push(0)
      } else {
        this.spanArr.push(1)
        this.pos = i
      }
    }
  }
}
export function categorySettingSpanMethod({ row, column, rowIndex, columnIndex }) {
  if (this.spanArr.length==0) { return false }
  if (columnIndex == 0 || columnIndex == 1) {
    const _row = this.spanArr[rowIndex]
    const _col = _row >= 0 ? 1 : 0
    return {
      rowspan: _row,
      colspan: _col
    }
  }
}

export function addSubCategory(index) {
  let len = this.categorySetting.length
  if (!this.categorySetting[len-1].mainName) {
    this.$message.error('请先完成主品类的填写'); return false
  }
  this.categorySetting.splice(index+1, 0, {mainIndex: null,mainName: null,subIndex: null,subName: null})
  this.form.categorySetting.splice(index+1, 0, {mainIndex: null,mainName: null,subIndex: null,subName: null})
  this.form.categorySetting[index+1].mainIndex = this.form.categorySetting[index].mainIndex
  this.form.categorySetting[index+1].mainName = this.form.categorySetting[index].mainName
  this.form.categorySetting[index+1].subIndex = this.form.categorySetting[index].subIndex+1
  this.getSpanArr(this.form.categorySetting)
}

export function deleteSubCategory(index) {
  this.categorySetting.splice(index, 1)
  this.form.categorySetting.splice(index, 1)
  this.getSpanArr(this.form.categorySetting)
}

export function addMainCategory(index) {
  this.$confirm('确认增加?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$request({
      url: '/user/addAccountGoodMainCategory.do',
      method: "post",
      data: {
        account: this.form.account,
        mainName: null,
        mainIndex: 0,
        subName: null,
        subIndex: 0,
        itemIndex: index+1
      }
    }).then(res => {
      if (res.errorCode == 0) {
        this.categorySetting.splice(index+1, 0, {mainIndex: null,mainName: null,subIndex: null,subName: null})
        this.form.categorySetting.splice(index+1, 0, {mainIndex: null,mainName: null,subIndex: null,subName: null})
        const len = this.form.categorySetting.length
        this.form.categorySetting[len-1].mainIndex = this.form.categorySetting[len-2].mainIndex + 1
        this.form.categorySetting[len-1].subIndex = 0
        this.getSpanArr(this.form.categorySetting)
        this.$message({ type: 'success', message: '增加成功!' });
      } else {
        this.$message({ type: 'error', message: '增加失败!请重试。' });
      }
    })
  })
}

export function deleteMainCategory(mainIndex) {

  this.$confirm('确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$request({
      url: '/user/deleteAccountGoodMainCategory.do',
      method: "post",
      data: { account: this.form.account, mainIndex: mainIndex }
    }).then(res => {
      if (res.errorCode == 0) {
        let startIndex = null
        this.form.categorySetting.some((item,index) => {
          if (item.mainIndex == mainIndex) {
            startIndex = index
            return true
          } else { return false }
        })
        let endIndex = null
        let len = this.form.categorySetting.length
        for (var i=startIndex; i<len; i++) {
          if (i==len-1) {
              endIndex = i
          }
          if (this.form.categorySetting[i].mainIndex!=mainIndex) {
            endIndex = i;break
          }
        }
        if (endIndex-startIndex>=0) {
          if (endIndex-startIndex==0) {
            this.form.categorySetting.splice(endIndex, 1)
            this.categorySetting.splice(endIndex, 1)
          } else {
            this.form.categorySetting.splice(startIndex, endIndex-startIndex)
            this.categorySetting.splice(startIndex, endIndex-startIndex)
          }
        }
        this.getSpanArr(this.form.categorySetting)
        this.$message({ type: 'success', message: '删除成功!' });
      } else {
        this.$message({ type: 'error', message: '删除失败!请重试。' });
      }
    })
  })
}

export function addFlow(index) {
  this.$confirm('确认增加?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$request({
      url: '/user/addOccSpecial.do',
      method: "post",
      data: {
        account: this.form.account,
        flowName: null,
        flowIndex: index+1,
        itemIndex: index+1
      }
    }).then(res => {
      if (res.errorCode == 0) {
        this.occSpecialSetting.splice(index+1, 0, {flowName: null, flowIndex: index+1})
        this.form.occSpecialSetting.splice(index+1, 0, {flowName: null, flowIndex: index+1})
        this.form.occSpecialSetting[index+1].flowIndex = this.form.occSpecialSetting[index].flowIndex+1
        this.$message({ type: 'success', message: '增加成功!' });
      } else {
        this.$message({ type: 'error', message: '增加失败!请重试。' });
      }
    })
  })
}

export function deleteFlow(index) {
  this.$confirm('确认删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$request({
      url: '/user/deleteOccSpecial.do',
      method: "post",
      data: { account: this.form.account, itemIndex: index }
    }).then(res => {
      if (res.errorCode == 0) {
        this.occSpecialSetting.splice(index, 1)
        this.form.occSpecialSetting.splice(index, 1)
        this.$message({ type: 'success', message: '删除成功!' });
      } else {
        this.$message({ type: 'error', message: '删除失败!请重试。' });
      }
    })
  })
}
