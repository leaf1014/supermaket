<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button @click.native="selectColor" :check-color="itemInfo.checked" v-model="itemInfo.checked"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">
          <button @click="addClick" class="button">+</button>
          x{{itemInfo.count}}
          <button @click="descClick" class="button" :disabled="isShow">-</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

  export default {
    name: "ShopCartItem",
    data(){
      return{
        isShow:false
      }
    },
    props: {
      itemInfo: Object
    },
    components: {
      CheckButton
    },
    methods: {
      selectColor() {
        this.itemInfo.checked = !this.itemInfo.checked
      },
      addClick(){
        this.isShow=false
        this.itemInfo.count++
      },
      descClick() {
        if (this.itemInfo.count >= 1)
        {
          this.itemInfo.count--
        }
        else{
          this.isShow=true
        }
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .button{
    background-color: rgba(0, 0, 0, 0);
    padding: 5px 5px;
    border-radius: 50%;
    border: #f6f6f6;
    color: red;
  }
</style>
