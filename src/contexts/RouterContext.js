import React, { createContext, useState, useEffect } from 'react'


const RouterContext = createContext({
	user: {},
	updateUser: () => {}
})

const RouterProvider = ({children}) => {
	const [router, setRouter] = useState({})

	useEffect(() => {
		// update router dependencies
	}, [router])
	return (
		<RouterContext.Provider value={{router, changeRouter: (u) => setRouter(u)}}>
			{children}
		</RouterContext.Provider>
	)
}

export default RouterProvider
export {RouterContext}