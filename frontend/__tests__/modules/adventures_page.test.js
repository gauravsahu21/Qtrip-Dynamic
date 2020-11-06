
import {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
} from "../../modules/adventures_page.js";

require("jest-fetch-mock").enableMocks();

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
  path.resolve(__dirname, "../../pages/adventures/index.html"),
  "utf8"
);
jest.dontMock("fs");

Storage.prototype.getItem = jest.fn(() => expectedPayload);

describe("Adventure Page Tests", function () {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    fetch.resetMocks();
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  it("Extract city from URL Params", async () => {
    const city = await getCityFromURL("?city=london");
    expect(city).toEqual("london");
  });

  it("Check if fetch call for the adventures was made and data was received", async () => {
    const data = await fetchAdventures("bengaluru");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("?city=bengaluru")
    );
  });

  it("Catches errors and returns null", async () => {
    fetch.mockReject(() => "API failure");

    const data = await fetchAdventures("bengaluru");
    expect(data).toEqual(null);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("?city=bengaluru")
    );
  });
  it("Tries adding a new Adventure - Park", function () {
    addAdventureToDOM([
      {
        category: "park",
        costPerHead: 20,
        currency: "INR",
        duration: 4,
        image: "",
        name: "park",
        id: "park",
      },
    ]);
    expect(document.getElementById("park")).toBeTruthy();
  });

  it("Check if City Card is linked correctly to Adventures page", function () {
    const expected = "/detail/?adventure=123456";

    addAdventureToDOM([
      {
        category: "park",
        costPerHead: 20,
        currency: "INR",
        duration: 4,
        image: "",
        name: "park",
        id: "123456",
      },
    ]);
    expect(document.getElementById("123456").href).toEqual(
      expect.stringContaining(expected)
    );
  });

});
