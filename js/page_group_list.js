function page_group_list() {
    $.getJSON("api/json.php?t=group_list", function (json) {

        var table = document.createElement('table');
        table.setAttribute("class", "table table-bordered table-hover");

        var thead = document.createElement('thead');
        var new_tr = document.createElement('tr');

        var th_arr = ["編號", "團體名", "成員", "所屬聯盟", "盟內等級"];

        for (var i = 0; i < th_arr.length; i++) {
            var new_th = document.createElement('th');
            new_th.scope = "col";
            new_th.innerText = th_arr[i];
            new_tr.appendChild(new_th);
        }

        thead.appendChild(new_tr);
        table.appendChild(thead);

        //主內容
        var tbody = document.createElement('tbody');

        var menber_count = 0;
        for (var i = 0; i < json.length; i++) {
            var new_tr = document.createElement('tr');

            for (var j = 0; j < th_arr.length; j++) {
                var new_td = document.createElement('td');

                switch (j) {
                    case 1:
                        //團體名
                        var new_a = document.createElement('a');
                        new_a.setAttribute('href', '#/group/' + json[i][0]);
                        new_a.innerText = json[i][1];
                        new_td.appendChild(new_a);
                        break;

                    case 3:
                        //所屬聯盟
                        var new_a = document.createElement('a');
                        new_a.setAttribute('href', '#/league/' + json[i][5]);
                        new_a.innerText = json[i][3];
                        new_td.appendChild(new_a);
                        break;

                    case 2:
                        //成員數
                        menber_count += parseInt(json[i][2]);

                    default:
                        new_td.innerText = json[i][j];
                        break;
                }

                new_tr.appendChild(new_td);
            }

            tbody.appendChild(new_tr);
        }
        //for
        table.appendChild(tbody);
        document.getElementById("results").appendChild(table);

        edit_jumbotron("團體列表", '本系統共有 ' + json.length + ' 個團體以及 ' + menber_count + ' 位用戶');
    });
}
