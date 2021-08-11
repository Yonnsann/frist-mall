<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :param-info="paramInfo"/>
            <detail-comment-info :comment-info="commentInfo"/>
        </scroll>
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

    import Scroll from "@/components/common/scorll/Scroll";

    import {getDetail, Goods, Shop,GoodsParam} from "@/network/detail";

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo:{},
                itemParams:{},
                commentInfo:{},

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

            Scroll,
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
                this.detailInfo = data.detailInfo

                // 5.获取参数信息
                this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

                // 6.取出参数的信息
                this.itemParams=data.itemParams

                // 7.取出评论信息
                if (data.rate.cRate !== 0){
                    this.commentInfo=data.rate.list[0]
                }
            })
        },
        methods: {
            imageLoad() {
                // console.log('imageLoad')
                this.$refs.scroll.refresh()
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
        height: calc(100% - 44px);
    }
</style>