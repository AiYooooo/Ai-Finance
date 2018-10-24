<template>
    <div class="lists">
        <div class="list-item-title">
            <svg v-if="!needsave" @click="gotoBack" t="1535423648257" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13232" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M512 1024C229.233778 1024 0 794.766222 0 512 0 229.233778 229.233778 0 512 0 794.766222 0 1024 229.233778 1024 512 1024 794.766222 794.766222 1024 512 1024ZM512 56.888889C260.636444 56.888889 56.888889 260.636444 56.888889 512 56.888889 763.335111 260.636444 967.111111 512 967.111111 763.363556 967.111111 967.111111 763.335111 967.111111 512 967.111111 260.636444 763.363556 56.888889 512 56.888889ZM595.911111 778.353778C595.911111 778.353778 330.979556 513.422222 330.979556 513.422222 330.979556 513.422222 332.401778 512 332.401778 512 332.401778 512 330.979556 510.577778 330.979556 510.577778 330.979556 510.577778 595.911111 245.646222 595.911111 245.646222 595.911111 245.646222 636.131556 285.866667 636.131556 285.866667 636.131556 285.866667 409.998222 512 409.998222 512 409.998222 512 636.131556 738.133333 636.131556 738.133333 636.131556 738.133333 595.911111 778.353778 595.911111 778.353778Z" p-id="13233"></path></svg>
            <svg v-if="needsave" @click="saveData" t="1535507782442" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1913" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M508.6 69.4c59.7 0 117.6 11.7 172.1 34.7 52.7 22.3 100 54.2 140.6 94.8 40.6 40.6 72.5 87.9 94.8 140.6 23 54.5 34.7 112.4 34.7 172.1s-11.7 117.6-34.7 172.1c-22.3 52.7-54.2 100-94.8 140.6-40.6 40.6-87.9 72.5-140.6 94.8-54.5 23-112.4 34.7-172.1 34.7S391 942.2 336.5 919.2c-52.7-22.3-100-54.2-140.6-94.8-40.6-40.6-72.5-87.9-94.8-140.6-23-54.5-34.7-112.4-34.7-172.1S78.1 394 101.1 339.5c22.3-52.7 54.2-100 94.8-140.6s87.9-72.5 140.6-94.8c54.5-23 112.4-34.7 172.1-34.7m0-54c-274.1 0-496.3 222.2-496.3 496.3S234.5 1008 508.6 1008s496.3-222.2 496.3-496.3S782.7 15.4 508.6 15.4z" p-id="1914"></path><path d="M803.2 338.9c-10.5-10.5-27.7-10.5-38.2 0L446.5 657.4 252.3 463.1c-10.5-10.5-27.7-10.5-38.2 0-10.5 10.5-10.5 27.7 0 38.2l213.3 213.3c4.9 4.9 11.3 7.5 17.8 7.8 7.4 0.4 14.9-2.2 20.5-7.8l337.5-337.5c10.5-10.5 10.5-27.7 0-38.2z" p-id="1915" ></path></svg>
            <div class="item-title">
                <span>{{ infos.title }}</span>
                <span>{{ infos.type }}&nbsp;&nbsp;&nbsp;&nbsp;{{ setFinanceDate(infos.date) }}</span>
            </div>
            <svg @click="toggleMenu" :class="{ close: closemenu }" t="1540283260875" class="icon menu" style="" viewBox="0 0 1046 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7119" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M522.844484 27.597966c-267.489719 0-484.402034 216.912315-484.402034 484.402034 0 267.534999 216.867035 484.402034 484.402034 484.402034 267.489719 0 484.402034-216.844395 484.402034-484.402034C1007.223878 244.510281 790.311563 27.597966 522.844484 27.597966zM522.844484 948.315012c-241.001105 0-436.315012-195.336547-436.315012-436.315012 0-240.955826 195.336547-436.292372 436.315012-436.292372 240.978466 0 436.337652 195.381826 436.315012 436.292372C959.182136 752.955826 763.822949 948.315012 522.844484 948.315012z" p-id="7120"></path><path d="M752.457749 283.948883 286.846783 283.948883c-16.142207 0-29.137475 14.24046-29.137475 31.673137 0 17.477957 13.040548 31.673137 29.137475 31.673137l465.633606 0c16.119567 0 29.092195-14.149901 29.092195-31.673137C781.617864 298.121424 768.554676 283.926244 752.457749 283.948883z" p-id="7121"></path><path d="M752.457749 480.372142 286.846783 480.372142c-16.142207 0-29.137475 14.19518-29.137475 31.650497 0 17.477957 13.040548 31.718417 29.137475 31.718417l465.633606 0c16.119567 0 29.092195-14.19518 29.092195-31.718417C781.617864 494.522043 768.554676 480.304223 752.457749 480.372142z" p-id="7122"></path><path d="M752.457749 676.750122 286.846783 676.750122c-16.142207 0-29.137475 14.19518-29.137475 31.673137s13.040548 31.673137 29.137475 31.673137l465.633606 0c16.119567 0 29.092195-14.19518 29.092195-31.673137S768.554676 676.750122 752.457749 676.750122z" p-id="7123"></path></svg>
            <div class="item-btns" :class="{ close: closemenu }">
                <svg @click="itemClose" v-if="!infos.closed" t="1540284469505" class="icon" style="" viewBox="0 0 1228 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10910" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M1094.9134935609707 311.61331232280133c-26.00095913480503-61.56548597478284-63.20922346315029-116.70544854036713-110.57878235620043-164.07501156990668-47.36955889305019-47.36955889305019-102.65895213939507-84.72725803864554-164.07500743341723-110.57878235620043-63.657515505432315-26.897543219369084-131.20023284713167-40.64517412233026-200.98441453673055-40.64517412233026s-137.32689489480885 13.598200222200509-200.98441453673055 40.64517412233026c-61.56548597478284 26.00095913480503-116.70544854036713 63.20922346315029-164.07500743341723 110.57878235620043s-84.72725803864554 102.65895213939507-110.57878235620043 164.07501156990668c-26.897543219369084 63.657515505432315-40.64517412233026 131.20023284713167-40.64517412233026 200.9844104002412s13.747630902961182 137.32689489480885 40.64517412233026 200.98441453673055c26.00095913480503 61.56548597478284 63.20922346315029 116.70544854036713 110.57878235620043 164.07500743341723 47.36955889305019 47.36955889305019 102.65895213939507 84.72725803864554 164.07500743341723 110.57878235620043 63.657515505432315 26.897543219369084 131.20023284713167 40.64517412233026 200.98441453673055 40.64517825881969s137.32689489480885-13.747630902961182 200.98441453673055-40.64517825881969c61.56548597478284-26.00095913480503 116.70544854036713-63.20922346315029 164.07500743341723-110.57878235620043s84.72725803864554-102.65895213939507 110.57878235620043-164.07500743341723c26.897543219369084-63.657515505432315 40.64517412233026-131.20023284713167 40.64517412233026-200.98441453673055-0.14943068076067728-69.78417755310952-13.747630902961182-137.32689489480885-40.64517412233026-200.9844104002412z m-475.7876350071091 663.472706546671c-254.92892751974 0-462.48829614642955-207.5593686266898-462.48829614642955-462.48829614642955s207.5593686266898-462.48829614642955 462.48829614642955-462.48829614642955 462.48829614642955 207.5593686266898 462.48829614642955 462.48829614642955-207.40993794592916 462.48829614642955-462.48829614642955 462.48829614642955z" fill="" p-id="10911"></path><path d="M745.6937361609226 373.32822484185533h-252.98632453336177c-7.023246132241266 0-12.701616137636442 5.67837000539517-12.70162027412587 12.70162027412587v252.98632453336177c0 7.023246132241266 5.67837000539517 12.701616137636442 12.70162027412587 12.70162027412587h252.98632453336177c7.023246132241266 0 12.701616137636442-5.67837000539517 12.70162027412587-12.70162027412587V386.0298451159813c0-6.873815451480591-5.67837000539517-12.701616137636442-12.70162027412587-12.70162027412587z" p-id="10912"></path></svg>
                <svg @click="itemDelete" t="1540284624277" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20066" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M512.002 3.352C231.083 3.352 3.354 231.08 3.354 511.998c0 280.92 227.729 508.65 508.647 508.65 280.916 0 508.644-227.729 508.644-508.65 0.001-280.918-227.727-508.646-508.643-508.646z m0 966.427c-252.825 0-457.782-204.955-457.782-457.781 0-252.824 204.956-457.782 457.782-457.782 252.829 0 457.781 204.956 457.781 457.782S764.829 969.779 512.002 969.779z" p-id="20067"></path><path d="M325.968 742.324c0 14.682 11.895 26.576 26.576 26.576h318.911c14.68 0 26.574-11.896 26.574-26.576V387.979H325.968v354.345z m265.759-274.617c0-14.671 11.896-26.576 26.576-26.576 14.682 0 26.576 11.905 26.576 26.576v221.466c0 14.682-11.895 26.576-26.576 26.576-14.68 0-26.576-11.896-26.576-26.576V467.707z m-106.303 0c0-14.671 11.903-26.576 26.575-26.576 14.68 0 26.575 11.905 26.575 26.576v221.466c0 14.682-11.895 26.576-26.575 26.576-14.672 0-26.575-11.896-26.575-26.576V467.707z m-106.304 0c0-14.671 11.896-26.576 26.576-26.576 14.681 0 26.576 11.905 26.576 26.576v221.466c0 14.682-11.896 26.576-26.576 26.576-14.681 0-26.576-11.896-26.576-26.576V467.707z m318.911-159.456H565.152v-26.576c0-14.681-11.896-26.576-26.578-26.576h-53.15c-14.681 0-26.577 11.895-26.577 26.576v26.576H325.968c-14.681 0-26.576 11.904-26.576 26.576v26.576h425.215v-26.576c0-14.672-11.894-26.576-26.576-26.576z" p-id="20068"></path></svg>
            </div>
        </div>
        <p>账簿独立编号：{{ id }}</p>
        <AmountWeek ref="amountWeek" v-if="infos.type == '净资产统计周表'" :info="infos" @dataRefresh="dataChange"></AmountWeek>
        <ProfitWeek ref="profitWeek" v-if="infos.type == '项目盈利周表'" :info="infos" @dataRefresh="dataChange"></ProfitWeek>
    </div>
