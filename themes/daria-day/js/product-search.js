( function( $ ) {

  if (!$('body').hasClass('search-results')) {
    return;
  }

  const mobileWidth = 600;

  let $searchResult = $('.search-field').val();
  let htmlClass = $('.search-result-container');

  // Check form factor
  let isMobile = true;
  const checkFormFactor = () => {
    if (window.matchMedia(`(min-width: ${mobileWidth}px)`).matches) {
      isMobile = false;
    } else {
      isMobile = true;
    }
  };

  checkFormFactor();

  $(window).on('resize', () => {
		const currentFormFactor = isMobile;
		checkFormFactor();
		if (currentFormFactor !== isMobile) {
			changeInfoPosition();
		}
  });
  
  // Change price position depending on form factor
  const changeInfoPosition = () => {
    for (let i = 0; i < $('.search-price').length; i++) {
      if (isMobile) {
        $('.search-img')[i].after($('.item-excerpt')[i]);
        $('.search-img')[i].after($('.search-price')[i]);
      } else {
        $('.product-info')[i].append($('.search-price')[i]);
        $('.product-info')[i].append($('.item-excerpt')[i]);
      }
    }
  };

  $.ajax({
    method: 'GET',
    url: dariaData.rest_url + '/wp-json/daria/v1/search',
    beforeSend: (xhr) => {
      xhr.setRequestHeader('X-WP-Nonce', dariaData.wpapi_nonce)
    }
  }).done(response => {
    const $searchHeader = $('.search-result-container .search-title');

    response.forEach(product => {
      $searchHeader.each((index, value) => {
        if (value.innerHTML === product.title) {
          
          $(value).closest('.product-info').after(`<div  class="search-price"><p>$${product.price} CAD</p> </div>`);
          

          $(value).closest('.product-info').after(`<div  class="search-img"> <img src="${product.image}"> </div>`);
          
        }
      });
    });

    changeInfoPosition();
  }).fail(response => {
    generateErrorMessage('apiFail');
  });
} )( jQuery );
    
    