<template>
    <div class="goods">
        <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
    </div>
</template>

<script>
    import GoodsListItem from "@/components/content/godds/GoodsListItem";
    export default {
        name: "GoodsList",
        components:{
          GoodsListItem
        },
        props: {
            goods: {
                type: Array,
                default() {
                    return []
                }
            }

        }
    }
</script>

<style scoped>
    .goods{
        padding: 0 5px;
        display: flex;
        flex-wrap: wrap;
    }



</style>