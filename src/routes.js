import React from "react";

const Inicio = React.lazy(() => import("./Views/Inicio"));
const Dashboard = React.lazy(() => import("./Views/Dashboard"));
const EntrevistaRH = React.lazy(() => import("./Views/EntrevistaRH"));
const EntrevistaOP = React.lazy(() => import("./Views/EntrevistaOP"));
const Confirmar = React.lazy(() => import("./Views/Confirmar"));
const CalidadRecluta = React.lazy(() => import("./Views/CalidadRecluta"));


const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/Inicio", name: "Inicio", component: Inicio },
  { path: "/Dashboard", name: "Dashboard", component: Dashboard },
  { path: "/EntrevistaRH", name: "Entrevistas Pendientes", component: EntrevistaRH },
  { path: "/EntrevistaOP", name: "Entrevistas Pendientes", component: EntrevistaOP },
  { path: "/Confirmar", name: "Candidatos a Confirmar", component: Confirmar },
  { path: "/CalidadRecluta", name: "Calidad Recluta", component: CalidadRecluta },
];

export default routes;
