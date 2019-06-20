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
    var storeRef = firebase.storage().ref();
    var imagesRef = storeRef.child('images');
    var dbDataUser = firebase.database().ref().child('user');
    var $btnUpload = $('#btnUpload');
    var uid = GetRequest()['uid'];
    var uploadTimes;
    var accountRef = firebase.database().ref('/user/' + uid).on('value', function (snapshot) {
        $('#title').html(snapshot.val().account + " 的個人資料");
        if (snapshot.val().gender == "male")
            $('#gender').html("性別：男");
        else $('#gender').html("性別：女");
        $('#views').html('Profile 觀看次數：' + snapshot.val().profile_viewtimes.toString());
        $('#loves').html('共獲得愛心數：' + snapshot.val().loves.toString());
        $('#populations').html('名聲：' + formatFloat((snapshot.val().good / snapshot.val().bad), 2).toString());
        $('#goodnumber').html('good<br>' + snapshot.val().good.toString());
        $('#badnumber').html('bad<br>' + snapshot.val().bad.toString());
        uploadTimes = snapshot.val().upload_times.toString();
    });
    $('#good').click(function () {
        firebase.database().ref('/user/' + uid).once('value', function (snapshot) {
            console.log(snapshot.val().bad);
            updatePopulation(uid, snapshot.val().good + 1, snapshot.val().bad);
        });
    })
    $('#bad').click(function () {
        firebase.database().ref('/user/' + uid).once('value', function (snapshot) {
            updatePopulation(uid, snapshot.val().good, snapshot.val().bad + 1);
        });
    })
    function formatFloat(num, pos) {
        var size = Math.pow(10, pos);
        return Math.round(num * size) / size;
    }
    function handleFileSelect(event) {
        var file = event.target.files[0];
        var metadata = {
            contentType: file.type
        };
        if (file != null) {
            $btnUpload.click(function (e) {
                var filename = (file.name).split('.');
                console.log($('#input_title').val());
                var uploadTask = storeRef.child('images/' + $('#input_title').val()).put(file, metadata);
                uploadTask.on('state_changed', function (snapshot) {
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        updateUploadTimes(uid, uploadTimes);
                        firebase.database().ref('/user/' + uid).once('value').then(function (snapshot) {
                            uploadTimes = snapshot.val().upload_times.toString();
                        });
                        console.log('File available at', downloadURL);
                        var today = new Date();
                        var currentDateTime =
                            today.getFullYear() + '年' +
                            (today.getMonth() + 1) + '月' +
                            today.getDate() + '日(' +
                            today.getHours() + ':' + today.getMinutes() +
                            ')';
                        WriteNewImage($('#input_title').val(), uid, $("#Category1 option:selected").val(), $("#Category2 option:selected").val(), $("#Category3 option:selected").val(), currentDateTime, downloadURL);
                    });
                });
                window.location.href = "Gallery.html";
            });
        }
    }
    function WriteNewImage(Title, uid, cat1, cat2, cat3, time, url) {
        var newImage = {
            Title: Title,
            uid: uid,
            cat1: cat1,
            cat2: cat2,
            cat3: cat3,
            loves: 0,
            view_Time: 0,
            upload_Time: time,
            download_url: url
        };
        var updates = {};
        updates['/image/' + Title] = newImage;
        firebase.database().ref().update(updates)
    }
    function updatePopulation(uid, good, bad) {
        var db = firebase.database();
        db.ref('/user/' + uid).update({ good: parseInt(good, 10) });
        db.ref('/user/' + uid).update({ bad: parseInt(bad, 10) });
    }
    function updateUploadTimes(uid, oldupload) {
        var db = firebase.database();
        db.ref('/user/' + uid).update({ upload_times: parseInt(oldupload, 10) + 1 });
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
    window.onload = function () {
        $('#inputfile').change(handleFileSelect);
    }
});
function ReleaseSearchBar() {
    if ($("#inputSearch").val() == "") {
        if ($("#inputSearch").hasClass("input-search-blank")) {
            $("#inputSearch").removeClass("input-search-blank");
            $("#inputSearch").addClass("input-search");
        }
        else {
            $("#inputSearch").removeClass("input-search");
            $("#inputSearch").addClass("input-search-blank");
        }
    }
}
