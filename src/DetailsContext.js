import React, {useState, createContext} from 'react'

export const DetailsContext = createContext()

export const DetailsProvider = (props) => {
    const [details, setDetails] = useState({})

    return (
        <DetailsContext.Provider value={[details, setDetails]}>
            {props.children}
        </DetailsContext.Provider>
    )
}
