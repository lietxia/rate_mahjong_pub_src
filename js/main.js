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
        if (text) { document.getElementById("jumbotron_text").innerText = text; }
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

        },
        area: function (queryarr) {

        },
        level: function (queryarr) {

        },
        ranking: function (queryarr) {

        },
    }
};

webobj.router();
