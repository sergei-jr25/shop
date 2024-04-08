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
		return await this.shoppingCartRepository.find({
			where: { userId },
			order: {
				id: 'ASC'
			}
		})
	}

	async create(dto: ShoppingCartDto) {
		const cart = this.shoppingCartRepository.create()

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

		return cart
	}

	async updateCount(partId: number, type: any) {
		const cart = await this.shoppingCartRepository.findOne({
			where: { partId }
		})

		if (cart) {
			if (type.type === 'plus') {
				console.log('count', cart.count)
				cart.count++
			} else if (type.type === 'minus') {
				if (cart.count > 1) {
					cart.count--
				} else return 'dont works'
			}

			cart.totalPrice = cart.price * cart.count

			// Сохраняем обновленную запись корзины
			await this.shoppingCartRepository.save(cart)

			// Возвращаем новое значение count
			return cart.count
		} else {
			// Если запись корзины не была найдена, можно вернуть null или бросить ошибку
			return null
		}
	}

	async updateTotalPrice(totalPrice: number, partId: number) {
		const cart = await this.shoppingCartRepository.findOneBy({ partId })

		if (cart) {
			cart.totalPrice = totalPrice

			await this.shoppingCartRepository.save(cart)
			return cart.totalPrice
		} else null
	}

	async remove(partId: number) {
		return await this.shoppingCartRepository.delete({ partId })
	}
	async removeAll(userId: number) {
		return await this.shoppingCartRepository.delete({ userId })
	}
}
