<template>
  <grid-view>
    <goods-list-item v-for="(item,index) in detailGoods.data" :key="index" :goodsItem="item"></goods-list-item>
  </grid-view>
</template>

<script>
import GoodsListItem from "../../../components/context/goods/GoodsListItem";
import GridView from "../../../components/common/gridView/GridView";

export default {
  name: "CategoryDetail",
  props:{
    detailGoods:{}
  },
  components:{
    GoodsListItem,
    GridView
  }
}
</script>

<style scoped>

</style>
