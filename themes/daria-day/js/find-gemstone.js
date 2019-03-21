(function($) {
  const $findType = $('#find-gemstone-type');
  const $findTag = $('#find-gemstone-tag');

  $findType.after(`<ul class="find-type-dropdown find-gem-dropdown">
    <li>bracelet</li>
    <li>necklace</li>
    <li>earring</li>
  </ul>`);

  $findTag.after(`<ul class="find-tag-dropdown find-gem-dropdown">
    <li>abundance +</li>
    <li>calmness +</li>
    <li>enlightenment +</li>
    <li>fertility +</li>
    <li>focus +</li>
    <li>healing +</li>
    <li>love +</li>
    <li>positivity +</li>
    <li>prosperity +</li>
  </ul>`);

  const $selectType = $('.find-type-dropdown li');
  const $selectTag = $('.find-tag-dropdown li');
  let typeValue = '';
  let tagValue = [];

  $selectType.on('click', event => {
    typeValue = event.currentTarget.innerHTML;
    $findType.removeAttr('readonly').val(typeValue);
  });

  $selectTag.on('click', event => {
    tagValue.push(event.currentTarget.innerHTML.slice(0, -2));
    $findTag.removeAttr('readonly').val(tagValue);
  });

  // Find my Gemstone Ajax Call
  $('#find-my-gemstone').on('click', event => {
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: dariaData.rest_url + '/wp-json/daria/v1/search',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', dariaData.wpapi_nonce)
      }
    }).done(response => {
      // console.log(response);
      response.forEach(product => {
        // console.log(product);

        if (product.product_type === typeValue) {
          
          let matchesAllTags = true;
          let matchATag = false;

          console.log(product);

          tagValue.forEach(tag => {
            console.log(product.tags.includes(tag));
            if (product.tags.includes(tag)) {
              matchATag = true;
            } else {
              matchesAllTags = false;
            }
          });
          
          if (matchesAllTags === true && matchATag === true) {
            console.log('FOUND');
          }
        }


      });
      
    }).fail(response => {
      console.log(response);
    });
  });
})(jQuery);