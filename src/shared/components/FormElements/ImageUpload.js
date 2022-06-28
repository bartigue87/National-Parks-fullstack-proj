import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";

import "./ImageUpload.css";

export default function ImageUpload(props) {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();

  function pickerHandler(event) {
    let pickedFile;
    let fileIsValid;
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  }

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  function pickImageHandler() {
    filePickerRef.current.click();
  }

  return (
    <>
      <div className="form-control">
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpeg, .png, .jpg"
          onChange={pickerHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          <div className="image-upload__preview">
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && (
              <div>
                <p>Select a profile picture.</p>
              </div>
            )}
          </div>
          <Button type="button" onClick={pickImageHandler}>
            Choose Image
          </Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </>
  );
}
