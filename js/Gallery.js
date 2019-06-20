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
    var page;
    var dbImgRef = firebase.database().ref('image/');
    dbImgRef.limitToFirst(16).on('value', function (snapshot) {
        var numberOFImage = snapshot.numChildren();
        console.log(numberOFImage);
        snapshot.forEach(function (item) {
            var list_gallery_item = $("<li/>").addClass("li-gallery_item colunb li-type_none hyperlink");
            var div_ad = $("<div/>").attr("style", "cursor:pointer").addClass("div-ad_pop").attr("onclick", "openAdWin()");
            var div_gallery_item = $("<div/>").addClass("div-gallery_item");
            var a_transfer = $("<a/>").attr("href", "innerpage.html" + "?title=" + item.val().Title).addClass("a-gallery_item");
            var img_tsai = $("<img/>").attr("src", item.val().download_url).addClass("img-picture");
            var div_intro = $("<div/>").addClass("div-intro");
            var div_intro_text = $("<div/>").addClass("div-intro_text");
            var paragraph_single_picture = $("<p/>").addClass("p-single_picture").html(item.val().Title);
            var paragraph_small_num1 = $("<p/>").addClass("p-small_num").html(item.val().upload_Time);
            var div_intro_heart = $("<div/>").addClass("div-intro_heart");
            var img_heart = $("<img/>").attr("src", "images/heart.png").addClass("img-heart_picture");
            var paragraph_small_num2 = $("<p/>").addClass("p-small_num").html(item.val().view_Time);
            $('#ul_gallery').append(list_gallery_item);
            list_gallery_item.append(div_ad);
            list_gallery_item.append(div_gallery_item);
            div_gallery_item.append(a_transfer);
            a_transfer.append(img_tsai);
            a_transfer.append(div_intro);
            div_intro.append(div_intro_text);
            div_intro_text.append(paragraph_single_picture);
            div_intro_text.append(paragraph_small_num1);
            div_intro.append(div_intro_heart);
            div_intro_heart.append(img_heart);
            div_intro_heart.append(paragraph_small_num2);
        });
    });
    firebase.database().ref().child("image").on("value", function (snapshot) {
        var li_type_none = $("<li/>").addClass("li-type_none");
        var a_changepage_href = $('<a/>').addClass("a-change_page");
        var p_numberOfPage = $('<p/>').addClass('li-change_page hyperlink bolder_smooth')
        console.log(snapshot.numChildren());
        if (snapshot.numChildren() > 16) {
            $('#mom_change_page').append(li_type_none);
            li_type_none.append(a_changepage_href.attr("href", "Gallery.html?page=" + (1 + parseInt(snapshot.numChildren() / 16)).toString()));
            a_changepage_href.append(p_numberOfPage.html((1 + parseInt(snapshot.numChildren() / 16)).toString()));
        }
    })
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
    /*
    <ul class="ul-change_page">
    <li class="li-type_none"><a href="" class="a-change_page">
                    <p class="li-change_page hyperlink bolder_smooth">1</p>
                </a></li>*/
    $('#btnSearch').click(function () {
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
        else {
            window.location.href = "./Search.html" + "?search=" + $("#inputSearch").val();
        }
    });
});
function openLoginWin() {
    var w_width = 664;
    var w_height = 572;
    var x = (screen.width - w_width) / 2;
    var y = (screen.height - w_height) / 2;
    var feature = 'width=' + w_width + ', height=' + w_height + ', left=' + x + ', top=' + y;
    window.open('Login.html', '', feature)
}