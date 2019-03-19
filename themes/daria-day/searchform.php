<form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
  <a class="search-toggle">
    <span class="icon-search" aria-hidden="true">
      <img src="<?php echo get_template_directory_uri() ?>/images/Search-Icon.svg">
    </span>
    <span class="screen-reader-text"><?php echo esc_html( 'Search' ); ?></span>
    <label>
      <input type="search" class="search-field" placeholder="SEARCH..." value="<?php echo esc_attr( get_search_query() ); ?>" name="s" title="Search for:" />
    </label>
  </a>
</form>
