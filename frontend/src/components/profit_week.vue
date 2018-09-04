<template>
    <div class="finance-wrap">
        <div class="table">
            <table cellspacing="0" cellpadding="0" border="1">
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="(time, index) in info.times" :key="index">{{ time }}</th>
                        <th v-if="!info.times.length"><svg @click="initTime" t="1535511778964" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2641" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M510.12507762 967.58469632c-250.93545643 0-454.35920043-203.46473813-454.35920043-454.43255751S259.18962119 58.73468416 510.12507762 58.73468416c250.93761365 0 454.36135765 203.44963527 454.36135765 454.41745465S761.06269127 967.58469632 510.12507762 967.58469632zM510.12507762 115.53470919c-219.57095083 0-397.56349099 178.01843029-397.56349099 397.61742962S290.55412565 910.77172679 510.12507762 910.77172679s397.56349099-178.02058752 397.56349099-397.61958798S729.69602845 115.53470919 510.12507762 115.53470919zM680.51004643 541.55862357L538.52508957 541.55862357l0 142.00653369c0 15.67685859-12.71452331 28.39569749-28.39785472 28.39569749-15.68333141 0-28.39569749-12.7188389-28.3956975-28.39569749l0-142.00653369-141.98927246 0c-15.68333141 0-28.39785472-12.71668053-28.39785472-28.40648476 0-15.67901582 12.71668053-28.39569749 28.39785472-28.3956975l141.98927246 0 0-142.0130065c0-15.67685859 12.71452331-28.38922467 28.3956975-28.38922468 15.68548864 0 28.39785472 12.71020771 28.39785472 28.38922468l0 142.0130065 141.984958 0c15.68548864 0 28.39785472 12.71668053 28.39785472 28.3956975C708.90790115 528.84194304 696.19553507 541.55862357 680.51004643 541.55862357z" p-id="2642"></path></svg></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in info.items" :key="index">
                        <td @dblclick="addItem(index,item)">{{ item }}</td>
                        <td class="data-item" v-for="(data, index2) in info.datas[index]" :key="index2" v-on:dblclick="changeData(index2,index,data)" :style="{backgroundColor: data < 0 ? '#ffebbb':'#e0ffcd'}">
                            {{ data }}
                        </td>
                        <td v-if="!info.datas[index].length"></td>
                    </tr>
                    <tr>
                        <td>净利润</td>
                        <td v-for="(time, index) in info.times" :key="index">{{ getProfit(index).JLR }}</td>
                        <td v-if="!info.times.length"></td>
                    </tr>
                    <tr>
                        <td>利润率</td>
                        <td v-for="(time, index) in info.times" :key="index">{{ getProfit(index).LRL }}</td>
                        <td v-if="!info.times.length"></td>
                    </tr>
                    <tr>
                        <td><svg @click="addItem(-1,'')" t="1535511778964" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2641" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M510.12507762 967.58469632c-250.93545643 0-454.35920043-203.46473813-454.35920043-454.43255751S259.18962119 58.73468416 510.12507762 58.73468416c250.93761365 0 454.36135765 203.44963527 454.36135765 454.41745465S761.06269127 967.58469632 510.12507762 967.58469632zM510.12507762 115.53470919c-219.57095083 0-397.56349099 178.01843029-397.56349099 397.61742962S290.55412565 910.77172679 510.12507762 910.77172679s397.56349099-178.02058752 397.56349099-397.61958798S729.69602845 115.53470919 510.12507762 115.53470919zM680.51004643 541.55862357L538.52508957 541.55862357l0 142.00653369c0 15.67685859-12.71452331 28.39569749-28.39785472 28.39569749-15.68333141 0-28.39569749-12.7188389-28.3956975-28.39569749l0-142.00653369-141.98927246 0c-15.68333141 0-28.39785472-12.71668053-28.39785472-28.40648476 0-15.67901582 12.71668053-28.39569749 28.39785472-28.3956975l141.98927246 0 0-142.0130065c0-15.67685859 12.71452331-28.38922467 28.3956975-28.38922468 15.68548864 0 28.39785472 12.71020771 28.39785472 28.38922468l0 142.0130065 141.984958 0c15.68548864 0 28.39785472 12.71668053 28.39785472 28.3956975C708.90790115 528.84194304 696.19553507 541.55862357 680.51004643 541.55862357z" p-id="2642"></path></svg></td>
                        <td :colspan="info.times.length">点击左边的按钮添加一项新的条目，成本为负值，盈利为正值，双击数字和条目名进行编辑。</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="charts">
            <div id="profit_week_echarts" :style="{width:'100%',height:'350px'}"></div>
        </div>
        <v-modal
            v-model="dataChangeVisible"
            title="修改数据"
            @onOk="changeDataOk"
            @onCancel="changeDataCancel">
                <p class="modal-p">确定要修改{{ data_info }}的数据么？</p>
                <p class="modal-p">备注：如果此数值为成本，应填写负值。</p>
                <v-input size="large" v-model="datachange"/>
        </v-modal>
        <v-modal
            v-model="itemAddVisible"
            title="添加/修改条目"
            @onOk="addItemOk"
            @onCancel="addItemCancel">
                <p class="modal-p">请填写要添加或修改的条目名称：</p>
                <p class="modal-p">新添加的条目所有之前的数据都默认为0</p>
                <v-input size="large" v-model="itemadd"/>
        </v-modal>
    </div>
