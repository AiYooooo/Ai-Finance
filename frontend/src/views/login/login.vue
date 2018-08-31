<template>
    <div class="login-page">
        <div class="login-title">
            <strong>Ai-Finance</strong>
            <span>极致简洁 · 拙而不工</span>
        </div>
        <div class="login-item" v-show="showLogin">
            <div>
                <input type="text" v-bind:class="{ noEmpty: username }" v-model="username">
                <span>请输入用户名</span>
            </div>
            <div>
                <input type="password" v-bind:class="{ noEmpty: password }" v-model="password">
                <span>请输入密码</span>
            </div>
            
            <v-button type="primary" :loading="delayLoading" @click.native="login">
                登&nbsp;&nbsp;录
            </v-button>
            <span v-on:click="toggle">没有账号？马上注册</span>
        </div>

        <div class="login-item" v-show="!showLogin">
            <div>
                <input type="text" v-bind:class="{ noEmpty: newUsername }" v-model="newUsername">
                <span>请输入用户名</span>
            </div>
            <div>
                <input type="password" v-bind:class="{ noEmpty: newPassword }" v-model="newPassword">
                <span>请输入密码</span>
            </div>
            <v-button :loading="delayLoading" @click.native="register">
                注&nbsp;&nbsp;册
            </v-button>
            <span v-on:click="toggle">已有账号？马上登录</span>
        </div>
    </div>
</template>

<script>
    import {setCookie,getCookie} from '../../assets/js/cookie.js'

    export default{
        mounted: function(){
            if(getCookie('usertoken')){
                this.$router.push('/home');
            }else{
                if(getCookie('username')){
                    this.username = getCookie('username');
                }
                if(getCookie('userpass')){
                    this.password = getCookie('userpass');
                }
            }
        },
        data: function(){
            return{
                showLogin: true,
                delayLoading: false,
                username: '',
                password: '',
                newUsername: '',
                newPassword: ''
            }
        },
        methods: {
            toggle: function(){
                this.showLogin = !this.showLogin;
            },
            register: function(){
                if(this.newUsername == "" || this.newPassword == ""){
                    this.$message.warning('注册信息不全');
                }else{
                    this.delayLoading = true;
                    let data = {
                        'name':this.newUsername,
                        'password':this.newPassword
                    };
                    this.$http.post('https://aiyoapi.aiyo.tech/api/signup',data).then((res)=>{
                        this.delayLoading = false;
                        if(!res.body.success){
                            this.$message.error(res.body.message);
                        }else{
                            this.$message.success('注册成功，欢迎你！请登录。');
                            this.username = this.newUsername;
                            this.password = this.newPassword;
                            this.showLogin = true;
                        }
                    })
                }
            },
            login: function(){
                if(this.username == "" || this.password == ""){
                    this.$message.warning('请填写完整用户名和密码');
                }else{
                    this.delayLoading = true;
                    let data = {
                        'name':this.username,
                        'password':this.password
                    };
                    this.$http.post('https://aiyoapi.aiyo.tech/api/user/accesstoken',data).then((res)=>{
                        this.delayLoading = false;
                        if(!res.body.success){
                            this.$message.error(res.body.message);
                        }else{
                            this.$message.success('验证成功，欢迎你：'+res.body.name);
                            setCookie('usertoken', res.body.token, 1000*60);
                            setCookie('username', this.username);
                            setCookie('userpass', this.password, 1000*60*60*24);
                            setTimeout(function(){
                                this.$router.push('/home');
                            }.bind(this),1000);
                        }
                    })
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" scoped lang="scss">
    .login-page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // padding-top: calc(45vh - 90px);

        .login-title {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            strong {
                font-size: 1.4rem;
            }
            span {
                font-size: 0.9rem;
                margin-bottom: 20px;
            }
        }

        .login-item{
            text-align:center;

            &>div {
                width:250px;
                height:40px;
                margin-bottom: 15px;
                position: relative;

                span {
                    position: absolute;
                    font-size: 0.9rem;
                    line-height: 20px;
                    user-select: none;
                    left: 30px;
                    top: 10px;
                    transition: all 0.5s;
                    color: #ddd;
                    background-color: #f7f9ff;
                    padding: 0 5px;
                }
                input{
                    display:block;
                    width:100%;
                    height:100%;
                    line-height:20px;
                    font-size: 1rem;
                    margin:0 auto;
                    outline:none;
                    border:1px solid #ddd;
                    background-color: #f7f9ff;
                    border-radius: 4px;
                    padding:10px;
                    transition: all 0.5s;
                    appearance: none;
                }
                input:focus, input.noEmpty {
                    border-color: #108ee9;
                }
                input:focus + span, input.noEmpty + span {
                    top: -10px;
                    left: 20px;
                    color: #108ee9;
                }
            }
        }


        button {
            width: 250px;
            height:40px;
            display: block;
            margin-bottom: 15px;
            font-size: 1.2rem;
        }

        span{
            cursor:pointer;
            user-select: none;
        }
        span:hover{
            color:#41b883;
        }
    }
</style>