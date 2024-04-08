import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ShoppingCartDto } from './dto/CreateShopingCart.dto'
import { ShoppingCartService } from './shopping-cart.service'

@Controller('shopping-cart')
export class ShoppingCartController {
	constructor(private readonly shoppingCartService: ShoppingCartService) {}

	@Get(':id')
	getAll(@Param('id') userId: string) {
		return this.shoppingCartService.findAll(+userId)
	}

	@Post('create')
	create(@Body() dto: ShoppingCartDto) {
		return this.shoppingCartService.create(dto)
	}
	@Put('count/:partId')
	updateCount(@Param('partId') partId: number, @Body() type: 'plus' | 'minus') {
		return this.shoppingCartService.updateCount(partId, type)
	}
	@Put('total-price/:id')
	updateTotalPrice(
		@Body() { totalPrice }: { totalPrice: number },
		@Param('partId') partId: number
	) {
		return this.shoppingCartService.updateTotalPrice(totalPrice, partId)
	}

	@Delete('remove/:partId')
	remove(@Param('partId') partId: number) {
		return this.shoppingCartService.remove(partId)
	}

	@Delete('remove-user-id/:id')
	removeAll(@Param('id') userId: number) {
		return this.shoppingCartService.removeAll(userId)
	}
}
