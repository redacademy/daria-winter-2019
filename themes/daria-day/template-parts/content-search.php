<?php
/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package daria-day
 */
?>

<div class="search-result-container">
	<div class="srch-title">
	<?php the_title( sprintf( '<p class="search-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></p>' ); ?>
	</div>
	<div class="search-excerpt">
		<?php the_excerpt(); ?>
	</div>
</div><!-- #post--->
<hr class="hr">