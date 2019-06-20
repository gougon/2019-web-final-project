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
    var $btnLogin = $('#btnLogin');
    $btnLogin.click(function (e) {
        var login_email = $('#login-emailinput').val();
        var login_password = $('#login-passwordinput').val();
        const promise = firebase.auth().signInWithEmailAndPassword(login_email, login_password)
        promise.catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
        promise.then(function(result){
            window.location.href = "./gallery.html" + "?uid=" + result.user.uid;
        })
    });
});