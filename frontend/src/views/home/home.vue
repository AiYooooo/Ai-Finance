<template>
    <div class="home">
        <div class="header">
            <strong>Ai-Finance<span>Beta 0.2.4</span></strong>
            <div class="user">
                <!-- <div class="userimg"><img src="../../assets/images/userimg.png"></div> -->
                <span>欢迎你，{{name}}</span>
                <a href="#" @click="quit">退出</a>
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { getCookie,delCookie } from '../../assets/js/cookie.js'
    import axios from 'axios'
    import config           from '../../config.js'

    export default{
        data: function(){
            return{
                token: '',
                name: ''
            }
        },
        mounted: function(){
            if(!getCookie('usertoken')){
                this.$router.push('/');
            }
            this.token = getCookie('usertoken');
            this.getUserInfo();
        },
        methods:{
            quit: function(){
                delCookie('usertoken');
                this.$router.push('/');
            },
            getUserInfo: function(){
                axios.get(config.baseUrl+'/users/info',{
                    headers: { 
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : this.token
                    }
                }).then((response) => {
                    this.name = response.data.username;
                }).catch((error) => {
                    this.$message.error(''+error);
                    this.quit();
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" scoped lang="scss">
    .home {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;

        .header {
            width: 100%;
            height: 40px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 0 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // background-color: #fff;
            background-color: #f7f9ff;

            strong {
                font-size: 1.2rem;
                user-select: none;

                span {
                    font-size: 0.5rem;
                    padding-left: 20px;
                }
            }

            .user {
                position: relative;
                height: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;

                span {
                    margin-right: 15px;
                }

                .userimg {
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    overflow: hidden;
                    border: 1px solid #cc0000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;

                    img {
                        width: 20px;
                    }
                }
            }
        }
        .main {
            width: 100%;
            height: calc(100% - 40px);
            overflow: auto;
            padding: 20px 0;
        }
    } 
</style>