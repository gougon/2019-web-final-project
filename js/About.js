$(function () { 
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: "200%"
        }
    });

    var slides = document.querySelectorAll("div.div-block");

    for (var i=0; i<slides.length; i++) {
        new ScrollMagic.Scene({
                triggerElement: slides[i]
            })
            .setPin(slides[i], {pushFollowers: false})
            .addTo(controller);
    }

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