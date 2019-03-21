
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
        $tagInfoGem = [];
        $tagInfoEnergy = [];
        $tagInfoMisc = [];
        $customCollectionEarring = [];
        $customCollectionHoliday = [];
        if(preg_match('/\bDazzling\b/', $row->title)) {
            array_push($customCollectionEarring, "Silver Gemstone Drop Earrings");
        }
        if(preg_match('/\bGreen Amazonite Mala|Bold Amethyst Bracelet|Golden Agate Necklace|Sparkling Water Quartz Bracelet|Glam Me Blue Lapis Tassel Earrings|Blushing Pink Rose Quartz Bracelet|Cha Cha Red Garnet Tassel Earrings|Rose Quartz Angel Kisses Bracelet|Rose Quartz Angel Kisses Bracelet|Calm Waters Blue Lapis Tassel Earrings|zendagi Gift Card\b/', $row->title)) {
            array_push($customCollectionHoliday, "Magical Holiday Gifting");
        }
        foreach ($tagResults as $tagRow ) {
    
            if($row->product_id == $tagRow->product_id And preg_match('/\bmoonstone|rose quartz|quartz|lapis|amethyst|feldspar|amazonite|agate|rutilated quartz|Garnet\b/', $tagRow->tag)){
                array_push($tagInfoGem, $tagRow->tag);    

            }elseif($row->product_id == $tagRow->product_id And preg_match('/\bcalmness|fertility|focus|prosperity|positivity|love|enlightenment|healing|peace|abundance\b/', $tagRow->tag)){
                array_push($tagInfoEnergy, $tagRow->tag);    

            } elseif($row->product_id == $tagRow->product_id){
                array_push($tagInfoMisc, $tagRow->tag);    
               
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
            'permalink' =>"products/$row->post_name",
            'description' => $row->body_html,
            'custom_earring_collection'=> $customCollectionEarring, 
            'custom_holiday_collection' => $customCollectionHoliday,
            'product_id'=> $row->product_id, 
            'image'=> $row->image,
            'product_type' => $row->product_type,
            'tags' => array(
                'gemstone' =>$tagInfoGem ,
                'energy' => $tagInfoEnergy,
                'misc' => $tagInfoMisc
            ),
            'price' => $priceInfo,
            'date' => $row->updated_at 
        ); 

        array_push($products, $productInfo);
    // }
    };
    return $products;
}?>