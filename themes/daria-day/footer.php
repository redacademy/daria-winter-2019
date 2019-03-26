<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package daria-day
 */

?>

	</div><!-- #content -->

<footer id="footer" class="footer">
	<div class="companyinfo">

		
			<div class="products">
				<?php
				if(is_active_sidebar('products')){
				dynamic_sidebar('products');
				}?>
				
			</div>
			<div class="company">
				<?php
				if(is_active_sidebar('company')){
				dynamic_sidebar('company');
				}?>
			</div>

			<div class="customers">
				<?php
				if(is_active_sidebar('customers')){
				dynamic_sidebar('customers');
				}?>
			</div>
		<section class ='contact'>
			<div class="logocontainer">
			
				<img class= "darialogo" src="<?php echo get_template_directory_uri();?>/images/icons/x-symbol.svg" alt="Facebook Logo">
			
			</div>
			<div class="socialmedia">	
				<?php	
				
				get_template_part('template-parts/content', 'socialmedia');
				
				?>
			</div>
			<div class= 'mailchimp'>
				<?php	
				
				get_template_part('template-parts/content', 'mailchimp');
				
				?> 
			</div>
		</section>		

			
		
	</div>

</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
