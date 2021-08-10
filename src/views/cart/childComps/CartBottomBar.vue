<template>
  <div class="bottom-bar">
    <div class="bar-check">
      <check-button
        class="check-button"
        :check-color="isSelectAll"
        @click.native="checkAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:  {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      结算
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  data(){
    return{

    }
  },
  computed:{
    ...mapGetters(['cartList']),

    totalPrice(){
      return '¥'+this.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue , item) => {
        return preValue+item.price * item.count
      },0).toFixed(2)
    },
    isSelectAll(){
      if(this.cartList.length===0){
        return false
      }else {
        return this.cartList.every(item => item.checked)
      }
    }
  },
  methods:{
    checkAll(){
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(this.cartList.every(item => item.checked === false )){
        this.$toast.show('请选择商品！',2000)
      }
    }
  },
  components:{
    CheckButton
  }
}
</script>

<style scoped>
.bottom-bar{
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;
  font-size: 20px;

  background-color: #eee;
}

.bar-check{
  align-items: center;
  display: flex;
  margin-left: 20px;
  margin-right: 30px;
}

.price{
  width: 100px;
  flex:1;
  text-align: center;
}

.check-button{
  line-height: 20px;
  width: 21px;
  height: 21px;
  margin-right: 10px;
}

.calculate{
  width: 90px;
  background-color: orange;
  border-radius: 15px;
  text-align: center;
  color: #fff;
}
</style>
