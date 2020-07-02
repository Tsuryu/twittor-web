import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constants";
import { getUserApi } from "../../api/user";
import moment from "moment";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

import "./ListTweets.scss";

export default function ListTweets(props) {
  const { tweets } = props;
  return (
    <div className="list-tweets">
      {map(tweets, (tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </div>
  );
}

function Tweet(props) {
  const { tweet } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUserApi(tweet.userId).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${API_HOST}/avatar?id=${response.id}`
          : AvatarNotFound
      );
    });
  }, [tweet]);

  return (
    <div className="tweet">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.firstName} {userInfo?.lastName}
          <span>{moment(tweet.date).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(tweet.message),
          }}
        />
      </div>
    </div>
  );
}
