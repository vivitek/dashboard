import React, { useState } from 'react'
import { Col } from 'reactstrap'
import RouterCard from './RouterCard'
import useError from '../../hooks/useErrors'

const Router = () => {
    const [routers, setRouters] = useState([{
        name: "test",
        id: "1"
    }])
    const errors = useError()
    return (
        <div>
            {errors}
            {routers.map((r) => (
                <Col xs="12" md="4" key={r._id}>
                    <RouterCard router={r} />
                </Col>
            ))}
        </div>
    )
}

export default Router