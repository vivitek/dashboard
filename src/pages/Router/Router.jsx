import React, { useState } from 'react'
import { Col } from 'reactstrap'
import RouterCard from './RouterCard'

const Router = () => {
    const [routers, setRouters] = useState([{
        name:"test",
        id:"645645"
    }])
    return (
        <div>
            {routers.map((r) => (
                <Col xs="12" md="4" key={r._id}>
                    <RouterCard router={r}/>
                </Col>
            ))}
        </div>
    )
}

export default Router