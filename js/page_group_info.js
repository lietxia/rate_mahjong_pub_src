function page_group_info(gid) {
    gid = Number(gid);
    //展示队伍详情
    $.getJSON("api/json.php?t=group&gid=" + gid, function (json) {
        $about = json[0][1];
        if ($about == null || $about == '') {
            $about = '暫無簡介';
        }

        edit_jumbotron(json[0][0], '此團體共有 ' + (json.length - 1) + " 名成員\n" + $about);

        var maindiv = document.createElement('div');
        maindiv.setAttribute('class', "card-columns");

        var gametype = ["未知", "天鳳", "雀姬國服", "雀姬台服", "雀龍門", "天極牌", "雀魂", "世嘉MJ", "閃麻"];

        var usetype = [' 次ID ', ' 主ID '];

        for (var i = 1; i < json.length; i++) {

            var subdiv = document.createElement('div');
            subdiv.setAttribute('class', "card");
            if (json[i][3] != null && json[i][3] != '') {
                var cardimg = document.createElement('img');
                cardimg.setAttribute('class', "card-img-top");
                cardimg.setAttribute('src', "https://q1.qlogo.cn/g?b=qq&s=40&s=5&k=" + json[i][3]);
                cardimg.setAttribute("onerror", 'this.style.display = "none"')
                subdiv.appendChild(cardimg);
            }

            var card_body = document.createElement('div');
            card_body.setAttribute('class', 'card-body')

            var card_title = document.createElement('div');
            card_title.setAttribute('class', 'card-title');

            var newspan = document.createElement('span');
            if (json[i][2] == 2) {
                newspan.setAttribute('class', "badge badge-danger");
            } else {
                newspan.setAttribute('class', "badge badge-primary");
            }

            newspan.innerText = json[i][0];
            card_title.appendChild(newspan);
            card_title.appendChild(document.createTextNode(' ' + json[i][1]));

            card_body.appendChild(card_title);

            var card_text = document.createElement('div');//簡介 json[i][4];
            card_text.setAttribute('class', 'card-text');
            card_text.appendChild(qqimg(json[i][4]));
            card_body.appendChild(card_text);

            if (typeof json[i][5] != 'undefined') {
                var card_text = document.createElement('div');
                card_text.setAttribute('class', 'card-text');
                var text_muted = document.createElement('small');
                text_muted.setAttribute('class', 'text-muted');
                var tmpstr = '';
                for (var k = 0; k < json[i][5].length; k++) {
                    tmpstr += "\n" + gametype[json[i][5][k][0]] + usetype[json[i][5][k][2]] + json[i][5][k][1];
                }
                text_muted.innerText = tmpstr;
                card_text.appendChild(text_muted);
                card_body.appendChild(card_text);
            }

            subdiv.appendChild(card_body);
            maindiv.appendChild(subdiv);

        }

        document.getElementById("results").appendChild(maindiv);
        readqqimg();
    })


}
