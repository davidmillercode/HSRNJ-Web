/**
 * Created by D on 12/22/2014.
 */
//*file: create a slideshow of images using jQuery  & slidedown/slideup animation for resume
//*
//*(1). have list of images in an array
//*(2). loop through images and at end of image array, play from beginning again
//*(3). eventListener on all award images during non-slideshow page
//*(4). eventListener on centered image when in slideshow mode(click = next image)
//*(5). eventListener on area outside centered image which clears slideshow mode


jQuery(document).ready(function($){


    //*(1). array of award images (src)
    var awardsArray = ["img/2012-TDNY.jpg", "img/2011-INJTD.jpg", "img/2011-FLATIRON.jpg", "img/2011-2012-BDA.jpg",
        "img/2010-TDNY.jpg", "img/2010-INJTD.jpg", "img/2009-2010-BDA.jpg", "img/2009-10-INJTD.jpg",
        "img/2008-TDNY.jpg", "img/2008-CC.jpg", "img/2007-TO.jpg", "img/2007-TDNY.jpg", "img/2007-2008-BDA.jpg",
        "img/2006-TS.jpg", "img/2006-TDNY.jpg", "img/2005-TDNY.jpg", "img/2004-TDNY.jpg", "img/2003-TDNY.jpg",
        "img/2003-TDNJ.jpg", "img/2002-TDNY.jpg", "img/2001-NJTD2TH.jpg", "img/1999-NYBD.jpg", "img/1998-11-NJTD.jpg",
        "img/1997-NYBD.jpg", "img/1997-COR.jpg", "img/1996-1997-BDA.jpg"];

//*(2). loops through images, centering image clicked by user, and darkening screen
//**(a). create image in center of screen and darken rest of screen
    (function createLightBox() {
        //create image (that will be centered) then set its src and add it to the body
        var $lightBoxImg = $("<img src='' id='lightBoxImg'>");
        //create + style dark transparent overlay
        var $lightBoxOverlay = $("<div id='lightBoxOverlay'></div>");
        function styleSlideshow() {
            //style image so that it is centered
            $lightBoxImg.css({
                "max-width": "76%",
                "max-height": "88%",
                position: "fixed",
                top: "50%",
                left: "50%",
                "transform": "translate(-50%, -50%)",
                "z-index": "1001",
                outline: "2px solid #c8961B"
            }).hide();

            $lightBoxOverlay.css({
                width: "100%",
                height: "100%",
                position: "fixed",
                top: "50%",
                left: "50%",
                "transform": "translate(-50%, -50%)",
                "z-index": "1000",
                background: "#000",
                filter: "alpha(opacity=75)",
                "-moz-opacity": "0.75",
                "-khtml-opacity": "0.75",
                opacity: "0.75"
            }).hide();
        }
        styleSlideshow(); //will also call later when screen gets rotated to accommodate mobile safari
        var supportsOrientationChange = "onorientationchange" in window;
        var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        $('body').on(orientationEvent, styleSlideshow);

        //add jQuery elements to body
        $("body").append($lightBoxImg, $lightBoxOverlay);

    })();

    (function addLightBoxListeners(lightBox, backgroundDiv) {

        lightBox = lightBox || $('#lightBoxImg');
        backgroundDiv = backgroundDiv || $("#lightBoxOverlay");
        var intervalStopper = "first time";


        //function for going to the next image in the slideshow
        function goToNextImg() {
            //if a lightbox image is already viewable and being clicked, show next image / clear prev slideshow schedule
            if (intervalStopper !== "first time") {
                clearInterval(intervalStopper);
                nextImage();
            }

            function nextImage() {
                //find out current index of lightbox img
                var currentIndex = awardsArray.indexOf(lightBox.attr("src"));
                //set index to next image src
                currentIndex += 1;
                //check to see if current index is one greater than the last image index.  if it is the last image, set it to 0
                if (currentIndex === awardsArray.length) {
                    currentIndex = 0;
                }
                //change $lightBoxImg to new image
                lightBox.attr("src", awardsArray[currentIndex]);
            }

            //change the displayed image every xxxx milliseconds
            intervalStopper = setInterval(nextImage, 2700);
        }

        //(3)-(5): EVENT LISTENERS
        //*(3). event listeners for awards images

        //a. set the lightBoxImg src to the clicked images src
        //b. show darkened semi-transparent div + lightBoxImg
        function awardsImageHandler() {
            var clickedSrc = $(this).attr("src");
            lightBox.attr('src', clickedSrc).show();
            backgroundDiv.show();
            goToNextImg();
            //remove handlers on awardsImages


        }

        $("img.awardsImg").on("click", awardsImageHandler);

        //*(4). listener on centered image
        lightBox.on("click", goToNextImg);

        //*(5). once-clickable listener on dark background
        backgroundDiv.on("click", function () {
            //clear all newly created slideshow listeners, newly created overlay div, and lightBoxImg
            //$lightBoxImg hide
            lightBox.hide();
            //hides overlay
            backgroundDiv.hide();
            //reset base conditions (must clear interval or it will continually cycle)
            clearInterval(intervalStopper);
            intervalStopper = "first time";
        })
    })();


    //DISPLAY CV
    $('#cv').click(function(){
        //check if cv is displayed
        var $nextElement = $('#cv').next();
        if ($nextElement.is(":hidden")) {
            //display cv
            $('.cv_def_hidden').slideDown();
        } else {
            //hide cv
            $('.cv_def_hidden').slideUp();
        }
    });

});