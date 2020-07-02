import React, { useState, useCallback } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import en from "date-fns/locale/en-US";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { API_HOST } from "../../../utils/constants";
import { Camera } from "../../../utils/icons";
import {
  uploadBannerApi,
  uploadAvatarApi,
  updateUserApi,
} from "../../../api/user";

import "./UserForm.scss";

export default function UserForm(props) {
  const [loading, setLoading] = useState(false);
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialValue(user));

  const [bannerUrl, setBannerUrl] = useState(
    user.banner ? `${API_HOST}/banner?id=${user.id}` : null
  );
  const [bannerFile, setBannerFile] = useState(null);
  const onDropBanner = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(acceptedFile);
  });
  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  const [avatarUrl, setAvatarUrl] = useState(
    user.avatar ? `${API_HOST}/avatar?id=${user.id}` : null
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(acceptedFile);
  });
  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (bannerFile) {
      await uploadBannerApi(bannerFile).catch(() => {
        toast.error("Failed to upload banner");
      });
    }

    if (avatarFile) {
      await uploadAvatarApi(avatarFile).catch(() => {
        toast.error("Failed to upload avatar");
      });
    }

    await updateUserApi(formData)
      .then(() => {
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Failed to update profile");
      });

    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="user-form">
      <div
        className="banner"
        style={{ backgroundImage: `url('${bannerUrl}')` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <Camera />
      </div>
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
        {...getRootAvatarProps()}
      >
        <input {...getInputAvatarProps()} />
        <Camera />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="First name"
                name="firstName"
                defaultValue={formData.firstName}
                onChange={onChange}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last name"
                name="lastName"
                defaultValue={formData.lastName}
                onChange={onChange}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            row="3"
            placeholder="Biography..."
            type="text"
            name="biography"
            defaultValue={formData.biography}
            onChange={onChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Web Site"
            name="webSite"
            defaultValue={formData.webSite}
            onChange={onChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <DatePicker
            placeholder="Birth date"
            locale={en}
            selected={new Date(formData.birthDate)}
            onChange={(value) => setFormData({ ...formData, birthDate: value })}
          />
        </Form.Group>

        <Button className="btn-submit" variant="primary" type="submit">
          {loading && <Spinner animation="border" size="sm" />} Update
        </Button>
      </Form>
    </div>
  );
}

function initialValue(user) {
  return {
    firstName: user.firstName ? user.firstName : "",
    lastName: user.lastName || "",
    biography: user.biography || "",
    ubcation: user.ubcation || "",
    webSite: user.webSite || "",
    birthDate: user.birthDate || "",
  };
}
