/* Trigger shaking animation when user scrolls to phone icon.
Original code from http://www.justinaguilar.com/animations/index.html */

$(window).scroll(function() {
    $('#vibrating-phone').each(function(){
        var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+400) {
            $(this).addClass("shake");
            }
		});
	});