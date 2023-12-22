import { Base } from 'src/base/base'
import { Column, Entity } from 'typeorm'

@Entity()
export class ShoppingCart extends Base {
	@Column({ name: 'user_id', default: 0 })
	userId: number
	@Column({ name: 'part_id', default: 0 })
	partId: number
	@Column({ name: 'boiler_manufacturer', default: '' })
	boilerManufacturer: string
	@Column({ default: 0 })
	price: number
	@Column({ name: 'parts_manufacturer', default: '' })
	partsManufacturer: string

	@Column({ default: '' })
	name: string

	@Column({ default: 0, name: 'in_stock' })
	inStock: number

	@Column({ default: '' })
	image: string

	@Column({ default: 1 })
	count: number
	@Column({ default: 0, name: 'total_price' })
	totalPrice: number
}
