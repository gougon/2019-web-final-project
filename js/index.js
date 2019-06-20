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