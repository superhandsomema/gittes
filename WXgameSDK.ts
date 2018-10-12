interface statisData {
  v:string;    
  openid:string;
  appid:string;
  nickname?:string;
  city?:string;
  phone?:string;
  promote:string;
  scene?:any;
}
class StatisM {
    private host: string = "https://statis.niuqueyou.com";
    private hostStatus: string = 'https://statis.niuqueyou.com/api/getFakeStatus';
    private hostShare: string = 'https://statis.niuqueyou.com/api/game/share';
    static baseData:statisData = {
        openid:'',
        appid:'',
        v:'',
        nickname:'',
        city:'',
        phone:'',
        promote:'',
        scene:'',
    }
    constructor(){
       
    }
    //初始化设置游戏版本,openid,appid  小游戏开始初始化 app的onLaunch事件触发	
    static init(data):void {
    	if(data.version && data.appid){
    		this.baseData.v = data.version;
	        this.baseData.openid = data.openid?data.openid:'';
	        this.baseData.appid = data.appid;
	        this.baseData.nickname = data.name?data.name:'';
	        this.baseData.city = data.city?data.city:'';
	        this.baseData.phone = data.phone?data.phone: '';
            this.baseData.promote = data.promote?data.promote: 'empty';
            this.baseData.scene = data.scene?data.scene:'';
	        let statis = new StatisM()
        	statis.statis_init(Object.assign({'spot':'INIT'},this.baseData))
    	}else{
    		throw Error('缺少必填参数')
    	}
    }
    private statis_init(data){
        this.statis_request(data)
    }
    //登陆成功
    static loginSuccess(openid, source_openid = '', target = '') {
        let statis = new StatisM()
        statis.login_success(openid, source_openid, target)
    }
    private login_success(openid, source_openid, target) {
        //判断是否传入source_openid
        if (source_openid && openid) {
            StatisM.baseData.openid = openid
            this.statis_request(Object.assign({ 'spot': 'LOGIN_SUCC', 'source_openid': source_openid, 'target': target }, StatisM.baseData))
        } else if (openid) {
            StatisM.baseData.openid = openid
            this.statis_request(Object.assign({ 'spot': 'LOGIN_SUCC' }, StatisM.baseData))
        } else {
            throw Error('缺少必填参数')
        }
    }
    //登陆失败
    static loginFail(){
        let statis = new StatisM()
        statis.login_fail()
    }
    private login_fail(){
        this.statis_request({'spot':'LOGIN_FAIL','v':StatisM.baseData.v,'appid':StatisM.baseData.appid})
    }
    //签到
    static clockIn(){
        let statis = new StatisM()
        statis.clock_in()
    }
    private clock_in(){
        this.statis_request(Object.assign({'spot':'CLOCKIN','targettype':'clickable'},StatisM.baseData))        
    }
    //点击数据
    static clickAble(data,appid = ''){
    	if(data){
    		let statis = new StatisM()
        	statis.click_able(data,appid)
    	}else{
    		throw Error('缺少必填参数')
    	}
    }
    private click_able(data,appid){
        this.statis_request(Object.assign({'spot':'CLICKABLE','targettype':'button','target':data,'to_appid':appid},StatisM.baseData))                
    }
    //分享数据
    static share(data = ''){
        let statis = new StatisM()
        statis.getShare(data)
    }
    private getShare(data = ''){
        if(data){
            this.statis_request(Object.assign({'spot':'SHARE','targettype':'app','target':data},StatisM.baseData))
        }else{
            this.statis_request(Object.assign({'spot':'SHARE','targettype':'app'},StatisM.baseData))
        }
    }
    //有关卡游戏的数据
    static rounds(stage,ifSuccess,times,score){
    	if(stage && ifSuccess >= 0 && times >= 0){
    		let statis = new StatisM()
            statis.getRounds(stage, ifSuccess, times, score)
    	}else{
    		throw Error('缺少必填参数')
    	}
    }
    private getRounds(stage, ifSuccess, times, score){
        this.statis_request(Object.assign({ 'spot': 'MAP', 'targettype': 'app', 'target': stage, 'status': ifSuccess, 'duration': times, 'score': score},StatisM.baseData))
    }
    //无关卡游戏的数据
    static oneRound(times,score){
        if(times >= 0 && score >= 0){
        	let statis = new StatisM()
        	statis.getOneRound(times,score)
        }else{
        	throw Error('缺少必填参数')
        }
    }
    private getOneRound(times,score){
        this.statis_request(Object.assign({'spot':'MAP','targettype':'app','target':0,'status':0,'duration':times,'score':score},StatisM.baseData))
    }
    //开始观看视频数据
    static openVideo(data = ''){
        let statis = new StatisM()
        statis.getOpenVideo(data)
    }
    private getOpenVideo(data = ''){
        if(data){
            this.statis_request(Object.assign({'spot':'VIDEOAD','targettype':'open','target':data},StatisM.baseData))
        }else{
            this.statis_request(Object.assign({'spot':'VIDEOAD','targettype':'open'},StatisM.baseData))       
        }
    }
    //中途关闭视频数据
    static videoNotEnd(data = ''){
        let statis = new StatisM()
        statis.getVideoNotEnd(data)
    }
    private getVideoNotEnd(data = ''){
        if(data){
            this.statis_request(Object.assign({'spot':'VIDEOAD','targettype':'not_end','target':data},StatisM.baseData))
        }else{
            this.statis_request(Object.assign({'spot':'VIDEOAD','targettype':'not_end'},StatisM.baseData))           
        }
    }
    //视频播放结束数据
    static videoFinish(data = ''){
        let statis = new StatisM()
        statis.getVideoFinish(data)
    }
    private getVideoFinish(data = ''){
        if(data){
            this.statis_request(Object.assign({'spot':'VIDEOAD','targettype':'end','target':data},StatisM.baseData))
        }else{
            this.statis_request(Object.assign({'spot':'VIDEOAD','targettype':'end'},StatisM.baseData))         
        }
    }
    //小游戏总时长
    static gameClose(data){
        if(data >= 0){
        	let statis = new StatisM()
        	statis.getGameClose(data)
        }else{
        	throw Error('缺少必填参数')
        }
    }
    private getGameClose(times){
        this.statis_request(Object.assign({'spot':'GAME_CLOSE','duration':times},StatisM.baseData)) 
    }
    //获取黑包白包状态信息
    static getStatus(cb){
        let statis = new StatisM()
        statis.getStatusCode(cb)
    }
    private getStatusCode(cb) {
        this.status_request({ 'appid': StatisM.baseData.appid, 'v': StatisM.baseData.v},cb)
    }
    //微信请求
    private statis_request(data){
        wx.request({
            url: this.host +'/gamelogs',
            data:data,
            success:function(res){
                console.log(res)
            },
            fail:function(erro){
                console.log(erro)
            }
        })
    }
    //黑白包请求
    private status_request(data,cb){
            wx.request({
	            url: this.hostStatus,
	            data: data,
	            success(response) {
	                if(typeof cb == 'function'){
                		cb(response.data)
                	}
	            },
	            fail(error) {
                	if(typeof cb == 'function'){
                		cb(error)
                	}
            	}
            })
    }
    //分享素材获取
    static getShareMessage(cb){
        let statis = new StatisM()
        statis.getShareMes(cb)
    }
    private getShareMes(cb) {
        this.share_request(cb)
    }
    private share_request(cb){
    	let that = this
        wx.request({
            url: that.hostShare,
            data:{'app_id':StatisM.baseData.appid},
            success(res){
                if(typeof cb == 'function'){
                    cb({                       
                        'title': res.data.data.share.title,
                        'image': res.data.data.share.img,
                    })
                }
            },
            fail(error){
                if(typeof cb == 'function'){
                    cb(error)
                }
            }
        })

    }
    //解密微信群id
    static decodeId(encryptedData, iv, sessionKey, cb) {
        let statis = new StatisM()
        statis.decode_private(encryptedData, iv, sessionKey, cb)
    }
    private decode_private(encryptedData, iv, sessionKey, cb) {
        var encryptedData = CryptoJs.util.base64ToBytes(encryptedData)
        var key = CryptoJs.util.base64ToBytes(sessionKey);
        var iv = CryptoJs.util.base64ToBytes(iv);
        // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
        var mode = new CryptoJs.mode.CBC(CryptoJs.pad.pkcs7);
        try {
            // 解密
            var bytes = CryptoJs.AES.decrypt(encryptedData, key, {
                asBpytes: true,
                iv: iv,
                mode: mode
            });
            var decryptResult = JSON.parse(bytes);
            cb(decryptResult.openGid)
        } catch (err) {
            console.log(err)
            cb('微信群id解密失败')
        }
    }
    
    //自定义接口
    static customPort(data,cb){
        let statis = new StatisM()
        statis.customData(data, cb)
    }
    private customData(data, cb){
        this.customRequest(data, cb)
    }
    private customRequest(datas, cb){
        wx.request({
            url: this.host+datas.host,
            data:datas.data,
            method: datas.method ? datas.method:'GET',
            header: datas.header ? datas.header : {'content-type': 'application/json'},
            success(res){
                if (typeof cb == 'function') {
                    cb(res)
                }else{
                    console.log(cb+'不是callback')
                }
            },
            fail(error){
                if (typeof cb == 'function') {
                    cb(error)
                } else {
                    console.log(cb + '不是callback')
                }
            }


        })
    }

}
