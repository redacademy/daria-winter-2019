
<?php 
function dariaRegisterSearch() {
    register_rest_route('daria/v1','search', array(
        'methods' => WP_REST_SERVER::READABLE, 
        'callback' => 'dariaSearchResults'
    )); 
}
add_action('rest_api_init', 'dariaRegisterSearch');

function dariaSearchResults($data) {
    global $wpdb;
    $results = $wpdb->get_results("SELECT * FROM ".$wpdb->prefix.wps_products);
    $tagResults = $wpdb->get_results("SELECT * FROM ".$wpdb->prefix.wps_tags);
    $prices = $wpdb->get_results("SELECT * FROM ".$wpdb->prefix.wps_variants);
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
            'show_count' => 1,
            'title'=> $row->title,
            'description' => $row->body_html,
            'product_id'=> $row->product_id, 
            'image'=> $row->image,
            'product_type' => $row->product_type,
            'tags' => $tagInfo,
            'price' => $priceInfo,
            'date' => $row->updated_at 
        ); 

        array_push($products, $productInfo);
    // }
    };
    return $products;
}?>