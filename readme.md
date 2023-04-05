# WebVPN Converter

由于在外科研人员需访问众多不同的数据库，但是webVPN的请求连接经过加密，访问其他数据库需从图书馆查找，极其不便。为此开发了一个简单的浏览器插件，可以实现一键通过VPN访问网页。

原项目 [dlutor/dlutvpn](https://github.com/dlutor/dlutvpn)。

转换原理源自 [spencerwooo/WEBVPN URL Converter](https://github.com/spencerwooo/bit-webvpn-converter)（及其[网页](https://webvpn.vercel.app/)）。

部分代码来源于[YDX-2147483647/bit-webvpn-converter-bidirectional](https://github.com/YDX-2147483647/bit-webvpn-converter-bidirectional)。

感谢以上几位大佬的贡献。

## 安装
从本仓库下载[源代码](https://github.com/Cloudac7/webvpn-converter/archive/refs/heads/master.zip)，解压，
打开Chrome扩展程序，勾选开发者模式，加载已解压的扩展程序，选择解压目录

## 使用
打开一个页面，点击浏览器右上角图标
![](https://i.imgur.com/o2puVLq.jpg)
或者页面右击
![](https://i.imgur.com/HFFVxk6.jpg)
之后可以看到结果
![](https://i.imgur.com/agOzeck.jpg)
已使用校内ip登录

## 设置

理论上使用了网瑞达WebVPN服务的高校都采用了类似的加密方式，因此本插件提供了选项，只需填入本高校的WebVPN服务URL，即可使用此插件访问WebVPN服务。
