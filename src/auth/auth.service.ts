import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { UserEntity } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateAuthDto } from './dto/create-auth.dto'
import { RefreshTokenDto } from './dto/refreseshToken'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: CreateAuthDto) {
		const user = await this.validateUser(dto)

		const tokens = await this.issueTokenPair(user.id.toString(), user.isAdmin)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}
	async register(dto: CreateAuthDto) {
		const oldUser = await this.userRepository.findOne({
			where: {
				email: dto.email,
				username: dto.username
			}
		})

		if (oldUser) throw new BadRequestException('The user already exists')

		const salt = await genSalt(10)

		const newUser = await this.userRepository.create({
			email: dto.email,
			username: dto.username,
			password: await hash(dto.password, salt)
		})

		const user = await this.userRepository.save(newUser)
		const tokens = await this.issueTokenPair(String(user.id), user.isAdmin)
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async validateUser(dto: CreateAuthDto) {
		const user = await this.userRepository.findOne({
			where: {
				email: dto.email,
				username: dto.username
			},
			select: ['email', 'username', 'id', 'password', 'isAdmin']
		})

		if (!user) throw new NotFoundException('user not found')

		const isValidPassword = await compare(dto.password, user.password)

		if (!isValidPassword)
			throw new UnauthorizedException('the password is not correct')

		return user
	}
	async getNewToken({ refreshToken }: RefreshTokenDto) {
		console.log(refreshToken)

		if (!refreshToken) throw new UnauthorizedException('Please sign in!')

		const result = await this.jwtService.verifyAsync(refreshToken)

		if (!result) throw new UnauthorizedException('Please sign in!')

		const user = await this.userRepository.findOneBy({ id: result.id })

		const tokens = await this.issueTokenPair(String(user.id), user.isAdmin)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async issueTokenPair(userId: string, isAdmin?: boolean) {
		const data = {
			id: userId,
			isAdmin
		}
		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d'
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '7d'
		})

		return { refreshToken, accessToken }
	}

	async chagngeUser(id: number) {
		const user = await this.userRepository.find({ where: { id } })
	}

	returnUserFields(user: UserEntity) {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			isAdmin: user.isAdmin
		}
	}
}
