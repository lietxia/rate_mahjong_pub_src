var webobj = {
    last_hash: "",
    last_fn: "",
    this_fn: "main",
    ce: function () {//createElement
        if (arguments.length % 2 == 0 || arguments.length < 1) { return; }
        var e = document.createElement(arguments[0]);
        for (var i = arguments.length - 1; i >= 1; i -= 2) {
            e.setAttribute(arguments[i - 1], arguments[i]);
        }
        return e;
    },
    fn_list: ["main", "a", "level", "ranking"],
    fn_setting: {
        main: {
            jumb: ["大数邻", '立直麻将的线下段位系统+个人赛系统'],
            json: [
                {
                    "name": "铁机路月赛",
                    "type": 0,
                    "id": 1,
                    "status": 1,
                    "percent": 0,
                    "text2": "湖北武汉"
                }, {
                    "name": "浪速俱乐部",
                    "type": 0,
                    "id": 2,
                    "status": 2,
                    "percent": 30,
                    "text2": "江苏南京"
                }, {
                    "name": "某某个人赛",
                    "type": 1,
                    "id": 1,
                    "status": 2,
                    "percent": 70,
                    "text2": "2020-11-11"
                }, {
                    "name": "某某个人赛2",
                    "type": 1,
                    "id": 1,
                    "status": 3,
                    "percent": 100,
                    "text2": "2020-11-11"
                }
            ]
        },
        a: {
            jumb: ["区域列表", '各个地区的信息列表'],
            json: [
                {
                    "group_id": 123456,
                    "group_name": "abc",
                    "count_members": 123,
                    "total_battle": 12,
                    "current_battle": 12
                },
                {
                    "group_id": 123456,
                    "group_name": "abc",
                    "count_members": 123,
                    "total_battle": 12,
                    "current_battle": 12
                }
            ]
        }
    },
    change_jumb: function () {
        var data = (arguments.length >= 1) ? arguments
            : webobj.fn_setting[webobj.this_fn].jumb;
        if (data.length === 1) { data[1] = false; }
        if (data[0]) {
            document.getElementById("jumbotron_title").innerText = data[0];
        }
        if (data[1]) {
            document.getElementById("jumbotron_text").innerHTML = data[1];
        }
    },
    onhashchange: function () {
        var hash = window.location.hash.replace(/(^#\/?|\/$)/g, "");
        var queryarr = hash.split("/");
        webobj.this_fn = "main";
        if (webobj.fn_list.indexOf(queryarr[0]) >= 0) {
            webobj.this_fn = queryarr.shift();
        }
        webobj.change_jumb();
        if (Object.keys(webobj.before_fn).indexOf(webobj.this_fn) >= 0) {
            webobj.load_page.apply(null, webobj.before_fn[webobj.this_fn](queryarr));
        } else {
            webobj.load_page();
        }
        if (Object.keys(webobj.after_fn).indexOf(webobj.this_fn) >= 0) {
            webobj.after_fn[webobj.this_fn](queryarr);
        }
        webobj.last_fn = webobj.this_fn;
    },
    load_page: function () {
        var e = document.getElementById("content_div");
        var obj_or_url = (arguments.length >= 1) ? arguments[0]
            : webobj.fn_setting[webobj.this_fn].json;
        var templ = doT.template(
            (arguments.length >= 2) ? arguments[1]
                : document.getElementById("templ_" + webobj.this_fn).text
        );
        if (typeof obj_or_url === "object") {
            return e.innerHTML = templ(obj_or_url);
        }
        if (typeof obj_or_url === "string") {
            return $.getJSON(obj_or_url, function (json) {
                e.innerHTML = templ(json);
            });
        }
    },
    before_fn: {
        area: function (queryarr) {
            console.log("before_FN_AREA", queryarr);
            var returnarr = [];
            if (typeof queryarr != "object" || isNaN(queryarr[0])) {
                return;
            }
            webobj.change_jumb(false, "区域列表第" + queryarr[0] + "页");
            returnarr[0] = "area.json?page=" + queryarr[0];
            return returnarr;
        },
    },
    after_fn: {
        main: function (queryarr) {
            console.log("after_FN_MAIN", queryarr);
        },
        area: function (queryarr) {
            console.log("after_FN_AREA", queryarr);
        },
        level: function (queryarr) {
            console.log("after_FN_LEVEL", queryarr);
        },
        ranking: function (queryarr) {
            console.log("after_FN_RANKING", queryarr);
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