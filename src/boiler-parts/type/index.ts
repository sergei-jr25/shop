export interface IBoilerParts {
	limit: string
	offset: string | number
	boilerManufacturer: string
	partsManufacturer: string
	priceTo: string | undefined
	priceFrom: string | undefined
	description: string | undefined
	id: string | number
	name: string | undefined
	sort: sortEnum
	popular: string | undefined | number
	bestsellers: boolean
}
export interface IBoilerPartsFilter {
	boilerManufacturer: string
	partsManufacturer: string | undefined
	id: string | undefined
	// price: { [Op.between]: number[] }
	description: string | undefined
	name: string | undefined
}
export interface IAllQuery {
	boilerManufacturer: any
}

enum sortEnum {
	LOW_PRICE = 'low-price',
	HIGH_PRICE = 'height-price',
	POPULAR = 'popular'
}
