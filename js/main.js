var webobj = {
    this_query: ["main"],
    last_query: [],
    apiurl: "https://s.000.mk/api/",
    bin2arr: function (bin, len) {
        //0b1101=>[1,0,1,1] 逆順序
        var arr = [];
        len = Math.abs(parseInt(len) || 0);
        while (len--) {
            arr.unshift((bin >> len) % 2);
        }
        return arr;
    },
    obj2text: {
        ctype2str: ["區域賽", "個人賽", "三麻 區域", "三麻 個人賽"],
        status: ["隱藏", "⛔不可報名", "📝報名中", "⏳進行中", "✅已結束"],
        color: ["info", "success", "danger", "primary"]
    },
    cache: { base: {} },
    ce: function () {//createElement
        if (arguments.length % 2 == 0 || arguments.length < 1) { return; }
        var e = document.createElement(arguments[0]);
        for (var i = arguments.length - 1; i >= 1; i -= 2) {
            e.setAttribute(arguments[i - 1], arguments[i]);
        }
        return e;
    },

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
        if (Object.keys(webobj.web_fn).indexOf(queryarr[0]) >= 0) { }
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
        var query_string = webobj.this_query.join("/");
        var e = document.getElementById("content_div");
        var templ = doT.template(document.getElementById(temp_id).text);
        if (typeof obj_or_url === "object") {
            if (Object.keys(obj_or_url).length === 0) {
                return e.innerText = "暂无数据";
            }
            return e.innerHTML = templ(obj_or_url);
        }
        if (typeof obj_or_url === "string") {
            if (webobj.cache.hasOwnProperty(query_string)) {
                return e.innerHTML = templ(webobj.cache[query_string]);
            } else {
                return $.getJSON(webobj.apiurl + obj_or_url + "?q=" + query_string,
                    function (json) {
                        if (Object.keys(json).length === 0) {
                            return e.innerText = "暂无数据";
                        }
                        webobj.cache[query_string] = json;
                        return e.innerHTML = templ(json);
                    });
            }

        }
        return e.innerText = "暂无数据";
    },

    web_fn: {
        main: function () {
            console.log("debug", webobj.this_query, webobj.last_query);
            webobj.change_jumb("大数邻", '立直麻将的线下段位系统+個人賽系统');
            webobj.load_page("templ_main", "rate.php");
        },
        admin: function () { },
        competition: function () {
            console.log("debug", webobj.this_query, webobj.last_query);
            var this_cid = webobj.this_query[1];
            $("#content_div").empty();
            if (webobj.cache.base.hasOwnProperty(this_cid)) {
                webobj.subpage(webobj.cache.base[this_cid], this_cid);
            } else {
                $.getJSON(webobj.apiurl + "rate.php?q=base/" + this_cid, function (json) {
                    webobj.cache.base[this_cid] = json;
                    webobj.subpage(json, this_cid);
                });
            }
        },
    },
    subpage: function (base, this_cid) {
        console.log(base);
        var e = document.getElementById("content_div");
        var ctype2str = webobj.obj2text.ctype2str;
        var status = webobj.obj2text.status;
        document.getElementById("jumbotron_title").innerText = base.name;
        var jtext = document.getElementById("jumbotron_text");
        jtext.innerHTML = "";

        jtext.appendChild(document.createTextNode(
            status[base.status] + " "
            + base.current_turn + "/" + base.total_turn + " (" + ctype2str[base.ctype] + ") "
            + base.about)
        );
        jtext.appendChild(document.createElement("br"))

        var submenu = webobj.ce("div", "class", "mt-2 btn-group btn-block");
        var link = ["", "log", "class", "ranking"];
        var text = ["介绍", "记录", "分组", "统计"];
        var sub_fn = (webobj.this_query.length >= 3
            && link.indexOf(webobj.this_query[2]) >= 0) ?
            webobj.this_query[2] : "about";

        for (var i = 0; i < link.length; i++) {
            var add = (i == 0) ? "" : "/";
            if (i == 1) { add += base.current_turn + "/" }
            var newa = webobj.ce("a",
                "class", "btn btn-info",
                "role", "button",
                "href", "#/" + this_cid + "/" + link[i] + add
            )
            newa.innerText = text[i]
            submenu.appendChild(newa);
        }
        jtext.appendChild(submenu);
        e.appendChild(webobj.ce('div', 'id', 'sub_content'));
        var geturl = {
            "about": [base.rule],
            "class": [""],
            "ranking": "rate.php",
            "log": "rate.php"
        };
        webobj.load_page("templ_" + sub_fn, geturl[sub_fn]);
    },
    filter1: function (that, order) {
        $(".filter1").removeClass("active");
        $(that).addClass("active");
        switch (order) {
            case 1://全部
                $(".card_item").removeClass("d-none");
                break;
            case 2://进行中
                $(".card_item").removeClass("d-none");
                $(".status_4").addClass("d-none");
                break;
            case 3://区域
                $(".card_item").removeClass("d-none");
                $(".ctype_1").addClass("d-none");
                $(".ctype_3").addClass("d-none");
                break;
            case 4://个人赛
                $(".card_item").removeClass("d-none");
                $(".ctype_0").addClass("d-none");
                $(".ctype_2").addClass("d-none");
                break;
            case 5://结束
                $(".card_item").addClass("d-none");
                $(".status_4").removeClass("d-none");
                break;
        }
    },

    filter2: function (order) {
        window.location.hash = "/" + webobj.this_query[1] + "/log/" + order;
    }

};

webobj.onhashchange();