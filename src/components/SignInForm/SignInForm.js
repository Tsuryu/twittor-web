import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import "./SignInForm.scss";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signInApi, setTokenApi } from "../../api/auth";

export default function SignInForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setFormData] = useState(initialFormData());
  const [signInLoading, setSignInLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (size(formData) !== validCount) {
      toast.warning("Invalid credentials");
      return;
    }

    if (!isEmailValid(formData.email)) {
      toast.warning("Invalid email");
      return;
    }

    setSignInLoading(true);
    signInApi(formData)
      .then((response) => {
        if (response.message) {
          toast.warning(response.message);
          return;
        }

        setTokenApi(response.token);
        setRefreshCheckLogin(true);
      })
      .catch(() => {
        toast.error("Internal error");
      })
      .finally(() => {
        setSignInLoading(false);
      });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-in-form">
      <h2>Sign in</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            defaultValue={formData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signInLoading ? "Sign in" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormData() {
  return {
    email: "",
    password: "",
  };
}
