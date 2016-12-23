/**
 * Created by baidong on 2016/11/25.
 */
;!(function (win, $, undefined) {

    function Switch() {
            this.init();


    }

    Switch.prototype = {
        init: function () {
            var _this = this;
            _this.createBox();
            _this.createList();
        },
        createBox: function (data) {
            $('#add').on("click",function () {
                $.ajax({
                    type: "post",
                    url: "./data/tsconfig.json",
                    data: "json",
                    success: function (data) {
                        console.log(data);
                        var box = '';
                        $.each(data, function (i, n) {
                            box += "<div class='l-comn'>" +
                                "<div class='boxsiz l-tit-comn'>" +
                                "<span>" +
                                data[i]["mainTitle"] +
                                "</span>" +
                                "<img src= '" + data[i]["switch"] + "'  alt=''>" +
                                "</div>" +
                                "<div class='border article'>" +
                                data[i]["content"] +
                                "</div>" +
                                "<div class='border l-list'>" +

                                "</div>" +
                                "</div>"

                        });
                        $('.content').append(box);
                    }
                })
            })

        },
        createList: function () {
            // console.log('createList');
            $.ajax({
                type: "post",
                url: "./data/list.json",
                data: "json",
                success: function (d) {

                    var list = $('.l-list');
                    console.log(list[1]);

                    for (var i = 0; i < list.length; i++) {
                        // console.log(d[0][i][3]["subTitle"]);
                        var ullist = "<ul>";
                        for (var j = 0; j < d[0][i].length; j++) {
                            // console.log(d[0][i][j]["subTitle"]);

                            ullist += "<li>" +
                                "<span><img src='" + d[0][i][j]["url"] + "' alt=''></span>" +
                                "<label>" +
                                d[0][i][j]["subTitle"] +
                                "</label>" +
                                "</li>";

                        }
                        ullist += "</ul>";
                        // list.append(ullist);

                    }
                }
            })
        }
    };
    new Switch();

})(window, jQuery);