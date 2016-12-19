/**
 * Created by Eric on 11/13/2016.
 */
//slick image carousel

$(document).ready(function(){
    /*
    $('.single-item-dj').slick({
        infinite: true,
        autoplay: true,
        pauseOnHover: false,
        autoplaySpeed: 575,
        fade: true,
        prevArrow: false,
        nextArrow: false
    });

    //button animation
    */

    $('#banner').hover_transitions({
        image_src_two: "banner3.jpg",
        pattern: "crossing",
        show_method: "fly",
        fly_distance: 200
    });

    $('#button1').hover_transitions({
        image_src_two: "buttons/about2.jpg",
        pattern: "crossing",
        show_method: "fly",
        fly_distance: 200
    });

    $('#button2').hover_transitions({
        image_src_two: "buttons/music2.jpg",
        pattern: "corners",
        show_method: "fly",
        fly_distance: 200
    });
    $('#button3').hover_transitions({
        image_src_two: "buttons/mixes2.jpg",
        pattern: "regular",
        show_method: "fly",
        fly_distance: 300
    });
    $('#button4').hover_transitions({
        image_src_two: "buttons/flyers2.jpg",
        pattern: "skip rows",
        show_method: "fly",
        fly_distance: 400
    });
    $('#button5').hover_transitions({
        image_src_two: "buttons/radio2.jpg",
        pattern: "skip rows",
        show_method: "fly",
        fly_distance: 400
    });
    $('#button6').hover_transitions({
        image_src_two: "buttons/contact2.jpg",
        pattern: "skip rows",
        show_method: "fly",
        fly_distance: 400
    });

});


