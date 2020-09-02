function edit_jumbotron(title, text) {
    document.getElementById("jumbotron_title").innerText = title;
    document.getElementById("jumbotron_text").innerText = text;
}

function qqimg(text) {
    //输入纯文本，输出安全span元素
    //最后还要对.qqimg 执行事件
    var e = document.createElement('span');
    if (text == null || text == '') {
        return e;
    }
    if (text.indexOf("[CQ:image,") == -1) {
        e.appendChild(document.createTextNode(text));
        return e;
    }
    /*
    xxxx[CQ:image,file=D853717E3E366D13EE6A8666297F568F.gif]asdasdf[CQ:image,file=D853717E3E366D13EE6A8666297F568F.gif]sss
    https://img.mahjong.pub/0000ACC42AE81F8612ACDA54FA1247D7.png.cqimg
    var a="asdfasd[CQ:image,file=ABC.gif]asdfsd[CQ:image,file=DE123.gif]".match(/\[CQ:image,file=([\dABCDEF]+\.\w+)\]/g)
    */
    var imgarr = text.match(/\[CQ:image,file=[\dABCDEF]+\.\w+\]/g);
    var fmt = text.replace(/\[CQ:image,file=([\dABCDEF]+\.\w+)\]/g, "{{{IMG}}}");
    var txtarr = fmt.split("{{{IMG}}}");
    for (var i = 0; i < txtarr.length; i++) {
        e.appendChild(document.createTextNode(txtarr[i]));
        if (i < imgarr.length) {
            var img = document.createElement('img');
            img.setAttribute('class', 'qqimg');
            img.setAttribute('id', imgarr[i].replace(/\[CQ:image,file=([\dABCDEF]+)\.\w+\]/, "$1"));
            img.setAttribute('alt', imgarr[i].replace(/\[CQ:image,file=([\dABCDEF]+\.\w+)\]/, "$1"));
            e.appendChild(img);
        }
    }
    return e;
}

function ce(arr) {//创建元素
    if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
    var e = document.createElement(arr[0]);
    for (var i = arr.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arr[i - 1], arr[i]);
    }
    return e;
}
function cet(arr,t) {//创建元素
    if (!Array.isArray(arr) || arr.length < 1 || arr.length % 2 == 0) { return; }
    var e = document.createElement(arr[0]);
    for (var i = arr.length - 1; i >= 1; i -= 2) {
        e.setAttribute(arr[i - 1], arr[i]);
    }
    e.innerText=t;
    return e;
}

function ohc() {//onhashchange
    var queryarr = ["", "", ""];
    document.getElementById("results").innerHTML = '';
    if (window.location.hash != ""
        && window.location.hash != "#"
        && window.location.hash != "/") {
        queryarr = window.location.hash.match(/^#\/(\w+)\/*(\w*)\/*(\w*)\/*(\w*)/);
    }
    switch (queryarr[1]) {
        case "group":
            if (queryarr[2] == "") {
                page_group_list();
            } else {
                page_group_info(queryarr[2]);
            }
            break;
        case "league":
            if (queryarr[2] == "") {
                page_league_list();
            } else {
                page_league_info(queryarr[2]);
            }
            break;
        case "titles":
            page_titles();
            break;
        case "quotation":
            if (queryarr[2] == "") {
                page_quotation();
            }
            if (queryarr[2] == "add") {
                page_quotation_add();
            }
            break;
        case "login":
            page_login();
            break;
        case "register":
            page_register();
            break;
        default:
            page_index();
            break;
    }
}

function readqqimg() {
    $(".qqimg").each(function () {
        var url = "https://img.mahjong.pub/" + this.alt + ".cqimg"
        //$.get("https://img.mahjong.pub/0000ACC42AE81F8612ACDA54FA1247D7.png.cqimg", function (result) {console.log(result)},"text");
        //$.get("https://img.mahjong.pub/0000ACC42AE81F8612ACDA54FA1247D7.png.cqimg", function (result) {
        $.get(url, function (result) {
            var imgurl = result.match(/^url=(.+)$/m);
            var eid = result.match(/^md5=(.+)$/m);
            var e = document.getElementById(eid[1]);
            e.setAttribute('src', 'https://yacdn.org/proxy/' + imgurl[1]);
            e.setAttribute('class', 'card-img');
        }, "text");
    });
}

ohc();



