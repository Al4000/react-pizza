import axios from 'axios'

export const setLoaded = (loading) => ({
	type: 'SET_LOADED',
	payload: loading
})

export const fetchPizzas = (sortBy, category) => (dispatch) => {
	dispatch(setLoaded(false))
	axios.get(`/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
		.then(response => dispatch(setPizzasAction(response.data)))
}

export const setPizzasAction = (pizzas) => ({
	type: 'SET_PIZZAS',
	payload: pizzas
})
