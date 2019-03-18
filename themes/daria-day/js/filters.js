( function( $ ) {
console.log('hello from filters.js');
    let resultsDiv = $('#latest-additions-container');
    $.getJSON(dariaData.root_url + '/wp-json/daria/v1/search', (results) => {
        console.log(results);
        resultsDiv.html(`
        <div class ='row'>
            <div class = "one-third">
                ${results.map(item => 
                    `<li>
                        <img src = ${item.image}>
                        <a href="${item.permalink}">${item.title}</a>
                        ${item.price}
                    </li>`
                    ).join('')}

            </div>

        <div>`);
        
    });
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

