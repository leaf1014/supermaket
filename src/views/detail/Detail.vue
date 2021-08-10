<template>
  <div id="detail" name="Detail">
    <detail-nav-bar class="detail-nav" @indexClick="indexClick" ref="detailNav"></detail-nav-bar>
    <scroll class="content" ref="scroll"
              :pull-up-load="true" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :topImage="topImage"></detail-swiper>
        <detail-base-info :detail-goods="detailGoods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @goodsLoad="goodsLoad"></detail-goods-info>
        <detail-param-info ref="detailParams" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="detailComment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list :goods="recommendList" ref="detailGoods"></goods-list>
      </scroll>
    <detail-tool-bar class="tool-bar" @addToCart="addToCart"></detail-tool-bar>
    <back-top @click.native="backClick" v-show="isDisplay"></back-top>
    <come-to-cart @click.native="cartClick"></come-to-cart>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail,DetailGoods,Shop,GoodsParam,getRecommend} from "../../network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/context/goods/GoodsList";
import DetailToolBar from "./childComps/DetailToolBar";
import BackTop from "../../components/context/backTop/BackTop";
import ComeToCart from "../../components/context/backTop/ComeToCart";

import DetailSwiper from "./childComps/DetailSwiper";

import Scroll from "../../components/common/scroll/Scroll";
import {itemListenerMixin} from "../../common/mixin";
import {debounce} from "../../common/utils";


export default {
  name: "Detail",
  components: {
    DetailGoodsInfo,
    DetailShopInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailToolBar,
    BackTop,
    ComeToCart,
   },
  data(){
    return{
      iid:null,
      topImage:[],
      detailGoods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendList: [],
      themeTopY:[],
      getThemeTopY:null,
      currentIndex:0,
      isDisplay:false,
    }
  },

  mixins:[itemListenerMixin],

  created() {
    this.iid=this.$route.params.iid

    getDetail(this.iid).then(res =>{
      const data = res.data.result
      this.topImage=data.itemInfo.topImages
      this.detailGoods=new DetailGoods(data.itemInfo,data.columns,data.shopInfo.services)

      this.shop=new Shop(data.shopInfo)

      this.detailInfo = data.detailInfo

      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })
    getRecommend().then((res, error) => {
      if (error) return
      this.recommendList = res.data.data.list
    })

    this.getThemeTopY = debounce(() =>{
      this.themeTopY=[]
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.detailParams.$el.offsetTop)
      this.themeTopY.push(this.$refs.detailComment.$el.offsetTop)
      this.themeTopY.push(this.$refs.detailGoods.$el.offsetTop)
      this.themeTopY.push(Number.MAX_VALUE)
      console.log(this.themeTopY)
    },500)
  },

  destroyed(){
    this.$bus.$off('imgLoad',this.ListenerImgLoad)
  },

  methods:{
    indexClick(index){
      console.log(this.themeTopY[index])
      this.$refs.scroll.scrollToTop(0,-this.themeTopY[index],500)
    },
    goodsLoad(){
      this.refresh()
      this.getThemeTopY()
    },
    contentScroll(position) {
      this.isDisplay=position.y<-800
      const positionY = -position.y
      let length = this.themeTopY.length
      for(let i =0 ; i < length-1 ; i++){
        if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i+1])){
          this.currentIndex = i
          console.log(this.currentIndex)
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }
    },
    backClick() {
      this.$refs.scroll.scrollToTop(0,0)
      console.log('rilegou')
    },

    cartClick(){
      this.$router.replace('/cart')
    },

    addToCart() {
      const product = {}
      product.image = this.topImage[0]
      product.title = this.detailGoods.title
      product.desc = this.detailGoods.desc
      product.price = this.detailGoods.realPrice
      product.iid = this.iid

      this.$store.dispatch('addToCart',product)
        .then(res => {
          this.$toast.show(res,2000)
        })


      this.$message({
        message: '成功添加至购物车',
        type: 'success',
        duration:2000,
        center:true
      })


    }
    },
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}

.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}


</style>
