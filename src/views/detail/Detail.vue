<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :param-info="paramInfo" ref="params"/>
            <detail-comment-info :comment-info="commentInfo" ref="comment"/>
            <goods-list :goods="recommends" ref="recommend"/>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--        <toast :message="message" :show="show"/>-->
    </div>
</template>

<script>
    import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
    import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
    import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
    import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
    import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
    import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
    import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "@/components/common/scroll/Scroll";
    import GoodsList from "@/components/content/godds/GoodsList";
    import BackTop from "@/components/content/backtop/BackTop";

    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
    import {itemListenerMixin} from "@/common/mixin";
    import {debounce} from "../../common/utils";
    import {BACKTOP_POSITION} from "@/common/const"

    export default {
        name: "Detail",
        mixins: [itemListenerMixin],
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                itemParams: {},
                commentInfo: {},
                recommends: {},
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0,
                isShowBackTop: false,

            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,

            Scroll,
            GoodsList,
            BackTop
        },
        mounted() {

        },
        created() {
            // 1.保存传入的iid
            this.iid = this.$route.params.iid;
            // 2.根据iid请求数据
            getDetail(this.iid).then(res => {
                // 1.获取顶部轮播图的数据
                const data = res.result;
                this.topImages = data.itemInfo.topImages;

                // 2.获取商品信息 (整合数据)
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo, data.services);

                // 3.创建店铺信息
                this.shop = new Shop(data.shopInfo);

                // 4.保存商品的详细数据
                this.detailInfo = data.detailInfo;

                // 5.获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

                // 6.取出参数的信息
                this.itemParams = data.itemParams;

                // 7.取出评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }
                /*
                // DOM还没有渲染，所以获取不到$el
                this.themeTopYs.push(0);
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                    console.log(this.themeTopYs)

                // $nextTick————在获取完数据并且DOM渲染完后才会执行 但是图片不一定加载完
                this.$nextTick(()=>{
                    this.themeTopYs.push(0);
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                    console.log(this.themeTopYs)
                })
                 */
            });
            // 3.请求推介数据
            getRecommend().then(res => {
                this.recommends = res.data.list
            });
            // 4.给getThemeTopY赋值
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                // 获取一个最大值放入数组中进行判断解决越界问题
                this.themeTopYs.push(Number.MAX_VALUE)
            }, 200)
        },
        destroyed() {
            this.$bus.$off('itemImageLoad', this.itemImgListener)
        },
        methods: {
            imageLoad() {
                this.$refs.scroll.refresh();
                this.getThemeTopY()
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
            },
            contentScroll(position) {
                // 1.获取y值
                const positionY = -position.y;

                let length = this.themeTopYs.length;
                for (let i = 0; i < length - 1; i++) {
                    // if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i])) {
                    //     this.currentIndex = i;
                    //     this.$refs.nav.currentIndex=this.currentIndex
                    // }
                    if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                            this.currentIndex = i;
                            this.$refs.nav.currentIndex=this.currentIndex
                    }
                }
                // 2.positionY和主题的值对比
                // for(let i in this.themeTopYs){
                //     // 这种方法i是个字符串，到时候不是数值相加而是字符串的拼接，所以会有问题 并且即使用parseInt()最后一个数加一也会越界
                //     if (this.themeTopYs[i+1]>positionY > this.themeTopYs[i]){
                //
                //     }


                // 3.是否回到顶部
                this.isShowBackTop = position.y < BACKTOP_POSITION
            },
            backClick() {
                // 找到ref='scroll'的组件，然后调用这个组件的scroll对象里面的scrollTo方法回到顶部
                this.$refs.scroll.scrollTo(0, 0,300)
            },
            addToCart(){
                // 1.获取购物车需要展示的商品信息
                const product={}
                product.image=this.topImages[0]
                product.title=this.goods.title;
                product.desc=this.goods.desc;
                product.price=this.goods.realPrice;
                product.iid=this.iid;

                // 2.把商品添加到购物车
                // this.$store.cartList.push(product)
                // this.$store.commit('addCart',product)
                this.$store.dispatch('addCart',product).then(res=>{
                    // this.show=true;
                    // this.message = res;
                    // setTimeout(()=>{
                    //     this.show=false;
                    //     message=''
                    // },1500)
                    this.$toast.show(res,2000)
                })
            }
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        height: calc(100% - 44px - 49px);
    }
</style>