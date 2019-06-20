$(function () { 
    var controller = new ScrollMagic.Controller();

    var wipeAnimation = new TimelineMax()
        .to("#slideContainer", 0.5, {z: -150})
        .to("#slideContainer", 1,   {x: "-20%"})
        .to("#slideContainer", 0.5, {z: 0})	
        .to("#slideContainer", 0.5, {z: -150, delay: 1})
        .to("#slideContainer", 1,   {x: "-40%"})
        .to("#slideContainer", 0.5, {z: 0})
        .to("#slideContainer", 0.5, {z: -150, delay: 1})
        .to("#slideContainer", 1,   {x: "-60%"})
        .to("#slideContainer", 0.5, {z: 0})
        .to("#slideContainer", 0.5, {z: -150, delay: 1})
        .to("#slideContainer", 1,   {x: "-80%"})
        .to("#slideContainer", 0.5, {z: 0})
        .to("#slideContainer", 0.5, {z: -150, delay: 1})
        .to("#slideContainer", 1,   {x: "-100%"})
        .to("#slideContainer", 0.5, {z: 0});

    new ScrollMagic.Scene({
            triggerElement: "#slidContainer",
            triggerHook: "onLeave",
            duration: "500%"
        })
        .setPin("#pinContainer")
        .setTween(wipeAnimation)
        .addTo(controller);
        
    var controllerReveal = new ScrollMagic.Controller();

    var revealElements = document.getElementsByClassName("reveal");
	for (var i=0; i<revealElements.length; i++) { 
		new ScrollMagic.Scene({
			triggerElement: revealElements[i], 
			offset: 50,											
			triggerHook: 0.9,
		})
	    .setClassToggle(revealElements[i], "visible")
	    .addTo(controllerReveal);
    }
});