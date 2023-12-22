import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Post('get-by-one')
	findOne(@Body() data: { id?: number; email?: string; username?: string }) {
		return this.usersService.findOne(data)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: CreateUserDto) {
		return this.usersService.update(+id, dto)
	}
}
