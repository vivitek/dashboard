import React, { useEffect, useState } from "react";
import Nav from "reactstrap/lib/Nav";
import Navbar from "reactstrap/lib/Navbar";
import NavbarBrand from "reactstrap/lib/NavbarBrand";
import NavbarToggler from "reactstrap/lib/NavbarToggler";
import Collapse from "reactstrap/lib/Collapse";
import NavItem from "reactstrap/lib/NavItem";
import NavLink from "reactstrap/lib/NavLink";
import { Link, useLocation, useHistory } from "react-router-dom";
import Breadcrumb from "reactstrap/lib/Breadcrumb";
import BreadcrumbItem from "reactstrap/lib/BreadcrumbItem";
import Container from "reactstrap/lib/Container";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { BeamsContext } from "../contexts/BeamsContext";
import { TokenProvider } from "@pusher/push-notifications-web";
import { BASE_URL } from "../utils/constants";
import Swal from "sweetalert2";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const toggle = () => setIsOpen(!isOpen);
    const beamsContext = useContext(BeamsContext);
    const userContext = useContext(UserContext);

    useEffect(() => {
        const setupNotifications = async () => {
            try {
                await beamsContext.client.start();
                const userId = await beamsContext.client.getUserId();

                console.log("Notifications are enabled");
                if (!userId) {
                    const { _id } = userContext.user;
                    const tokenProvider = new TokenProvider({
                        url: `${BASE_URL}/beams/token`,
                        queryParams: { userId: `${_id}` },
                    });
                    await beamsContext.client.setUserId(_id, tokenProvider);
                }
            } catch (error) {
                Swal.fire(
                    "Oops!",
                    "Seems like this browser does not support push notifications. Please change or update your browser to enable all the platform's features",
                    "error"
                );
                console.log(`Error with Push Notifications: ${error}`);
            }
        };
        if (userContext.user?._id) {
            setupNotifications();
        }
    }, [userContext.user, beamsContext.client]);
    return (
        <div>
            <Navbar dark expand="md">
                <NavbarBrand tag={Link} to="/">
                    Vivi
                </NavbarBrand>
                {userContext.authed && (
                    <>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/routers">
                                        Routers
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <Nav navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/profile">
                                        Settings
                                    </NavLink>
                                </NavItem>
                                <NavItem
                                    onClick={() => {
                                        localStorage.removeItem("vivi-user");
                                        localStorage.removeItem("vivi-jwt");
                                        userContext.updateUser(null);
                                        beamsContext.client.stop();
                                        userContext.updateAuthed(false);
                                        history.push("/login");
                                    }}
                                >
                                    <NavLink>Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </>
                )}
            </Navbar>
            <Container fluid>
                <Breadcrumb>
                    {location.pathname.split("/").map((e, index) => (
                        <BreadcrumbItem
                            key={index}
                            active={
                                index ===
                                location.pathname.split("/").length - 1
                            }
                        >
                            {e}
                        </BreadcrumbItem>
                    ))}
                </Breadcrumb>
            </Container>
        </div>
    );
};

export default Header;
