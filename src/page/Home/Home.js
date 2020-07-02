import React, { useState, useEffect } from "react";
import { Spinner, Button } from "react-bootstrap";
import "./Home.scss";
import BasicLayout from "../../layout/BasicLayout";
import ListTweets from "../../components/ListTweets";
import { getTweetsFollowersApi } from "../../api/tweet";
import { toast } from "react-toastify";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getTweetsFollowersApi(page);
        setLoading(false);
        if (!result) {
          return setLoadMore(false);
        }

        // eslint-disable-next-line eqeqeq
        if (page == 1) {
          setTweets(parseModel(result));
        } else {
          setTweets([...tweets, ...parseModel(result)]);
        }
      } catch (e) {
        toast.error(e.message);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const moreTweets = () => {
    setLoading(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>Home</h2>
      </div>
      {tweets && <ListTweets tweets={tweets} />}
      {loadMore && (
        <Button onClick={moreTweets} className="load-more">
          {Loading ? (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Load more"
          )}
        </Button>
      )}
    </BasicLayout>
  );
}

function parseModel(tweets) {
  if (!tweets) return [];
  const tweetsTemp = [];
  tweets.forEach(({ tweet }) => {
    tweetsTemp.push({
      userId: tweet.userId,
      message: tweet.message,
      date: tweet.date,
    });
  });

  return tweetsTemp;
}
