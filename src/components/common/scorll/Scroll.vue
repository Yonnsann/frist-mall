<template>
    <!--    ref/children-->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll"

    export default {
        name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            // 1.创建Bscroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                observeDOM: true,
                click: true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad

            })
            // 2.监听滚动位置
            if (this.probeType===2||this.probeType===3){
                this.scroll.on('scroll', (position) => {
                    // 通过自定义事件给Home父组件
                    this.$emit('scroll', position)
                })
            }
            // 3.监听滚到底部
            if (this.pullUpLoad){
                this.scroll.on('pullingUp',()=>{
                    this.$emit('pullingUp')
                })
            }
            // // 3.监听上拉事件
            // this.scroll.on('pullingUp',()=>{
            //     this.$emit('pullingUp')
            // })
        },
        methods: {
            scrollTo(x, y, time = 1000) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            getScroolY(){
                return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>

</style>