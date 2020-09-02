function page_league_info(lid) {
    lid = Number(lid);
    $.getJSON("api/json.php?t=league&lid=" + lid, function (json) {

        edit_jumbotron(
            "聯盟",
            "這個頁面施工中"
        );
        document.getElementById("results").innerHTML = "頁面還沒做完";
    });

}