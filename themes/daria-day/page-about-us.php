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
<?php
$about_us_title = get_field('about_us_title');
$our_artisans_title = get_field('our_artisans_title');

$more_about_us_1 = get_field('more_about_us_1');
$more_about_us_2 = get_field('more_about_us_2');

?>
	
<div id="primary" class="content-area">
	<main id="main" class="site-main about-us-page">

	<section class ='heroimage'>

		<img class='heroimage' src="<?php echo get_template_directory_uri();?>/images/jewelrymaking1.jpg" alt="Jewelry Making">

		<div class='herocopy'>
			<h1><?php the_field('hero_text'); ?></h1>
		</div>

	</section>

	<section class = 'content-wrapper'>
		<div class = 'information-wrapper'>
			<div class='about'>

				<div class='aboutcopy'>
					<h3><?php echo $about_us_title; ?></h3>
					<p><?php the_field('about_us_body'); ?></p>
				</div>

				<div class='aboutimage'>
					<img class='k2' src="<?php echo get_template_directory_uri();?>/images/k2.png" alt="K2 Mountain">
				</div>

			</div>


			<div class='artisans'>

				<div class='artisanscopy'>
					<h3><?php echo $our_artisans_title ?></h3>
					<p><?php the_field('our_artisans_body'); ?></p>
				</div>

				<div class='artisansimage'>

				<img class='art' src="<?php echo get_template_directory_uri();?>/images/artisan3.jpg" alt="Artisans">

			</div>
		</div>

		<section class= "links">

			<div class ='photolinks'>

				<div class= 'bgimg'>
				<img src="<?php echo get_template_directory_uri();?>/images/ddgreen3.png" alt="Our Process">

					<div class='flowercopy'>
						<p><?php echo $more_about_us_1; ?></p>
					</div>
					
				</div>
				
				<div class='bgimg'>

					<img src="<?php echo get_template_directory_uri();?>/images/braclet5.JPG" alt="Take Care of your Jewelry">
					<div class='jewelcopy'>
						<p><?php echo $more_about_us_2; ?></p>
					</div>	


				</div>	
			
			</div>
		</section>
		
	</section>



	<section class='slider'>
				<?php
				get_template_part('template-parts/content', 'flickity');
				?>
			</section>
</div>




		</main><!-- #main -->
		
	</div><!-- #primary -->

<?php
get_footer();