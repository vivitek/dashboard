import React, { useContext } from 'react'
import { Card, CardBody, Button, Col } from 'reactstrap'
import {RouterContext} from "../../contexts/RouterContext"
import Swal from 'sweetalert2'

const RouterCard = ({router}) => {
    const routerContext = useContext(RouterContext)
    return (
        <Card>
            <CardBody>
                <Col md="12" align="center">
                    <img alt="Router Icon" src="https://img.icons8.com/wired/64/000000/router.png"/>
                </Col>
                <Col md="12" align="center" className="mt-3">
                    <span className="text-white h3">
                        {router.name}
                    </span>
                </Col>
                <Col md="12" align="center" className="mt-3">
                    <Button onClick={() => {
                        Swal.fire("Coming Soon!", "This feature hasn't been implemented yet", "error")
                    }}>Learn More</Button>
                </Col>
                <Col md="12" align="center" className="mt-3">
                    <Button color="success" onClick={() => {
                        routerContext.changeRouter(router)
                        Swal.fire("Done!", "Router changed successfully", "success")
                    }}>Set as Active</Button>
       
                </Col>
            </CardBody>
        </Card>
    )
}

export default RouterCard