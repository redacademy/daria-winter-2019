<?php
/**
 * @package daria-day
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

		<?php
		if ( have_posts() ) :
			while ( have_posts() ) :
				the_post();
				get_template_part('template-parts/content','hero');
				get_template_part('template-parts/content', 'video');
				get_template_part('template-parts/content', get_post_type() );
				get_template_part('template-parts/content', 'latest' );
				get_template_part('template-parts/content', 'instagram');
				get_template_part('template-parts/content', 'slider');
				get_template_part('template-parts/content', 'about');
				get_template_part('template-parts/content', 'mailchimp');
				get_template_part('template-parts/content', 'socialmedia');

			endwhile;

			the_posts_navigation();

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif;
		?>


		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
