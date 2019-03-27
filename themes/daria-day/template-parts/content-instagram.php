<div class="instagram">
	<div class="content-wrapper">
	<?php
		$args = array(
			'type' => 'post',
			'p'    => 64,
		);
		$the_query = new WP_Query($args);

		// The Loop
		if ( $the_query->have_posts() ) {
			?>
			<div class="instagram-title">
				<h2>Inpsiring energies on instagram</h2>
				<p>#DariaDay</p>
			</div>

			<div class="instagram-content">
			<?php
			while ( $the_query->have_posts() ) {
				$the_query->the_post();
				echo the_content();
			}
			/* Restore original Post Data */
			?>
			</div>
			<?php wp_reset_postdata();
		} else {
			// no posts found
		}
	?>
	</div>
</div>