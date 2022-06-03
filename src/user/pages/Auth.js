import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/components/hooks/form-hook";
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

  function authSubmitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
    navigate("/", { replace: true });
  }

  function switchModeHandler() {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
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
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  }

  return (
    <Card className="authentication">
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
          errorText="Password must be at least 9 characters in length"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(9)]}
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
  );
}
