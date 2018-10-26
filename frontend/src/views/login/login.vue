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
                <input type="tel" v-bind:class="{ noEmpty: newUserPhone }" v-model="newUserPhone">
                <span>请输入手机号</span>
            </div>
            <div class="vCode">
                <input type="text" v-bind:class="{ noEmpty: newUserVCode }" v-model="newUserVCode">
                <span>请输入验证码</span>
                <v-button :loading="delayLoading" @click.native="getVCode" :disabled="vcodeText != '获取验证码'">
                    {{vcodeText}}
                </v-button>
            </div>
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
    import config from '../../config.js'

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
                vcodeText: '获取验证码',
                username: '',
                password: '',
                newUserPhone: '',
                newUserVCode: '',
                newUsername: '',
                newPassword: ''
            }
        },
        methods: {
            toggle: function(){
                this.showLogin = !this.showLogin;
            },
            register: function(){
                if(this.newUsername == "" || this.newPassword == "" || this.newUserPhone == "" || this.vCode == ""){
                    this.$message.warning('注册信息不全');
                }else{
                    this.delayLoading = true;
                    let data = {
                        'name':this.newUsername,
                        'phone':this.newUserPhone,
                        'vCode':this.newUserVCode,
                        'password':this.newPassword
                    };
                    this.$http.post(config.baseUrl+'/signup',data).then((res)=>{
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
            getVCode: function() {
                if(this.newUserPhone == ""){
                    this.$message.warning('请先填写手机号');
                }else{
                    this.delayLoading = true;
                    let data = {
                        'phone':this.newUserPhone
                    };
                    this.$http.post(config.baseUrl+'/getVerificationCode',data).then((res)=>{
                        this.delayLoading = false;
                        if(!res.body.success){
                            this.$message.error(res.body.message);
                        }else{
                            this.$message.success('短信验证码已发送');
                            this.vcodeText = '已发送';
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
                    this.$http.post(config.baseUrl+'/user/accesstoken',data).then((res)=>{
                        this.delayLoading = false;
                        if(!res.body.success){
                            this.$message.error(res.body.message);
                        }else{
                            this.$message.success('验证成功，欢迎你：'+res.body.name);
                            setCookie('usertoken', res.body.token, 100000);
                            setCookie('username', this.username, 100000);
                            setCookie('userpass', this.password, 100000);

                            setTimeout(function(){
                                this.$router.push('/home');
                            }.bind(this),500);
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
        justify-content: flex-start;
        align-items: center;
        background-color: #FFFCF5;
        padding-top: calc(50vh - 200px);
        background-image: url('../../assets/images/login-background.png');
        background-position: center bottom;
        background-size: contain;
        background-repeat: no-repeat;

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
                    left: 20px;
                    top: 10px;
                    transition: all 0.5s;
                    color: #aaa;
                    background-color: #FFFCF5;
                    padding: 0 5px;
                }
                input{
                    display:block;
                    width:100%;
                    height:100%;
                    line-height:20px;
                    font-size: 1rem;
                    outline:none;
                    border:1px solid #ddd;
                    background-color: #FFFCF5;
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
            .vCode input {
                width: calc(100% - 120px);
            }
            .vCode button {
                width: 100px;
                position: absolute;
                top: 0;
                right: 0;
                font-size: 0.8rem;
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