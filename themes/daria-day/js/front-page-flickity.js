(function ($) {

  if (!$('body').hasClass('home')) {
    return;
  } 

  const $carousel = $('.categories-flickity-slider').flickity({
    initialIndex: 1
  });


  // Toggle shop-by dropdown
  $('#sort-categories-by').on('click', event => {
    event.preventDefault();
    $('.shop-by ul').toggleClass('dropdown-active');
  });

  $('.shop-by li').on('click', event => {
    $('.shop-by ul').removeClass('dropdown-active');
    $('#sort-categories-by').val(event.currentTarget.innerHTML);
  });


  $('.button--append').on( 'click', function() {
    var $cellElems = $( makeCellHtml() + makeCellHtml() );
    $carousel.flickity( 'insert', $cellElems );
  });

  var cellCount = 3;

  function makeCellHtml() {
    cellCount++;
    return '<div class="carousel-cell">' + cellCount + '</div>';
  }



})(jQuery);