var webobj = {
    this_query: ["main"],
    last_query: [],
    ce: function () {//createElement
        if (arguments.length % 2 == 0 || arguments.length < 1) { return; }
        var e = document.createElement(arguments[0]);
        for (var i = arguments.length - 1; i >= 1; i -= 2) {
            e.setAttribute(arguments[i - 1], arguments[i]);
        }
        return e;
    },
    fn_list: ["main"],
    change_jumb: function (title, text) {
        if (title !== false) {
            document.getElementById("jumbotron_title").innerText = title;
        }
        if (text !== false) {
            document.getElementById("jumbotron_text").innerHTML = text;
        }
    },
    onhashchange: function () {
        var hash = window.location.hash.replace(/(^#\/?|\/$)/g, "");
        var queryarr = hash.split("/");
        if (webobj.fn_list.indexOf(queryarr[0]) >= 0) { }
        else if (queryarr[0] > 0) {
            queryarr.unshift("competition");
        } else {
            queryarr.unshift("main");
        }
        webobj.this_query = queryarr;
        if (Object.keys(webobj.web_fn).indexOf(queryarr[0]) >= 0) {
            webobj.web_fn[queryarr[0]]();
        }
        webobj.last_query = queryarr;
    },
    load_page: function (temp_id, obj_or_url) {
        var e = document.getElementById("content_div");
        var templ = doT.template(document.getElementById(temp_id).text);
        if (typeof obj_or_url === "object") {
            return e.innerHTML = templ(obj_or_url);
        }
        if (typeof obj_or_url === "string") {
            return $.getJSON(obj_or_url, function (json) {
                e.innerHTML = templ(json);
            });
        }
    },

    web_fn: {
        main: function () {
            console.log("debug", webobj.this_query, webobj.last_query);
            webobj.change_jumb("大数邻", '立直麻将的线下段位系统+个人赛系统');
            webobj.load_page("templ_main",
                //json start
                [
                    {
                        "name": "铁机路月赛",
                        "type": 0,
                        "index": 1,
                        "status": 1,
                        "percent": 0,
                        "text2": "湖北武汉"
                    }, {
                        "name": "浪速俱乐部",
                        "type": 0,
                        "index": 2,
                        "status": 2,
                        "percent": 30,
                        "text2": "江苏南京"
                    }, {
                        "name": "某某个人赛",
                        "type": 1,
                        "index": 3,
                        "status": 2,
                        "percent": 70,
                        "text2": "2020-11-11"
                    }, {
                        "name": "某某线下三麻",
                        "type": 2,
                        "index": 4,
                        "status": 2,
                        "percent": 80,
                        "text2": "湖北武汉"
                    }, {
                        "name": "某某个人赛2",
                        "type": 3,
                        "index": 4,
                        "status": 3,
                        "percent": 100,
                        "text2": "2020-11-11"
                    }
                ]
                //json end
            );
        },
        competition: function () {
            console.log("debug", webobj.this_query, webobj.last_query);

            webobj.load_page("templ_competition",
                //json start
                {
                    "base": {
                        "name": "铁机路月赛",
                        "type": 0,
                        "index": 1,
                        "status": 1,
                        "percent": 0,
                        "text2": "湖北武汉"
                    },
                    "log": [
                        ["2020-10-12", 1, "选手选手选手", "25000", -5, "选手选手选手", "25000", -5, "选手选手选手", "25000", -5, "选手选手选手", "25000", -5]
                    ]
                }
                //json end
            );
        },
    },
    index_filter: function (order) {
        //status=["不可报名","报名中","进行中","已结束"]
        //type2str=["区域","个人赛"]
        switch (order) {
            case 1://进行中
                $(".card_item").show();
                break;
            case 2://进行中
                $(".card_item").show();
                $(".status_3").hide();
                break;
            case 3://区域
                $(".card_item").show();
                $(".type_1").hide();
                break;
            case 4://个人赛
                $(".card_item").show();
                $(".type_0").hide();
                break;
            case 5://结束
                $(".card_item").hide();
                $(".status_3").show();
                break;
        }
    }
};

webobj.onhashchange();

正则 = (str = "") => /^.(.)\1$/.test(str);