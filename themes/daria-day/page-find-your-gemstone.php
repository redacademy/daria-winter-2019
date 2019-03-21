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
				<form autocomplete="off" class="find-gemstone-form">
					<div>
						<label for="find-gemstone-name">Hi, my name is</label>
						<input type="text" name="name" id="find-gemstone-name" placeholder="type your name" value="Avril">
					</div>
					<div>
						<label for="find-gemstone-name">and I'm looking for</label>
						<div class="dropdown-position-holder">
							<input type="text" name="name" id="find-gemstone-type" placeholder="this type of jewelry" readonly>
						</div>
					</div>
					<div>
						<label for="find-gemstone-name">that can help me with</label>
						<div class="dropdown-position-holder">
							<input type="text" name="name" id="find-gemstone-tag" placeholder="type of energy" readonly>
						</div>
					</div>
				</form>
				<button id="find-my-gemstone" class="find-my-gemstone" type="submit">Find my gem</button>
			</section>

			<section class="find-gemstone-results">
			</section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
