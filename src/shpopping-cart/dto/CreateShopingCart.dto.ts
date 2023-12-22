import { IsNotEmpty } from 'class-validator'

export class ShoppingCartDto {
	@IsNotEmpty()
	userId?: number
	@IsNotEmpty()
	readonly partId: number
	@IsNotEmpty()
	readonly username: string
}
