import { Switch, Route } from "react-router";
import Boxes from "./pages/Boxes";
import BoxDetails from "./pages/Boxes_Details";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/box" exact component={Boxes} />
      <Route path="/box/:id" exact component={BoxDetails} />
    </Switch>
  );
};

export default Routes;
