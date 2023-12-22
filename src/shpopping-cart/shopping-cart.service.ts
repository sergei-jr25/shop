import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BoilerParts } from 'src/boiler-parts/entites/boiler-parts.entites'
import { UserEntity } from 'src/users/entities/user.entity'
// import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { ShoppingCartDto } from './dto/CreateShopingCart.dto'
import { ShoppingCart } from './entities/shopping-cart.entities'

@Injectable()
export class ShoppingCartService {
	constructor(
		@InjectRepository(ShoppingCart)
		private readonly shoppingCartRepository: Repository<ShoppingCart>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,

		@InjectRepository(BoilerParts)
		private readonly boilerPartsRepository: Repository<BoilerParts> // private readonly userServer: UsersService, // private readonly boilerPartsService: BoilerPartsService
	) {}

	async findAll(userId: number) {
		return await this.shoppingCartRepository.find({ where: { userId } })
	}

	async create(dto: ShoppingCartDto) {
		const partId = await this.shoppingCartRepository.findOne({
			where: { partId: dto.partId }
		})
		console.log('partId', partId)

		if (partId && partId.partId === dto.partId) {
			return 'pfyz'
		} else {
			const cart = await this.shoppingCartRepository.create()

			const user = await this.userRepository.findOne({
				where: { username: dto.username }
			})

			const part = await this.boilerPartsRepository.findOneBy({
				id: dto.partId
			})

			cart.userId = user.id
			cart.partId = part.id
			cart.boilerManufacturer = part.boilerManufacturer
			cart.partsManufacturer = part.partsManufacturer
			cart.price = +part.price
			cart.inStock = part.inStock
			cart.image = part.images
			cart.totalPrice = +part.price
			cart.name = part.name

			await this.shoppingCartRepository.save(cart)

			return await cart
		}
	}

	async updateCount(partId: number, count: number) {
		const cart = await this.shoppingCartRepository.findOne({
			where: { partId }
		})
		console.log('cart.count', cart.count)
		console.log('count', count)

		cart.count = count
		await this.shoppingCartRepository.save(cart)
		return cart.count
	}

	async updateTotalPrice(totalPrice: number, partId: number) {
		// return await this.shoppingCartRepository.update({ totalPrice }, { partId })
		const cart = await this.shoppingCartRepository.findOneBy({ partId })

		cart.totalPrice = totalPrice
		console.log('totalPrice', totalPrice)
		await this.shoppingCartRepository.save(cart)
		return cart.totalPrice
	}

	async remove(partId: number) {
		return await this.shoppingCartRepository.delete({ partId })
	}
	async removeAll(userId: number) {
		return await this.shoppingCartRepository.delete({ userId })
	}
}
