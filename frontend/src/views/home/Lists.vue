<template>
    <div class="lists">
        <div class="add-item" @click="showModal">
            <svg t="1534747716010" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2611" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M460.8 460.8H0v102.4h460.8v460.8h102.4v-460.8h460.8V460.8h-460.8V0H460.8v460.8z" p-id="2612"></path></svg>
            <span>添加一个新的账簿</span>
        </div>
        <p>提示：此版本仍为测试版本，请勿填写私密信息并做好备份。</p>
        <div class="lists-wrap">
            <div class="list-item" v-for="finance_item in finance_list" :key="finance_item.id" @click="gotoDetail(finance_item.id)">
                <div class="item-title">{{ finance_item.title }}</div>
                <div class="item-info">
                    <span>{{ finance_item.type }}</span>
                    <span>{{ setFinanceDate(finance_item.date) }}</span>
                </div>
            </div>
            <div class="none-item" v-if="!loading && !finance_list.length">
                <img src="../../assets/images/no-list.png">
                库里空空如也哦
            </div>
            <div class="load-item" v-if="loading">
                <img src="../../assets/images/loading.png">
                正在努力加载呦
            </div>
        </div>
        <v-modal 
            v-model="visible"
            title="新建账簿"
            okText="新建"
            :confirmLoading="confirmLoading"
            @onOk="onOk"
            @onCancel="onCancel">
            <v-input size="large" placeholder="填写账簿名称" v-model="finance_name" />
            <v-select
                size="large"
                style="margin-top: 16px; width: 488px;"
                v-model="finance_type"
                placeholder="请选择账簿类型">
                <v-option value="净资产统计周表">净资产统计周表</v-option>
            </v-select>
        </v-modal>
    </div>
</template>

<script>
    import { getCookie }    from '../../assets/js/cookie.js'
    import axios            from 'axios'
    import config           from '../../config.js'

    export default{
        data: function(){
            return{
                loading: true,
                token: '',
                name: '',
                visible: false,
                confirmLoading: false,
                finance_list: [],
                finance_name: '',
                finance_type: ''
            }
        },
        mounted: function(){
            if(!getCookie('usertoken')){
                this.$router.push('/');
            }
            this.token = getCookie('usertoken');
            axios.defaults.headers.common['Authorization'] = this.token;
            axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
            this.getUserInfo();
        },
        methods:{
            getUserInfo: function(){
                axios.get(config.baseUrl+'/users/info')
                .then((response) => {
                    this.loading = false;
                    this.name = response.data.username;
                    this.finance_list = response.data.account;
                }).catch((error) => {
                    this.loading = false;
                    this.$message.error(''+error);
                    this.quit();
                });
            },
            showModal: function() {
                this.visible = true;
            },
            onOk: function() {
                if(!this.finance_name || !this.finance_type){
                    this.$message.warning('请将账簿信息填写完整！');
                    return;
                }
                this.confirmLoading = true;
                let that = this;
                axios.post(config.baseUrl+'/finance/add', {
                    'name' : this.finance_name,
                    'type' : this.finance_type
                }).then(function (response) {
                    that.confirmLoading = false;
                    if(response.data.success){
                        that.$message.success('添加账簿成功！');
                        that.onCancel();
                        that.getUserInfo();
                    }else{
                        that.$message.error(response.data.message);
                    }
                })
                .catch(function (error) {
                    that.confirmLoading = false;
                    that.$message.error(error);
                });
            },
            onCancel: function() {
                this.visible = false;
            },
            gotoDetail: function(id) {
                this.$router.push('./list/'+id);
            },
            setFinanceDate: function(date) {
                let time = new Date(parseInt(date));
                let Y = time.getFullYear();
                let M = this.double(time.getMonth()+1);
                let D = this.double(time.getDate());
                return Y + '-' + M + '-' + D; 
            },
            double: function(num) {
                if(num < 10){
                    num = '0'+num;
                }
                return num;
            }
        }
    }
</script>

<style rel="stylesheet/scss" scoped lang="scss">
    @-webkit-keyframes loading {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .lists {
        width: 100%;
        height: 100%;

        &>p {
            font-size: 0.8rem;
            color: #bbb;
            line-height: 2rem;
            border-bottom: 1px solid #bbb;
            text-align: center;
            width: 95%;
            max-width: 800px;
            margin: 0 auto 20px;
        }

        .add-item {
            width: 95%;
            max-width: 800px;
            margin: 0 auto 20px;
            background-color: #f7f9ff;
            height: 60px;
            border: 1px dashed #aaa;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s;
            svg {
                transition: all 0.3s;
                height: 20px;
                fill: #aaa;
                margin-right: 20px;
            }
            span {
                transition: all 0.3s;
                font-size: 1.4rem;
                color: #aaa;
            }
        }
        .add-item:hover {
            border-color: #cc0000;
            span {
                color: #cc0000;
            }
            svg {
                fill: #cc0000;
            }
        }

        .lists-wrap {
            width: 95%;
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;

            .list-item {
                width: 100%;
                height: 60px;
                margin-bottom: 20px;
                border-radius: 5px;
                cursor: pointer;
                background-color: #fff;
                transition: all 0.3s;
                display: flex;
                padding: 10px 20px;
                justify-content: space-between;
                align-items: center;

                .item-title {
                    font-size: 1.3rem;
                    color: #333;
                }
                .item-info {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: flex-end;
                    font-size: 0.8rem;
                    color: #999;
                }
            }
            .list-item:hover {
                transform: translate3d(0,-3px,0);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);

                .item-title {
                    color: #cc0000;
                }
            }

            .none-item,.load-item {
                width: 100%;
                height: 130px;
                border-radius: 5px;
                color: #333;
                font-size: 1.3rem;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    height: 40px;
                    margin-right: 20px;
                }
            }
            .load-item {
                img {
                    animation: loading 1s infinite linear;
                    transform-origin: center center;
                }
            }
        }

    }
</style>