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

            <!-- <div class="filter-overlay filter-overlay--active">
                <div class="filter-container">
                    <h1>Filters</h1>
                    <ul class="filter-energy">
                        <li><h2>By Energy</h2></li>
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
                    <button id="filter-btn">Apply filter</button>
                </div>
                <i class="fa fa-window-close filter-overlay__close" aria-hidden="true"></i>
            </div> -->
            <dl class="filter-dropdown"> 
  
                <!-- <dt class="dt">
                    <a href="#">
                        <span class="hida">Select</span>    
                        <p class="multiSel"></p>  
                    </a>
                </dt> -->
            
                <dd>
                    <div class="multiselect">
                    <input id="seats" value="" >
                        <ul>
                            <!-- <h1>By Energy</h1> -->

                            <li>
                            <button class="filter-energy-tag">By Energy</button>
                            <input type="button" class="seat" value="Abundance">
                            <input type="button" class="seat" value="Calmness">
                            <input type="button" class="seat" value="Enlightenment">
                            <input type="button" class="seat" value="Fertility">
                            <input type="button" class="seat" value="Focus">
                            <input type="button" class="seat" value="Healing">
                            <input type="button" class="seat" value="Love">
                            <input type="button" class="seat" value="Positivity">
                            <input type="button" class="seat" value="Prosperity">
                            <!-- <input type="checkbox" value="abundance" />Abundance</li>
                            <li> -->
                            <button class="filter-btn-interior" id="filter-btn-interior">Apply filter</button>
                            <button class="filter-btn-interior-close" id="filter-btn-interior-close">Cancel</button>

                            </li>
                        </ul>
                        
                    </div>
                </dd>
            <button class="filter-btn" id="filter-btn">Filter</button>
            </dl>
            <div class="filter-results-container"></div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php

get_footer();
