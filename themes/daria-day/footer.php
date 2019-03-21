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

		<div class= 'mailchimp'>
			<?php	
			if ( is_front_page() ) :
			else :
			endif;?>
		</div>

		<div id="products">
			<?php
			if(is_active_sidebar('products')){
			dynamic_sidebar('products');
			}?>
		</div>

		<div id="company">
			<?php
			if(is_active_sidebar('company')){
			dynamic_sidebar('company');
			}?>
		</div>

		<div id="customers">
			<?php
			if(is_active_sidebar('customers')){
			dynamic_sidebar('customers');
			}?>
		</div>

		<div id="socialmedia">	
			<?php	
			if ( is_front_page() ) :
			else :
			get_template_part('template-parts/content', 'socialmedia');
			endif;?>
		</div>


		<div id="darialogo">
			<?php
			if(is_active_sidebar('darialogo')){
			dynamic_sidebar('darialogo');
			}?>
		</div>

	</div>


	</div><!-- .site-info -->

</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
