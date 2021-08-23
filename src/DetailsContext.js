import React, {useState, createContext} from 'react'

export const DetailsContext = createContext()

export const DetailsProvider = (props) => {
    const [polygon1, setPolygon1] = useState(null)

    return (
        <DetailsContext.Provider value={[polygon1, setPolygon1]}>
            {props.children}
        </DetailsContext.Provider>
    )
}
