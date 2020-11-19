import React, { useEffect, useState } from 'react';

const Context = React.createContext();

const URL = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json";

function ContextProvider({ children }) {
    const [allPhotos, setAllPhotos] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    async function getPhotos(url) {
        //is there something with the string 'allPhotos' inside localStorage
        const lsAllPhotos = JSON.parse(localStorage.getItem('allPhotos'));
        if (lsAllPhotos) {
            console.log({ lsAllPhotos });
            setAllPhotos(lsAllPhotos);
        } else {
            console.log("Nothing in the local");
            const res = await fetch(url);
            const data = await res.json();
            setAllPhotos(data);
        }
    }

    useEffect(() => {
        getPhotos(URL);
        initCartItems();
    }, [])

    function initCartItems() {
        const lsCartItems = JSON.parse(localStorage.getItem('cartItems'))
        if (lsCartItems) {
            setCartItems(lsCartItems);
        }
    }

    useEffect(() => {
        if (allPhotos.length > 0) {
            localStorage.setItem('allPhotos', JSON.stringify(allPhotos));
        }
    }, [allPhotos])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])



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

    function emptyCart() {
        setCartItems([]);
    }

    return (
        <Context.Provider value={{ allPhotos, toggleFavorite, cartItems, addToCart, removeFromCart, emptyCart }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context };