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
            <button id="filter-btn">Filter</button>
            <div class="filter-overlay filter-overlay--active">
                <div class="filter-container">
                    <strong>Filters</strong>
                </div>
                <i class="fa fa-window-close filter-overlay__close" aria-hidden="true"></i>
            </div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php

get_footer();
