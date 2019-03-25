<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package daria-day
 */

?>
    <!DOCTYPE html>
    <section class = 'ourstory'>
       
    <p><?php the_field('ourstory'); ?></p>
            
            <div class='skewedphotos'>
                <div class="photo1">
                    <h4>image placeholder</h4>
                </div> 
        

                <div class='photo2'>
                    <h4>image placeholder</h4>
                </div> 
                
        </div>

    </section>
    
	</div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->
