<template>
    <div class="lists">
        <div class="list-item-title">
            <svg v-if="!needsave" @click="gotoBack" t="1535423648257" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13232" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M512 1024C229.233778 1024 0 794.766222 0 512 0 229.233778 229.233778 0 512 0 794.766222 0 1024 229.233778 1024 512 1024 794.766222 794.766222 1024 512 1024ZM512 56.888889C260.636444 56.888889 56.888889 260.636444 56.888889 512 56.888889 763.335111 260.636444 967.111111 512 967.111111 763.363556 967.111111 967.111111 763.335111 967.111111 512 967.111111 260.636444 763.363556 56.888889 512 56.888889ZM595.911111 778.353778C595.911111 778.353778 330.979556 513.422222 330.979556 513.422222 330.979556 513.422222 332.401778 512 332.401778 512 332.401778 512 330.979556 510.577778 330.979556 510.577778 330.979556 510.577778 595.911111 245.646222 595.911111 245.646222 595.911111 245.646222 636.131556 285.866667 636.131556 285.866667 636.131556 285.866667 409.998222 512 409.998222 512 409.998222 512 636.131556 738.133333 636.131556 738.133333 636.131556 738.133333 595.911111 778.353778 595.911111 778.353778Z" p-id="13233"></path></svg>
            <svg v-if="needsave" @click="saveData" t="1535507782442" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1913" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M508.6 69.4c59.7 0 117.6 11.7 172.1 34.7 52.7 22.3 100 54.2 140.6 94.8 40.6 40.6 72.5 87.9 94.8 140.6 23 54.5 34.7 112.4 34.7 172.1s-11.7 117.6-34.7 172.1c-22.3 52.7-54.2 100-94.8 140.6-40.6 40.6-87.9 72.5-140.6 94.8-54.5 23-112.4 34.7-172.1 34.7S391 942.2 336.5 919.2c-52.7-22.3-100-54.2-140.6-94.8-40.6-40.6-72.5-87.9-94.8-140.6-23-54.5-34.7-112.4-34.7-172.1S78.1 394 101.1 339.5c22.3-52.7 54.2-100 94.8-140.6s87.9-72.5 140.6-94.8c54.5-23 112.4-34.7 172.1-34.7m0-54c-274.1 0-496.3 222.2-496.3 496.3S234.5 1008 508.6 1008s496.3-222.2 496.3-496.3S782.7 15.4 508.6 15.4z" p-id="1914"></path><path d="M803.2 338.9c-10.5-10.5-27.7-10.5-38.2 0L446.5 657.4 252.3 463.1c-10.5-10.5-27.7-10.5-38.2 0-10.5 10.5-10.5 27.7 0 38.2l213.3 213.3c4.9 4.9 11.3 7.5 17.8 7.8 7.4 0.4 14.9-2.2 20.5-7.8l337.5-337.5c10.5-10.5 10.5-27.7 0-38.2z" p-id="1915" ></path></svg>
            <div>
                <span>{{ infos.title }}</span>
                <span>{{ infos.type }}&nbsp;&nbsp;&nbsp;&nbsp;{{ setFinanceDate(infos.date) }}</span>
            </div>
            <svg @click="itemDelete" t="1535423582739" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11971" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M509.925833 16.626926c-275.054338 0-498.030043 222.975705-498.030043 498.030043s222.975705 498.030043 498.030043 498.030043c275.05332 0 498.030043-222.975705 498.030043-498.030043S784.979153 16.626926 509.925833 16.626926zM509.925833 975.33369c-254.425669 0-460.677739-206.253087-460.677739-460.677739S255.500164 53.97923 509.925833 53.97923c254.424651 0 460.677739 206.253087 460.677739 460.677739S764.350485 975.33369 509.925833 975.33369zM487.07997 655.478373 487.07997 457.820224c0-9.93564-8.030969-17.968645-17.966609-17.968645-9.939712 0-17.969663 8.033005-17.969663 17.968645l0 197.658148c0 9.93564 8.030969 17.966609 17.969663 17.966609C479.049001 673.444981 487.07997 665.414012 487.07997 655.478373zM684.80836 440.319857c-9.93564 0-17.969663 8.049293-17.969663 17.966609l0 269.06445c0 9.919352-8.050311 17.970681-17.968645 17.970681L397.273394 745.321597c-9.901028 0-17.967627-8.050311-17.967627-17.970681L379.305767 457.553509c0-9.919352-8.049293-17.970681-17.968645-17.970681s-17.968645 8.050311-17.968645 17.970681l0 269.796389c0 29.722425 24.185546 53.905935 53.905935 53.905935l251.595641 0c29.718353 0 53.907971-24.18351 53.907971-53.905935L702.778023 458.286466C702.778023 448.369151 694.744 440.319857 684.80836 440.319857zM756.608626 367.980054l-89.841189 0 0-35.939326c0-29.720389-23.99009-53.905935-53.494664-53.905935L433.173018 278.134793c-29.718353 0-53.901863 24.185546-53.901863 53.905935l0 35.939326-89.844243 0c-9.938694 0-17.968645 8.026897-17.968645 17.968645 0 9.93564 8.030969 17.966609 17.968645 17.966609l467.181714 0c9.93564 0 17.969663-8.030969 17.969663-17.966609C774.578289 376.006951 766.544266 367.980054 756.608626 367.980054zM630.828112 367.980054 415.207427 367.980054l0-35.939326c0-9.90001 8.065581-17.968645 17.965591-17.968645l180.099756 0c9.850128 0 17.555339 7.890486 17.555339 17.968645L630.828112 367.980054zM594.89184 655.478373 594.89184 457.820224c0-9.93564-8.031987-17.968645-17.968645-17.968645-9.93564 0-17.966609 8.033005-17.966609 17.968645l0 197.658148c0 9.93564 8.030969 17.966609 17.966609 17.966609C586.859853 673.444981 594.89184 665.414012 594.89184 655.478373z" p-id="11972"></path></svg>
        </div>
        <p>账簿独立编号：{{ id }}</p>
        <AmountWeek ref="amountWeek" v-if="infos.type == '净资产统计周表'" :info="infos" @dataRefresh="dataChange"></AmountWeek>
    </div>
</template>

<script>
    import { getCookie } from '../../assets/js/cookie.js'
    import AmountWeek from '../../components/amount_week.vue'
    import axios from 'axios'
    import config           from '../../config.js'

    export default{
        components: {
            AmountWeek
        },
        props: {
            id: String
        },
        data: function(){
            return{
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
                this.needsave = true;
            },
            saveData: function(){
                this.needsave = false;
                this.$refs.amountWeek.dataSave();
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
            padding: 0 2%;
            margin: 0 auto 20px;
            background-color: #f7f9ff;
            height: 60px;
            border: 1px dashed #aaa;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
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
        }
        .list-item-title svg:hover {
            fill: #cc0000;
        }
    }
</style>