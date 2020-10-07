import axios from 'axios'
import {STATUS_MESSAGES, BASE_URL} from './constants'

const generateResult = (status, message, data) => {
	return {
		status,
		message,
		data
	}
}

const api = axios.create({
	baseURL: BASE_URL
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

const updateUser = async(data, id) => {
	const res = await api.patch(`/users/${id}`, data, {
		headers: {
			authorization: `Bearer ${localStorage.getItem("vivi-jwt")}`
		}
	})
	if (res.status < 400) {
		return generateResult(STATUS_MESSAGES.SUCCESS, "user updated", {...res.data})
	}
	return generateResult(STATUS_MESSAGES.ERROR, "something went wrong", {})
}

const getOldConnections = async(routerId) => {
	const res = await api.get(`/connections/${routerId}`, {
		headers: {
			authorization: `Bearer ${localStorage.getItem("vivi-jwt")}`
		}
	})
	if (res.status < 400) {
		return generateResult(STATUS_MESSAGES.SUCCESS, "received old routers", res.data)
	}
	return generateResult(STATUS_MESSAGES.ERROR, "something went wrong", {})

}

const listenToConnections = (routerId) => {
	return `${BASE_URL}/connections/listen/${routerId}`
}

const getRouters = async() => {
	const res = await api.get(`/routers`, {
		headers: {
			authorization: `Bearer ${localStorage.getItem("vivi-jwt")}`
		}
	})
	if (res.status < 400) {
		return generateResult(STATUS_MESSAGES.SUCCESS, "received routers", res.data)
	}
	return generateResult(STATUS_MESSAGES.ERROR, "could not retrieve routers", {})
}

export {register, login, updateUser, getOldConnections, listenToConnections, getRouters}