import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class createDtoBolier {
	@IsString()
	boilerManufacturer: string
	@IsString()
	partsManufacturer: string
	@IsNumber()
	price: number
	@IsString()
	vendorCode: string
	@IsString()
	name: string
	@IsString()
	description: string

	@IsBoolean()
	bestsellers: boolean
	@IsBoolean()
	new: boolean
	@IsNumber()
	inStock: number
	@IsNumber()
	popularity: number
	@IsString()
	compatibility: string
	@IsString()
	file: string
}
// Express.Multer.File[]
// export class createDtoParts {
// 	price: number
// 	partsManufacturer: string
// 	vendorCode: string
// 	name: string
// 	description: string

// 	bestsellers: boolean
// 	new: boolean
// 	inStock: number
// 	popularity: number
// 	compatibility: string

// 	images: string
// }
