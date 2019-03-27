(function ($) {
  if (!$('.site-main').hasClass('about-us-page')) {
    return;
  }

  $('.carousel').flickity({
    initialIndex: 1
  });
})(jQuery); 