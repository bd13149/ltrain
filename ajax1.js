/**
 * Created by baidong on 2016/11/29.
 */
(function(){
    //面向外界的唯一变量接口！
    var ajaxTool = window.ajaxTool = {};
    //作者、版本号等等信息
    ajaxTool.author = "ouyang";
    ajaxTool.version = "1.0.0";

    /**
     *  get方法
     *  URL：请求的URL
     *  queryJSON：json格式数据
     *  callback：请求成功后的回调
     */
    ajaxTool.get = function(URL,queryJSON,callback){
        //创建xhr对象，解决兼容问题
        if(window.XMLHttpRequest){
            var xhr = new XMLHttpRequest();
        }else{
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //结果返回之后做的事情
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    callback(null,xhr.responseText);
                }else{
                    callback(new Error(URL+"存在异常"),undefined);
                }
            }
        }
        //拼接字符串
        var querystring = ajaxTool.paramsJson2String(queryJSON);
        //配置
        xhr.open("get" , URL + "?" + querystring , true);
        //发送
        xhr.send(null);
    };

    /**
     *  post方法
     *  URL：请求的URL
     *  queryJSON：json格式数据
     *  callback：请求成功后的回调
     */
    ajaxTool.post = function(URL,queryJSON,callback){
        //创建xhr对象，解决兼容问题
        if(window.XMLHttpRequest){
            var xhr = new window.XMLHttpRequest();
        }else{
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //结果返回之后做的事情
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    callback(null,xhr.responseText);
                }else{
                    callback(new Error(URL+"存在异常"),undefined);
                }
            }
        }
        //拼接字符串
        var querystring = ajaxTool.paramsJson2String(queryJSON);
        //配置
        xhr.open("post" , URL , true);
        //发送
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(querystring);
    };

    ajaxTool.paramsJson2String = function(json){
        var arr = [];    //结果数组
        for(var k in json){
            arr.push(k + "=" + encodeURIComponent(json[k]));
        }
        return arr.join("&");
    };
})();