<template>
  <div id="home">
    <nav-bar class="homeNavBar"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl1"
                 class="tab-control1" v-show="isTabFixed"></tab-control>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <show-popular></show-popular>
      <tab-control :titles="['流行','新款','精选']"
        @tabClick="tabClick" ref="tabControl2" v-show="!isTabFixed"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </Scroll>
    <back-top @click.native="backClick" v-show="isDisplay"></back-top>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
      <li>列表51</li>
      <li>列表52</li>
      <li>列表53</li>
      <li>列表54</li>
      <li>列表55</li>
      <li>列表56</li>
      <li>列表57</li>
      <li>列表58</li>
      <li>列表59</li>
      <li>列表60</li>
      <li>列表61</li>
      <li>列表62</li>
      <li>列表63</li>
      <li>列表64</li>
      <li>列表65</li>
      <li>列表66</li>
      <li>列表67</li>
      <li>列表68</li>
      <li>列表69</li>
      <li>列表70</li>
      <li>列表71</li>
      <li>列表72</li>
      <li>列表73</li>
      <li>列表74</li>
      <li>列表75</li>
      <li>列表76</li>
      <li>列表77</li>
      <li>列表78</li>
      <li>列表79</li>
      <li>列表80</li>
      <li>列表81</li>
      <li>列表82</li>
      <li>列表83</li>
      <li>列表84</li>
      <li>列表85</li>
      <li>列表86</li>
      <li>列表87</li>
      <li>列表88</li>
      <li>列表89</li>
      <li>列表90</li>
      <li>列表91</li>
      <li>列表92</li>
      <li>列表93</li>
      <li>列表94</li>
      <li>列表95</li>
      <li>列表96</li>
      <li>列表97</li>
      <li>列表98</li>
      <li>列表99</li>
      <li>列表100</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/context/tabControl/TabControl";
import GoodsList from "../../components/context/goods/GoodsList";
import GoodsListItem from "../../components/context/goods/GoodsListItem";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/context/backTop/BackTop";
import {itemListenerMixin} from "../../common/mixin";


import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import ShowPopular from "./childComps/ShowPopular";

import {getHomeMultiData,getHomeGoods} from "../../network/home";


export default {
  name: "Home",
  data(){
    return{
      isDisplay:false,
      banner:[],
      recommend:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      tabOffsetTop:null,
      isTabFixed:false,
      saveY:0
    }
  },

  mixins:[itemListenerMixin],

  components:{
    NavBar,
    HomeSwiper,
    HomeRecommend,
    ShowPopular,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    BackTop
  },

  created() {
    this.getHomeMultiData()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },

  activated() {
    this.$refs.scroll.scrollToTop(0,this.saveY,1)
    this.$refs.scroll.imgRefresh()
  },

  deactivated() {
    this.saveY=this.$refs.scroll.scroll.y
    console.log(this.saveY)
    this.$bus.$off('imgLoad',this.ListenerImgLoad)
  },

  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    /*
    * 事件监听
    * */
    tabClick(index){
      if(index===1){
        this.currentType='pop'
      }else if(index===2){
        this.currentType='new'
      }else{
        this.currentType='sell'
      }
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    backClick() {
      this.$refs.scroll.scrollToTop(0,0)
      console.log('rilegou')
    },
    contentScroll(position){
      this.isDisplay=position.y<-800
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.imgRefresh()
    },
    swiperImgLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop-40
    },
    /*
    * 网络请求
    * */
    getHomeMultiData(){
      getHomeMultiData().then(res =>{
        this.banner = res.data.data.banner.list
        this.recommend = res.data.data.recommend.list
      })
    },

    getHomeGoods(type){
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page+=1
        this.$refs.scroll.finishUp()
      })
    }
  }
}
</script>

<style scoped>
#home{
  height: 100vh;
}

.homeNavBar{
  background-color: var(--color-tint);
  color: #f6f6f6;
}


.content{
  height: 100%;
  overflow: hidden;
}

.tab-control1{
  position: relative;
  z-index: 9;
}
</style>
