
<?php 
// Variables
$hero_title = get_field('hero_title');
$hero_sub_title = get_field('hero_sub_title');
?>
<div class="home-hero">
<p class="hero-title"><?php echo $hero_title ?></p>
<p class="hero-sub-title"><?php echo $hero_sub_title ?></p>
<button class="hero-btn"><a href="#"><p>Shop now </p></a></button>
</div>

