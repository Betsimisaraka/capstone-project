import React, { useContext } from 'react';
import { Context } from '../Context';
import CartItem from '../components/CartItem';

function Cart() {
	const { cartItems, ordering, isOrder } = useContext(Context);
	const cartItemElements = cartItems.map(item => (
		<CartItem key={item.id} item={item} />
	))
	const totalCost = cartItems.length * 5.99;
	const totalCostDisplay = totalCost.toLocaleString("en-US", { style: "currency", currency: "USD" })

	return (
		<main className="cart-page">
			<h1>Check out</h1>
			{cartItemElements}
			<p className="total-cost">Total: {totalCostDisplay}</p>
			<div className="order-button">
				<button onClick={ordering}>{isOrder ? "Ordering..." : "Place order"}</button>
			</div>
		</main>
	);
}

export default Cart;