</template>

<script>
    import { getCookie } from '../../assets/js/cookie.js'
    import AmountWeek from '../../components/amount_week.vue'
    import ProfitWeek from '../../components/profit_week.vue'
    import axios from 'axios'
    import config           from '../../config.js'

    export default{
        components: {
            AmountWeek,
            ProfitWeek
        },
        props: {
            id: String
        },
        data: function(){
            return{
                closemenu: true,
                token: '',
                needsave: false,
                infos: {}
            }
        },
        mounted: function(){
            if(!getCookie('usertoken')){
                this.$router.push('/');
            }
            this.token = getCookie('usertoken');
            axios.defaults.headers.common['Authorization'] = this.token;
            axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
            this.getFinanceInfo();
        },
        methods:{
            getFinanceInfo: function(){
                let that = this;
                axios.get(config.baseUrl+'/finance/detail',{
                    params: {
                        'id' : this.id
                    }
                })
                .then((response) => {
                    if(response.data.success){
                        that.$message.success('获取账簿信息成功！');
                        that.infos = response.data.data;
                    }else{
                        that.$message.error(response.data.message);
                    }
                }).catch((error) => {
                    that.$message.error(''+error);
                    that.quit();
                });
            },
            toggleMenu: function() {
                this.closemenu = !this.closemenu;
            },
            itemDelete: function() {
                let that = this;
                this.$modal.confirm({
                    title: '确定要删除这个账簿么？',
                    content: '该行为不可逆，请谨慎操作。',
                    onOk() {
                        axios.get(config.baseUrl+'/finance/delete',{
                            params: {
                                'id' : that.id
                            }
                        })
                        .then((response) => {
                            if(response.data.success){
                                that.$message.success('删除此账簿成功！');
                                that.gotoBack();
                            }else{
                                that.$message.error(response.data.message);
                            }
                        }).catch((error) => {
                            that.$message.error(''+error);
                            that.quit();
                        });
                    },
                    onCancel() {
                    }
                })
            },
            itemClose: function(){
                let that = this;
                this.$modal.confirm({
                    title: '确定要关闭这个账簿么？',
                    content: '关闭账簿后就不可再添加和修改内容了，该行为不可逆，请谨慎操作。',
                    onOk() {
                        axios.get(config.baseUrl+'/finance/close',{
                            params: {
                                'id' : that.id
                            }
                        })
                        .then((response) => {
                            if(response.data.success){
                                that.$message.success('关闭此账簿成功！');
                                that.infos.closed = true;
                            }else{
                                that.$message.error(response.data.message);
                            }
                        }).catch((error) => {
                            that.$message.error(''+error);
                            that.quit();
                        });
                    },
                    onCancel() {
                    }
                })
            },
            gotoBack: function(){
                this.$router.push('../');
            },
            setFinanceDate: function(date) {
                if(!date){
                    return 'loading';
                }
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
            },
            dataChange: function(){
                if(this.infos.closed){
                    return;
                }
                this.needsave = true;
            },
            saveData: function(){
                this.needsave = false;
                if(this.infos.type == '净资产统计周表'){
                    this.$refs.amountWeek.dataSave();
                }else if(this.infos.type == '项目盈利周表'){
                    this.$refs.profitWeek.dataSave();
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" scoped lang="scss">
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
        .list-item-title {
            width: 95%;
            max-width: 800px;
            padding: 0 30px;
            margin: 0 auto 20px;
            background-color: #f7f9ff;
            height: 60px;
            border: 1px dashed #aaa;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            .item-title {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                span {
                    font-size: 1.4rem;
                    line-height: 2.5rem;
                    user-select: none;
                }
                span:last-child{
                    font-size: 0.7rem;
                    line-height: 1rem;
                }
            }
            svg {
                transition: all 0.3s;
                height: 30px;
                fill: #aaa;
            }
            .menu {
                transform: rotate(90deg);
            }
            .menu.close {
                transform: rotate(0deg);
            }
            .item-btns {
                width: 100px;
                height: 100%;
                position: absolute;
                right: 70px;
                top: 0;
                transition: width 0.3s;
                overflow: hidden;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 0 5px;

                svg {
                    margin-left: 15px;
                }
            }
            .item-btns.close {
                width: 0px;
            }
        }
        .list-item-title svg:hover {
            fill: #cc0000;
        }
    }
</style>