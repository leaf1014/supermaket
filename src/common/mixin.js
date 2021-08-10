import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return{
      ListenerImgLoad:null,
      refresh:null
    }
  },

  mounted(){
    this.refresh = debounce(this.$refs.scroll.imgRefresh,200)
    this.ListenerImgLoad=()=>{this.refresh()}
    this.$bus.$on('imgLoad',this.ListenerImgLoad)
    console.log('wwwwwww')
  }
}
