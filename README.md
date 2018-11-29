# Ai-Finance
一个简洁的个人账簿管理网站 [https://finance.aiyo.tech](https://finance.aiyo.tech)


### 技术栈

	前端：Vue

	数据库：MongoDB
	
	后端：Node.js

### 使用说明

	前端：

		1、运行 npm i 来安装依赖
		2、运行 npm run build 来打包Vue文件
		3、将dist文件夹里的文件进行部署

	后端：

		1、运行 npm i 来安装依赖
		2、修改config文件，加入自己的服务器配置和加密信息
		3、部署到服务器上并运行node程序

### 当前版本

#### Beta 0.2.4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-11-29发布

* [修正]修正了数据保存时偶发的数据结构错误

#### Beta 0.2.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-10-29发布

* [修正]处于安全性考虑，客户端不再自动保存密码

#### Beta 0.2.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-10-26发布

* [新增]增加注册时手机号验证功能

#### Beta 0.2.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-10-24发布

* [新增]增加账簿关闭功能，一键关闭账簿不再更新
* [修正]修正了登录页用户名不存储的问题
* [更新]更新了表格显示样式

#### Beta 0.1.4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-09-05发布

* [新增]全新账簿类型上线--项目盈利周表

#### Beta 0.1.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-09-04发布

* [修正]修正了净资产统计周表中的表格显示问题
* [修正]修正了金额网格点击事件问题
* [更新]更新了登录页样式

#### Beta 0.1.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-08-31发布

* [新增]增加了自动填充账号密码的设计
* [更新]页面样式优化

#### Beta 0.1.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-08-30发布

* 完成登录注册功能，支持任意用户名注册
* 仅支持净资产周表，提供账簿的添加、删除、修改内容等功能
* 仅支持折线图表来展示各项金额的变动情况