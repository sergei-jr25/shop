import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NestjsFormDataModule } from 'nestjs-form-data'
import { AuthModule } from './auth/auth.module'
import { BoilerPartsModule } from './boiler-parts/boiler-parts.module'
import { getTypeOrmConfig } from './config/typeorm.config'
import { FileModule } from './file/file.module'
import { ShoppingCartModule } from './shpopping-cart/shpopping-cart.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig
		}),
		UsersModule,
		AuthModule,
		BoilerPartsModule,
		ShoppingCartModule,
		NestjsFormDataModule,
		FileModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
