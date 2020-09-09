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
    fn_list: ["main", "area", "level", "ranking"],
    fn_setting: {
        main: {
            jumb: ["大数邻", '日本麻将线下成绩展示系统<br />如果你是区域管理员，<a href="#/admin/">按此进入</a>管理页'],
            json: [
                {
                    "group_id": 1231231,
                    "group_name": "abc",
                    "timestamp": 1599297253,
                    "E": {
                        "QQ": 12345678,
                        "name": "A",
                        "score": 25000,
                        "ranking": 1
                    },
                    "S": {
                        "QQ": 12345678,
                        "name": "B",
                        "score": 25000,
                        "ranking": 2
                    },
                    "W": {
                        "QQ": 12345678,
                        "name": "C",
                        "score": 25000,
                        "ranking": 3
                    },
                    "N": {
                        "QQ": 12345678,
                        "name": "D",
                        "score": 25000,
                        "ranking": 4
                    }
                },
                {
                    "group": 1231231,
                    "group_name": "abc",
                    "timestamp": 1599297253,
                    "E": {
                        "QQ": 12345678,
                        "name": "A",
                        "score": 25000,
                        "ranking": 1
                    },
                    "S": {
                        "QQ": 12345678,
                        "name": "B",
                        "score": 25000,
                        "ranking": 2
                    },
                    "W": {
                        "QQ": 12345678,
                        "name": "C",
                        "score": 25000,
                        "ranking": 3
                    },
                    "N": {
                        "QQ": 12345678,
                        "name": "D",
                        "score": 25000,
                        "ranking": 4
                    }
                }
            ]
        },
        area: {
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
        },
    },
    change_jumb: function () {
        var data = (arguments.length == 2) ? arguments : webobj.fn_setting[webobj.this_fn].jumb;
        document.getElementById("jumbotron_title").innerText = data[0];
        document.getElementById("jumbotron_text").innerHTML = data[1];
    },
    router: function () {//onhashchange
        var hash = window.location.hash.replace(/(^#\/?|\/$)/g, "");
        var queryarr = hash.split("/");
        webobj.this_fn = "main";
        if (webobj.fn_list.indexOf(queryarr[0]) >= 0) {
            webobj.this_fn = queryarr.shift();
        }
        if (Object.keys(webobj.before_fn).indexOf(webobj.this_fn) >= 0) {
            webobj.before_fn[webobj.this_fn](queryarr);
        }
        webobj.load_page();
        webobj.change_jumb();
        if (Object.keys(webobj.after_fn).indexOf(webobj.this_fn) >= 0) {
            webobj.after_fn[webobj.this_fn](queryarr);
        }
        return webobj.last_fn = webobj.this_fn;
    },
    load_page: function () {
        var obj_or_url = (arguments.length > 0) ? arguments[0] : webobj.fn_setting[webobj.this_fn].json;
        var e = document.getElementById("content_div");
        var templ = doT.template(document.getElementById("templ_" + webobj.this_fn).text);
        if (typeof obj_or_url == "object") {
            return e.innerHTML = templ(obj_or_url);
        }
        if (typeof obj_or_url == "string") {
            return $.getJSON(obj_or_url, function (json) {
                e.innerHTML = templ(json);
            });
        }
    },
    before_fn: {},
    after_fn: {
        main: function (queryarr) {
            console.log("after_FN_MAIN");
        },
        area: function (queryarr) {
            console.log("after_FN_AREA");
        },
        level: function (queryarr) {
            console.log("after_FN_LEVEL");
        },
        ranking: function (queryarr) {
            console.log("after_FN_RANKING");
        },
    }
};

webobj.router();
