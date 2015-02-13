$(window).load(function() {
    //1. fixes issues with css resizing
    //2. add drop down menus on hover
    function refreshBrowser(reload){//1.
        //fix issue in mobile safari where width of main content is smaller than nav width

        var setWidth = $('#header_nav').outerWidth();
        $('.main_body_div').innerWidth(setWidth+"px");
        if(reload){
            document.location.reload(true); //reloads screen on screen rotation
        }
        /*if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/) && setWidth >=480 && setWidth<660) {
            //if this is mobile safari on a device that is 480 to 659px wide
            //fix an issue where the body is too large by 2px
            $('.main_body_div').innerWidth(setWidth - 1 + "px");
            var $logo = $('#logo_contact_div');
            var logoWidth = $logo.innerWidth();
            $logo.innerWidth(logoWidth-1+"px");
        }else{}*/
    }
    refreshBrowser();

    var supportsOrientationChange = "onorientationchange" in window;
    var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
//fix issue with rotation devices not updating js
    $('body').on(orientationEvent, function(){
        refreshBrowser(true);
    });
    $(window).on("resize", function(){
        refreshBrowser(true)
    });

    //2. style dropdown + add dropdown menus on hover
    $('#med_drop').find('li').css({
        'width': $('#medical_issues_li').innerWidth() + 'px' //find width of drop_down's container
    });
    $('#post_drop').find('li').css({
        'width': $('#post_op_instr').innerWidth() + 'px' //find width of drop_down's container
    });


    $('li.top_nav').hover(
        function(){ //this is what happens when it is being hovered over
            $(this).find('ul.drop_down').slideDown();
        },
        function(){ //this is what happens when the cursor moves out of the ul
            $(this).find('ul.drop_down').slideUp();
        }
    )
});