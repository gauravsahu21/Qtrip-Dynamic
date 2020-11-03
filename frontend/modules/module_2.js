
//Implementation to extract city from query params
function getCityFromURL(search) {
  const urlParams = new URLSearchParams(search);
  const city = urlParams.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    const result = await fetch(`http://localhost:4000/adventures?city=${city}`);
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
  }
}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  adventures.forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "col-6 col-lg-3 mb-4";
    ele.innerHTML = `
            <a href="detail/?adventure=${key.id}" id=${key.id}>
            <div class="category-banner">${key.category}</div>
              <div class="activity-card">

                <img
                  class="img-responsive"
                  src=${key.image}
                />

                <div class="activity-card-text text-md-center w-100 mt-3">
                  <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class="text-left">${key.name}</h5>
                    <p>₹${key.costPerHead}</p>
                  </div>
                    <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class="text-left">Duration</h5>
                    <p>${key.duration} Hours</p>
                  </div>
                </div>
              </div>
            </a>
          `;

    document.getElementById("data").appendChild(ele);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  let filteredList = [];

  list.map((key) => {
    if (key.duration > low && key.duration <= high) {
      filteredList.push(key);
    }
  });

  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  let filteredList = [];
  categoryList.map((category) => {
    list.map((key) => {
      if (key.category === category) {
        filteredList.push(key);
      }
    });
  });

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  let filteredList = [];

  // 3. Filter by duration and category together
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  // default case when there is no filter
  else {
    filteredList = list;
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  //Sets value in dropdown for duration filter
  document.getElementById("duration-select").value = filters.duration;

  //Iterates over category filters and inserts category pills into DOM
  filters["category"].map((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
                 <div>${key}</div>
                `;

    document.getElementById("category-list").appendChild(ele);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
