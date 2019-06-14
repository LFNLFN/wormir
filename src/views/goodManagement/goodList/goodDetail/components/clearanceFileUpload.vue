<template>
  <div class="clearance-file-upload-vue">
    <div v-if="scope.row.type==1">
      <a :href="item.url" v-for="(item,index) in ingredientArr">{{ item.fileName }}</a>
    </div>
    <div v-if="scope.row.type==2">
      <a :href="item.url" v-for="(item,index) in hazardArr">{{ item.fileName }}</a>
    </div>
    <div v-if="scope.row.type==3">
      <a :href="item.url" v-for="(item,index) in tagArr">{{ item.fileName }}</a>
    </div>
    <div v-if="scope.row.type==4">
      <a :href="item.url" v-for="(item,index) in officialArr">{{ item.fileName }}</a>
    </div>
    <div v-if="scope.row.type==5">
      <a :href="item.url" v-for="(item,index) in MSDSenArr">{{ item.fileName }}</a>
    </div>
    <div v-if="scope.row.type==6">
      <a :href="item.url" v-for="(item,index) in MSDSzhArr">{{ item.fileName }}</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      scope: { required: true, type: Object,  },
      brandNo: { required: true,  },
      ingredientArr: { required: true, },
      hazardArr: { required: true, },
      tagArr: { required: true,  },
      officialArr: { required: true, },
      MSDSenArr: { required: true,  },
      MSDSzhArr: { required: true, },
    },
    data() {
      return {
        ingredientOption: [],
        hazardOption: [],
        tagOption: [],
        officialOption: [],
        MSDSenOption: [],
        MSDSzhOption: [],
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
