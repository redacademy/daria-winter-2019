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
		<main id="main" class="site-main shop-page">

			<section class="shop-hero">
				<?php	
				$shop_main_title = get_field('shop_main_title');
				$shop_subtitle = get_field('shop_subtitle');
				?>
				<div class="content-wrapper">
					<h1><?php echo $shop_main_title ?></h1>
					<p><?php echo $shop_subtitle ?></p>
				</div>
				
			</section>

			<section class="shop-all content-wrapper">
				<section class="products-filter-section">
					<div class="sort-by">
						<label for="sort-products-by">Sort By</label>
						<div class="sort-products-dropdown-container">
							<input type="text" name="sort-by" id="sort-products-by" value="Alphabetica (A-Z)" readonly>
							<ul>
								<li>Alphabetical (A-Z)</li>
								<li>Alphabetical (Z-A)</li>
								<li>Newest</li>
								<li>Oldest</li>
								<li>Price (high-low)</li>
								<li>Price (low-high)</li>
							</ul>
						</div>
					</div>
					<button class="show-filters"><img src="<?php echo get_template_directory_uri() ?>/images/icons/Filter-icon.svg">Filters</button>
					<div class="filter-menu hide-filters">
						<div class="filters-title">
							<h3>Filters</h3>
							<img class="close-filter" src="<?php echo get_template_directory_uri() ?>/images/icons/x-symbol.svg">
						</div>
						<div class="filter-category-container">
							<div class="by-product-type">
								<h4>By product type</h4>
								<ul>
									<li><p>Necklaces</p></li>
									<li><p>Earrings</p></li>
									<li><p>Bracelets</p></li>
								</ul>
							</div>
							<div class="by-energy">
								<h4>By energy</h4>
								<ul>
									<li><p>Abundance</p></li>
									<li><p>Calmness</p></li>
									<li><p>Enlightenment</p></li>
									<li><p>Fertility</p></li>
									<li><p>Focus</p></li>
									<li><p>Healing</p></li>
									<li><p>Love</p></li>
									<li><p>Positivity</p></li>
									<li><p>Prosperity</p></li>
								</ul>
							</div>
							<div class="by-gemstone">
							<h4>By gemstone</h4>
								<ul>
									<li><p>Amazonite</p></li>
									<li><p>Amethyst</p></li>
									<li><p>Garnet</p></li>
									<li><p>Quartz</p></li>
								</ul>
							</div>
							<div class="by-colour">
							<h4>By colour</h4>
								<ul>
									<li><p>Blue</p></li>
									<li><p>Purple</p></li>
									<li><p>White</p></li>
								</ul>
							</div>
						</div>
						<div class="filter-button-container">
							<button class="apply-filters">Apply filters</button>
							<button class="reset-filters">Reset<span>my filters</span></button>
						</div>
					</div>
				</section>

				<section class="products-results-section">
					
				</section>
			</section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
