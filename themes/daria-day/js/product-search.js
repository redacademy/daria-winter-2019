( function( $ ) {
    let $searchResult = $('.search-field').val();
    let htmlClass = $('.search-result-container');
    $.ajax({
        method: 'GET',
        url: dariaData.rest_url + '/wp-json/daria/v1/search',
        beforeSend: (xhr) => {
          xhr.setRequestHeader('X-WP-Nonce', dariaData.wpapi_nonce)
        }
      }).done(response => {
        const $searchHeader = $('.search-result-container .search-title a');
    
        response.forEach(product => {
          $searchHeader.each((index, value) => {
            if (value.innerHTML === product.title) {
              $(value).after(`<div  class="search-img"> <img src="${product.image}"> </div>`);
             $(value).append(`<div  class="search-price"><p>$${product.price} CAD</p> </div>`);
            }
          });
        });
      }).fail(response => {
        generateErrorMessage('apiFail');
      });
} )( jQuery );
    
    