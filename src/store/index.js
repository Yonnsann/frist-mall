import Vue from "vue";
import Vuex from "vuex";

import getters from './getters'
import actions from "./actions";

Vue.use(Vuex);

const store=new Vuex.Store({
    getters,
    actions,
    state:{
        cartList:[]
    },
    mutations:{
        // mutations唯一的目的就是修改state中的状态
        // mutations的每个方法中完成的事情尽可能单一一点
        // addCart(state,payload){
        //     //payload新增的商品
        //     // let oldProduct=null;
        //     // for (let item of state.cartList){
        //     //     if(item.iid===payload.iid){
        //     //         oldProduct=item;
        //     //     }
        //     // }
        //
        //     // 1.查找数组中是否存在该商品
        //     let oldProduct=state.cartList.find(item=>item.iid===payload.iid);
        //
        //     // 2.判断odlProduct
        //     if (oldProduct){
        //         oldProduct.count+=1;
        //     }else {
        //         payload.count=1;
        //         state.cartList.push(payload);
        //     }
        // },
        addCounter(state,payload){
            payload.count++
        },
        addToCart(state,payload){
            payload.checked=true;
            state.cartList.push(payload)
        }
    },
    // actions:{
    //     addCart(context,payload){
    //         //payload新增的商品
    //         // let oldProduct=null;
    //         // for (let item of state.cartList){
    //         //     if(item.iid===payload.iid){
    //         //         oldProduct=item;
    //         //     }
    //         // }
    //
    //         // 1.查找数组中是否存在该商品
    //         let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid);
    //
    //         // 2.判断odlProduct
    //         if (oldProduct){
    //             context.commit('addCounter',oldProduct)
    //         }else {
    //             payload.count=1;
    //             // state.cartList.push(payload);
    //             context.commit('addToCart',payload)
    //         }
    //     }
    // }
});

export default store