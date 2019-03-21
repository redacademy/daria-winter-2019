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
        <button class="filter-btn-bracelet" id="filter-btn-bracelet">Bracelets</button>          

        <?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', 'page' );


		endwhile; // End of the loop.

?>
            <dl class="filter-dropdown">  
                <button class="filter-btn" id="filter-btn">Filter</button>          
                <dd>
                    <div class="multiselect">
                    <input id="seats" value="" class= "selectedVals">
                        <ul>
                            <li>
                            <button class="filter-energy-tag">By Energy</button>
                            <br>
                            <input type="button" class="seat" value="Abundance">
                            <input type="button" class="seat" value="Calmness">
                            <input type="button" class="seat" value="Enlightenment">
                            <input type="button" class="seat" value="Fertility">
                            <input type="button" class="seat" value="Focus">
                            <input type="button" class="seat" value="Healing">
                            <input type="button" class="seat" value="Love">
                            <input type="button" class="seat" value="Positivity">
                            <input type="button" class="seat" value="Prosperity">
                            </li>
                            <li>
                            <br>
                            <button class="filter-gemstone-tag">By Gemstone</button>
                            <br>
                            <input type="button" class="seat" value="Moonstone">
                            <input type="button" class="seat" value="Lapis">
                            <input type="button" class="seat" value="Amethyst">
                            <input type="button" class="seat" value="Feldspar">
                            <input type="button" class="seat" value="Amazonite">
                            <input type="button" class="seat" value="Agate">
                            <input type="button" class="seat" value="Garnet">
                            <input type="button" class="seat" value="Quartz">
                            <input type="button" class="seat" value="Rose quartz">
                            <input type="button" class="seat" value="Rutilated quartz">
                            
                            </li>
                            <br>
                            <button class="filter-btn-interior" id="filter-btn-interior">Apply filter</button>
                            <button class="filter-btn-interior-close" id="filter-btn-interior-close">Reset</button>
 
                        </ul>
                        
                    </div>
                </dd>

            </dl>
            <?php $existStatusBracelet = 'no';
                global $post;
                if ($post->ID === 73) {
                    $existStatusBracelet = 'yes';
                }
                ?>
                <div class="bracelets-container" id ="bracelets-container"data-exists="<?php echo $existStatusBracelet; ?>"> </div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php

get_footer();
