<div class="subscription">
<?php
	$args2 = array(
			'type' => 'post',
			'p'    => 45,
	);
	$the_query = new WP_Query($args2);

	// The Loop
	if ( $the_query->have_posts() ) {
			while ( $the_query->have_posts() ) {
					$the_query->the_post();
					echo the_content();
			}
			/* Restore original Post Data */
			wp_reset_postdata();
	} else {
			// no posts found
	}
?>
</div>