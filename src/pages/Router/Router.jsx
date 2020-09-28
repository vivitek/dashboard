import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import RouterCard from './RouterCard'
import useError from '../../hooks/useErrors'
import { motion } from "framer-motion"
import { ANIMATION_VARIANTS } from '../../utils/constants'



const Router = () => {
    const [routers, setRouters] = useState([
    {
        name: "test",
        id: "1"
    }, {
        name:"test2",
        id: "2"
    },
    {
        name: "test3",
        id: "3"
    }, {
        name:"test4",
        id: "4"
    }
    ])
    const errors = useError()
    return (
        <React.Fragment>
            {errors}
            <Row>
                {routers.map((r) => (
                    <Col xs="12" md="3" sm="12" key={r._id}>
                        <motion.div initial="hidden" animate="visible" variants={ANIMATION_VARIANTS} whileHover={{scale: 1.1}}>
                            <RouterCard router={r} />
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    )
}

export default Router