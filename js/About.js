$(function () { // wait for document ready
    // init
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: "200%" // this works just fine with duration 0 as well
            // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
            // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
        }
    });

    // get all slides
    var slides = document.querySelectorAll("div.div-block");

    // create scene for every slide
    for (var i=0; i<slides.length; i++) {
        new ScrollMagic.Scene({
                triggerElement: slides[i]
            })
            .setPin(slides[i], {pushFollowers: false})
            .addTo(controller);
    }

    var controllerReveal = new ScrollMagic.Controller();

    var revealElements = document.getElementsByClassName("reveal");
	for (var i=0; i<revealElements.length; i++) { // create a scene for each element
		new ScrollMagic.Scene({
			triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
			offset: 50,												 // start a little later
			triggerHook: 0.9,
		})
		.setClassToggle(revealElements[i], "visible") // add class toggle
		.addTo(controllerReveal);
    }
});