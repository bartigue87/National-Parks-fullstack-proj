import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import "./PlaceItem.css";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "./Map";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function toggleMap() {
    setShowMap((prevState) => {
      return !prevState;
    });
  }

  function toggleDeleteModal() {
    setShowConfirmModal((prevState) => {
      return !prevState;
    });
  }

  async function confirmDelete() {
    toggleDeleteModal();
    try {
      await sendRequest(
        `http://localhost:3000/api/places/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={toggleMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={toggleMap}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={11} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={toggleDeleteModal}
        header="Are you sure"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={toggleDeleteModal}>
              CANCEL
            </Button>{" "}
            <Button danger onClick={confirmDelete}>
              DELETE
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:3000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={toggleMap}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={toggleDeleteModal}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
