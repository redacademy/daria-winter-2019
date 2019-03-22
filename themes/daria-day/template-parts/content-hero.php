
<?php 
// Variables
$hero_title = get_field('hero_title');
$hero_sub_title = get_field('hero_sub_title');
?>
<div class="home-hero">
    <div class="hero-title">
        <p><?php echo $hero_title ?></p>
    </div>
    <div class="hero-sub-title">
       <p> <?php echo $hero_sub_title ?> </p>
    </div>

    <div>
        <button class="hero-btn"><a href="#"><p>Shop now </p></a></button>
    </div>
</div>

