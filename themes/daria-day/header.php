<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package daria-day
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'daria-day' ); ?></a>
	
	<header id="masthead" class="site-header">
		<nav id="site-navigation" class="main-navigation">
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><i class="fas fa-bars"></i></button>
			<div class="close-mobile-nav hide-menu">
				<button>
					<img src="<?php echo get_template_directory_uri() ?>/images/icons/x-symbol.svg">
				</button>
			</div>
			<?php
			wp_nav_menu( array(
				'theme_location' => 'menu-1',
				'menu_id'        => 'primary-menu',
			));
			?>
		</nav><!-- #site-navigation -->
		<div class="site-branding">
			<?php
			the_custom_logo();
			?>
		</div><!-- .site-branding -->

		<div class="nav-misc">
			<div class="header-search">
				<?php get_search_form(); ?>
			</div>
			<a href="#" class="cart">
				<img src="<?php echo get_template_directory_uri() ?>/images/Shopping-Bag-Icon.svg">
			</a>
		</div>
	</header><!-- #masthead -->

	<div>
		<?php
		wp_nav_menu( array(
			'theme_location' => 'menu-2',
			'menu_id'        => 'Shop Menu',
		));
		?>
	</div>
	<div id="content" class="site-content">
