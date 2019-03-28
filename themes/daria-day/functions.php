<?php
/**
 * daria-day functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package daria-day
 */
if ( ! function_exists( 'daria_day_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function daria_day_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on daria-day, use a find and replace
		 * to change 'daria-day' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'daria-day', get_template_directory() . '/languages' );
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );
		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );
		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'daria-day' ),
		) );
		register_nav_menus( array(
			'menu-2' => esc_html__( 'Shop Menu', 'daria-day' ),
		) );
		
		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );
		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'daria_day_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );
		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );
		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'daria_day_setup' );
/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function daria_day_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'daria_day_content_width', 640 );
}
add_action( 'after_setup_theme', 'daria_day_content_width', 0 );
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function daria_day_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'daria-day' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'daria-day' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
		register_sidebar( array(
		'name' => 'Products',
		'id' => 'products',
		'description' => 'Appears in the footer area',
		'before_widget' => '<aside id="products" class="products">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
		) );
		register_sidebar( array(
		'name' => 'Company',
		'id' => 'company',
		'description' => 'Appears in the footer area',
		'before_widget' => '<aside id="company" class="company">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
		) );
		register_sidebar( array(
		'name' => 'Customers',
		'id' => 'customers',
		'description' => 'Appears in the footer area',
		'before_widget' => '<aside id="customers" class="customers">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
		) );
		register_sidebar( array(
		'name' => 'Darialogo',
		'id' => 'darialogo',
		'description' => 'Appears in the footer area',
		'before_widget' => '<aside id="darialogo" class="darialogo">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
			) );
			
}
add_action( 'widgets_init', 'daria_day_widgets_init' );
/**
 * Add new custom field
 */
// function daria_custom_rest() {//this function adds new custom field to wp api, post by default doesnt exist as it is a custom field
//     register_rest_field('product','tagName',array(
//         'get_callback' => function() {return 'tags go here';}
//     ));
// }
// add_action('rest_api_init', 'daria_custom_rest');
/**
 * Filter the stylesheet_uri to output the minified CSS file.
 */
function daria_day_minified_css( $stylesheet_uri, $stylesheet_dir_uri ) {
	if ( file_exists( get_template_directory() . '/build/css/style.min.css' ) ) {
		$stylesheet_uri = $stylesheet_dir_uri . '/build/css/style.min.css';
	}
	return $stylesheet_uri;
}
add_filter( 'stylesheet_uri', 'daria_day_minified_css', 10, 2 );
/**
 * Enqueue scripts and styles.
 */
function daria_day_scripts() {
	$dariaDayThemeDirectory = array('stylesheet_directory_uri' => get_stylesheet_directory_uri());
	$dariaDayHomeUrl = array('website_home_url' => get_home_url());

	wp_enqueue_style( 'daria-day-style', get_stylesheet_uri() );
	wp_enqueue_style( 'daria-day-fontawesome', 'https://use.fontawesome.com/releases/v5.7.2/css/all.css');
	wp_enqueue_style( 'daria-day-flickity', 'https://unpkg.com/flickity@2/dist/flickity.min.css');
	
	wp_enqueue_script( 'daria-day-filters', get_template_directory_uri() . '/build/js/filters.min.js', array(), '20151215', true );
	wp_enqueue_script( 'daria-day-navigation', get_template_directory_uri() . '/build/js/navigation.min.js', array(), '20151215', true );
	wp_enqueue_script( 'demo-theme-search', get_template_directory_uri() . '/build/js/search.min.js', array(), '20151215', true );
	wp_enqueue_script( 'daria-day-find-gemstone', get_template_directory_uri() . '/build/js/find-gemstone.min.js', array(), '20151215', true );
	wp_enqueue_script( 'daria-day-products-filter', get_template_directory_uri() . '/build/js/products-filter.min.js', array(), '20151215', true );
	wp_enqueue_script( 'daria-day-front-flickity', get_template_directory_uri() . '/build/js/front-flickity.min.js', array(), '20151215', true );
	wp_enqueue_script( 'daria-day-about-slider', get_template_directory_uri() . '/build/js/about-slider.min.js', array(), '20151215', true );

	// Add template directory uri to navigation
	wp_localize_script('daria-day-navigation', 'directory_uri', $dariaDayThemeDirectory);

	// Add home url to js scripts
	wp_localize_script('daria-day-filters', 'home_url', $dariaDayHomeUrl);
	wp_localize_script('daria-day-navigation', 'home_url', $dariaDayHomeUrl);

	// JQuery
	wp_enqueue_script('jquery');

	wp_enqueue_script( 'daria-day-search-product', get_template_directory_uri() . '/build/js/product-search.min.js', array(), '20151215', true );
	wp_enqueue_script( 'daria-day-skip-link-focus-fix', get_template_directory_uri() . '/build/js/skip-link-focus-fix.min.js', array(), '20151215', true );
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	wp_localize_script('daria-day-filters', 'dariaData', array( //this function will make our JSON API request flexible so it runs on every machine
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest')
		));
		
	// search results api
	wp_localize_script('daria-day-search-product', 'dariaData', array(
		'rest_url' => get_site_url(),
		'wpapi_nonce' => wp_create_nonce('wp_rest')
	));	
	
	// Find my gemstone rest api creation 
	wp_localize_script('daria-day-find-gemstone', 'dariaData', array( 
		'rest_url' => get_site_url(),
		'wpapi_nonce' => wp_create_nonce('wp_rest')
	));

	// Products page api creation 
	wp_localize_script('daria-day-products-filter', 'dariaData', array( 
		'rest_url' => get_site_url(),
		'wpapi_nonce' => wp_create_nonce('wp_rest')
	));
}
add_action( 'wp_enqueue_scripts', 'daria_day_scripts' );

/**
 * Enable uploading SVG files to gallery
 */
function add_file_types_to_uploads($file_types) {
	$new_filetypes = array();
	$new_filetypes['svg'] = 'image/svg+xml';
	$file_types = array_merge($file_types, $new_filetypes );
	return $file_types;
}
add_action('upload_mimes', 'add_file_types_to_uploads');
/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';
/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';
/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';
/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';
/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}
/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/filter-route.php';