<template>
  <div class="clearance-file-upload-vue">
    <div v-if="requestComplete">
      <el-select
        v-for="(_item,_index) in ingredientArr"
        v-if="scope.row.type==1"
        v-model="ingredientArr[_index]" value-key="id"
        style="margin: 3px 0"
        placeholder="请选择对应文件" @focus="requestClearanceFileIng"
      >
        <el-option
          v-for="(item,index) in ingredientOption"
          :key="index"
          :label="item.fileName"
          :value="item">
        </el-option>
      </el-select>
      <el-select
        v-for="(_item,_index) in hazardArr"
        v-if="scope.row.type==2"
        v-model="hazardArr[_index]" value-key="id"
        placeholder="请选择对应文件" @focus="requestClearanceFileHaz"
      >
        <el-option
          v-for="(item,index) in hazardOption"
          :key="index"
          :label="item.fileName"
          :value="item">
        </el-option>
      </el-select>
      <el-select
        v-for="(_item,_index) in tagArr"
        v-if="scope.row.type==3"
        v-model="tagArr[_index]" value-key="id"
        placeholder="请选择对应文件" @focus="requestClearanceFileTag"
      >
        <el-option
          v-for="(item,index) in tagOption"
          :key="index"
          :label="item.fileName"
          :value="item">
        </el-option>
      </el-select>
      <el-select
        v-for="(_item,_index) in officialArr"
        v-if="scope.row.type==4"
        v-model="officialArr[_index]" value-key="id"
        placeholder="请选择对应文件" @focus="requestClearanceFileOfficial"
      >
        <el-option
          v-for="(item,index) in officialOption"
          :key="index"
          :label="item.fileName"
          :value="item">
        </el-option>
      </el-select>
      <el-select
        v-for="(_item,_index) in MSDSenArr"
        v-if="scope.row.type==5"
        v-model="MSDSenArr[_index]" value-key="id"
        placeholder="请选择对应文件" @focus="requestClearanceFileMSDSen"
      >
        <el-option
          v-for="(item,index) in MSDSenOption"
          :key="index"
          :label="item.fileName"
          :value="item">
        </el-option>
      </el-select>
      <el-select
        v-for="(_item,_index) in MSDSzhArr"
        v-if="scope.row.type==6"
        v-model="MSDSzhArr[_index]" value-key="id"
        placeholder="请选择对应文件" @focus="requestClearanceFileMSDSzh"
      >
        <el-option
          v-for="(item,index) in MSDSzhOption"
          :key="index"
          :label="item.fileName"
          :value="item">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import { requestClearanceFileIng,requestClearanceFileHaz,requestClearanceFileTag, requestClearanceFileOfficial,requestClearanceFileMSDSen,requestClearanceFileMSDSzh } from '../function/clearanceFile'
  export default {
    props: {
      scope: { required: true, type: Object,  },
      brandNo: { required: true,  },
      ingredientArr: { required: true, type: Array },
      hazardArr: { required: true, type: Array },
      tagArr: { required: true, type: Array },
      officialArr: { required: true, type: Array },
      MSDSenArr: { required: true, type: Array },
      MSDSzhArr: { required: true, type: Array },
    },
    data() {
      return {
        ingredientOption: null,
        hazardOption: null,
        tagOption: null,
        officialOption: null,
        MSDSenOption: null,
        MSDSzhOption: null,
      }
    },
    computed: {
      requestComplete() {
        return this.ingredientOption && this.hazardOption && this.tagOption && this.officialOption && this.MSDSenOption && this.MSDSzhOption
      }
    },
    methods: {
      requestClearanceFileIng,requestClearanceFileHaz,requestClearanceFileTag,requestClearanceFileOfficial,requestClearanceFileMSDSen,requestClearanceFileMSDSzh,
    },
    created() {
      this.requestClearanceFileIng()
      this.requestClearanceFileHaz()
      this.requestClearanceFileTag()
      this.requestClearanceFileOfficial()
      this.requestClearanceFileMSDSen()
      this.requestClearanceFileMSDSzh()
    }
  }
</script>

<style lang="scss" scoped>

</style>
