export const addPizzaToCartAction = (pizzaItem) => ({
	type: 'ADD_PIZZA',
	payload: pizzaItem
})

export const clearCartAction = () => ({
	type: 'CLEAR_CART'
})

export const decreasePizzaInCartAction = (id) => ({
	type: 'DECREASE_PIZZA',
	payload: id
})

export const removePizzaInCartAction = (id) => ({
	type: 'REMOVE_PIZZA',
	payload: id
})
