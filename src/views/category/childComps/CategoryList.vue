<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="goodsList">
      <div class="categoryList" v-for="(item,index) in goodsList.list">
        <a :href="item.link">
          <img class="categoryImg" :src="item.image" alt="" @load="imgLoad">
          <div class="categoryText">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "../../../components/common/gridView/GridView";

export default {
  name: "CategoryList",
  props:{
    goodsList:{
    }
  },
  components:{
    GridView
  },
  methods:{
    imgLoad(){
      this.$emit('categoryLoad')
    }
  }
}
</script>

<style scoped>
.panel img {
  width: 100%;
}

.categoryList{
  text-align: center;
  font-size: 12px;
}

.categoryImg {
  width: 80%;
}

.categoryText{
  margin-top: 15px;
}
</style>
