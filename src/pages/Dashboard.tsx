import * as React from "react";
import axios from "axios";
import Wishlist from "../components/Wishlist";
import Readlist from "../components/Readlist";
import { DashboardProps, BookObject } from "../types";

const Dashboard = ({ loggedInStatus, currentUser }: DashboardProps) => {
  const loggedIn = loggedInStatus === "LOGGED_IN";
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
      <h1>Home</h1>
      <h1>Status: {loggedInStatus}</h1>
      <h2>Email: {currentUser?.email}</h2>
      <h2>ID: {currentUser?.id}</h2>

      <div className="flex flex-row items-center justify-center">
        <Wishlist
          loggedInStatus={loggedInStatus}
          currentUser={currentUser}
          list={wishlist}
          handleForceUpdate={handleForceUpdate}
        />
        <Readlist
          loggedInStatus={loggedInStatus}
          currentUser={currentUser}
          list={readlist}
          handleForceUpdate={handleForceUpdate}
        />
      </div>
    </div>
  );
};

export default Dashboard;
