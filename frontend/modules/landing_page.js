import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{const data=await fetch(config.backendEndpoint+"/cities");
  const result=await data.json();
  return result;}
  catch{
    return null;
  }
  


}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
var a=document.createElement("a");
a.href=`pages/adventures/?city=${id}`;
a.setAttribute("id",id);

 var div=document.createElement("div");
 div.setAttribute("class","col-12 col-sm-6 col-lg-3");
 
 div.style.marginBottom="25px";
 document.getElementById("data").append(div);
 div.append(a);
 var div1=document.createElement("div");
 div1.setAttribute("class","tile");
 var img=document.createElement("img");
 img.src=image;
 var div3=document.createElement("div");
 div3.setAttribute("class","tile-text");
 var h2=document.createElement("h5");
 h2.innerText=city;
 var p=document.createElement("p");
 p.innerText=description;
 div1.append(img);
 div3.append(h2);
 div3.append(p);
 div1.append(div3);
 a.append(div1);
 

}

export { init, fetchCities, addCityToDOM };
