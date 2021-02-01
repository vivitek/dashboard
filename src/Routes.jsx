import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Router from "./pages/Router/Router";
import Landing from "./pages/Landing";
import RouterDetails from "./pages/Router/RouterDetails";
import PdfTableExport from "./pages/PdfTableExport";

const AuthedRoute = ({ path, exact, component }) => {
    if (path === "/" && !localStorage.getItem("vivi-jwt")) {
        return <Route path={path} exact component={Landing} />;
    }
    return localStorage.getItem("vivi-jwt") ? (
        <Route path={path} exact={exact} component={component} />
    ) : (
        <Redirect to="/login?error=authentication" />
    );
};

const Routes = () => (
    <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/connections" exact component={Connections} />
        <Route path="/routers" exact component={Router} />
        <Route path="/pdf/table" exact component={PdfTableExport} />
        <Route path="/routers/:id" exact component={RouterDetails} />
        <Route path="/" exact component={Home} />
        <Route path="/welcome" exact component={Landing} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
    </Switch>
);

export default Routes;
