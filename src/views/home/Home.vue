<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">首页</div>
        </nav-bar>
        <!--        :probe-type="3"————实时监听位置，不用':'传过去的是个字符串，用了才是Number类型 -->
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1"
                     class="tab-control"
                     v-show="isTabFixed"/>
        <Scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <recommend-view :recommends="recommends"/>
            <feature/>
            <tab-control :titles="['流行','新款','精选']"
                         @tabClick="tabClick"
                         ref="tabControl2"/>
            <goods-list :goods="showGoods"/>
        </Scroll>
        <!--        使用.native监听组件-->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import HomeSwiper from "@/views/home/childComps/HomeSwiper";
    import RecommendView from "@/views/home/childComps/RecommendView";
    import Feature from "@/views/home/childComps/Feature";

    import NavBar from "@/components/common/navbar/NavBar";
    import TabControl from "@/components/content/tabControl/TabControl";
    import GoodsList from "@/components/content/godds/GoodsList";
    import Scroll from "@/components/common/scorll/Scroll";
    import BackTop from "@/components/content/backtop/BackTop";

    import {getHomeMultidata, getHomeGodds} from "@/network/home";
    import {itemListenerMixin} from "@/common/mixin";
    import {BACKTOP_POSITION} from "@/common/const"


    export default {
        name: "Home",
        components: {
            HomeSwiper,
            RecommendView,
            Feature,

            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop:0,
                isTabFixed:false,
                saveY:0,
                itemImgListener:null
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        activated(){

            this.$refs.scroll.refresh()
            // 活动时(当前页面)调用,上一层必须要keep-alive属性
            this.$refs.scroll.scrollTo(0,this.saveY,0)
        },
        deactivated(){
            // 1.离开页面时调用,上一层必须要keep-alive属性
            this.saveY=this.$refs.scroll.getScroolY()
            // 2.取消全局事件的监听
            this.$bus.$off('imgLoad')
            // console.log(this.saveY)
        },
        created() {
            // 1.发送网络请求,获取数据
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list
            })

            // 2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')

        },
        mixins:[itemListenerMixin],
        methods: {
            /**
             * 事件监听相关的方法
             * **/

            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break
                }
                this.$refs.tabControl1.currentIndex=index;
                this.$refs.tabControl2.currentIndex=index;
            },
            /**
             * 网络请求相关的方法
             * **/
            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                getHomeGodds(type, page).then(res => {
                    // 箭头函数的指针会向上一个层级指向，所以这里的this指向没有问题
                    // 对res.data.list数组做解析，然后一个个push进去
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1

                    // 完成上拉加载更多
                    this.$refs.scroll.finishPullUp()
                })
            },
            backClick() {
                // 找到ref='scroll'的组件，然后调用这个组件的scroll对象里面的scrollTo方法回到顶部
                this.$refs.scroll.scrollTo(0, 0,300)
            },
            contentScroll(position) {
                // 1.判断BackTop是否显示
                this.isShowBackTop = position.y < BACKTOP_POSITION
                // 2.绝对TabControl是否吸顶(position:fixed)
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            loadMore(){
                this.getHomeGoods(this.currentType)
            },
            swiperImageLoad(){
                // 2.获取tabControl的offsetTop
                // 所有组件都有个属性$el:用于获取组件中的元素
                this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
            }

        }
    }
</script>

<style scoped>
    #home {
        position: relative;
        height: 100vh;
    }

    .home-nav {
        background-color: gray;
        color: #fff;

        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*!*设置层级*!*/
        /*z-index: 9;*/
    }
    .tab-control{
        position: relative;
        /*z-index只对定位起作用*/
        z-index: 9;
    }
    /*.fixed{*/
    /*    position: fixed;*/
    /*    left: 0;*/
    /*    right: 0;*/
    /*    top: 44px;*/
    /*}*/
    .content {
        /*height: calc(100% - 93px);*/
        overflow: hidden;
        position: absolute;
        top:44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>