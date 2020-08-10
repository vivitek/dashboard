import React from 'react'
import { Card, CardBody, Button, Col } from 'reactstrap'
import {RouterContext} from "../../contexts/RouterContext"
import Swal from 'sweetalert2'

const RouterCard = ({router}) => {
    return (
        <Card>
            <CardBody>
                <Col md="12" align="center">
                    <img src="https://img.icons8.com/wired/64/000000/router.png"/>
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
                    <RouterContext.Consumer>
                    {(context) => (
                        <Button color="success" onClick={() => {
                            context.changeRouter(router)
                            Swal.fire("Done!", "Router changed successfully", "success")
                        }}>Set as Active</Button>
                    )}
                    </RouterContext.Consumer>
                </Col>
            </CardBody>
        </Card>
    )
}

export default RouterCard