/**
 * Header Search.js.
 *
 * Handles the toggling of the search field in the header
 */

 (function ($) {
  const tabletWidth = 600;

  const $toggleSearch = $('.icon-search');
  const $searchField = $('.search-field');

  $toggleSearch.on('click', event => {
    event.preventDefault();
    if (window.screen.width < tabletWidth) {
      $('.site-header').after('<div class="mobile-search"></div>');
      const $mobileSearch = $('.mobile-search');
      $mobileSearch.append($searchField.closest('label'));
    } else {
      $searchField.toggleClass('show-search');
    }
  });
 })(jQuery);