# 小游戏数据打点SDK接口文档 V 1.3.2

## SDK介绍

>该SDK提供给CP上报小游戏的打点数据的方法，获取所需的打点数据。

* **以下为可上报的打点数据**

| 打点数据 |
| :------: |
| [小游戏初始化](#1) |
| [登陆成功数据](#2) |
| [登陆失败数据](#3) |
| [签到](#4) |
| [点击数据](#5) |
| [分享数据](#6) |
| [关卡数据](#7) |
| [视频数据](#9) |
| [游戏时间数据](#12) |
| [黑包白包的状态获取](#13) |
| [分享素材获取](#14) |
| [解密微信群id](#15) |
| [自定义接口](#16) |

## SDK的使用

* **引入SDK文件 WXgameSDK.js**

```html
    <script src="WXgameSDK.js"></script>
```

* **该SDK为CP提供以下方法**

    > **小游戏初始化 : StatisM.init()**  
    > **登录成功 : StatisM.loginSuccess()**  
    > **登录失败 : StatisM.loginFail()**  
    > **签到 : StatisM.clockIn()**  
    > **点击数据 : StatisM.clickAble()**  
    > **分享数据 : StatisM.share()**  
    > **有关卡数游戏数据 : StatisM.rounds()**  
    > **无关卡数游戏数据 : StatisM.oneRound()**  
    > **开始观看视频数据 : StatisM.openVideo()**  
    > **中途关闭视频数据 : StatisM.videoNotEnd()**  
    > **视频播放结束数据 : StatisM.videoFinish()**  
    > **小游戏使用时间数据 : StatisM.gameClose()**  
    > **获取小游戏黑白包状态 : StatisM.getStatus()**  
    > **获取分享素材 : StatisM.getShareMessage()**
    > **解密微信群ID : StatisM.decodeId()**
    > **自定义接口 : StatisM.customPort()**

<h2 id='1'>1. 小游戏初始化打点</h2>

>需在小游戏启动时触发, 调用**StatisM.init()** 方法

* **该方法需以下参数**

| 必填参数名 | 含义 |
| :-----: | :-----: |
| openid | 用户的openid
| appid | 小游戏appid
| version | 小游戏版本号
|scene|场景值

| 选填参数名 | 含义 |
| :-----: | :-----: |
| city | 用户所在城市
| name | 用户名称
| phone | 用户手机号
| promote | 渠道 (渠道号获取链接内的ad_id)

* **以下为示例代码**

```javascript
    let data = {
        //以下必填
        'openid':'openid', //若初始化时无法获得openid 可为空, 在游戏登录成功时传入openid
        'appid' : 'appid',
        'version' : 'version',
        'scene':1011, //进入小游戏的场景值,判断小游戏通过何种方式进入
        //以下可填可不填
        'city':'sh',
        'name':'nick',
        'phone':'18757777777',
        'promote':'empty', //此渠道号获取自链接内的ad_id  ?from=quyou&ad=quyou01&ad_id=1
    }

    //小游戏初始化时调用
    StatisM.init(data)
```

<h2 id='2'>2. 小游戏登陆成功打点</h2>

> 登陆成功时触发,调用 **StatisM.loginSuccess()** 方法

* **登陆成功时再次传入openid,避免造成小游戏在初始化时无法获取openid引发报错**

| 必填参数名 | 含义 |
| :-----: | :-----: |
| openid | 用户的openid

* **如果用户是通过分享进入的用户,则需传入source_openid**

| 选填参数名 | 含义 |
| :-----: | :-----: |
| source_openid | 分享者的openid
| shareType | 分享类型

* **以下为示例代码**

```javascript
    //普通用户登陆成功时调用
    let openid = 'openid'
    StatisM.loginSuccess(openid)

    //通过分享进入的用户登陆成功时调用

    /*
    *  shareType 需跟分享出去时 所记录的分享打点类型名相同 
    *  例:
    *       分享者是通过复活分享, 复活分享时的打点为 StatisM.share('share_to_relive')
    *
    *       则做分享动作时将 'share_to_relive' 传入 wx.shareAppMessage({ title:'title',imageUrl:'',query:'shareType=share_to_relive' }),
    * 
    *       在游戏初始化时通过调用wx.getLaunchOptionsSync() 获取到query中 shareType 的值 'share_to_relive' 传入 StatisM.loginSuccess()中
    *  
    *  source_openid也是通过以上相同的方法获取;
    */
    let openid = 'openid'
    let source_openid = 'source_openid'
    let shareType = 'share_to_relive'
    StatisM.loginSuccess(openid,source_openid,shareType)
```

<h2 id='3'>3. 小游戏登陆失败打点</h2>

> 登陆失败时触发,调用 **StatisM.loginFail()** 方法
* **以下为示例代码**

```javascript
    //登陆失败时调用
    StatisM.loginFail()
```

<h2 id='4'>4. 小游戏签到打点</h2>

> 签到时触发,调用 **StatisM.clockIn()** 方法
* **以下为示例代码**

```javascript
    //签到时调用
    StatisM.clockIn()
```

<h2 id='5'>5. 小游戏点击打点</h2>

> 点击时触发,调用 **StatisM.clickAble()** 方法
* **该方法需以下参数**

| 必填参数名 | 含义 | 例子
| :-----: | :-----: | :------:
| event | 自定义点击类型名 | startGame

> 以上点击类型名 **startGame** 为后台数据展示时所显示的数据类名
> 所以CP需知所定义的类型名对应了哪种数据,后续可在后台通过该类型名查看所对应的数据

* **以下为示例代码**

```javascript
    //例如:现需在点击开始游戏时记录开始游戏的打点数据
    let event = 'startGame' //此startGame为CP自由定义
    //点击时调用
    StatisM.clickAble(event)

    /*
     *   上报打点数据成功后,CP可在后台通过startGame类型名查看点击开始游戏的打点数据
     *
     *   分享方法,视频打点方法; 所需自定义的类型名与此处含义相同
    */
```

<h2 id='6'>6. 小游戏分享打点</h2>

> 分享时触发,调用 **StatisM.share()** 方法
* **该方法需以下参数**

| 选填参数名 | 含义 | 例子
| :-----: | :-----: |:----:
| event | 自定义分享类型名(默认为空) | share

> 以上分享类型名 **share** 为后台数据展示时所显示的数据类名
> 所以CP需知所定义的类型名对应了哪种数据,后续可在后台通过该类型名查看所对应的数据
* **以下为示例代码**

```javascript
    //如需自定义分享类型名
    let event = 'share' //CP自定义分享类型名
    StatisM.share(event)

    //如无需自定义分享类型名 可直接调用
    StatisM.share()
```

<h2 id='7'>7. 小游戏有关卡数的关卡打点</h2>

> 游戏结束时触发,调用 **StatisM.rounds()** 方法
* **该方法需以下参数**

| 必填参数名 | 含义 |
| :-----: | :-----: |
| stage | 关卡数
| ifSuccess | 1成功或0失败
| times | 关卡停留时间 秒数

| 选填参数名 | 含义 |
| :-----: | :-----: |
| score | 关卡分数

* **以下为示例代码**

```javascript
    let stage= 1; //游戏结束时的关卡数
    let ifSuccess= 1; //游戏通过关卡成功 (若失败则为0)
    let times= 10; //游戏关卡开始到关卡结束时间 10s 传入秒数
    //有关卡数游戏结束时调用
    StatisM.rounds(stage,ifSuccess,times)

    let score = 100;//若有关卡分数
    StatisM.rounds(stage,ifSuccess,times,score)
```

## 8. 小游戏无关卡数的关卡打点

> 游戏结束时触发,调用 **StatisM.oneRound()** 方法
* **该方法需以下参数**

| 必填参数名 | 含义 |
| :-----: | :-----: |
| times | 关卡停留时间 秒数
| score | 游戏得分

* **以下为示例代码**

```javascript
    let times = 10, //游戏开始到结束时间 10s 传入秒数
    let score =100 //游戏结束时得分
    //无关卡数游戏结束时调用
    StatisM.oneRound(times,score)
```

<h2 id='9'>9. 小游戏打开视频广告打点</h2>

> 打开视频时触发,调用 **StatisM.openVideo()** 方法
* **该方法需以下参数**

| 选填参数名 | 含义 |
| :-----: | :-----: |
| event | 自定义视频类型(默认为空)

> 以上**视频类型名**为后台数据展示时所显示的数据类名
> 所以CP需知所定义的类型名对应了哪种数据,后续可在后台通过该类型名查看所对应的数据
* **以下为示例代码**

```javascript
    //如需自定义视频类型 则传入自定义视频类型名
    let event = 'openVideo' //CP自己定义
    //打开视频时调用
    StatisM.openVideo(event)

    //如无需设置视频类型 可直接调用
    StatisM.openVideo(event)
```

<h2 id='10'>10. 小游戏视频广告中途关闭打点</h2>

> 视频中途关闭时触发,调用 **StatisM.videoNotEnd()** 方法
* **该方法需以下参数**

| 选填参数名 | 含义 |
| :-----: | :-----: |
| event | 自定义视频类型(默认为空)

> 以上**视频类型名**为后台数据展示时所显示的数据类名
> 所以CP需知所定义的类型名对应了哪种数据,后续可在后台通过该类型名查看所对应的数据
* **以下为示例代码**

```javascript
    //如需自定义视频类型 则传入自定义视频类型名
    let event = 'videoNotEnd' //CP自己定义
    //视频中途关闭时调用
    StatisM.videoNotEnd(event)

    //如无需设置视频类型 可直接调用
    StatisM.videoNotEnd()
```

<h2 id='11'>11. 小游戏视频广告播放完毕打点</h2>

> 视频播放完毕时触发,调用 **StatisM.videoFinish()** 方法
* **该方法需以下参数**

| 选填参数名 | 含义 |
| :-----: | :-----: |
| event | 自定义视频类型(默认为空)

> 以上**视频类型名**为后台数据展示时所显示的数据类名
> 所以CP需知所定义的类型名对应了哪种数据,后续可在后台通过该类型名查看所对应的数据
* **以下为示例代码**

```javascript
    //如需自定义视频类型 则传入自定义视频类型名
    let event = 'videofinish' //CP自定义
    //视频播放完毕时调用
    StatisM.videoFinish(event)

    //如无需设置视频类型 可直接调用
    StatisM.videoFinish()
```

<h2 id='12'>12. 小游戏使用时间打点</h2>

> 退出小游戏时触发,调用 **StatisM.gameClose()** 方法
* **该方法需以下参数**

| 选填参数名 | 含义 |
| :-----: | :-----: |
| times | 进入小游戏到退出小游戏时间

* **以下为示例代码**

```javascript
    let times =100 //进入小游戏到退出小游戏时间
   //游戏退出时调用
    StatisM.gameClose(times)
```

<h2 id='13'>13. 获取黑白包状态</h2>

> 游戏初始化,调用 **StatisM.getStatus()** 方法

* **以下为示例代码**

```javascript
   //游戏初始化后获取黑包白包的状态 通过调用StatisM.getStatus(callback)

   //首先定义一个回调函数
    callback(res){
        console.log(res)
    }
   StatisM.getStatus(callback)
        //callback输出res
        //res 输出为 0 则为黑包状态
        //res 输出为 1 则为白包状态
```

<h2 id='14'>14. 获取分享素材</h2>

> 需要分享素材时,调用 **StatisM.getShareMessage()** 方法

* **以下为示例代码**

```javascript
    //定义一个回调函数
    callback(res){
        console.log(res)
    }
   StatisM.getShareMessage(callback)
       /*   callback 输出 res 格式如下
        *   res = {
        *       title:'分享标题',
        *       image:'https://minipro.ibeargame.com/FqJylV1gbfNAnC05ocOFafgtxt7v'
        *   }
        *   如需监听成功与失败回调 可用以下方法 return一个对象 将获取的素材填到相应的参数中
        *   wx.onShareAppMessage(function () {
                return {
                    title: res.title,
                    imageUrl: res.image,
                    success: function () {
                        console.log('成功')
                        StatisM.share('share') //分享打点数据
                    },
                    fail: function () {
                    console.log('失败')
                    }
                }
            })
       */
```

<h2 id='15'>15. 微信群ID解密</h2>

>**调用此方法需要引入相关的js文件**

```html
    <script type="text/javascript" src="libs/Crypto.js" ></script>
    <script type="text/javascript" src="libs/CryptoMath.js" ></script>
    <script type="text/javascript" src="libs/BlockModes.js" ></script>
    <script type="text/javascript" src="libs/AES.js" ></script>
    <script type="text/javascript" src="libs/HMAC.js" ></script>
    <script type="text/javascript" src="libs/MARC4.js" ></script>
    <script type="text/javascript" src="libs/MD5.js" ></script>
    <script type="text/javascript" src="libs/PBKDF2.js" ></script>
    <script type="text/javascript" src="libs/PBKDF2Async.js" ></script>
    <script type="text/javascript" src="libs/Rabbit.js" ></script>
    <script type="text/javascript" src="libs/SHA1.js" ></script>
    <script type="text/javascript" src="libs/SHA256.js" ></script>
```

> 需要获取分享的微信群id时调用 **StatisM.decodeId()** 方法

| 必填参数名 | 含义 |
| :-----: | :-----: |
| encryptedData | 完整转发信息的加密数据
| iv | 加密算法的初始向量
| session_key | 会话密钥 获取openid时可获得
| callback | 自定义回调函数

* **以下为示例代码**

```javascript
    //定义一个回调函数
    callback(res){
        console.log(res)
    }
    //通过分享成功后的回调函数获取shareTickets
        //再通过调用
        wx.getShareInfo({
            shareTicket:shareTickets,
            success(res){
                StatisM.decodeId(res.encryptedData,res.iv,session_key,callback)
                /*   callback 输出 res 微信群openGid
                *    res = 'xxxxxxxxxxxxxx'  //微信群openGid
                */
            },
            fail(error){
                console.log(error)
            }
        })
```

<h2 id='16'>16. 自定义接口</h2>

> 需要分享素材时,调用 **StatisM.customPort()** 方法

* **以下为示例代码**

```javascript
    //定义一个回调函数
    callback(res){
        console.log(res)
    }
    data = {
        'host':'/api', //请求的接口----必填
        'data':{    // 请求参数----必填 可以为string/object/ArrayBuffer
            x:1,
            y:2,
        },
        'method':'GET', //请求方式 默认为GET请求方式----选填 POST
        'header':{'content-type': 'application/json'}, //默认header值 ----选填  "Content-Type": "application/x-www-form-urlencoded"
    }

    StatisM.customPort(data,callback)
```

# 小游戏推荐游戏列表以及主推游戏按钮

>提供给CP一个推荐游戏列表,以及主推小游戏ICON

## SDK的使用

* **引入ui,ts文件 游戏列表UI gamelist.ui 游戏主推UI mainBtn.ui 推荐游戏逻辑TS文件 games.ts**

* **将gamelist.ui , mainBtn.ui 放入 laya\pages\ 目录下 LAYA IDE切换到编辑模式 刷新资源后点击发布**
* **将games.ts文件放入 src\view 目录下**

>CP在游戏需要推荐游戏列表及主推游戏的界面添加 **Sprite** UI组件
>使用laya添加 **Sprite** UI组件 Sprite位置 游戏列表需 x=0,y值可在完整显示的情况下设置任意值 ，主推游戏按钮可在完整显示的情况下任意摆放位置
>
>**注意:** **Sprite不设置宽高** 互推列表打开会出现灰色蒙版,整体置顶最上层,所以需要**注意一下添加主推Sprite和列表Sprite UI界面的顺次**。
>若需将gamelist 互推界面整体上调,可将sprite_list的Y轴设置为负数,负数越小上调位置越大;

* **以下为示例代码**

```javascript
    //需更改两处 games.ts 中 appid 以及版本号 ver 的值
    private appid ='wx25f092a25dad3c9d'; //改成CP游戏appid
    private ver = '1.0.0'; //改成CP游戏版本号 需在后台设置对应版本号

    //添加完组件后在所需界面实例添加到sprite中
    let mainIcon = new view.mainBtn();//实例 主推游戏 mainBtn 添加到sprite中
    this.sprite_main.addChild(mainIcon);// this.sprite_main为创建sprite所对应的变量名 可自己命名

    let GameList = new view.Gamelist();//实例 游戏列表 Gamelist 添加到sprite中
    this.sprite_list.addChild(GameList) // this.sprite_list为创建sprite所对应的变量名 可自己命名

    //编译之后发布成小游戏即可
```

* **需在小游戏后台设置域名信息 downloadFile 合法域名, 否则可能造成图片无法显示**

>https://miniapp.niuqueyou.com
>https://minipro.ibeargame.com