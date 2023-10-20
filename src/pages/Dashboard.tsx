import * as React from "react";
import axios from "axios";
import BookList from "../components/ui/templates/BookList";
import { DashboardProps, BookObject } from "../types";

const Dashboard = ({ loggedInStatus, currentUser }: DashboardProps) => {
  const [wishlist, setWishlist] = React.useState<BookObject[] | null>([]);
  const [readlist, setReadlist] = React.useState<BookObject[] | null>([]);
  const [forceUpdate, setForceUpdate] = React.useState(false);

  const fetchUser = (id: number | null) => {
    axios
      .get(`/user/${id}/show`, {
        headers: { Accept: "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        setReadlist(response.data.user.readlist);
        setWishlist(response.data.user.wishlist);
      })
      .catch((error) => console.log("User fetch error: ", error));
  };

  React.useEffect(() => {
    if (currentUser?.id) {
      fetchUser(currentUser.id);
    }
  }, [currentUser?.id, forceUpdate]);

  const handleForceUpdate = () => {
    setForceUpdate(!forceUpdate);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex flex-row items-start justify-start">
        <BookList
          name="Wishlist"
          loggedInStatus={loggedInStatus}
          currentUser={currentUser}
          list={wishlist}
          handleForceUpdate={handleForceUpdate}
          removable="wishlist"
          addable="readlist"
        />
        <BookList
          name="Readlist"
          loggedInStatus={loggedInStatus}
          currentUser={currentUser}
          list={readlist}
          handleForceUpdate={handleForceUpdate}
          removable="readlist"
          addable="wishlist"
        />
      </div>
    </div>
  );
};

export default Dashboard;
