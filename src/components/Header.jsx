import React, { useState } from 'react'
import Nav from 'reactstrap/lib/Nav'
import Navbar from 'reactstrap/lib/Navbar'
import NavbarBrand from 'reactstrap/lib/NavbarBrand'
import NavbarToggler from 'reactstrap/lib/NavbarToggler'
import Collapse from 'reactstrap/lib/Collapse'
import NavItem from 'reactstrap/lib/NavItem'
import NavLink from 'reactstrap/lib/NavLink'
import { Link, useLocation } from 'react-router-dom'
import Breadcrumb from 'reactstrap/lib/Breadcrumb'
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem'
import Container from 'reactstrap/lib/Container'
import Gravatar from 'react-gravatar'
import { UserContext } from '../contexts/UserContext'


const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const location = useLocation()
	const toggle = () => setIsOpen(!isOpen)
	return (
		<div>
			<Navbar dark expand="md">
				<NavbarBrand tag={Link} to="/">Vivi</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink tag={Link} to="/connections">Connections</NavLink>
						</NavItem>
					</Nav>
					{localStorage.getItem("vivi-jwt") &&
					<UserContext.Consumer>
						{(context) => (
						<Nav navbar>
							<NavItem>
								<NavLink tag={Link} to="/profile"><Gravatar style={{borderRadius:"100%"}} email={context.user.email} /></NavLink>
							</NavItem>
						</Nav>)}
					</UserContext.Consumer>}
				</Collapse>
			</Navbar>
			<Container fluid>
			<Breadcrumb>
				{location.pathname.split("/").map((e, index) => (
					<BreadcrumbItem key={e} active={index === location.pathname.split("/").length - 1}>{e}</BreadcrumbItem>
				))}
			</Breadcrumb>
			</Container>
		</div>
	)
}

export default Header