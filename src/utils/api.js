import axios from 'axios'

import {STATUS_MESSAGES} from './constants'

const generateResult = (status, message, data) => {
	return {
		status,
		message,
		data
	}
}

const api = axios.create({
	baseURL: "http://localhost:5000"
})


const register = async(data) => {
	const res = await api.post("/auth/register", data)

	if (res.status < 400) {
		return generateResult(STATUS_MESSAGES.SUCCESS,  "account created", {...res.data})
	}
	return generateResult(STATUS_MESSAGES.ERROR, "something went wrong", {})
}

const login = async(data) => {
	const res = await api.post("/auth/login", data)

	if (res.status < 400) {
		return generateResult(STATUS_MESSAGES.SUCCESS, "signed in", {...res.data})
	}
	return generateResult(STATUS_MESSAGES.ERROR, "something went wrong", {})
}

export {register, login}