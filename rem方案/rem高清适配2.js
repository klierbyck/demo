;(function (win) {
    const doc = document;
    const docEl = doc.documentElement;
    //获取浏览器类型及版本
    //"Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Mobile Safari/537.36"
    const ua = navigator.userAgent;
    //匹配安卓设备相关信息
    //["Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537", "537"]
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    //匹配uc内核设备相关信息
    const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
    const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
    //匹配苹果设备相关信息
    //"5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
    //["iPhone", "iPhone"]
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);

    //获取设备dpr
    let dpr = win.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        dpr = 1;
    }

    const scale = 1 / dpr;
    //动态创建meta
    let metaEl = doc.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        doc.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
    //计算根节点像素
    var recalCulate = function()  {
        var width = docEl.clientWidth;
        if (width / dpr > 640) {
            width = 640 * dpr;
        }
        //375尺寸默认fontSize为100px
        docEl.style.fontSize = 100 * (width / 750) + 'px';
    };
    recalCulate();
    
    //监听屏幕窗口变化
    resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    if (!doc.addEventListener){
        win.attachEvent(resizeEvent, recalCulate);
    }else{
        win.addEventListener(resizeEvent, recalCulate, false);
    }
})(window);
