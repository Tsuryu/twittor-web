import React from "react";
import "./InfoUser.scss";
import moment from "moment";
import localization from "moment/locale/es";
import { DateBirth, Link, Location } from "../../../utils/icons";

export default function InfoUser(props) {
  const { user } = props;
  return (
    <div className="info-user">
      <h2 className="name">
        {user?.firstName} {user?.lastName}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.biography && <div className="biography">{user.biography}</div>}

      <div className="more-info">
        {user?.location && (
          <p>
            <Location />
            {user.location}
          </p>
        )}
        {user?.webSite && (
          <a
            href={user.webSite}
            alt={user.webSite}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link /> {user.webSite}
          </a>
        )}
        {user?.birthDate && (
          <p>
            <DateBirth />
            {moment(user.birthDate).locale("es", localization).format("LL")}
          </p>
        )}
      </div>
    </div>
  );
}
