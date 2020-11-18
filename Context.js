import React, { useEffect, useState } from 'react';

const Context = React.createContext();

const URL = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json";

function ContextProvider({ children }) {
    const [allPhotos, setAllPhotos] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isOrder, setIsOrder] = useState(false);

    async function getPhotos() {
        const res = await fetch(URL);
        const data = await res.json();
        setAllPhotos(data);
    }

    useEffect(() => {
        getPhotos();
    }, [])

    function toggleFavorite(id) {
        const newPhotosArray = allPhotos.map(photo => {
            //if it is the one, let's return an update object.
            if (photo.id === id) {
                //update this element
                return {
                    ...photo,
                    isFavorite: !photo.isFavorite,
                }
            }
            //it's not the one I'm looking for, therefore, I will not change it.
            return photo;
        });
        setAllPhotos(newPhotosArray);
    }

    function addToCart(newItem) {
        setCartItems(prevItem => [...prevItem, newItem]);
    }

    function removeFromCart(imgId) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== imgId))
        // const remove = cartItems.filter(cart => cart.id !== idToRemove);
        // setCartItems(remove);
    }

    function ordering() {
        setTimeout(() => {
            setIsOrder(true);
        }, 3000)
    }

    return (
        <Context.Provider value={{ allPhotos, toggleFavorite, cartItems, addToCart, removeFromCart, ordering, isOrder }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context };