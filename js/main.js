var webobj = {
	this_query: ["main"],
	last_query: [],
	page: 1,
	lv_data: ["新人", "5级", "4级", "3级", "2级", "1级", "初段", "二段", "三段", "四段", "五段", "六段", "七段", "八段", "九段"],
	apiurl: "https://cdn.r-mj.com/r/",
	excel1: function () {
		if (webobj.last_query[2] == 'log') { webobj.log_page(true); }
		if (document.getElementById('xls_script')) {
			window.webobj.excel2();
			return
		}
		if (!!window.ActiveXObject || "ActiveXObject" in window) {
			//如果是IE
			var js = document.createElement('script');
			js.setAttribute('src', 'https://cdn.staticfile.org/xlsx/0.18.0/shim.min.js');
			document.body.appendChild(js);
		}
		var js2 = document.createElement('script');
		js2.setAttribute('src', 'https://cdn.staticfile.org/xlsx/0.18.0/xlsx.full.min.js');
		js2.setAttribute('id', 'xls_script');
		js2.setAttribute('onload', 'window.webobj.excel2()');
		document.body.appendChild(js2);
	},
	excel2: function () {
		var workbook = XLSX.utils.book_new();
		var tables = document.getElementsByTagName('table');
		for (var i = 0; i < tables.length; i++) {
			var ws = XLSX.utils.table_to_sheet(tables[i]);
			XLSX.utils.book_append_sheet(workbook, ws, tables[i].children[0].innerText.substr(-10));
		}
		XLSX.writeFile(workbook, window.location.href.replace(/\W/g, "").substr(-10) + ".xlsx");
	},
	marked_fmt: function () {
		var target = document.getElementById("content_div");
		var img = target.getElementsByTagName("img");
		for (var i = 0; i < img.length; i++) {
			img[i].className = 'img-fluid';
		}
		var tables = target.getElementsByTagName("table");
		for (var i = 0; i < tables.length; i++) {
			tables[i].className = 'table table-sm table-striped table-bordered table-hover text-center';
		}
	},
	sort_table1: function (that) {
		var table = document.getElementById('table1'),
			tableHead = table.querySelector('thead'),
			tableHeaders = tableHead.querySelectorAll('th'),
			tableBody = table.querySelector('tbody'),
			tableHeader = that,
			//textContent = tableHeader.textContent,
			tableHeaderIndex,
			isAscending, order;
		//if (textContent == 'add row') { return }
		while (tableHeader.nodeName !== 'TH') {
			tableHeader = tableHeader.parentNode;
		}
		tableHeaderIndex = Array.prototype.indexOf.call(tableHeaders, tableHeader);
		isAscending = tableHeader.getAttribute('data-order') === 'asc';
		order = isAscending ? 'desc' : 'asc';
		tableHeader.setAttribute('data-order', order);
		tinysort(
			tableBody.querySelectorAll('tr'), {
			selector: 'td:nth-child(' + (tableHeaderIndex + 1) + ')',
			order: order
		});

		var trs = tableBody.querySelectorAll('tr');
		for (var i = 0; i < trs.length; i++) {
			trs[i].children[0].innerHTML = i + 1;
		}
	},
	page_go: function (log_page) {
		// -1 == 向前翻页
		// 0  == 向后翻页
		var page = parseInt(webobj.page);
		var this_query = webobj.this_query;
		var this_log = webobj.cache[this_query.join('/')];
		var page_max = Math.ceil(this_log.length / 50);

		if (log_page === -1) {
			var this_page = page - 1;
		}
		if (log_page === 0) {
			var this_page = page + 1;
		}
		if (log_page >= 1) {
			var this_page = log_page;
		}

		if (this_page < 1) {
			this_page = 1
		} else {
			if (this_page > page_max) {
				this_page = page_max;
			}
		}
		window.webobj.page = this_page;
		webobj.log_page(false);
	},
	log_page: function (full) {
		var page = window.webobj.page;
		document.getElementById('input_page_1').value = page;
		document.getElementById('input_page_2').value = page;
		var this_query = window.webobj.this_query;
		var this_log = window.webobj.cache[this_query.join('/')];
		var th = ["#", "时间", "地域", "一位", "点数", "成绩", "二位", "点数", "成绩", "三位", "点数", "成绩", "四位", "点数", "成绩"];
		if (this_query[1] > 1) { th.splice(2, 1); }
		var myth = document.getElementById("my_th");
		var tbody = document.getElementById('my_tbody');
		var base = webobj.cache.base[webobj.this_query[1]];
		tbody.textContent = '';
		myth.textContent = '';
		for (var i = 0; i < th.length; i++) {
			var e = document.createElement('th');
			e.innerText = th[i];
			myth.appendChild(e);
		}
		if (full === true) {
			var start = 0, end = this_log.length;
		} else {
			var end = page * 50;
			var start = end - 50;
			if (start < 0) start = 0;
			if (end > this_log.length) end = this_log.length;
		}
		for (var i = start; i < end; i++) {
			var tr = document.createElement('tr');
			var value = this_log[i];
			var text = [
				value[14], value[0],
				'<a href="#/'
				+ value[1] + '/log/">'
				+ base.cid2name[value[1]]
				+ '</a>',

				'<a target="_blank" href="./chart/?area='
				+ value[1] + '&name=' + value[2] + '">'
				+ value[2]
				+ '</a>', value[3], value[4] / 10,

				'<a target="_blank" href="./chart/?area='
				+ value[1] + '&name=' + value[5] + '">'
				+ value[5]
				+ '</a>', value[6], value[7] / 10,

				'<a target="_blank" href="./chart/?area='
				+ value[1] + '&name=' + value[8] + '">'
				+ value[8]
				+ '</a>', value[9], value[10] / 10,

				'<a target="_blank" href="./chart/?area='
				+ value[1] + '&name=' + value[11] + '">'
				+ value[11]
				+ '</a>', value[12], value[13] / 10,
			];
			var myclass = [
				false, "small", false,
				false, false, 'text-success',
				false, false, 'text-success',
				false, false, 'text-danger',
				false, false, 'text-danger',
			];
			if (this_query[1] > 1) {
				text.splice(2, 1);
				myclass.splice(2, 1);
			}
			for (let j = 0; j < text.length; j++) {
				var ele = document.createElement('td');
				ele.innerHTML = text[j];
				if (myclass !== false) {
					ele.className = myclass[j];
				}
				tr.appendChild(ele)
			}
			tbody.appendChild(tr);
		}
	},
	bin2arr: function (bin, len) {
		//0b1101=>[1,0,1,1] 逆順序
		var arr = [];
		len = Math.abs(parseInt(len) || 0);
		while (len--) {
			arr.unshift((bin >> len) % 2);
		}
		return arr;
	},
	obj2text: {
		ctype2str: ["其他", "华北", "东北", "华东", "中南", "西部"],
		status: ["隱藏", "⏱️通常在周末营业", "✅全天营业", "⏳暂时闭店", "⛔永久闭店"],
		color: ["info", "success", "danger", "primary", "warning", "info"]
	},
	cache: { base: {} },
	ce: function () {//createElement
		if (arguments.length % 2 == 0 || arguments.length < 1) {
			return;
		}
		var e = document.createElement(arguments[0]);
		for (var i = arguments.length - 1; i >= 1; i -= 2) {
			e.setAttribute(arguments[i - 1], arguments[i]);
		}
		return e;
	},

	change_jumb: function (title, text) {
		if (title !== false) {
			document.getElementById("jumbotron_title").innerText = title;
		}
		if (text !== false) {
			document.getElementById("jumbotron_text").innerHTML = text;
		}
	},
	onhashchange: function () {
		var hash = window.location.hash.replace(/(^#\/?|\/$)/g, "");
		var queryarr = hash.split("/");
		if (Object.keys(webobj.web_fn).indexOf(queryarr[0]) >= 0) {
		} else if (queryarr[0] > 0) {
			queryarr.unshift("competition");
		} else {
			queryarr.unshift("main");
		}
		webobj.this_query = queryarr;
		if (Object.keys(webobj.web_fn).indexOf(queryarr[0]) >= 0) {
			webobj.web_fn[queryarr[0]]();
		}
		webobj.last_query = queryarr;
	},
	load_page: function (temp_id, obj_or_url) {
		var query_string = webobj.this_query.join("/");
		var e = document.getElementById("content_div");
		var templ = doT.template(document.getElementById(temp_id).text);
		if (typeof obj_or_url === "object") {
			if (Object.keys(obj_or_url).length === 0) {
				return e.innerText = "暂无数据";
			}
			e.innerHTML = templ(obj_or_url);
			if (temp_id == 'templ_log') { webobj.log_page(false); }
			return
		}
		if (typeof obj_or_url === "string") {
			if (webobj.cache.hasOwnProperty(query_string)) {
				e.innerHTML = templ(webobj.cache[query_string]);
				if (temp_id == 'templ_log') { webobj.log_page(false); }
				return
			} else {
				return $.getJSON(webobj.apiurl + obj_or_url + "?q=" + query_string,
					function (json) {
						if (Object.keys(json).length === 0) {
							return e.innerText = "暂无数据";
						}
						webobj.cache[query_string] = json;
						e.innerHTML = templ(json);
						if (temp_id == 'templ_log') { webobj.log_page(false); }
						return
					});
			}

		}
		return e.innerText = "暂无数据";
	},

	web_fn: {
		main: function () {
			console.log("debug", webobj.this_query, webobj.last_query);
			webobj.change_jumb("全国雀庄公式战", '线下各地雀庄，共通承认的线下段位。');
			webobj.load_page("templ_main", "rate.php");
		},
		competition: function () {
			console.log("debug", webobj.this_query, webobj.last_query);
			var this_cid = webobj.this_query[1];
			$("#content_div").empty();
			if (webobj.cache.base.hasOwnProperty(this_cid)) {
				webobj.subpage(webobj.cache.base[this_cid], this_cid);
			} else {
				$.getJSON(webobj.apiurl + "rate.php?q=base/" + this_cid, function (json) {
					webobj.cache.base[this_cid] = json;
					webobj.subpage(json, this_cid);
				});
			}
		},
	},
	subpage: function (base, this_cid) {
		console.log(base);
		var e = document.getElementById("content_div");
		var ctype2str = webobj.obj2text.ctype2str;
		var status = webobj.obj2text.status;
		document.getElementById("jumbotron_title").innerText = base.name;
		var jtext = document.getElementById("jumbotron_text");
		jtext.textContent = '';

		jtext.appendChild(document.createTextNode(
			status[base.status] + " "
			+ base.numerator + "/" + base.denominator + " (" + ctype2str[base.ctype] + ") "
			+ base.area_name)
		);
		jtext.appendChild(document.createElement("br"))

		var submenu = webobj.ce("div", "class", "mt-2 btn-group btn-block");
		var link = ["", "log", "level", "ranking"];
		var text = ["介绍", "记录", "段位", "月榜"];
		var sub_fn = (webobj.this_query.length >= 3
			&& link.indexOf(webobj.this_query[2]) >= 0) ?
			webobj.this_query[2] : "area_name";

		for (var i = 0; i < link.length; i++) {
			var add = "#/" + this_cid + "/" + link[i];
			if (i > 0) { add += "/"; }

			var newa = webobj.ce("a",
				"class", "btn btn-info",
				"role", "button",
				"href", i == 3 ? "/table/#/" + this_cid : add,
				"target", i == 3 ? "_blank" : "_self",
			)

			newa.innerText = text[i]
			submenu.appendChild(newa);
		}
		jtext.appendChild(submenu);
		e.appendChild(webobj.ce('div', 'id', 'sub_content'));
		var geturl = {
			"area_name": [base.rule],
			"level": "rate.php",
			"ranking": "rate.php",
			"log": "rate.php"
		};
		webobj.load_page("templ_" + sub_fn, geturl[sub_fn]);

		if (sub_fn == "area_name") {
			webobj.marked_fmt();
		}

	},
	filter1: function (that, order) {
		$(".filter1").removeClass("active");
		$(that).addClass("active");
		switch (order) {
			case 1://全部
				$(".card_item").removeClass("d-none");
				break;
			case 2://华北
				$(".card_item").addClass("d-none");
				$(".ctype_1").removeClass("d-none");
				break;
			case 3://
				$(".card_item").addClass("d-none");
				$(".ctype_2").removeClass("d-none");
				break;
			case 4://
				$(".card_item").addClass("d-none");
				$(".ctype_3").removeClass("d-none");
				break;
			case 5://
				$(".card_item").addClass("d-none");
				$(".ctype_4").removeClass("d-none");
				break;
			case 6://
				$(".card_item").addClass("d-none");
				$(".ctype_5").removeClass("d-none");
				break;
		}
	},

	filter2: function (order) {
		window.location.hash = "/" + webobj.this_query[1] + "/log/" + order;
	}

};
marked.setOptions({
	pedantic: false,
	gfm: true,
	tables: true,
	breaks: true,
	sanitize: false,
	smartLists: true,
	smartypants: false
});

webobj.onhashchange();
