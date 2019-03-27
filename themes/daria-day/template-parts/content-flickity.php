

<?php 
// Variables
$quote1title = get_field('quote1title');
$quote1body = get_field('quote1body');
$quote1author = get_field('quote1author');

$quote2title = get_field('quote2title');
$quote2body = get_field('quote2body');
$quote2author = get_field('quote2author');

$quote3title = get_field('quote3title');
$quote3body = get_field('quote3body');
$quote3author = get_field('quote3author');

$quote4title = get_field('quote4title');
$quote4body = get_field('quote4body');
$quote4author = get_field('quote4author');

$quote5title = get_field('quote5title');
$quote5body = get_field('quote5body');
$quote5author = get_field('quote5author');
?>

	
<div class="carousel"'>
  <div class="carousel-cell">
    <div class="quote-container">
      <h4 class="quote-title"><?php echo $quote1title ?></h4>
      <p class="quote-body"><?php echo $quote1body ?></p>
      <br>
      <p class="quote-author"><?php echo $quote1author ?></p>
    </div>
  </div>
  <div class="carousel-cell">
    <div class="quote-container">
      <h4 class="quote-title"><?php echo $quote2title ?></h4>
      <p class="quote-body"><?php echo $quote2body ?></p>
      <br>
      <p class="quote-author"><?php echo $quote2author ?></p>
    </div>
  </div>
  <div class="carousel-cell">
    <div class="quote-container">
      <h4 class="quote-title"><?php echo $quote3title ?></h4>
      <p class="quote-body"><?php echo $quote3body ?></p>
      <br>
      <p class="quote-author"><?php echo $quote3author ?></p>
    </div>
  </div>
  <div class="carousel-cell">
    <div class="quote-container">
      <h4 class="quote-title"><?php echo $quote4title ?></h4>
      <p class="quote-body"><?php echo $quote4body ?></p>
      <br>
      <p class="quote-author"><?php echo $quote4author ?></p>
    </div>
  </div>
  <div class="carousel-cell">
    <div class="quote-container">
      <h4 class="quote-title"><?php echo $quote5title ?></h4>
      <p class="quote-body"><?php echo $quote5body ?></p>
      <br>
      <p class="quote-author"><?php echo $quote5author ?></p>
    </div>
  </div>
</div>
<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>