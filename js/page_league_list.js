function page_league_list() {
    $.getJSON("api/json.php?t=league_list", function (json) {
        var table = document.createElement('table');
        table.setAttribute("class", "table table-bordered table-hover");
        var thead = document.createElement('thead');
        var new_tr = document.createElement('tr');

        var th_arr = ["編號", "聯盟名", "含有團體數", "簡介"];
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

        for (var i = 0; i < json.length; i++) {
            var new_tr = document.createElement('tr');
            for (j in json[i]) {
                var new_td = document.createElement('td');
                var newa = document.createElement("a");
                newa.setAttribute('href', "#/league/" + json[i]['lid'])
                newa.innerText = json[i][j];
                new_td.appendChild(newa)
                new_tr.appendChild(new_td);
            }
            tbody.appendChild(new_tr);
        }//for end 

        table.appendChild(tbody);
        document.getElementById("results").appendChild(table);
        edit_jumbotron(
            "聯盟列表",
            "系統共有 " + json.length + " 個聯盟"
        );
    });

}