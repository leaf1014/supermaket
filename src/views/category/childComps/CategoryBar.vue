<template>
  <div id="category-bar">
    <div class="category-info"
         v-for="(item,index) in categories"
         :class="{active:index === currentIndex}"
         @click="itemClick(index)">
      {{item.title}}
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryBar",
  props:{
    categories:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },

  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('itemClick',index)
    }
  }
}

</script>

<style scoped>
#category-bar{
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}

.category-info{
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.active{
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>
