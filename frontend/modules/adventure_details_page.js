import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
    console.log(search)
      let params = new URLSearchParams(search);
      console.log(params.get('adventure'))
     return params.get('adventure')


  // Place holder for functionality to work in the Stubs

}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try{
    const data= await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
   return await data.json();
    
   }
  catch{
    return null;

  }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log("gaurav",adventure);
  document.getElementById("adventure-name").append(adventure.name);
  document.getElementById("adventure-subtitle").append(adventure.subtitle);
 // console.log(adventure["images"]);
    for(let i=0;i<adventure.images.length;i++)
   {
    var div=document.createElement("div");
    
     var img=document.createElement("img");
     img.setAttribute("class","activity-card-image");
     img.src=adventure.images[i];
     
     div.append(img);
     document.getElementById("photo-gallery").append(div);
   }
   document.getElementById("adventure-content").append(adventure.content);

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log(images.length);
   var div=document.getElementById("photo-gallery");
   
   var output="<div id=\"carouselExampleControls\" class=\"carousel slide\" data-ride=\"carousel\">";
   output+="<ol class=\"carousel-indicators\">";
   output+="<li data-target=\"#carouselExampleControls\" data-slide-to=\"0\" class=\"active\"></li>";
   output+="<li data-target=\"#carouselExampleControls\" data-slide-to=\"1\"></li>";
   output+="<li data-target=\"#carouselExampleControls\" data-slide-to=\"2\"></li>";
   output+="</ol>";

    output+="<div class=\"carousel-inner\">";
    for(var i=0;i<images.length;i++)
    {
      if(i==0)
          {output+="<div class=\"carousel-item active activity-card-image\">";  
          output+="<img class=\"d-block w-100\" src="+images[i] +"alt=\"First slide\">";
          output+="</div>";}
       else{
        output+="<div class=\"carousel-item  activity-card-image\">";  
        output+="<img class=\"d-block w-100\" src="+images[i] +"alt=\"\">";
        output+="</div>";
       }   
   }
   //EXAMPLE CODE TO CHECK IF IT WORKS OR NOT 
               //  output+="<div class=\"carousel-item active activity-card-image\">";
               //   output+="<img class=\"d-block w-100\" src="+images[0] +"alt=\"First slide\">";
               //   output+="</div>";
               //   output+="<div class=\"carousel-item activity-card-image\">";
               //   output+="<img class=\"d-block w-100\"src="+images[1]+" alt=\"Second slide\">";
               //   output+="</div>";
               //   output+="<div class=\"carousel-item activity-card-image\">";
               //   output+="<img class=\"d-block w-100\" src="+images[2]+" alt=\"third slide\">";
              //   output+="</div>";
    output+="</div>";
    output+="<a class=\"carousel-control-prev\" href=\"#carouselExampleControls\" role=\"button\" data-slide=\"prev\">";
    output+="<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>";
   
    output+="</a>";
    output+="<a class=\"carousel-control-next\" href=\"#carouselExampleControls\" role=\"button\" data-slide=\"next\">";
    output+="<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>";
   
    output+="</a>";
    output+="</div>";
    div.innerHTML=output;


   
  
 

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
