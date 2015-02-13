    /**
     * Created by D on 1/13/2015.
     */
    //fix weird issue with padding
//THIS CODE IS FOR USE WITH THE PAGES CONTAINING SLIDEBARS (medical issues/post op care)
    //MAKES A FAQ
    //REPLACES HTML WHEN SLIDEBARS LINK IS CLICKED ON IF JS IS ENABLED
    //FIXES ISSUES WITH STYLEBARS IN MOBILE SAFARI
    //STYLES CSS TO PERFECTLY FIT REGARDLESS OF SCREEN HEIGHT/WIDTH
jQuery(document).ready(function($) {
    $('.a_sim_li').css({padding: "1em"});

    //hide all sub topics from hand that will be toggled visible/hidden when their topic is clicked
    $('.slide_down').hide();
    $('.slide_down span').css({color: "#00defc"});

    //disable links in slidebars if js is enabled... try to get around google not crawling by delaying adding handler
    setTimeout(function(){
        $('li.sb-closer a').click(function(e){
            e.preventDefault(); //when js is active it will load new text on same page, else will follow a link to new pg.
        });
    }, 600); //delay dynamic page refresh until .60secs (this is pretty much faster than i can click it)

    //make slidebar inset if screen is bigger than 660px
    var width = $(window).width();
    if (width >= 660) {
        //variables to compute height/width positioning of elements
        var contactHeight = $('#HSRNJ_header_contact_info').outerHeight();
        var sloganHeight = $('#logo_and_slogan').outerHeight();
        var logoHeight = sloganHeight > contactHeight ? sloganHeight : contactHeight;
        var navHeight = $('#header_nav').outerHeight();
        var topBarHeight = logoHeight + navHeight + 'px';
        var slidebarHeight = $(window).height() - navHeight - logoHeight + 'px';
        var divWidth = width - 230 - (width*.08) + 'px';

        //Style slidebar (make it inset)
        var $slidebar = $('.sb-slidebar');
        $slidebar.addClass('sb-style-overlay').css({'top': topBarHeight, 'border-top': '2px solid #6991ac',
        'border-right': '2px solid #6991ac',
        'height': slidebarHeight});

        //hide optional menu links (only seen <660px)
        $('.opt').hide();

        //open slidebar on left and hide the button that the user clicks to open in mobile formats
        //also show all sub-topics by firing click event
        var $openButton = $('#open_menu_button');
        setTimeout(function(){ //set timeout required to fix issue with slidebars functionality
            $openButton.trigger('click');
            $openButton.hide();
            //show all sub-topics (under 'hand' is depuytren's, trigger finger, thumb arthritis. under 'wrist' is... etc)
            $('.topic').trigger('click');
        }, 0);




        //need to have slidebar not close when clicked
        $('ul.sb-menu li:not(.opt)').removeClass('sb-close');

        //adjust the main body's width and padding to fit with the inset slidebars
        $('.main_body_div').css({
            'width': divWidth,
            'padding':'2.5% 10% 100px 230px'
        });


        //need to fix for bugs with mobile safari
        //if(navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)) {
        //}

    } else {
        //make it so pressing anything not in sidebar closes the sidebar
        var $closeSlide = $('.h3_sb');
        $closeSlide.addClass('sb-close');
        //if something in sidebar is clicked that should close the sidebar fire event on sb-site to close the bar
        $('.sb-closer').click(function () {
            $closeSlide.trigger('click');
        });
        if (width>480){
        }
    }

    //if the person is coming for a specific page... open that page(using querystring params)
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    var origin = getParameterByName('origin');
    if(origin){
        origin = '#'+origin;
        setTimeout(function(){$(origin).trigger('click');}, 0);
    }

    //WHEN TOPIC IN SLIDEBAR IS CLICKED, SHOW SUB-TOPICS
    //show sub-topic when topic is clicked if the sub-topic(s) is/are hidden. otherwise hide the sub-topic(s)
    $('#hand_problem').on('click', function () {
        var $nextElement = $('#hand_problem').next();
        if ($nextElement.is(":hidden")) {
            $('.a_hand_problem').slideDown();
        } else {
            $('.a_hand_problem').slideUp();
        }
    });

    $('#wrist_problem').on('click', function () {
        var $nextElement = $('#wrist_problem').next();
        if ($nextElement.is(":hidden")) {
            $('.a_wrist_problem').slideDown();
        } else {
            $('.a_wrist_problem').slideUp();
        }
    });

    $('#elbow_problem').on('click', function () {
        var $nextElement = $('#elbow_problem').next();
        if ($nextElement.is(":hidden")) {
            $('.an_elbow_problem').slideDown();
        } else {
            $('.an_elbow_problem').slideUp();
        }
    });

    //MAKE FAQ
    //1. hide all answers
    //2. show answers when clicked on and have property hidden
    //3. hide answers when question clicked on and answer has property visible
    function makeFAQ() {

        $('.answer').hide();

        $('.question').click(function () {
            var $nextElement = $(this).next();
            if ($nextElement.is(":hidden")) {
                $nextElement.slideDown();
                if ($nextElement.next().is(":hidden")) {
                    $nextElement.next().slideDown();
                }
            } else {
                $nextElement.slideUp();
                if ($nextElement.next().hasClass('answer')) {
                    $nextElement.next().slideUp();
                }
            }
        });
    }

    //sets additional css styling to added content.  If isNotFAQ == falsy value then we make the question class clickable
    //this is so clicking on the FAQ questions is intuitive for the user
    function styleFAQ(isNotFAQ) {
        var $questions = $('.question');
        $questions.css(
            {
                'margin': '1em',
                color: '#183052',
                'font-weight': 'bold'
            }
        );

        $('.sub_title').css(
            {
                'margin-top': '1.5em'
            }
        );

        $('.answer').css(
            {
                'margin-bottom': '.5em'
            }
        );

        if (!isNotFAQ) {
            $questions.css({cursor: 'pointer'});
        }
    }

    //add content to page as a FAQ if isNotFAQ == 'false', else add normally
    function addContent(content, isNotFAQ) {
        $('#changeable_med_cond').replaceWith("<div id='changeable_med_cond'>" + content + "</div>");
        if (!isNotFAQ) {
            makeFAQ();
            styleFAQ();
        } else {
            styleFAQ(true);
        }
    }

    //***EVENT LISTENERS***

    //if we are on the medical conditions page show content, else show post-op content
    var $depuytrens = $('#depuytrens');
    if (!!$depuytrens.length) {
        $depuytrens.click(function () {
            addContent(depuytrens);
        });
        $('#trigger_finger').click(function () {
            addContent(triggerFinger);
        });
        $('#thumb_arth').click(function () {
            addContent(thumbArthritis);
        });
        $('#carpal_tunnel').click(function () {
            addContent(carpalTunnel);
        });
        $('#ganglion_cyst').click(function () {
            addContent(ganglionCyst);
        });
        $('#de_quervain').click(function () {
            addContent(deQuervain);
        });
        $('#tennis_elbow').click(function () {
            addContent(tennisElbow);
        });
        $('#cubital_tunnel').click(function () {
            addContent(cubitalTunnel);
        });
    } else {
        $('#post_depuytrens').click(function () {
            addContent(postDepuytrens, true);
        });
        $('#post_carpal_tunnel').click(function () {
            addContent(postCarpalTunnel, true);
        });
    }

    //html to be added to medical conditions page
    var depuytrens = "<h4 class='sub_title'> Dupuytren's Contracture </h4>" +
        "<p>Dupuytren's Contracture is a benign or non-cancerous condition, which affects the palm of the hand and fingers. Dupuytren's Contracture typically begins as a thickening of the tissue of the palm in the form of a nodule or lump.  It is almost always painless and usually affects the ring or small finger. As the contracture progresses, the abnormal tissue begins to tighten and will bend the affected fingers into the palm. This is usually a very gradual process.  Bending the fingers is not a problem, but straightening them may be difficult or impossible if the disease is advanced or severe.  In severe cases, the contracture may interfere with activities of daily living such as wearing gloves, washing hands and putting hands in pockets.</p>" +
        "<h4 class='sub_title'> Frequently Asked Questions </h4>" +
        "<h5 class='question'> What are the symptoms? </h5>" +
        "<p class='answer'>Dupuytren's Contracture is almost always painless. The primary symptom is the inability to straighten the fingers, which can interfere with many activities as noted above.</p>" +
        "<h5 class='question'> Who gets it? </h5>" +
        "<p class='answer'>It typically affects middle-aged males of Northern European ancestry, though both sexes and other ethnic groups may develop the condition. Some people may develop a more severe form of Dupuytren's with extensive contractures of the fingers and palm. These include individuals that develop it a young age, have a strong family history of the condition, diabetes, and have other areas of the body affected (feet).</p>" +
        "<h5 class='question'>What causes it?</h5>" +
        "<p class='answer'>The exact cause of Dupuytren's Contracture is not fully understood, however, there is a clear genetic predisposition.</p>" +
        "<h5 class='question'> What can be done? </h5>" +
        "<p class='answer'>Initial treatment consists of observation if the contracture is not significant. Surgical treatment is indicated when the contracture affects activities of daily living or the contracture is significant enough that it prevents you from placing your hand flat on a tabletop. The surgical treatment consists of removal of the diseased tissue, followed by significant hand therapy. Surgery is not a permanent cure and the contracture may develop later in previously unaffected areas and occasionally recur in the operated area. Surgery is performed on an outpatient basis</p>";

    var triggerFinger = "<h4 class='sub_title'> Trigger Finger </h4>" +
        '<p>Trigger finger occurs as a result of enlargement or swelling about a nodule in one of the flexor tendons in the palm. The enlarged nodule can then no longer pass through tunnels in the hand as it usually does, resulting in decreased motion and catching or locking of the finger. Treatment is usually a single corticosteroid (cortisone) injection. This is curative in over ninety percent of cases except in diabetic patients where the long term cure rate is only fifty percent. If the injection is not successful or if the problem returns several times, then a fairly simple procedure to open up one of the tight tunnels is done under a local anesthetic.</p>' +
        "<h4 class='sub_title'> Frequently Asked Questions </h4>" +
        "<h5 class='question'>What causes a trigger finger?</h5>" +
        '<p class="answer">The thickening or swelling is usually caused by repetitive direct pressure on the flexor tendon from firmly grasping a tool or other object, repetitive digital motion. A single direct injury to the palm may also cause sufficient swelling of the tendon.</p>' +
        "<h5 class='question'>Will the problem return after the injection?</h5>" +
        '<p class="answer">This can frequently be prevented with proper changes in habits or tools. If the activity that originally caused the problem continues, the condition may return even if the corticosteroid injection was successful at first.</p>' +
        "<h5 class='question'>Is the injection dangerous?   I have heard that a cortisone injection is harmful.</h5>" +
        '<p class="answer">The type of cortisone injections that are done by a Hand Surgeon into a hand, wrist or elbow have their effects locally, at the site of the injection. The effects that some people associate with cortisone, weight gain, etc., are not caused by the local injection. Diabetic patients that check their blood sugars regularly (as they should anyhow) will frequently see a small elevation in levels for 24-48 hours after an injection.</p>' +
        "<h5 class='question'>How many injections can I receive?</h5>" +
        '<p class="answer">Up to three injections in the same area is generally considered to be the maximum. If the condition returns after three injections then further injections are unlikely to be curative. The injections should not be given within six to eight weeks of each other or a tendon rupture may result.</p>';
    var thumbArthritis = "<h4 class='sub_title'>Thumb Carpo-Metacarpal Arthritis</h4>" +
        "<p>Degenerative arthritis (osteoarthritis) of the thumb carpo-metacarpal joint (CMC) is a common problem, which usually affects women beginning around the fifth decade of life. Arthritis is a condition where the articular cartilage or gliding surface of a joint becomes worn and degraded. This may ultimately result in a painful and stiff joint. </p>" +
        "<h4 class='sub_title'> Frequently Asked Questions </h4>" +
        "<h5 class='question'>What causes Thumb Carpo-Metacarpal Arthritis?</h5>" +
        '<p class="answer">The actual degenerative process of osteoarthritis is not completely understood. While it is primarily a "wear and tear" process, there are other factors that play a role in degenerative arthritis. These include previous trauma or injury, genetic predisposition, repetitive stress over long periods of time, or laxity of the joint.</p>' +
        "<h5 class='question'>What are the symptoms of Thumb Carpo-Metacarpal Arthritis?</h5>" +
        "<p class='answer'>People with arthritis of the thumb typically complain of pain or an aching feeling at the base of the thumb. These symptoms may be aggravated by the weather, grasping, pinching or when severe may be present at rest or at night. Other symptoms include weakness, clumsiness or deformity of the thumb.</p>" +
        "<h5 class='question'>What can be done?</h5>" +
        "<p class='answer'>The initial treatment for carpo-metacarpal arthritis is usually non-surgical. While oral non-steroidal anti-inflammatory medications (NSAIDS) may be slightly helpful, the most effective initial treatment is a cortisone injection into the arthritic joint. Properly done, in the office, pain relief should be very good and long lasting. Younger patients and those that do heavy repetitive work with the hand may have recurrent symptoms. If the symptoms return after two or three successful steroid injections then surgery should be considered.</p>" +
        "<p class='answer'>A procedure called 1st CMC or Basilar joint arthroplasty is the best surgical option. Unlike joint replacement in the hip and knee, where the arthritic joint is replaced by metal, plastic and cement, Basilar joint arthroplasty does not use an implant. There is no metal or plastic to wear out, no cement to loosen. Thumb arthroplasty involves removing the small arthritic bone called the trapezium and using a tendon to act as a cushion between the arthritic thumb bone and the rest of the wrist bones. The usual result is relief of pain, as well as restoration of range of motion and strength.</p>"+
        "<p class='answer'>Surgical treatment consists of a short procedure done in the operating room on an out patient basis (you go home the same day).  After the operation, the thumb is placed in some type of splint for approximately a month, followed by hand therapy.</p>";

    var carpalTunnel = "<h4 class='sub_title'>Carpal Tunnel Syndrome</h4>" +
        "<p>Carpal tunnel syndrome occurs when a large nerve at the wrist is compressed, resulting in symptoms of pain, tingling and numbness. Many patients will wake from sleep with pain and numbness. Symptoms while driving and keyboarding are common.</p>" +
        "<p>When the symptoms of carpal tunnel syndrome are persistent and significant despite appropriate treatment, surgical release of the carpal tunnel is the best treatment. The carpal tunnel is a ring made up mostly of bone with a band of taut fibrous tissue completing the ring. Cutting the band of fibrous tissue changes the tunnel from a tight ring to an open canal thereby releasing the pressure on the nerve and relieving the symptoms.</p>" +
        "<p>Occasionally, when Carpal Tunnel Syndrome develops as a result of something temporary, such as pregnancy, or from swelling after a wrist fracture, then a steroid injection can relieve the problem.</p>" +
        "<h4 class='sub_title'> Frequently Asked Questions </h4>" +
        "<h5 class='question'>Aren't steroid injections harmful?</h5>" +
        "<p class='answer'>The steroid injected into your wrist by the Hand Surgeon will work almost exclusively at the wrist, it will shrink down the tissue within the carpal tunnel over a period of several weeks thereby relieving pressure on the nerve. Unless the injection is directly into a tendon or the nerve, there should only be the side effects of swelling and pain which should last less than 48 hours. Temporary depigmentation, or loss of color of the skin in the area of the injection is commonly seen 4 to 6 weeks after the injection.</p>" +
        "<h5 class='question'>Don’t you need that band of fibrous tissue that is cut during the surgery?</h5>" +
        "<p class='answer'>The band is not necessary for normal use and function of the hand provided that the contents of the carpal tunnel are not overly disturbed at the time of surgery.</p>" +
        "<h5 class='question'>I have heard that carpal tunnel surgery does not work?</h5>" +
        "<p class='answer'>When the diagnosis is correct, and the patient truly has carpal tunnel syndrome, the surgery is almost always effective in relieving the symptoms from carpal tunnel syndrome, if done properly. Some patients will have other problems that prevent a full recovery after surgery. Such problems include diabetes, a pinched nerve in the neck, advanced age, or cases that have been allowed to progress to permanent numbness and atrophy of the hand.</p>" +
        "<h5 class='question'>Will the problem return if I go back to the same kind of work?</h5>" +
        "<p class='answer'>Once the tunnel has been released and the nerve is no longer squeezed, it is possible to resume normal activities without fear of the nerve being squeezed again, although repetitive activities and vibrational tools are avoided for four weeks.</p>" +
        "<h5 class='question'>If I have surgery, how quickly will I be able to return to work?</h5>" +
        "<p class='answer'>Most patients are able to drive within the first few days, and return to light duty within the first week after surgery. Jobs that require prolonged typing are possible after four weeks, and if the job is heavy such as construction work or a mechanic, frequently six weeks is necessary before a return to full duty is possible.</p>";
    var ganglionCyst = "<h4 class='sub_title'>Ganglion Cyst</h4>" +
        "<p>Ganglion cysts are fluid filled masses, which arise off of joints or tendons of the hand and wrist.  They typically arise from the back of the wrist, palm side of the wrist or in the palm near where the fingers start.  They are benign or non-cancerous lesions, which tend to arise in areas of weakness in the joint or tendon, not unlike the sidewall of an old tire ballooning out.</p>" +
        "<p>The ganglion cyst may be asymptomatic or not cause any symptoms besides being noticeable.  However, the ganglion may cause some symptoms, typically pain or a feeling of fullness.  Occasionally the ganglion may compress nerves running near it.</p>" +
        "<p>If the ganglion is asymptomatic, no treatment may be indicated.  If the ganglion is symptomatic however, there are several treatment options available.  If the cyst is in a certain location (usually the back of the wrist) a trial of aspiration with a needle is reasonable.  The downside of aspiration is that the recurrence rate (the chance the cyst comes back) is very high.  Surgical excision done on an outpatient basis (day surgery) is the best way to avoid damage to other structures and to minimize the rate of recurrence.</p>" +
        "<p>After surgery, a splint is worn for wrist ganglions for 10 days.  Finger ganglions do not need a splint after surgery.  Either way, range of motion exercises are instituted early either at home or by a therapist.  Recovery time is variable depending on the location of the ganglion.  Recovery to full function is much shorter for finger ganglions then wrist ganglions.</p>" +
        "<h4 class='sub_title'> Frequently Asked Questions </h4>" +
        "<h5 class='question'>What are the symptoms?</h5>" +
        "<p class='answer'>The ganglion cyst may be asymptomatic or not cause any symptoms besides being noticeable.  However, the ganglion may cause some symptoms, typically pain or a feeling of fullness. Occasionally the ganglion may compress nerves running near it.</p>" +
        "<h5 class='question'>What can be done?</h5>" +
        "<p class='answer'>If the ganglion is asymptomatic, no treatment may be indicated.  If the ganglion is symptomatic however, there are several treatment options available.  If the cyst is in a certain location (usually the back of the wrist) a trial of aspiration with a needle is reasonable.  The downside of aspiration is that the recurrence rate (the chance the cyst comes back) is very high.  Surgical excision done on an outpatient basis (day surgery) is the best way to avoid damage to other structures and to minimize the rate of recurrence.</p>" +
        "<p class='answer'>After surgery, a splint is worn for wrist ganglions for 10 days.  Finger ganglions do not need a splint after surgery.  Either way, range of motion exercises are instituted early either at home or by a therapist.  Recovery time is variable depending on the location of the ganglion.  Recovery to full function is much shorter for finger ganglions then wrist ganglions.</p>";

    var deQuervain = "<h4 class='sub_title'>De Quervain's Tendonitis</h4>" +
        "<p>De Quervain's tendonitis is a painful condition characterized by pain and swelling on the thumb side of the wrist. The pain is worse when lifting objects such as a milk carton, large water bottle or pinching with the hand and thumb. In severe cases, the pain may be present at night and the wrist may be sore to the touch. Swelling or enlargement on the thumb side of the wrist may be visible.</p>" +
        "<h4 class='sub_title'> Frequently Asked Questions </h4>" +
        "<h5 class='question'>What causes De Quervain's Tendonitis?</h5>" +
        "<p class='answer'>The cause of the pain associated with De Quervain's tendonitis is inflammation around the tendons of two distinct muscles called the abductor pollicis longus and extensor pollicis brevis. The tendons on the side and back of the wrist run through a 'pulley', analogous to a fishing line running through the eyelets of a fishing pole. The tendon normally slides smoothly, but inflammation and swelling around the tendon can cause it to get caught beneath the pulley causing pain.</p>" +
        "<h5 class='question'>Who gets De Quervain's Tendonitis?</h5>" +
        "<p class='answer'>Any adult can develop De Quervain's tendonitis at any age. Repetitive motion of the wrist, direct trauma to the thumb side of the wrist can bring the condition on. Diabetes, pregnancy and thyroid disease are occasionally associated with De Quervain's tendonitis. It is fairly common in new mothers, caring for newborns, probably related to wrist positioning while feeding an infant.</p>" +
        "<h5 class='question'>What can be done?</h5>" +
        "<p class='answer'>Initial treatment with a thumb splint, rest and an oral anti-inflammatory is helpful. The most effective non-surgical treatment for De Quervain's tendonitis is an injection of cortisone (a type of steroid) around the tendons to decrease the swelling. If the problem returns, surgical treatment is curative. The procedure involves a day surgery procedure (home the same day), a small incision and a soft splint for 10 days until the sutures are removed.</p>";
    var tennisElbow = "<h4 class='sub_title'>Tennis Elbow</h4>" +
        "<p>Tennis elbow or lateral epicondylitis is a tendonitis of the outside portion of the elbow.  These tendons connect to the main muscles that straighten the wrist and fingers.</p>" +
        "<h4 class='sub_title'> Frequently Asked Questions </h4>" +
        "<h5 class='question'>What are the symptoms of Tennis Elbow?</h5>" +
        "<p class='answer'>People with lateral epicondylitis will complain of varying amounts of pain on the outside of the elbow. While usually worse with use of the arm, lateral epicondylitis can be so painful that symptoms may be present at rest and sometimes awaken you at night. While the pain is usually right over the bony prominence on the outside of the elbow, the discomfort may radiate up your arm towards the shoulder, or down your arm towards the hand. Painful activities include lifting or gripping with the palm facing down, or forceful twisting and pulling such as using a screwdriver or wrench.</p>" +
        "<h5 class='question'>What causes Tennis Elbow?</h5>" +
        "<p class='answer'>Micro tearing of the tendon attachment at the elbow, probably related to decreased blood supply is the likely cause. When the muscle attached to that tendon contracts such as in the above named activities, pain results from pulling on the injured area.</p>" +
        "<h5 class='question'>What can be done?</h5>" +
        "<p class='answer'>The initial treatment for tennis elbow is usually non-surgical. Activity modification is one of the most important mainstays of non-surgical treatment. To rest the injured area, you should always lift with the palm facing up. This takes the stress off of the injured tendon origin. Even after successful treatment, both non-surgical and surgical, it is important to adhere to this basic rule. While oral non-steroidal anti-inflammatory medications (NSAIDS) may be somewhat helpful, the most effective initial treatment is a cortisone injection into the inflamed area. Once the initial pain has been relieved, a stretching and strengthening program is very important to maintain the good results. Multiple injections are not advised.</p>" +
        "<p class='answer'>If the condition returns despite proper non-surgical treatment and the symptoms are significant enough, then surgical treatment is appropriate. A 'lateral release' consists of releasing the injured tendon from the attachment to bone, as well as removing a small piece of bone. Surgical treatment consists of a short procedure done in the operating room on an outpatient basis (you go home the same day). After the operation, gentle range of motion exercises are done, followed by physical therapy to restore strength at five to six weeks.</p>";
    var cubitalTunnel = "<h4 class='sub_title'>Cubital Tunnel Syndrome</h4>" +
        "<p>Cubital tunnel syndrome results from compression or scarring of the ulnar nerve at the level of the elbow. The ulnar nerve provides sensation to the small finger and a portion of the ring finger, it also controls most of the small muscles in the hand itself. These muscles are important for grip and pinch strength as well as controlling fine movements of the hand and fingers.</p>" +
        "<h4 class='sub_title'> Frequently Asked Questions </h4>" +
        "<h5 class='question'>What are the symptoms of Cubital Tunnel Syndrome?</h5>" +
        "<p class='answer'>The symptoms of cubital tunnel syndrome may be vague, however commonly include numbness and tingling of the ring and small fingers, weakness of grip, a clumsy feeling in the hand as well as an aching feeling in the hand and elbow.</p>" +
        "<h5 class='question'>What causes Cubital Tunnel Syndrome?</h5>" +
        "<p class='answer'>Cubital tunnel syndrome is caused by compression or scarring of the nerve where it runs behind the 'funny bone' of the elbow. It usually occurs from a combination of pulling and actual pressure on the nerve. Cubital tunnel syndrome may also be caused by old injuries to the elbow that leave the bones bent and the nerve stretched, or progressive arthritic enlargement at the elbow.</p>" +
        "<h5 class='question'>How is the diagnosis made?</h5>" +
        "<p class='answer'>Cubital tunnel syndrome can usually be diagnosed based upon the history that the patient provides as well as the physical examination. A Nerve Conduction Study / EMG may be needed to establish a diagnosis in difficult cases.</p>" +
        "<h5 class='question'>What can be done?</h5>" +
        "<p class='answer'>Initial treatment includes avoiding bending the elbow past 90 degrees for prolonged amounts of time.  Headsets or speakerphones are useful to avoid this at work.  Keeping the inside of the elbow free and off of tabletops and arms of chairs is also very important.  An elbow pad is also useful to pad an irritated nerve during the day as well as at night.  Vitamin B6 has been shown to be useful in treating various nerve compression disorders and may be helpful.</p>" +
        "<p class='answer'>If these non-surgical treatment plans are not effective, surgical treatment may be indicated. The nerve is released from the tunnel behind the elbow and moved towards the front of the elbow. The procedure is performed on an out patient basis (day surgery).</p>";


    //html to be added to post-op page

    var postDepuytrens = "<h4 class='sub_title'>Instructions for after Depuytren's Surgery:</h4>" +
        "<h5 class='question'>Elevation, Motion, and Use</h5>" +
        "<p class='answer'>Elevation of the hand is very important after Dupuytren’s surgery.  The hand should be kept at a level that is higher than your heart in order to cause fluid to drain from the hand.  This is very important to prevent swelling as a swollen hand will be painful, and it will also become stiff.  After the splint is removed at the first postoperative visit, a range of motion program will be started and light use for activities such as eating, dressing and personal care.  Driving is allowed once you feel strong enough to safely grip the steering wheel.</p>" +
        "<h5 class='question'>Bandages</h5>" +
        "<p class='answer'>Do not change the bandages or splint after surgery until the first post operative visit with Dr. Miller.  If the palm has been left open, instructions on how to change the bandage will be given at that time.  The bandages must also be kept dry.  Showering should be done with a large plastic bag over the hand and arm, securely taped just below the shoulder.  By keeping the hand fully elevated, it is possible to take a brief shower without getting the bandages wet.</p>" +
        "<h5 class='question'>Pain Medication</h5>" +
        "<p class='answer'>After an operation that has been done under a local anaesthetic, or local anaesthetic with sedation, it is common to experience numbness and tingling in the hand for eight to ten hours or longer.  A prescription for a pain reliever will be given to you after the surgery and we recommend that you fill the prescription, although frequently only one or two pills will be necessary.  The most important aspect of pain relief after hand surgery is strict elevation of the hand.</p>" +
        "<h5 class='question'>Stitches and Scar Management</h5>" +
        "<p class='answer'>Stitches are usually removed ten to fifteen days after hand surgery.  A scar massage program is then begun, using Vitamin E oil, briskly rubbed into the scar for five minutes, twice a day.  The oil may be purchased without a prescription, it is also fine to use the oil from a capsule of Vitamin E.  The massage program is continued for at least one month.</p>";


    var postCarpalTunnel = "<h4 class='sub_title'>Instructions for after Carpal Tunnel Surgery:</h4>" +
        "<h5 class='question'>Elevation, Motion, and Use</h5>" +
        "<p class='answer'>After carpal tunnel surgery it is very important to make a full fist and fully straighten the fingers ten times an hour while awake.  This is very important to prevent swelling and stiffness.  In addition, it will help prevent scar tissue from forming about the nerve.  This will not pull out the stitches.  The motion will pump the fluid out of the fingers and thereby prevent swelling and stiffness.  Elevation of the hand is also important after carpal tunnel surgery to prevent swelling.  The hand should be kept at a level that is higher than your heart in order to cause fluid to drain from the hand.  You may use the hand for light activities such as eating, dressing and personal care.  Driving is allowed once you feel strong enough to safely grip the steering wheel.</p>" +
        "<h5 class='question'>Bandages</h5>" +
        "<p class='answer'>Do not change the bandages or splint after surgery until the first post operative visit with Dr. Miller.  The bandages must also be kept dry.  Showering should be done with a large plastic bag over the hand and arm, securely taped just below the shoulder.  By keeping the hand fully elevated, it is possible to take a brief shower without getting the bandages wet.</p>" +
        "<h5 class='question'>Pain Medication</h5>" +
        "<p class='answer'>After an operation that has been done under a local anaesthetic, or local anaesthetic with sedation, it is common to experience numbness and tingling in the hand for eight to ten hours or longer.  A prescription for a pain reliever will be given to you after the surgery and we recommend that you fill the prescription, although frequently only one or two pills will be necessary.  The most important aspect of pain relief after hand surgery is strict elevation of the hand.</p>" +
        "<h5 class='question'>Stitches and Scar Management</h5>" +
        "<p class='answer'>Stitches are usually removed ten to fifteen days after hand surgery.  A scar massage program is then begun, using Vitamin E oil, briskly rubbed into the scar for five minutes, twice a day.  The oil may be purchased without a prescription, it is also fine to use the oil from a capsule of Vitamin E.  The massage program is continued for at least one month.  A thickened and tender scar will frequently develop four weeks after carpal tunnel surgery.  You will notice pain primarily with direct pressure on the scar that will slowly resolve over several months.</p>";
});