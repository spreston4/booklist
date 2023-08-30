import * as React from "react";
import { SessionProps } from "../App";

interface DashboardProps extends SessionProps {}

const Dashboard = ({ loggedInStatus, currentUser }: DashboardProps) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Home</h1>
      <h1>Status: {loggedInStatus}</h1>
      <h2>Email: {currentUser?.email}</h2>
      <h2>ID: {currentUser?.id}</h2>
    </div>
  );
};

export default Dashboard;
