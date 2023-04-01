var webobj = {
    cid: 1,
    pw: "",
    json: {}
};
function log_gen_table() {
    var names = [];
    webobj.json.members.forEach(element => {
        names.push(element.name);
    });
    var text = document.getElementById('logtext');
    var logs = text.value.split("\n");
    var split_text = " ";
    var target = document.getElementById("table_new_log");
    target.innerText = '';
    if (logs[0].split("\t").length > logs[0].split(" ").length) {
        split_text = "\t";
    }
    for (let i = 0; i < logs.length; i++) {
        const row = logs[i].split(split_text);
        var tr = document.createElement('tr');
        var number_count = 0;
        var number_sum = 0;
        var arr = [];
        for (let j = 0; j < row.length; j++) {
            if (row[j] === '') continue;
            arr.push(row[j]);
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(row[j]));
            //td.setAttribute("contenteditable", "true");
            if (!isNaN(row[j])) {
                number_count++;
                number_sum -= row[j];
            } else {
                if (names.includes(row[j])) {
                    td.className = "bg-success";
                } else {
                    td.className = "bg-warning";
                }
            }
            tr.appendChild(td);
        }
        if (number_count === 4) {//数值
            number_sum = Math.abs(number_sum);
            if (number_sum <= 150) {
                number_sum =
                    Math.floor(arr[0] * 10) +
                    Math.floor(arr[1] * 10) +
                    Math.floor(arr[2] * 10) +
                    Math.floor(arr[3] * 10);
            } else {
                if (number_sum >= 90000) {
                    number_sum =
                        Math.floor(arr[0] / 100) +
                        Math.floor(arr[1] / 100) +
                        Math.floor(arr[2] / 100) +
                        Math.floor(arr[3] / 100);
                }
            }
            console.log(number_sum);
            if (number_sum != 1000) {
                tr.className = "table-warning";
            }
            if (Array.from(new Set(arr)).length !== 4) {
                tr.className = "table-danger";
            }

        } else {

        }

        target.appendChild(tr);
    }
}

function login_select_change() {
    tgt = document.getElementById('login_cid');
    s = document.getElementById('login_select');
    tgt.value = s.options[s.selectedIndex].value;
}
function save_table() {
    var tr = document.querySelectorAll("#table_data>tr")
    var text = "";
    for (var i = 0; i < tr.length; i++) {
        text += "\n" + (tr[i].innerText.trim().replace(/\s+/, "\t"));
    }
    document.getElementById("new_member_textarea").value = text.trim();
    addmember();
}

function delete_select() {
    var check_boxes = document.querySelectorAll('#table_data input:checked');
    var text = "";
    for (var i = 0; i < check_boxes.length; i++) {
        text += ' ' + check_boxes[i].parentNode.innerText;
    }
    document.getElementById("deltext").value = text.trim()
    document.getElementById("del_type").value = 2;
    del_log_or_member();
}

function now_time() {
    var now = new Date();
    return now.getFullYear() + "/"
        + (now.getMonth() + 1) + "/"
        + now.getDate() + " "
        + now.getHours() + ":"
        + now.getMinutes() + ":"
        + now.getSeconds();
}

function display_post(json) {
    var now = now_time();
    if (json.hasOwnProperty("status") == false || json.hasOwnProperty("text") == false) {
        json = { "status": 2, "text": "空返回值#315" }
    }
    if (typeof json.text === "object") {
        json.text = JSON.stringify(json.text);
    }
    var div = document.createElement("div");
    var color = ["success", "warning", "danger", "info", "primary"];
    div.setAttribute("class", "alert alert-" + color[json.status] + " alert-dismissible fade show shadow-sm");
    div.setAttribute("role", "alert");
    var pre = document.createElement('pre');
    pre.appendChild(document.createTextNode(now + " " + json.text));
    div.appendChild(pre);
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn-close");
    btn.setAttribute("data-bs-dismiss", "alert");
    btn.setAttribute("aria-label", "Close");
    div.appendChild(btn);
    var tgt = document.getElementById("return_msg");
    if (tgt.childNodes.length === 0) {
        tgt.appendChild(div);
    } else {
        tgt.insertBefore(div, tgt.childNodes[0]);
        document.documentElement.scrollTop = 0;
    }
}

