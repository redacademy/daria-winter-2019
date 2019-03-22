/**
 * Header Search.js.
 *
 * Handles the toggling of the search field in the header
 */

 (function ($) {
  const desktopWidth = 1024;

  const $toggleSearch = $('.icon-search');
  const $searchField = $('.search-field');

  $toggleSearch.on('click', event => {
    event.preventDefault();
    if (window.matchMedia(`(min-width: ${desktopWidth}px)`).matches) {
      $searchField.toggleClass('show-search');
    } else {
      if ($('.mobile-search').hasClass('mobile-search-active')) {
        $('.mobile-search').remove();
      } else {
        $('.site-header').after('<div class="mobile-search mobile-search-active"></div>');
        $('.mobile-search').append('<input class="mobile-search-field" placeholder="Search...">');
      }
    }
  });

  $(window).on('resize', () => {
    if (window.matchMedia(`(min-width: ${desktopWidth}px)`).matches) {
      if ($('.mobile-search').hasClass('mobile-search-active')) {
        $('.mobile-search').remove();
      }
    }
  });

  const submitMobileSearch = event => {
    event.preventDefault();

    let mobileSearchString = event.target.value;

    $searchField.val(mobileSearchString);
    console.log($searchField.val());
    $('.search-form').submit();
  }

  $('body').on('keyup', ".mobile-search-active", event => {
    if (event.key === "Enter") {
      submitMobileSearch(event);
    }
  });
 })(jQuery);