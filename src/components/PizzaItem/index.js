import React, {useState} from 'react'

const PizzaItem = ({pizza, onAddToCart, addedCounter}) => {
	const {id, imageUrl, name, price, types, sizes} = pizza

	const typesNames = ['тонкое', 'традиционное']
	const sizesArray = [26, 30, 40]

	const handleSetType = (index) => {
		setActiveType(index)
	}

	const handleSetSize = (index) => {
		setActiveSize(index)
	}

	const onAddPizza = () => {
		const obj = {
			id,
			name,
			imageUrl,
			price,
			size: sizesArray[activeSize],
			type: typesNames[activeType]
		}
		onAddToCart(obj)
	}

	const [activeSize, setActiveSize] = useState(0)
	const [activeType, setActiveType] = useState(types[0])

	return (
		<div className="pizza-block">
			<img
				className="pizza-block__image"
				src={imageUrl}
				alt="Pizza"
			/>
			<h4 className="pizza-block__title">{name}</h4>
			<div className="pizza-block__selector">
				<ul>
					{typesNames.map((type, index) => {
						return (
							<li
								key={index}
								className={activeType === index ? 'active' : !types.includes(index) ? 'disabled' : ''}
								onClick={() => handleSetType(index)}
							>
								{type}
							</li>
						)
					})}
				</ul>
				<ul>
					{sizesArray.map((size, index) => {
						return (
							<li
								key={index}
								className={activeSize === index ? 'active' : !sizes.includes(size) ? 'disabled' : ''}
								onClick={() => handleSetSize(index)}
							>
								{size} см.
							</li>
						)
					})}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">от {price} ₽</div>
				<div
					className="button button--outline button--add"
					onClick={onAddPizza}
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					{addedCounter && <i>{addedCounter}</i>}
				</div>
			</div>
		</div>
	)
}

export default PizzaItem
