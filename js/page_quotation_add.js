function page_quotation_add() {
    edit_jumbotron(
        "批量添加語錄圖",
        ""
    );
    document.getElementById("results").innerHTML = '<div class="input-group"> <div class="input-group-prepend"> <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">語錄出處</button> <div class="dropdown-menu" id="forqqitem"> </div> </div> <input type="text" id="forqq" class="form-control" placeholder="這是誰的語錄?輸入他的QQ號" /> </div> <hr /><input id="smfile" type="file" accept="image/*" multiple="multiple" /> <hr /> <input type="button" class="btn btn-primary" value="1.選擇文件後，點這裡上傳" onclick="addtr()" /><hr /><table class="table table-bordered table-hover table-sm" > <tbody id="result"><tr> <th>操作</th> <th>文件名</th> <th>URL</th> </tr> </tbody></table> <hr /> <input type="button" class="btn btn-primary" value="重新上傳所有未成功的圖片" onclick="upload_all()" /><hr /> <input type="button" class="btn btn-danger" value="2.上傳後，點這裡保存" onclick="SAVE_IMG()" />';
    var name = ['呆呆', '白靈夢', '咕咕鸽'];
    var qq = [65014046, 924053416, 535731351];
    for (var i = 0; i < name.length; i++) {
        document.getElementById('forqqitem').appendChild(cet(['a',
            'class', "dropdown-item",
            'href', "javascript:void(0)",
            'onclick', "document.getElementById('forqq').value=" + qq[i]
        ], name[i]))
    }
    //<a class="dropdown-item" href="javascript:void(0)" onclick="document.getElementById('forqq').value=65014046">呆呆</a>

    //
    var e = ce(['div', 'class', "btn-group", "role", "group"]);
    e.appendChild(cet(['a', 'href', '#/quotation/', 'class', "btn btn-outline-primary"], '顯示語錄'));
    e.appendChild(cet(['a', 'href', '#/quotation/add/', 'class', "btn btn-outline-primary"], '添加語錄'));
    document.getElementById("jumbotron_text").appendChild(e);
}



function upload_all() {
    var btns = document.getElementsByClassName('btn_upload');
    for (var i = 0; i < btns.length; i++) {
        btns[i].click();
    }
}


//上傳頭像
function addtr() {
    var smfile = document.getElementById("smfile").files;
    if (smfile.length == 0) {
        alert("請選擇圖片");
        return;
    }
    var id_start = document.getElementsByTagName('tr').length;
    for (var i = 0; i < smfile.length; i++ , id_start++) {
        var fileObj = smfile[i]; // js 获取文件对象
        if (typeof fileObj == "undefined" || fileObj.size <= 0) {
            alert("請選擇圖片");
            return;
        }

        //添加表格
        var newtr = document.createElement('tr');
        var newtd0 = document.createElement('td');
        newtd0.appendChild(ce(['input',
            'type', 'button',
            'onclick', "$(this).parent().parent().remove()",
            'value', '刪除',
            'class', "btn btn-primary"]));
        var newtd1 = document.createElement('td');
        newtd1.appendChild(document.createTextNode(fileObj["name"]));
        var newtd2 = ce(['td',
            'id', 'tr_' + id_start,
            'title', fileObj["name"],
            'class', 'td_url']
        );
        newtd2.appendChild(ce(['input',
            'type', 'button',
            'value', '準備上傳',
            'class', 'btn btn-primary btn_upload',
            'onclick', 'upload_img(' + i + ',' + '"tr_' + id_start + '")'])
        );
        newtr.appendChild(newtd0);
        newtr.appendChild(newtd1);
        newtr.appendChild(newtd2);
        document.getElementById("result").appendChild(newtr);

    }//for
    upload_all();
}//func

function upload_img(fileindex, id) {
    var returnmsg = {
        'Access Denied.': '拒絕訪問',
        'Upload file count limit.': '超過了最大可上傳次數',
        'Upload file frequency limit.': '超過了最大可上傳頻率',
        "Server error. Upload directory isn't writable.": '服务器錯誤。上傳目录不可寫。',
        'No files were uploaded.': '未上傳文件',
        'File is empty.': '文件是空的',
        'File is too large.': '文件太大',
        'File has an invalid extension.': '不支持的文件格式',
        'Image upload repeated limit.': '圖片已上傳過',
        'Could not save uploaded file.': '無法保存文件'
    };

    var smfile = document.getElementById("smfile").files;
    if (smfile.length == 0) {
        alert("請選擇圖片");
        return;
    }
    var target_td = document.getElementById(id);
    var filename = target_td.title;
    if (!fileindex in smfile || smfile[fileindex]['name'] != filename) {
        alert("可能你重新選了其他的文件，重試功能失效");
        return;
    }

    var fileObj = smfile[fileindex]; // js 获取文件对象
    var formFile = new FormData();
    formFile.append("image", fileObj); //加入文件对象

    $.ajax({
        url: "https://api.imgbb.com/1/upload?key=48529e1dc7e367e0b725508338369b11",
        data: formFile,
        method: "POST",
        dataType: "json",
        cache: false, //上傳文件无需缓存
        processData: false, //用于对data参数进行序列化处理 这里必须false
        contentType: false //必须
    }).done(function (data) {
        if (data.success) {
            target_td.innerHTML = '';
            target_td.appendChild(cet(['a', 'href', data.data.url], data.data.url));
        } else {
            target_td.children[0].value = '重試';
            if (target_td.children.length == 1) {
                var span = document.createElement('span');
                span.innerText = data.error.message;
                target_td.appendChild(span);
            }
            if (target_td.children.length == 2) {
                var span = target_td.children[1];
                span.innerText = data.error.message;
            }
        }
    }).fail(function () {
        target_td.children[0].value = 'AJAX失敗';
    });
}

function SAVE_IMG() {
    var imgs = document.getElementsByClassName('td_url');
    var urlstr = '';
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].innerText.substr(0, 4) == "http") {
            urlstr += ' ' + imgs[i].innerText;
        }
    }
    var forqq = document.getElementById('forqq').value;
    if (urlstr == '') { return alert('請上傳圖片') }
    $.post("api/json.php", {
        "t": "add_quotation",
        'forqq': forqq,
        "data": urlstr
    }, function (result) {
        if (result[0] == '1') {
            alert('保存成功，添加了' + result[1] + "條語錄")
        }
    }, "json");
}