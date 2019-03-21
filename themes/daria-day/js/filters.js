( function( $ ) {
//console.log('hellooo from filters.js');

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
    $(".filter-dropdown dd ul").slideToggle('fast');
  });

  $(document).bind('click', function(e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("filter-dropdown")) $(".filter-dropdown dd ul").hide();
  });
  


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

var confirmedSeats = [];
function seatClick(seat) {
    seat = (this instanceof HTMLInputElement ) ? this : seat;
    let selectedSeats = [];
    var firstSelected;

    var thisInputHasAlreadyBeenSeen = false;

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
                //     if(!this.classList.contains('reserved')) {
                //     selectedSeats.push(this);
                //      }
                // else{
                    // if(!thisInputHasAlreadyBeenSeen) {
                    // selectedSeats = [];
                    // firstSelected = null;
                    // } else {
                    //     return false;
                    // }
                // }
                }
                } else {
                    selectedSeats.push(this);
                    confirmedSeats = selectedSeats.slice();
                    // if(firstSelected == null) {
                    //     thisInputHasAlreadyBeenSeen = true;
                    //     firstSelected = this;
                    // }
                }
            });
            if(confirmedSeats.length > 1) {
            // selectAll(confirmedSeats);
            }
        // }
        } else {
            removeSeat(document.getElementById('seats'), seat.value);
        }
    // }
    } else {
        alert("This seat is reserved!\nPlease select another seat");
        removeSeat(document.getElementById('seats'), seat.value);
        return;
    }

}

//adding event click to seats
var elms = document.getElementsByClassName('seat');
for(var i=0, l=elms.length ; i<l ; i++){
    elms[i].onclick=seatClick;
}
// function selectAll(seats) {
//     seats.forEach(function(seat) {
//         seat.className = seat.className + ' selected';
//     });
// }

//filter process
$("#filter-btn-interior").on('click', ()=> {
    $.ajax({
        
        beforeSend: (xhr) => { 
        xhr.setRequestHeader('X-WP-Nonce', dariaData.nonce);
        },
        url: dariaData.root_url + '/wp-json/daria/v1/search',
        type: 'GET', 
        success: (response)=>{
            console.log(response);
            console.log(confirmedSeats);
            let tagEnergySelected=[];
            let tagGemSelected=[];
            let tagEnergyList = ['calmness','fertility','focus','prosperity','positivity','love','enlightenment','healing','peace','abundance'];
            let tagGemList = ['moonstone','rose quartz','quartz','lapis','amethyst','feldspar','amazonite','agate','rutilated quartz','Garnet'];
            confirmedSeats.forEach(function(e){
                let el = e.value.toLowerCase();
                // console.log(el);
                if(e.className === "seat selected" && tagEnergyList.includes(el)){
                    tagEnergySelected.push(el);
                }
            });
            confirmedSeats.forEach(function(e){
                let el = e.value.toLowerCase();
                // console.log(el);
                if(e.className === "seat selected" && tagGemList.includes(el)){
                    tagGemSelected.push(el);
                }
            });
            removeSeat(document.getElementById('seats'), '');
            console.log(tagEnergySelected);
            console.log(tagGemSelected);

            response.map(item => {
                let tagContainerEnergy = item.tags.energy;
                let tagContainerGemstone = item.tags.gemstone;

                if (tagEnergySelected.every(elem => tagContainerEnergy.indexOf(elem) > -1) && tagGemSelected.every(elem => tagContainerGemstone.indexOf(elem) > -1)){

                    console.log(item.title);
                    
                }

            })


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
$("#filter-btn-interior-close").on('click', ()=> {


    // removeSeat(document.getElementById('seats'), 'Abundance');


});
} )( jQuery );




