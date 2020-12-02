const initialState = {
	pizzas: [],
	isLoaded: false
}

const pizzas = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_PIZZAS':
			return {
				...state,
				pizzas: action.payload,
				isLoaded: true
			}
		case 'SET_LOADED':
			return {
				...state,
				isLoaded: action.payload
			}

		default: return state
	}
}

export default pizzas
