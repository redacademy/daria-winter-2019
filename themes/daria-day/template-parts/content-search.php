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
	<a href="<?php echo get_permalink() ?>">
		<div class="product-info">
			<h2 class="search-title"><?php the_title() ?></h2>
		</div>
	</a>
	<div class="item-excerpt">
		<?php the_excerpt(); ?>
	</div>
	
</div><!-- #post--->
<hr class="hr">