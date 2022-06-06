const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Zion National Park",
    description: "National park in souther Utah.....",
    imageUrl:
      "https://images.unsplash.com/photo-1443632864897-14973fa006cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    address: "1101 Zion Park Blvd. Springdale, UT. 84767",
    creator: "u2",
    location: {
      lat: 37.317207,
      lng: -113.022537,
    },
  },
  //   {
  //     id: "p2",
  //     title: "Zion National Park",
  //     description: "National park in souther Utah.....",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1443632864897-14973fa006cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  //     address: "1101 Zion Park Blvd. Springdale, UT. 84767",
  //     creator: "u2",
  //     location: {
  //       lat: 37.317207,
  //       lng: -113.022537,
  //     },
  //   },
];

function getParkById(req, res, next) {
  const parkId = req.params.pid;
  const park = DUMMY_PLACES.find((p) => {
    return p.id === parkId;
  });
  if (!park) {
    throw new HttpError("Could not find a park for the provided ID", 404);
  }

  res.json({ park });
}

function getParkByUserId(req, res, next) {
  const userId = req.params.uid;
  const park = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!park) {
    throw new HttpError("Could not find a park for the provided User ID", 404);
  }

  res.json({ park });
}

function createPark(req, res, next) {
  const { title, description, location, address, creator } = req.body;
  const createdPark = {
    id: uuidv4(),
    title,
    description,
    location,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPark);

  res.status(201).json({ park: createdPark });
}

function updatePark(req, res, next) {
  const { description } = req.body;
  const parkId = req.params.pid;

  const updatedPark = { ...DUMMY_PLACES.find((p) => p.id === parkId) };
  const parkIndex = DUMMY_PLACES.findIndex((p) => p.id === parkId);
  updatedPark.description = description;

  DUMMY_PLACES[parkIndex] = updatedPark;

  res.status(200).json({ park: updatedPark });
}

function deletePark(req, res, next) {
  const parkId = req.params;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== parkId);
  res.status(200).json({ message: "Deleted Park" });
}

exports.getParkById = getParkById;
exports.getParkByUserId = getParkByUserId;
exports.createPark = createPark;
exports.updatePark = updatePark;
exports.deletePark = deletePark;
