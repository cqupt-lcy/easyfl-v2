# “炼丹炉”联邦学习web平台 v2

V3版本:https://github.com/cqupt-lcy/easyfl-web 
优化了项目结构，重写了状态数据结构

为了⽅便进⾏联邦学习相关的科研实验，我开发了⼀个基于FLGo开源框架（[WwZzz/easyFL: An experimental platform for federated learning.](https://github.com/WwZzz/easyFL)）的web平台，可以进⾏联邦学习训练的控制、实时监测训练过程以及查看实验结果。

***

“炼丹炉”联邦学习web平台 **v1** [cqupt-lcy/easyfl-react: react+fl](https://github.com/cqupt-lcy/easyfl-react)

## **Update Logs：**

使用NodeJS+Express对后端进行了重写
使用Redux统一管理状态
增加任务导航栏功能，支持新增任务，删除任务，任务重命名
支持多任务同时进行

## TODOS

- [x] 前端功能受到后端接口限制，学习NodeJS等技术重写后端接口
- [x] 前端状态管理混乱，学习并使用Redux管理状态
- [x] 添加多任务功能
- [ ] 添加注册登录功能
- [ ] 优化界面

## 技术栈

前端：React函数式组件+antd

后端：FLGo+NodeJS+Express

网络请求：Axios+WebSocket

数据可视化：ReCharts

数据存储：localStorage



## 论文成果：

《CoGAP: A Personalized Federated Learning Method Using Collaborative Optimization for Medical Image Classification》  ICASSP 2025 已录用  [cqupt-lcy/CoGAP: CoGAP](https://github.com/cqupt-lcy/CoGAP)

TNNLS 在审



## 效果展示：

## 多任务（v2 Updated）

支持导航栏多任务之间切换，支持增加、删除、重命名任务，支持多任务同时开始任务进程

![mutiltask](README.assets/mutiltask.gif)

### Overall

显示训练日志，折线图形式可视化训练结果。

![动画](README.assets/动画.gif)

### Setting

包括参数设置，实验开始和停止。

### 实验设置

提供了基本的数据约束

![settings](README.assets/settings.gif)

### 开始训练

![start](README.assets/start.gif)

### 停止训练

![stop](README.assets/stop.gif)



### 体验优化

参数设置及结果保存在localStorage中，刷新或关闭页面不会丢失

![save](README.assets/save.gif)



![trainning](README.assets/trainning.gif)

停止训练时实验结果不会丢失，开启新训练时才清空实验结果

![notrainning](README.assets/notrainning.gif)



