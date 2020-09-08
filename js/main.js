var webobj = {
    last_hash: "",
    ce: function () {
        if (arguments.length % 2 == 0 || arguments.length < 1) { return; }
        var e = document.createElement(arguments[0]);
        for (var i = arguments.length - 1; i >= 1; i -= 2) {
            e.setAttribute(arguments[i - 1], arguments[i]);
        }
        return e;
    },
    change_jumb: function (title, text) {
        if (title) { document.getElementById("jumbotron_title").innerText = title; }
        if (text) { document.getElementById("jumbotron_text").innerHTML = text; }
    },
    router: function () {//onhashchange
        var hash = window.location.hash.replace(/(^#\/?|\/$)/g, "");
        var queryarr = hash.split("/");
        var fn = "main";
        if (Object.keys(webobj.router_fn).indexOf(queryarr[0]) >= 0) {
            fn = queryarr.shift();
        }
        webobj.router_fn[fn](queryarr);
    },
    load_page: function (json_url, tmp_id) {
        return $.getJSON(json_url, function (json) {
            document.getElementById("content_div").innerHTML =
                doT.template(document.getElementById(tmp_id).innerHTML)(json);
        });
    },
    router_fn: {
        main: function (queryarr) {
            console.log("FN_MAIN");
            webobj.change_jumb(
                "大数邻",
                '日本麻将线下成绩展示系统<br />如果你是区域管理员，<a href="./admin/">按此进入</a>管理页'
            );
            var json = [
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
            ];
            document.getElementById("content_div").innerHTML =
                doT.template(document.getElementById("tmp_idx").text)(json);
        },
        area: function (queryarr) {
            console.log("FN_AREA");
        },
        level: function (queryarr) {
            console.log("FN_LEVEL");
        },
        ranking: function (queryarr) {
            console.log("FN_RANKING");
        },
    }
};

webobj.router();
