import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Context } from '../Context';
import useHover from '../hooks/useHover';

function Image({className, photo}) {
    const { toggleFavorite, cartItems, addToCart, removeFromCart } = useContext(Context);
    const {hovered, ref} = useHover();

    function heartIcon() {
        if (photo.isFavorite) {
            return <i onClick={() => toggleFavorite(photo.id)} className="ri-heart-fill favorite"></i> 
        } else if (hovered) {
            return <i onClick={() => toggleFavorite(photo.id)} className="ri-heart-line favorite"></i>
        }
    }

    function cartIcon() {
        const alreadyInCart = cartItems.some(cartItem => cartItem.id === photo.id);
        if (alreadyInCart) {
            return <i onClick={() => removeFromCart(photo.id)} className="ri-shopping-cart-fill cart"></i>
        }
        else if (hovered) {
            return <i onClick={() => addToCart(photo)} className="ri-add-circle-line cart"></i>
        }
    }

    return (
        <div 
            ref={ref}
            className={`${className} image-container`}
        >
            {heartIcon()}
            {cartIcon()}
            <img src={photo.url} className="image-grid" />
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool,
    }),
}

export default Image;