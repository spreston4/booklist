import * as React from "react";
import Wishlist from "../components/Wishlist";
import Readlist from "../components/Readlist";
import { DashboardProps } from "../types";

const Dashboard = ({ loggedInStatus, currentUser }: DashboardProps) => {
  const loggedIn = loggedInStatus === "LOGGED_IN";
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Home</h1>
      <h1>Status: {loggedInStatus}</h1>
      <h2>Email: {currentUser?.email}</h2>
      <h2>ID: {currentUser?.id}</h2>

      <div className="flex flex-row items-center justify-center">
        <Wishlist loggedInStatus={loggedInStatus} currentUser={currentUser} />
        <Readlist loggedInStatus={loggedInStatus} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Dashboard;
