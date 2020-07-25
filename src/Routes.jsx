import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'

const AuthedRoute = ({path, exact, component}) => {
	return (localStorage.getItem("vivi-jwt") ? <Route path={path} exact={exact} component={component}/> : <Redirect to="/login?error=authentication" />)
}

const Routes = () => (
	<Switch>
		<AuthedRoute path="/" exact component={Home} />
		<Route path="/register" exact component={Register} />
		<Route path="/login" exact component={Login} />
	</Switch>
)

export default Routes