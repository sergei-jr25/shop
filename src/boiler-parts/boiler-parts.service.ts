import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, ILike, In, Repository } from 'typeorm'
import { createDtoBolier } from './dto/createDto'
import { BoilerParts } from './entites/boiler-parts.entites'
import { IAllQuery, IBoilerParts } from './type'

@Injectable()
export class BoilerPartsService {
	constructor(
		@InjectRepository(BoilerParts)
		private readonly boilerPartsRepository: Repository<BoilerParts>
	) {}

	async getAllQuery(query: IAllQuery) {
		const boiler = await this.boilerPartsRepository.find({
			where: {
				boilerManufacturer: In(JSON.parse(query.boilerManufacturer))
			}
		})

		return boiler
	}

	async paginateAndFilter(query: IBoilerParts) {
		const offset = +query.offset || 0
		const limit = +query.limit || 20
		const filters = {} as any
		const sorting = {} as any

		if (query.popular) {
			// sorting.({ createdAt: 'desc' })
		} else if (query.sort === 'low-price') {
			sorting.price = 'ASC'
		} else if (query.sort === 'height-price') {
			sorting.price = 'DESC'
		} else if (query.sort === 'popular') {
			sorting.popularity = 'DESC'
		}

		if (query.priceFrom && query.priceTo) {
			filters.price = Between(+query.priceFrom, +query.priceTo)
		}

		if (query.boilerManufacturer) {
			console.log('query.boilerManufacturer', query.boilerManufacturer)
			filters.boilerManufacturer = In(JSON.parse(query.boilerManufacturer))
		}

		if (query.partsManufacturer) {
			console.log('query.partsManufacturer', query.partsManufacturer)

			filters.partsManufacturer = In(JSON.parse(query.partsManufacturer))
		}

		const result = await this.boilerPartsRepository.findAndCount({
			where: filters,
			order: sorting,
			skip: offset,
			take: limit
		})

		return result
	}

	async bestsellers() {
		return await this.boilerPartsRepository.find({
			where: { bestsellers: true }
		})
	}
	async new() {
		return await this.boilerPartsRepository.find({
			where: { new: true }
		})
	}
	async getById(id: number) {
		return await this.boilerPartsRepository.findOne({
			where: { id }
		})
	}
	async getBySlug(name: string) {
		const product = await this.boilerPartsRepository.findOne({
			where: { name }
		})
		if (!product) {
			throw new NotFoundException('product not found')
		}

		return product
	}
	async findBySearchName(searchTerm?: string) {
		const part = await this.boilerPartsRepository.find({
			where: { name: ILike(`%${searchTerm}%`) }
		})

		return part
	}
	async findByName(name: string) {
		const part = await this.boilerPartsRepository.findOneBy({ name: name })

		return part
	}

	async createBoiler(dto: createDtoBolier) {
		const existBoilder = await this.boilerPartsRepository.findOne({
			where: { vendorCode: dto.vendorCode }
		})

		if (existBoilder) {
			throw new HttpException(
				'Товар с таким кодом уже существует',
				HttpStatus.BAD_REQUEST
			)
		}
		const boiler = await this.boilerPartsRepository.create(dto)

		boiler.bestsellers = dto.bestsellers
		boiler.boilerManufacturer = dto.boilerManufacturer
		boiler.compatibility = dto.compatibility
		boiler.description = dto.description
		boiler.images = dto.file
		boiler.inStock = dto.inStock
		boiler.name = dto.name
		boiler.new = dto.new
		boiler.partsManufacturer = dto.partsManufacturer
		boiler.popularity = dto.popularity
		boiler.price = dto.price
		boiler.vendorCode = dto.vendorCode

		this.boilerPartsRepository.save(boiler)

		return boiler
	}

	async editBoiler(partId: number, dto: createDtoBolier) {
		const boiler = await this.boilerPartsRepository.findOneBy({
			id: partId
		})

		boiler.bestsellers = dto.bestsellers
		boiler.boilerManufacturer = dto.boilerManufacturer
		boiler.compatibility = dto.compatibility
		boiler.description = dto.description
		boiler.images = dto.file
		boiler.inStock = dto.inStock
		boiler.name = dto.name
		boiler.new = dto.new
		boiler.partsManufacturer = dto.partsManufacturer
		boiler.popularity = dto.popularity
		boiler.price = dto.price
		boiler.vendorCode = dto.vendorCode

		this.boilerPartsRepository.save(boiler)

		return boiler
	}

	async remove(id: number) {
		const boiler = await this.boilerPartsRepository.delete({
			id
		})

		return boiler
	}
}
