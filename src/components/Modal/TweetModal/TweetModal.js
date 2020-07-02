import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import classNames from "classnames";
import { toast } from "react-toastify";
import { Close } from "../../../utils/icons";
import { createTweetApi } from "../../../api/tweet";

import "./TweetModal.scss";

export default function TweetModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");
  const maxLength = 280;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (message.length === 0 && message.length > maxLength) {
      return toast.error("Invalid message");
    }

    const result = await createTweetApi(message);
    if (result) {
      toast.success("Message published");
      window.location.reload();
    } else {
      toast.error("Failed to publish message");
    }
    setShow(false);
  };

  return (
    <Modal
      className="tweet-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            rows="6"
            placeholder="What's up"
            onChange={(e) => setMessage(e.target.value)}
          />
          <span
            className={classNames("count", {
              error: message.length > maxLength,
            })}
          >
            Length: {message.length}
          </span>
          <Button
            type="submit"
            disabled={message.length > maxLength || message.length === 0}
          >
            Publish
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
