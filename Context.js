import React, { useEffect, useState } from 'react';

const Context = React.createContext();

const URL = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json";

function ContextProvider({ children }) {
    const [allPhotos, setAllPhotos] = useState([]);

    async function getPhotos() {
        const res = await fetch(URL);
        const data = await res.json();
        setAllPhotos(data);
    }

    useEffect(() => {
        getPhotos();
    }, [])

    return (
        <Context.Provider value={{ allPhotos }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context };