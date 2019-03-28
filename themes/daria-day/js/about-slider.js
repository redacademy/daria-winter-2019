(function ($) {
  if (!$('.site-main').hasClass('about-us-page')) {
    return;
  }

  $('.carousel').flickity({
    wrapAround: true
  });
})(jQuery); 