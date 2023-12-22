import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoilerPartsController } from './boiler-parts.controller'
import { BoilerPartsService } from './boiler-parts.service'
import { BoilerParts } from './entites/boiler-parts.entites'
import { ImageEntity } from './entites/images.entites'

@Module({
	imports: [TypeOrmModule.forFeature([BoilerParts, ImageEntity])],
	controllers: [BoilerPartsController],
	providers: [BoilerPartsService],
	exports: [BoilerPartsService]
})
export class BoilerPartsModule {}
