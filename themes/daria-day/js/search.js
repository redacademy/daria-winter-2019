/**
 * Header Search.js.
 *
 * Handles the toggling of the search field in the header
 */

 (function ($) {
  const desktopWidth = 1024;

  const $searchForm = $('.search-form')
  const $toggleSearch = $('.icon-search');
  const $searchField = $('.search-field');

  $toggleSearch.on('click', event => {
    event.preventDefault();
    if (window.matchMedia(`(min-width: ${desktopWidth}px)`).matches) {
      $searchField.toggleClass('show-search');
    } else {
      $('.site-header').after('<div class="mobile-search"></div>');
      const $mobileSearch = $('.mobile-search');

      if ($searchForm.hasClass('mobile-search-active')) {
        $mobileSearch.remove();
        $searchForm.removeClass('mobile-search-active');
      } else {
        $searchForm.addClass('mobile-search-active');
        $mobileSearch.append($searchField.closest('label'));
      }
    }
  });

  $(window).on('resize', () => {
    if ($searchForm.hasClass('mobile-search-active')) {
      $searchForm.append($searchField.closest('label'))
      $searchForm.removeClass('mobile-search-active');
      $('.mobile-search').remove();
    }
    $searchField.removeClass('show-search');
  });
 })(jQuery);