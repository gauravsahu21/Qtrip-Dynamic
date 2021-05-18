
const express = require("express");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");
const { nanoid, customAlphabet } = require("nanoid");
var dayjs = require("dayjs");
const db = lowDb(new FileSync("db.json"));
const app = express();
const random_data = require("./random_data");
var utc = require("dayjs/plugin/utc"); // dependent on utc plugin
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8082;

/*
[GET API] used in module 1 to fetch data for all cities
The response is an [array] of cities with each having the following structure :
{
    "id": "<city-id>",
    "city": "<city-name>",
    "description": "<random-string>",
    "image": "<image-url>"
}
Data is sourced from "cities" array in db.json file
*/
app.get("/cities", (req, res) => {
  const data = db.get("cities").value();
  return res.json(data);
});

/*
[GET API] used in module 2 to fetch all adventures for a given city
The response is an [array] of adventures with each having the following structure :
{
    "id": "2447910730",
    "name": "Niaboytown",
    "costPerHead": 4003,
    "currency": "INR",
    "image": "https://images.pexels.com/photos/837745/pexels-photo-837745.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "duration": 6,
    "category": "Party"
 }
Data is sourced from "adventures" array in db.json file
*/
app.get("/adventures", (req, res) => {
  const data = db.get("adventures").value();
  let response = (data.find((item) => item.id == req.query.city) || [])
    .adventures;
  if (response) return res.json(response);
  else
    return res.status(400).send({
      message: `Adventure not found for ${req.query.city}!`,
    });
});

/*
[GET API] used in module 3 to fetch details for a given adventure
The response is an [array] of adventures with each having the following structure :
 {
    "id": "2447910730",
    "name": "Niaboytown",
    "subtitle": "This is a mind-blowing adventure!",
    "images": [
    "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/837745/pexels-photo-837745.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
    ],
    "content": "Random content",
    "available": false,
    "reserved": true,
    "costPerHead": 4003
 }
Data is sourced from "adventures" array in db.json file
*/
app.get("/adventures/detail", (req, res) => {
  const data = db.get("detail").value();
  let response = data.find((item) => item.id == req.query.adventure);
  if (response) return res.json(response);
  else
    return res.status(400).send({
      message: `Adventure details not found for ${req.query.adventure}!`,
    });
});

/*
[GET] API used in module 3 to make a new reservation
Expects serialized form data in the format name=Roy&date=2020-10-08&person=2&adventure=8318638903
If the reservation is successful, it flips the "available" key to "false" and "reserved" key to "true" for the given adventure
*/
app.post("/reservations/new", (req, res) => {
  const reservation = req.body;
  const instance = db.get("detail").value();
  const nanoid = customAlphabet("1234567890abcdef", 16);
  let reqDate = dayjs(req.body.date);
  let currentDate = dayjs(new Date());

  if (reqDate > currentDate) {
    db.get("detail")
      .find((item) => item.id == req.body.adventure)
      .assign({ reserved: true, available: false })
      .write();
    const costPerHead = instance.find((item) => item.id == req.body.adventure)
      .costPerHead;

    const adventureName = instance.find((item) => item.id == req.body.adventure)
      .name;

    reservation.name = reservation.name
      .trim()
      .toLowerCase()
      .split(" ")
      .map((i, j) => i.charAt(0).toUpperCase() + i.slice(1))
      .join(" ");
    db.get("reservations")
      .push({
        ...reservation,
        adventureName: adventureName,
        price: reservation.person * costPerHead,
        id: nanoid(),
        time: new Date().toString(),
      })
      .write();
    return res.json({ success: true });
  } else {
    return res.status(400).send({
      message: `Date of booking is incorrect!`,
    });
  }
});

/*
[POST] API used in reservations.html page to fetch all reservations
The response is an [array] of reservations with each having the following structure :
{
    "name": "Rahul",
    "date": "2020-10-26",
    "person": "02",
    "adventure": "2447910730",
    "adventureName": "Niaboytown",
    "price": 8006,
    "id": "34b2076696d4e51a",
    "time": "Sun Oct 25 2020 19:32:12 GMT+0530 (India Standard Time)"
}
Data is sourced from "reservations" array in db.json file
*/
app.get("/reservations", (req, res) => {
  const data = db.get("reservations").value();
  if (data) return res.json(data);
});


app.listen(process.env.PORT || PORT, () => {
  console.log(`Backend is running on port ${process.env.PORT || PORT}`);
});

/*
Helper function to generate a random integer between two limits
*/
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
