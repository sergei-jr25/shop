import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { RefreshTokenDto } from './dto/refreseshToken'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	login(@Body() dto: CreateAuthDto) {
		return this.authService.login(dto)
	}
	// @UseGuards(AuthGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	register(@Body() dto: CreateAuthDto) {
		return this.authService.register(dto)
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login-token')
	getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewToken(dto)
	}
}
