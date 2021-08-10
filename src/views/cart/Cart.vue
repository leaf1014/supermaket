<template>
  <div  id="cart" class="cart" ref="aaa">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll :pull-up-load="true" ref="scroll" class="content">
      <cart-list class="cart-list"></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import Scroll from "../../components/common/scroll/Scroll";
import CartBottomBar from "./childComps/CartBottomBar";

import {mapGetters} from "vuex"

export default {
  name: "Cart",
  data(){
    return{
      msg:5
    }
  },
  components:{
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed:{
    ...mapGetters(['cartLength'])
  },
  activated() {
    this.$refs.scroll.imgRefresh()
  }
}
</script>
<style scoped>
#cart{
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content{
  height: calc(100% - 49px - 44px - 40px);
  overflow: hidden;
}
</style>
