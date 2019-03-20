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

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

		<?php
		if ( have_posts() ) :

			if ( is_home() && ! is_front_page() ) :
				?>
				<header>
					<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
				</header>
				<?php
			endif;

			/* Start the Loop */
			while ( have_posts() ) :
				the_post();

				/*
				 * Include the Post-Type-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Type name) and that will be used instead.
				 */
				get_template_part( 'template-parts/content', get_post_type() );

			endwhile;

			the_posts_navigation();

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif;
		?>

		<?php
		$tagInfo = [];

		array_push($tagInfo, 'hi');

		print_r($tagInfo);
		?>

		<!-- <?php 
		global $wpdb;
		$results = $wpdb->get_results("SELECT * FROM ".$wpdb->prefix.wps_tags);
		foreach ( $results as $row ) {
				// print_r($row);
				$productInfo = array(
					'tag' => $row->tag
				);
		}

		$categories = get_terms();
		foreach ($categories as $category) :
			print_r($category);
		endforeach; wp_reset_postdata();
		?> -->

		
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
