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
  this.categorySetting.splice(index+1, 1, {mainIndex: null,mainName: null,subIndex: null,subName: null})
  this.form.categorySetting.splice(index+1, 1, {mainIndex: null,mainName: null,subIndex: null,subName: null})
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

export function addMainCategory() {
  this.categorySetting.push({mainIndex: null,mainName: null,subIndex: null,subName: null})
  this.form.categorySetting.push({mainIndex: null,mainName: null,subIndex: null,subName: null})
  const len = this.form.categorySetting.length
  this.form.categorySetting[len-1].mainIndex = this.form.categorySetting[len-2].mainIndex + 1
  this.form.categorySetting[len-1].subIndex = 0
  this.getSpanArr(this.form.categorySetting)
}

export function deleteMainCategory(mainIndex) {
  let startIndex = null
  this.form.categorySetting.some((item,index) => {
    if (item.mainIndex == mainIndex) {
      startIndex = index
      return true
    } else { return false }
  })
  let endIndex = null
  let len = this.form.categorySetting.length
  for (var i=startIndex+1; i<len; i++) {
    if (this.form.categorySetting[i].mainIndex!=mainIndex) {
      endIndex = i;break
    }
  }
  if (!endIndex) {
    this.form.categorySetting.splice(startIndex, len-startIndex)
    this.categorySetting.splice(startIndex, len-startIndex)
  }
  this.getSpanArr(this.form.categorySetting)
}

export function addFlow(index) {
  this.occSpecialSetting.push({flowName: null, flowIndex: 0})
  this.form.occSpecialSetting.push({flowName: null, flowIndex: 0})
  this.form.occSpecialSetting[index+1].flowIndex = this.form.occSpecialSetting[index].flowIndex+1
}

export function deleteFlow(index) {
  this.occSpecialSetting.splice(index, 1)
  this.form.occSpecialSetting.splice(index, 1)
}
