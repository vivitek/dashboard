import { Switch, Route } from "react-router";
import Boxes from "./pages/Boxes";
import BoxDetails from "./pages/Boxes_Details";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Config from "./pages/Config";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Home} />
      <Route path="/box" exact component={Boxes} />
      <Route path="/box/:id" exact component={BoxDetails} />
      <Route path="/settings" exact component={Profile} />
      <Route path="/config" exact component={Config}/>
    </Switch>
  );
};

export default Routes;
