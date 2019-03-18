<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package daria-day
 */

get_header();
?>
	<?php $existStatus = 'no';
	if(is_front_page()){
		$existStatus = 'yes';
	}?>
	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<div class="latest-additions-container" id ="latest-additions-container"data-exists="<?php echo $existStatus; ?>"> Latest Additions</div>

		
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
// get_sidebar();
get_footer();
