/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */

(function ($) {
	const desktopWidth = 1024;
	
	let shopUrl = home_url.website_home_url + '/shop';

  // checks mobile or desktop
  let isMobile = false;
  const $menu = $('.main-navigation ul');

  const checkMobile = () => {
    if (window.matchMedia(`(min-width: ${desktopWidth}px)`).matches) {
      isMobile = false;
    } else {
      isMobile = true;
    }
  };

	checkMobile();

	// Finds My Account and Shop link and saves it
	$menuItems = $('.menu-item a')
	$menuItems.each((index, value) => {
		if (value.innerHTML.toLowerCase() === 'my account') {
			$myAccountLink = value.closest('li');
		}
		if (value.innerHTML.toLowerCase() === 'shop') {
			$shopLink = $menuItems.eq(index).closest('li');
		}
	});

	// Add secondary Shop Menu
	const addSecondaryMenu = (isMobile) => {
		const secondaryMenu = `<div class="secondary-menu">
			<div class="secondary-nav-content-wrapper content-wrapper">
				<section class="secondary-category by-jewelry">
					<h4>By Jewelry</h4>
					<ul>
						<li><a id="bracelets" href="${shopUrl}">Bracelets</a></li>
						<li><a href="${shopUrl}">Earrings</a></li>
						<li><a href="${shopUrl}">Necklaces</a></li>
					</ul>
				</section>
				<section class="secondary-category by-collection">
					<h4>By Collection</h4>
					<ul>
						<li><a href="${shopUrl}">Magical Collection</a></li>
						<li><a href="${shopUrl}">Winter Wonder</a></li>
					</ul>
				</section>
				<section class="secondary-category by-energy">
					<h4>By Energy</h4>
					<ul>
						<li><a href="${shopUrl}">Abundance</a></li>
						<li><a href="${shopUrl}">Calmness</a></li>
						<li><a href="${shopUrl}">More energies</a></li>
					</ul>
				</section>
				<div class="new-to-crystals">
					<img src="${directory_uri.stylesheet_directory_uri}/images/icons/New-To-Crystals-Icon.svg">
					<div>
						<p>New to crystals and Gemstones?</p>
						<p>Let us help you.</p>
					</div>
				</div>
			</div>
		</div>`;

		const $siteHeader = $('.site-header');
		$('.secondary-menu').remove();

		if (isMobile) {
			$shopLink.append(secondaryMenu);
			$('.secondary-menu').removeClass('hide-menu');
		} else {
			$siteHeader.after(secondaryMenu);
			$('.secondary-menu').addClass('hide-menu');
		}
	}

	addSecondaryMenu(isMobile);
	
	// Toggle Secondary Menu
	$shopLink.on('click', event => {
		if (window.matchMedia(`(min-width: ${desktopWidth}px)`).matches) {
			event.preventDefault();
			$('.secondary-menu').toggleClass('hide-menu');
		}
	});

	// Appends X to close expanded mobile nav
	const $closeMobileNav = $('.close-mobile-nav');
	$menu.prepend($closeMobileNav);
	
	// Changes between mobile and desktop navs
	const formFactorChange = (isMobile) => {
		if (isMobile) {
			$menu.addClass('hide-menu');
			$menu.addClass('mobile-nav');
			$closeMobileNav.removeClass('hide-menu');
			$menu.append($myAccountLink);
		} else {
			$menu.removeClass('hide-menu');
			$menu.removeClass('mobile-nav');
			$closeMobileNav.addClass('hide-menu');
			$('.nav-misc').prepend($myAccountLink);
		}
	};
	
	formFactorChange(isMobile);

	// Re-evaluates mobile or desktop on screen change
	$(window).on('resize', () => {
		const currentFormFactor = isMobile;
		checkMobile();
		if (currentFormFactor !== isMobile) {
			formFactorChange(isMobile);
			addSecondaryMenu(isMobile);
		}
	});
	 
	// Menu toggle functionality
	const $menuToggle = $('.menu-toggle');

	if ($menuToggle) {
		const toggleNav = event => {
			event.preventDefault();
			$menu.toggleClass('hide-menu');
		};

		$menuToggle.on('click', event => {
			toggleNav(event);
		});

		$closeMobileNav.on('click', event => {
			toggleNav(event);
		});
	}

	$('.by-jewelry a').on('click', event => {
		prefilteredItem = event.currentTarget.innerHTML.toLowerCase();
		sessionStorage.setItem('prefilterCategory', 'productType');
		sessionStorage.setItem('prefilterItem', prefilteredItem);
	});

	$('.by-energy a').on('click', event => {
		prefilteredItem = event.currentTarget.innerHTML.toLowerCase();
		sessionStorage.setItem('prefilterCategory', 'energyTag');
		sessionStorage.setItem('prefilterItem', prefilteredItem);
	});

	$('.by-collection').on('click', event => {
		prefilteredItem = event.currentTarget.innerHTML.toLowerCase();
		sessionStorage.setItem('prefilterCategory', 'collectionTag');
		sessionStorage.setItem('prefilterItem', prefilteredItem);
	});

})(jQuery);