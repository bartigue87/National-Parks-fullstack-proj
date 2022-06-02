import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: 0,
    title: "Zion National Park",
    description: "National park in souther Utah.....",
    imageUrl:
      "https://images.unsplash.com/photo-1443632864897-14973fa006cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    address: "1101 Zion Park Blvd. Springdale, UT. 84767",
    creator: "u1",
    location: {
      lat: 37.317207,
      lng: -113.022537,
    },
  },
  {
    id: 1,
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
];

export default function UserPlaces() {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
}
