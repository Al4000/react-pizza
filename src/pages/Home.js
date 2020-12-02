import React, {useCallback, useEffect} from 'react'
import {Categories, PizzaItem, SortPopup, PizzaPlaceholder} from '../components'
import {useDispatch, useSelector} from 'react-redux'
import {setCategory, setSortBy} from '../redux/actions/filters'
import {fetchPizzas} from '../redux/actions/pizzas'
import {addPizzaToCartAction} from '../redux/actions/cart'

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const sortItems = [
	{name: 'популярности', type: 'popular', order: 'desc'},
	{name: 'цене', type: 'price', order: 'desc'},
	{name: 'алфавиту', type: 'name', order: 'asc'}
]

const Home = () => {
	const pizzas = useSelector(({pizzas}) => pizzas.pizzas)
	const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded)
	const {category, sortBy} = useSelector(({filters}) => filters)
	const cartItems = useSelector(({cart}) => cart.pizzas)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchPizzas(sortBy, category))
	}, [dispatch, category, sortBy])

	const onSelectCategory = useCallback(index => {
		dispatch(setCategory(index))
	}, [dispatch])

	const onSelectSort = useCallback(name => {
		dispatch(setSortBy(name))
	}, [dispatch])

	const addPizzaToCart = obj => {
		dispatch(addPizzaToCartAction(obj))
	}

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					activeCategory={category}
					items={categoryNames}
					onClickCategory={onSelectCategory}
				/>
				<SortPopup
					sortItems={sortItems}
					onClickSort={onSelectSort}
					activeSort={sortBy.type}
				/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{	isLoaded
					? pizzas.map(pizza => (
						<PizzaItem
							pizza={pizza}
							key={pizza.id}
							onAddToCart={addPizzaToCart}
							addedCounter={cartItems[pizza.id] && cartItems[pizza.id].pizzas.length}
						/>
					))
					: Array(12).fill(0).map((_,index) => (<PizzaPlaceholder key={index} />))
				}
			</div>
		</div>
	)
}

export default Home
