( function( $ ) {

	if (!$('body').hasClass('home')) {
    return;
  } 

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
			
			for(let i = 0; i < 4 ; i++){
					latestAdditions[i].push(results[i].image);
					latestAdditions[i].push(results[i].permalink);
					latestAdditions[i].push(results[i].title);
					latestAdditions[i].push(results[i].price);           
			}
			
			resultsDiv.html(`
			<h2> Our Latest Additions </h2>
			<div class='latest-additions-display'>
				${latestAdditions.map(item =>
					`<div class="latest-additions-item">
						<img src = ${item[0]}>
						<a href="#">${item[2]}</a>
						<p> $${item[3]} CAD </p>
					</div>`
				).join('')}
				</div>
			<div class="see-more-button">
				<a href="${home_url.website_home_url}/shop"><button>See More</button></a>
			</div>`);
        
    });
  }
})(jQuery);
