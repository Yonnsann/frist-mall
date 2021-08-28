<template>
    <div class="container profile">
        <div class="row top-my">
            <div class="avatar" align="center">
                <label for="file">
                    <img :src="adatar?adatar:require('../../assets/img/top_head/my_head.jpg')" class="image-info"
                         alt="">
                </label>
                <input type="file" id="file" name="" accept="image/gif,image/jpeg,image/jpg,image/png"
                       @change="fileChange" style="display: none;touch-action: none">
            </div>
            <div class="information">
                <div class="username"><h1>{{username}}</h1></div>
                <div class="signature">
                    <p>{{signature}}</p>
                    <img src="../../assets/img/top_head/Modify.png" alt="">
                </div>
                <div class="focus_on"><p>{{focus_on}}</p></div>
            </div>
            <div class="setting"><img src="../../assets/img/top_head/set.png" alt=""></div>
        </div>
        <div class="row">
            <div class="top-last row" align="center">
                <div class="col-3"><img class="card-img-top" src="../../assets/img/top_head/collection.png" alt="">
                    <p>收藏</p></div>
                <div class="col-3"><img class="card-img-top" src="../../assets/img/top_head/subscribe.png" alt="">
                    <p>订阅</p></div>
                <div class="col-3"><img class="card-img-top" src="../../assets/img/top_head/history.png" alt="">
                    <p>足迹</p></div>
                <div class="col-3"><img class="card-img-top" src="../../assets/img/top_head/redbag.png" alt="">
                    <p>红包</p></div>
            </div>
        </div>
    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.min'

    export default {
        name: "Profile",
        data() {
            return {
                adatar: '',
                username: 'yonnxu',
                signature: 'DBAA。',
                focus_on: '关注'
            }
        },
        methods: {
            //头像选择
            fileChange(e) {
                var that = this;
                // 保存files的信息
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    that.adatar = e.target.result;
                }
                // 读取file对象的数据
                reader.readAsDataURL(file);
            },
        }
    }
</script>

<style scoped>
    /*.container {*/
    /*    margin: 0;*/
    /*    width: 100%;*/
    /*    height: 100vh;*/
    /*    color: #fff;*/
    /*    background: linear-gradient(-45deg, #eeaa84, #e74579, #6cabd5, #76d5ac);*/
    /*    background-size: 400% 400%;*/
    /*    animation: gradientBG 15s ease infinite;*/
    /*}*/
    /*@keyframes gradientBG {*/
    /*    0% {*/
    /*        background-position: 0 50%;*/
    /*    }*/
    /*    50% {*/
    /*        background-position: 100% 50%;*/
    /*    }*/
    /*    100% {*/
    /*        background-position: 0 50%;*/
    /*    }*/
    /*}*/
    .profile {
        margin: 0;
        top: 0;
        height: 100vh;
        position: fixed;
        right: 0;
        left: 0;
        background-image: linear-gradient(to bottom right, #e7e9ff, #ffdde2);
    }

    .avatar {
        width: 85px;
        flex: 0.5;
    }

    .avatar img {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 50% 50%;
        margin-top: 5px;
        --bs-gutter-x: 0;
    }

    .top-my {
        display: flex;
        height: 96px;
    }

    .top-last {
        margin-top: 10px;

    }

    .top-last img {
        width: 40%;
    }

    /*.top-last li a p{*/
    /*    position: absolute;*/
    /*    bottom: 0;*/
    /*    left: 0;*/
    /*    width: 100%;*/
    /*    height: 41px;*/
    /*    padding: 5px 10px;*/
    /*    background:rgba(0,0,0, .5);*/
    /*    font-size: 12px;*/
    /*    color: #fff;*/
    /*    margin-bottom: 0;*/
    /*}*/

    .image-info {
        width: 100%;
        height: 100%;
    }

    .information {
        display: block;
        width: 230px;
        flex: 2;
    }

    .username {
        margin-top: 8px;
        height: 20px;
    }

    .username h1 {
        line-height: 20px;
    }

    .signature {
        margin-top: 12px;
        display: flex;
        overflow: hidden;
        font-size: 15px;
        color: rgba(50, 50, 50, 0.55);
    }

    .signature p {
        white-space: nowrap; /* 强制不换行 */
        overflow: hidden;
        text-overflow: ellipsis; /* 文字隐藏加省略号 */
    }

    .signature img {
        margin-top: 2px;
        width: 15px;
        height: 15px;
    }

    .focus_on {
        margin-top: -2px;
        height: 20px;
        font-weight: lighter;
    }

    .setting {
        flex: 0.25;
        width: 80px;
        margin-top: 5px;
        text-align: center;
    }

    .setting img {

        height: 30px;
        width: 30px;
    }

</style>