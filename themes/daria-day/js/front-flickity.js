(function ($) {

  if (!$('body').hasClass('home')) {
    return;
  } 
  const largerTabletWidth = 850;

  const currentUrl = window.location.href;

  const byCategory = {
    'by jewelry': {
      type: 'by jewelry',
      prefilterCategory: 'productType',
      items: ['Bracelets', 'Earrings', 'Necklaces'],
    },
    'by energy': {
      type: 'by energy',
      prefilterCategory: 'energyTag',
      items: ['Abundance', 'Calmness', 'Enlightenment', 'Fertility', 'Focus', 'Love', 'Healing', 'Positivity', 'Prosperity'],
    },
    'by gemstone': {
      type: 'by gemstone',
      prefilterCategory: 'gemstoneTag',
      items: ['Quartz', 'Garnet', 'Amethyst', 'Amazonite'],
    }
  }

  const $carousel = $('.categories-flickity-slider').flickity({
    initialIndex: 1
  });

  const createFlickityItem = (category, item) => {
    return `<li class="flickity-item" data-prefilter-item="${item.toLowerCase()}" data-prefilter-category="${category}">
      <img src="https://via.placeholder.com/200">
      <p>${item}</p>
      <a href="${currentUrl}/shop">See more</a>
    </li>`;
  };

  // Toggle shop-by dropdown
  $('#sort-categories-by').on('click', event => {
    event.preventDefault();
    $('.shop-by ul').toggleClass('dropdown-active');
  });

  $('.shop-by li').on('click', event => {
    event.preventDefault();
    const sortCarousel = event.currentTarget.innerHTML;

    $('.shop-by ul').removeClass('dropdown-active');
    $('#sort-categories-by').val(sortCarousel);
    
    sortFlickityStuff(sortCarousel);
  });

  const sortFlickityStuff = (sortCarousel = 'all products') => {
    $carousel.flickity('remove', $('.flickity-item'));
    let sortCategory = 'all products'

    const categories = Object.keys(byCategory);
    categories.forEach(category => {
      if (category === sortCarousel.toLowerCase()) {
        sortCategory = category;
      }
    });

    if (sortCategory === 'all products') {
      for (let i = 0; i < categories.length; i++) {
        byCategory[categories[i]].items.forEach(item => {
          let $insertElement = $(createFlickityItem(byCategory[categories[i]].prefilterCategory, item));
          $carousel.flickity('insert', $insertElement);
        });
      }
    } else {
      byCategory[sortCategory].items.forEach(item => {
        let $insertElement = $(createFlickityItem(byCategory[sortCategory].prefilterCategory, item));
        $carousel.flickity('insert', $insertElement);
      });
    }

    let selectPosition = 0;
    if (window.matchMedia(`(min-width: ${largerTabletWidth}px)`).matches) {
      if ($('.flickity-item').length > 0) {
        selectPosition = 1;
      } 
    }

    $carousel.flickity('select', selectPosition, false, false);
  };


  $('.front-carousel').on('click', '.flickity-item a', event => {
    let $prefilterTarget = $(event.currentTarget.closest('li'));

    sessionStorage.setItem('prefilterCategory', $prefilterTarget.data('prefilterCategory'));
    sessionStorage.setItem('prefilterItem', $prefilterTarget.data('prefilterItem'));
  });

  sortFlickityStuff();
})(jQuery);