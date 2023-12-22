import { Base } from 'src/base/base'
import { Column, Entity } from 'typeorm'

@Entity()
export class BoilerParts extends Base {
	@Column({ name: 'boiler_manufacturer' })
	boilerManufacturer: string
	@Column({ default: 0 })
	price: number
	@Column({ name: 'parts_manufacturer', default: '' })
	partsManufacturer: string
	@Column({ name: 'vendor_code', default: '' })
	vendorCode: string
	@Column({ default: '' })
	name: string
	@Column({ default: '', type: 'text' })
	description: string

	@Column({ default: false })
	bestsellers: boolean
	@Column({ default: false })
	new: boolean
	@Column({ default: 0, name: 'in_stock' })
	inStock: number
	@Column()
	popularity: number
	@Column({ default: '' })
	compatibility: string

	// @OneToMany(() => ImageEntity, img => img.image)
	@Column({ default: '' })
	images: string
}
