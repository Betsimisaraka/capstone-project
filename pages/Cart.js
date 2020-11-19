import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import CartItem from '../components/CartItem';

function Cart() {
	const [orderBtnText, setOrderBtnText] = useState('Place Order');
	const { cartItems, emptyCart } = useContext(Context);
	const cartItemElements = cartItems.map(item => (
		<CartItem key={item.id} item={item} />
	))
	const totalCost = cartItems.length * 5.99;
	const totalCostDisplay = totalCost.toLocaleString("en-US", { style: "currency", currency: "USD" })

	function placeOrder() {
		//change the text
		setOrderBtnText("Ordering...")
		setTimeout(() => {
			console.log("Order Placed!");
			emptyCart();
			setOrderBtnText('Place Order')
		}, 3000)
	}

	return (
		<main className="cart-page">
			<h1>Check out</h1>
			{cartItemElements}
			<p className="total-cost">Total: {totalCostDisplay}</p>
			<div className="order-button">
				{cartItems.length > 0
					? <button onClick={placeOrder}>{orderBtnText}</button>
					: <p>You have no items in the cart</p>
				}
			</div>
		</main>
	);
}

export default Cart;
