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
    var dbDataUser = firebase.database().ref().child('user');
    var $signAccountinput = $('#sign-accountinput');
    var $signPasswordinput = $('#sign-passwordinput');
    var $rePasswordinput = $("#repasswordinput");
    var $emailinput = $('#emailinput');
    var $btnSignUp = $('#btnSignUp');
    var $btnLogin = $('#btnLogin');
    var provider = new firebase.auth.GoogleAuthProvider();
    $btnSignUp.click(function (e) {
        var account = $signAccountinput.val();
        var email = $emailinput.val();
        var pass = $signPasswordinput.val();
        var repass = $rePasswordinput.val();
        var auth = firebase.auth();
        var isPass = RequiredData(account, email, pass, repass);
        if (isPass == '') {
            const promise = auth.createUserWithEmailAndPassword(email, pass);
            promise.catch(function (e) {
                alert(e);
            });
            promise.then(function (e) {
                auth.onAuthStateChanged(function (user) {
                    if (user) {
                        WritePost(user.uid, email, account, $('input:radio:checked').val());
                        //window.location.href = "./Profile.html" + "?uid=" + user.uid;
                    }
                });
            });
        }
        else alert(isPass);
    });
    $btnLogin.click(function (e) {
        var login_email = $('#login-emailinput').val();
        var login_password = $('#login-passwordinput').val();
        const promise = firebase.auth().signInWithEmailAndPassword(login_email, login_password)
        promise.catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            //alert(errorCode);
            alert(errorMessage);
        });
        promise.then(function(result){
            window.location.href = "./Profile.html" + "?uid=" + result.user.uid;
        })
    });
});
function RequiredData(account, email, pass, repass) {
    var outputString = "";
    if (account == '') outputString += "please fill your account form!!\n";
    if (pass == '') outputString += "Please fill your password form!!\n";
    else if (repass != pass) outputString += "Please check your password and repassword is the same!!\n"
    if (email == '') outputString += "please fill your email form!!\n";
    if ($('input:radio:checked').val() == '') outputString += "please select your gender!!\n";
    return outputString;
}
function WritePost(uid, email, name, gender) {
    var newuser = {
        email: email,
        account: name,
        gender: gender,
        upload_times: 0,
        good: 0,
        bad: 0,
        profile_viewtimes: 0,
        loves: 0
    };
    var updates = {};
    updates['/user/' + uid] = newuser;
    console.log(updates);
    firebase.database().ref().update(updates)
    return uid;
}
function ReleaseSearchBar() {
    console.log($("#inputSearch").val());
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