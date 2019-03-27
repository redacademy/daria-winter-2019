<<<<<<< HEAD
<!-- <div class="embed-container content-wrapper">
    <?php echo the_field('video_link'); ?>
</div> -->

<?php
$video_link = get_field('video_link');
?>

<div class="content-wrapper">
  <div class="embed-video">
    <iframe src="<?php echo $video_link ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
=======
<div class="embed-container">
	<?php the_field('video_link'); ?>
>>>>>>> 045bef2748565a062bc77ca8fdcedce2e02a3633
</div>