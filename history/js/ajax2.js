/**
 * Created by baidong on 2016/11/29.
 */
function Ajax(recvType){
    var aj=new Object();
    aj.recvType=recvType ? recvType.toUpperCase() : 'HTML' //HTML XML
    aj.targetUrl='';
    aj.sendString='';
    aj.resultHandle=null;
    aj.createXMLHttpRequest=function(){
        var request=false;
        //window对象中有XMLHttpRequest存在就是非IE，包括（IE7，IE8）
        if(window.XMLHttpRequest){
            request=new XMLHttpRequest();
            if(request.overrideMimeType){
                request.overrideMimeType("text/xml");
            }
            //window对象中有ActiveXObject属性存在就是IE
        }else if(window.ActiveXObject){
            var versions=['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
            for(var i=0; i<versions.length; i++){
                try{
                    request=new ActiveXObject(versions[i]);
                    if(request){
                        return request;
                    }
                }catch(e){
                    request=false;
                }
            }
        }
        return request;
    }
    aj.XMLHttpRequest=aj.createXMLHttpRequest();
    aj.processHandle=function(){
        if(aj.XMLHttpRequest.readyState == 4){
            if(aj.XMLHttpRequest.status == 200){
                if(aj.recvType=="HTML")
                    aj.resultHandle(aj.XMLHttpRequest.responseText);
                else if(aj.recvType=="XML")
                    aj.resultHandle(aj.XMLHttpRequest.responseXML);
            }
        }
    }

    aj.get=function(targetUrl, resultHandle){
        aj.targetUrl=targetUrl;

        if(resultHandle!=null){
            aj.XMLHttpRequest.onreadystatechange=aj.processHandle;
            aj.resultHandle=resultHandle;
        }
        if(window.XMLHttpRequest){
            aj.XMLHttpRequest.open("get", aj.targetUrl);
            aj.XMLHttpRequest.send(null);
        }else{
            aj.XMLHttpRequest.open("get", aj.targetUrl, true);
            aj.XMLHttpRequest.send();
        }
    }

    aj.post=function(targetUrl, sendString, resultHandle){
        aj.targetUrl=targetUrl;
        if(typeof(sendString)=="object"){
            var str="";
            for(var pro in sendString){
                str+=pro+"="+sendString[pro]+"&";
            }
            aj.sendString=str.substr(0, str.length-1);
        }else{
            aj.sendString=sendString;
        }
        if(resultHandle!=null){
            aj.XMLHttpRequest.onreadystatechange=aj.processHandle;
            aj.resultHandle=resultHandle;
        }
        aj.XMLHttpRequest.open("post", targetUrl);
        aj.XMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        aj.XMLHttpRequest.send(aj.sendString);
    }
    return aj;
}

// <script type="text/javascript">
// var ajax = Ajax(); // 实例化对象，默认为 HTTP，如果传入 XML，返回 XML 对象
// // Ajax 的 get 方法使用说明
// /**
//  * function(targetUrl, resultHandle)
//  * @param string targetUrl 传递过去的 URL 地址
//  * @param string resultHandle 回调函数，可选项
//  */
// ajax.get('test.php?name=liruxing&email=liruxing1715@sina.com', function(data) {
//     eval("var obj="+data);
//     alert(obj.name);
//     alert(obj.email);
// });
//
// // Ajax 的 post 方法使用说明
// /**
//  * function(targetUrl, sendString, resultHandle)
//  * @param string targetUrl 传递过去的 URL 地址
//  * @param string sendString 参数值
//  * @param string resultHandle 回调函数，可选项
//  */
// ajax.post('test.php', 'name=liruxing&email=liruxing1715@sina.com', function(data){
//     eval("var obj="+data);
//     alert(obj.name);
//     alert(obj.email);
// })
//
// // post 第二种格式，第二个参数为 Json 格式
// ajax.post('test.php', {name:'李茹星',email:'liruxing1715@sina.com'}, function(data){
//     eval("var obj="+data);
//     alert(obj.name);
//     alert(obj.email);
// })
// </script>
