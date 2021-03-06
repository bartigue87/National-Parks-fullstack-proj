import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/components/hooks/form-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import AvatarImage from "../../images/avatar.jpeg";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/components/context/auth-context";

import "./Auth.css";
import { useNavigate } from "react-router";

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  async function authSubmitHandler(event) {
    event.preventDefault();

    console.log(formState.inputs);
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        navigate("/", { replace: true });
        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:3000/api/users/signup",
          "POST",
          formData
        );
        navigate("/", { replace: true });
        auth.login(responseData.user.id);
      } catch (err) {}
    }
  }

  function switchModeHandler() {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Username"
              onInput={inputHandler}
              errorText="Please enter a valid username"
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please select a profile picture."
            />
          )}
          <Input
            id="email"
            type="email"
            element="input"
            label="Email"
            onInput={inputHandler}
            errorText="Please enter a valid email"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          />
          <Input
            id="password"
            type="password"
            element="input"
            label="Password"
            onInput={inputHandler}
            errorText="Password must be at least 6 characters in length"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode
            ? "Not a member? Create an account"
            : "Already a member? Login"}
        </Button>
      </Card>
    </>
  );
}
