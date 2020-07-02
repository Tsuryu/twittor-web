import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import BascicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import ListTweets from "../../components/ListTweets";
import { getUserApi } from "../../api/user";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getTweetsApi } from "../../api/tweet";

import "./User.scss";
import { getByTestId } from "@testing-library/react";

function User(props) {
  const { match, setRefreshCheckLogin } = props;
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  useEffect(() => {
    getUserApi(match.params.id)
      .then((response) => {
        if (!response) {
          toast.error("Invalid user");
        }
        setUser(response);
      })
      .catch(() => {
        toast.error("Invalid user");
      });
  }, [match.params]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getTweetsApi(match.params.id, 1);
      setTweets(result);
    };
    fetch();
  }, [match.params]);

  const moreTweets = async () => {
    setLoading(true);
    const pageTemp = page + 1;

    const result = await getTweetsApi(match.params.id, pageTemp);
    if (result) {
      setTweets([...tweets, ...result]);
      setPage(pageTemp);
      setLoading(false);
    } else {
      setLoading(null);
    }
  };

  return (
    <BascicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="user__title">
        <h2>{user ? `${user.firstName} ${user.lastName}` : "Not found"}</h2>
      </div>
      <BannerAvatar user={user} currentUser={currentUser} />
      <InfoUser user={user} />
      <div className="user__tweets">
        <h3>Tweets</h3>
        {tweets && <ListTweets tweets={tweets} />}
        {loading !== null && (
          <Button onClick={moreTweets}>
            {!loading ? (
              "Load more"
            ) : (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        )}
      </div>
    </BascicLayout>
  );
}

export default withRouter(User);
