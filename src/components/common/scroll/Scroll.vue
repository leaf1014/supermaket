<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll:null,
    }
  },
  mounted() {
    this.scroll =
      new BScroll
      (this.$refs.wrapper,{
        observeDOM:true,
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })

    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollToTop(x,y,time=3000){
      console.log('返回'+y)
      this.scroll.scrollTo(x,y,time)
    },
    finishUp(){
      this.scroll.finishPullUp()
    },
    imgRefresh(){
      this.scroll.refresh()
      console.log('wtf')
    }
  }
}
</script>

<style scoped>

</style>
