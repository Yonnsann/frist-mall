import {debounce} from "./utils";

export const itemListenerMixin = {
    mounted() {
      // 1.监听图片加载完成
      const refresh= debounce(this.$refs.scroll.refresh,500)
      this.itemImgListener=() => {
        // 每次拿到一个图片就刷新
        // this.$refs.scroll && this.$refs.scroll.refresh()
        refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImgListener )
    }
}