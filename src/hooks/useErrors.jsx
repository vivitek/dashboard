import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import errors from '../errors'
import * as qs from "query-string"
import {UncontrolledAlert} from 'reactstrap'

const useError = () => {
    const location = useLocation()
    const [alerts, setAlerts] = useState([])
    useEffect(() => {
		const query = qs.parse(location.search)
		if (query["error"]) {
			setAlerts([
				<UncontrolledAlert key={query.error} color="danger">{errors[query["error"]]}</UncontrolledAlert>
			])
		}
    }, [location])
    return alerts
}

export default useError