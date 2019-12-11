import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import RouterDetails from './pages/RouterDetails'
import Register from './pages/Register'


const AuthedRoute = ({exact, path, component}) => {
	if (!localStorage.getItem("jwt"))
		return (<Redirect to="/login" />)
	return (<Route path={path} exact={exact} component={component} />)
}

const Router = (props) => {
	return (
		<Switch>
			<AuthedRoute exact path="/" component={Home} />
			<AuthedRoute exact path="/router/:id" component={RouterDetails} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
		</Switch>
	)
}

export default Router