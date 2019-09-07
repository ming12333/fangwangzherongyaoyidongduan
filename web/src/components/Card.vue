<template>
    <div class="card p-3 bg-white mt-3">
  <div class="card-header d-flex ai-center pb-3">
       <i class="iconfont " :class="'icon'"></i>
        <div class="fs-xxl flex-1 py-2">{{title}}</div>
       <i class="iconfont icon-menu"></i>
  </div>
  <div class="card-body pt-3">
      <slot></slot><!--展示值-->
  </div>
    </div>
</template>
<script>
export default {
   props:{
    title:{type :String},
     icon:{type :String}
   } 
}
</script>

<style lang="scss">
@import '../assets/scss/style.scss';
 .card{
     .card-header{
         border-bottom :1px solid $border-color;
     }
 border-bottom :1px solid $border-color;
 } 
</style>
