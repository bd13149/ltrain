/**
 * Created by baidong on 2016/11/29.
 */
;!(function (win, ajax) {
    function GetData() {
        this.init();
    }

    GetData.prototype = {
        init: function () {
            var _this = this;
            _this.ajaxData();
            _this.createList();
        },
        ajaxData: function (data) {
            var _this = this;
            ajax({
                method: "GET",
                url: "./data/tsconfig.json",
                data: "data",
                async: true,
                success: function (data) {
                    // console.log(data);
                    _this.createList(data);
                }
            })
        },
        createList: function (data,lidom) {
            var template = "<div class='l-comn'>" +
                                "<div class='boxsiz l-tit-comn'>" +
                                    "<span>$mainTitle</span>" +
                                    "<img src= $switch  alt=''>" +
                                "</div>" +
                                "<div class='border article'>$content</div>" +
                                "<div class='border l-list'>"+
                                    "<ul class='ulbox'>" +"</ul>" +
                                "</div>"+
                            "</div>";
            var tplLi = "<li>"+
                            "<span><img style='width: 25px' src= $url alt=''></span>"+
                                "<label>$subTitle</label>"+
                        "</li>";
            if (data) {
                var htmlStr = template,
                    litxt = tplLi,
                    html = '',
                    li = '',
                    sub = data,
                    sublist = data[1]["list"],
                    _ulbox = document.getElementsByClassName('ulbox'),
                    _listBox = document.getElementById("listBox"),
                        box = document.getElementsByClassName("box");
                console.log(_ulbox.length);//0
                // html += htmlStr.replace(/\$image/,sub[i]["image"])
                for (var i = 0; i < sub.length; i++) {
                    html += htmlStr.replace(/\$mainTitle/, sub[i]["mainTitle"])
                                   .replace(/\$switch/, sub[i]["switch"])
                                   .replace(/\$content/, sub[i]["content"]);
                    for(var j=0;j<sub[i]["list"].length;j++){
                        //全部输出了
                        // console.log(sub[i]["list"][j]["subTitle"]);
                            li += litxt.replace(/\$url/,sub[i]["list"][j]["url"])
                                       .replace(/\$subTitle/,sub[i]["list"][j]["subTitle"]);

                    }
                    // lidom = li;
                    _ulbox.appendChild(li)
                }
                console.log(li);
                // console.log(html);
                _listBox.innerHTML=html;
            }
            // if (data){
            //     var litxt = tplLi;
            //     var li = '';
            //     var sublist = data["list"];
            //     var _ulboxs = document.getElementsByClassName('ulBox');

            // }
        }
    };
    new GetData();
})(window, ajax);
