# 系统管理 —— APICloud

## 1. 介绍

使用 APICloud 开发 App。

## 2. 开始

### 2.1. 创建 App 应用并获取代码

1. 进入[官网-控制台](https://www.apicloud.com/console)（需要注册 APICloud 账号）
2. 点击“创建应用”，创建“Native App”
3. 进入[App 概览](https://www.apicloud.com/appoverview)，点击“代码”菜单，获取端代码的 SVN 信息：
   * svn 地址，`svn://svn7.apicloud.com/A6005284765494/adminAPICloud`
   * SVN 账号，即注册时填写的邮箱
   * SVN 密码，APICloud 账号的密码
4. 在本地（电脑端），安装 SVN 客户端，检出代码

### 2.2. 制作并预览静态页面

从 SVN 检出的代码，在浏览器上是可以预览的，但只能预览静态的。

### 2.3. 真机调试与预览

1. 准备
   * 在 vscode 中搜索并安装 “appcloud” 插件
   * 在手机微信上通过扫描来安装官方 [AppLoader](https://docs.apicloud.com/Download/download)
   * 使手机可访问电脑
     1. 使用 USB 数据线连接电脑和手机
     2. 设置手机的“移动热点” 为 “通过 USB 共享网络”
     3. 关闭电脑端的防火墙
2. 启动
   1. vscode：“apicloud:启动wifi服务” 获取监听的 IP 和端口
   2. 手机中的 “APPLoader” 应用：输入 IP 和端口。
3. 调试
   * vscode：“apicloud:wifi全量更新”，让手机载入最新代码