(function($) {

  const twoColumnWidth = 850;

  // exit if not shop page
  if (!$('body').hasClass('page-template-page-shop')) {
    return;
  } 

  // Save products results section
  $productResultsSection = $('.products-results-section');  

  // Check formfactor
  let isTwoColumn = false;

  const checkTwoColumn = () => {
    if (window.matchMedia(`(min-width: ${twoColumnWidth}px)`).matches) {
      isTwoColumn = true;
    } else {
      isTwoColumn = false;
    }
  }

  checkTwoColumn();

  // Changes mobile and desktop filters
	const formFactorChange = (isTwoColumn) => {
		if (isTwoColumn) {
      $('.shop-all').addClass('two-column-shop');
		} else {
      $('.shop-all').removeClass('two-column-shop');
		}
	};

  formFactorChange(isTwoColumn);

  // Re-evaluates mobile or desktop on screen change
	$(window).on('resize', () => {
		const currentFormFactor = isTwoColumn;
		checkTwoColumn();
		if (currentFormFactor !== isTwoColumn) {
			formFactorChange(isTwoColumn);
		}
	});

  // Toggle filters menu on mobile
  $('.show-filters').on('click', () => {
    $('.filter-menu').toggleClass('hide-filters');
  });

  $('.close-filter').on('click', () => {
    $('.filter-menu').addClass('hide-filters');
  });

  // Select and deselect product type
  let productTypeTag = '';

  const selectingProductTypes = (event, prefilterItem) => {
    if (event === 'prefilter') {
      productTypeTag = prefilterItem;
    } else if (event === 'clear' || productTypeTag.toLowerCase() === event.currentTarget.innerHTML.toLowerCase()) {
      productTypeTag = '';
    } else {
      productTypeTag = event.currentTarget.innerHTML;
    }

    $('.by-product-type li p').each((index, productTypeFilter) => {
      if (productTypeTag.toLowerCase() === productTypeFilter.innerHTML.toLowerCase()) {
        $(productTypeFilter).addClass('selected-product-type');
      } else {
        $(productTypeFilter).removeClass('selected-product-type');
      }
    });
  };

  $('.by-product-type li p').on('click', event => {
    selectingProductTypes(event);
  });

  // Select and deselect energy tags
  const energyTags = [];
  const selectingEnergyTags = (event, prefilterItem) => {
    if (event === 'clear') {
      energyTags.length = 0;
      $('.by-energy li p').each((index, energyTagFilter) => {
        $(energyTagFilter).removeClass('selected-tag');
      });
    } else if (event === 'prefilter') {
      energyTags.push(prefilterItem);
      $('.by-energy li p').each((index, energyTagFilter) => {
        if (prefilterItem.toLowerCase() === energyTagFilter.innerHTML.toLowerCase()) {
          $(energyTagFilter).addClass('selected-tag');
        }
      });
    } else {
      let removeTag = false;
      
      energyTags.forEach((tag, index) => {
        if (tag.toLowerCase() === event.currentTarget.innerHTML.toLowerCase()) {
          energyTags.splice(index, 1);
          removeTag = true;
          $(event.currentTarget).removeClass('selected-tag');
        }
      });
  
      if (!removeTag) {
        $(event.currentTarget).addClass('selected-tag');
        energyTags.push(event.currentTarget.innerHTML);
      }
    }
  };

  $('.by-energy li p').on('click', event => {
    selectingEnergyTags(event);
  });

  // Select and deselect gemstone
  const gemstoneTags = [];
  const selectingGemstoneTags = (event, prefilterItem) => {
    if (event === 'clear') {
      gemstoneTags.length = 0;
      $('.by-gemstone li p').each((index, gemstoneTagFilter) => {
        $(gemstoneTagFilter).removeClass('selected-tag');
      });
    } else if (event === 'prefilter') {
      gemstoneTags.push(prefilterItem);
      $('.by-gemstone li p').each((index, gemstoneTagFilter) => {
        if (prefilterItem.toLowerCase() === gemstoneTagFilter.innerHTML.toLowerCase()) {
          $(gemstoneTagFilter).addClass('selected-tag');
        }
      });
    } else {
      let removeTag = false;

      gemstoneTags.forEach((tag, index) => {
        if (tag.toLowerCase() === event.currentTarget.innerHTML.toLowerCase()) {
          gemstoneTags.splice(index, 1);
          removeTag = true;
          $(event.currentTarget).removeClass('selected-tag');
        }
      });

      if (!removeTag) {
        $(event.currentTarget).addClass('selected-tag');
        gemstoneTags.push(event.currentTarget.innerHTML);
      }
    }
  };

  $('.by-gemstone li p').on('click', event => {
    selectingGemstoneTags(event);
  });

  // Sort-by select toggle
  $('#sort-products-by').on('click', event => {
    event.preventDefault();
    $('.sort-by ul').toggleClass('dropdown-active');
  });

  const obtainSortValues = () => {
    sortProductsKey = $('#sort-products-by').val();

    const sortValues = {};
    if (sortProductsKey.toLowerCase() === 'alphabetical (z-a)') {
      sortValues.key = 'title';
      sortValues.order = 'desc';
    } else if (sortProductsKey.toLowerCase() === 'oldest') {
      sortValues.key = 'date';
      sortValues.order = 'asc';
    } else if (sortProductsKey.toLowerCase() === 'newest') {
      sortValues.key = 'date';
      sortValues.order = 'desc';
    } else if (sortProductsKey.toLowerCase() === 'price (low-high)') {
      sortValues.key = 'price';
      sortValues.order = 'asc';
    } else if (sortProductsKey.toLowerCase() === 'price (high-low)') {
      sortValues.key = 'price';
      sortValues.order = 'desc';
    } else {
      sortValues.key = 'title';
      sortValues.order = 'asc';   
    }

    return sortValues;
  };

  // Sort-by select
  $('.sort-by li').on('click', event => {
    $('.sort-by ul').removeClass('dropdown-active');
    $('#sort-products-by').val(event.currentTarget.innerHTML);

    filterProductsAjax();
  });

  const compareValues = (sortValues) => {
    const key = sortValues.key;
    const order = sortValues.order;

    return function(a, b) {
      if(!a.hasOwnProperty(key) || 
         !b.hasOwnProperty(key)) {
        return 0; 
      } else if(key ==="date" && order === "latest") {
        return new Date(b.date) - new Date(a.date);
      } else if (key ==="date" && order === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }
      
      const varA = (typeof a[key] === 'string') ? 
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
        b[key].toUpperCase() : b[key];
        
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? 
        (comparison * -1) : comparison
      );
    };
  };

  // Apply prefilters
  const applyPrefilters = () => {
    let prefilteredItem = sessionStorage.getItem('prefilterItem');
    let prefilteredCategory = sessionStorage.getItem('prefilterCategory');
    sessionStorage.removeItem('prefilterItem');
    sessionStorage.removeItem('prefilterCategory');

    if (prefilteredCategory === 'productType') {
      selectingProductTypes('prefilter', prefilteredItem);
    } else if (prefilteredCategory === 'energyTag') {
      selectingEnergyTags('prefilter', prefilteredItem);
    } else if (prefilteredCategory === 'gemstoneTag') {
      selectingGemstoneTags('prefilter', prefilteredItem);
    }
  };

  // Display the products
  const displayProducts = (product) => {
    const productUrl = dariaData.rest_url + '/' + product.permalink;

    // Placeholder image if image isn't available;
    if (!product.image) {
      product.image = "https://via.placeholder.com/1000";
    }

    foundProduct = `<div class="product-result">
      <a href="${productUrl}">
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
      </a>
    </div>`;

    $('.display-product-results').append(foundProduct);
  }

  // Ajax call function
  const filterProductsAjax = () => {
    $productResultsSection.empty();
    $('.filter-menu').addClass('hide-filters');

    $.ajax({
      method: 'GET',
      url: dariaData.rest_url + '/wp-json/daria/v1/search',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', dariaData.wpapi_nonce)
      }
    }).done(response => {
      // Filter through product type
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

      // Filter through energy
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

      // Filter through gemstone
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

      // Display filtered products
      $('.products-results-section').append('<div class="display-product-results"></div>')

      productArray = [...filteredGemstoneArray];
      filteredGemstoneArray.sort(compareValues(obtainSortValues()));

      filteredGemstoneArray.forEach(product => {
        displayProducts(product);
      });

    }).fail(response => {
      console.log(response);
    });
  }

  // Initial filter and ajax call
  applyPrefilters();
  filterProductsAjax();

  // Event handlers for reseting and setting filters
  $('.apply-filters').on('click', event => {
    event.preventDefault();
    filterProductsAjax();
  });

  $('.reset-filters').on('click', event => {
    event.preventDefault();
    selectingProductTypes('clear');
    selectingEnergyTags('clear');
    selectingGemstoneTags('clear');
  });

})(jQuery);