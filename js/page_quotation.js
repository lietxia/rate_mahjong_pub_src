function page_quotation(p1) {
    edit_jumbotron(
        "語錄",
        ""
    );
    document.getElementById("results").innerHTML = "";
    var e = ce(['div', 'class', "btn-group", "role", "group"]);
    e.appendChild(cet(['a', 'href', '#/quotation/', 'class', "btn btn-outline-primary"], '最新語錄'));
    e.appendChild(cet(['a', 'href', '#/quotation/add/', 'class', "btn btn-outline-primary"], '添加語錄'));
    document.getElementById("jumbotron_text").appendChild(e);

    document.getElementById("results").appendChild(ce(['div', 'class', "card-columns", 'id', 'cards_target']));

    $.getJSON("api/json.php?t=get_quo_count", function (json) {
        var target = document.getElementById("jumbotron_text");
        target.appendChild(document.createElement('hr'));
        var pagecount = Math.ceil(json['table_rows'] / 15);
        for (var i = 0; i < pagecount; i++) {
            target.appendChild(ce(['input', 'type', 'button', 'value', '第' + (i + 1) + '頁', 'class', 'btn btn-secondary mr-2 mb-2', 'onclick', 'get_quo_data(' + i + ')']));
        }
    })
    get_quo_data(0);

    $('#imgmodal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var imgsrc = button.data('src') // Extract info from data-* attributes
        var imginx = button.data('inx') // Extract info from data-* attributes
        //modal.find('.modal-title').text('New message to ' + recipient)
        document.getElementById('modalimg').setAttribute('src', imgsrc);
        document.getElementById('imgmodal_del').setAttribute('onclick', 'delimg(' + imginx + ')');
    })
}

function delimg(inx) {
    var res = confirm("真的要刪除?");
    if (res == true) {
        $.getJSON("api/json.php?t=del_quo&inx=" + inx, function (json) {
            if (json[0] == 1) {
                alert('刪除成功');
            } else {
                alert('刪除失敗。可能已被刪除');
            }
        })
    }
}

function get_quo_data(page) {
    $.getJSON("api/json.php?t=get_quo_page&page=" + page, function (json) {
        var qq = { 0: '未知', 65014046: '呆呆', 924053416: '白靈夢', 535731351: '咕咕鸽' };
        var cards_target = document.getElementById('cards_target');
        cards_target.innerHTML = '';
        for (var i = 0; i < json.length; i++) {
            if (json[i]['type'] != 1) {
                continue;
            }
            var subdiv = document.createElement('div');
            subdiv.setAttribute('class', "card");
            //頭像
            var newa = ce(['a',
                'data-toggle', "modal",
                'data-target', "#imgmodal",
                "data-inx", json[i]['inx'],
                "data-src", json[i]['text']
            ]);
            var cardimg = document.createElement('img');
            cardimg.setAttribute('class', "card-img-top");
            cardimg.setAttribute('src', json[i]['text']);
            cardimg.setAttribute("onerror", 'this.style.display = "none"')
            newa.appendChild(cardimg);
            subdiv.appendChild(newa);

            var card_body = document.createElement('div');
            card_body.setAttribute('class', 'card-body')

            var card_text = document.createElement('div');
            card_text.setAttribute('class', 'card-text');
            //<span class="badge badge-secondary">New</span>
            card_text.appendChild(cet(['span', 'class', 'badge badge-secondary'], json[i]['inx']));
            if (json[i]['forqq'] in qq) {
                card_text.appendChild(cet(['span'], ' ' + qq[json[i]['forqq']] + "的語錄"));
            } else {
                card_text.appendChild(cet(['span'], ' QQ' + json[i]['forqq'] + "的語錄"));
            }
            card_text.appendChild(document.createElement('br'));
            card_text.appendChild(cet(['small', 'class', 'text-muted'], json[i]['time']));
            card_body.appendChild(card_text);
            subdiv.appendChild(card_body);
            cards_target.appendChild(subdiv);
        }
    });
}