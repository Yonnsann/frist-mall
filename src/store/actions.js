const actions={
    addCart(context,payload) {
        return new Promise((resolve) => {
            // 1.查找数组中是否存在该商品
            let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid);

            // 2.判断odlProduct
            if (oldProduct){
                context.commit('addCounter',oldProduct)
                resolve('当前商品数量+1')
            }else {
                payload.count=1;
                // state.cartList.push(payload);
                context.commit('addToCart',payload)
                resolve('添加了新的商品')
            }
        })
    }
}
export default actions