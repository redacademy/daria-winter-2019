
<?php 
function dariaRegisterSearch() {
    register_rest_route('daria/v1','search', array(
        'methods' => WP_REST_SERVER::READABLE, 
        'callback' => 'dariaSearchResults'
    )); 
}
add_action('rest_api_init', 'dariaRegisterSearch');

function dariaSearchResults($data) {//we're adding data here since we know wp passes info when calling this function on top
    global $wpdb;
    $results = $wpdb->get_results("SELECT * FROM ".$wpdb->prefix.wps_products);
    $tagResults = $wpdb->get_results("SELECT * FROM ".$wpdb->prefix.wps_tags);
    $prices = $wpdb->get_results("SELECT * FROM ".$wpdb->prefix.wps_variants);
    // $tagEnergy = "silver";	
    // $productInfo = array();
    // $count = 0;
    $products = [];
    foreach ( $results as $row ) {?>



        <?php 
        $tagInfo = [];
        foreach ($tagResults as $tagRow ) {
    
            if($row->product_id == $tagRow->product_id ){
                array_push($tagInfo, $tagRow->tag);    

            }
            
        } 
        foreach ($prices as $price ) {
            
            if($row->product_id == $price->product_id ){
                $priceInfo = $price->price;

            }

        } 
        $productInfo = array(
            'title'=> $row->title,
            'description' => $row->body_html,
            'product_id'=> $row->product_id, 
            'image'=> $row->image,
            'product_type' => $row->product_type,
            'tags' => $tagInfo,
            'price' => $priceInfo
        ); 

        array_push($products, $productInfo);
    // }
    };
    return $products;
    // $mainQuery = new WP_Query(array(
    //     'post_type' => 'wps_products',
    //     // 'product_id' => 'wps_tags'
    //     //WPS_PRODUCTS_POST_TYPE_SLUG
    //     // 's' => sanitize_text_field($data['term'])//s stand for search, term is a madeup name that we chose, sanitize is a security measure
    // ));
    // var_dump($professors);
    //since we dont need to generate html, we dont need to do perform regualr while loop
    // $results = array(
    //     'products' => array(),
    //     'collections' => array(),
    // ); //we created this array to only filter the few properties that we need

    //return $mainQuery->posts;// this prints all info about posts, which we will only need a few
    //while($mainQuery->have_posts()) {
    //    $mainQuery->the_post(); //the_post gets all relevant data for posts ready and accessable
        // print_r($mainQuery);

    //     if(get_post_type() == WPS_PRODUCTS_POST_TYPE_SLUG ) {
    //         array_push($results['products'], array( //1st arg is the array the we want to add on to, 2nd is what u wanna add on to the array
                
    //             'title' => get_the_title(),  
    //             'permalink' => get_the_permalink(),
    //             'image' => get_the_post_thumbnail_url(0),//0 refers to current img
    //             'tag' => get_field('tag_name')
    //         ));
    //     }
    //     if(get_post_type() == WPS_COLLECTIONS_POST_TYPE_SLUG) {
    //         array_push($results['collections'], array( //1st arg is the array the we want to add on to, 2nd is what u wanna add on to the array
    //             'title' => get_the_title(),  
    //             'permalink' => get_the_permalink(),
    //             'image' => get_the_post_thumbnail_url(0),//0 refers to current img
    //             'tag' => get_field('tag_name')
    //         ));
    // }
    
    // }

    // return $results;
}?>