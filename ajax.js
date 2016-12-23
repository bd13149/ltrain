/**
 * Created by 王小猛 on 2016/10/17.
 */
//ajax模块
;!(function (window) {

    //封装ajax，参数为一个对象
    var ajax = function (opt) {
        var xhr = createXHR();	//创建XHR对象
        //通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
        opt.url = opt.url + '?rand=' + Math.random();
        opt.data = params(opt.data);

        //若是GET请求，则将数据加到url后面
        if (opt.method.toUpperCase() === 'GET') {
            opt.url += opt.url.indexOf('?') == -1 ? '?' + opt.data : '&' + opt.data;
        }

        if (opt.async === true) {
            //使用异步调用的时候，需要触发readystatechange 事件
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (  xhr.status >= 200 && xhr.status < 300 || xhr.status ==304) {
                        //console.log(xhr.responseText);
                        opt.success(JSON.parse(xhr.responseText));
                    }
                }
            };
        }

        xhr.open(opt.method, opt.url, opt.async);
        if (opt.method.toUpperCase() === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        } else {
            xhr.send(null);
        }
        //同步调用
        if (opt.async === false) {
            callback();
        }
        function callback() {
            if (xhr.status == 200) {
                success(xhr.responseText);
            } else {
                throw new Error('Get data error! Error code：' + xhr.status + '，Error msg：' + xhr.statusText);
            }
        }
    }
    //键值对转换为字符串方法
    function params(data) {
        var arr = [];
        for (var i in data) {
            //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    }
    //XHR构造函数
    function createXHR() {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined"){
            if (typeof arguments.callee.activeXString != "string") {

                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                    i, len ;

                for (i = 0,len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch(ex){
                        console.log(ex);
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object available.");
        }
    };

    //暴露借口
    window.ajax = ajax;

})(window);

