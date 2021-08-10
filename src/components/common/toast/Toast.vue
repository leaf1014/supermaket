<template>
  <div class="toast" v-show="isShow">{{msg}}</div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    msg:{
      type:String,
      default:''
    },
    isShow:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    show(message,duration=2500){
      this.isShow = true
      this.msg = message
      setTimeout(() => {
        this.isShow = false
        this.msg = ''
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  font-size: 20px;

  z-index: 999;

  color: #f6f6f6;
  background-color: rgba(0,0,0,0.7);
}
</style>
