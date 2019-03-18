/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */



(function($) {
	const tabletWidth = 600;
	const desktopWidth = 1024;

	// if navigation doesn't exist, exit here
	const $navigation = $('.main-navigation');
	
	if (!$navigation) {
		return;
	} 
	
	// checks if it is mobile or desktop
	let isMobile = false;
	const $menu = $('.main-navigation ul');

	const checkMobile = () => {
		if (window.screen.width >= desktopWidth) {
			isMobile = false;
		} else {
			isMobile = true;
		}
	};

	checkMobile();
	// Check screen size on resize
	$(window).on('resize', () => {
		checkMobile();
		toggleMenu(isMobile);
	});

	// append close mobile nav button
	$menu.prepend('<div class="close-mobile-nav hide-menu"><button>X</button></div>');
	const $closeMobileNav = $('.close-mobile-nav');

	// if mobile, hide menu + close button
	if (isMobile) {
		$menu.addClass('hide-menu', 'mobile-nav');
		$closeMobileNav.removeClass('hide-menu');
	} 

	const toggleMenu = (isMobile) => {
		if (isMobile) {
			$menu.addClass('mobile-nav');
			$('.close-mobile-nav').removeClass('hide-menu');
		} else {
			$menu.removeClass('mobile-nav');
			$menu.removeClass('hide-menu');
			$('.close-mobile-nav').addClass('hide-menu');
		}
	};
	
	const $menuToggle = $('.menu-toggle');

	if ($menuToggle) { 
		const closeMobileNav = event => {
			event.preventDefault();
			$menu.toggleClass('hide-menu');
		};

		$menuToggle.on('click', event => {
			closeMobileNav(event);
		});


		$('.close-mobile-nav').on('click', event => {
			closeMobileNav(event);
		});
	}


	$menuItems = $('.menu-item a')
	$menuItems.each((index, value) => {
		if (value.innerHTML.toLowerCase() === 'my account') {
			$myAccountLink = value
		}
	});
	
	if (!isMobile) {
		console.log('hi');
		$('.nav-misc').prepend($myAccountLink);
	}

})(jQuery);


// ( function() {
// 	var container, button, menu, links, i, len;

// 	container = document.getElementById( 'main-navigation' );
// 	if ( ! container ) {
// 		return;
// 	}

// 	button = container.getElementsByTagName( 'button' )[0];
// 	if ( 'undefined' === typeof button ) {
// 		return;
// 	}

// 	menu = container.getElementsByTagName( 'ul' )[0];

// 	// Hide menu toggle button if menu is empty and return early.
// 	if ( 'undefined' === typeof menu ) {
// 		button.style.display = 'none';
// 		return;
// 	}

// 	menu.setAttribute( 'aria-expanded', 'false' );
// 	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
// 		menu.className += ' nav-menu';
// 	}

// 	button.onclick = function() {
// 		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
// 			container.className = container.className.replace( ' toggled', '' );
// 			button.setAttribute( 'aria-expanded', 'false' );
// 			menu.setAttribute( 'aria-expanded', 'false' );
// 		} else {
// 			container.className += ' toggled';
// 			button.setAttribute( 'aria-expanded', 'true' );
// 			menu.setAttribute( 'aria-expanded', 'true' );
// 		}
// 	};

// 	// Get all the link elements within the menu.
// 	links    = menu.getElementsByTagName( 'a' );

// 	// Each time a menu link is focused or blurred, toggle focus.
// 	for ( i = 0, len = links.length; i < len; i++ ) {
// 		links[i].addEventListener( 'focus', toggleFocus, true );
// 		links[i].addEventListener( 'blur', toggleFocus, true );
// 	}

// 	/**
// 	 * Sets or removes .focus class on an element.
// 	 */
// 	function toggleFocus() {
// 		var self = this;

// 		// Move up through the ancestors of the current link until we hit .nav-menu.
// 		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

// 			// On li elements toggle the class .focus.
// 			if ( 'li' === self.tagName.toLowerCase() ) {
// 				if ( -1 !== self.className.indexOf( 'focus' ) ) {
// 					self.className = self.className.replace( ' focus', '' );
// 				} else {
// 					self.className += ' focus';
// 				}
// 			}

// 			self = self.parentElement;
// 		}
// 	}

// 	/**
// 	 * Toggles `focus` class to allow submenu access on tablets.
// 	 */
// 	( function( container ) {
// 		var touchStartFn, i,
// 			parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

// 		if ( 'ontouchstart' in window ) {
// 			touchStartFn = function( e ) {
// 				var menuItem = this.parentNode, i;

// 				if ( ! menuItem.classList.contains( 'focus' ) ) {
// 					e.preventDefault();
// 					for ( i = 0; i < menuItem.parentNode.children.length; ++i ) {
// 						if ( menuItem === menuItem.parentNode.children[i] ) {
// 							continue;
// 						}
// 						menuItem.parentNode.children[i].classList.remove( 'focus' );
// 					}
// 					menuItem.classList.add( 'focus' );
// 				} else {
// 					menuItem.classList.remove( 'focus' );
// 				}
// 			};

// 			for ( i = 0; i < parentLink.length; ++i ) {
// 				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
// 			}
// 		}
// 	}( container ) );
// } )();

