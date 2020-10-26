import React, { createContext } from 'react'
import { Client } from "@pusher/push-notifications-web"


const BeamsContext = createContext({
    client: new Client({
        instanceId: '6427b78a-033d-4139-aa97-2b91448d0cad'
    }),
})

const BeamsProvider = ({ children }) => {

    const client = new Client({
        instanceId: '6427b78a-033d-4139-aa97-2b91448d0cad'
    })

    return (
        <BeamsContext.Provider value={{ client }}>
            {children}
        </BeamsContext.Provider>
    )
}

export default BeamsProvider
export { BeamsContext }