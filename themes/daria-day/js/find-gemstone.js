(function($) {
  const $findType = $('#find-gemstone-type');
  const $findTag = $('#find-gemstone-tag');
  const $displayProductResults = $('.display-product-results');
  const $displayResultsSection = $('.find-gemstone-results');

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

  const $selectType = $('.find-type-dropdown li');
  const $selectTag = $('.find-tag-dropdown li');
  let typeValue = '';
  let tagValue = [];

  $selectType.on('click', event => {
    typeValue = event.currentTarget.innerHTML;
    $findType.val(typeValue);
    $findType.attr('readonly', true);
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
    $findTag.attr('readonly', true);
  });

  // Construct product results
  const displayProducts = (product) => {
    productURL = product.title.toLowerCase().split(' ').join('-');

    foundProduct = `<div class="product-result">
      <a href="${dariaData.rest_url}/products/${productURL}">
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
      </a>
    </div>`;

    $displayProductResults.append(foundProduct);
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
    $displayResultsSection.append(theErrorMessage)
  };

  // Find my Gemstone Ajax Call
  $('#find-my-gemstone').on('click', event => {
    event.preventDefault();

    $displayProductResults.empty();
    $('.error-message').remove();

    $.ajax({
      method: 'GET',
      url: dariaData.rest_url + '/wp-json/daria/v1/search',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', dariaData.wpapi_nonce)
      }
    }).done(response => {

      if (tagValue === undefined || tagValue.length === 0) {
        generateErrorMessage('emptyTag');
        return;
      }

      let matchNone = true;

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

      let filteredEnergyArray = [];

      if (tagValue && tagValue.length > 0) {
        filteredProductTypeArray.forEach(product => {
          let matchesAllTags = true;
          let matchATag = false;

          tagValue.forEach(tag => {
            if (product.tags.includes(tag.toLowerCase())) {
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

      filteredEnergyArray.forEach(product => {
        displayProducts(product); 
      });
      
    }).fail(response => {
      generateErrorMessage('apiFail');
    });
  });
})(jQuery);