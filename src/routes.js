import React from "react";

const Inicio = React.lazy(() => import("./Views/Inicio"));
const Dashboard = React.lazy(() => import("./Views/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/Inicio", name: "Inicio", component: Inicio },
  { path: "/Dashboard", name: "Dashboard", component: Dashboard },
];

export default routes;
