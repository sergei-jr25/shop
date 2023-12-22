import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}
	async update(id: number, dto: CreateUserDto) {
		const user = await this.userRepository.findOneBy({ id })

		if (!user) throw new NotFoundException('User не найден')

		const isSameUser = await this.userRepository.findOne({
			where: { email: dto.email, username: dto.username }
		})

		if (isSameUser && isSameUser.id !== id) {
			throw new BadRequestException('Email занят')
		}

		const salt = await bcrypt.getSalt(10)
		const password = await bcrypt.hash(dto.password, salt)

		user.email = dto.email
		user.password = password
		user.username = dto.username

		return await this.userRepository.save(user)
	}

	findAll() {
		return this.userRepository.find()
	}

	findOne(data: { id?: number; email?: string; username?: string }) {
		return this.userRepository.findOne({
			where: {
				id: data.id,
				email: data.email,
				username: data.username
			}
		})
	}
}
