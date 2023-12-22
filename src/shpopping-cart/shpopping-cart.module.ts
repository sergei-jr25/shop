import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoilerParts } from 'src/boiler-parts/entites/boiler-parts.entites'
import { UserEntity } from 'src/users/entities/user.entity'
import { ShoppingCart } from './entities/shopping-cart.entities'
import { ShoppingCartController } from './shopping-cart.controller'
import { ShoppingCartService } from './shopping-cart.service'

@Module({
	imports: [TypeOrmModule.forFeature([ShoppingCart, BoilerParts, UserEntity])],
	controllers: [ShoppingCartController],
	providers: [ShoppingCartService]
})
export class ShoppingCartModule {}