(function () {
    var patt = new RegExp(/(.+)[?&]tdsourcetag=\w+$/);
    var arr = patt.exec(window.location.href);
    if (arr != null) {
        window.location.href = arr[1];
    }
    window.apiurl = "https://cdn.r-mj.com/r/";
    var querystr = document.location.hash.match(/\?cid=(\d+)&pw=(.+)/);
    var l_cid = localStorage.getItem('rate_cid');
    var l_pw = localStorage.getItem('rate_pw');
    if (l_cid !== null) {
        document.getElementById("login_cid").value = l_cid;
    }
    if (l_cid !== null && l_pw !== null && l_cid !== '' && l_pw !== '') {
        querystr = [0, l_cid, l_pw];
        document.getElementById("login_cid").value = l_cid;
        document.getElementById("login_passwd").value = l_pw;
    }
    if (querystr) {
        document.location.hash = "";
        login(querystr[1], querystr[2]);
    }

    //options
    var target = document.getElementById('login_select');
    for (const cid in cid2name) {
        if (cid >= 2 && Object.hasOwnProperty.call(cid2name, cid)) {
            const opt = document.createElement('option');
            opt.setAttribute('value', cid);
            opt.innerText = cid2name[cid];
            target.appendChild(opt);
        }
    }
}())

function bin2arr(bin, len) {
    //0b1101=>[1,0,1,1] 逆順序
    var arr = [];
    len = Math.abs(parseInt(len) || 0);
    while (len--) {
        arr.unshift((bin >> len) % 2);
    }
    return arr;
}

function show_config(json) {
    //display_post({status: 0, text: "登入成功"});
    webobj.json = json;
    $("#form1").addClass('d-none')
    $("#accordionExample").removeClass('d-none');
    var input_txt = ["name", "pw",
        "area_name", "numerator", "qqgroup", "rule", "denominator", "admins", "address", "north", "east"];//id=i_XXXX
    var input_select = ["ctype", "status"];//i_type
    var input_checkbox = ["charge_by_hour", "no_smoking", "order_first", "scoreboard", "ban_gambling"];
    var setting_arr = bin2arr(json.setting, input_checkbox.length);
    var tgt = document.getElementById("table_data");
    tgt.textContent = '';
    var ta = "";
    var forarr = ["name", "qq", "gold", "balance"];
    for (var i = 0; i < json.members.length; i++) {
        var thisdata = json.members[i];
        ta += thisdata.phone + "\t"
            + thisdata.name + "\t"
            + thisdata.qq + "\t"
            + thisdata.gold + "\t"
            + thisdata.balance + "\r\n";
        var tmp_tr = document.createElement("tr");
        var td = document.createElement("td");
        var div = document.createElement("div");
        div.className = "form-check";
        var ipt = document.createElement("input");
        ipt.className = "form-check-input"
        ipt.setAttribute('type', "checkbox");
        ipt.setAttribute('id', "cb_" + thisdata.idx);
        var lable = document.createElement("label");
        lable.className = "form-check-label"
        lable.setAttribute('for', "cb_" + thisdata.idx);
        lable.innerText = thisdata.phone;
        div.appendChild(ipt);
        div.appendChild(lable);
        td.appendChild(div);
        tmp_tr.appendChild(td);
        for (var j = 0; j < forarr.length; j++) {
            var td = document.createElement("td");
            td.setAttribute('contenteditable', "true");
            td.innerText = thisdata[forarr[j]];
            tmp_tr.appendChild(td);
        }
        tgt.appendChild(tmp_tr);
    }
    $("#new_member_textarea").val(ta);
    for (var i = 0; i < input_txt.length; i++) {
        var tgt_id = input_txt[i];
        var e = document.getElementById("i_" + tgt_id);
        e.value = json[tgt_id];
    }
    for (var i = 0; i < input_select.length; i++) {
        var tgt_id = input_select[i];
        var e = document.getElementById("i_" + tgt_id);
        e.options[json[tgt_id]].selected = true;
    }
    for (var i = 0; i < input_checkbox.length; i++) {
        var tgt_id = input_checkbox[i];
        var e = document.getElementById(tgt_id);
        e.checked = setting_arr[i] == 1;
    }
}

function new_row() {
    var phone = parseInt(prompt("请输入手机号"));

    if (phone === NaN || phone < 10000000000) {
        return alert('手机号大于10000000000');
    }
    var user_name = prompt("请输入昵称").trim();
    if (user_name == '') {
        return alert('用户名不能是空');
    }
    if (!isNaN(user_name)) {
        return alert('用户名不能是纯数字');
    }
    var tr = document.createElement('tr');
    tr.innerHTML = '<td><div class="form-check"><label class="form-check-label" ><input class="form-check-input" type="checkbox">' + phone + '</label></div></td><td contenteditable="true">' + user_name + '</td><td contenteditable="true">0</td><td contenteditable="true">0</td><td contenteditable="true">0</td>';
    document.getElementById('table_data').appendChild(tr);
}

