const { Switch, Route } = require("react-router");
const { default: Boxes } = require("./pages/Boxes");
const { default: BoxDetails } = require("./pages/Boxes_Details");
const { default: Login } = require("./pages/Login");

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/box" exact component={Boxes} />
      <Route path="/box/:id" exact component={BoxDetails} />
    </Switch>
  );
};

export default Routes;
