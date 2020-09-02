function page_index() {
    $.get("index.md", function (result) {
        edit_jumbotron(
            "大竹林",
            "大竹林是一個學校管理系統\n主要用途：聯盟管理、學校管理、展示學校成員、展示頭銜、輔助參賽等等。"
        );
        document.getElementById("results").innerHTML = marked(result);
    }, "text");
}