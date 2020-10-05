import React, { useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import RouterCard from './RouterCard'
import useError from '../../hooks/useErrors'
import { motion } from "framer-motion"
import { ANIMATION_VARIANTS } from '../../utils/constants'
import { Formik } from 'formik'
import * as Yop from "yup"
import FormGroupInput from '../../components/FormGroupInput'

const RouterSchema = Yop.object().shape({
    name: Yop.string().required("Name is required")
})

const Router = () => {
    const [routers, setRouters] = useState([
        {
            name: "test",
            id: "1"
        }, {
            name: "test2",
            id: "2"
        },
        {
            name: "test3",
            id: "3"
        }, {
            name: "test4",
            id: "4"
        }
    ])

    const [modal, setModal] = useState(false)

    const errors = useError()
    return (
        <React.Fragment>
            {errors}
            <Modal toggle={() => { setModal(!modal) }} isOpen={modal} >
                <ModalHeader toggle={() => setModal(!modal)} style={{backgroundColor:"var(--dark)"}}>
                    <h5 className="modal-title" style={{color:"var(--light)"}}>Add Router</h5>
                </ModalHeader>
                <Formik
                initialValues={{
                    name: ""
                }}
                    onSubmit={(values) => {
                        setRouters([...routers, {name: values.name, id: routers.length + 1}])
                        setModal(!modal)
                        
                    }}
                    validationSchema={RouterSchema}
                >
                    {({ values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit, }) => (
                            <React.Fragment>
                                <ModalBody style={{backgroundColor:"var(--dark)"}}>
                                    <FormGroupInput name="name" value={values.name} label="Router name" touched={touched.name} error={errors.name} handleChange={handleChange} />
                                </ModalBody>
                                <ModalFooter style={{backgroundColor:"var(--dark)"}}>
                                    <Button color="danger" onClick={() => { setModal(!modal) }}>Close</Button>
                                    <Button type="submit" onClick={handleSubmit} color="primary">Create</Button>
                                </ModalFooter>
                            </React.Fragment>
                        )}
                </Formik>
            </Modal>
            <Row className="mt-2 mb-2">
                <Col align="right">
                    <Button onClick={() => setModal(!modal)}>Add Router</Button>
                </Col>
            </Row>
            <Row>
                {routers.map((r) => (
                    <Col xs="12" md="3" sm="12" key={r._id}>
                        <motion.div initial="hidden" animate="visible" variants={ANIMATION_VARIANTS} whileHover={{ scale: 1.1 }} >
                            <RouterCard router={r} />
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    )
}

export default Router