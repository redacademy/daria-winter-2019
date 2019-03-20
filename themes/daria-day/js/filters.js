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
        console.log(results[0].title);
        
        for(let i = 0; i < 4 ; i++){
            latestAdditions[i].push(results[i].image);
            latestAdditions[i].push(results[i].permalink);
            latestAdditions[i].push(results[i].title);
            latestAdditions[i].push(results[i].price);           
        }
        console.log(latestAdditions);
        resultsDiv.html(`
        <ul class ='latest-additions'>
            ${latestAdditions.map(item =>
                `<li class="latest-additions-item">
                    <img src = ${item[0]} width="150px" height="150px">
                    <a href="#">${item[2]}</a>
                    $${item[3]} CAD
                </li>`
            ).join('')}
        </ul>`);
        
    });
}
//filter functionality

$("#filter-btn").on('click', function() {
    // $(".filter-dropdown dt").toggleClass("dt--active");
    $(".filter-dropdown dd ul").slideToggle('fast');
  });

// $(".filter-dropdown dt a").on('click', function() {
//     $(".filter-dropdown dd ul").slideToggle('fast');
//   });
  
//   $(".filter-dropdown dd ul li a").on('click', function() {
//     $(".filter-dropdown dd ul").hide();
//   });
  
//   function getSelectedValue(id) {
//     return $("#" + id).find("dt a span.value").html();
//   }
  
  $(document).bind('click', function(e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("filter-dropdown")) $(".filter-dropdown dd ul").hide();
  });
  
//   $('.multiselect input[type="checkbox"]').on('click', function() {
  
//     var title = $(this).closest('.multiselect').find('input[type="checkbox"]').val(),
//       title = $(this).val() + ",";
  
//     if ($(this).is(':checked')) {
//       var html = '<span title="' + title + '">' + title + '</span>';
//       $('.multiSel').append(html);
//       $(".hida").hide();
//     } else {
//       $('span[title="' + title + '"]').remove();
//       var ret = $(".hida");
//       $('.filter-dropdown dt a').append(ret);
  
//     }
//   });
//remove seat from list
function removeSeat(seatListElm, seatValue) {
    var arr=seatListElm.value.split(',');
     
     var p=arr.indexOf(seatValue);
     if(p!=-1){
         arr.splice(p, 1);
         seatListElm.value=arr.join(',');
     }
}


//add seat to list
function addSeat(seatListElm, seatValue) {
    var arr=seatListElm.value.split(',');
    if(arr.join()==''){ arr=[]; }
    
    var p=arr.indexOf(seatValue);
    if(p==-1){
        arr.push(seatValue); //append
        arr=arr.sort(); //sort list
        seatListElm.value=arr.join(',');
    } 
}

//called everytime a seat is clicked
function seatClick(seat) {
    seat = (this instanceof HTMLInputElement ) ? this : seat;
    var firstSelected;
    var selectedSeats = [];
    var thisInputHasAlreadyBeenSeen = false;
    var confirmedSeats = [];
    if (seat.classList.contains('reserved')==false) {

        if (seat.classList.toggle('selected')) {
            addSeat(document.getElementById('seats'), seat.value);
            $(".seat").each(function() {
                if(this != seat) {
                if(firstSelected == null && this.classList.contains('selected')) {
                    firstSelected = this;
                    selectedSeats.push(firstSelected);
                    confirmedSeats = selectedSeats.slice();
                } else if (firstSelected) {
                    if(this.classList.contains('selected')) {
                        selectedSeats.push(this);
                    confirmedSeats = selectedSeats.slice();
                       }
                    if(!this.classList.contains('reserved')) {
                    selectedSeats.push(this);
                     }
                else{
                    if(!thisInputHasAlreadyBeenSeen) {
                    selectedSeats = [];
                    firstSelected = null;
                    } else {
                        return false;
                    }
                }
                }
                } else {
                    selectedSeats.push(this);
                    confirmedSeats = selectedSeats.slice();
                    if(firstSelected == null) {
                        thisInputHasAlreadyBeenSeen = true;
                        firstSelected = this;
                    }
                }
            });
            if(confirmedSeats.length > 1) {
            selectAll(confirmedSeats);
            }
        } else {
            removeSeat(document.getElementById('seats'), seat.value);
        }
      
    } else {
        alert("This seat is reserved!\nPlease select another seat");
        removeSeat(document.getElementById('seats'), seat.value);
        return;
    }
}


//adding event click to seats
var elms=document.getElementsByClassName('seat');
for(var i=0, l=elms.length ; i<l ; i++){
    elms[i].onclick=seatClick;
}

function selectAll(seats) {
    seats.forEach(function(seat) {
        seat.className = seat.className + ' selected';
    });
}
//filter process
$("#filter-btn-interior").on('click', ()=> {
    $.ajax({
        beforeSend: (xhr) => { //this pice to pass randomly generated nonce code along with our request so wp knows we're logged in and authorized to do so
        xhr.setRequestHeader('X-WP-Nonce', dariaData.nonce);
        },
        url: dariaData.root_url + '/wp-json/daria/v1/search',
        type: 'GET', 
        // data: {'professorId': currentLikeBox.data('professor')}, //we use data property to send along info to server side and we could add it to the end of url above like ...manageLike?professorId=789, but this way is cleaner
        success: (response)=>{
            // console.log(response);
            // let searchField =selectedSeats;
            //look in tag column of each array response and return title if there are matches
            
            // let container = response[2].tags;
            // let containerInc = container.includes(selectedSeats);
            // if(selectedSeats[0].className = "seat selected") {
            //     console.log(selectedSeats[0].defaultValue);
            // }
            let selSeats= selectedSeats;
            let selSeatEmpty=[];
            console.log(selSeats);
            // selectedSeats.map(items => {
            // selSeats.forEach(function(e){    
            //     if(e.className = "seat selected"){
            //         selSeatEmpty.push(e.defaultValue.toLowerCase());
            //     }
            // });
 
            // response.map(item => {
            //     //items.defaultValue.toLowerCase()
            //         let tagContainer = item.tags;
            //         if (selectedSeats[0].className = "seat selected" && tagContainer.includes('abundance')){
            //             // console.log(item);
            //             // var gridRes = response.tags;
            //             console.log(item.title);
            //             // $(".rowDip").append(gridRes);
            //         }
            // })

            // if (response[0].tags.includes['silver']){
                
            // }
            // $(".filter-results-container").html(`
            // <ul class ='Filter Results'>
            //     ${latestAdditions.map(item =>
            //         `<li class="latest-additions-item">
            //             <img src = ${item[0]} width="150px" height="150px">
            //             <a href="#">${item[2]}</a>
            //             $${item[3]} CAD
            //         </li>`
            //     ).join('')}
            // </ul>`);            
        },
        error: (response)=>{
            console.log('try again');
            console.log(response);
        },
    });
});

} )( jQuery );




