import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignInForm from "../../components/SignInForm/SignInForm";
import LogoWhite from "../../assets/png/logo-white.png";
import Logo from "../../assets/png/logo.png";
import "./SignInSignUp.scss";

export default function SignInSignUp(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setCntentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setCntentModal(content);
  };

  return (
    <>
      <Container className="signin-signup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
            openModal={openModal}
            setShowModal={setShowModal}
            setRefreshCheckLogin={setRefreshCheckLogin}
          />
        </Row>
      </Container>
      <BasicModal show={showModal} setShowModal={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return (
    <Col className="signin-signup__left" xs={6}>
      <img src={Logo} alt="Twittor" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Enterate de que esta hablando la gente.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Unete a la conversacion
        </h2>
      </div>
    </Col>
  );
}

function RightComponent(props) {
  const { openModal, setShowModal, setRefreshCheckLogin } = props;
  return (
    <Col className="signin-signup__right" xs={6}>
      <div>
        <img src={LogoWhite} alt="Twittor" />
        <h2>Mira lo que esta pasando en el mundo en este momento</h2>
        <h3>Unete a Twittor hoy mismo.</h3>
        <Button
          variant="primary"
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
        >
          Sign up
        </Button>
        <Button
          variant="outline-primary"
          onClick={() =>
            openModal(
              <SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />
            )
          }
        >
          Sign in
        </Button>
      </div>
    </Col>
  );
}
