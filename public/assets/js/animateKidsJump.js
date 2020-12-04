/* Trigger bounce animation when user scrolls to two icons of children.
Original code from http://www.justinaguilar.com/animations/index.html */

$(window).scroll(function() {
    $('.jumping-kids').each(function(){
        var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+600) {
            $(this).addClass("bounce");
            }
		});
	});