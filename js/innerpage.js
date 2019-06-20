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
    var dbSearch = firebase.database().ref('image/').orderByChild('Title').equalTo(ImgTitle).once('value', function (snapshot) {
        snapshot.forEach(function (item) {
            firebase.database().ref('/user/' + item.val().uid).once('value').then(function (snapshot) {
                $('#title').html(item.val().Title);
                $('#img').attr("src", item.val().download_url);
                $('#author').text(snapshot.val().account);
                $('#Category').html(item.val().cat1 + ", " + item.val().cat2 + ", " + item.val().cat3);
                $("#information_date").html(item.val().upload_Time);
                $("#information_view").html(item.val().view_Time + 1);
                $("#information_heart").html(item.val().loves);
            });
            updataView(item.val().view_Time + 1);
        });
    });
    function updataView(newViews){
        firebase.database().ref('image/' + ImgTitle).update({view_Time : newViews});
    }
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