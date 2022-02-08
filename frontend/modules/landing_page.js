import config from "../conf/index.js";

async function init() {
  console.log("from init()")
console.log(config.backendEndpoint+"/cities")
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
console.log(cities)
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let data=await fetch(config.backendEndpoint+"/cities")
  let result=await data.json();
  return result
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
let conatiner=document.createElement("div")
conatiner.className="col-12 col-sm-6 col-lg-3 mb-4"
let atag=document.createElement("a")
atag.setAttribute("id",id)
atag.href=`pages/adventures/?city=${id}`

let tile=document.createElement("div")
tile.className="tile"
tile.innerHTML=`<img src="${image}"> `
let tileDes=document.createElement("div")
tileDes.className="tile-text text-white text-center";
tileDes.innerHTML=`<h5>${city}</h5>
<p>${description}</p>`

tile.append(tileDes)
atag.append(tile)
conatiner.append(atag)

document.getElementById("data").appendChild(conatiner)
}

export { init, fetchCities, addCityToDOM };
