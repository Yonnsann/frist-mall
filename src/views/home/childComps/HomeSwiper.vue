<template>
    <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from '@/components/common/swiper'
    export default {
        name: "HomeSwiper",
        props:{
            banners:{
                type:Array,
                default(){
                    return[]
                }
            }
        },
        data(){
            return{
                isLoad:false
            }
        },
        components:{
            Swiper,
            SwiperItem
        },
        methods:{
            imageLoad(){
                // 监听是否调用过了一次，如果没有则继续执行，然后用变量isLoad记录，设置为true(调用了一次)
                if (!this.isLoad){
                    this.$emit('swiperImageLoad')

                    this.isLoad=true
                }
            }
        }
    }
</script>

<style scoped>

</style>