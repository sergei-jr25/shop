import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateAuthDto {
	@IsEmail()
	email?: string

	@MinLength(6, {
		message: 'Пароль не менее 6 символов'
	})
	@IsString()
	password: string

	@IsString()
	username: string
}
