
<template>
   <m-card :icon="icon" :title="title"> 
  <div class="nav jc-between">
      <!--(category,i)索引值，从零开始-->
   <div class="nav-item" :class="{active :active===i}" v-for="(category,i) in categories" :key="i"
   @click="$refs.list.swiper.slideTo(i)">
     <div class="nav-link">{{category.name}}</div>
   
   </div>
    </div>
<div class="mt-2">
    <!--:options="{autoHeight: true}"自动高度-->
    <swiper  ref="list" :options="{autoHeight: true}"
      @slide-change="() => active = $refs.list.swiper.realIndex">
      <!--swiper.realIndex获取索引值-->
<swiper-slide v-for="(category,i) in categories" :key="i">
<slot name="items" :category="category"></slot>
</swiper-slide>

    </swiper>
</div>
</m-card>
    
</template>


<script>
export default {
    props:{
     icon:{type:String},
    title:{type:String},
    categories:{type:Array}    
    },
    data(){
        return {
            active:0
        }
    }
   
};
</script>
<style lang="scss" scoped>

</style>