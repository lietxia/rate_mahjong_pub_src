var router_obj = {};
router_obj["#index"] = function () {
    console.log("index");
    $("#content_div").load("i.txt");
};
router_obj["#group"] = function () {
    console.log("group");

};

function change_j(title, text) {
    if (title) { document.getElementById("jumbotron_title").innerText = title; }
    if (text) { document.getElementById("jumbotron_text").innerText = text; }
}

function web_router() {
    //onhashchange
    var hash = window.location.hash.replace(/(^\/|\/$)/, "");
    if (hash == "" && hash == "#") { return; }
    var queryarr = hash.split("/");
    //console.log(queryarr);
    if (Object.keys(router_obj).indexOf(queryarr[0]) >= 0) {
        var fn = queryarr.shift();
        return router_obj[fn](queryarr);
    }
    return router_obj["#index"](queryarr);
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

