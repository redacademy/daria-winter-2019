<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package daria-day
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<section class="find-gemstone-search">
				<h1>We'll guide you to what you need.</h1>
				<form class="find-gemstone-form">
					<div>
						<label for="find-gemstone-name">Hi, my name is</label>
						<input type="text" name="name" id="find-gemstone-name" placeholder="type your name">
					</div>
					<div>
						<label for="find-gemstone-name">and I'm looking for</label>
						<input type="text" name="name" id="find-gemstone-name" placeholder="type your name">
					</div>
					<div>
						<label for="find-gemstone-name">that can help me with</label>
						<input type="text" name="name" id="find-gemstone-name" placeholder="type your name">
					</div>
				</form>
				<button type="submit">Find my gem</button>
			</section>

			<section class="find-gemstone-results">
			</section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
