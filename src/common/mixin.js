import {debounce} from "./utils";
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
    mounted() {
        // 1.监听图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh, 500)
        this.itemImgListener = () => {
            // 每次拿到一个图片就刷新
            // this.$refs.scroll && this.$refs.scroll.refresh()
            refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}
export const backTopMixin = {
    data: function () {
        return {
            showBackTop: false
        }
    },
    methods: {
        backTop: function () {
            this.$refs.scroll.scrollTo(0, 0, 300);
        }
    }
}

export const tabControlMixin = {
    data() {
        return {
            currentType: POP
        }
    },
    methods: {
        tabClick(index) {
            // console.log(index)
            switch (index) {
                case 0:
                    this.currentType = POP;
                    break;
                case 1:
                    this.currentType = NEW;
                    break;
                case 2:
                    this.currentType = SELL;
                    break
            }
            console.log(this.currentType);
        }
    }
}
