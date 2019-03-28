
<?php 
// Variables
$hero_title = get_field('hero_title');
$hero_sub_title = get_field('hero_sub_title');
?>
<div class="home-hero">
    <div class="content-wrapper">
        <div class="hero-title">
            <h1><?php echo $hero_title ?></h1>
        </div>
        <div class="hero-sub-title">
            <p> <?php echo $hero_sub_title ?> </p>
        </div>

        <button class="hero-btn"><a href="<?php echo get_home_url() ?>/shop">Shop now</a></button>
    </div>
</div>

