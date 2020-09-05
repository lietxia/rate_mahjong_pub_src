var router_obj = {};
router_obj["index"] = function () {
    //$("#content_div").load("i.txt")
    $("#content_div").text("index还没写好");
};
router_obj["area"] = function () {
    $("#content_div").text("area还没写好");
};
router_obj["level"] = function () {
    $("#content_div").text("level还没写好");
};
router_obj["ranking"] = function () {
    $("#content_div").text("ranking还没写好");
};

function change_j(title, text) {
    if (title) { document.getElementById("jumbotron_title").innerText = title; }
    if (text) { document.getElementById("jumbotron_text").innerText = text; }
}

function web_router() {
    //onhashchange
    var hash = window.location.hash.replace(/(^#\/?|\/$)/g, "");
    if (hash == "") {
        console.log("fn=index\nquery=");
        return router_obj["index"]();
    }
    var queryarr = hash.split("/");

    if (Object.keys(router_obj).indexOf(queryarr[0]) >= 0) {
        var fn = queryarr.shift();
        console.log("fn=" + fn + "\nquery=" + queryarr);
        return router_obj[fn](queryarr);
    }
    console.log("fn=index\nquery=" + queryarr);
    return router_obj["index"](queryarr);
}
web_router();
function ce() {
    if (arguments.length % 2 == 0 || arguments.length < 1) { return; }
    var e = document.createElement(arguments[0]);
    for (var i = arguments.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arguments[i - 1], arguments[i]);
    }
    return e;
}

