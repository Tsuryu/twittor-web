import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal";
import UserForm from "../../User/UserForm";
import AvatarNotFound from "../../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../../utils/constants";
import {
  getFollowApi,
  createFollowApi,
  deleteFollowApi,
} from "../../../api/follow";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, currentUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);

  const bannerUrl = user?.banner ? `${API_HOST}/banner?id=${user.id}` : null;
  const avatarUrl = user?.banner
    ? `${API_HOST}/avatar?id=${user.id}`
    : AvatarNotFound;

  useEffect(() => {
    if (!user?.id) return;
    getFollowApi(user?.id).then((response) => {
      if (response?.result === "OK") {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    });

    setReloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    createFollowApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

  const onUnfollow = () => {
    if (deleteFollowApi(user.id)) {
      setReloadFollow(true);
    }
  };

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      ></div>

      {user && (
        <div className="options">
          {currentUser._id === user.id ? (
            <Button onClick={() => setShowModal(true)}>Edit profile</Button>
          ) : following ? (
            <Button onClick={onUnfollow} className="unfollow">
              <span>Following</span>
            </Button>
          ) : (
            <Button onClick={onFollow}>Follow</Button>
          )}
        </div>
      )}

      <ConfigModal show={showModal} setShow={setShowModal} title="Edit profile">
        <UserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>
    </div>
  );
}
