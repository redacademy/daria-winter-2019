
<?php
$existStatus = 'no';
if (is_front_page()) {
    $existStatus = 'yes';
}
?>
<div class="latest-additions-container" id ="latest-additions-container"data-exists="<?php echo $existStatus; ?>"> </div>
