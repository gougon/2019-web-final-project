$(function () { 
    var controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        triggerElement: "#trigger-div",
        triggerHook: 0.9,
        duration: "80%",
        offset: 50
    })
    .setClassToggle("#reveal", "visible")
    .addTo(controller);
});
function openLoginWin() {
    var w_width = 640;
    var w_height = 480;
    var x = (screen.width - w_width) / 2;
    var y = (screen.height - w_height) / 2;
    var feature = 'width=' + w_width + ', height=' + w_height + ', left=' + x + ', top=' + y;
    window.open('Login.html', '', feature)
}