</template>

<script>
    import { getCookie } from '../assets/js/cookie.js'
    import config           from '../config.js'
    import axios from 'axios'
    import echarts from "echarts"
    const qs = require('qs');

    export default{
        props: ['info'],
        data: function(){
            return{
                token: '',
                CB: [],
                LR: [],
                LRL: [],
                dataChangeVisible: false,
                data_info: '',
                x: 0,
                y: 0,
                datachange: '',
                itemAddVisible: false,
                itemadd: ''
            }
        },
        mounted: function(){
            this.token = getCookie('usertoken');
            axios.defaults.headers.common['Authorization'] = this.token;
            axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

            this.refreshTime();
            this.initCharts();
        },
        methods:{
            initTime: function(){
                let that = this;
                this.$modal.confirm({
                    title: '确认在今天初始化表格么？',
                    content: '此表格类型为周表，如果在今天初始化，之后的7天间隔将根据今天的日期来推算，该操作无法撤销。',
                    onOk() {
                        let day = new Date();
                        let Y = day.getFullYear();
                        let M = that.double(day.getMonth()+1);
                        let D = that.double(day.getDate());
                        that.info.times.push(Y + '-' + M + '-' + D);
                        that.info.items.push('成本');
                        that.info.datas.push([0]);
                        // that.info.datas.map(function(data){
                        //     data.push(0);
                        // });
                        that.dataNeedSave();
                    }
                })
            },
            refreshTime: function(){
                //这里对info进行处理，主要是处理时间
                let lastDate = this.info.times[this.info.times.length - 1];
                let lastTime = new Date(lastDate);
                let now = new Date();
                let last = lastTime.getTime();
                last += 7*24*60*60*1000;
                while(last < now.getTime()){
                    let day = new Date(last);
                    let Y = day.getFullYear();
                    let M = this.double(day.getMonth()+1);
                    let D = this.double(day.getDate());
                    this.info.times.push(Y + '-' + M + '-' + D);
                    this.info.datas.map(function(data){
                        data.push(0);
                    });
                    this.dataNeedSave();
                    last += 7*24*60*60*1000;
                }
            },
            initCharts: function(){
                let myChart = echarts.init(document.getElementById('profit_week_echarts'));
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:this.info.items
                    },
                    color: ['#f7aa00','#1abb9c','#40a8c4'],
                    grid: {
                        top: '15%',
                        left: '3%',
                        right: '5%',
                        bottom: '4%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: this.info.times
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '金额',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            name: '利润率',
                            axisLabel: {
                                formatter: '{value}%'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'总成本',
                            type:'bar',
                            barMaxWidth: 20,
                            data: this.CB
                        },
                        {
                            name:'总收入',
                            type:'bar',
                            barMaxWidth: 20,
                            data: this.LR
                        },
                        {
                            name:'利润率',
                            type:'line',
                            yAxisIndex: 1,
                            data:this.LRL
                        }
                    ]
                };
                myChart.setOption(option);
            },
            double: function(num) {
                if(num < 10){
                    num = '0'+num;
                }
                return num;
            },
            changeData: function(x,y,data){
                this.data_info = this.info.times[x] + '-' + this.info.items[y];
                this.datachange = data;
                this.x = x;
                this.y = y;
                this.dataChangeVisible = true;
            },
            changeDataOk: function(){
                this.info.datas[this.y][this.x] = this.datachange;
                this.dataChangeVisible = false;
                this.dataNeedSave();
            },
            changeDataCancel: function(){
                this.dataChangeVisible = false;
            },
            addItem: function(i,data){
                this.x = i;
                this.itemadd = data;
                this.itemAddVisible = true;
            },
            addItemOk: function(){
                if(this.x !== -1){
                    this.info.items[this.x] = this.itemadd;
                }else{
                    this.info.items.push(this.itemadd);
                    let newData = [];
                    for(let i=0; i<this.info.times.length; i++){
                        newData.push(0);
                    }
                    this.info.datas.push(newData);
                }
                this.itemAddVisible = false;
                this.dataNeedSave();
            },
            addItemCancel: function(){
                this.itemAddVisible = false;
            },
            getProfit: function(index){
                let CB = 0;
                let LR = 0;
                this.info.datas.map(function(data){
                    if(data[index] < 0){
                        CB = parseInt(100*CB + parseInt(data[index]*100))/100;
                    }else{
                        LR = parseInt(100*LR + parseInt(data[index]*100))/100;
                    }
                });
                let JLR = parseInt(parseInt(LR * 100) + parseInt(CB * 100))/100;
                let LRL = CB == 0 ? 0 : parseInt((LR + CB) / (-1 * CB) * 10000)/100;
                this.CB[index] = CB * -1;
                this.LR[index] = LR;
                this.LRL[index] = LRL;
                return {
                    'JLR' : JLR,
                    'LRL' : LRL + '%'
                };
            },
            dataNeedSave: function(){
                this.$emit('dataRefresh');
            },
            dataSave: function(){
                let that = this;
                let data = {
                    'id' : this.info.id,
                    'times' : this.info.times,
                    'items' : this.info.items,
                    'datas' : this.info.datas
                };
                axios.post(config.baseUrl+'/finance/update', qs.stringify(data)).then(function (response) {
                    if(response.data.success){
                        that.$message.success('更新账簿成功！');
                        that.initCharts();
                    }else{
                        that.$message.error(response.data.message);
                    }
                })
                .catch(function (error) {
                    that.$message.error(error);
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" scoped lang="scss">
    .finance-wrap {
        width: 95%;
        max-width: 800px;
        margin: 0 auto 20px;
        height: auto;

        .table {
            width: 100%;
            margin: 0 auto 20px;
            background-color: #fff;
            height: auto;
            overflow: auto;

            table {
                border-color: #ddd;
                border-width: 0.5px;
                border-collapse:collapse;
                width: 100%;

                svg {
                    fill: #ccc;
                    height: 20px;
                    cursor: pointer;
                    margin-top: 5px;
                }
                svg:hover {
                    fill: #cc0000;
                }

                th {
                    text-align: center;
                    width: 90px;
                    height: 30px;
                    position: relative;
                    min-width: 72px;
                }
                td {
                    text-align: center;
                    height: 25px;
                    position: relative;
                }
                .data-item {
                    input {
                        display: none;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: #fff;
                    }
                }
            }
        }
        .charts {
            width: 100%;
            margin: 0 auto;
            background-color: #fff;
            height: auto;
            padding: 10px;
        }
    }
    .modal-p {
        margin-bottom: 5px;
    }
</style>