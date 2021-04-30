import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Router from "./pages/Router/Router";
import Landing from "./pages/Landing";
import RouterDetails from "./pages/Router/RouterDetails";
import PdfTableExport from "./pages/PdfTableExport";
import NotFound from "./pages/NotFound";
import CodeVerification from "./pages/2FA";

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
        <AuthedRoute path="/" exact component={Home} />
        <AuthedRoute path="/profile" exact component={Profile} />
        <AuthedRoute path="/connections" exact component={Connections} />
        <AuthedRoute path="/routers" exact component={Router} />
        <AuthedRoute path="/routers/:id" exact component={RouterDetails} />
        <AuthedRoute path="/pdf/table" exact component={PdfTableExport} />
        <Route path="/login" exact component={Login} />
        <Route path="/login/code" exact component={CodeVerification} />
        <Route component={NotFound} />
    </Switch>
);

export default Routes;
