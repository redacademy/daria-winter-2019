(function($) {
  // exit if not shop page
  if (!$('body').hasClass('page-template-page-shop')) {
    return;
  } 

  // Establish prefilters
  let prefilteredItem = sessionStorage.getItem('prefilterItem');
  let prefilteredCategory = sessionStorage.getItem('prefilterCategory')
  sessionStorage.removeItem('prefilterItem');
  sessionStorage.removeItem('prefilterCategory');
  
  console.log("prefilter category: " + prefilteredCategory);
  console.log("prefilter item: " + prefilteredItem);
  
  

  // Save products results section
  $productResultsSection = $('.products-results-section');  

  // Toggle filters menu on mobile
  $('.show-filters').on('click', () => {
    $('.filter-menu').toggleClass('hide-filters');
  });

  // Select and deselect product type
  let productTypeTag = '';
  $('.by-product-type li').on('click', event => {
    $('.by-product-type li').each((index, productTypeFilter) => {
      if ($(productTypeFilter).hasClass('selected-product-type')) {
        $(productTypeFilter).removeClass('selected-product-type');
      }
    });
    if (productTypeTag === event.currentTarget.innerHTML) {
      productTypeTag = '';
      $(event.currentTarget).removeClass('selected-product-type');
    } else {
      productTypeTag = event.currentTarget.innerHTML;
      $(event.currentTarget).toggleClass('selected-product-type');
    }
  });

  // Select and deselect energy tags
  const energyTags = [];
  $('.by-energy li').on('click', event => {
    if ($(event.currentTarget).hasClass('selected-tag')) {
      const removeTagIndex = energyTags.findIndex(tag => {
        return tag === event.currentTarget.innerHTML;
      });
      if (removeTagIndex !== -1) {
        energyTags.splice(removeTagIndex, 1);
      }
    } else {
      energyTags.push(event.currentTarget.innerHTML);
    }

    $(event.currentTarget).toggleClass('selected-tag');
  });

  // Select and deselect gemstone
  const gemstoneTags = [];
  $('.by-gemstone li').on('click', event => {
    if ($(event.currentTarget).hasClass('selected-tag')) {
      const removeTagIndex = gemstoneTags.findIndex(tag => {
        return tag === event.currentTarget.innerHTML;
      });
      if (removeTagIndex !== -1) {
        gemstoneTags.splice(removeTagIndex, 1);
      }
    } else {
      gemstoneTags.push(event.currentTarget.innerHTML);
    }

    $(event.currentTarget).toggleClass('selected-tag');
  });

  // Construct product results
  const displayProducts = (product) => {
    // productURL = product.title.toLowerCase().split(' ').join('-');

    // <a href="${dariaData.rest_url}/products/${productURL}">
    // </a>

    if (product.image && product.title && product.price) {
      foundProduct = `<div class="product-result">
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
      </div>`;
  
      $productResultsSection.append(foundProduct);
    } else {
      console.log(product);
    }
  };

  const filterProductsAjax = () => {
    $productResultsSection.empty();

    // Prefilter if available
    if (prefilteredCategory && prefilteredItem) {
      if (prefilteredCategory === 'productType') {
        productTypeTag = prefilteredItem;
        console.log('type');
      } else if (prefilteredCategory === 'energyTag') {
        energyTags.length = 0;
        energyTags.push(prefilteredItem);
      } else if (prefilteredCategory === 'collectionTag') {
        console.log("this doesn't exist yet!");
      }
    }

    $.ajax({
      method: 'GET',
      url: dariaData.rest_url + '/wp-json/daria/v1/search',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', dariaData.wpapi_nonce)
      }
    }).done(response => {
      productTypeTag = productTypeTag.toLowerCase();
      let filteredProductTypeArray = [];

      if (productTypeTag) {
        response.forEach(product => {
          if (product.product_type === productTypeTag || product.product_type === productTypeTag.slice(0, -1)) {
            filteredProductTypeArray.push(product);
          }
        }); 
      } else {
        filteredProductTypeArray = response;
      }

      let filteredEnergyArray = [];

      if (energyTags && energyTags.length > 0) {
        filteredProductTypeArray.forEach(product => {
          let matchesAllTags = true;
          let matchATag = false;

          energyTags.forEach(tag => {
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
        filteredEnergyArray = filteredProductTypeArray;
      }

      let filteredGemstoneArray = [];

      if (gemstoneTags && gemstoneTags.length > 0) {
        filteredEnergyArray.forEach(product => {
          let matchesAllTags = true;
          let matchATag = false;

          gemstoneTags.forEach(tag => {
            if (product.tags.gemstone.includes(tag.toLowerCase())) {
              matchATag = true;
            } else {
              matchesAllTags = false;
            }
          });

          if (matchesAllTags === true && matchATag === true) {
            filteredGemstoneArray.push(product);
          }
        });
      } else {
        filteredGemstoneArray = filteredEnergyArray;
      }

      filteredGemstoneArray.forEach(product => {
        displayProducts(product);
      });

    }).fail(response => {
      console.log(response);
    });
  }

  filterProductsAjax();

  $('.apply-filters').on('click', event => {
    event.preventDefault();

    filterProductsAjax();
  })
})(jQuery);