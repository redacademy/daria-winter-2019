<div class="subscription">
<?php
	$args2 = array(
<<<<<<< HEAD
		'type' => 'post',
		'p'    => 67,
=======
			'type' => 'post',
			'p'    => 67,
>>>>>>> 2e6254b13c2400992729374a9019b1392db54eff
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