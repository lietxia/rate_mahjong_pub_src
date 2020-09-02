var router_obj = { 1: 21 };
(function web_router() {
    //onhashchange
    var hash = window.location.hash.replace(/(^\/|\/$)/, "");
    if (hash == "" && hash == "#") { return; }
    var queryarr = hash.split("/");
    if (Object.keys(router_obj).indexOf(queryarr[0]) >= 0) {
        var fn = queryarr.shift();
        return router_obj[fn](queryarr);
    }
    return router_obj["index"](queryarr);
})()

function ce() {
    if (arguments.length % 2 == 0 || arguments.length < 1) { return; }
    var e = document.createElement(arguments[0]);
    for (var i = arguments.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arguments[i - 1], arguments[i]);
    }
    return e;
}

