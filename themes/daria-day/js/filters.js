( function( $ ) {
console.log('hellow from filters.js');
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

