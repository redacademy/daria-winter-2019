(function($) {

  if (!$('.site-main').hasClass('find-your-gem')) {
    return;
  }

  const $findType = $('#find-gemstone-type');
  const $findTag = $('#find-gemstone-tag');

  typeDropdownValues = [
    'bracelets',
    'necklaces',
    'earrings'
  ];

  tagDropdownValues = [
    'abundance',
    'calmness',
    'enlightenment',
    'fertility',
    'focus',
    'healing',
    'love',
    'positivity',
    'prosperity',
  ];

  // Create dropdown menus
  const createDropdown = (dropdownValues, category) => {
    category = category.toLowerCase();

    dropdownList = `<ul class="find-${category}-dropdown find-gem-dropdown">`;
    
    if (dropdownValues === undefined || dropdownValues.length === 0) {
      return;
    }

    dropdownValues.forEach(value => {
      if (category === 'tag') {
        value = value + ' +';
      }
      dropdownList += `<li>${value}</li>`;
    });

    dropdownList += '</ul>';
    return dropdownList;
  }

  $findType.after(createDropdown(typeDropdownValues, 'type'));
  $findTag.after(createDropdown(tagDropdownValues, 'tag'));

  // Select type and tag variables
  const $selectType = $('.find-type-dropdown li');
  const $selectTag = $('.find-tag-dropdown li');
  let typeValue = '';
  let tagValue = [];

  // Select type function
  $selectType.on('click', event => {
    if (typeValue === event.currentTarget.innerHTML) {
      typeValue = '';
    } else {
      typeValue = event.currentTarget.innerHTML;
    }
    $findType.val(typeValue);
  });

  // Selecting tags function
  $selectTag.on('click', event => {
    if ($(event.currentTarget).hasClass('selected-tag')) {
      const removeTagIndex = tagValue.findIndex(tag => {
        return tag === event.currentTarget.innerHTML.slice(0, -2);
      });
      if (removeTagIndex !== -1) {
        tagValue.splice(removeTagIndex, 1);
      }
    } else {
      tagValue.push(event.currentTarget.innerHTML.slice(0, -2));
    }
    
    // TODO replace comma with 'and' before last tag
    tagDisplay = tagValue.join(', ');

    $findTag.val(tagDisplay);
    $(event.currentTarget).toggleClass('selected-tag');
  });

  // Construct product results
  const displayProducts = (product) => {
    const productUrl = dariaData.rest_url + '/' + product.permalink;

    foundProduct = `<div class="product-result">
      <a href="${productUrl}">
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
      </a>
    </div>`;

    $('.display-product-results').append(foundProduct);
  }

  // Generates error messages depending on error
  const generateErrorMessage = (errorType) => {
    let theErrorMessage = '<p class="error-message">';

    if (errorType === 'emptyTag') {
      theErrorMessage += 'Please enter the type of energy you are looking for and try again.';
    } else if (errorType === 'noMatch') {
      theErrorMessage += 'Unfortunately, no products matched your selections, please try different ones!';
    } else {
      theErrorMessage += 'Sorry, something went wrong, please try again later.';
    } 

    theErrorMessage += '</p>';
    $('.find-gemstone-results').append(theErrorMessage)
  };

  // Find my Gemstone Ajax Call
  $('#find-my-gemstone').on('click', event => {
    event.preventDefault();

    $('.find-gemstone-results').remove();
    $('.error-message').remove();
    $('.find-your-gem').addClass('after-search-results');

    $.ajax({
      method: 'GET',
      url: dariaData.rest_url + '/wp-json/daria/v1/search',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', dariaData.wpapi_nonce)
      }
    }).done(response => {
      
      $('.find-gemstone-search').after('<section class="find-gemstone-results"></section>');

      // Throw error if no tags selected
      if (tagValue === undefined || tagValue.length === 0) {
        generateErrorMessage('emptyTag');
        return;
      }

      $('#find-my-gemstone').html('Find another gem');

      // Filter through product types if available
      let filteredProductTypeArray = [];

      if (typeValue) {
        response.forEach(product => {
          if (product.product_type === typeValue || product.product_type === typeValue.slice(0, -1)) {
            filteredProductTypeArray.push(product);
          }
        });
      } else {
        filteredProductTypeArray = response;
      }

      // Filter through tags
      let filteredEnergyArray = [];

      if (tagValue && tagValue.length > 0) {
        filteredProductTypeArray.forEach(product => {
          let matchesAllTags = true;
          let matchATag = false;

          tagValue.forEach(tag => {
            if (product.tags.energy.includes(tag.toLowerCase())) {
              matchATag = true;
            } else {
              matchesAllTags = false;
            }
          });

          if (matchesAllTags === true && matchATag === true) {
            filteredEnergyArray.push(product);
          }
        }); 
      } else {
        generateErrorMessage('emptyTag');
        return;
      }

      // Error if no matches
      if (!filteredEnergyArray || filteredEnergyArray.length < 1) {
        generateErrorMessage('noMatch');
      }

      // Display filtered products
      $('.find-gemstone-results').append('<h2>Results</h2>');
      $('.find-gemstone-results').append('<div class="display-product-results"></div>')
      
      filteredEnergyArray.forEach(product => {
        displayProducts(product); 
      });
      

    }).fail(response => {
      generateErrorMessage('apiFail');
    });
  });
})(jQuery);