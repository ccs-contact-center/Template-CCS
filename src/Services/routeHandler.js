/* eslint-disable */
import React from "react";

const Inicio = React.lazy(() => import("../Views/Inicio"));
const Dashboard = React.lazy(() => import("../Views/Dashboard"));

const EntrevistaRH = React.lazy(() => import("../Views/Reclutamiento/EntrevistaRH"));
const EntrevistaOP = React.lazy(() => import("../Views/Operaciones/EntrevistaOP"));
const Confirmar = React.lazy(() => import("../Views/Reclutamiento/Confirmar"));
const CalidadRecluta = React.lazy(() => import("../Views/Auditoria/CalidadRecluta"));
const Profile = React.lazy(() => import("../Views/Profile"));
const AsignacionGrupo = React.lazy(() => import("../Views/Capacitacion/AsignacionGrupo"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/Inicio", name: "Inicio", component: Inicio },
  { path: "/Dashboard", name: "Dashboard", component: Dashboard },
  { path: "/Profile", name: "Mi Perfil", component: Profile },
  { path: "/EntrevistaRH", name: "Entrevistas Pendientes", component: EntrevistaRH },
  { path: "/EntrevistaOP", name: "Entrevistas Pendientes", component: EntrevistaOP },
  { path: "/Confirmar", name: "Candidatos a Confirmar", component: Confirmar },
  { path: "/CalidadRecluta", name: "Calidad Recluta", component: CalidadRecluta },
  { path: "/AsignacionGrupo", name: "Asignacion de Grupo", component: AsignacionGrupo },
];


var authArray = [];
var authRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/Inicio", name: "Inicio", component: Inicio },
  { path: "/Dashboard", name: "Dashboard", component: Dashboard },
  { path: "/Profile", name: "Mi Perfil", component: Profile },
];

export var allowedRoutes = (id) => {
  id.items.forEach((element) => {
    if (element.title !== true) {
      if (element.children !== undefined) {
        authArray.push(element.url);
        element.children.forEach((child) => {
          authArray.push(child.url);
        });
      } else {
        authArray.push(element.url);
      }
    }
  });

  routes.forEach((element) => {
    if (authArray.includes(element.path)) {
      authRoutes.push(element);
    }
  });

  return authRoutes;
};
