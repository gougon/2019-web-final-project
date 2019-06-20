$(document).ready(function () {
    const firebaseConfig = {
        apiKey: "AIzaSyCqwDzpGLMtU8tr6LnVNBWF7osdEO7r0GE",
        authDomain: "webdesign-3534a.firebaseapp.com",
        databaseURL: "https://webdesign-3534a.firebaseio.com",
        projectId: "webdesign-3534a",
        storageBucket: "webdesign-3534a.appspot.com",
        messagingSenderId: "482693075308",
        appId: "1:482693075308:web:3ed9607c97db8e43"
    };
    firebase.initializeApp(firebaseConfig);
    var dbRef = firebase.database().ref();
    var accountName;
    var ImgTitle = GetRequest()['title'];
    var dbSearch = firebase.database().ref('image/').orderByChild('Title').equalTo(ImgTitle).on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            firebase.database().ref('/user/' + item.val().uid).once('value').then(function (snapshot) {
                $('#title').html(item.val().Title);
                $('#img').attr("src", item.val().download_url);
                $('#author').text(snapshot.val().account);
                $('#Category').html(item.val().cat1 + ", " + item.val().cat2 + ", " + item.val().cat3);
                /*$("#information").html(item.val().upload_Time + " " + (item.val().view_Time).toString() + " 人觀看");
                var imgPlayElement = $("<img/>").attr("src", "./images/play.jpg").attr("height", "20px");
                var heartAmount = $("<p/>").attr(item.val().loves).addClass('p-heart');
                var imgHeartElement = $("<img/>").attr("src", "./images/heart.jpg").attr("height", "20px");
                */
                $("#information_date").html(snapshot.val().upload_Time);
                $("#information_view").html(item.val().view_Time);
                $("#information_heart").html(item.val().cat1 + ", " + item.val().cat2 + ", " + item.val().cat3);
            });
        });
    });
    function GetRequest() {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
})