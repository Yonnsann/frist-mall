<template>
    <div class="goods-item" @click="itemClick">
<!--        @load监听图片是否加载完成-->
        <img :src="goodsItem.show.img" alt="" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props:{
            goodsItem:{
                type:Object,
                default(){
                    return{}
                }
            }
        },
        methods:{
            imageLoad(){
                // 通过$bus.$emit发送出去，使用$bus.$on来接收，从而调用这个方法 ($bus需要在main.js里面注册)
                this.$bus.$emit('itemImageLoad')
            },
            itemClick(){
                // 需要返回所以不要用replace
                this.$router.push('/detail/'+ this.goodsItem.iid)
                // // query传递参数
                // this.$router.push({
                //     path:'/detail',
                //     query:{
                //
                //     }
                // })
            }
        }
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;
        width: calc(50% - 10px);
        margin: 10px 5px 0;
    }
    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: 0;
        width: 14px;
        height: 14px;
        background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>