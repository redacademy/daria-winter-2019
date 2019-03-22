( function( $ ) {
//console.log('hellooo from filters.js');
console.log('hello from latest.js');
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
        
        for(let i = 0; i < 4 ; i++){
            latestAdditions[i].push(results[i].image);
            latestAdditions[i].push(results[i].permalink);
            latestAdditions[i].push(results[i].title);
            latestAdditions[i].push(results[i].price);           
        }
        console.log(latestAdditions);
        resultsDiv.html(`
        <h1> Our Latest Additions </h1>
        <div class='latest-additions-container'>
            <div class ='latest-additions'>
                ${latestAdditions.map(item =>
                    `<div class="latest-additions-item">
                        <img src = ${item[0]}>
                        <a href="#">${item[2]}</a>
                        <div class="price"> <p> $${item[3]} CAD </p></div>
                    </div>`
                ).join('')}
            </div>
        </div>`);
        
    });
}
//filter functionality
$("#filter-energy-abundance").on('click', ()=> {
    $.ajax({
        beforeSend: (xhr) => { //this pice to pass randomly generated nonce code along with our request so wp knows we're logged in and authorized to do so
        xhr.setRequestHeader('X-WP-Nonce', dariaData.nonce);
        },
        url: dariaData.root_url + '/wp-json/daria/v1/search',
        type: 'GET', //regarding professorId below, in order to assign it dynamically, we need to assign a data attribute in html(data-professor) and then access it via js
        // data: {'professorId': currentLikeBox.data('professor')}, //we use data property to send along info to server side and we could add it to the end of url above like ...manageLike?professorId=789, but this way is cleaner
        success: (response)=>{
            console.log('success');
            console.log(response);
        },
        error: (response)=>{
            console.log('try again');
            console.log(response);
        },
    });
});

} )( jQuery );

