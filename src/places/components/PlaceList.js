import React, { useContext } from "react";

import { AuthContext } from "../../shared/components/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "../components/PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";

const PlaceList = (props) => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No parks to show yet</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
