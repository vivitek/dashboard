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
import Gravatar from "react-gravatar";
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
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {localStorage.getItem("vivi-jwt") && (
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/routers">
                                    Routers
                                </NavLink>
                            </NavItem>
                        </Nav>
                    )}
                    {userContext?.user?._id && (
                        <Nav navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/profile">
                                    <Gravatar
                                        style={{ borderRadius: "100%" }}
                                        default="monsterid"
                                        email={userContext.user.email}
                                    />
                                </NavLink>
                            </NavItem>
                            <NavItem
                                onClick={() => {
                                    localStorage.removeItem("vivi-user");
                                    localStorage.removeItem("vivi-jwt");
                                    userContext.changeUser(null);
                                    beamsContext.client.stop();
                                    history.push("/login");
                                }}
                            >
                                <NavLink>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    )}
                </Collapse>
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
