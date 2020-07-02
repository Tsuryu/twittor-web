import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth";

import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFormData());
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      return toast.warning("The form is imcomplete");
    }

    if (!isEmailValid(formData.email)) {
      return toast.warning("Invalid email");
    }

    if (formData.password !== formData.repeatPassword) {
      return toast.warning("Passwords do not match");
    }

    if (size(formData.password) < 6) {
      return toast.warning(
        "Invalid password. The password should have at least 6 characters"
      );
    }

    setSignUpLoading(true);
    signUpApi(formData)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("Sign up ok");
          setShowModal(false);
          setFormData(initialFormData());
        }
      })
      .catch(() => {
        toast.error("Internal error");
      })
      .finally(() => {
        setSignUpLoading(false);
      });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Firstname"
                name="firstName"
                defaultValue={formData.firstName}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Lastname"
                name="lastName"
                defaultValue={formData.lastName}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={formData.email}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                defaultValue={formData.password}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repeat password"
                name="repeatPassword"
                defaultValue={formData.repeatPassword}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signUpLoading ? "Registrarse" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormData() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
