//Implementation to extract adventure ID from query params

import config from "../conf/index.js";

function getAdventureIdFromURL(search) {
  const urlParams = new URLSearchParams(search);
  const adventureId = urlParams.get("adventure");
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  try {
    const result = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  //Setting the name
  document.getElementById("adventure-name").innerHTML = adventure.name;

  //Setting the subtitle
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  //Loading the images
  adventure.images.map((image) => {
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
      />
          `;
    document.getElementById("photo-gallery").appendChild(ele);
  });

  //Setting the content
  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  if (adventure.available) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" id="carousel-inner">

    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
</div>`;

  images.map((image, idx) => {
    let ele = document.createElement("div");
    ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
    ele.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
      />
          `;

    document.getElementById("carousel-inner").appendChild(ele);
  });
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  document.getElementById("reservation-cost").innerHTML =
    persons * adventure.costPerHead;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  $("#myForm").submit(function (e) {
    //prevent Default functionality
    e.preventDefault();
    var data = $(this).serialize() + "&adventure=" + adventure.id;

    let url = config.backendEndpoint + "/reservations/new";

    $.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function (response) {
        alert("Success!");
      },
      error: function () {
        alert("Failed!");
      },
    });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
