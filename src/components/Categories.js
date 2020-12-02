import React, {memo} from 'react'

const Categories = memo(({activeCategory, items, onClickCategory}) => {
	return (
		<div className="categories">
			{items &&
				<ul>
					<li
						className={activeCategory == null ? 'active' : ''}
						onClick={() => onClickCategory(null)}
					>
						Все
					</li>
					{
						items.map((item, index) => {
							return (
								<li
									key={index}
									onClick={() => onClickCategory(index)}
									className={activeCategory === index ? 'active' : ''}
								>
									{item}
								</li>
							)
						})
					}
				</ul>
			}
		</div>
	)
})

export default Categories
