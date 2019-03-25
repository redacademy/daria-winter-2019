( function( $ ) {
  console.log('hellooo from filters.js');
    
  //latest addistion on front page
  if($('#latest-additions-container').attr('data-exists')== 'yes'){
    let resultsDiv = $('#latest-additions-container');
    let image = new Array();
    let permalink = new Array();
    let title = new Array();
    let price = new Array();
    let latestAdditions = new Array(image, permalink, title, price);

    $.getJSON(dariaData.root_url + '/wp-json/daria/v1/search', (results) => {
      //sort results array based on date
      results.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
      console.log(results);
      console.log(results[0].title);
      
      for(let i = 0; i < 4 ; i++){
        latestAdditions[i].push(results[i].image);
        // latestAdditions[i].push(results[i].permalink);
        latestAdditions[i].push(results[i].title);
        latestAdditions[i].push(results[i].price);           
      }
      console.log(latestAdditions);
      // function productlink(product) {
      //pass this to href ${productlink(item[2])}
      //     if (product = ""){
      //         return link
      //     }
      // }
      resultsDiv.html(`
        <ul class ='latest-additions'>
          ${latestAdditions.map(item =>
            `<li class="latest-additions-item">
              <img src = ${item[0]} width="150px" height="150px">
              <a href="">${item[1]}</a>
              $${item[2]} CAD
            </li>`
          ).join('')}
        </ul>`
      );
        
    });
  }
})(jQuery);