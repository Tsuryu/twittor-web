import React, { useState, useEffect } from "react";
import { Spinner, Button, ButtonGroup } from "react-bootstrap";
import BasicaLayout from "../../layout/BasicLayout";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { getUsersApi } from "../../api/user";
import ListUsers from "../../components/ListUsers";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce";

import "./Users.scss";

function Users(props) {
  const { setRefreshCheckLogin, location, history } = props;
  const { page = 1, type = "follow", search = "" } = useQuery(location);
  const [users, setUsers] = useState(null);
  const [userType, setUserType] = useState(type || "follow");
  const [loading, setLoading] = useState(false);
  const [loadMoreUsers, setLoadMoreUsers] = useState(true);

  const [onSearch] = useDebouncedCallback((value) => {
    setUsers(null);
    history.push({
      search: queryString.stringify({ type, search: value, page: 1 }),
    });
  }, 200);

  // console.log(queryString.stringify({ page, type, search }));

  useEffect(() => {
    getUsersApi({ page, type, search })
      .then((response) => {
        // eslint-disable-next-line eqeqeq
        if (page == 1) {
          setUsers(isEmpty(response) ? [] : response);
        } else {
          setUsers(isEmpty(response) ? users : { ...users, ...response });
        }

        setLoadMoreUsers(!isEmpty(response));
        setLoading(false);
      })
      .catch((error) => {
        setUsers([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onChangeType = (type) => {
    setUsers(null);
    if (type === "new") {
      setUserType("new");
    } else {
      setUserType("follow");
    }
    history.push({
      search: queryString.stringify({ type, page: 1, search: "" }),
    });
  };

  const moreUsers = () => {
    setLoading(true);
    const newPage = parseInt(page) + 1;
    history.push({
      search: queryString.stringify({ type, page: newPage, search }),
    });
  };

  return (
    <BasicaLayout
      title="Users"
      className="users"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="users__title">
        <h2>Users</h2>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <ButtonGroup className="users__options">
        <Button
          onClick={() => onChangeType("follow")}
          className={userType === "follow" && "active"}
        >
          Following
        </Button>
        <Button
          onClick={() => onChangeType("new")}
          className={userType === "new" && "active"}
        >
          New
        </Button>
      </ButtonGroup>
      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          Loading users...
        </div>
      ) : (
        <>
          <ListUsers users={users} />
          {loadMoreUsers && (
            <Button onClick={moreUsers} className="load-more">
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
        </>
      )}
    </BasicaLayout>
  );
}

function useQuery(params) {
  return queryString.parse(params.search);
}

export default withRouter(Users);
