# 系统管理 —— APICloud

## 1. 介绍

此文章的目的是介绍如何使用 APICloud 来开发 App。

## 2. 创建 App 应用并获取代码

1. 进入[官网-控制台](https://www.apicloud.com/console)（需要注册 APICloud 账号）
2. 点击“创建应用”，创建“Native App”
3. 进入[App 概览](https://www.apicloud.com/appoverview)，点击“代码”菜单，获取端代码的 SVN 信息：
   * svn 地址，`svn://svn7.apicloud.com/A6005284765494/adminAPICloud`
   * SVN 账号，即注册时填写的邮箱
   * SVN 密码，APICloud 账号的密码
4. 在本地（电脑端），安装 SVN 客户端，检出代码

## 3. 制作并预览静态页面

从 SVN 检出的代码，在浏览器上是可以预览的，但只能预览静态的。

## 4. 真机调试与预览

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

## 5. 模块与 AppLoader

>进入[控制台 -> App 概览 -> 模块](https://www.apicloud.com/module)

App 用到的所有模块，在调试时需要在 AppLoader 里才可以使用，

>进入[控制台 -> App 概览 -> 模块 -> 自定义 loader](https://www.apicloud.com/module-loader)

说明：

* AppLoader 是一个集成了众多 APICloud 扩展模块的应用加载器。
* 开发 APICloud 应用可以使用常用的HTML编辑器，如Sublime，WebStorm, AptanaStudio等。
* 调试 APICloud 应用则需要使用 AppLoader。

AppLoader 分为官方 Loader 和自定义 Loader：

* 官方 Loader 随着官方 SDK 一起发布，只包含了官方模块，而其他开发者的自定义模块、付费模块、第三方SDK模块等都并未加入到官方Loader中
* 自定义 Loader，是开发者为自己的应用定制的 Loader，开发者可以自由选择本应用所需要的模块进行 Loader 的编译。同时，自定义 Loader 将与当前应用所有的配置最大限度的保持一致，保持开发调试的应用环境与正式上线的环境一致，保证如微信、微博、百度地图等第三方SDK模块，在自定义Loader中调试通过后，编译正式版本也不会出现问题。

## 6. APICloud CLI 的使用

>相关文档：[https://docs.apicloud.com/Dev-Tools/apicloud-cli](https://docs.apicloud.com/Dev-Tools/apicloud-cli)

安装：

```shell
$ npm install -g apicloud-cli
$ apicloud -v
apicloud-cli: 0.2.0
```

使用：

```shell
# 启动 wifi 服务，会一直阻塞控制台
$ apicloud wifiStart --port 8686
APICloud Is Listening on ip: ["192.168.31.227"] port: 8686)

# 停止 wifi 服务:
$ apicloud wifiStop --port 8686

# wifi 增量更新:
$ apicloud wifiSync --project ./ --updateAll false --port 8686

# 获取 wifi 调试日志:
$ apicloud wifiLog --port 8686
```

### 6.1. 文件变化后自动更新

>使用 [watch](https://github.com/mikeal/watch) NPM 包

```shell
# 安装
$ npm install watch -D

# 使用
$ ./node_modules/.bin/watch 'apicloud wifiSync --project ./ --updateAll false --port 8686' ./ --ignoreDirectoryPattern=/node_modules/
> Watching ./
```
