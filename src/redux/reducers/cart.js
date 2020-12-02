const initialState = {
	pizzas: {},
	totalPrice: 0,
	totalCount: 0
}

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0)

const cart = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_PIZZA': {
			const currentPizzaItems = !state.pizzas[action.payload.id]
				? [action.payload]
				: [...state.pizzas[action.payload.id].pizzas, action.payload]

			const newPizzas = {
				...state.pizzas,
				[action.payload.id]: {
					pizzas: currentPizzaItems,
					subtotal: currentPizzaItems.reduce((sum, obj) => obj.price + sum, 0)
				}
			}

			const totalCount =
				Object.keys(newPizzas).reduce((sum, key) => newPizzas[key].pizzas.length + sum, 0)
			const totalPrice =
				Object.keys(newPizzas).reduce((sum, key) => newPizzas[key].subtotal + sum, 0)

			return {
				...state,
				pizzas: newPizzas,
				totalCount,
				totalPrice
			}
		}

		case 'DECREASE_PIZZA': {
			const currentPizzaItems = state.pizzas[action.payload].pizzas
			const newPizzaItems = currentPizzaItems.length > 1 ? state.pizzas[action.payload].pizzas.slice(0, -1) : currentPizzaItems

			const newPizzas = {
				...state.pizzas,
				[action.payload]: {
					pizzas: newPizzaItems,
					subtotal: getTotalPrice(newPizzaItems)
				}
			}

			const currentTotalPrice = newPizzas[action.payload].pizzas[0].price

			return {
				...state,
				pizzas: newPizzas,
				totalCount: state.totalCount - 1,
				totalPrice: state.totalPrice - currentTotalPrice
			}
		}

		case 'REMOVE_PIZZA': {
			const newPizzas = {
				...state.pizzas
			}

			const currentTotalPrice = newPizzas[action.payload].subtotal
			const currentTotalCount = newPizzas[action.payload].pizzas.length

			delete newPizzas[action.payload]


			return {
				...state,
				pizzas: newPizzas,
				totalCount: state.totalCount - currentTotalCount,
				totalPrice: state.totalPrice - currentTotalPrice
			}
		}

		case 'CLEAR_CART': {
			state = initialState
			return state
		}

		default: return state
	}
}

export default cart