function addmember() {
    var postdata = {
        "cid": webobj.cid,
        "pw": webobj.pw,
        "q": "addmember",
        "order": $("#new_member_textarea").val()
    };
    return $.post(window.apiurl + "addmember.php", postdata,
        function (data) {
            login();
            if (!data.hasOwnProperty("status") || !data.hasOwnProperty("text")) {
                return display_post({ status: 1, text: "返回空" });
            }
            return display_post(data);
        }, "json");
}

function addlog() {
    var postdata = {
        "cid": webobj.cid,
        "pw": webobj.pw,
        "q": "addlog",
        "is_national": 1,
        "order": $("#logtext").val()
    };
    return $.post(window.apiurl + "addlog.php", postdata,
        function (data) {
            login();
            if (!data.hasOwnProperty("status") || !data.hasOwnProperty("text")) {
                return display_post({ status: 1, text: "返回空" });
            }
            return display_post(data);
        }, "json");
}

function before_post() {
    var newdata = $("form").serializeArray();
    newdata.push({ "name": "pw", "value": webobj.pw });
    newdata.push({ "name": "cid", "value": webobj.cid });
    newdata.push({ "name": "q", "value": "update_base" });
    var input_checkbox = ["charge_by_hour", "no_smoking", "order_first", "scoreboard", "ban_gambling"];
    var settings = "";
    for (var i = 0; i < input_checkbox.length; i++) {
        var e = document.getElementById(input_checkbox[i]);
        settings = (e.checked ? "1" : "0") + settings;
    }
    //console.log("s", settings);
    newdata.push({ "name": "setting", "value": parseInt(settings, 2) });

    //console.log(newdata);
    return $.post(window.apiurl + "rate.php", newdata,
        function (data) {
            if (!data.hasOwnProperty("status") || !data.hasOwnProperty("text")) {
                return display_post({ status: 1, text: "返回空" });
            }
            return display_post(data);
        }, "json");
}

function del_log_or_member() {
    if (confirm('此操作很危险，要进行吗？') == false) {
        return;
    }
    var t = document.getElementById("del_type").value;
    if (t != 1 && t != 2 && t != 3) {
        return;
    }
    var type = ["none", "del_log", "del_member", "edit_phone"];
    var postdata = {
        "cid": webobj.cid,
        "pw": webobj.pw,
        "q": type[t],
        "order": $("#deltext").val()
    };
    return $.post(window.apiurl + "del_log.php", postdata,
        function (data) {
            login();
            if (!data.hasOwnProperty("status") || !data.hasOwnProperty("text")) {
                return display_post({ status: 1, text: "返回空" });
            }
            return display_post(data);
        }, "json");
}
function login_btn(status = true) {
    var btn = document.getElementById('login_button');
    if (status) {
        btn.value = '登錄中……';
        btn.setAttribute('disabled', true);
    } else {
        btn.value = '登錄中';
        btn.setAttribute('disabled', false);
    }
}
function login(cid, pw) {
    if (arguments.length === 0) {
        var cid = document.getElementById("login_cid").value;
        var pw = document.getElementById("login_passwd").value;
    }
    var l_pw = localStorage.getItem('rate_pw');
    var l_cid = localStorage.getItem('rate_cid');
    if (l_pw !== null && l_cid !== null) {
        webobj.pw = l_pw;
        webobj.cid = l_cid;
        pw = l_pw;
        cid = l_cid;
        document.getElementById("login_cid").value = cid;
        document.getElementById("login_passwd").value = pw;
    }
    login_btn(true);
    $.post(window.apiurl + "rate.php", {
        "q": "login",
        "cid": cid,
        "pw": pw
    }, function (data) {
        if (!data.hasOwnProperty("status")) {
            return display_post({ status: 1, text: "返回空" });
        }
        if (parseInt(data.status) === 0) {
            localStorage.setItem('rate_cid', cid);
            localStorage.setItem('rate_pw', pw);
            console.log('login.status=0', data);
            show_config(data.data);

        } else {
            console.log('login.status != 0', data);
            display_post(data);
        }
        return;
    }, "json");
}