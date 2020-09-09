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
            json: "main.json"
        },
        area: {
            jumb: ["区域列表", '各个地区的信息列表'],
            json: "area.json"
        },
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
    router: function () {//onhashchange
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
        return webobj.last_fn = webobj.this_fn;
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
    }
};

webobj.router();

正则=(str="")=>/^.(.)\1$/.test(str);