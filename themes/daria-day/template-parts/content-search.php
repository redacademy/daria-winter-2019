<?php
/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package daria-day
 */

?>

<article class="search-result" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="search-thumbnail">
		<?php daria_day_post_thumbnail(); ?>
	</div> <!--- search-thumbnail  --->
	<header class="search-header">
		<?php the_title( sprintf( '<p class="search-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></p>' ); ?>

		<?php if ( 'post' === get_post_type() ) : ?>
		<div class="search-post-date">
				<p> <strong> Posted on: </strong><?php the_time('F - j - Y');?></p> 
				<p> <strong> Price: </strong>$398.00 CAD</p> 
				<p> <strong> Category: </strong> <?php the_category();?></p>
			<?php endif; ?>
		</div>
		<div class="search-excerpt">
				<?php the_excerpt(); ?>
		</div><!-- .search-summary -->
	</header><!-- .search-header -->	
</article><!-- #post-<?php the_ID(); ?> -->
<hr class="hr">
