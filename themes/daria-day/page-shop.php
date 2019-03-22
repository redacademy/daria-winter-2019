<?php
/**
 * Template Name: Shop
 *
 * This is the template that displays the Shop page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package daria-day
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main shop-all">

			<section class="shop-hero"></section>

			<section class="products-filter-section">
				<div class="sort-by">
					<label for="sort-products-by">Sort By</label>
					<input type="text" name="sort-by" id="sort-products-by" value="Most Relevant" readonly>
				</div>
				<button class="show-filters">Filters</button>
				<div class="filter-menu hide-filters">
					<h3>Filters</h3>
					<div class="filter-category-container">
						<div class="by-product-type">
							<h4>By product type</h4>
							<ul>
								<li>Necklaces</li>
								<li>Earrings</li>
								<li>Bracelets</li>
							</ul>
						</div>
						<div class="by-energy">
							<h4>By energy</h4>
							<ul>
								<li>Abundance</li>
								<li>Calmness</li>
								<li>Enlightenment</li>
								<li>Fertility</li>
								<li>Focus</li>
								<li>Healing</li>
								<li>Love</li>
								<li>Positivity</li>
								<li>Prosperity</li>
							</ul>
						</div>
						<div class="by-gemstone">
						<h4>By gemstone</h4>
							<ul>
								<li>Amazonite</li>
								<li>Amethyst</li>
								<li>Garnet</li>
								<li>Quartz</li>
							</ul>
						</div>
						<div class="by-colour">
						<h4>By colour</h4>
							<ul>
								<li>Blue</li>
								<li>Purple</li>
								<li>White</li>
							</ul>
						</div>
					</div>
					<button class="apply-filters">Apply filters</button>
					<button class="reset-filters">Reset my filters</button>
				</div>
			</section>

			<section class="products-results-section">
				
			</section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
