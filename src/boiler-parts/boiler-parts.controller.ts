import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards
} from '@nestjs/common'
import { BoilerPartsService } from './boiler-parts.service'
import { createDtoBolier } from './dto/createDto'

@Controller('boiler-parts')
export class BoilerPartsController {
	constructor(private readonly boilerPartsService: BoilerPartsService) {}

	@Get('all')
	all(@Query('boiler') boiler: any) {
		return this.boilerPartsService.getAllQuery(boiler)
	}
	// @UseGuards(AuthGuard)
	@Get()
	paginateAndFilter(@Query() query) {
		return this.boilerPartsService.paginateAndFilter(query)
	}
	// @UseGuards(RolesGuard)
	// @UseGuards(AuthGuard)
	@Get('bestsellers')
	getBestsellers() {
		return this.boilerPartsService.bestsellers()
	}
	// @UseGuards(AuthGuard, IsAdminGuard)
	@Get('new')
	getNew() {
		return this.boilerPartsService.new()
	}

	@UseGuards()
	@Get('search')
	getSearch(@Query('searchTerm') searchTerm?: string) {
		return this.boilerPartsService.findBySearchName(searchTerm)
	}
	@Get('name')
	gteName(@Query('namePart') name: string) {
		return this.boilerPartsService.findByName(name)
	}

	// @UseGuards(AuthGuard)
	@Get(':id')
	getById(@Param('id') id: string) {
		return this.boilerPartsService.getById(+id)
	}
	@Get('by-slug/:slug')
	getBySlug(@Param('slug') slug: string) {
		return this.boilerPartsService.getBySlug(slug)
	}
	@Post('boiler')
	createBoiler(@Body() dto: createDtoBolier) {
		return this.boilerPartsService.createBoiler(dto)
	}
	//===========

	// @UseGuards(AuthGuard)
	@Post('name')
	getByName(@Body() { name }: { name: string }) {
		return this.boilerPartsService.findByName(name)
	}
	// @UseGuards(AuthGuard)
	@Post('search')
	hetSearch(@Body() { search }: { search: string }) {
		return this.boilerPartsService.findBySearchName(search)
	}
	@Put('edit/:id')
	edit(@Param('id') id: number, @Body() dto: createDtoBolier) {
		return this.boilerPartsService.editBoiler(id, dto)
	}

	@Delete('remove/:id')
	remove(@Param('id') id: number) {
		return this.boilerPartsService.remove(id)
	}
}
