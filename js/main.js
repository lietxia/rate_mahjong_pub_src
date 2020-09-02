
var router_obj = { 1: 21 };
(function web_router() {
    //onhashchange
    var hash = window.location.hash;
    if (hash != "" && hash != "#") {
        var queryarr = hash.split("/");
        if (Object.keys(router_obj).indexOf(queryarr[0]) >= 0) {
            var fn = queryarr.shift();
            router_obj[fn](queryarr);
        } else {
            router_obj["index"](queryarr);
        }
    }
})()

function ce() {
    if (arguments.length % 2 == 0 || arguments.length < 1) { return; }
    var e = document.createElement(arguments[0]);
    for (var i = arguments.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arguments[i - 1], arguments[i]);
    }
    return e;
}

