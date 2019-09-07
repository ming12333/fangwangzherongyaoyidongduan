<template>
  <div>
    <swiper>
      <swiper-slide><img  class="w-100 h-50" src="../assets/images/1.png" alt=""></swiper-slide>
    <swiper-slide><img class="w-100 h-50" src="../assets/images/2.png" alt=""></swiper-slide>
    <swiper-slide><img class="w-100 h-50" src="../assets/images/3.png" alt=""></swiper-slide>
    <swiper-slide><img class="w-100 h-50" src="../assets/images/4.png" alt=""> </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 " alot="pagination"></div>
      </swiper>

<!--end of swiper-->
<!--
<div class="nav-icons bg-white mt-2 d-flex flex-wrap text-center pt-3">
  <div class="nav-item mb-3"  :key=n>

    <div class="sprite">
      <div class="sprite-news">
 <img src="../assets/images/menu1.png" alt="">
 </div>
   <div>爆料站</div>
   </div> 
   <div class="sprite-stores">
 <img src="../assets/images/menu6.png" alt="">
 </div>
   <div>故事站</div>
   
</div>
</div>

  </div>0-->

  <div>
  <ul class="mui-table-view mui-grid-view mui-grid-9">
	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
		<router-link to="">
        <img src="../assets/images/menu1.png" alt="">
		<div class="mui-media-body">新闻资讯</div></router-link></li>
	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
    <router-link to="">
		<img src="../assets/images/menu1.png" alt="">
		<div class="mui-media-body">图片分享</div></router-link></li>
	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
	<router-link to="">	<img src="../assets/images/menu6.png" alt="">
		<div class="mui-media-body">商品购买</div></router-link></li> 
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
	<a>	<img src="../assets/images/menu1.png" alt="">
		<div class="mui-media-body">留言反馈</div></a></li>
	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
	<a>	<img src="../assets/images/menu1.png" alt="">
		<div class="mui-media-body">视频专区</div></a></li>
		<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
	<a>	<img src="../assets/images/menu6.png" alt="">
		<div class="mui-media-body">联系我们</div></a></li>
<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
		<router-link to="">
        <img src="../assets/images/menu1.png" alt="">
		<div class="mui-media-body">新闻资讯</div></router-link></li>
	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
    <router-link to="">
		<img src="../assets/images/menu1.png" alt="">
		<div class="mui-media-body">图片分享</div></router-link></li>
	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
	<router-link to="">	<img src="../assets/images/menu6.png" alt="">
		<div class="mui-media-body">商品购买</div></router-link></li> 
    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-100">
	<a>	<img src="../assets/images/menu1.png" alt="">
		<div class="mui-media-body">留言反馈</div></a></li>
	
</ul> 
  

  <!--<div class="nav-icons bg-white  d-flex flex-wrap  ">
<div class="bg-light py-2 text-center">
  收起
</div>
</div>-->
</div>
<!--end-->
<!--卡片布局-->
<m-listcard icon="menu1" title="新闻资讯" :categories="newsCats">
  <!--父组件使用子组件中的category-->
  <template #items="{category}">
 <!--tag="div" router-link是a标签类型，转换为div类型-->
 <router-link
  tag="div"
 :to="`/articles/${news._id}`"
  class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
  <span class="text-info">[{{news.categoryName1}}]</span>
  <span>|</span>
  <span class="flex-1 text-ellipsis">{{news.title}}</span>
  <span class="text-grey-1 fs-sm">{{news.createdAt |data}}</span>
   </router-link>
  </template>
 </m-listcard>
<m-listcard icon="menu1" title="英雄列表" :categories="herosCats">
  <!--父组件使用子组件中的category-->
  <template #items="{category}">
 <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
          tag="div"
          :to="`/heroes/${hero._id}`"
          class="p-2 text-center"
          style="width: 20%;" 
          v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
  </template>
 </m-listcard>

<i class="iconfont icon-news text-primary"></i>





</div>

</template>
<script>
import dayjs from "dayjs";
export default {
 filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },//过滤器 
  data(){
    return{
      swiperOption:{
        pagination:{
          el:".pagination-home"
        }
       
        
      },
      newsCats:[],
      herosCats:[]
    };
  },
    methods:{
      async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
      },
      async fetchNewsCatss() {
      const res = await this.$http.get("heros/list");
      this.herosCats = res.data;
    }
    },
    created() {
       this.fetchNewsCats();
        this.fetchNewsCatss();
    }
  
};
</script>
<style lang="scss">
@import'../assets/scss/style.scss';
.pagination-home{
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius:0.1528rem;
    background: white;
    &.swiper-pagination-bullet-active{
      background:map-get($colors,'info') 
    }
  }
}
//.nav-icons{
 // .nav-item{
 // 
  //}
//}

.mui-grid-view.mui-grid-9{
   background-color:white; 
// border-right: 1px solid black; 

}
.mui-col-sm-100{
    width:25%;
}
.mui-col-xs-4{
  width:33.33%
}
.swiper-slide{
  height:50%;
}
.swiper-wrapper {
  height:50%
}
</style>

