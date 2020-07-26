import React, { createContext, useState, useEffect } from 'react'


const UserContext = createContext({
	user: {},
	updateUser: () => {}
})

const UserProvider = ({children}) => {
	const [user, setUser] = useState({})

	useEffect(() => {
		const u = localStorage.getItem("vivi-user")
		if (u) {
			setUser(JSON.parse(u))
		}
	}, [])
	return (
		<UserContext.Provider value={{user, changeUser: (u) => setUser(u)}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
export {UserContext}